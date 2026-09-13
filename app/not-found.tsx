import Link from 'next/link'

export const metadata = {
    title: 'Page Not Found',
    robots: { index: false, follow: true },
}

export default function NotFound() {
    return (
        <main
            className="flex flex-col items-center justify-center text-center px-6"
            style={{ minHeight: '70vh', backgroundColor: '#F9F5EE' }}
        >
            <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#B8963A', letterSpacing: '0.2em' }}>
                404
            </p>
            <h1 className="font-display text-4xl md:text-6xl mb-5" style={{ color: '#1A1712', fontWeight: 400 }}>
                This page has wandered off
            </h1>
            <p className="max-w-md mb-8" style={{ color: '#5C4A2A', fontWeight: 300 }}>
                The page you&rsquo;re looking for doesn&rsquo;t exist, or may have moved. Let&rsquo;s get you back on the road.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href="/"
                    className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium tracking-wider uppercase transition-all hover:brightness-110"
                    style={{ backgroundColor: '#B8963A', color: '#F9F5EE', borderRadius: '25px', letterSpacing: '0.08em', fontSize: '0.75rem' }}
                >
                    Back to Home
                </Link>
                <Link
                    href="/discover-sri-lanka/destinations"
                    className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium tracking-wider uppercase transition-all"
                    style={{ border: '1px solid rgba(36,61,36,0.35)', color: '#243D24', borderRadius: '25px', letterSpacing: '0.08em', fontSize: '0.75rem' }}
                >
                    Explore Destinations
                </Link>
                <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium tracking-wider uppercase transition-all"
                    style={{ border: '1px solid rgba(36,61,36,0.35)', color: '#243D24', borderRadius: '25px', letterSpacing: '0.08em', fontSize: '0.75rem' }}
                >
                    Contact Us
                </Link>
            </div>
        </main>
    )
}
