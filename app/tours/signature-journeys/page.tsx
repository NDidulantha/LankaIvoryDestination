import SignatureJourneys from '@/components/SignatureJourneys'
import JsonLd from '@/components/JsonLd'
import { pageMetadata, breadcrumbJsonLd, SITE_NAME, SITE_URL } from '@/lib/seo'
import { JOURNEYS } from '@/lib/journeys'

export const metadata = pageMetadata({
    title: 'Signature Journeys',
    description:
        '10 privately guided Sri Lanka tours from 3 to 18 days — heritage, beaches, wildlife safaris, honeymoons, adventure, luxury, Ayurveda & yoga retreats and a grand island tour.',
    path: '/tours/signature-journeys',
    image: '/tours/signature-hero.jpg',
})

const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Signature Journeys', path: '/tours/signature-journeys' },
])

// lets search engines read the 10 tours as structured trips, not just page text
const toursJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Signature Journeys',
    numberOfItems: JOURNEYS.length,
    itemListElement: JOURNEYS.map((j, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
            '@type': 'TouristTrip',
            name: j.title,
            description: `${j.duration} — ${j.desc}`,
            image: `${SITE_URL}${j.images[0]}`,
            url: `${SITE_URL}/tours/signature-journeys`,
            touristType: j.type,
            itinerary: {
                '@type': 'ItemList',
                itemListElement: j.route.split(' · ').map((name, k) => ({
                    '@type': 'ListItem',
                    position: k + 1,
                    item: { '@type': 'Place', name: `${name}, Sri Lanka` },
                })),
            },
            provider: { '@type': 'TravelAgency', name: SITE_NAME, url: SITE_URL },
        },
    })),
}

export default function SignatureJourneysRoute() {
    return (
        <>
            <JsonLd data={breadcrumb} />
            <JsonLd data={toursJsonLd} />
            <SignatureJourneys />
        </>
    )
}