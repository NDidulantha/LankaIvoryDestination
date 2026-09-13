'use client'

import { useState } from 'react'

type Card = {
    title: string
    quote: string
    name: string
    origin: string
    tour: string
    date: string
    stamp: string
    category: string
}

const CARDS: Card[] = [
    { title: 'A honeymoon we will never stop talking about', quote: "Every detail was perfect — from the private sunrise at Sigiriya to the tuk-tuk through Kandy's night market. We felt looked after the entire time.", name: 'Charlotte & Marcus', origin: 'London, UK', tour: 'The Golden Triangle', date: 'MAR 2026', stamp: '🐘', category: 'Honeymoons' },
    { title: 'At ease within the hour', quote: 'As a solo traveller I was nervous. Within an hour of landing I felt completely at ease. The guides genuinely care about the island they call home.', name: 'Priya Nair', origin: 'Singapore', tour: 'Hill Country & Coast', date: 'FEB 2026', stamp: '🌴', category: 'Solo' },
    { title: 'Nothing compared to this', quote: "We watched a leopard hunt at dusk from our open jeep in Yala. I've done safaris across four continents. Nothing compared to this.", name: 'Dr. Thomas Breuer', origin: 'Munich, Germany', tour: 'Wildlife & Wilderness', date: 'JAN 2026', stamp: '🐆', category: 'Wildlife' },
    { title: 'Every promise, kept', quote: 'They redesigned our itinerary twice without a hint of impatience, and the final price was exactly what we were quoted.', name: 'Aditya & Neha', origin: 'Mumbai, India', tour: 'Custom Journey', date: 'DEC 2025', stamp: '🏛️', category: 'Cultural' },
    { title: 'Our kids still talk about it', quote: 'Turtles at dawn, a cooking class with a village family, the train to Ella. The children were enchanted and so were we.', name: 'The Hendersons', origin: 'Melbourne, Australia', tour: 'Family Adventure', date: 'NOV 2025', stamp: '🐢', category: 'Families' },
    { title: 'Tea, mist and quiet', quote: 'Three days in the hill country that felt like stepping into a painting. The estate bungalow was pure calm.', name: 'Sofia Marchetti', origin: 'Milan, Italy', tour: 'Tea Country', date: 'OCT 2025', stamp: '🍃', category: 'Solo' },
    { title: 'Beyond five stars', quote: 'From the airport welcome to the farewell garland, service beyond five stars. We are already planning our return.', name: 'James & Wei Tan', origin: 'Singapore', tour: 'Signature Journey', date: 'SEP 2025', stamp: '⭐', category: 'Honeymoons' },
    { title: 'The real Sri Lanka', quote: "They showed us the Sri Lanka the guidebooks miss — a rice mill lunch, a temple guardian's blessing, a fisherman's lagoon at dawn.", name: 'Klaus & Renata', origin: 'Vienna, Austria', tour: 'Cultural Triangle', date: 'AUG 2025', stamp: '🛕', category: 'Cultural' },
    { title: 'Seamless from start to finish', quote: 'Flights delayed, plans shifted, and they handled all of it before we even worried. Flawless.', name: 'Rachel Okonkwo', origin: 'Lagos, Nigeria', tour: 'Custom Journey', date: 'JUL 2025', stamp: '✈️', category: 'Solo' },
]

const FILTERS = ['All Postcards', 'Honeymoons', 'Families', 'Solo', 'Wildlife', 'Cultural']

