'use client'

import { useState, useMemo } from 'react'

/* ────────────────────────────────────────────────────────────
   DAY TOURS — added manually for now.
   When the admin panel exists, replace this array with an API fetch.
   Filters, search and layout stay the same.
   - img:  cover photo → /public/tours/day/<file>  (falls back to placeholder)
   - slug: detail-page URL /tours/day-tours/<slug> (built later)
   ──────────────────────────────────────────────────────────── */
type DayTour = {
    slug: string
    title: string
    cat: string
    duration: string
    location: string
    price: string
    desc: string
    img: string
}

const DAY_TOURS: DayTour[] = [
    { slug: 'anuradhapura-day-tour', title: 'Anuradhapura Day Tour', cat: 'Cultural', duration: '9 hrs', location: 'Anuradhapura', price: '$95', desc: 'The ancient sacred city — vast dagobas, monastery ruins and the sacred Sri Maha Bodhi tree, explored by bicycle or car.', img: '/tours/day/anuradhapura.jpg' },
    { slug: 'belihuloya-day-tour', title: 'Belihuloya Day Tour', cat: 'Nature', duration: '8 hrs', location: 'Belihuloya', price: '$80', desc: 'Where the wet and dry zones meet at 1,500m — cool streams, waterfalls and some of the island\'s most peaceful walking country.', img: '/tours/day/belihuloya.jpg' },
    { slug: 'colombo-day-tour', title: 'Day Tour of Colombo', cat: 'City', duration: '6 hrs', location: 'Colombo', price: '$70', desc: 'Colonial arcades, buzzing markets, sea-facing promenades and modern skyline — the many faces of the capital in a day.', img: '/tours/day/colombo.jpg' },
    { slug: 'galle-day-tour', title: 'Galle Day Tour', cat: 'Cultural', duration: '9 hrs', location: 'Galle', price: '$90', desc: 'The Dutch fort by the sea — ramparts, lighthouse, boutique lanes and a coastline that has drawn travellers for centuries.', img: '/tours/day/galle.jpg' },
    { slug: 'geoffrey-bawa-day-tour', title: 'Geoffrey Bawa Works', cat: 'Cultural', duration: 'Full day', location: 'Island-wide', price: '$120', desc: 'A journey through the masterworks of Sri Lanka\'s greatest architect — tropical modernism at its most serene.', img: '/tours/day/bawa.jpg' },
    { slug: 'helicopter-tours', title: 'Helicopter Tours', cat: 'Adventure', duration: 'Flexible', location: 'Island-wide', price: '$650', desc: 'See the island from above — fortresses, coastline and tea country compressed into a single breathtaking flight.', img: '/tours/day/helicopter.jpg' },
    { slug: 'hot-air-ballooning-day-tour', title: 'Hot Air Ballooning', cat: 'Adventure', duration: 'Dawn', location: 'Dambulla', price: '$220', desc: 'Drift silently over the cultural triangle at sunrise, paddy fields and rock fortresses glowing beneath you.', img: '/tours/day/ballooning.jpg' },
    { slug: 'ingiriya-day-tour', title: 'Ingiriya Day Tour', cat: 'Nature', duration: '7 hrs', location: 'Ingiriya', price: '$75', desc: 'A quiet green escape of rubber estates and the Bodhinagala forest hermitage, close to Colombo yet a world away.', img: '/tours/day/ingiriya.jpg' },
    { slug: 'kandy-day-tour', title: 'Kandy Day Tour', cat: 'Cultural', duration: '9 hrs', location: 'Kandy', price: '$90', desc: 'The hill capital and its Temple of the Sacred Tooth, lake, botanical gardens and evening cultural dance.', img: '/tours/day/kandy.jpg' },
    { slug: 'kithulgala-white-water-rafting', title: 'Kithulgala Rafting', cat: 'Adventure', duration: 'Full day', location: 'Kithulgala', price: '$110', desc: 'Grade 2–3 rapids through rainforest where "The Bridge on the River Kwai" was filmed — thrill and jungle in one.', img: '/tours/day/kithulgala.jpg' },
    { slug: 'little-england-day-tour', title: 'Little England Day Tour', cat: 'Nature', duration: 'Full day', location: 'Nuwara Eliya', price: '$100', desc: 'Misty tea country, colonial bungalows and cool mountain air — the highland town the British built to feel like home.', img: '/tours/day/nuwara-eliya.jpg' },
    { slug: 'negombo-lagoon-fishing-day-tour', title: 'Negombo Lagoon Fishing', cat: 'Nature', duration: 'Half day', location: 'Negombo', price: '$65', desc: 'Glide the lagoon on a traditional outrigger with local fishermen, past mangroves and colonial-era canals.', img: '/tours/day/negombo.jpg' },
    { slug: 'polonnaruwa-day-tour', title: 'Polonnaruwa Day Tour', cat: 'Cultural', duration: '9 hrs', location: 'Polonnaruwa', price: '$95', desc: 'The medieval royal capital — remarkably preserved palaces, temples and the serene stone Buddhas of Gal Vihara.', img: '/tours/day/polonnaruwa.jpg' },
    { slug: 'sigiriya-dambulla-day-tour', title: 'Sigiriya & Dambulla', cat: 'Cultural', duration: '11 hrs', location: 'Sigiriya', price: '$115', desc: 'The Lion Rock fortress and the golden cave temples — the twin jewels of the cultural triangle in one day.', img: '/tours/day/sigiriya.jpg' },
    { slug: 'sinharaja-day-tour', title: 'Sinharaja Day Tour', cat: 'Nature', duration: 'Full day', location: 'Sinharaja', price: '$105', desc: 'The island\'s last primary rainforest — a UNESCO biosphere alive with endemic birds, frogs and towering canopy.', img: '/tours/day/sinharaja.jpg' },
    { slug: 'udawalawe-national-park-day-tour', title: 'Udawalawe National Park', cat: 'Wildlife', duration: 'Full day', location: 'Udawalawe', price: '$120', desc: 'Near-guaranteed elephant sightings across open grassland — the finest place on the island to see herds up close.', img: '/tours/day/udawalawe.jpg' },
    { slug: 'whale-watching-day-tour', title: 'Whale Watching Day Tour', cat: 'Wildlife', duration: 'Half day', location: 'Mirissa', price: '$85', desc: 'Head into the deep blue in search of blue whales and spinner dolphins off the southern coast.', img: '/tours/day/whale-watching.jpg' },
    { slug: 'wilpattu-national-park-day-tour', title: 'Wilpattu National Park', cat: 'Wildlife', duration: 'Full day', location: 'Wilpattu', price: '$125', desc: 'The largest, wildest park — natural lakes, leopards and a raw wilderness feel far from the crowds.', img: '/tours/day/wilpattu.jpg' },
    { slug: 'yala-national-park-day-tour', title: 'Yala National Park', cat: 'Wildlife', duration: 'Full day', location: 'Yala', price: '$120', desc: 'The highest density of leopards on earth, plus elephants, crocodiles and birdlife across scrub and lagoon.', img: '/tours/day/yala.jpg' },
]

