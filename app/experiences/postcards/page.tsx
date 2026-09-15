import Postcards from '@/components/Postcards'
import JsonLd from '@/components/JsonLd'
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo'

export const metadata = pageMetadata({
    title: 'Postcards Home',
    description:
        'Notes our travellers sent from the island. Real stories from journeys across Sri Lanka with Lanka Ivory Destination.',
    path: '/experiences/postcards',
    image: '/postcards-hero.jpg',
})

const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Postcards Home', path: '/experiences/postcards' },
])

const STATS = [
    { value: '4,200+', label: 'Travellers Guided' },
    { value: '4.9 / 5', label: 'Average Rating' },
    { value: '97%', label: 'Would Return' },
    { value: '38', label: 'Countries Home To' },
]

export default function PostcardsPage() {
    return (
        <main style={{ backgroundColor: '#243D24' }}>
            <JsonLd data={breadcrumb} />
            {/* ===== HERO with background image + scrim ===== */}
            <header className="relative pt-32 pb-16 overflow-hidden">
                {/* background image */}
                <div
                    role="img"
                    aria-label="Aerial view of Galle Fort's lighthouse and colonial rooftops"
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'url(/postcards-hero.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: '#243D24',
                    }}
                />
                {/* dark green scrim over the image, behind the text */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(26,46,26,0.55), rgba(36,61,36,0.60))'
                    }}
                />

                <div className="relative z-10 max-w-6xl mx-auto px-6">
                    <div className="text-center">
                        <p className="text-xs tracking-widest uppercase mb-6" style={{ color: '#D4AE5A', letterSpacing: '0.18em' }}>
                            Home &nbsp;/&nbsp; Experiences &nbsp;/&nbsp; Postcards Home
                        </p>
                        <h1 className="font-display text-5xl md:text-7xl" style={{ color: '#F9F5EE', fontWeight: 400 }}>
                            Postcards Home
                        </h1>
                        <p className="mt-3 text-2xl md:text-3xl" style={{ fontFamily: "'Caveat', cursive", color: '#D4AE5A' }}>
                            notes our travellers sent from the island
                        </p>
                    </div>

                    {/* stats ribbon */}
                    <div
                        className="mt-14 flex flex-wrap justify-center gap-x-12 gap-y-8 py-8"
                        style={{ borderTop: '1px solid rgba(212,174,90,0.25)', borderBottom: '1px solid rgba(212,174,90,0.25)' }}
                    >
                        {STATS.map((s) => (
                            <div key={s.label} className="text-center">
                                <div className="font-display text-3xl md:text-4xl" style={{ color: '#D4AE5A', fontWeight: 400 }}>
                                    {s.value}
                                </div>
                                <div
                                    className="text-xs tracking-widest uppercase mt-1.5"
                                    style={{ color: 'rgba(249,245,238,0.55)', letterSpacing: '0.13em' }}
                                >
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </header>

            {/* ===== WALL + FILTERS + CTA ===== */}
            <Postcards />
        </main>
    )
}