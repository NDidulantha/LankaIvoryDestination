'use client'

import { useState, useMemo, useEffect } from 'react'

/* ────────────────────────────────────────────────────────────
   CULTURAL TOURS — added manually for now.
   When the admin panel exists, replace this array with an API fetch.
   Filters, search, carousels and layout stay the same.
   - images:  one cover photo per route stop → /public/tours/cultural/<file>
              (auto-rotating carousel; falls back to a placeholder tint)
   - slug:    detail-page URL /tours/cultural/<slug> (built later)
   ──────────────────────────────────────────────────────────── */
type CulturalTour = {
    slug: string
    title: string
    cat: string
    duration: string
    route: string
    price: string
    desc: string
    highlights: string[]
    images: string[]
}

const TOURS: CulturalTour[] = [
    {
        slug: 'cultural-triangle-classic', title: 'The Cultural Triangle', cat: 'Ancient Cities', duration: '7 Days', route: 'Anuradhapura · Polonnaruwa · Sigiriya · Dambulla',
        price: '$2,600', desc: 'The heart of ancient Ceylon — two ruined capitals, the Lion Rock fortress and the golden cave temples, walked with an archaeologist guide.',
        highlights: ['Private dawn ascent of Sigiriya', 'Cycle the ruins of Polonnaruwa', 'Dambulla cave-temple frescoes'],
        images: ['/tours/cultural/triangle-1.jpg', '/tours/cultural/triangle-2.jpg', '/tours/cultural/triangle-3.jpg'],
    },
    {
        slug: 'sacred-kandy-tooth', title: 'Sacred Kandy', cat: 'Temples', duration: '4 Days', route: 'Kandy · Peradeniya · Embekka',
        price: '$1,400', desc: 'The last royal capital and its Temple of the Sacred Tooth — evening puja, the botanical gardens, and the carved timber of Embekka Devalaya.',
        highlights: ['Evening puja at the Temple of the Tooth', 'Kandyan dance performance', 'Embekka’s carved wooden pillars'],
        images: ['/tours/cultural/kandy-1.jpg', '/tours/cultural/kandy-2.jpg'],
    },
    {
        slug: 'anuradhapura-sacred-city', title: 'Anuradhapura Sacred City', cat: 'Ancient Cities', duration: '3 Days', route: 'Anuradhapura · Mihintale',
        price: '$1,100', desc: 'The island’s first great capital — colossal dagobas, monastery ruins and the sacred Sri Maha Bodhi, plus the cradle of Buddhism at Mihintale.',
        highlights: ['The sacred Sri Maha Bodhi tree', 'Sunrise climb at Mihintale', 'Cycle among the great stupas'],
        images: ['/tours/cultural/anuradhapura-1.jpg', '/tours/cultural/anuradhapura-2.jpg', '/tours/cultural/anuradhapura-3.jpg'],
    },
    {
        slug: 'colonial-heritage-trail', title: 'Colonial Heritage Trail', cat: 'Colonial', duration: '5 Days', route: 'Colombo · Galle · Negombo',
        price: '$1,900', desc: 'Five centuries of Portuguese, Dutch and British Ceylon — the Galle fort ramparts, Colombo’s colonial quarter and Negombo’s old canals and churches.',
        highlights: ['Walk the Galle fort ramparts', 'Colombo’s colonial architecture', 'Dutch canals of Negombo'],
        images: ['/tours/cultural/colonial-1.jpg', '/tours/cultural/colonial-2.jpg', '/tours/cultural/colonial-3.jpg'],
    },
    {
        slug: 'living-crafts-and-villages', title: 'Living Crafts & Villages', cat: 'Living Culture', duration: '6 Days', route: 'Kandy · Matale · Aluvihare',
        price: '$2,200', desc: 'Culture as it’s still practised — mask carvers, batik and brass workshops, spice gardens, and the palm-leaf manuscript library of Aluvihare.',
        highlights: ['Traditional mask-carving workshop', 'Spice garden and cooking class', 'Aluvihare manuscript temple'],
        images: ['/tours/cultural/crafts-1.jpg', '/tours/cultural/crafts-2.jpg', '/tours/cultural/crafts-3.jpg'],
    },
    {
        slug: 'grand-heritage-odyssey', title: 'Grand Heritage Odyssey', cat: 'Grand', duration: '11 Days', route: 'Anuradhapura · Polonnaruwa · Sigiriya · Kandy · Galle',
        price: '$4,300', desc: 'The full sweep of the island’s history — ancient capitals, the Lion Rock, the sacred hill capital, and a colonial-fort finish on the southern coast.',
        highlights: ['All five cultural UNESCO sites', 'Heritage bungalow stays', 'Timed to a temple festival where possible'],
        images: ['/tours/cultural/grand-1.jpg', '/tours/cultural/grand-2.jpg', '/tours/cultural/grand-3.jpg', '/tours/cultural/grand-4.jpg'],
    },
]

