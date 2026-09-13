'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const DESTINATIONS = [
    {
        name: 'Sri Dalada Maligawa',
        subtitle: 'The Temple of the Sacred Tooth',
        tag: 'Sacred',
        desc: "In the heart of Kandy stands the island's holiest Buddhist shrine, home to the sacred tooth relic of the Buddha — a place of daily ritual, drumming, and centuries of devotion.",
        images: [
            '/Destinations/SriDaladaMaligawa1.jpg',
            '/Destinations/SriDaladaMaligawa2.jpg',
            '/Destinations/SriDaladaMaligawa3.jpg',
        ],
        alt: 'Temple of the Sacred Tooth Relic, Kandy, Sri Lanka',
    },
    {
        name: 'Sigiriya',
        subtitle: 'The Lion Rock Fortress',
        tag: 'Heritage',
        desc: 'Ascend the ancient citadel rising 200m above the jungle canopy — a UNESCO World Heritage site of mythic grandeur.',
        images: [
            '/Destinations/Sigiriya1.jpg',
            '/Destinations/Sigiriya2.jpg',
            '/Destinations/Sigiriya3.jpg',
        ],
        alt: 'Sigiriya rock fortress rising above jungle, Sri Lanka',
    },
    {
        name: 'Mirissa',
        subtitle: 'The Whale Watch Coast',
        tag: 'Coast',
        desc: 'Palm-fringed shores meet the deep blue Indian Ocean — home to blue whales, sea turtles, and endless golden hours.',
        images: [
            '/Destinations/Mirissa2.jpg',
            '/Destinations/Mirissa1.jpg',
            '/Destinations/Mirissa3.jpg',
        ],
        alt: 'Tropical beach with palm trees in Sri Lanka',
    },
    {
        name: "Ella's Hills",
        subtitle: 'The Tea Country',
        tag: 'Highland',
        desc: 'Emerald terraces cascade across misty highlands — travel by vintage train through the most scenic rail route on earth.',
        images: [
            '/Destinations/Ella4.jpg',
            '/Destinations/Ella2.jpg',
            '/Destinations/Ella3.jpg',
        ],
        alt: 'Lush tea plantation hills in Sri Lanka highland',
    },
    {
        name: 'Yala',
        subtitle: 'Leopard & Elephant Country',
        tag: 'Safari',
        desc: "Sri Lanka's most biodiverse national park hosts the world's highest density of wild leopards and great herds of elephants.",
        images: [
            '/Destinations/Yala1.jpg',
            '/Destinations/Yala2.jpg',
            '/Destinations/Yala4.jpg',
        ],
        alt: 'Wild elephant in lush savanna landscape',
    },
]

const INTERVAL = 2500

