'use client'

import { useState } from 'react'

export default function Contact() {
    const [email, setEmail] = useState('')
    const [sent, setSent] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email.trim()) return
        // TODO: wire to Laravel API (enquiry endpoint) later
        setSent(true)
        setEmail('')
    }

    return (
        <section id="contact" className="py-14 md:py-32" style={{ backgroundColor: '#243D24' }}>
            <div className="max-w-3xl mx-auto px-6 text-center">
                <p
                    className="text-xs font-medium tracking-widest mb-5"
                    style={{ color: '#D4AE5A', textTransform: 'uppercase', letterSpacing: '0.22em' }}
                >
                    Begin Your Journey
                </p>
                <h2
                    className="font-display text-3xl md:text-5xl mb-6"
                    style={{ color: '#F9F5EE', fontWeight: 400, lineHeight: 1.2 }}
                >
                    Every great journey<br />begins with a conversation
                </h2>
                <p
                    className="text-sm md:text-base leading-relaxed mb-6 md:mb-10 max-w-xl mx-auto"
                    style={{ color: 'rgba(249,245,238,0.6)', fontWeight: 300 }}
                >
                    Tell us your travel dates, interests, and dreams. Our journey consultants
                    will craft a fully bespoke itinerary — no obligation, no templates.
                </p>

                {sent ? (
                    <div
                        className="max-w-lg mx-auto mb-8 px-6 py-5"
                        style={{ border: '1px solid rgba(212,174,90,0.4)', backgroundColor: 'rgba(212,174,90,0.08)' }}
                    >
                        <p style={{ color: '#D4AE5A', fontWeight: 500 }}>
                            Thank you — a journey consultant will be in touch within one working day.
                        </p>
                    </div>
                ) : (
                    <form
                        className="flex flex-row gap-0 max-w-lg mx-auto mb-8"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Your email address"
                            className="flex-1 min-w-0 px-3 py-2.5 sm:px-5 sm:py-4 text-xs sm:text-sm outline-none"
                            style={{
                                backgroundColor: 'rgba(249,245,238,0.08)',
                                color: '#F9F5EE',
                                border: '1px solid rgba(212,174,90,0.25)',
                                borderRight: 'none',
                                borderTopLeftRadius: '999px',
                                borderBottomLeftRadius: '999px',
                                fontFamily: "'DM Sans', sans-serif",
                            }}
                        />
                        <button
                            type="submit"
                            className="px-4 py-2.5 sm:px-7 sm:py-4 text-sm font-medium tracking-widest uppercase transition-opacity hover:opacity-90 flex-shrink-0"
                            style={{
                                backgroundColor: '#B8963A',
                                color: '#F9F5EE',
                                letterSpacing: '0.08em',
                                fontSize: '0.62rem',
                                whiteSpace: 'nowrap',
                                borderTopRightRadius: '999px',
                                borderBottomRightRadius: '999px',
                            }}
                        >
                            <span className="sm:hidden">Send</span>
                            <span className="hidden sm:inline">Get in Touch</span>
                        </button>
                    </form>
                )}

                <p className="text-xs" style={{ color: 'rgba(249,245,238,0.35)' }}>
                    Or call us: +94 11 234 5678 · hello@lankaivorytravels.com
                </p>
            </div>
        </section>
    )
}