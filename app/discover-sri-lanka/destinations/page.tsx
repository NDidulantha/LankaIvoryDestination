import Destinations from '@/components/DestinationsPage'
import JsonLd from '@/components/JsonLd'
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo'

export const metadata = pageMetadata({
    title: 'Destinations',
    description:
        "Discover Sri Lanka's greatest destinations — Sigiriya, Kandy, Ella, Galle, Yala and more. Read about each, then explore the journeys that take you there.",
    path: '/discover-sri-lanka/destinations',
    image: '/Destinations/Sigiriya1.jpg',
})

const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/discover-sri-lanka/destinations' },
])

export default function DestinationsRoute() {
    return (
        <main style={{ backgroundColor: '#F9F5EE' }}>
            <JsonLd data={breadcrumb} />
            {/* HERO */}
            <header className="relative pt-32 pb-16 overflow-hidden text-center" style={{ backgroundColor: '#243D24' }}>
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        background:
                            'radial-gradient(circle at 20% 30%, #243D24, transparent 55%), radial-gradient(circle at 82% 70%, #1A2E1A, transparent 55%)',
                    }}
                />
                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <p className="text-xs tracking-widest uppercase mb-5" style={{ color: '#D4AE5A', letterSpacing: '0.18em' }}>
                        Home &nbsp;/&nbsp; Discover Sri Lanka &nbsp;/&nbsp; Destinations
                    </p>
                    <h1 className="font-display text-5xl md:text-7xl" style={{ color: '#F9F5EE', fontWeight: 400 }}>
                        Destinations
                    </h1>
                    <p className="mt-3 text-2xl md:text-3xl" style={{ fontFamily: "'Caveat', cursive", color: '#D4AE5A' }}>
                        an island of a thousand worlds
                    </p>
                </div>
            </header>

            <Destinations />
        </main>
    )
}