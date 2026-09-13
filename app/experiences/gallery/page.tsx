import Gallery from '@/components/Gallery'
import JsonLd from '@/components/JsonLd'
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo'

export const metadata = pageMetadata({
    title: 'Gallery',
    description:
        'Moments from our journeys across Sri Lanka — wildlife, ancient cities, hill country and coast, captured on tour with Lanka Ivory Destinations.',
    path: '/experiences/gallery',
    image: '/gallery-hero.jpg',
})

const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/experiences/gallery' },
])

export default function GalleryPage() {
    return (
        <main style={{ backgroundColor: '#243D24' }}>
            <JsonLd data={breadcrumb} />
            {/* HERO */}
            <header className="relative h-[42vh] min-h-[320px] md:h-[70vh] md:min-h-[500px] overflow-hidden flex items-center justify-center text-center">
                <div
                    role="img"
                    aria-label="Surfer walking along a Sri Lankan beach at low tide"
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'url(/gallery-hero.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: '#243D24',
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(26,46,26,0.55), rgba(36,61,36,0.60))'
                    }}
                />
                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <p className="text-xs tracking-widest uppercase mb-5" style={{ color: '#D4AE5A', letterSpacing: '0.18em' }}>
                        Home &nbsp;/&nbsp; Experiences &nbsp;/&nbsp; Gallery
                    </p>
                    <h1 className="font-display text-4xl md:text-7xl" style={{ color: '#F9F5EE', fontWeight: 400 }}>
                        Gallery
                    </h1>
                    <p className="mt-2 md:mt-3 text-xl md:text-3xl" style={{ fontFamily: "'Caveat', cursive", color: '#D4AE5A' }}>
                        moments from the road
                    </p>
                </div>
            </header>

            <Gallery />
        </main>
    )
}