import type { Metadata } from 'next'

// Set NEXT_PUBLIC_SITE_URL in the deployment environment before going live.
// This placeholder is only a local-dev/build-time fallback.
const FALLBACK_SITE_URL = 'https://lankaivorydestination.com'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL).replace(/\/$/, '')
export const SITE_NAME = 'Lanka Ivory Destination'

/**
 * Builds a page's metadata. `title` should be the short, page-specific
 * form (e.g. "About") — the root layout's title template appends the
 * brand suffix for the <title> tag. Open Graph / Twitter titles don't
 * get that automatic treatment, so the brand suffix is added here.
 */
export function pageMetadata({
    title,
    description,
    path,
    image,
}: {
    title: string
    description: string
    path: string
    image: string
}): Metadata {
    const fullTitle = `${title} — ${SITE_NAME}`
    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: {
            title: fullTitle,
            description,
            url: path,
            images: [{ url: image, width: 1200, height: 630, alt: fullTitle }],
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            images: [image],
        },
    }
}

/**
 * BreadcrumbList JSON-LD. Only pass segments that correspond to a real,
 * navigable page — non-clickable category labels shown in the on-page
 * breadcrumb (e.g. "Tours", "Experiences") have no route of their own
 * and are intentionally left out rather than pointed at a fake URL.
 */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: `${SITE_URL}${item.path}`,
        })),
    }
}
