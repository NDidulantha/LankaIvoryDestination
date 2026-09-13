'use client'

import { useState, useMemo, useEffect } from 'react'

/* ────────────────────────────────────────────────────────────
   ADVENTURE TOURS — added manually for now.
   When the admin panel exists, replace this array with an API fetch.
   Filters, search, carousels and layout stay the same.
   - images:    one cover photo per route stop → /public/tours/adventure/<file>
                (auto-rotating carousel; falls back to a placeholder tint)
   - intensity: 1–5 (drives the pip meter + level word)
   - slug:      detail-page URL /tours/adventure/<slug> (built later)
   ──────────────────────────────────────────────────────────── */
type Adventure = {
    slug: string
    title: string
    cat: string
    duration: string
    route: string
    price: string
    desc: string
    intensity: number
    images: string[]
}

const TOURS: Adventure[] = [
    {
        slug: 'arugam-bay-surf-week', title: 'Arugam Bay Surf Week', cat: 'Surf', duration: '6 Days', route: 'Arugam Bay · Whiskey Point',
        price: '$1,400', desc: 'A week on the east coast’s legendary point breaks, with daily coaching, board hire and dawn sessions before the wind.',
        intensity: 2, images: ['/tours/adventure/arugam-1.jpg', '/tours/adventure/arugam-2.jpg'],
    },
    {
        slug: 'kitulgala-white-water', title: 'Kitulgala White Water', cat: 'Rafting', duration: '2 Days', route: 'Kitulgala · Kelani River',
        price: '$320', desc: 'Grade 2–3 rapids through jungle gorge, plus canyoning and a waterfall abseil, in the Bridge on the River Kwai country.',
        intensity: 3, images: ['/tours/adventure/kitulgala-1.jpg', '/tours/adventure/kitulgala-2.jpg'],
    },
    {
        slug: 'knuckles-range-trek', title: 'Knuckles Range Trek', cat: 'Trekking', duration: '4 Days', route: 'Knuckles · Meemure',
        price: '$780', desc: 'A hut-to-hut traverse of a UNESCO cloud-forest wilderness, through terraced villages few travellers ever reach.',
        intensity: 4, images: ['/tours/adventure/knuckles-1.jpg', '/tours/adventure/knuckles-2.jpg', '/tours/adventure/knuckles-3.jpg'],
    },
    {
        slug: 'adams-peak-night-climb', title: 'Adam’s Peak Night Climb', cat: 'Trekking', duration: '2 Days', route: 'Dalhousie · Sri Pada',
        price: '$260', desc: 'A pre-dawn ascent of the sacred 2,243-metre summit for sunrise and the mountain’s famous perfect triangular shadow.',
        intensity: 4, images: ['/tours/adventure/adams-1.jpg', '/tours/adventure/adams-2.jpg'],
    },
    {
        slug: 'kalpitiya-kitesurf-camp', title: 'Kalpitiya Kitesurf Camp', cat: 'Kitesurf', duration: '5 Days', route: 'Kalpitiya lagoon & flats',
        price: '$1,150', desc: 'Steady cross-shore wind and a flat-water lagoon make this the island’s best place to learn or progress on a kite.',
        intensity: 3, images: ['/tours/adventure/kalpitiya-1.jpg', '/tours/adventure/kalpitiya-2.jpg'],
    },
    {
        slug: 'mannar-kitesurf-safari', title: 'Mannar Kitesurf Safari', cat: 'Kitesurf', duration: '6 Days', route: 'Mannar · Vidataltivu flats',
        price: '$1,480', desc: 'A wind-chasing downwind safari across the remote north-west — huge empty flats, strong steady breeze and no crowds.',
        intensity: 4, images: ['/tours/adventure/mannar-1.jpg', '/tours/adventure/mannar-2.jpg'],
    },
    {
        slug: 'trinco-wreck-reef-diving', title: 'Trinco Wreck & Reef Diving', cat: 'Diving', duration: '4 Days', route: 'Trincomalee · Pigeon Island',
        price: '$920', desc: 'Warm, clear east-coast water over coral gardens and WWII wrecks, with blacktip reef sharks and turtles besides.',
        intensity: 3, images: ['/tours/adventure/trinco-1.jpg', '/tours/adventure/trinco-2.jpg'],
    },
    {
        slug: 'ella-rock-zipline-day', title: 'Ella Rock & Zipline Day', cat: 'Trekking', duration: '1 Day', route: 'Ella · Flying Ravana',
        price: '$110', desc: 'A morning hike up Ella Rock for the valley panorama, then the island’s longest zipline back across the tea.',
        intensity: 2, images: ['/tours/adventure/ella-1.jpg', '/tours/adventure/ella-2.jpg'],
    },
    {
        slug: 'mountain-bike-hill-country', title: 'Mountain Bike the Hill Country', cat: 'Cycling', duration: '5 Days', route: 'Kandy · Hatton · Ella',
        price: '$1,050', desc: 'Backcountry estate tracks and old railway paths through the tea highlands, with a support vehicle for the big climbs.',
        intensity: 4, images: ['/tours/adventure/bike-1.jpg', '/tours/adventure/bike-2.jpg', '/tours/adventure/bike-3.jpg'],
    },
    {
        slug: 'sinharaja-rainforest-expedition', title: 'Sinharaja Rainforest Expedition', cat: 'Trekking', duration: '3 Days', route: 'Sinharaja · Deniyaya',
        price: '$640', desc: 'A guided trek deep into the island’s last primary rainforest — leeches, endemics and canopy nights included.',
        intensity: 3, images: ['/tours/adventure/sinharaja-1.jpg', '/tours/adventure/sinharaja-2.jpg'],
    },
]

