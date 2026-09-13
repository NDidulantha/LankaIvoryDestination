'use client'

import { useState } from 'react'

/* ────────────────────────────────────────────────────────────
   POSTS — added manually for now.
   When the admin panel exists, replace this array with data
   fetched from the API. Layout, filters and featured logic stay the same.
   - cover:    put the image in /public/blog/  → reference as /blog/filename.jpg
   - slug:     becomes the article URL /experiences/blog/<slug> (built later)
   - featured: mark ONE post as featured for the big hero card
   ──────────────────────────────────────────────────────────── */
type Post = {
    slug: string
    category: string
    title: string
    excerpt: string
    readTime: string
    date: string
    cover: string
    featured?: boolean
}

const CATEGORIES = ['All', 'Travel Guides', 'Wildlife', 'Culture', 'Food', 'Itineraries']

const POSTS: Post[] = [
    {
        slug: 'best-time-to-visit-sri-lanka',
        category: 'Travel Guides',
        title: 'The best time to visit Sri Lanka, region by region',
        excerpt:
            "Sri Lanka has two monsoons and a dozen microclimates, which means somewhere on the island is always in season. Here's exactly when to go, wherever you're headed.",
        readTime: '8 min',
        date: 'Mar 2026',
        cover: '/blog/best-time.jpg',
        featured: true,
    },
    {
        slug: 'leopards-of-yala-spotters-guide',
        category: 'Wildlife',
        title: "Leopards of Yala: a spotter's guide",
        excerpt: "Where, when and how to give yourself the best chance of seeing the island's most elusive cat.",
        readTime: '6 min',
        date: 'Feb 2026',
        cover: '/blog/leopards.jpg',
    },
    {
        slug: 'temple-of-the-sacred-tooth',
        category: 'Culture',
        title: 'Inside the Temple of the Sacred Tooth',
        excerpt: "The story behind Kandy's holiest shrine and how to visit it respectfully.",
        readTime: '5 min',
        date: 'Feb 2026',
        cover: '/blog/tooth-temple.jpg',
    },
    {
        slug: 'guide-to-sri-lankan-curry',
        category: 'Food',
        title: "A first-timer's guide to Sri Lankan curry",
        excerpt: 'Hoppers, kottu, pol sambol — what to order and how to eat like a local.',
        readTime: '7 min',
        date: 'Jan 2026',
        cover: '/blog/curry.jpg',
    },
    {
        slug: '10-perfect-days-classic-first-trip',
        category: 'Itineraries',
        title: '10 perfect days: the classic first trip',
        excerpt: 'Our most-loved itinerary, explained day by day, for a first taste of the island.',
        readTime: '9 min',
        date: 'Jan 2026',
        cover: '/blog/ten-days.jpg',
    },
    {
        slug: 'riding-the-blue-train-to-ella',
        category: 'Travel Guides',
        title: 'Riding the blue train to Ella',
        excerpt: "Everything you need to know about the world's most scenic rail journey.",
        readTime: '6 min',
        date: 'Dec 2025',
        cover: '/blog/blue-train.jpg',
    },
    {
        slug: 'whale-watching-in-mirissa',
        category: 'Wildlife',
        title: 'Whale watching in Mirissa',
        excerpt: "When to go, what you'll see, and how to do it ethically.",
        readTime: '5 min',
        date: 'Dec 2025',
        cover: '/blog/whales.jpg',
    },
]