const CATEGORIES = ['All', 'Ancient Cities', 'Temples', 'Colonial', 'Living Culture', 'Grand']

const STATS = [
    { n: '8', label: 'UNESCO World Heritage sites' },
    { n: '2,500+', label: 'Years of history' },
    { n: '3', label: 'Ancient royal capitals' },
    { n: '2,000+', label: 'Year-old Bodhi tree' },
]

const UNESCO = [
    { year: '1982', title: 'Anuradhapura', desc: 'The first great capital — sacred city of towering dagobas and the Sri Maha Bodhi, revered for over two millennia.' },
    { year: '1982', title: 'Polonnaruwa', desc: 'The medieval royal capital, remarkably preserved, home to the serene stone Buddhas of the Gal Vihara.' },
    { year: '1982', title: 'Sigiriya', desc: 'The fifth-century sky-palace on the Lion Rock, ringed by water gardens and the famous cloud-maiden frescoes.' },
    { year: '1988', title: 'Dambulla', desc: 'The golden cave-temple complex — five sanctuaries of painted ceilings and 150 Buddha images beneath the rock.' },
    { year: '1988', title: 'Sacred Kandy', desc: 'The last kingdom’s hill capital and the Temple of the Sacred Tooth, holiest shrine in the Buddhist world.' },
    { year: '1988', title: 'Galle Fort', desc: 'The best-preserved colonial sea fort in South Asia — Dutch ramparts, lighthouses and old merchant lanes.' },
]

/* auto-rotating cover carousel — one frame per route stop */
function CardCarousel({ images, label }: { images: string[]; label: string }) {
    const [idx, setIdx] = useState(0)
    const count = images.length
    useEffect(() => {
        if (count <= 1) return
        if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const t = setInterval(() => setIdx((p) => (p + 1) % count), 4000)
        return () => clearInterval(t)
    }, [count])
    return (
        <>
            {images.map((src, k) => (
                <div key={k} className="absolute inset-0 flex items-center justify-center transition-opacity duration-1000"
                     style={{ opacity: idx === k ? 1 : 0, backgroundImage: 'url(' + src + ')', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#E2D5BA' }}>
                    <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: '0.62rem', color: '#8A8278', mixBlendMode: 'multiply', opacity: 0.55 }}>{label} {k + 1}</span>
                </div>
            ))}
            {count > 1 && (
                <div className="absolute" style={{ bottom: '12px', left: 0, right: 0, display: 'flex', gap: '5px', justifyContent: 'center', zIndex: 3 }}>
                    {images.map((_, k) => (
                        <span key={k} style={{ width: idx === k ? '16px' : '5px', height: '5px', borderRadius: '3px', background: idx === k ? '#D4AE5A' : 'rgba(249,245,238,0.6)', transition: 'all .3s' }} />
                    ))}
                </div>
            )}
        </>
    )
}

