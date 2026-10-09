'use client'

import { useEffect } from 'react'
import { GoogleAnalytics, sendGAEvent } from '@next/third-parties/google'

/* Google Analytics 4 — only loads when NEXT_PUBLIC_GA_ID (e.g. "G-XXXXXXXXXX")
   is set in the Vercel environment, so local dev and previews without it stay
   untracked. Page views (including client-side navigation) are recorded by
   GA4's enhanced measurement; this component adds the enquiry-intent clicks. */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim()

/** Sends a GA4 event; a no-op when Analytics isn't configured. */
export function trackEvent(name: string, params: Record<string, string> = {}) {
    if (GA_ID) sendGAEvent('event', name, params)
}

/** Maps a clicked link to a GA4 event, or null if it isn't one we track. */
function eventFor(a: HTMLAnchorElement): [string, Record<string, string>] | null {
    const href = a.getAttribute('href') || ''
    const page = window.location.pathname
    if (href.startsWith('tel:')) return ['phone_click', { page }]
    if (href.startsWith('mailto:')) return ['email_click', { page }]
    if (href.includes('wa.me/')) return ['whatsapp_click', { page }]
    if (href === '/contact') {
        // "Enquire Now" on a tour card → record which tour
        const tour = a.closest('article')?.querySelector('h3')?.textContent?.trim()
        return ['enquire_click', tour ? { page, tour_name: tour } : { page }]
    }
    return null
}

export default function Analytics() {
    useEffect(() => {
        if (!GA_ID) return
        const onClick = (e: MouseEvent) => {
            const a = (e.target as Element | null)?.closest?.('a')
            const ev = a && eventFor(a)
            if (ev) trackEvent(ev[0], ev[1])
        }
        document.addEventListener('click', onClick, { capture: true })
        return () => document.removeEventListener('click', onClick, { capture: true })
    }, [])

    return GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null
}
