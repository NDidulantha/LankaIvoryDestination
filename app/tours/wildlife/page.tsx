import WildlifeSafari from '@/components/WildlifeSafari'
import JsonLd from '@/components/JsonLd'
import { pageMetadata, breadcrumbJsonLd } from '@/lib/seo'

export const metadata = pageMetadata({
    title: 'Wildlife Safari',
    description:
        'Privately guided wildlife safaris across Sri Lanka — the world’s best leopard-spotting, the great elephant gathering, and blue whales offshore, led by expert naturalists.',
    path: '/tours/wildlife',
    image: '/tours/wildlife/wildlife-hero.jpg',
})

const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Wildlife Safari', path: '/tours/wildlife' },
])

export default function WildlifeSafariRoute() {
    return (
        <>
            <JsonLd data={breadcrumb} />
            <WildlifeSafari />
        </>
    )
}