import SignatureJourneys from '@/components/SignatureJourneys'
import JsonLd from '@/components/JsonLd'
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo'

export const metadata = pageMetadata({
    title: 'Signature Journeys',
    description:
        'Our flagship multi-day itineraries across Sri Lanka — privately guided, unhurried, and shaped end to end. Ancient cities, tea country, leopard dawns and the slow south coast.',
    path: '/tours/signature-journeys',
    image: '/tours/signature-hero.jpg',
})

const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Signature Journeys', path: '/tours/signature-journeys' },
])

export default function SignatureJourneysRoute() {
    return (
        <>
            <JsonLd data={breadcrumb} />
            <SignatureJourneys />
        </>
    )
}