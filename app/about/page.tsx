import JsonLd from '@/components/JsonLd'
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo'

export const metadata = pageMetadata({
    title: 'About',
    description:
        'Lanka Ivory Destinations is your trusted travel partner based in Colombo, creating tailor-made Sri Lanka tour packages to fit any budget, travel style or preference.',
    path: '/about',
    image: '/about-hero.jpg',
})

const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
])

const REASONS = [
    {
        title: 'Tailor-Made Tour Packages',
        text: 'Customized itineraries designed to fit any budget, travel style, or preference.',
        icon: (
            <>
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
                <path d="M15.5 8.5l-2 5-5 2 2-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            </>
        ),
    },
    {
        title: 'Complete Flexibility',
        text: 'Full travel planning from start to finish, or simply serving as your reliable booking agent if you prefer a self-guided approach.',
        icon: (
            <path d="M4 8h13l-3-3M20 16H7l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        ),
    },
    {
        title: 'Unmatched Service',
        text: 'Dedicated customer care with prompt, responsive, and friendly communication every step of the way.',
        icon: (
            <path d="M4 5h16v11H9l-5 4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        ),
    },
]

const REGIONS = [
    {
        title: 'The Cultural Triangle (Rajarata)',
        text: "Journey through the Ancient Land of Kings, home to massive ancient reservoirs and soaring white dagobas that showcase the glory of Sri Lanka's heritage.",
    },
    {
        title: 'The Central Highlands',
        text: 'Discover mist-draped mountains, sprawling green tea plantations, cascading waterfalls, and terraced paddy fields in a landscape that feels like paradise.',
    },
    {
        title: 'Coastal & Wildlife Escapes',
        text: 'Unwind along sun-kissed beaches, witness vibrant coastal fishing communities, and experience world-class safari adventures in iconic national parks across the South and Northwest.',
    },
]

export default function AboutPage() {
    return (
        <main className="bg-ivory">
            <JsonLd data={breadcrumb} />
            {/* ===== HERO with picture ===== */}
            <header className="relative flex items-end overflow-hidden" style={{ height: '70vh', minHeight: '480px' }}>
                <div
                    role="img"
                    aria-label="Aerial view of Sri Lanka's central hill country ridgelines"
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'url(/about-hero.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: '#243D24',
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            'linear-gradient(to top, rgba(26,23,18,0.85) 0%, rgba(26,23,18,0.3) 55%, rgba(26,23,18,0.5) 100%)',
                    }}
                />
                <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-16">
                    <p className="text-xs tracking-widest uppercase mb-5" style={{ color: '#D4AE5A', letterSpacing: '0.18em' }}>
                        Home &nbsp;/&nbsp; About
                    </p>
                    <h1 className="font-display text-5xl md:text-7xl" style={{ color: '#F9F5EE', fontWeight: 400, maxWidth: '16ch' }}>
                        About Us
                    </h1>
                    <p className="mt-3 text-2xl md:text-3xl" style={{ fontFamily: "'Caveat', cursive", color: '#D4AE5A' }}>
                        your trusted travel partner in Sri Lanka
                    </p>
                </div>
            </header>

            {/* ===== INTRO ===== */}
            <section className="py-20 md:py-24 text-center">
                <div className="max-w-3xl mx-auto px-6">
                    <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#B8963A', letterSpacing: '0.22em' }}>
                        Warm greetings
                    </p>
                    <p
                        className="font-display italic mt-6"
                        style={{ color: '#B8963A', fontSize: 'clamp(1.6rem, 3.2vw, 2.3rem)', lineHeight: 1.35 }}
                    >
                        Warm greetings from Lanka Ivory Destinations, your trusted travel partner based in Colombo—the
                        last royal capital of Sri Lanka.
                    </p>
                    <p className="mt-8" style={{ color: '#5C4A2A' }}>
                        Sri Lanka is an extraordinary island where golden sunlit beaches, mist-shrouded mountains, lush
                        wildlife sanctuaries, cascading waterfalls, and thousands of years of rich cultural heritage
                        converge. Truly a destination like no other, it offers an immersive experience to anticipate,
                        explore, and cherish forever.
                    </p>
                </div>
            </section>

            {/* ===== WHY CHOOSE US ===== */}
            <section className="pb-8">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-20">
                        <div
                            className="rounded-md overflow-hidden"
                            style={{
                                height: '420px',
                                backgroundImage: 'url(/about-story-1.jpg)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundColor: '#243D24',
                            }}
                        />
                        <div>
                            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#B8963A', letterSpacing: '0.14em' }}>
                                Our philosophy
                            </p>
                            <h2 className="font-display mt-3 mb-5" style={{ color: '#1A1712', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 400 }}>
                                Why Choose Lanka Ivory Destinations?
                            </h2>
                            <p className="mb-4" style={{ color: '#5C4A2A' }}>
                                At Lanka Ivory Destinations, our success stems from a simple core philosophy: we value every
                                client as an individual.
                            </p>
                            <p style={{ color: '#5C4A2A' }}>
                                We take the time to understand your vision of a dream holiday—what you love to experience,
                                your preferred accommodations, and how you wish to journey across the island.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== WHAT WE OFFER ===== */}
            <section className="py-20 md:py-24" style={{ backgroundColor: '#243D24' }}>
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#D4AE5A', letterSpacing: '0.2em' }}>
                            What we offer
                        </p>
                        <h2 className="font-display mt-4" style={{ color: '#F9F5EE', fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 400 }}>
                            Your holiday, your way
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {REASONS.map((r) => (
                            <div
                                key={r.title}
                                className="text-center p-9"
                                style={{ border: '1px solid rgba(212,174,90,0.25)', borderRadius: '8px' }}
                            >
                                <div
                                    className="mx-auto mb-6 flex items-center justify-center"
                                    style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(212,174,90,0.15)', color: '#D4AE5A' }}
                                >
                                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">{r.icon}</svg>
                                </div>
                                <h3 className="font-display text-2xl mb-3" style={{ color: '#F9F5EE' }}>{r.title}</h3>
                                <p className="text-sm" style={{ color: 'rgba(249,245,238,0.65)' }}>{r.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== EXPLORE SRI LANKA ===== */}
            <section className="py-20 md:py-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                        <div
                            className="md:order-2 rounded-md overflow-hidden"
                            style={{
                                height: '520px',
                                backgroundImage: 'url(/about-story-2.jpg)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundColor: '#2E5A6E',
                            }}
                        />
                        <div className="md:order-1">
                            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#B8963A', letterSpacing: '0.14em' }}>
                                The island
                            </p>
                            <h2 className="font-display mt-3 mb-5" style={{ color: '#1A1712', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 400 }}>
                                Explore Sri Lanka&apos;s Diverse Beauty
                            </h2>
                            <p className="mb-6" style={{ color: '#5C4A2A' }}>
                                Sri Lanka&apos;s nine distinct provinces each offer something extraordinary:
                            </p>
                            <div className="space-y-5">
                                {REGIONS.map((region) => (
                                    <div key={region.title} className="pl-5" style={{ borderLeft: '2px solid #B8963A' }}>
                                        <h3 className="font-display text-xl mb-1" style={{ color: '#1A1712' }}>{region.title}</h3>
                                        <p className="text-sm" style={{ color: '#5C4A2A' }}>{region.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="py-20 md:py-24 text-center" style={{ backgroundColor: '#EFE6D0' }}>
                <div className="max-w-3xl mx-auto px-6">
                    <p style={{ color: '#5C4A2A' }}>
                        Combined with the warm, smiling hospitality of the Sri Lankan people, we strive every day to use our
                        local expertise to create seamless, adventure-filled holidays that leave you inspired and
                        re-energized.
                    </p>
                    <h2 className="font-display mt-10" style={{ color: '#1A1712', fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 400 }}>
                        Start Planning Your Dream Journey Today
                    </h2>
                    <p className="mt-3 text-2xl md:text-3xl" style={{ fontFamily: "'Caveat', cursive", color: '#B8963A' }}>
                        Let us turn your travel dreams into unforgettable memories.
                    </p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 mt-8 px-8 py-4 font-semibold uppercase transition-all duration-300 hover:opacity-90"
                        style={{ borderRadius: '25px', backgroundColor: '#B8963A', color: '#F9F5EE', letterSpacing: '0.1em', fontSize: '0.78rem' }}
                    >
                        Plan My Journey
                    </a>
                </div>
            </section>
        </main>
    )
}
