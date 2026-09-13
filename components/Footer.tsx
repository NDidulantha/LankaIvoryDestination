const QUICK_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Signature Tours', href: '/tours/signature-journeys' },
    { label: 'Gallery', href: '/experiences/gallery' },
    { label: 'Contact', href: '/contact' },
]

export default function Footer() {
    return (
        <footer style={{ backgroundColor: '#EFE6D0', borderTop: '1px solid rgba(36,61,36,0.15)' }}>
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-5">
                            <img src="/logo.png" alt="Lanka Ivory Destinations" className="h-20 w-auto" />
                            <span className="flex flex-col leading-none">
                                <span className="font-display text-2xl" style={{ color: '#1A1712', letterSpacing: '0.04em' }}>
                                    Lanka Ivory
                                </span>
                                <span
                                    className="text-[0.7rem] tracking-[0.3em] uppercase mt-1"
                                    style={{ color: '#B8963A' }}
                                >
                                    Destinations
                                </span>
              </span>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: 'rgba(26,23,18,0.55)', fontWeight: 300 }}>
                            Privately guided journeys through Sri Lanka since 2011.
                        </p>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h4
                            className="text-xs font-medium tracking-widest uppercase mb-5"
                            style={{ color: '#B8963A', letterSpacing: '0.15em', fontSize: '0.7rem' }}
                        >
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {QUICK_LINKS.map(link => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm transition-colors hover:opacity-70"
                                        style={{ color: 'rgba(26,23,18,0.6)', fontWeight: 300 }}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Get in touch */}
                    <div>
                        <h4
                            className="text-xs font-medium tracking-widest uppercase mb-5"
                            style={{ color: '#B8963A', letterSpacing: '0.15em', fontSize: '0.7rem' }}
                        >
                            Get in Touch
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="tel:+94112345678"
                                    className="text-sm transition-colors hover:opacity-70"
                                    style={{ color: 'rgba(26,23,18,0.6)', fontWeight: 300 }}
                                >
                                    +94 11 234 5678
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://wa.me/94761234567"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm transition-colors hover:opacity-70"
                                    style={{ color: 'rgba(26,23,18,0.6)', fontWeight: 300 }}
                                >
                                    WhatsApp: +94 76 123 4567
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:hello@lankaivorydestinations.com"
                                    className="text-sm transition-colors hover:opacity-70"
                                    style={{ color: 'rgba(26,23,18,0.6)', fontWeight: 300 }}
                                >
                                    hello@lankaivorydestinations.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div
                    className="flex flex-col md:flex-row justify-center items-center gap-4 pt-8"
                    style={{ borderTop: '1px solid rgba(26,23,18,0.1)' }}
                >
                    <p className="text-sm" style={{ color: 'rgba(26,23,18,0.45)' }}>
                        © 2026 Lanka Ivory Destinations (Pvt) Ltd. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}
