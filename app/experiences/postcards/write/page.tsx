import WritePostcard from '@/components/WritePostcard'
import JsonLd from '@/components/JsonLd'
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo'

export const metadata = pageMetadata({
    title: 'Write Your Postcard',
    description:
        'Travelled with us? Share your story and it may join the wall of postcards from travellers across Sri Lanka.',
    path: '/experiences/postcards/write',
    image: '/postcards-hero.jpg',
})

const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Postcards Home', path: '/experiences/postcards' },
    { name: 'Write Your Postcard', path: '/experiences/postcards/write' },
])

export default function WritePostcardPage() {
    return (
        <main style={{ backgroundColor: '#243D24' }}>
            <JsonLd data={breadcrumb} />
            {/* HERO */}
            <header className="relative pt-32 pb-14 overflow-hidden text-center">
                <div
                    className="absolute inset-0 opacity-25"
                    style={{
                        background:
                            'radial-gradient(circle at 20% 30%, #243D24, transparent 55%), radial-gradient(circle at 80% 70%, #1A2E1A, transparent 55%)',
                    }}
                />
                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <p className="text-xs tracking-widest uppercase mb-5" style={{ color: '#D4AE5A', letterSpacing: '0.18em' }}>
                        Home &nbsp;/&nbsp; Experiences &nbsp;/&nbsp; Postcards Home &nbsp;/&nbsp; Write
                    </p>
                    <h1 className="font-display text-4xl md:text-6xl" style={{ color: '#F9F5EE', fontWeight: 400 }}>
                        Write your postcard
                    </h1>
                    <p className="mt-3 text-2xl md:text-3xl" style={{ fontFamily: "'Caveat', cursive", color: '#D4AE5A' }}>
                        tell us how your journey went
                    </p>
                </div>
            </header>

            <WritePostcard />
        </main>
    )
}