import AdventureTours from '@/components/AdventureTours'
import JsonLd from '@/components/JsonLd'
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo'

export const metadata = pageMetadata({
    title: 'Adventure Tours',
    description:
        'Surf breaks, cloud-forest ridges, white water and world-class dive sites across Sri Lanka — the island’s wild side, run with certified guides and the right kit.',
    path: '/tours/adventure',
    image: '/tours/adventure/adventure-hero.jpg',
})

const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Adventure Tours', path: '/tours/adventure' },
])

export default function AdventureToursRoute() {
    return (
        <>
            <JsonLd data={breadcrumb} />
            <AdventureTours />
        </>
    )
}