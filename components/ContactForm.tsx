'use client'

import { useState } from 'react'

const INTERESTS = ['Cultural', 'Wildlife', 'Beaches', 'Hill Country', 'Honeymoon', 'Adventure']

export default function ContactForm() {
    const [sent, setSent] = useState(false)
    const [interests, setInterests] = useState<string[]>([])
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const toggle = (tag: string) =>
        setInterests((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))

    // nights between the two dates (check-in to check-out)
    let nights = 0
    if (startDate && endDate) {
        const s = new Date(startDate)
        const e = new Date(endDate)
        const diff = Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24))
        nights = diff > 0 ? diff : 0
    }
    const endBeforeStart = startDate && endDate && nights === 0

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: POST to Laravel enquiry endpoint later
        setSent(true)
    }

    const field: React.CSSProperties = {
        width: '100%',
        padding: '0.85rem 1rem',
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(184,150,58,0.18)',
        borderRadius: '6px',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '0.92rem',
        color: '#1A1712',
        outline: 'none',
    }
    const label: React.CSSProperties = {
        display: 'block',
        fontSize: '0.7rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#5C4A2A',
        marginBottom: '0.5rem',
    }
    // used for labels that sit in a paired sm:grid-cols-2 row, so a wrapped
    // neighbour label doesn't push its input out of line with the field beside it
    const gridLabel: React.CSSProperties = {
        ...label,
        lineHeight: 1.4,
        minHeight: '1.96rem',
    }
    // iOS Safari ignores width on <input type="date"> unless the native
    // appearance is stripped first — otherwise it renders wider than its container
    const dateField: React.CSSProperties = {
        ...field,
        WebkitAppearance: 'none',
        appearance: 'none',
    }
    const today = new Date().toISOString().split('T')[0]

    if (sent) {
        return (
            <div
                className="flex flex-col items-center justify-center text-center p-12"
                style={{ border: '1px solid rgba(36,61,36,0.3)', borderRadius: '8px', backgroundColor: '#EBF0E8' }}
            >
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: '#243D24' }}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="#D4AE5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <h3 className="font-display text-2xl mb-3" style={{ color: '#1A1712' }}>
                    Thank you — your enquiry is on its way
                </h3>
                <p style={{ color: '#5C4A2A', maxWidth: '34ch', fontWeight: 300 }}>
                    A journey consultant will be in touch within one working day. For anything urgent,
                    WhatsApp us on +94 76 123 4567.
                </p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="p-7 md:p-9" style={{ backgroundColor: '#EFE6D0', borderRadius: '8px' }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label style={gridLabel}>Full name *</label>
                    <input type="text" required placeholder="Your name" style={field} />
                </div>
                <div>
                    <label style={gridLabel}>Email *</label>
                    <input type="email" required placeholder="you@email.com" style={field} />
                </div>
                <div>
                    <label style={gridLabel}>Phone / WhatsApp (optional)</label>
                    <input type="tel" placeholder="+94 …" style={field} />
                </div>
                <div>
                    <label style={gridLabel}>Country</label>
                    <input type="text" placeholder="Where you’re travelling from" style={field} />
                </div>
            </div>

            {/* Expected travelling dates */}
            <div className="mt-6">
                <label style={label}>Expected travelling dates</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-end">
                    <div className="min-w-0">
                        <span className="block text-xs mb-1.5" style={{ color: '#8A8278' }}>Arrival</span>
                        <div className="relative">
                            <input
                                type="date"
                                min={today}
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                style={dateField}
                                className="min-w-0 w-full"
                            />
                            {!startDate && (
                                <span
                                    className="absolute inset-y-0 left-4 flex items-center pointer-events-none"
                                    style={{ fontSize: '0.92rem', color: '#8A8278' }}
                                >
                                    dd/mm/yyyy
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="min-w-0">
                        <span className="block text-xs mb-1.5" style={{ color: '#8A8278' }}>Departure</span>
                        <div className="relative">
                            <input
                                type="date"
                                min={startDate || today}
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                style={dateField}
                                className="min-w-0 w-full"
                            />
                            {!endDate && (
                                <span
                                    className="absolute inset-y-0 left-4 flex items-center pointer-events-none"
                                    style={{ fontSize: '0.92rem', color: '#8A8278' }}
                                >
                                    dd/mm/yyyy
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                {endBeforeStart && (
                    <p className="text-xs mt-2" style={{ color: '#B4513A' }}>
                        Departure should be after arrival.
                    </p>
                )}
            </div>

            {/* Number of travellers */}
            <div className="mt-6 sm:max-w-[200px]">
                <label style={label}>Number of travellers</label>
                <input type="number" min={1} placeholder="2" style={field} />
            </div>

            {/* Interests */}
            <div className="mt-6">
                <label style={label}>What interests you?</label>
                <div className="flex flex-wrap gap-2.5">
                    {INTERESTS.map((tag) => {
                        const on = interests.includes(tag)
                        return (
                            <button
                                type="button"
                                key={tag}
                                onClick={() => toggle(tag)}
                                className="text-sm px-4 py-2 transition-all"
                                style={{
                                    borderRadius: '25px',
                                    border: '1px solid ' + (on ? '#B8963A' : 'rgba(184,150,58,0.2)'),
                                    backgroundColor: on ? '#B8963A' : 'transparent',
                                    color: on ? '#F9F5EE' : '#5C4A2A',
                                }}
                            >
                                {tag}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Message */}
            <div className="mt-6">
                <label style={label}>Tell us about your dream trip</label>
                <textarea rows={4} placeholder="Anything you’d love to see, do, or avoid…" style={{ ...field, resize: 'vertical' }} />
            </div>

            {/* Consent */}
            <label className="flex items-start gap-3 mt-6 cursor-pointer">
                <input type="checkbox" required className="mt-1" style={{ accentColor: '#B8963A' }} />
                <span className="text-sm" style={{ color: '#5C4A2A', fontWeight: 300 }}>
          I agree to be contacted about my enquiry and accept the privacy policy.
        </span>
            </label>

            <button
                type="submit"
                className="mt-7 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 text-sm font-medium tracking-wider uppercase transition-all hover:brightness-110"
                style={{ backgroundColor: '#B8963A', color: '#F9F5EE', borderRadius: '25px', letterSpacing: '0.08em', fontSize: '0.75rem' }}
            >
                Send Enquiry
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </form>
    )
}