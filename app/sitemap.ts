import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

const ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
    { path: '/', changeFrequency: 'weekly', priority: 1 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/discover-sri-lanka/destinations', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/discover-sri-lanka/events', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/experiences/blog', changeFrequency: 'weekly', priority: 0.6 },
    { path: '/experiences/gallery', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/experiences/postcards', changeFrequency: 'weekly', priority: 0.5 },
    { path: '/experiences/postcards/write', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/tours/adventure', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/tours/cultural', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/tours/day-tours', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/tours/honeymoon', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/tours/signature-journeys', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/tours/wildlife', changeFrequency: 'monthly', priority: 0.9 },
]

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date()
    return ROUTES.map((route) => ({
        url: `${SITE_URL}${route.path}`,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }))
}