const CATEGORIES = ['All', 'Cultural', 'Wildlife', 'Nature', 'Adventure', 'City']

export default function DayTours() {
    const [cat, setCat] = useState('All')
    const [query, setQuery] = useState('')

    const tours = useMemo(() => {
        const q = query.trim().toLowerCase()
        return DAY_TOURS.filter((t) => {
            const okCat = cat === 'All' || t.cat === cat
            const hay = (t.title + ' ' + t.location + ' ' + t.desc + ' ' + t.cat).toLowerCase()
            return okCat && (!q || hay.includes(q))
        })
    }, [cat, query])

    return (
        <main style={{ background: '#F9F5EE', color: '#5C4A2A' }}>
            {/* ===== HERO ===== */}
            <header className="relative overflow-hidden" style={{ background: '#243D24', padding: 'clamp(112px,12vw,150px) clamp(24px,5vw,64px) clamp(64px,8vw,104px)' }}>
                <div role="img" aria-label="Galle Fort's old town street at sunset, with tuk-tuks and shopfronts" className="absolute inset-0" style={{ backgroundImage: 'url(/tours/day/day-tours-hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#243D24' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(26,46,26,0.52),rgba(36,61,36,0.74))' }} />
                <div className="relative mx-auto text-center flex flex-col items-center" style={{ maxWidth: '1360px' }}>
                    <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8963A', fontWeight: 600, marginBottom: '34px' }}>
                        Home&nbsp;&nbsp;/&nbsp;&nbsp;Tours&nbsp;&nbsp;/&nbsp;&nbsp;<span style={{ color: '#D4AE5A' }}>Day Tours</span>
                    </div>
                    <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, color: '#F9F5EE', fontSize: 'clamp(2.6rem,6vw,5rem)', lineHeight: 1.04, margin: 0, maxWidth: '16ch' }}>
                        Day <span style={{ fontStyle: 'italic', color: '#D4AE5A' }}>Tours</span>
                    </h1>
                    <p style={{ fontFamily: "'Caveat',cursive", fontSize: 'clamp(1.5rem,2.6vw,2.1rem)', color: '#D4AE5A', margin: '18px 0 0' }}>
                        the whole island, one perfect day at a time
                    </p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1.02rem', lineHeight: 1.85, color: 'rgba(249,245,238,0.72)', maxWidth: '52ch', margin: '26px 0 0' }}>
                        Single-day escapes with a private guide and vehicle — sacred cities, leopard parks, tea-country trails and surf coast, each home again by nightfall.
                    </p>
                </div>
            </header>

            {/* ===== INTRO ===== */}
            <section style={{ background: '#F9F5EE', padding: 'clamp(56px,7vw,88px) clamp(24px,5vw,64px)' }}>
                <div className="mx-auto text-center" style={{ maxWidth: '820px' }}>
                    <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8963A', fontWeight: 600, marginBottom: '20px' }}>Ayubowan · Welcome</div>
                    <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(1.8rem,3.2vw,2.6rem)', lineHeight: 1.18, color: '#1A1712', margin: '0 0 22px' }}>
                        Short on days, not on <span style={{ fontStyle: 'italic', color: '#B8963A' }}>wonder</span>.
                    </h2>
                    <p style={{ fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.9, color: '#5C4A2A', margin: '0 auto', maxWidth: '60ch' }}>
                        Whether you have one open morning or a free week to fill, our day tours slot cleanly around your stay. Every one is privately guided, flexibly timed, and easily paired into a longer route — just ask your designer.
                    </p>
                </div>
            </section>

            {/* ===== FILTER / SEARCH ===== */}
            <section style={{ background: '#EFE6D0', padding: 'clamp(40px,5vw,60px) clamp(24px,5vw,64px)', borderTop: '1px solid rgba(184,150,58,0.16)', borderBottom: '1px solid rgba(184,150,58,0.16)' }}>
                <div className="mx-auto" style={{ maxWidth: '1360px' }}>
                    <div className="flex items-end justify-between flex-wrap" style={{ gap: '24px', marginBottom: '26px' }}>
                        <div>
                            <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8963A', fontWeight: 600, marginBottom: '10px' }}>Browse the day tours</div>
                            <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(1.4rem,2.4vw,1.95rem)', color: '#1A1712', margin: 0 }}>
                                <span style={{ fontStyle: 'italic', color: '#B8963A' }}>{tours.length}</span> day tours
                            </h3>
                        </div>
                        <div className="flex items-center" style={{ gap: '10px', background: '#F9F5EE', border: '1px solid rgba(184,150,58,0.3)', borderRadius: '25px', padding: '11px 20px', minWidth: '280px' }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8A8278" strokeWidth="2"><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" /></svg>
                            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tours, towns, parks…"
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
                        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 'clamp(24px,2.4vw,34px)' }}>
                            {tours.map((t) => (
                                <article key={t.slug} className="sig-card flex flex-col"
                                         style={{ background: '#FFFFFF', border: '1px solid rgba(184,150,58,0.16)', borderRadius: '8px', overflow: 'hidden' }}>
                                    <div className="relative" style={{ height: '210px', overflow: 'hidden' }}>
                                        <div className="absolute inset-0 flex items-center justify-center"
                                             style={{ backgroundImage: 'url(' + t.img + ')', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#E2D5BA' }}>
                                            <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: '0.62rem', color: '#8A8278', mixBlendMode: 'multiply', opacity: 0.5, textAlign: 'center', padding: '0 12px' }}>photo — {t.title}</span>
                                        </div>
                                        <span style={{ position: 'absolute', top: '14px', left: '14px', background: 'rgba(184,150,58,0.92)', color: '#F9F5EE', borderRadius: '25px', padding: '5px 13px', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{t.cat}</span>
                                        <span style={{ position: 'absolute', top: '14px', right: '14px', background: 'rgba(26,23,18,0.62)', color: '#F9F5EE', borderRadius: '25px', padding: '5px 13px', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{t.duration}</span>
                                    </div>
                                    <div className="flex flex-col flex-1" style={{ padding: '24px 26px 26px' }}>
                                        <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 500, fontSize: '1.42rem', lineHeight: 1.18, color: '#1A1712', margin: '0 0 8px' }}>{t.title}</h3>
                                        <div className="flex items-center" style={{ gap: '7px', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A8278', marginBottom: '14px' }}>
                                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#B8963A" strokeWidth="2"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.4" /></svg>
                                            {t.location}
                                        </div>
                                        <p style={{ fontWeight: 300, fontSize: '0.92rem', lineHeight: 1.7, color: '#5C4A2A', margin: '0 0 20px' }}>{t.desc}</p>
                                        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', paddingTop: '18px', borderTop: '1px solid rgba(184,150,58,0.16)' }}>
                                            <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.82rem', color: '#5C4A2A' }}>
                                                <span style={{ fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A8278', marginRight: '6px' }}>From</span>
                                                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.15rem', color: '#B8963A', fontWeight: 600 }}>{t.price}</span>
                                            </div>
                                            <a href={'/tours/day-tours/' + t.slug} style={{ color: '#B8963A', fontFamily: "'DM Sans',sans-serif", fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
                                                Read More <span style={{ fontSize: '0.95rem' }}>→</span>
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                            <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: '1.6rem', color: '#8A8278', margin: '0 0 8px' }}>No day tours match that search.</p>
                            <p style={{ fontWeight: 300, color: '#8A8278', margin: 0 }}>Try a town, a park, or clear the filters.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ===== CTA BAND ===== */}
            <section className="relative overflow-hidden" style={{ background: '#243D24', padding: 'clamp(64px,8vw,120px) clamp(24px,5vw,64px)' }}>
                <div className="absolute inset-0" style={{ backgroundImage: 'url(/tours/day-tours-cta.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#1c2f1c' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(26,46,26,0.82),rgba(36,61,36,0.9))' }} />
                <div className="relative mx-auto text-center" style={{ maxWidth: '760px' }}>
                    <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4AE5A', fontWeight: 600, marginBottom: '24px' }}>Tailor-Made</div>
                    <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(2rem,4.4vw,3.4rem)', lineHeight: 1.12, color: '#F9F5EE', margin: '0 0 22px' }}>
                        String your favourite days into a <span style={{ fontStyle: 'italic', color: '#D4AE5A' }}>journey</span>
                    </h2>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.85, color: 'rgba(249,245,238,0.72)', margin: '0 auto 38px', maxWidth: '50ch' }}>
                        Any day tour here can become a stop on a longer private route. Choose the ones that call to you, and your designer will thread them together with the right stays in between.
                    </p>
                    <a href="/contact" style={{ background: '#B8963A', color: '#F9F5EE', border: 'none', borderRadius: '25px', padding: '16px 36px', fontFamily: "'DM Sans',sans-serif", fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '11px' }}>
                        Start a tailor-made enquiry <span style={{ fontSize: '1.05rem' }}>→</span>
                    </a>
                </div>
            </section>
        </main>
    )
}