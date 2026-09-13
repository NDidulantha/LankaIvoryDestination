'use client'

import { useState, useEffect, useMemo } from 'react'

/* ────────────────────────────────────────────────────────────
   DESTINATIONS — added manually for now.
   When the admin panel exists, replace this array with data
   fetched from the API (admin can add / edit / remove destinations).
   Carousel, search and layout all stay the same.
   - images:  2–3 per destination. Put files in /public/destinations/
              and reference as /destinations/filename.jpg
              (falls back to a coloured block if a file is missing)
   - tourHref: the related tour page the "View Related Tours" button links to
   ──────────────────────────────────────────────────────────── */
type Destination = {
    slug: string
    name: string
    region: string
    tagline: string
    article: string
    facts: { value: string; label: string }[]
    images: string[]
    fallback: string[] // colour fallbacks, one per image (placeholder only)
    tourHref: string
}

const DESTINATIONS: Destination[] = [
    {
        slug: 'sigiriya',
        name: 'Sigiriya',
        region: 'Cultural Triangle',
        tagline: 'The Lion Rock',
        article:
            "Rising two hundred metres from the jungle, Sigiriya is a fifth-century sky palace built by a king who feared the ground. Climb past mirror walls and the famous frescoes of celestial maidens, through the lion's paws, to a summit of royal gardens floating above the canopy. It is Sri Lanka's most breathtaking single sight, and a UNESCO World Heritage marvel of ancient engineering.",
        facts: [{ value: 'UNESCO', label: 'World Heritage' }, { value: '200m', label: 'Summit climb' }, { value: '5th C.', label: 'Sky palace' }],
        images: ['/destinations/sigiriya-1.jpg', '/destinations/sigiriya-2.jpg', '/destinations/sigiriya-3.jpg'],
        fallback: ['#5C6E3A', '#33401F', '#6E5C3A'],
        tourHref: '/tours/signature-journeys',
    },
    {
        slug: 'kandy',
        name: 'Kandy',
        region: 'Cultural Triangle',
        tagline: 'The Hill Capital',
        article:
            "Cradled by misted hills around a serene lake, Kandy was the last kingdom to fall to colonial rule and remains the island's cultural soul. At its heart stands the Temple of the Sacred Tooth Relic, holiest shrine in the Buddhist world, where drumming marks each day's rituals. Come evening, Kandyan dancers spin and fire-walkers tread — a living tradition unbroken for centuries.",
        facts: [{ value: 'Sacred Tooth', label: 'Holiest shrine' }, { value: 'Esala', label: 'Grand Perahera' }, { value: 'Lakeside', label: 'Hill capital' }],
        images: ['/destinations/kandy-1.jpg', '/destinations/kandy-2.jpg', '/destinations/kandy-3.jpg'],
        fallback: ['#3A6E5C', '#1F4034', '#2E5A6E'],
        tourHref: '/tours/cultural',
    },
    {
        slug: 'ella',
        name: 'Ella',
        region: 'Hill Country',
        tagline: 'Tea & Trains',
        article:
            "Ella is the hill country distilled — a village wrapped in tea terraces, waterfalls and cool mountain air. Walk to Little Adam's Peak at dawn, cross the storied Nine Arch Bridge as the blue train curls through, and end the day watching the mist roll up the valley from a tea-estate verandah. The rail journey here is called the most beautiful on earth.",
        facts: [{ value: '1,000m', label: 'Elevation' }, { value: 'Nine Arch', label: 'Famous bridge' }, { value: 'Tea', label: 'Estate country' }],
        images: ['/destinations/ella-1.jpg', '/destinations/ella-2.jpg', '/destinations/ella-3.jpg'],
        fallback: ['#3A6E5C', '#5C7A3A', '#1F4034'],
        tourHref: '/tours/signature-journeys',
    },
    {
        slug: 'galle',
        name: 'Galle',
        region: 'South Coast',
        tagline: 'The Fort by the Sea',
        article:
            "A Dutch-walled fort jutting into the Indian Ocean, Galle is where colonial history meets ocean light. Wander ramparts at sunset, lose yourself in lanes of boutique galleries, cafés and jewellers, and climb the lighthouse for a view across terracotta rooftops to the endless blue. The best-preserved colonial sea fort in South Asia, and impossibly photogenic.",
        facts: [{ value: 'UNESCO', label: 'Dutch Fort' }, { value: '1588', label: 'Founded' }, { value: 'Ramparts', label: 'Sunset walk' }],
        images: ['/destinations/galle-1.jpg', '/destinations/galle-2.jpg', '/destinations/galle-3.jpg'],
        fallback: ['#2E5A6E', '#4A6B7C', '#173540'],
        tourHref: '/tours/signature-journeys',
    },
    {
        slug: 'yala',
        name: 'Yala',
        region: 'Wildlife & Parks',
        tagline: 'Leopard Country',
        article:
            "Yala holds the highest density of leopards on earth, and a dawn jeep safari here is Sri Lanka at its wildest. Beyond the leopards roam elephants, sloth bears, crocodiles and painted storks across a mosaic of scrub, lagoon and jungle meeting the sea. Few places on the planet reward patience with such drama.",
        facts: [{ value: 'Leopards', label: 'Highest density' }, { value: 'Big game', label: 'Elephant & bear' }, { value: 'Dawn', label: 'Best safari' }],
        images: ['/destinations/yala-1.jpg', '/destinations/yala-2.jpg', '/destinations/yala-3.jpg'],
        fallback: ['#5C7A3A', '#33401F', '#6E5C3A'],
        tourHref: '/tours/wildlife',
    },
    {
        slug: 'mirissa',
        name: 'Mirissa',
        region: 'South Coast',
        tagline: 'Whales & Palms',
        article:
            "A crescent of gold sand fringed with palms, Mirissa is the south coast at its most beguiling — and the launch point for the finest whale watching on earth. From November to April, blue whales and sperm whales cruise the deep water just offshore. Onshore: coconut cocktails, surf breaks and the slow rhythm of the tropics.",
        facts: [{ value: 'Blue whales', label: 'Nov–Apr' }, { value: 'Golden', label: 'Palm beach' }, { value: 'Surf', label: '& snorkel' }],
        images: ['/destinations/mirissa-1.jpg', '/destinations/mirissa-2.jpg', '/destinations/mirissa-3.jpg'],
        fallback: ['#2E5A6E', '#4A6B7C', '#5C7A3A'],
        tourHref: '/tours/honeymoon',
    },
    {
        slug: 'anuradhapura',
        name: 'Anuradhapura',
        region: 'Cultural Triangle',
        tagline: 'The Sacred City',
        article:
            "For over a thousand years this was the island's capital — a vast sacred city of towering dagobas, monastery ruins and the Sri Maha Bodhi, a tree grown from a cutting of the very fig under which the Buddha found enlightenment. Cycle between colossal white stupas older than most of the world's standing monuments.",
        facts: [{ value: '2,000+ yrs', label: 'Ancient capital' }, { value: 'Sri Maha Bodhi', label: 'Sacred tree' }, { value: 'UNESCO', label: 'Sacred city' }],
        images: ['/destinations/anuradhapura-1.jpg', '/destinations/anuradhapura-2.jpg', '/destinations/anuradhapura-3.jpg'],
        fallback: ['#6E5C3A', '#403218', '#5C6E3A'],
        tourHref: '/tours/cultural',
    },
    {
        slug: 'trincomalee',
        name: 'Trincomalee',
        region: 'East Coast',
        tagline: 'Blue Whales & Beaches',
        article:
            "On the far side of the island, Trincomalee guards one of the world's finest natural harbours and the powder-white sands of Nilaveli and Uppuveli. Snorkel the coral gardens of Pigeon Island, visit the clifftop Koneswaram temple, and — from June to September — watch blue whales in the calm eastern sea.",
        facts: [{ value: 'Nilaveli', label: 'White sand' }, { value: 'Pigeon Is.', label: 'Coral reef' }, { value: 'Jun–Sep', label: 'Whale season' }],
        images: ['/destinations/trincomalee-1.jpg', '/destinations/trincomalee-2.jpg', '/destinations/trincomalee-3.jpg'],
        fallback: ['#4A6B7C', '#2E5A6E', '#26424E'],
        tourHref: '/tours/signature-journeys',
    },
]

