'use client'

const POSTER =
    'https://images.unsplash.com/photo-1567189305263-127e41c4cdda?w=1600&h=1200&fit=crop&auto=format'

const MOBILE_HERO_IMAGE = '/Destinations/Sigiriya1.jpg'
const MOBILE_HERO_VIDEO = '/videos/sigiriya-mobile-hero.mp4'

export default function Hero() {
    return (
        <section id="top" className="relative flex items-end" style={{ minHeight: '100svh' }}>
            {/* Desktop: full-quality video */}
            <video
                className="absolute inset-0 w-full h-full object-cover hidden md:block"
                autoPlay
                muted
                loop
                playsInline
                poster={POSTER}
                style={{ backgroundColor: '#243D24' }}
            >
                <source src="/videos/hero.mp4" type="video/mp4" />
            </video>

            {/* Mobile: a short, heavily-compressed clip (~1.8MB) so it stays light on cellular data */}
            <video
                className="absolute inset-0 w-full h-full object-cover md:hidden"
                autoPlay
                muted
                loop
                playsInline
                poster={MOBILE_HERO_IMAGE}
                aria-label="Aerial view of Sigiriya rock fortress rising above the Sri Lankan jungle at dawn"
                style={{ backgroundColor: '#243D24' }}
            >
                <source src={MOBILE_HERO_VIDEO} type="video/mp4" />
            </video>

            {/* Gradient overlays (unchanged from the design) */}
            <div
                className="absolute inset-0"
                style={{
                    background:
                        'linear-gradient(to top, rgba(26,23,18,0.92) 0%, rgba(26,23,18,0.35) 50%, rgba(26,23,18,0.1) 100%)',
                }}
            />
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to right, rgba(26,23,18,0.4) 0%, transparent 60%)',
                }}
            />

            <div className="relative max-w-7xl mx-auto px-6 pb-14 md:pb-28 w-full">
                <div className="max-w-3xl">
                    <h1
                        className="font-display text-[2.75rem] md:text-7xl lg:text-8xl leading-none mb-5 md:mb-8"
                        style={{ color: '#F9F5EE', fontWeight: 400 }}
                    >
                        Where the<br />
                        <em style={{ fontStyle: 'italic', color: '#D4AE5A' }}>Ancient</em> meets<br />
                        the eternal
                    </h1>
                    <p
                        className="text-base md:text-lg leading-relaxed mb-6 md:mb-10 max-w-xl"
                        style={{ color: 'rgba(249,245,238,0.75)', fontWeight: 300, fontFamily: "serif", fontStyle: "italic" }}
                    >
                        Privately guided journeys through Sri Lanka&apos;s most extraordinary landscapes
                        from cloud piercing fortresses to leopard-haunted wilderness.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="#tours"
                            className="inline-flex items-center justify-center gap-3 px-6 py-3.5 md:px-8 md:py-4 text-sm font-medium tracking-wider transition-all duration-300 hover:opacity-90"
                            style={{
                                borderRadius: '25px',
                                backgroundColor: '#B8963A',
                                color: '#F9F5EE',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                fontSize: '0.75rem',
                            }}
                        >
                            Explore Journeys
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a
                            href="#about"
                            className="inline-flex items-center justify-center gap-3 px-6 py-3.5 md:px-8 md:py-4 text-sm font-medium tracking-wider transition-all duration-300"
                            style={{
                                borderRadius: '25px',
                                border: '1px solid rgba(249,245,238,0.35)',
                                color: '#F9F5EE',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                fontSize: '0.75rem',
                            }}
                        >
                            Our Story
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}