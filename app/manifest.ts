import type { MetadataRoute } from 'next'
import { SITE_NAME } from '@/lib/seo'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `${SITE_NAME} — Sri Lanka, travelled properly`,
        short_name: SITE_NAME,
        description:
            'Private, tailor-made journeys across Sri Lanka. Chauffeur-guides, hand-checked hotels, and itineraries built around how you want to travel.',
        start_url: '/',
        display: 'standalone',
        background_color: '#F9F5EE',
        theme_color: '#243D24',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/icon.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
