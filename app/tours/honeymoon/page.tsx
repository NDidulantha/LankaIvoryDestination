import HoneymoonTours from '@/components/HoneymoonTours'
import JsonLd from '@/components/JsonLd'
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo'

export const metadata = pageMetadata({
    title: 'Honeymoon Tours',
    description:
        'Unhurried, deeply private honeymoons across Sri Lanka — the island’s most romantic stays, surprise touches, and room to do nothing at all but each other.',
    path: '/tours/honeymoon',
    image: '/tours/honeymoon/honeymoon-hero.jpg',
})

const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Honeymoon Tours', path: '/tours/honeymoon' },
])

export default function HoneymoonToursRoute() {
    return (
        <>
            <JsonLd data={breadcrumb} />
            <HoneymoonTours />
        </>
    )
}