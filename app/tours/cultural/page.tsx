import CulturalTours from '@/components/CulturalTours'
import JsonLd from '@/components/JsonLd'
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo'

export const metadata = pageMetadata({
    title: 'Cultural Tours',
    description:
        'Ruined capitals, cave temples and living ritual across Sri Lanka — the Cultural Triangle and beyond, walked with heritage specialists who bring the stones and ceremonies to life.',
    path: '/tours/cultural',
    // NOTE: components/CulturalTours.tsx references /tours/cultural-hero.jpg for its
    // own on-page background, but that file doesn't exist in /public (see SEO audit
    // notes) — using a real, existing Cultural Triangle photo for the OG/Twitter image
    // instead so link previews aren't broken.
    image: '/Destinations/Sigiriya1.jpg',
})

const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Cultural Tours', path: '/tours/cultural' },
])

export default function CulturalToursRoute() {
    return (
        <>
            <JsonLd data={breadcrumb} />
            <CulturalTours />
        </>
    )
}