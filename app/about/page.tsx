import JsonLd from '@/components/JsonLd'
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo'

export const metadata = pageMetadata({
    title: 'About',
    description:
        'The people behind your journey. Lanka Ivory Destination is a Sri Lankan-owned tour operator crafting private, tailor-made journeys across the island since 2011.',
    path: '/about',
    image: '/about-hero.jpg',
})

const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
])

const VALUES = [
    {
        title: 'Local at heart',
        text: 'Every guide, driver and consultant is Sri Lankan. This is their home, not a posting.',
        icon: (
            <>
                <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
            </>
        ),
    },
    {
        title: 'Honest counsel',
        text: "We'll tell you when a hotel isn't worth the money, or a season isn't right. That's the whole job.",
        icon: (
            <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 21l-4.9 2.6.9-5.5-4-3.9 5.5-.8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        ),
    },
    {
        title: 'Travel that gives back',
        text: 'We work with conservation projects and community enterprises across the island.',
        icon: (
            <path d="M4 12a8 8 0 0 1 16 0M4 12a8 8 0 0 0 16 0M12 4v16" stroke="currentColor" strokeWidth="1.4" />
        ),
    },
]

const STATS = [
    { value: '14+', label: 'Years Crafting Journeys' },
    { value: '4,200+', label: 'Travellers Guided' },
    { value: '97%', label: 'Would Return' },
    { value: '38', label: 'Countries Home To' },
]

const BADGES = ['SLTDA Licensed · [ No. ]', 'Company Reg. [ No. ]', 'Secure Payments', '4.9★ on Google']

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
                        Sri Lanka, the way we know it
                    </h1>
                    <p className="mt-3 text-2xl md:text-3xl" style={{ fontFamily: "'Caveat', cursive", color: '#D4AE5A' }}>
                        the people behind your journey
                    </p>
                </div>
            </header>

            {/* ===== INTRO ===== */}
            <section className="py-20 md:py-24 text-center">
                <div className="max-w-3xl mx-auto px-6">
                    <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#B8963A', letterSpacing: '0.22em' }}>
                        Our Story
                    </p>
                    <p
                        className="font-display italic mt-6"
                        style={{ color: '#B8963A', fontSize: 'clamp(1.6rem, 3.2vw, 2.3rem)', lineHeight: 1.35 }}
                    >
                        “We built the company we wished existed when we first fell in love with this island — one run
                        by people who actually live here.”
                    </p>
                </div>
            </section>

            {/* ===== STORY ROWS ===== */}
            <section className="pb-8">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Row 1 */}
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
                                2011 · How it began
                            </p>
                            <h2 className="font-display mt-3 mb-5" style={{ color: '#1A1712', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 400 }}>
                                Founded by people who never left
                            </h2>
                            <p className="mb-4" style={{ color: '#5C4A2A' }}>
                                Lanka Ivory began in 2011, when two conservation biologists and a former Colombo hotel director
                                shared one conviction: that the best way to see Sri Lanka is slowly, with guides who love it.
                            </p>
                            <p style={{ color: '#5C4A2A' }}>
                                What started as a handful of tailor-made trips for friends has grown into hundreds of journeys a
                                year — but the conviction hasn&apos;t changed at all.
                            </p>
                        </div>
                    </div>

                    {/* Row 2 (flipped) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-20">
                        <div
                            className="md:order-2 rounded-md overflow-hidden"
                            style={{
                                height: '420px',
                                backgroundImage: 'url(/about-story-2.jpg)',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundColor: '#2E5A6E',
                            }}
                        />
                        <div className="md:order-1">
                            <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#B8963A', letterSpacing: '0.14em' }}>
                                Our approach
                            </p>
                            <h2 className="font-display mt-3 mb-5" style={{ color: '#1A1712', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 400 }}>
                                Slow travel, deep connection
                            </h2>
                            <p className="mb-4" style={{ color: '#5C4A2A' }}>
                                We build itineraries around what most tours skip — a dawn with elephant mahouts, lunch in a
                                family-run rice mill, a private audience with a temple guardian who has kept the flame lit for
                                forty years.
                            </p>
                            <p style={{ color: '#5C4A2A' }}>
                                Every partner lodge, every guide, every meal is chosen by someone who has been there personally —
                                and returned.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== VALUES ===== */}
            <section className="py-20 md:py-24" style={{ backgroundColor: '#243D24' }}>
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-14">
                        <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#D4AE5A', letterSpacing: '0.2em' }}>
                            What guides us
                        </p>
                        <h2 className="font-display mt-4" style={{ color: '#F9F5EE', fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', fontWeight: 400 }}>
                            The things we won&apos;t compromise on
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {VALUES.map((v) => (
                            <div
                                key={v.title}
                                className="text-center p-9"
                                style={{ border: '1px solid rgba(212,174,90,0.25)', borderRadius: '8px' }}
                            >
                                <div
                                    className="mx-auto mb-6 flex items-center justify-center"
                                    style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(212,174,90,0.15)', color: '#D4AE5A' }}
                                >
                                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">{v.icon}</svg>
                                </div>
                                <h3 className="font-display text-2xl mb-3" style={{ color: '#F9F5EE' }}>{v.title}</h3>
                                <p className="text-sm" style={{ color: 'rgba(249,245,238,0.65)' }}>{v.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== STATS ===== */}
            <section className="py-16" style={{ backgroundColor: '#EFE6D0' }}>
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 text-center">
                    {STATS.map((s) => (
                        <div key={s.label}>
                            <div className="font-display" style={{ color: '#B8963A', fontSize: '2.6rem', fontWeight: 400 }}>{s.value}</div>
                            <div className="text-xs tracking-widest uppercase mt-1" style={{ color: '#5C4A2A', letterSpacing: '0.13em' }}>
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== TRUST ===== */}
            <section className="py-12 text-center" style={{ backgroundColor: '#EBF0E8' }}>
                <div className="max-w-4xl mx-auto px-6">
                    <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#B8963A', letterSpacing: '0.2em' }}>
                        Registered &amp; protected
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 mt-5">
                        {BADGES.map((b) => (
                            <span
                                key={b}
                                className="text-xs font-semibold tracking-wider uppercase px-5 py-2.5"
                                style={{ border: '1px solid rgba(184,150,58,0.2)', borderRadius: '25px', color: '#B8963A', letterSpacing: '0.08em' }}
                            >
                {b}
              </span>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    )
}