export default function Blog() {
    const [filter, setFilter] = useState('All')

    const featured = POSTS.find((p) => p.featured)
    const rest = POSTS.filter((p) => !p.featured)
    const shown = filter === 'All' ? rest : rest.filter((p) => p.category === filter)
    const showFeatured = featured && (filter === 'All' || featured.category === filter)

    return (
        <>
            {/* FEATURED */}
            {showFeatured && featured && (
                <section className="max-w-6xl mx-auto px-6 pt-16">
                    <a
                        href={'/experiences/blog/' + featured.slug}
                        className="grid grid-cols-1 md:grid-cols-2 overflow-hidden group"
                        style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(184,150,58,0.16)', borderRadius: '8px' }}
                    >
                        <div
                            className="min-h-[320px] transition-transform duration-700 group-hover:scale-[1.03]"
                            style={{
                                backgroundImage: 'url(' + featured.cover + ')',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundColor: '#243D24',
                            }}
                        />
                        <div className="p-8 md:p-10 flex flex-col justify-center">
              <span
                  className="text-[0.6rem] font-semibold tracking-widest uppercase px-3 py-1 mb-5 w-fit"
                  style={{ backgroundColor: '#B8963A', color: '#F9F5EE', borderRadius: '25px', letterSpacing: '0.12em' }}
              >
                Featured
              </span>
                            <div className="flex gap-3 items-center mb-3 text-xs uppercase tracking-wider" style={{ color: '#8A8278', letterSpacing: '0.08em' }}>
                                <span style={{ color: '#B8963A', fontWeight: 600 }}>{featured.category}</span>
                                <span>·</span>
                                <span>{featured.readTime} read</span>
                                <span>·</span>
                                <span>{featured.date}</span>
                            </div>
                            <h2 className="font-display text-2xl md:text-3xl mb-4" style={{ color: '#1A1712', fontWeight: 400 }}>
                                {featured.title}
                            </h2>
                            <p className="mb-6" style={{ color: '#5C4A2A', fontWeight: 300 }}>
                                {featured.excerpt}
                            </p>
                            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase" style={{ color: '#B8963A', letterSpacing: '0.1em' }}>
                Read the guide
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
                        </div>
                    </a>
                </section>
            )}

            {/* FILTERS */}
            <div className="max-w-6xl mx-auto px-6 pt-14 pb-10">
                <div className="flex flex-wrap justify-center gap-2.5">
                    {CATEGORIES.map((c) => {
                        const on = filter === c
                        return (
                            <button
                                key={c}
                                onClick={() => setFilter(c)}
                                className="text-xs tracking-wider uppercase px-5 py-2.5 transition-all"
                                style={{
                                    borderRadius: '25px',
                                    border: '1px solid ' + (on ? '#B8963A' : 'rgba(184,150,58,0.2)'),
                                    backgroundColor: on ? '#B8963A' : 'transparent',
                                    color: on ? '#F9F5EE' : '#5C4A2A',
                                    letterSpacing: '0.08em',
                                }}
                            >
                                {c}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* GRID */}
            <div className="max-w-6xl mx-auto px-6 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {shown.map((p) => (
                        <a
                            key={p.slug}
                            href={'/experiences/blog/' + p.slug}
                            className="blog-card group flex flex-col overflow-hidden"
                            style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(184,150,58,0.14)', borderRadius: '6px' }}
                        >
                            <div className="h-48 relative overflow-hidden">
                                <div
                                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                                    style={{
                                        backgroundImage: 'url(' + p.cover + ')',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        backgroundColor: '#243D24',
                                    }}
                                />
                                <span
                                    className="absolute top-4 left-4 text-[0.6rem] font-semibold tracking-widest uppercase px-3 py-1"
                                    style={{ backgroundColor: 'rgba(249,245,238,0.92)', color: '#243D24', borderRadius: '25px', letterSpacing: '0.1em' }}
                                >
                  {p.category}
                </span>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <div className="text-[0.65rem] uppercase tracking-wider mb-2.5" style={{ color: '#8A8278', letterSpacing: '0.1em' }}>
                                    {p.readTime} read · {p.date}
                                </div>
                                <h3 className="font-display text-xl mb-3" style={{ color: '#1A1712', fontWeight: 400, lineHeight: 1.3 }}>
                                    {p.title}
                                </h3>
                                <p className="text-sm mb-5 flex-1" style={{ color: '#5C4A2A', fontWeight: 300 }}>
                                    {p.excerpt}
                                </p>
                                <span className="text-[0.66rem] font-semibold tracking-widest uppercase" style={{ color: '#B8963A', letterSpacing: '0.1em' }}>
                  Read More →
                </span>
                            </div>
                        </a>
                    ))}
                </div>

                {shown.length === 0 && (
                    <p className="text-center py-12" style={{ color: '#8A8278' }}>
                        No articles in this category yet.
                    </p>
                )}
            </div>

            {/* NEWSLETTER */}
            <section className="text-center py-20 px-6" style={{ backgroundColor: '#243D24' }}>
                <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#D4AE5A', letterSpacing: '0.2em' }}>
                    Never miss a story
                </p>
                <h2 className="font-display text-3xl md:text-4xl mb-4" style={{ color: '#F9F5EE', fontWeight: 400 }}>
                    Letters from the island
                </h2>
                <p className="max-w-lg mx-auto mb-8" style={{ color: 'rgba(249,245,238,0.7)', fontWeight: 300 }}>
                    Occasional dispatches — travel tips, new journeys and tales from the road. No spam, ever.
                </p>
                <form className="flex max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        required
                        placeholder="Your email address"
                        className="flex-1 px-5 py-3.5 text-sm outline-none"
                        style={{
                            backgroundColor: 'rgba(249,245,238,0.08)',
                            color: '#F9F5EE',
                            border: '1px solid rgba(212,174,90,0.3)',
                            borderRight: 'none',
                            borderTopLeftRadius: '25px',
                            borderBottomLeftRadius: '25px',
                            fontFamily: "'DM Sans', sans-serif",
                        }}
                    />
                    <button
                        type="submit"
                        className="px-6 py-3.5 text-xs font-semibold tracking-wider uppercase"
                        style={{
                            backgroundColor: '#B8963A',
                            color: '#F9F5EE',
                            borderTopRightRadius: '25px',
                            borderBottomRightRadius: '25px',
                            letterSpacing: '0.08em',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        Subscribe
                    </button>
                </form>
            </section>
        </>
    )
}