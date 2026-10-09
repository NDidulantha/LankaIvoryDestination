import { Resend } from 'resend'
import { CONTACT } from '@/lib/contact'

/**
 * Reads an email-address env var, forgiving common paste mistakes in the
 * Vercel dashboard: surrounding whitespace or quotes, and the variable name
 * itself pasted into the value box ("CONTACT_TO_EMAIL=..."). Falls back if the
 * cleaned value is empty or doesn't contain an address, so a bad setting can't
 * break the contact form (Resend rejects malformed "to"/"from" with a 422).
 */
function emailFromEnv(name: string, fallback: string) {
    const cleaned = (process.env[name] ?? '')
        .trim()
        .replace(new RegExp('^' + name + '\\s*=\\s*'), '')
        .replace(/^(["'])(.*)\1$/, '$2')
        .trim()
    if (!cleaned) return fallback
    if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$|<[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+>$/.test(cleaned)) {
        console.error(`${name} is not a valid email address — using the default instead`)
        return fallback
    }
    return cleaned
}

const TO_EMAIL = emailFromEnv('CONTACT_TO_EMAIL', CONTACT.email)
const FROM_EMAIL = emailFromEnv('CONTACT_FROM_EMAIL', 'Lanka Ivory Destination <onboarding@resend.dev>')

type EnquiryPayload = {
    name: string
    email: string
    phone: string
    country: string
    arrival: string
    departure: string
    travellers: string
    interests: string[]
    message: string
    // honeypot — real users never fill this in; bots that auto-fill every field will
    website: string
}

function escapeHtml(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}

export async function POST(request: Request) {
    if (!process.env.RESEND_API_KEY) {
        console.error('RESEND_API_KEY is not set — cannot send enquiry email')
        return Response.json({ ok: false, error: 'Email service is not configured yet.' }, { status: 500 })
    }

    let payload: Partial<EnquiryPayload>
    try {
        payload = await request.json()
    } catch {
        return Response.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
    }

    const { name, email, phone, country, arrival, departure, travellers, interests, message, website } = payload

    // honeypot field — silently pretend success so bots don't learn to skip it
    if (website) {
        return Response.json({ ok: true })
    }

    if (!name || !email) {
        return Response.json({ ok: false, error: 'Name and email are required.' }, { status: 400 })
    }

    const interestsList = Array.isArray(interests) && interests.length > 0 ? interests.join(', ') : '—'

    const textBody = [
        `New enquiry from ${name}`,
        '',
        `Email: ${email}`,
        `Phone / WhatsApp: ${phone || '—'}`,
        `Country: ${country || '—'}`,
        `Arrival: ${arrival || '—'}`,
        `Departure: ${departure || '—'}`,
        `Number of travellers: ${travellers || '—'}`,
        `Interests: ${interestsList}`,
        '',
        'Message:',
        message || '—',
    ].join('\n')

    const htmlBody = `
        <h2>New enquiry from ${escapeHtml(name)}</h2>
        <p>
            <strong>Email:</strong> ${escapeHtml(email)}<br/>
            <strong>Phone / WhatsApp:</strong> ${escapeHtml(phone || '—')}<br/>
            <strong>Country:</strong> ${escapeHtml(country || '—')}<br/>
            <strong>Arrival:</strong> ${escapeHtml(arrival || '—')}<br/>
            <strong>Departure:</strong> ${escapeHtml(departure || '—')}<br/>
            <strong>Number of travellers:</strong> ${escapeHtml(travellers || '—')}<br/>
            <strong>Interests:</strong> ${escapeHtml(interestsList)}
        </p>
        <p><strong>Message:</strong><br/>${escapeHtml(message || '—').replace(/\n/g, '<br/>')}</p>
    `

    try {
        const resend = new Resend(process.env.RESEND_API_KEY)
        const { error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: TO_EMAIL,
            replyTo: email,
            subject: `New enquiry from ${name}`,
            text: textBody,
            html: htmlBody,
        })

        if (error) {
            console.error('Resend error:', error)
            return Response.json({ ok: false, error: 'Could not send the enquiry. Please try again.' }, { status: 502 })
        }

        return Response.json({ ok: true })
    } catch (err) {
        console.error('Contact form send failed:', err)
        return Response.json({ ok: false, error: 'Could not send the enquiry. Please try again.' }, { status: 500 })
    }
}
