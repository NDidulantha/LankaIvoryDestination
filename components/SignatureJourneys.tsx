'use client'

import { useState, useMemo, useEffect } from 'react'
import { JOURNEYS } from '@/lib/journeys'

const CATEGORIES = ['All', 'Cultural', 'Wildlife', 'Nature', 'Romance']

const PhotoBlock = ({ label, src, dark }: { label: string; src?: string; dark?: boolean }) => (
    <div
        className="absolute inset-0 flex items-center justify-center"
        style={
            src
                ? { backgroundImage: 'url(' + src + ')', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#243D24' }
                : { background: dark
                        ? 'repeating-linear-gradient(135deg,#d8e0d3 0 16px,#c9d4c3 16px 32px)'
                        : 'repeating-linear-gradient(135deg,#E2D5BA 0 16px,#EFE6D0 16px 32px)' }
        }
    >
        {!src && (
            <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: '0.66rem', color: dark ? '#5C4A2A' : '#8A8278' }}>
        {label}
      </span>
        )}
    </div>
)

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
                <div
                    key={k}
                    className="absolute inset-0 flex items-center justify-center transition-opacity duration-1000"
                    style={{
                        opacity: idx === k ? 1 : 0,
                        backgroundImage: 'url(' + src + ')',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: '#E2D5BA',
                    }}
                >
                </div>
            ))}
            {count > 1 && (
                <div className="absolute" style={{ bottom: '12px', left: 0, right: 0, display: 'flex', gap: '5px', justifyContent: 'center', zIndex: 3 }}>
                    {images.map((_, k) => (
                        <span key={k} style={{
                            width: idx === k ? '16px' : '5px', height: '5px', borderRadius: '3px',
                            background: idx === k ? '#D4AE5A' : 'rgba(249,245,238,0.6)', transition: 'all .3s',
                        }} />
                    ))}
                </div>
            )}
        </>
    )
}

