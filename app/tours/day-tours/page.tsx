import DayTours from '@/components/DayTours'
import JsonLd from '@/components/JsonLd'
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo'

export const metadata = pageMetadata({
    title: 'Day Tours',
    description:
        'Single-day escapes across Sri Lanka with a private guide and vehicle — sacred cities, leopard parks, tea-country trails and surf coast, each home again by nightfall.',
    path: '/tours/day-tours',
    image: '/tours/day/day-tours-hero.jpg',
})

const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Day Tours', path: '/tours/day-tours' },
])

export default function DayToursRoute() {
    return (
        <>
            <JsonLd data={breadcrumb} />
            <DayTours />
        </>
    )
}