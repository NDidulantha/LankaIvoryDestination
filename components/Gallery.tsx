'use client'

import { useState, useEffect, useCallback } from 'react'

/* ────────────────────────────────────────────────────────────
   PHOTOS — added manually for now.
   When the admin panel exists, replace this array with data
   fetched from the API. The rest of the component stays the same.
   - src:      put the image in /public/gallery/  and reference it as /gallery/filename.jpg
   - category: must match one of the CATEGORIES below
   ──────────────────────────────────────────────────────────── */
type Photo = { src: string; alt: string; category: string; caption?: string }

const CATEGORIES = ['All', 'Wildlife', 'Culture', 'Beaches', 'Hill Country', 'People']

const PHOTOS: Photo[] = [
    { src: '/gallery/wildlife-1.jpg', alt: 'Leopard resting on a rock in Yala', category: 'Wildlife', caption: 'Yala National Park' },
    { src: '/gallery/culture-1.jpg', alt: 'Sigiriya rock fortress at dawn', category: 'Culture', caption: 'Sigiriya' },
    { src: '/gallery/beach-1.jpg', alt: 'Palm-lined beach on the south coast', category: 'Beaches', caption: 'Mirissa' },
    { src: '/gallery/hill-1.jpg', alt: 'Tea terraces in the hill country', category: 'Hill Country', caption: 'Ella' },
    { src: '/gallery/people-1.jpg', alt: 'Chauffeur-guide with travellers', category: 'People', caption: 'On the road' },
    { src: '/gallery/wildlife-2.jpg', alt: 'Elephant herd at Udawalawe', category: 'Wildlife', caption: 'Udawalawe' },
    { src: '/gallery/culture-2.jpg', alt: 'Temple of the Sacred Tooth, Kandy', category: 'Culture', caption: 'Kandy' },
    { src: '/gallery/hill-2.jpg', alt: 'The blue train through tea country', category: 'Hill Country', caption: 'Nine Arch Bridge' },
    { src: '/gallery/beach-2.jpg', alt: 'Stilt fishermen at sunset', category: 'Beaches', caption: 'Koggala' },
    { src: '/gallery/wildlife-3.jpg', alt: 'Blue whale off the southern coast', category: 'Wildlife', caption: 'Mirissa' },
    { src: '/gallery/culture-3.jpg', alt: 'Golden cave temples of Dambulla', category: 'Culture', caption: 'Dambulla' },
    { src: '/gallery/people-2.jpg', alt: 'Tea pickers in the highlands', category: 'People', caption: 'Nuwara Eliya' },
]

// gives each tile a varied height for a masonry look
const spanFor = (i: number) => (i % 5 === 0 || i % 5 === 3 ? 'tall' : 'normal')

