'use client'

import { useState, useEffect } from 'react'

const TESTIMONIALS = [
    {
        title: 'A honeymoon we will never stop talking about',
        quote:
            "Lanka Ivory turned our honeymoon into something we'll spend the rest of our lives talking about. Every detail was perfect — from the private sunrise at Sigiriya to the tuk-tuk through Kandy's night market.",
        name: 'Charlotte & Marcus Webb',
        origin: 'London, United Kingdom',
        tour: 'The Golden Triangle',
        date: 'MAR 2026',
    },
    {
        title: 'At ease within the hour',
        quote:
            "As a solo traveller, I was nervous. Within an hour of landing, I felt completely at ease. The guides aren't just knowledgeable — they're passionate, funny, and genuinely care about the island they call home.",
        name: 'Priya Nair',
        origin: 'Singapore',
        tour: 'Hill Country & Coast',
        date: 'FEB 2026',
    },
    {
        title: 'Nothing compared to this',
        quote:
            "We watched a leopard hunt at dusk from our open jeep in Yala. I've done safaris across four continents. Nothing compared to this. Nothing.",
        name: 'Dr. Thomas Breuer',
        origin: 'Munich, Germany',
        tour: 'Wildlife & Wilderness',
        date: 'JAN 2026',
    },
    {
        title: 'Every promise, kept',
        quote:
            "They redesigned our itinerary twice without a hint of impatience, and the final price was exactly what we were quoted. Rare to find a company this transparent.",
        name: 'Aditya & Neha Rao',
        origin: 'Mumbai, India',
        tour: 'Custom Journey',
        date: 'DEC 2025',
    },
]

