import ContactForm from '@/components/ContactForm'
import JsonLd from '@/components/JsonLd'
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo'

export const metadata = pageMetadata({
    title: 'Contact',
    description:
        'Get in touch with Lanka Ivory Destination. Call, email, WhatsApp or visit us in Bandaragama — a journey consultant replies within one working day.',
    path: '/contact',
    image: '/About/About1.jpg',
})

const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
])

const CARDS = [
    {
        label: 'Phone',
        lines: ['+94 11 234 5678', '+94 76 123 4567'],
        icon: (
            <path
                d="M6 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 2-2z"
                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"
            />
        ),
    },
    {
        label: 'Email',
        lines: ['hello@lankaivorydestinations.com'],
        icon: (
            <>
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </>
        ),
    },
    {
        label: 'WhatsApp',
        lines: ['+94 76 123 4567', 'Fastest way to reach us'],
        href: 'https://wa.me/94761234567',
        icon: (
            <path
                d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3zm4.3 12.4c-.2.5-1.1 1-1.5 1-.4.1-.9.1-1.4-.1-.3-.1-.8-.3-1.4-.5a10 10 0 0 1-3.8-3.4c-.3-.4-.6-1-.6-1.6 0-.5.3-.8.4-1 .2-.2.4-.2.5-.2h.4c.1 0 .3 0 .5.4l.6 1.4c0 .1.1.3 0 .4l-.3.4-.2.2c-.1.1-.2.2-.1.4a6 6 0 0 0 2.7 2.4c.2.1.4.1.5 0l.5-.6c.1-.2.3-.1.4-.1l1.4.7c.2.1.3.1.3.2.1.1.1.4 0 .6z"
                fill="currentColor"
            />
        ),
    },
    {
        label: 'Address',
        lines: ['No. 37/22 B, Atulugama Road', 'Pubudu Rotarigama, Bandaragama 12530'],
        icon: (
            <>
                <path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
            </>
        ),
    },
]

export default function ContactPage() {
    return (
        <main className="bg-ivory">
            <JsonLd data={breadcrumb} />
            {/* ===== PAGE HERO ===== */}
            <header className="relative pt-28 pb-12 md:pt-32 md:pb-20 text-center overflow-hidden" style={{ backgroundColor: '#243D24' }}>
                <div
                    role="img"
                    aria-label="Historic colonial-era building on the Sri Lankan coast"
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'url(/About/About1.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: '#243D24',
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            'linear-gradient(to bottom, rgba(26,46,26,0.82), rgba(36,61,36,0.88))',
                    }}
                />
                <div className="relative max-w-3xl mx-auto px-6">
                    <p className="text-xs tracking-widest uppercase mb-5" style={{ color: '#D4AE5A', letterSpacing: '0.18em' }}>
                        Home &nbsp;/&nbsp; Contact
                    </p>
                    <h1 className="font-display text-4xl md:text-6xl" style={{ color: '#F9F5EE', fontWeight: 400 }}>
                        Let’s plan something<br />unforgettable
                    </h1>
                    <p className="mt-6 text-base md:text-lg" style={{ color: 'rgba(249,245,238,0.7)', fontWeight: 300 }}>
                        Tell us your dates and dreams. A journey consultant will reply within one working day —
                        no call centre, no automated quote.
                    </p>
                </div>
            </header>

            {/* ===== TALK TO US — card row ===== */}
            <section className="py-14 md:py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-10 md:mb-14">
                        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#B8963A', letterSpacing: '0.2em' }}>
                            Get in Touch
                        </p>
                        <h2 className="font-display text-3xl md:text-5xl" style={{ color: '#1A1712', fontWeight: 400 }}>
                            Talk to us
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {CARDS.map((c) => {
                            const Tag = c.href ? 'a' : 'div'
                            return (
                                <Tag
                                    key={c.label}
                                    {...(c.href ? { href: c.href, target: '_blank', rel: 'noopener noreferrer' } : {})}
                                    className="contact-card group text-center px-4 py-6 md:px-6 md:py-9 transition-all duration-300"
                                    style={{
                                        backgroundColor: '#FFFFFF',
                                        border: '1px solid rgba(184,150,58,0.18)',
                                        borderRadius: '10px',
                                        display: 'block',
                                        cursor: c.href ? 'pointer' : 'default',
                                    }}
                                >
                                    <div
                                        className="contact-icon mx-auto mb-3 md:mb-5 flex items-center justify-center transition-all duration-300 w-12 h-12 md:w-16 md:h-16"
                                        style={{
                                            borderRadius: '50%',
                                            backgroundColor: '#243D24',
                                            color: '#D4AE5A',
                                        }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="md:w-[26px] md:h-[26px]">
                                            {c.icon}
                                        </svg>
                                    </div>
                                    <div
                                        className="font-display text-lg md:text-xl mb-1 md:mb-2"
                                        style={{ color: '#1A1712' }}
                                    >
                                        {c.label}
                                    </div>
                                    {c.lines.map((line) => (
                                        <div key={line} className="text-xs md:text-sm" style={{ color: '#5C4A2A', fontWeight: 300, lineHeight: 1.7 }}>
                                            {line}
                                        </div>
                                    ))}
                                </Tag>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ===== FORM ===== */}
            <section className="pb-12 md:pb-20">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="text-center mb-6 md:mb-10">
                        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#B8963A', letterSpacing: '0.2em' }}>
                            Start your enquiry
                        </p>
                        <h2 className="font-display text-2xl md:text-4xl" style={{ color: '#1A1712', fontWeight: 400 }}>
                            Tell us about your trip
                        </h2>
                    </div>
                    <ContactForm />
                </div>
            </section>

            {/* ===== MAP ===== */}
            <section className="pb-14 md:pb-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-6 md:mb-10">
                        <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#B8963A', letterSpacing: '0.2em' }}>
                            Find us
                        </p>
                        <h2 className="font-display text-2xl md:text-4xl" style={{ color: '#1A1712', fontWeight: 400 }}>
                            Visit us in Bandaragama
                        </h2>
                    </div>
                    <div
                        className="overflow-hidden"
                        style={{ borderRadius: '8px', border: '1px solid rgba(184,150,58,0.2)', height: 'clamp(260px,55vw,440px)' }}
                    >
                        <iframe
                            title="Lanka Ivory Destination office location in Bandaragama"
                            src="https://www.google.com/maps?q=No.+37%2F22+B%2C+Atulugama+Road%2C+Pubudu+Rotarigama%2C+Bandaragama+12530%2C+Sri+Lanka&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </section>
        </main>
    )
}