const CATEGORIES = ['All', 'Surf', 'Kitesurf', 'Trekking', 'Rafting', 'Diving', 'Cycling']

const STATS = [
    { n: '2,243m', label: 'Highest summit, Pidurutalagala' },
    { n: 'Grade 3', label: 'White water at Kitulgala' },
    { n: 'Year-round', label: 'Surf on two coasts' },
    { n: '40+', label: 'Dive sites offshore' },
]

const NOTES = [
    { mark: '✓', title: 'Certified guides', desc: 'Every activity runs with licensed, first-aid-trained instructors and a documented safety brief.' },
    { mark: '⛑', title: 'Checked gear', desc: 'Boards, rafts, harnesses and dive kit are provided, serviced and fitted — bring only your own shoes.' },
    { mark: '◷', title: 'Right-season timing', desc: 'We schedule each activity for its best swell, flow or visibility window, not just the calendar.' },
    { mark: '✦', title: 'Any fitness', desc: 'Intensity is rated on every trip, and most can be dialled up or down to suit your group.' },
]

const LEVEL_WORD = ['', 'Easy', 'Light', 'Moderate', 'Challenging', 'Extreme']

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

export default function AdventureTours() {
    const [cat, setCat] = useState('All')
    const [query, setQuery] = useState('')

    const tours = useMemo(() => {
        const q = query.trim().toLowerCase()
        return TOURS.filter((t) => {
            const okCat = cat === 'All' || t.cat === cat
            const hay = (t.title + ' ' + t.route + ' ' + t.desc + ' ' + t.cat).toLowerCase()
            return okCat && (!q || hay.includes(q))
        })
    }, [cat, query])

    return (
        <main style={{ background: '#F9F5EE', color: '#5C4A2A' }}>
            {/* ===== HERO ===== */}
            <header className="relative overflow-hidden" style={{ background: '#243D24', padding: 'clamp(112px,12vw,150px) clamp(24px,5vw,64px) clamp(64px,8vw,104px)' }}>
                <div role="img" aria-label="Group white-water rafting through river rapids" className="absolute inset-0" style={{ backgroundImage: 'url(/tours/adventure/adventure-hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#243D24' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(26,46,26,0.72),rgba(36,61,36,0.84))' }} />
                <div className="relative mx-auto text-center flex flex-col items-center" style={{ maxWidth: '1360px' }}>
                    <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8963A', fontWeight: 600, marginBottom: '34px' }}>
                        Home&nbsp;&nbsp;/&nbsp;&nbsp;Tours&nbsp;&nbsp;/&nbsp;&nbsp;<span style={{ color: '#D4AE5A' }}>Adventure Tours</span>
                    </div>
                    <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, color: '#F9F5EE', fontSize: 'clamp(2.6rem,6vw,5rem)', lineHeight: 1.04, margin: 0, maxWidth: '16ch' }}>
                        Adventure <span style={{ fontStyle: 'italic', color: '#D4AE5A' }}>Tours</span>
                    </h1>
                    <p style={{ fontFamily: "'Caveat',cursive", fontSize: 'clamp(1.5rem,2.6vw,2.1rem)', color: '#D4AE5A', margin: '18px 0 0' }}>
                        peak, rapid and reef, all in one day’s drive
                    </p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1.02rem', lineHeight: 1.85, color: 'rgba(249,245,238,0.72)', maxWidth: '52ch', margin: '26px 0 0' }}>
                        Surf breaks, cloud-forest ridges, white water and world-class dive sites — the island’s wild side, run with certified guides and the right kit, at whatever pace pushes you.
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
                        Small island, <span style={{ fontStyle: 'italic', color: '#B8963A' }}>big terrain</span>.
                    </h2>
                    <p style={{ fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.9, color: '#5C4A2A', margin: '0 auto', maxWidth: '60ch' }}>
                        Few places pack this much range into so little ground — a dawn surf, an afternoon on a rainforest ridge, a night under canvas. Every adventure here runs with certified guides, checked gear and a safety brief, so the only thing you carry is the nerve.
                    </p>
                </div>
            </section>

            {/* ===== FILTER / SEARCH ===== */}
            <section style={{ background: '#EFE6D0', padding: 'clamp(40px,5vw,60px) clamp(24px,5vw,64px)', borderTop: '1px solid rgba(184,150,58,0.16)', borderBottom: '1px solid rgba(184,150,58,0.16)' }}>
                <div className="mx-auto" style={{ maxWidth: '1360px' }}>
                    <div className="flex items-end justify-between flex-wrap" style={{ gap: '24px', marginBottom: '26px' }}>
                        <div>
                            <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8963A', fontWeight: 600, marginBottom: '10px' }}>Browse the adventures</div>
                            <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(1.4rem,2.4vw,1.95rem)', color: '#1A1712', margin: 0 }}>
                                <span style={{ fontStyle: 'italic', color: '#B8963A' }}>{tours.length}</span> adventures
                            </h3>
                        </div>
                        <div className="flex items-center" style={{ gap: '10px', background: '#F9F5EE', border: '1px solid rgba(184,150,58,0.3)', borderRadius: '25px', padding: '11px 20px', minWidth: '280px' }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8A8278" strokeWidth="2"><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" /></svg>
                            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search activities, places…"
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

            {/* ===== ADVENTURE GRID ===== */}
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
                                        <p style={{ fontWeight: 300, fontSize: '0.94rem', lineHeight: 1.72, color: '#5C4A2A', margin: '0 0 18px' }}>{t.desc}</p>
                                        <div className="flex items-center" style={{ gap: '8px', marginBottom: '20px' }}>
                                            <span style={{ fontSize: '0.64rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A8278' }}>Intensity</span>
                                            <span className="flex" style={{ gap: '4px' }}>
                        {[1, 2, 3, 4, 5].map((p) => (
                            <span key={p} style={{ width: '9px', height: '9px', borderRadius: '50%', background: p <= t.intensity ? '#B8963A' : 'rgba(184,150,58,0.25)' }} />
                        ))}
                      </span>
                                            <span style={{ fontSize: '0.7rem', color: '#5C4A2A', marginLeft: '2px' }}>{LEVEL_WORD[t.intensity]}</span>
                                        </div>
                                        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', paddingTop: '20px', borderTop: '1px solid rgba(184,150,58,0.16)' }}>
                                            <div>
                                                <div style={{ fontSize: '0.64rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A8278', marginBottom: '3px' }}>From</div>
                                                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.35rem', color: '#B8963A', lineHeight: 1 }}>
                                                    <span style={{ fontWeight: 600 }}>{t.price}</span>
                                                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.7rem', fontWeight: 300, color: '#8A8278', marginLeft: '6px' }}>/ person</span>
                                                </div>
                                            </div>
                                            <a href={'/tours/adventure/' + t.slug} style={{ background: '#B8963A', color: '#F9F5EE', border: 'none', borderRadius: '25px', padding: '12px 22px', fontFamily: "'DM Sans',sans-serif", fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '9px', whiteSpace: 'nowrap' }}>
                                                View Details <span style={{ fontSize: '0.95rem' }}>→</span>
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                            <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: '1.6rem', color: '#8A8278', margin: '0 0 8px' }}>No adventures match that search.</p>
                            <p style={{ fontWeight: 300, color: '#8A8278', margin: 0 }}>Try an activity, a place, or clear the filters.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ===== GOOD TO KNOW STRIP ===== */}
            <section style={{ background: '#EBF0E8', padding: 'clamp(52px,6vw,84px) clamp(24px,5vw,64px)' }}>
                <div className="mx-auto" style={{ maxWidth: '1360px' }}>
                    <div className="text-center" style={{ marginBottom: '44px' }}>
                        <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8963A', fontWeight: 600, marginBottom: '16px' }}>Before you go</div>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(1.7rem,3vw,2.5rem)', color: '#1A1712', margin: 0 }}>
                            Adventure, <span style={{ fontStyle: 'italic', color: '#B8963A' }}>handled properly</span>
                        </h2>
                    </div>
                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '28px' }}>
                        {NOTES.map((n) => (
                            <div key={n.title} style={{ background: '#F9F5EE', border: '1px solid rgba(184,150,58,0.2)', borderRadius: '8px', padding: '30px 28px' }}>
                                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.9rem', color: '#B8963A', marginBottom: '12px' }}>{n.mark}</div>
                                <h4 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 500, fontSize: '1.2rem', color: '#1A1712', margin: '0 0 10px' }}>{n.title}</h4>
                                <p style={{ fontWeight: 300, fontSize: '0.9rem', lineHeight: 1.65, color: '#5C4A2A', margin: 0 }}>{n.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA BAND ===== */}
            <section className="relative overflow-hidden" style={{ background: '#243D24', padding: 'clamp(64px,8vw,120px) clamp(24px,5vw,64px)' }}>
                <div className="absolute inset-0" style={{ backgroundImage: 'url(/tours/adventure-cta.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#1c2f1c' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(26,46,26,0.82),rgba(36,61,36,0.9))' }} />
                <div className="relative mx-auto text-center" style={{ maxWidth: '760px' }}>
                    <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4AE5A', fontWeight: 600, marginBottom: '24px' }}>Tailor-Made</div>
                    <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(2rem,4.4vw,3.4rem)', lineHeight: 1.12, color: '#F9F5EE', margin: '0 0 22px' }}>
                        Stack your own <span style={{ fontStyle: 'italic', color: '#D4AE5A' }}>multi-sport week</span>
                    </h2>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.85, color: 'rgba(249,245,238,0.72)', margin: '0 auto 38px', maxWidth: '50ch' }}>
                        Surf, trek, raft and dive in a single trip — we’ll sequence the activities, seasons and rest days so it flows, not exhausts. Tell us your appetite and we’ll build it.
                    </p>
                    <a href="/contact" style={{ background: '#B8963A', color: '#F9F5EE', border: 'none', borderRadius: '25px', padding: '16px 36px', fontFamily: "'DM Sans',sans-serif", fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '11px' }}>
                        Start a tailor-made enquiry <span style={{ fontSize: '1.05rem' }}>→</span>
                    </a>
                </div>
            </section>
        </main>
    )
}