export default function Gallery() {
    const [filter, setFilter] = useState('All')
    const [lightbox, setLightbox] = useState<number | null>(null)

    const shown = filter === 'All' ? PHOTOS : PHOTOS.filter((p) => p.category === filter)

    const close = useCallback(() => setLightbox(null), [])
    const prev = useCallback(
        () => setLightbox((i) => (i === null ? i : (i - 1 + shown.length) % shown.length)),
        [shown.length]
    )
    const next = useCallback(
        () => setLightbox((i) => (i === null ? i : (i + 1) % shown.length)),
        [shown.length]
    )

    // keyboard controls for the lightbox
    useEffect(() => {
        if (lightbox === null) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close()
            if (e.key === 'ArrowLeft') prev()
            if (e.key === 'ArrowRight') next()
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [lightbox, close, prev, next])

    return (
        <>
            {/* filters */}
            <div className="max-w-6xl mx-auto px-6 pt-10 md:pt-16 pb-6 md:pb-10">
                <div className="flex flex-wrap justify-center gap-2">
                    {CATEGORIES.map((c) => {
                        const on = filter === c
                        return (
                            <button
                                key={c}
                                onClick={() => setFilter(c)}
                                className="text-[0.68rem] md:text-xs tracking-wider uppercase px-3.5 py-2 md:px-5 md:py-2.5 transition-all"
                                style={{
                                    borderRadius: '25px',
                                    border: '1px solid ' + (on ? '#B8963A' : 'rgba(212,174,90,0.35)'),
                                    backgroundColor: on ? '#B8963A' : 'transparent',
                                    color: on ? '#F9F5EE' : 'rgba(249,245,238,0.8)',
                                    letterSpacing: '0.08em',
                                }}
                            >
                                {c}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* grid */}
            <div className="max-w-6xl mx-auto px-6 pb-24">
                <div
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    style={{ gap: '0.6rem', gridAutoRows: 'clamp(120px,32vw,200px)' }}
                >
                    {shown.map((p, i) => (
                        <button
                            key={p.src}
                            onClick={() => setLightbox(i)}
                            className="gallery-tile group relative overflow-hidden"
                            style={{
                                gridRow: spanFor(i) === 'tall' ? 'span 2' : 'span 1',
                                borderRadius: '6px',
                                backgroundColor: '#1A2E1A',
                                cursor: 'pointer',
                            }}
                        >
                            <div
                                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                                style={{
                                    backgroundImage: 'url(' + p.src + ')',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />
                            <div
                                className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{ background: 'linear-gradient(to top, rgba(26,23,18,0.7), transparent 60%)' }}
                            >
                                {p.caption && (
                                    <span className="text-sm" style={{ color: '#F9F5EE', fontFamily: "'Playfair Display', serif" }}>
                    {p.caption}
                  </span>
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                {shown.length === 0 && (
                    <p className="text-center py-12" style={{ color: 'rgba(249,245,238,0.6)' }}>
                        No photos in this category yet.
                    </p>
                )}
            </div>

            {/* CTA */}
            <section className="text-center py-14 md:py-20 px-6" style={{ backgroundColor: '#EFE6D0' }}>
                <p className="text-xs font-semibold tracking-widest uppercase mb-3 md:mb-4" style={{ color: '#B8963A', letterSpacing: '0.2em' }}>
                    Like what you see?
                </p>
                <h2 className="font-display text-2xl md:text-4xl mb-3 md:mb-4" style={{ color: '#1A1712', fontWeight: 400 }}>
                    These could be <em style={{ fontStyle: 'italic', color: '#B8963A' }}>your</em> photos
                </h2>
                <p className="max-w-lg mx-auto mb-6 md:mb-8 text-sm md:text-base" style={{ color: '#5C4A2A', fontWeight: 300 }}>
                    Every image was taken on one of our journeys. Tell us your dates and we&apos;ll design yours.
                </p>
                <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3.5 md:px-8 md:py-4 text-sm font-medium tracking-wider uppercase transition-all hover:brightness-110"
                    style={{ backgroundColor: '#B8963A', color: '#F9F5EE', borderRadius: '25px', letterSpacing: '0.08em', fontSize: '0.75rem' }}
                >
                    Plan Your Journey
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
            </section>

            {/* ===== LIGHTBOX ===== */}
            {lightbox !== null && shown[lightbox] && (
                <div
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4"
                    style={{ backgroundColor: 'rgba(15,13,10,0.94)' }}
                    onClick={close}
                >
                    {/* close */}
                    <button
                        onClick={close}
                        aria-label="Close"
                        className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center rounded-full transition-colors"
                        style={{ border: '1px solid rgba(249,245,238,0.3)', color: '#F9F5EE' }}
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                    </button>

                    {/* prev */}
                    <button
                        onClick={(e) => { e.stopPropagation(); prev() }}
                        aria-label="Previous"
                        className="absolute left-4 md:left-8 w-12 h-12 flex items-center justify-center rounded-full transition-all hover:scale-110"
                        style={{ border: '1px solid rgba(249,245,238,0.3)', color: '#F9F5EE' }}
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M11 4l-5 5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {/* image */}
                    <div className="max-w-5xl max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={shown[lightbox].src}
                            alt={shown[lightbox].alt}
                            className="max-w-full object-contain"
                            style={{ maxHeight: '78vh', borderRadius: '4px', backgroundColor: '#1A2E1A' }}
                        />
                        {shown[lightbox].caption && (
                            <p className="mt-4 text-sm" style={{ color: 'rgba(249,245,238,0.75)' }}>
                                {shown[lightbox].caption} &nbsp;·&nbsp; {shown[lightbox].category}
                            </p>
                        )}
                    </div>

                    {/* next */}
                    <button
                        onClick={(e) => { e.stopPropagation(); next() }}
                        aria-label="Next"
                        className="absolute right-4 md:right-8 w-12 h-12 flex items-center justify-center rounded-full transition-all hover:scale-110"
                        style={{ border: '1px solid rgba(249,245,238,0.3)', color: '#F9F5EE' }}
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            )}
        </>
    )
}