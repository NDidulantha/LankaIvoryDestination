'use client'

import { useState, useMemo, useEffect } from 'react'

/* ────────────────────────────────────────────────────────────
   WILDLIFE SAFARIS — added manually for now.
   When the admin panel exists, replace this array with an API fetch.
   Filters, search, carousels and layout stay the same.
   - images:  one cover photo per route stop → /public/tours/wildlife/<file>
              (auto-rotating carousel; falls back to a placeholder tint)
   - species: small tags shown on each card
   - slug:    detail-page URL /tours/wildlife/<slug> (built later)
   ──────────────────────────────────────────────────────────── */
type Safari = {
    slug: string
    title: string
    cat: string
    duration: string
    route: string
    price: string
    desc: string
    species: string[]
    images: string[]
}

const SAFARIS: Safari[] = [
    {
        slug: 'leopard-trail-yala-wilpattu', title: 'The Leopard Trail', cat: 'Leopard', duration: '6 Days', route: 'Wilpattu · Yala',
        price: '$2,400', desc: 'Two of the island’s great leopard parks, back to back — quiet Wilpattu and dramatic Yala Block 1, with dawn and dusk drives for the best odds.',
        species: ['Leopard', 'Sloth Bear', 'Elephant'],
        images: ['/tours/wildlife/leopard-1.jpg', '/tours/wildlife/leopard-2.jpg'],
    },
    {
        slug: 'great-elephant-gathering', title: 'The Great Gathering', cat: 'Elephant', duration: '5 Days', route: 'Minneriya · Kaudulla · Sigiriya',
        price: '$1,950', desc: 'Timed to the world’s largest gathering of wild Asian elephants, when hundreds converge on the receding Minneriya reservoir — a spectacle like no other.',
        species: ['Elephant', 'Water Birds', 'Deer'],
        images: ['/tours/wildlife/gathering-1.jpg', '/tours/wildlife/gathering-2.jpg', '/tours/wildlife/gathering-3.jpg'],
    },
    {
        slug: 'blue-whales-and-leopards', title: 'Whales & Leopards', cat: 'Marine', duration: '8 Days', route: 'Mirissa · Udawalawe · Yala',
        price: '$3,200', desc: 'The ultimate land-and-sea safari — blue whales off the southern coast, elephants at Udawalawe, and leopards in Yala, all in one seamless route.',
        species: ['Blue Whale', 'Leopard', 'Elephant'],
        images: ['/tours/wildlife/whales-1.jpg', '/tours/wildlife/whales-2.jpg', '/tours/wildlife/whales-3.jpg'],
    },
    {
        slug: 'birding-ceylon', title: 'Birding Ceylon', cat: 'Birding', duration: '9 Days', route: 'Sinharaja · Bundala · Kitulgala',
        price: '$3,400', desc: 'For serious birders — the endemic-rich Sinharaja rainforest, the wetland birds of Bundala, and the wet-zone specialists of Kitulgala, with a specialist guide.',
        species: ['Endemics', 'Waterfowl', 'Raptors'],
        images: ['/tours/wildlife/birding-1.jpg', '/tours/wildlife/birding-2.jpg', '/tours/wildlife/birding-3.jpg'],
    },
    {
        slug: 'big-game-grand-safari', title: 'Big Game Grand Safari', cat: 'Grand', duration: '12 Days', route: 'Wilpattu · Minneriya · Udawalawe · Yala',
        price: '$4,900', desc: 'Four parks, one continuous wild story — leopards, the elephant gathering, sloth bears and birdlife, with luxury tented nights under the stars.',
        species: ['Leopard', 'Elephant', 'Sloth Bear'],
        images: ['/tours/wildlife/grand-1.jpg', '/tours/wildlife/grand-2.jpg', '/tours/wildlife/grand-3.jpg', '/tours/wildlife/grand-4.jpg'],
    },
    {
        slug: 'udawalawe-elephant-safari', title: 'Elephants of Udawalawe', cat: 'Elephant', duration: '4 Days', route: 'Udawalawe · Transit Home',
        price: '$1,600', desc: 'A short, near-guaranteed elephant safari across Udawalawe’s open grassland, with a visit to the Elephant Transit Home where orphans are raised for the wild.',
        species: ['Elephant', 'Eagles', 'Buffalo'],
        images: ['/tours/wildlife/udawalawe-1.jpg', '/tours/wildlife/udawalawe-2.jpg'],
    },
]

const CATEGORIES = ['All', 'Leopard', 'Elephant', 'Marine', 'Birding', 'Grand']

const STATS = [
    { n: '30+', label: 'Leopards per park block' },
    { n: '300+', label: 'Elephants at the Gathering' },
    { n: 'Blue', label: 'Whales offshore' },
    { n: '433', label: 'Bird species' },
]

