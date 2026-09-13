import Blog from '@/components/Blog'
import JsonLd from '@/components/JsonLd'
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo'

export const metadata = pageMetadata({
    title: 'The Journal',
    description:
        'Stories, guides and tales from Sri Lanka — travel guides, wildlife, culture and itineraries from the Lanka Ivory Destinations team.',
    path: '/experiences/blog',
    image: '/blog-hero.jpg',
})

const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'The Journal', path: '/experiences/blog' },
])

export default function BlogPage() {
    return (
        <main style={{ backgroundColor: '#F9F5EE' }}>
            <JsonLd data={breadcrumb} />
            {/* HERO */}
            <header className="relative h-[70vh] min-h-[500px] overflow-hidden flex items-center justify-center text-center">
                <div
                    role="img"
                    aria-label="Hand-painted surf school signpost on the rocks at a south coast beach"
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'url(/blog-hero.jpg)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundColor: '#243D24',
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom, rgba(26,46,26,0.82), rgba(36,61,36,0.88))' }}
                />
                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <p className="text-xs tracking-widest uppercase mb-5" style={{ color: '#D4AE5A', letterSpacing: '0.18em' }}>
                        Home &nbsp;/&nbsp; Experiences &nbsp;/&nbsp; The Journal
                    </p>
                    <h1 className="font-display text-5xl md:text-7xl" style={{ color: '#F9F5EE', fontWeight: 400 }}>
                        The Journal
                    </h1>
                    <p className="mt-3 text-2xl md:text-3xl" style={{ fontFamily: "'Caveat', cursive", color: '#D4AE5A' }}>
                        stories, guides &amp; tales from the island
                    </p>
                </div>
            </header>

            <Blog />
        </main>
    )
}