import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Destinations from '@/components/Destinations'
import About from '@/components/About'
import Tours from '@/components/Tours'
import Experiences from '@/components/Experiences'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'

const HOME_TITLE = 'Lanka Ivory Destination — Sri Lanka, travelled properly'
const HOME_DESCRIPTION =
    'Private, tailor-made journeys across Sri Lanka. Chauffeur-guides, hand-checked hotels, and itineraries built around how you want to travel.'

export const metadata: Metadata = {
    // no `title` override here — inherits the root layout's default title
    description: HOME_DESCRIPTION,
    alternates: { canonical: '/' },
    openGraph: {
        title: HOME_TITLE,
        description: HOME_DESCRIPTION,
        url: '/',
        images: [{ url: '/Destinations/Sigiriya1.jpg', width: 1200, height: 630, alt: HOME_TITLE }],
    },
    twitter: {
        card: 'summary_large_image',
        title: HOME_TITLE,
        description: HOME_DESCRIPTION,
        images: ['/Destinations/Sigiriya1.jpg'],
    },
}

export default function Home() {
    return (
        <main className="min-h-screen bg-ivory">
            <Hero />
            <Stats />
            <Destinations />
            <About />
            <Tours />
            <Experiences />
            <Testimonials />
            <Contact />
        </main>
    )
}