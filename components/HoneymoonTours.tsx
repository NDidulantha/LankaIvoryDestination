'use client'

import { useState, useMemo, useEffect } from 'react'

/* ────────────────────────────────────────────────────────────
   HONEYMOON TOURS — added manually for now.
   When the admin panel exists, replace this array with an API fetch.
   Filters, search, carousels and layout stay the same.
   - images: one cover photo per route stop → /public/tours/honeymoon/<file>
             (auto-rotating carousel; falls back to a placeholder tint)
   - slug:   detail-page URL /tours/honeymoon/<slug> (built later)
   ──────────────────────────────────────────────────────────── */
type Honeymoon = {
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

const HONEYMOONS: Honeymoon[] = [
    {
        slug: 'barefoot-luxury-south', title: 'Barefoot Luxury', cat: 'Beach', duration: '9 Days', route: 'Galle · Mirissa · Tangalle',
        price: '$5,200', desc: 'The deep south at its most languid — boutique fort stays, whale-blue horizons and a private villa on an empty beach to finish.',
        highlights: ['Sunset on the Galle ramparts', 'Private beach dinner at Tangalle', 'Champagne whale-watching charter'],
        images: ['/tours/honeymoon/barefoot-1.jpg', '/tours/honeymoon/barefoot-2.jpg', '/tours/honeymoon/barefoot-3.jpg'],
    },
    {
        slug: 'hills-and-honey', title: 'Hills & Honey', cat: 'Hill Country', duration: '8 Days', route: 'Kandy · Nuwara Eliya · Ella',
        price: '$4,600', desc: 'Cool misted mornings, tea-estate bungalows and the blue train through the highlands — romance at altitude, unhurried and quiet.',
        highlights: ['Private tea-estate bungalow', 'First-class blue train to Ella', 'Couples’ spa above the valley'],
        images: ['/tours/honeymoon/hills-1.jpg', '/tours/honeymoon/hills-2.jpg', '/tours/honeymoon/hills-3.jpg'],
    },
    {
        slug: 'island-of-two', title: 'An Island for Two', cat: 'Grand', duration: '14 Days', route: 'Cultural Triangle · Ella · Yala · Tangalle',
        price: '$7,900', desc: 'The whole island as a honeymoon — ancient wonder, tea country, a leopard dawn, and a slow beach finish, paced entirely for two.',
        highlights: ['Candle-lit dinner among the ruins', 'Private Yala dawn safari', 'Beachfront villa, deep south'],
        images: ['/tours/honeymoon/island-1.jpg', '/tours/honeymoon/island-2.jpg', '/tours/honeymoon/island-3.jpg', '/tours/honeymoon/island-4.jpg'],
    },
    {
        slug: 'wild-and-romantic', title: 'Wild & Romantic', cat: 'Wildlife', duration: '10 Days', route: 'Wilpattu · Sigiriya · Udawalawe · Coast',
        price: '$5,800', desc: 'For couples who love the wild — leopard country and elephant plains by day, luxury tented nights beneath a sky full of stars.',
        highlights: ['Luxury tented safari camp', 'Sunrise balloon over Sigiriya', 'Elephants of Udawalawe at dusk'],
        images: ['/tours/honeymoon/wild-1.jpg', '/tours/honeymoon/wild-2.jpg', '/tours/honeymoon/wild-3.jpg'],
    },
    {
        slug: 'secluded-shores', title: 'Secluded Shores', cat: 'Beach', duration: '7 Days', route: 'Trincomalee · Pigeon Island',
        price: '$4,100', desc: 'The quiet east — powder-white sand, coral gardens and warm calm water, with barely another soul in sight. Pure seclusion.',
        highlights: ['Private snorkel at Pigeon Island', 'Beachfront suite at Nilaveli', 'Dolphin-watch at first light'],
        images: ['/tours/honeymoon/shores-1.jpg', '/tours/honeymoon/shores-2.jpg', '/tours/honeymoon/shores-3.jpg'],
    },
    {
        slug: 'classic-ceylon-romance', title: 'Classic Ceylon Romance', cat: 'Grand', duration: '12 Days', route: 'Sigiriya · Kandy · Ella · Galle',
        price: '$6,400', desc: 'Our signature romance — the island’s greatest hits softened and slowed, with the most beautiful stays at every turn.',
        highlights: ['Sky-palace climb at Sigiriya', 'Heritage bungalow in tea country', 'Fort-side finale in old Galle'],
        images: ['/tours/honeymoon/classic-1.jpg', '/tours/honeymoon/classic-2.jpg', '/tours/honeymoon/classic-3.jpg', '/tours/honeymoon/classic-4.jpg'],
    },
]

const CATEGORIES = ['All', 'Beach', 'Hill Country', 'Wildlife', 'Grand']

const INCLUSIONS = [
    { mark: '✦', title: 'A private designer', desc: 'One person who knows your trip inside out, from first note to final sunset.' },
    { mark: '♥', title: 'Romantic touches', desc: 'Flowers, a private dinner, a surprise upgrade — arranged quietly, without asking.' },
    { mark: '⚘', title: 'The finest stays', desc: 'Boutique, heritage and villa stays chosen for privacy and a sense of occasion.' },
    { mark: '☾', title: 'Room to do nothing', desc: 'Unhurried days with space built in — because a honeymoon isn’t a checklist.' },
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

export default function HoneymoonTours() {
    const [cat, setCat] = useState('All')
    const [query, setQuery] = useState('')

    const tours = useMemo(() => {
        const q = query.trim().toLowerCase()
        return HONEYMOONS.filter((t) => {
            const okCat = cat === 'All' || t.cat === cat
            const hay = (t.title + ' ' + t.route + ' ' + t.desc + ' ' + t.cat + ' ' + t.highlights.join(' ')).toLowerCase()
            return okCat && (!q || hay.includes(q))
        })
    }, [cat, query])

    return (
        <main style={{ background: '#F9F5EE', color: '#5C4A2A' }}>
            {/* ===== HERO ===== */}
            <header className="relative overflow-hidden" style={{ background: '#243D24', padding: 'clamp(112px,12vw,150px) clamp(24px,5vw,64px) clamp(64px,8vw,104px)' }}>
                <div role="img" aria-label="Couple embracing in the surf at a Sri Lankan beach resort" className="absolute inset-0" style={{ backgroundImage: 'url(/tours/honeymoon/honeymoon-hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#243D24' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(26,46,26,0.52),rgba(36,61,36,0.64))' }} />
                <div className="relative mx-auto text-center flex flex-col items-center" style={{ maxWidth: '1360px' }}>
                    <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8963A', fontWeight: 600, marginBottom: '34px' }}>
                        Home&nbsp;&nbsp;/&nbsp;&nbsp;Tours&nbsp;&nbsp;/&nbsp;&nbsp;<span style={{ color: '#D4AE5A' }}>Honeymoon Tours</span>
                    </div>
                    <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, color: '#F9F5EE', fontSize: 'clamp(2.6rem,6vw,5rem)', lineHeight: 1.04, margin: 0, maxWidth: '16ch' }}>
                        Honeymoon <span style={{ fontStyle: 'italic', color: '#D4AE5A' }}>Tours</span>
                    </h1>
                    <p style={{ fontFamily: "'Caveat',cursive", fontSize: 'clamp(1.5rem,2.6vw,2.1rem)', color: '#D4AE5A', margin: '18px 0 0' }}>
                        the first journey of a shared life
                    </p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1.02rem', lineHeight: 1.85, color: 'rgba(249,245,238,0.72)', maxWidth: '52ch', margin: '26px 0 0' }}>
                        Unhurried and deeply private — surprise touches, room to do nothing at all, and the island’s most romantic stays, all arranged so the only thing left to you is each other.
                    </p>
                </div>
            </header>

            {/* ===== INTRO ===== */}
            <section style={{ background: '#F9F5EE', padding: 'clamp(56px,7vw,88px) clamp(24px,5vw,64px)' }}>
                <div className="mx-auto text-center" style={{ maxWidth: '820px' }}>
                    <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8963A', fontWeight: 600, marginBottom: '20px' }}>Ayubowan · Welcome</div>
                    <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(1.8rem,3.2vw,2.6rem)', lineHeight: 1.18, color: '#1A1712', margin: '0 0 22px' }}>
                        The first journey of a <span style={{ fontStyle: 'italic', color: '#B8963A' }}>shared life</span>.
                    </h2>
                    <p style={{ fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.9, color: '#5C4A2A', margin: '0 auto', maxWidth: '60ch' }}>
                        A honeymoon should feel like nothing else you plan. Ours are unhurried and deeply private — surprise touches, room to do nothing at all, and the island’s most romantic stays, all arranged so the only thing left to you is each other.
                    </p>
                </div>
            </section>

            {/* ===== FILTER / SEARCH ===== */}
            <section style={{ background: '#EFE6D0', padding: 'clamp(40px,5vw,60px) clamp(24px,5vw,64px)', borderTop: '1px solid rgba(184,150,58,0.16)', borderBottom: '1px solid rgba(184,150,58,0.16)' }}>
                <div className="mx-auto" style={{ maxWidth: '1360px' }}>
                    <div className="flex items-end justify-between flex-wrap" style={{ gap: '24px', marginBottom: '26px' }}>
                        <div>
                            <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8963A', fontWeight: 600, marginBottom: '10px' }}>The romantic collection</div>
                            <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(1.4rem,2.4vw,1.95rem)', color: '#1A1712', margin: 0 }}>
                                <span style={{ fontStyle: 'italic', color: '#B8963A' }}>{tours.length}</span> honeymoon journeys
                            </h3>
                        </div>
                        <div className="flex items-center" style={{ gap: '10px', background: '#F9F5EE', border: '1px solid rgba(184,150,58,0.3)', borderRadius: '25px', padding: '11px 20px', minWidth: '280px' }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8A8278" strokeWidth="2"><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" /></svg>
                            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by mood, region, stay…"
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
                                                    <span style={{ color: '#B8963A', fontSize: '0.72rem', lineHeight: 1.6, flex: 'none' }}>♥</span><span>{h}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', paddingTop: '20px', borderTop: '1px solid rgba(184,150,58,0.16)' }}>
                                            <div>
                                                <div style={{ fontSize: '0.64rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A8278', marginBottom: '3px' }}>From</div>
                                                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.35rem', color: '#B8963A', lineHeight: 1 }}>
                                                    <span style={{ fontWeight: 600 }}>{t.price}</span>
                                                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.7rem', fontWeight: 300, color: '#8A8278', marginLeft: '6px' }}>/ couple</span>
                                                </div>
                                            </div>
                                            <a href={'/tours/honeymoon/' + t.slug} style={{ background: '#B8963A', color: '#F9F5EE', border: 'none', borderRadius: '25px', padding: '12px 22px', fontFamily: "'DM Sans',sans-serif", fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '9px', whiteSpace: 'nowrap' }}>
                                                View Itinerary <span style={{ fontSize: '0.95rem' }}>→</span>
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                            <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: '1.6rem', color: '#8A8278', margin: '0 0 8px' }}>No honeymoons match that search.</p>
                            <p style={{ fontWeight: 300, color: '#8A8278', margin: 0 }}>Try a mood, a coast, or clear the filters.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ===== INCLUSIONS STRIP ===== */}
            <section style={{ background: '#EBF0E8', padding: 'clamp(52px,6vw,84px) clamp(24px,5vw,64px)' }}>
                <div className="mx-auto" style={{ maxWidth: '1360px' }}>
                    <div className="text-center" style={{ marginBottom: '44px' }}>
                        <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8963A', fontWeight: 600, marginBottom: '16px' }}>In every honeymoon</div>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(1.7rem,3vw,2.5rem)', color: '#1A1712', margin: 0 }}>
                            The little things, <span style={{ fontStyle: 'italic', color: '#B8963A' }}>already arranged</span>
                        </h2>
                    </div>
                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '28px' }}>
                        {INCLUSIONS.map((i) => (
                            <div key={i.title} style={{ background: '#F9F5EE', border: '1px solid rgba(184,150,58,0.2)', borderRadius: '8px', padding: '30px 28px', textAlign: 'center' }}>
                                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.9rem', color: '#B8963A', marginBottom: '12px' }}>{i.mark}</div>
                                <h4 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 500, fontSize: '1.2rem', color: '#1A1712', margin: '0 0 10px' }}>{i.title}</h4>
                                <p style={{ fontWeight: 300, fontSize: '0.9rem', lineHeight: 1.65, color: '#5C4A2A', margin: 0 }}>{i.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA BAND ===== */}
            <section className="relative overflow-hidden" style={{ background: '#243D24', padding: 'clamp(64px,8vw,120px) clamp(24px,5vw,64px)' }}>
                <div className="absolute inset-0" style={{ backgroundImage: 'url(/tours/honeymoon-cta.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#1c2f1c' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(26,46,26,0.82),rgba(36,61,36,0.9))' }} />
                <div className="relative mx-auto text-center" style={{ maxWidth: '760px' }}>
                    <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4AE5A', fontWeight: 600, marginBottom: '24px' }}>Tailor-Made</div>
                    <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(2rem,4.4vw,3.4rem)', lineHeight: 1.12, color: '#F9F5EE', margin: '0 0 22px' }}>
                        A honeymoon shaped around <span style={{ fontStyle: 'italic', color: '#D4AE5A' }}>the two of you</span>
                    </h2>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.85, color: 'rgba(249,245,238,0.72)', margin: '0 auto 38px', maxWidth: '50ch' }}>
                        Every romantic journey here can be softened, lengthened or dialled up. Tell us how you like to travel together, and your designer will compose something that’s only yours.
                    </p>
                    <a href="/contact" style={{ background: '#B8963A', color: '#F9F5EE', border: 'none', borderRadius: '25px', padding: '16px 36px', fontFamily: "'DM Sans',sans-serif", fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '11px' }}>
                        Start a tailor-made enquiry <span style={{ fontSize: '1.05rem' }}>→</span>
                    </a>
                </div>
            </section>
        </main>
    )
}