export default function SignatureJourneys() {
    const [cat, setCat] = useState('All')
    const [q, setQ] = useState('')

    const filtered = useMemo(() => {
        const query = q.trim().toLowerCase()
        return JOURNEYS.filter((j) => {
            const okCat = cat === 'All' || j.cat === cat
            const hay = (j.title + ' ' + j.route + ' ' + j.desc + ' ' + j.type + ' ' + j.highlights.join(' ')).toLowerCase()
            return okCat && (!query || hay.includes(query))
        })
    }, [cat, q])

    return (
        <main style={{ background: '#F9F5EE', color: '#5C4A2A' }}>
            {/* ===== HERO ===== */}
            <header className="relative overflow-hidden" style={{ background: '#243D24', padding: 'clamp(96px,12vw,150px) clamp(20px,5vw,64px) clamp(40px,8vw,104px)' }}>
                <div role="img" aria-label="Palm trees and seabirds against a blue Sri Lankan sky" className="absolute inset-0" style={{ backgroundImage: 'url(/tours/signature-hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#243D24' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(26,46,26,0.82),rgba(36,61,36,0.94))' }} />
                <div className="relative mx-auto text-center flex flex-col items-center" style={{ maxWidth: '1360px' }}>
                    <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8963A', fontWeight: 600, marginBottom: 'clamp(18px,3vw,34px)' }}>
                        Home&nbsp;&nbsp;/&nbsp;&nbsp;Tours&nbsp;&nbsp;/&nbsp;&nbsp;<span style={{ color: '#D4AE5A' }}>Signature Journeys</span>
                    </div>
                    <h1 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, color: '#F9F5EE', fontSize: 'clamp(2.1rem,6vw,5rem)', lineHeight: 1.04, margin: 0, maxWidth: '16ch' }}>
                        Signature <span style={{ fontStyle: 'italic', color: '#D4AE5A' }}>Journeys</span>
                    </h1>
                    <p style={{ fontFamily: "'Caveat',cursive", fontSize: 'clamp(1.2rem,2.6vw,2.1rem)', color: '#D4AE5A', margin: '14px 0 0' }}>
                        an island of a thousand worlds, threaded into one
                    </p>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: 'clamp(0.85rem,1.6vw,1.02rem)', lineHeight: 1.75, color: 'rgba(249,245,238,0.72)', maxWidth: '52ch', margin: '18px 0 0' }}>
                        Our flagship multi-day itineraries — privately guided, unhurried, and shaped end to end. Ancient cities, cloud-wrapped tea country, leopard-lit dawns and the slow south coast, drawn together with intent.
                    </p>
                </div>
            </header>

            {/* ===== INTRO ===== */}
            <section style={{ background: '#F9F5EE', padding: 'clamp(56px,7vw,92px) clamp(24px,5vw,64px)' }}>
                <div className="mx-auto grid items-center grid-cols-1 md:grid-cols-[1.1fr_1fr]" style={{ maxWidth: '1360px', gap: 'clamp(40px,6vw,88px)' }}>
                    <div>
                        <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8963A', fontWeight: 600, marginBottom: '20px' }}>Ayubowan · Welcome</div>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(1.5rem,3.4vw,2.9rem)', lineHeight: 1.16, color: '#1A1712', margin: '0 0 24px', maxWidth: '20ch' }}>
                            A journey composed the way you would <span style={{ fontStyle: 'italic', color: '#B8963A' }}>compose a life</span> — with room to breathe.
                        </h2>
                        <p style={{ fontWeight: 300, fontSize: 'clamp(0.88rem,1.4vw,1.02rem)', lineHeight: 1.8, color: '#5C4A2A', margin: '0 0 18px' }}>
                            Each Signature Journey is a full arc across the island: cultural triangle, hill country, wildlife, and coast, paced so no day feels like transit. Every itinerary here is a starting point — a finished, thoughtful route you can travel as written or reshape with your designer.
                        </p>
                        <p style={{ fontWeight: 300, fontSize: 'clamp(0.88rem,1.4vw,1.02rem)', lineHeight: 1.8, color: '#5C4A2A', margin: 0 }}>
                            Private guide and vehicle throughout. Boutique and heritage stays. Quiet hours built in.
                        </p>
                    </div>
                    <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 'clamp(10px,2vw,18px)' }}>
                        <div className="relative" style={{ gridColumn: '1 / -1', height: 'clamp(130px,20vw,200px)', borderRadius: '6px', overflow: 'hidden' }}><PhotoBlock label="photo — sigiriya at dawn" src="/tours/intro-sigiriya.jpg" /></div>
                        <div className="relative" style={{ height: 'clamp(100px,15vw,150px)', borderRadius: '6px', overflow: 'hidden' }}><PhotoBlock label="photo — tea picker, ella" src="/tours/intro-tea.jpg" /></div>
                        <div className="relative" style={{ height: 'clamp(100px,15vw,150px)', borderRadius: '6px', overflow: 'hidden' }}><PhotoBlock label="photo — galle fort dusk" src="/tours/intro-galle.jpg" /></div>
                    </div>
                </div>
            </section>

            {/* ===== FILTER / SEARCH TOOLBAR ===== */}
            <section style={{ background: '#EFE6D0', padding: 'clamp(40px,5vw,64px) clamp(24px,5vw,64px)', borderTop: '1px solid rgba(184,150,58,0.16)', borderBottom: '1px solid rgba(184,150,58,0.16)' }}>
                <div className="mx-auto" style={{ maxWidth: '1360px' }}>
                    <div className="flex items-end justify-between flex-wrap" style={{ gap: '24px', marginBottom: '28px' }}>
                        <div>
                            <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8963A', fontWeight: 600, marginBottom: '10px' }}>The Collection</div>
                            <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(1.5rem,2.6vw,2.1rem)', color: '#1A1712', margin: 0 }}>
                                <span style={{ fontStyle: 'italic', color: '#B8963A' }}>{filtered.length}</span> signature journeys
                            </h3>
                        </div>
                        <div className="flex items-center w-full sm:w-auto" style={{ gap: '10px', background: '#F9F5EE', border: '1px solid rgba(184,150,58,0.3)', borderRadius: '25px', padding: '11px 20px', maxWidth: '280px' }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8A8278" strokeWidth="2"><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="21" y2="21" /></svg>
                            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search itineraries, regions, wildlife…"
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

            {/* ===== RICH JOURNEY GRID ===== */}
            <section style={{ background: '#F9F5EE', padding: 'clamp(48px,6vw,84px) clamp(24px,5vw,64px)' }}>
                <div className="mx-auto" style={{ maxWidth: '1360px' }}>
                    {filtered.length > 0 ? (
                        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(min(440px,100%),1fr))', gap: 'clamp(28px,3vw,44px)' }}>
                            {filtered.map((j) => (
                                <article key={j.title} className="sig-card flex flex-col"
                                         style={{ background: '#FFFFFF', border: '1px solid rgba(184,150,58,0.16)', borderRadius: '8px', overflow: 'hidden' }}>
                                    <div className="relative" style={{ height: 'clamp(190px,42vw,280px)', overflow: 'hidden' }}>
                                        <CardCarousel images={j.images} label={'cover — ' + j.photo + ' ·'} />
                                        <span style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(184,150,58,0.92)', color: '#F9F5EE', borderRadius: '25px', padding: '5px 14px', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{j.type}</span>
                                        <span style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(26,23,18,0.62)', color: '#F9F5EE', borderRadius: '25px', padding: '5px 14px', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', backdropFilter: 'blur(2px)' }}>{j.duration}</span>
                                    </div>
                                    <div className="flex flex-col flex-1" style={{ padding: '30px clamp(20px,6vw,32px) 34px' }}>
                                        <div style={{ fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#8A8278', marginBottom: '12px' }}>{j.route}</div>
                                        <h3 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 500, fontSize: 'clamp(1.3rem,4vw,1.7rem)', lineHeight: 1.15, color: '#1A1712', margin: '0 0 6px' }}>{j.title}</h3>
                                        <p style={{ fontWeight: 300, fontSize: '0.88rem', lineHeight: 1.75, color: '#5C4A2A', margin: '12px 0 20px' }}>{j.desc}</p>
                                        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                                            {j.highlights.map((h) => (
                                                <li key={h} style={{ display: 'flex', gap: '11px', alignItems: 'flex-start', fontWeight: 300, fontSize: '0.9rem', lineHeight: 1.5, color: '#5C4A2A' }}>
                                                    <span style={{ color: '#B8963A', fontSize: '0.7rem', lineHeight: 1.7, flex: 'none' }}>◆</span><span>{h}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', paddingTop: '22px', borderTop: '1px solid rgba(184,150,58,0.16)' }}>
                                            <div>
                                                <div style={{ fontSize: '0.64rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8A8278', marginBottom: '3px' }}>From</div>
                                                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.4rem', color: '#B8963A', lineHeight: 1 }}>
                                                    <span style={{ fontWeight: 600 }}>{j.price}</span>
                                                    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: '0.72rem', fontWeight: 300, color: '#8A8278', marginLeft: '6px' }}>/ person</span>
                                                </div>
                                            </div>
                                            <a href="/contact" style={{ background: '#B8963A', color: '#F9F5EE', border: 'none', borderRadius: '25px', padding: '12px 22px', fontFamily: "'DM Sans',sans-serif", fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '9px', whiteSpace: 'nowrap' }}>
                                                Book Now <span style={{ fontSize: '0.95rem' }}>→</span>
                                            </a>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                            <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: '1.6rem', color: '#8A8278', margin: '0 0 8px' }}>No journeys match that search.</p>
                            <p style={{ fontWeight: 300, color: '#8A8278', margin: 0 }}>Try a region, a park, or clear the filters.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ===== FEATURED BLOCK ===== */}
            <section style={{ background: '#EBF0E8', padding: 'clamp(56px,7vw,100px) clamp(24px,5vw,64px)' }}>
                <div className="mx-auto grid items-center grid-cols-1 md:grid-cols-2" style={{ maxWidth: '1360px', gap: 'clamp(40px,6vw,80px)' }}>
                    <div className="relative" style={{ height: 'clamp(220px,38vw,480px)', borderRadius: '8px', overflow: 'hidden' }}>
                        <div className="absolute inset-0" style={{ backgroundImage: 'url(/tours/featured-grand-ceylon.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#c9d4c3' }} />
                        <div className="absolute flex" style={{ bottom: '16px', left: 0, right: 0, gap: '7px', justifyContent: 'center' }}>
                            <span style={{ width: '24px', height: '3px', borderRadius: '2px', background: '#B8963A' }} />
                            <span style={{ width: '24px', height: '3px', borderRadius: '2px', background: 'rgba(184,150,58,0.28)' }} />
                            <span style={{ width: '24px', height: '3px', borderRadius: '2px', background: 'rgba(184,150,58,0.28)' }} />
                        </div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#B8963A', fontWeight: 600, marginBottom: '18px' }}>The Flagship · 14 Days</div>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(1.6rem,3.4vw,3rem)', lineHeight: 1.12, color: '#1A1712', margin: '0 0 20px' }}>
                            The Grand Ceylon, <span style={{ fontStyle: 'italic', color: '#B8963A' }}>end to end</span>
                        </h2>
                        <p style={{ fontWeight: 300, fontSize: '1.02rem', lineHeight: 1.9, color: '#5C4A2A', margin: '0 0 28px', maxWidth: '46ch' }}>
                            Two weeks that hold the whole island — the Cultural Triangle, the highlands by rail, Yala’s leopards, and a slow finish along the southern coast. Our most requested route, and the one we’re proudest of.
                        </p>
                        <div className="flex flex-wrap" style={{ gap: '36px', marginBottom: '32px' }}>
                            {[['6', 'Regions'], ['14', 'Nights'], ['$6,400', 'From / person']].map(([v, l]) => (
                                <div key={l}>
                                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '2rem', color: '#B8963A', lineHeight: 1 }}>{v}</div>
                                    <div style={{ fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A8278', marginTop: '5px' }}>{l}</div>
                                </div>
                            ))}
                        </div>
                        <a href="/contact" style={{ background: '#B8963A', color: '#F9F5EE', border: 'none', borderRadius: '25px', padding: '14px 30px', fontFamily: "'DM Sans',sans-serif", fontSize: '0.74rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                            Explore the route <span style={{ fontSize: '1rem' }}>→</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== CTA BAND ===== */}
            <section className="relative overflow-hidden" style={{ background: '#243D24', padding: 'clamp(64px,8vw,120px) clamp(24px,5vw,64px)' }}>
                <div className="absolute inset-0" style={{ backgroundImage: 'url(/tours/cta-perahera.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#1c2f1c' }} />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(26,46,26,0.82),rgba(36,61,36,0.9))' }} />
                <div className="relative mx-auto text-center" style={{ maxWidth: '760px' }}>
                    <div style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4AE5A', fontWeight: 600, marginBottom: '24px' }}>Tailor-Made</div>
                    <h2 style={{ fontFamily: "'Playfair Display',serif", fontWeight: 400, fontSize: 'clamp(1.7rem,4.4vw,3.4rem)', lineHeight: 1.12, color: '#F9F5EE', margin: '0 0 22px' }}>
                        Build a journey around a <span style={{ fontStyle: 'italic', color: '#D4AE5A' }}>festival</span>
                    </h2>
                    <p style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.85, color: 'rgba(249,245,238,0.72)', margin: '0 auto 38px', maxWidth: '50ch' }}>
                        Every Signature Journey can be reshaped timed to the Esala Perahera, the blue-whale season, or simply the pace you keep. Tell us what matters, and your designer will draw the rest.
                    </p>
                    <a href="/contact" style={{ background: '#B8963A', color: '#F9F5EE', border: 'none', borderRadius: '25px', padding: '16px 36px', fontFamily: "'DM Sans',sans-serif", fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '11px' }}>
                        Start a tailor-made enquiry <span style={{ fontSize: '1.05rem' }}>→</span>
                    </a>
                </div>
            </section>
        </main>
    )
}