export default function CulturalTours() {
    const [cat, setCat] = useState('All')
    const [query, setQuery] = useState('')

    const tours = useMemo(() => {
        const q = query.trim().toLowerCase()
        return TOURS.filter((t) => {
            const okCat = cat === 'All' || t.cat === cat
            const hay = (t.title + ' ' + t.route + ' ' + t.desc + ' ' + t.cat + ' ' + t.highlights.join(' ')).toLowerCase()
            return okCat && (!q || hay.includes(q))
        })
    }, [cat, query])

    return (
        <main style={{ background: '#F9F5EE', color: '#5C4A2A' }}>
            {/* ===== HERO ===== */}
            <header className="relative overflow-hidden" style={{ background: '#243D24', padding: 'clamp(112px,12vw,150px) clamp(24px,5vw,64px) clamp(64px,8vw,104px)' }}>
                <div className="absolute inset-0" style={{ backgroundImage: 'url(/tours/cultural-hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#243D24' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(26,46,26,0.82),rgba(36,61,36,0.94))' }} />
                <div className="relative mx-auto text-center flex flex-col items-center" style={{ maxWidth: '1360px' }}>
                    <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8963A', fontWeight: 600, marginBottom: '34px' }}>
                        Home&nbsp;&nbsp;/&nbsp;&nbsp;Tours&nbsp;&nbsp;/&nbsp;&nbsp;<span style={{ color: '#D4AE5A' }}>Cultural Tours</span>
                    </div>
                    <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, color: '#F9F5EE', fontSize: 'clamp(2.6rem,6vw,5rem)', lineHeight: 1.04, margin: 0, maxWidth: '16ch' }}>
                        Cultural <span style={{ fontStyle: 'italic', color: '#D4AE5A' }}>Tours</span>
                    </h1>
                    <p style={{ fontFamily: "'Caveat',cursive", fontSize: 'clamp(1.5rem,2.6vw,2.1rem)', color: '#D4AE5A', margin: '18px 0 0' }}>
                        two and a half thousand years, still living
                    </p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1.02rem', lineHeight: 1.85, color: 'rgba(249,245,238,0.72)', maxWidth: '52ch', margin: '26px 0 0' }}>
                        Ruined capitals, cave temples and living ritual — the Cultural Triangle and beyond, walked with heritage specialists who bring the stones and the ceremonies to life.
                    </p>
                </div>
            </header>

            {/* ===== STAT STRIP ===== */}
            <section style={{ background: '#EFE6D0', padding: 'clamp(22px,2.6vw,32px) clamp(24px,5vw,64px)', borderBottom: '1px solid rgba(184,150,58,0.16)' }}>
                <div className="mx-auto grid text-center" style={{ maxWidth: '1360px', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: '20px' }}>
                    {STATS.map((s) => (
                        <div key={s.label}>
                            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(1.5rem,2.2vw,2rem)', color: '#B8963A', lineHeight: 1 }}>{s.n}</div>
                            <div style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A6E2E', marginTop: '8px' }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== INTRO ===== */}
            <section style={{ background: '#F9F5EE', padding: 'clamp(56px,7vw,88px) clamp(24px,5vw,64px)' }}>
                <div className="mx-auto text-center" style={{ maxWidth: '820px' }}>
                    <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8963A', fontWeight: 600, marginBottom: '20px' }}>Ayubowan · Welcome</div>
                    <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(1.8rem,3.2vw,2.6rem)', lineHeight: 1.18, color: '#1A1712', margin: '0 0 22px' }}>
                        History you can <span style={{ fontStyle: 'italic', color: '#B8963A' }}>walk into</span>.
                    </h2>
                    <p style={{ fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.9, color: '#5C4A2A', margin: '0 auto', maxWidth: '60ch' }}>
                        Sri Lanka wears its past openly — eight UNESCO sites, ancient irrigation still watering the fields, and temples where ritual has never paused. Our cultural tours are led by archaeologists and heritage guides, timed for quiet light and living ceremony rather than the tour-bus hour.
                    </p>
                </div>
            </section>

            {/* ===== FILTER / SEARCH ===== */}
            <section style={{ background: '#EFE6D0', padding: 'clamp(40px,5vw,60px) clamp(24px,5vw,64px)', borderTop: '1px solid rgba(184,150,58,0.16)', borderBottom: '1px solid rgba(184,150,58,0.16)' }}>
                <div className="mx-auto" style={{ maxWidth: '1360px' }}>
                    <div className="flex items-end justify-between flex-wrap" style={{ gap: '24px', marginBottom: '26px' }}>
                        <div>
                            <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8963A', fontWeight: 600, marginBottom: '10px' }}>Browse the cultural tours</div>
                            <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(1.4rem,2.4vw,1.95rem)', color: '#1A1712', margin: 0 }}>
                                <span style={{ fontStyle: 'italic', color: '#B8963A' }}>{tours.length}</span> cultural tours
                            </h3>
                        </div>
                        <div className="flex items-center" style={{ gap: '10px', background: '#F9F5EE', border: '1px solid rgba(184,150,58,0.3)', borderRadius: '25px', padding: '11px 20px', minWidth: '280px' }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8A8278" strokeWidth="2"><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" /></svg>
                            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search sites, cities, temples…"
                                   style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: "'DM Sans',sans-serif", fontSize: '0.85rem', color: '#1A1712', width: '100%' }} />
                        </div>
                    </div>
                    <div className="flex flex-wrap" style={{ gap: '12px' }}>
                        {CATEGORIES.map((label) => {
                            const active = label === cat
                            return (
                                <button key={label} onClick={() => setCat(label)}
                                        style={{
                                            borderRadius: '25px', padding: '9px 20px', fontFamily: "'DM Sans',sans-serif", fontSize: '0.72rem', fontWeight: 600,
                                            letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all .2s',
                                            background: active ? '#B8963A' : 'transparent', color: active ? '#F9F5EE' : '#5C4A2A',
                                            border: '1px solid ' + (active ? '#B8963A' : 'rgba(184,150,58,0.4)'),
                                        }}>
                                    {label}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* ===== TOUR GRID ===== */}
            <section style={{ background: '#F9F5EE', padding: 'clamp(44px,5vw,76px) clamp(24px,5vw,64px)' }}>
                <div className="mx-auto" style={{ maxWidth: '1360px' }}>
                    {tours.length > 0 ? (
                        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(360px,1fr))', gap: 'clamp(28px,3vw,44px)' }}>
                            {tours.map((t) => (
                                <article key={t.slug} className="sig-card flex flex-col"
                                         style={{ background: '#FFFFFF', border: '1px solid rgba(184,150,58,0.16)', borderRadius: '8px', overflow: 'hidden' }}>
                                    <div className="relative" style={{ height: '260px', overflow: 'hidden' }}>
                                        <CardCarousel images={t.images} label={'cover — ' + t.title + ' ·'} />
                                        <span style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(184,150,58,0.92)', color: '#F9F5EE', borderRadius: '25px', padding: '5px 14px', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', zIndex: 4 }}>{t.cat}</span>
                                        <span style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(26,23,18,0.62)', color: '#F9F5EE', borderRadius: '25px', padding: '5px 14px', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', zIndex: 4 }}>{t.duration}</span>
                                    </div>
                                    <div className="flex flex-col flex-1" style={{ padding: '28px 30px 30px' }}>
                                        <div style={{ fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8A8278', marginBottom: '12px' }}>{t.route}</div>
                                        <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 500, fontSize: '1.6rem', lineHeight: 1.16, color: '#1A1712', margin: '0 0 12px' }}>{t.title}</h3>
                                        <p style={{ fontWeight: 300, fontSize: '0.94rem', lineHeight: 1.72, color: '#5C4A2A', margin: '0 0 20px' }}>{t.desc}</p>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                                            {t.highlights.map((h) => (
                                                <li key={h} style={{ display: 'flex', gap: '11px', alignItems: 'flex-start', fontWeight: 300, fontSize: '0.9rem', lineHeight: 1.5, color: '#5C4A2A' }}>
                                                    <span style={{ color: '#B8963A', fontSize: '0.7rem', lineHeight: 1.7, flex: 'none' }}>◆</span><span>{h}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', paddingTop: '20px', borderTop: '1px solid rgba(184,150,58,0.16)' }}>
                                            <div>
                                                <div style={{ fontSize: '0.64rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A8278', marginBottom: '3px' }}>From</div>
                                                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.35rem', color: '#B8963A', lineHeight: 1 }}>
                                                    <span style={{ fontWeight: 600 }}>{t.price}</span>
                                                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.7rem', fontWeight: 300, color: '#8A8278', marginLeft: '6px' }}>/ person</span>
                                                </div>
                                            </div>
                                            <a href={'/tours/cultural/' + t.slug} style={{ background: '#B8963A', color: '#F9F5EE', border: 'none', borderRadius: '25px', padding: '12px 22px', fontFamily: "'DM Sans',sans-serif", fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '9px', whiteSpace: 'nowrap' }}>
                                                View Itinerary <span style={{ fontSize: '0.95rem' }}>→</span>
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                            <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: '1.6rem', color: '#8A8278', margin: '0 0 8px' }}>No cultural tours match that search.</p>
                            <p style={{ fontWeight: 300, color: '#8A8278', margin: 0 }}>Try a site, a city, or clear the filters.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ===== UNESCO STRIP ===== */}
            <section style={{ background: '#EBF0E8', padding: 'clamp(52px,6vw,84px) clamp(24px,5vw,64px)' }}>
                <div className="mx-auto" style={{ maxWidth: '1360px' }}>
                    <div className="text-center" style={{ marginBottom: '44px' }}>
                        <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8963A', fontWeight: 600, marginBottom: '16px' }}>World Heritage</div>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(1.7rem,3vw,2.5rem)', color: '#1A1712', margin: 0 }}>
                            Eight UNESCO sites, <span style={{ fontStyle: 'italic', color: '#B8963A' }}>one island</span>
                        </h2>
                    </div>
                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '28px' }}>
                        {UNESCO.map((u) => (
                            <div key={u.title} style={{ background: '#F9F5EE', border: '1px solid rgba(184,150,58,0.2)', borderRadius: '8px', padding: '30px 28px' }}>
                                <div style={{ fontSize: '0.64rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#B8963A', fontWeight: 600, marginBottom: '10px' }}>Inscribed {u.year}</div>
                                <h4 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 500, fontSize: '1.25rem', color: '#1A1712', margin: '0 0 10px' }}>{u.title}</h4>
                                <p style={{ fontWeight: 300, fontSize: '0.9rem', lineHeight: 1.65, color: '#5C4A2A', margin: 0 }}>{u.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA BAND ===== */}
            <section className="relative overflow-hidden" style={{ background: '#243D24', padding: 'clamp(64px,8vw,120px) clamp(24px,5vw,64px)' }}>
                <div className="absolute inset-0" style={{ backgroundImage: 'url(/tours/cultural-cta.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#1c2f1c' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(26,46,26,0.82),rgba(36,61,36,0.9))' }} />
                <div className="relative mx-auto text-center" style={{ maxWidth: '760px' }}>
                    <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4AE5A', fontWeight: 600, marginBottom: '24px' }}>Tailor-Made</div>
                    <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(2rem,4.4vw,3.4rem)', lineHeight: 1.12, color: '#F9F5EE', margin: '0 0 22px' }}>
                        Time your visit to a <span style={{ fontStyle: 'italic', color: '#D4AE5A' }}>living ceremony</span>
                    </h2>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.85, color: 'rgba(249,245,238,0.72)', margin: '0 auto 38px', maxWidth: '50ch' }}>
                        The Esala Perahera, a full-moon poya, a village temple festival — the culture is at its most alive when the ritual is on. Tell us what draws you, and your designer will build the route around it.
                    </p>
                    <a href="/contact" style={{ background: '#B8963A', color: '#F9F5EE', border: 'none', borderRadius: '25px', padding: '16px 36px', fontFamily: "'DM Sans',sans-serif", fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '11px' }}>
                        Start a tailor-made enquiry <span style={{ fontSize: '1.05rem' }}>→</span>
                    </a>
                </div>
            </section>
        </main>
    )
}