export default function Testimonials() {
    const [active, setActive] = useState(0)
    const count = TESTIMONIALS.length

    const go = (dir: number) => setActive(prev => (prev + dir + count) % count)
    const set = (i: number) => setActive(i)

    // auto-advance every 7s, respecting reduced motion
    useEffect(() => {
        if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const timer = setInterval(() => setActive(prev => (prev + 1) % count), 7000)
        return () => clearInterval(timer)
    }, [count])

    const t = TESTIMONIALS[active]

    return (
        <section
            className="relative py-14 md:py-32 overflow-hidden"
            style={{ backgroundColor: '#F9F5EE' }}
        >

            <div className="relative max-w-4xl mx-auto px-6">
                <div className="text-center mb-10 md:mb-14">
                    <p
                        className="text-xs font-medium tracking-widest mb-4"
                        style={{ color: '#D4AE5A', textTransform: 'uppercase', letterSpacing: '0.22em' }}
                    >
                        Postcards Home
                    </p>
                    <h2
                        className="font-display text-3xl md:text-5xl"
                        style={{ color: '#1A1712', fontWeight: 400 }}
                    >
                        Notes from our travellers
                    </h2>
                </div>

                {/* Postcard — small, vertical (portrait) card */}
                <div className="relative max-w-xs sm:max-w-sm mx-auto">
                    {/* stacked paper behind, for depth */}
                    <div
                        className="absolute inset-0 translate-x-2 translate-y-2 rotate-1"
                        style={{ backgroundColor: 'rgba(249,245,238,0.25)', borderRadius: '4px' }}
                    />
                    <div
                        className="absolute inset-0 translate-x-1 translate-y-1 rotate-[0.5deg]"
                        style={{ backgroundColor: 'rgba(249,245,238,0.5)', borderRadius: '4px' }}
                    />

                    {/* the postcard itself */}
                    <div
                        key={active}
                        className="postcard relative"
                        style={{
                            backgroundColor: '#F9F5EE',
                            borderRadius: '4px',
                            padding: '8px',
                            boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
                        }}
                    >
                        {/* airmail striped border */}
                        <div
                            style={{
                                border: '2px solid transparent',
                                borderImage: 'repeating-linear-gradient(45deg, #C0392B 0, #C0392B 12px, #F9F5EE 12px, #F9F5EE 24px, #2C4A87 24px, #2C4A87 36px, #F9F5EE 36px, #F9F5EE 48px) 2',
                                padding: '1.25rem',
                            }}
                            className="flex flex-col gap-5"
                        >
                            {/* postmark + stamp row */}
                            <div className="flex items-start justify-between gap-3">
                                {/* postmark */}
                                <div className="relative" style={{ width: '56px', height: '56px' }}>
                                    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', opacity: 0.85 }}>
                                        <defs>
                                            <path id={`circle-${active}`} d="M 50,50 m -34,0 a 34,34 0 1,1 68,0 a 34,34 0 1,1 -68,0" />
                                        </defs>
                                        <circle cx="50" cy="50" r="46" fill="none" stroke="#C0392B" strokeWidth="1.5" strokeDasharray="2 2" />
                                        <circle cx="50" cy="50" r="34" fill="none" stroke="#C0392B" strokeWidth="1" />
                                        <text fill="#C0392B" fontSize="7.5" fontWeight="700" letterSpacing="1.5">
                                            <textPath href={`#circle-${active}`} startOffset="0%">VISIT · SRI LANKA · TOURS ·</textPath>
                                        </text>
                                        <text x="50" y="54" textAnchor="middle" fill="#C0392B" fontSize="11" fontWeight="700" fontFamily="serif">
                                            {t.date}
                                        </text>
                                    </svg>
                                </div>

                                {/* stamp */}
                                <div
                                    style={{
                                        width: '44px',
                                        height: '54px',
                                        backgroundColor: '#EAF4F1',
                                        border: '1px dashed #2C6E63',
                                        padding: '4px',
                                        transform: 'rotate(3deg)',
                                    }}
                                    className="flex flex-col items-center justify-center flex-shrink-0"
                                >
                                    <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>🐘</span>
                                    <span style={{ fontSize: '0.44rem', color: '#2C6E63', fontWeight: 700, marginTop: '3px', letterSpacing: '0.05em' }}>
                      CEYLON
                    </span>
                                    <div style={{ color: '#D4AE5A', fontSize: '0.4rem', marginTop: '1px' }}>★★★★★</div>
                                </div>
                            </div>

                            {/* the message */}
                            <div className="flex flex-col">
                                <p
                                    className="text-[0.65rem] font-semibold tracking-widest uppercase mb-2"
                                    style={{ color: '#2C6E63', letterSpacing: '0.16em' }}
                                >
                                    Postcard · Sri Lanka
                                </p>
                                <h3
                                    className="font-display text-lg mb-2"
                                    style={{ color: '#1A1712', fontStyle: 'italic', fontWeight: 500 }}
                                >
                                    {t.title}
                                </h3>
                                <p
                                    className="text-xs leading-relaxed"
                                    style={{ color: '#3A352E', fontWeight: 300, lineHeight: 1.65 }}
                                >
                                    {t.quote}
                                </p>
                            </div>

                            {/* sign-off */}
                            <div style={{ borderTop: '1px solid rgba(26,23,18,0.15)', paddingTop: '14px' }}>
                                <p className="signature" style={{ color: '#C0392B', fontSize: '1.1rem', lineHeight: 1 }}>
                                    {t.name}
                                </p>
                                <p className="text-[0.65rem] mt-1" style={{ color: '#8A8278' }}>
                                    {t.origin} · {t.tour}
                                </p>
                                <p className="signature mt-3" style={{ color: '#2C4A87', fontSize: '0.85rem', lineHeight: 1 }}>
                                    with love, from Sri Lanka
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* arrows */}
                    <button
                        onClick={() => go(-1)}
                        aria-label="Previous postcard"
                        className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-11 h-11 rounded-full items-center justify-center transition-all hover:scale-110"
                        style={{ backgroundColor: 'rgba(62,59,59,0.12)', border: '1px solid rgba(26,23,18,0.15)', backdropFilter: 'blur(4px)' }}
                    >
                        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                            <path d="M11 4l-5 5 5 5" stroke="#3A352E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button
                        onClick={() => go(1)}
                        aria-label="Next postcard"
                        className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-11 h-11 rounded-full items-center justify-center transition-all hover:scale-110"
                        style={{ backgroundColor: 'rgba(62,59,59,0.12)', border: '1px solid rgba(26,23,18,0.15)', backdropFilter: 'blur(4px)' }}
                    >
                        <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                            <path d="M7 4l5 5-5 5" stroke="#3A352E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* dots */}
                <div className="flex items-center justify-center gap-2.5 mt-10">
                    {TESTIMONIALS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => set(i)}
                            aria-label={'Go to postcard ' + (i + 1)}
                            className="transition-all duration-300"
                            style={{
                                width: active === i ? '28px' : '8px',
                                height: '8px',
                                borderRadius: '4px',
                                backgroundColor: active === i ? '#D4AE5A' : 'rgba(249,245,238,0.35)',
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}