export default function Destinations() {
    const [activeDest, setActiveDest] = useState(0)
    const [imgIndex, setImgIndex] = useState(0)

    // switch destination and reset its image at the same time (no reset-effect)
    const selectDest = (i: number) => {
        setActiveDest(i)
        setImgIndex(0)
    }

    // crossfade through the active destination's images
    useEffect(() => {
        const count = DESTINATIONS[activeDest].images.length
        if (count <= 1) return

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (reduce) return

        const timer = setInterval(() => {
            setImgIndex(prev => (prev + 1) % count)
        }, INTERVAL)
        return () => clearInterval(timer)
    }, [activeDest])

    return (
        <section id="destinations" className="py-14 md:py-32">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                        <p
                            className="text-xs font-medium tracking-widest mb-4"
                            style={{ color: '#B8963A', textTransform: 'uppercase', letterSpacing: '0.2em' }}
                        >
                            Where We Journey
                        </p>
                        <h2
                            className="font-display text-3xl md:text-5xl"
                            style={{ color: '#1A1712', fontWeight: 400, lineHeight: 1.15 }}
                        >
                            Five corners of<br />an extraordinary island
                        </h2>
                    </div>
                    <p
                        className="text-sm leading-relaxed max-w-sm"
                        style={{ color: '#5C4A2A', fontWeight: 300 }}
                    >
                        Sri Lanka compresses an entire continent&apos;s worth of wonder into an island
                        smaller than Ireland. Every region is its own world.
                    </p>
                </div>

                {/* Destination tabs + display */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 overflow-hidden" style={{ border: '1px solid rgba(184,150,58,0.2)', borderRadius: '5px' }}>
                    {/* Tab list */}
                    <div className="lg:col-span-2 flex flex-row lg:flex-col overflow-x-auto">
                        {DESTINATIONS.map((dest, i) => (
                            <button
                                key={dest.name}
                                onClick={() => selectDest(i)}
                                className="flex-1 lg:flex-none text-left p-5 lg:p-7 transition-all duration-300 group whitespace-nowrap lg:whitespace-normal"
                                style={{
                                    backgroundColor: activeDest === i ? '#243D24' : 'transparent',
                                    borderBottom: i < DESTINATIONS.length - 1 ? '1px solid rgba(36,61,36,0.12)' : 'none',
                                }}
                            >
                <span
                    className="text-xs font-medium tracking-widest block mb-1"
                    style={{
                        color: activeDest === i ? '#D4AE5A' : '#8A8278',
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        fontSize: '0.65rem',
                    }}
                >
                  {dest.tag}
                </span>
                                <span
                                    className="font-display text-lg lg:text-2xl block"
                                    style={{
                                        color: activeDest === i ? '#F9F5EE' : '#1A1712',
                                        fontWeight: 400,
                                    }}
                                >
                  {dest.name}
                </span>
                                <span
                                    className="hidden lg:block text-xs mt-1"
                                    style={{ color: activeDest === i ? 'rgba(249,245,238,0.55)' : '#8A8278' }}
                                >
                  {dest.subtitle}
                </span>
                            </button>
                        ))}
                    </div>

                    {/* Active destination detail */}
                    <div className="lg:col-span-3 relative overflow-hidden" style={{ minHeight: 'clamp(320px, 40vw, 448px)' }}>
                        {DESTINATIONS.map((dest, i) => (
                            <div
                                key={dest.name}
                                className="absolute inset-0 transition-opacity duration-700"
                                style={{ opacity: activeDest === i ? 1 : 0, pointerEvents: activeDest === i ? 'auto' : 'none' }}
                            >
                                {/* crossfading images for this destination */}
                                {dest.images.map((src, j) => (
                                    <Image
                                        key={src}
                                        src={src}
                                        alt={dest.alt}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 60vw"
                                        priority={i === 0 && j === 0}
                                        className="object-cover transition-opacity duration-[1200ms]"
                                        style={{
                                            backgroundColor: '#243D24',
                                            opacity: activeDest === i && imgIndex === j ? 1 : 0,
                                        }}
                                    />
                                ))}

                                {/* gradient sits above images, below text */}
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: 'linear-gradient(to top, rgba(26,23,18,0.85) 0%, transparent 55%)',
                                    }}
                                />

                                <div className="absolute bottom-0 left-0 right-0 p-7 lg:p-10">
                                    <p
                                        className="hidden md:block text-sm md:text-base leading-relaxed mb-5 max-w-sm"
                                        style={{ color: 'rgba(249,245,238,0.85)', fontWeight: 300 }}
                                    >
                                        {dest.desc}
                                    </p>
                                    <a
                                    href="#tours"
                                    className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase transition-colors hover:opacity-80"
                                    style={{ color: '#D4AE5A', letterSpacing: '0.15em' }}
                                    >
                                    Explore journeys here
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>

                                {/* progress dots */}
                                {dest.images.length > 1 && (
                                    <div className="flex gap-2 mt-6">
                                        {dest.images.map((_, j) => (
                                            <button
                                                key={j}
                                                onClick={() => setImgIndex(j)}
                                                aria-label={'Show image ' + (j + 1)}
                                                className="transition-all duration-300"
                                                style={{
                                                    width: imgIndex === j ? '24px' : '8px',
                                                    height: '4px',
                                                    borderRadius: '2px',
                                                    backgroundColor: imgIndex === j ? '#D4AE5A' : 'rgba(249,245,238,0.4)',
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            </div>
                            ))}
                    </div>
                </div>
            </div>
        </section>
    )
}