export default function Postcards() {
    const [filter, setFilter] = useState('All Postcards')

    const shown = filter === 'All Postcards' ? CARDS : CARDS.filter((c) => c.category === filter)

    return (
        <>
            {/* filters */}
            <div className="max-w-6xl mx-auto px-6 pt-16 pb-10">
                <div className="flex flex-wrap justify-center gap-2.5">
                    {FILTERS.map((f) => {
                        const on = filter === f
                        return (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className="text-xs tracking-wider uppercase px-5 py-2.5 transition-all"
                                style={{
                                    borderRadius: '25px',
                                    border: '1px solid ' + (on ? '#B8963A' : 'rgba(212,174,90,0.35)'),
                                    backgroundColor: on ? '#B8963A' : 'transparent',
                                    color: on ? '#F9F5EE' : 'rgba(249,245,238,0.8)',
                                    letterSpacing: '0.08em',
                                }}
                            >
                                {f}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* masonry wall */}
            <div className="max-w-6xl mx-auto px-6 pb-24">
                <div style={{ columnGap: '2rem' }} className="columns-1 md:columns-2 lg:columns-3">
                    {shown.map((c, i) => (
                        <div
                            key={c.title}
                            className="pc-card mb-8"
                            style={{
                                breakInside: 'avoid',
                                backgroundColor: '#F9F5EE',
                                padding: '8px',
                                borderRadius: '4px',
                                boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
                                transform: i % 3 === 0 ? 'rotate(-1deg)' : i % 3 === 1 ? 'rotate(0.8deg)' : 'none',
                            }}
                        >
                            <div
                                style={{
                                    border: '2px solid transparent',
                                    borderImage:
                                        'repeating-linear-gradient(45deg, #C0392B 0, #C0392B 10px, #F9F5EE 10px, #F9F5EE 20px, #2C4A87 20px, #2C4A87 30px, #F9F5EE 30px, #F9F5EE 40px) 2',
                                    padding: '1.5rem',
                                }}
                            >
                                <div className="flex justify-between items-start mb-4">
                  <span className="text-[0.6rem] font-semibold tracking-widest uppercase" style={{ color: '#2C6E63', letterSpacing: '0.16em' }}>
                    Postcard · Sri Lanka
                  </span>
                                    <div
                                        className="flex flex-col items-center justify-center flex-shrink-0"
                                        style={{ width: '52px', height: '64px', backgroundColor: '#EAF4F1', border: '1px dashed #2C6E63', transform: 'rotate(4deg)' }}
                                    >
                                        <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{c.stamp}</span>
                                        <span style={{ fontSize: '0.42rem', color: '#2C6E63', fontWeight: 700, letterSpacing: '0.05em', marginTop: '2px' }}>CEYLON</span>
                                    </div>
                                </div>

                                <h3 className="font-display text-xl mb-3" style={{ color: '#1A1712', fontStyle: 'italic' }}>
                                    {c.title}
                                </h3>
                                <p className="text-sm mb-5" style={{ color: '#3A352E', lineHeight: 1.7 }}>
                                    {c.quote}
                                </p>

                                <p style={{ fontFamily: "'Caveat', cursive", fontSize: '1.5rem', color: '#C0392B', lineHeight: 1 }}>
                                    {c.name}
                                </p>
                                <p className="text-xs mt-1" style={{ color: '#8A8278' }}>
                                    {c.origin} · {c.tour}
                                </p>

                                <div className="flex justify-between items-center mt-4 pt-3" style={{ borderTop: '1px solid rgba(26,23,18,0.12)' }}>
                                    <span style={{ color: '#B8963A', fontSize: '0.72rem', letterSpacing: '0.1em' }}>★★★★★</span>
                                    <span
                                        className="text-[0.6rem] tracking-wider uppercase"
                                        style={{ color: '#C0392B', border: '1px solid #C0392B', borderRadius: '20px', padding: '0.2rem 0.55rem', opacity: 0.7 }}
                                    >
                    {c.date}
                  </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {shown.length === 0 && (
                    <p className="text-center py-10" style={{ color: 'rgba(249,245,238,0.6)' }}>
                        No postcards in this category yet.
                    </p>
                )}
            </div>

            {/* CTA */}
            <section className="text-center py-20 px-6" style={{ backgroundColor: '#EFE6D0' }}>
                <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#B8963A', letterSpacing: '0.2em' }}>
                    Travelled with us?
                </p>
                <h2 className="font-display text-3xl md:text-4xl mb-4" style={{ color: '#1A1712', fontWeight: 400 }}>
                    Send us a <em style={{ fontStyle: 'italic', color: '#B8963A' }}>postcard</em>
                </h2>
                <p className="max-w-lg mx-auto mb-8" style={{ color: '#5C4A2A', fontWeight: 300 }}>
                    We&apos;d love to hear how your journey went. Share your story and it may join the wall above.
                </p>
                <a
                    href="/experiences/postcards/write"
                    className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium tracking-wider uppercase transition-all hover:brightness-110"
                    style={{ backgroundColor: '#B8963A', color: '#F9F5EE', borderRadius: '25px', letterSpacing: '0.08em', fontSize: '0.75rem' }}
                >
                    Write Your Postcard
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
            </section>
        </>
    )
}