/* ── auto-rotating carousel for one destination ── */
function Carousel({ dest }: { dest: Destination }) {
    const [idx, setIdx] = useState(0)
    const count = dest.images.length

    useEffect(() => {
        if (count <= 1) return
        if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const t = setInterval(() => setIdx((p) => (p + 1) % count), 4200)
        return () => clearInterval(t)
    }, [count])

    return (
        <div
            className="relative overflow-hidden"
            style={{ borderRadius: '10px', height: '440px', boxShadow: '0 20px 50px rgba(36,61,36,0.15)' }}
        >
      <span
          className="absolute top-4 left-4 z-10 text-[0.6rem] font-semibold tracking-widest uppercase px-3 py-1.5"
          style={{ backgroundColor: 'rgba(26,23,18,0.55)', color: '#D4AE5A', borderRadius: '25px', backdropFilter: 'blur(4px)', letterSpacing: '0.12em' }}
      >
        {dest.region}
      </span>

            {dest.images.map((src, k) => (
                <div
                    key={k}
                    className="absolute inset-0 transition-opacity duration-1000"
                    style={{
                        opacity: idx === k ? 1 : 0,
                        backgroundImage: 'url(' + src + ')',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: dest.fallback[k] || '#243D24',
                    }}
                />
            ))}

            {count > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                    {dest.images.map((_, k) => (
                        <button
                            key={k}
                            onClick={() => setIdx(k)}
                            aria-label={'Photo ' + (k + 1)}
                            className="transition-all duration-300"
                            style={{
                                width: idx === k ? '22px' : '8px',
                                height: '8px',
                                borderRadius: '4px',
                                backgroundColor: idx === k ? '#D4AE5A' : 'rgba(249,245,238,0.5)',
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default function Destinations() {
    const [query, setQuery] = useState('')

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return DESTINATIONS
        return DESTINATIONS.filter(
            (d) =>
                d.name.toLowerCase().includes(q) ||
                d.region.toLowerCase().includes(q) ||
                d.tagline.toLowerCase().includes(q) ||
                d.article.toLowerCase().includes(q)
        )
    }, [query])

    return (
        <>
            {/* INTRO + SEARCH */}
            <section className="text-center pt-14 pb-4">
                <div className="max-w-3xl mx-auto px-6">
                    <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#B8963A', letterSpacing: '0.22em' }}>
                        Discover Sri Lanka
                    </p>
                    <p className="mt-4 mb-8" style={{ color: '#5C4A2A' }}>
                        The places that define an island — explored in depth. Read the story of each, then step straight
                        into the journeys that take you there.
                    </p>

                    {/* search */}
                    <div className="relative max-w-md mx-auto">
            <span className="absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="6" stroke="#8A8278" strokeWidth="1.5" />
                <path d="M14 14l3.5 3.5" stroke="#8A8278" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search destinations — try “whale”, “temple”, “tea”…"
                            className="w-full pl-11 pr-4 py-3 text-sm outline-none"
                            style={{
                                border: '1px solid rgba(184,150,58,0.2)',
                                borderRadius: '25px',
                                backgroundColor: '#fff',
                                color: '#1A1712',
                                fontFamily: "'DM Sans', sans-serif",
                            }}
                        />
                    </div>

                    {/* jump chips (only when not searching) */}
                    {!query && (
                        <div className="flex flex-wrap justify-center gap-2 mt-6">
                            {DESTINATIONS.map((d) => (
                                <a
                                    key={d.slug}
                                    href={'#' + d.slug}
                                    className="text-[0.66rem] tracking-wider uppercase px-3 py-1.5 transition-all hover:opacity-70"
                                    style={{ border: '1px solid rgba(184,150,58,0.16)', borderRadius: '25px', color: '#5C4A2A', letterSpacing: '0.05em' }}
                                >
                                    {d.name}
                                </a>
                            ))}
                        </div>
                    )}
                    {query && (
                        <p className="mt-5 text-sm" style={{ color: '#8A8278' }}>
                            <b style={{ color: '#B8963A' }}>{filtered.length}</b> {filtered.length === 1 ? 'destination' : 'destinations'} found
                        </p>
                    )}
                </div>
            </section>

            {/* RICH BLOCKS */}
            <div>
                {filtered.map((d, i) => (
                    <section
                        key={d.slug}
                        id={d.slug}
                        className="py-16 md:py-20"
                        style={{ borderBottom: '1px solid rgba(36,61,36,0.14)', scrollMarginTop: '90px' }}
                    >
                        <div className="max-w-6xl mx-auto px-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                                <div className={i % 2 ? 'lg:order-2' : ''}>
                                    <Carousel dest={d} />
                                </div>
                                <div className={i % 2 ? 'lg:order-1' : ''}>
                                    <div className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: '#B8963A', letterSpacing: '0.16em' }}>
                                        {d.region}
                                    </div>
                                    <h2 className="font-display text-4xl md:text-5xl mb-1" style={{ color: '#1A1712', fontWeight: 400 }}>
                                        {d.name}
                                    </h2>
                                    <div className="mb-5" style={{ fontFamily: "'Caveat', cursive", fontSize: '1.4rem', color: '#B8963A' }}>
                                        {d.tagline}
                                    </div>
                                    <p className="mb-6" style={{ color: '#5C4A2A' }}>{d.article}</p>

                                    <div className="flex flex-wrap gap-6 mb-7">
                                        {d.facts.map((f) => (
                                            <div key={f.label}>
                                                <div className="font-display" style={{ color: '#B8963A', fontSize: '1rem' }}>{f.value}</div>
                                                <div className="text-[0.62rem] tracking-wider uppercase" style={{ color: '#8A8278', letterSpacing: '0.1em' }}>{f.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    <a
                                        href={d.tourHref}
                                        className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-semibold tracking-widest uppercase transition-all hover:brightness-110"
                                        style={{ backgroundColor: '#B8963A', color: '#F9F5EE', borderRadius: '25px', letterSpacing: '0.1em' }}
                                    >
                                        View Related Tours
                                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}

                {filtered.length === 0 && (
                    <div className="max-w-xl mx-auto px-6 py-20 text-center">
                        <p style={{ color: '#8A8278' }}>
                            No destinations match “<b style={{ color: '#B8963A' }}>{query}</b>”. Try a different word, or{' '}
                            <button onClick={() => setQuery('')} style={{ color: '#B8963A', fontWeight: 600 }}>clear the search</button>.
                        </p>
                    </div>
                )}
            </div>

            {/* CTA */}
            <section className="text-center py-20 px-6" style={{ backgroundColor: '#243D24' }}>
                <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#D4AE5A', letterSpacing: '0.2em' }}>
                    Ready to explore?
                </p>
                <h2 className="font-display text-3xl md:text-4xl mb-4" style={{ color: '#F9F5EE', fontWeight: 400 }}>
                    Weave these into <em style={{ fontStyle: 'italic', color: '#D4AE5A' }}>one seamless journey</em>
                </h2>
                <p className="max-w-lg mx-auto mb-8" style={{ color: 'rgba(249,245,238,0.7)', fontWeight: 300 }}>
                    Our consultants connect the island&apos;s greatest places into a private itinerary paced entirely around you.
                </p>
                <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium tracking-wider uppercase transition-all hover:brightness-110"
                    style={{ backgroundColor: '#B8963A', color: '#F9F5EE', borderRadius: '25px', letterSpacing: '0.08em', fontSize: '0.75rem' }}
                >
                    Start Planning
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
            </section>
        </>
    )
}