const SEASONS = [
    { months: 'Feb – Jul', title: 'Leopards, Yala', desc: 'Yala’s dry season drops water levels and pushes wildlife into the open — the peak window for leopard sightings.' },
    { months: 'Jun – Sep', title: 'The Elephant Gathering', desc: 'Hundreds of elephants converge on the Minneriya reservoir as the dry season shrinks the water — the year’s great spectacle.' },
    { months: 'Nov – Apr', title: 'Blue Whales, South', desc: 'Blue and sperm whales cruise the deep water off Mirissa on the southern coast, calm seas making for the best viewing.' },
    { months: 'Nov – Mar', title: 'Migrant Birds', desc: 'Migratory species swell the wetlands of Bundala and beyond, joining Sri Lanka’s 33 endemics for the finest birding.' },
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

export default function WildlifeSafari() {
    const [cat, setCat] = useState('All')
    const [query, setQuery] = useState('')

    const tours = useMemo(() => {
        const q = query.trim().toLowerCase()
        return SAFARIS.filter((t) => {
            const okCat = cat === 'All' || t.cat === cat
            const hay = (t.title + ' ' + t.route + ' ' + t.desc + ' ' + t.cat + ' ' + t.species.join(' ')).toLowerCase()
            return okCat && (!q || hay.includes(q))
        })
    }, [cat, query])

    return (
        <main style={{ background: '#F9F5EE', color: '#5C4A2A' }}>
            {/* ===== HERO ===== */}
            <header className="relative overflow-hidden" style={{ background: '#243D24', padding: 'clamp(112px,12vw,150px) clamp(24px,5vw,64px) clamp(64px,8vw,104px)' }}>
                <div role="img" aria-label="Sri Lankan leopard resting on a tree branch" className="absolute inset-0" style={{ backgroundImage: 'url(/tours/wildlife/wildlife-hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#243D24' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(26,46,26,0.52),rgba(36,61,36,0.64))' }} />
                <div className="relative mx-auto text-center flex flex-col items-center" style={{ maxWidth: '1360px' }}>
                    <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8963A', fontWeight: 600, marginBottom: '34px' }}>
                        Home&nbsp;&nbsp;/&nbsp;&nbsp;Tours&nbsp;&nbsp;/&nbsp;&nbsp;<span style={{ color: '#D4AE5A' }}>Wildlife Safari</span>
                    </div>
                    <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, color: '#F9F5EE', fontSize: 'clamp(2.6rem,6vw,5rem)', lineHeight: 1.04, margin: 0, maxWidth: '16ch' }}>
                        Wildlife <span style={{ fontStyle: 'italic', color: '#D4AE5A' }}>Safari</span>
                    </h1>
                    <p style={{ fontFamily: "'Caveat',cursive", fontSize: 'clamp(1.5rem,2.6vw,2.1rem)', color: '#D4AE5A', margin: '18px 0 0' }}>
                        leopards, elephants and whales, on one small island
                    </p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1.02rem', lineHeight: 1.85, color: 'rgba(249,245,238,0.72)', maxWidth: '52ch', margin: '26px 0 0' }}>
                        Sri Lanka packs Asia’s finest wildlife into a few hours’ drive — the world’s best leopard-spotting, the great elephant gathering, and blue whales offshore. Privately guided, with naturalists who know each park.
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
                        Wild Ceylon, at the <span style={{ fontStyle: 'italic', color: '#B8963A' }}>right hour</span>.
                    </h2>
                    <p style={{ fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.9, color: '#5C4A2A', margin: '0 auto', maxWidth: '60ch' }}>
                        Great wildlife is a matter of timing. Our safaris are built around dawn and dusk drives, quieter park blocks and the seasons each species keeps — led by naturalist guides who read the tracks, not the crowds.
                    </p>
                </div>
            </section>

            {/* ===== FILTER / SEARCH ===== */}
            <section style={{ background: '#EFE6D0', padding: 'clamp(40px,5vw,60px) clamp(24px,5vw,64px)', borderTop: '1px solid rgba(184,150,58,0.16)', borderBottom: '1px solid rgba(184,150,58,0.16)' }}>
                <div className="mx-auto" style={{ maxWidth: '1360px' }}>
                    <div className="flex items-end justify-between flex-wrap" style={{ gap: '24px', marginBottom: '26px' }}>
                        <div>
                            <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8963A', fontWeight: 600, marginBottom: '10px' }}>Browse the safaris</div>
                            <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(1.4rem,2.4vw,1.95rem)', color: '#1A1712', margin: 0 }}>
                                <span style={{ fontStyle: 'italic', color: '#B8963A' }}>{tours.length}</span> safari journeys
                            </h3>
                        </div>
                        <div className="flex items-center" style={{ gap: '10px', background: '#F9F5EE', border: '1px solid rgba(184,150,58,0.3)', borderRadius: '25px', padding: '11px 20px', minWidth: '280px' }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8A8278" strokeWidth="2"><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" /></svg>
                            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search parks, species, seasons…"
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

            {/* ===== SAFARI GRID ===== */}
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
                                        <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 500, fontSize: '1.6rem', lineHeight: 1.16, color: '#1A1712', margin: '0 0 10px' }}>{t.title}</h3>
                                        <p style={{ fontWeight: 300, fontSize: '0.94rem', lineHeight: 1.72, color: '#5C4A2A', margin: '0 0 16px' }}>{t.desc}</p>
                                        <div className="flex flex-wrap" style={{ gap: '8px', marginBottom: '22px' }}>
                                            {t.species.map((sp) => (
                                                <span key={sp} style={{ background: '#EBF0E8', color: '#243D24', borderRadius: '20px', padding: '5px 12px', fontSize: '0.68rem', fontWeight: 500, letterSpacing: '0.04em' }}>{sp}</span>
                                            ))}
                                        </div>
                                        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', paddingTop: '20px', borderTop: '1px solid rgba(184,150,58,0.16)' }}>
                                            <div>
                                                <div style={{ fontSize: '0.64rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A8278', marginBottom: '3px' }}>From</div>
                                                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.35rem', color: '#B8963A', lineHeight: 1 }}>
                                                    <span style={{ fontWeight: 600 }}>{t.price}</span>
                                                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.7rem', fontWeight: 300, color: '#8A8278', marginLeft: '6px' }}>/ person</span>
                                                </div>
                                            </div>
                                            <a href={'/tours/wildlife/' + t.slug} style={{ background: '#B8963A', color: '#F9F5EE', border: 'none', borderRadius: '25px', padding: '12px 22px', fontFamily: "'DM Sans',sans-serif", fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '9px', whiteSpace: 'nowrap' }}>
                                                View Safari <span style={{ fontSize: '0.95rem' }}>→</span>
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                            <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: '1.6rem', color: '#8A8278', margin: '0 0 8px' }}>No safaris match that search.</p>
                            <p style={{ fontWeight: 300, color: '#8A8278', margin: 0 }}>Try a park, a species, or clear the filters.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ===== SEASON STRIP ===== */}
            <section style={{ background: '#EBF0E8', padding: 'clamp(52px,6vw,84px) clamp(24px,5vw,64px)' }}>
                <div className="mx-auto" style={{ maxWidth: '1360px' }}>
                    <div className="text-center" style={{ marginBottom: '44px' }}>
                        <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8963A', fontWeight: 600, marginBottom: '16px' }}>The wildlife calendar</div>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(1.7rem,3vw,2.5rem)', color: '#1A1712', margin: 0 }}>
                            When to come for <span style={{ fontStyle: 'italic', color: '#B8963A' }}>what</span>
                        </h2>
                    </div>
                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '28px' }}>
                        {SEASONS.map((s) => (
                            <div key={s.title} style={{ background: '#F9F5EE', border: '1px solid rgba(184,150,58,0.2)', borderRadius: '8px', padding: '30px 28px' }}>
                                <div style={{ fontSize: '0.64rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#B8963A', fontWeight: 600, marginBottom: '10px' }}>{s.months}</div>
                                <h4 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 500, fontSize: '1.25rem', color: '#1A1712', margin: '0 0 10px' }}>{s.title}</h4>
                                <p style={{ fontWeight: 300, fontSize: '0.9rem', lineHeight: 1.65, color: '#5C4A2A', margin: 0 }}>{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== CTA BAND ===== */}
            <section className="relative overflow-hidden" style={{ background: '#243D24', padding: 'clamp(64px,8vw,120px) clamp(24px,5vw,64px)' }}>
                <div className="absolute inset-0" style={{ backgroundImage: 'url(/tours/wildlife-cta.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#1c2f1c' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(26,46,26,0.82),rgba(36,61,36,0.9))' }} />
                <div className="relative mx-auto text-center" style={{ maxWidth: '760px' }}>
                    <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4AE5A', fontWeight: 600, marginBottom: '24px' }}>Tailor-Made</div>
                    <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(2rem,4.4vw,3.4rem)', lineHeight: 1.12, color: '#F9F5EE', margin: '0 0 22px' }}>
                        Chase the species <span style={{ fontStyle: 'italic', color: '#D4AE5A' }}>you came for</span>
                    </h2>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.85, color: 'rgba(249,245,238,0.72)', margin: '0 auto 38px', maxWidth: '50ch' }}>
                        Whether it’s leopards, the elephant gathering or blue whales, we’ll time your route to the season and the parks that give you the best odds. Tell us your wish list.
                    </p>
                    <a href="/contact" style={{ background: '#B8963A', color: '#F9F5EE', border: 'none', borderRadius: '25px', padding: '16px 36px', fontFamily: "'DM Sans',sans-serif", fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '11px' }}>
                        Start a tailor-made enquiry <span style={{ fontSize: '1.05rem' }}>→</span>
                    </a>
                </div>
            </section>
        </main>
    )
}