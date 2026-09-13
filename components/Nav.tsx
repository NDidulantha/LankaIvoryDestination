'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type NavItem = {
    label: string
    href?: string
    children?: { label: string; href: string }[]
}

const NAV_ITEMS: NavItem[] = [
    {
        label: 'Home', href: '/',
    },
    /*{
        label: 'Discover Sri Lanka',
        children: [
            { label: 'Destinations', href: '/discover-sri-lanka/destinations' },
            { label: 'Ceylon Calendar', href: '/discover-sri-lanka/events' },
        ],
    },*/
    {
        label: 'Tours', href: '/tours/signature-journeys',
        /* children: [
            { label: 'Signature Journeys', href: '/tours/signature-journeys' },
            { label: 'Day Tours', href: '/tours/day-tours' },
            { label: 'Tailor-Made Tours', href: '/tours/tailor-made' },
            { label: 'Honeymoon Tours', href: '/tours/honeymoon' },
            { label: 'Wildlife Safari', href: '/tours/wildlife' },
            { label: 'Cultural Tours', href: '/tours/cultural' },
            { label: 'Adventure', href: '/tours/adventure' },
        ], */
    },
    /*{
        label: 'Experiences',
        children: [
            { label: 'Postcards Home', href: '/experiences/postcards' },
            { label: 'Blog', href: '/experiences/blog' },
        ],
    },*/
    { label: 'Gallery', href: '/experiences/gallery' },
    /*{ label: 'About', href: '/about' },*/
    { label: 'Contact', href: '/contact' },
]

const LANGS = [
    { code: 'EN', label: 'English', gCode: 'en' },
    { code: 'FR', label: 'Français', gCode: 'fr' },
    { code: 'DE', label: 'Deutsch', gCode: 'de' },
    { code: 'ES', label: 'Español', gCode: 'es' },
    { code: 'IT', label: 'Italiano', gCode: 'it' },
    { code: 'NL', label: 'Nederlands', gCode: 'nl' },
    { code: 'HI', label: 'हिन्दी', gCode: 'hi' },
    { code: 'TA', label: 'தமிழ்', gCode: 'ta' },
    { code: 'LA', label: 'Latina', gCode: 'la' },
    { code: 'JA', label: '日本語', gCode: 'ja' },
    { code: 'ZH', label: '中文', gCode: 'zh-CN' },
]

const GOOGLE_TRANSLATE_LANGS = LANGS.map(l => l.gCode).join(',')

declare global {
    interface Window {
        googleTranslateElementInit?: () => void
        google?: { translate: { TranslateElement: new (opts: Record<string, unknown>, el: string) => void } }
    }
}

export default function Nav() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [openDrop, setOpenDrop] = useState<string | null>(null)
    const [mobileDrop, setMobileDrop] = useState<string | null>(null)
    const [langOpen, setLangOpen] = useState(false)
    const [lang, setLang] = useState('EN')
    const langRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        const onDoc = (e: MouseEvent) => {
            if (langRef.current && !langRef.current.contains(e.target as Node)) {
                setLangOpen(false)
            }
        }
        document.addEventListener('click', onDoc)
        return () => document.removeEventListener('click', onDoc)
    }, [])

    // Load Google's translate widget once, keep it hidden, and drive it from our own language menu
    useEffect(() => {
        if (document.getElementById('google-translate-script')) return
        window.googleTranslateElementInit = () => {
            new window.google!.translate.TranslateElement(
                { pageLanguage: 'en', includedLanguages: GOOGLE_TRANSLATE_LANGS, autoDisplay: false },
                'google_translate_element'
            )
        }
        const script = document.createElement('script')
        script.id = 'google-translate-script'
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
        script.async = true
        document.body.appendChild(script)
    }, [])

    const translateTo = (gCode: string, attempts = 0) => {
        const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null
        if (select) {
            select.value = gCode
            select.dispatchEvent(new Event('change'))
        } else if (attempts < 15) {
            setTimeout(() => translateTo(gCode, attempts + 1), 300)
        }
    }

    const textColor = scrolled ? '#1A1712' : '#F9F5EE'
    // translucent panel: darker glass when nav is transparent (over hero), lighter glass when scrolled
    const panelBg = scrolled ? 'rgba(26,23,18,0.72)': 'rgba(26,23,18,0.6)'
    const panelBorder = 'rgba(212,174,90,0.3)'
    const itemColor = 'rgba(249,245,238,0.85)'

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
            style={{
                backgroundColor: scrolled ? 'rgba(249,245,238,0.96)' : 'transparent',
                backdropFilter: scrolled ? 'blur(12px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(36,61,36,0.15)' : 'none',
            }}
        >
            <div id="google_translate_element" style={{ display: 'none' }} />
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
                {/* Logo (left) */}
                <Link href="/" className="flex items-center gap-3" aria-label="Lanka Ivory Destinations home">
                    <Image
                        src="/logo.png"
                        alt="Lanka Ivory Destinations"
                        width={48}
                        height={48}
                        priority
                        className="h-11 w-auto"
                        style={{ mixBlendMode: scrolled ? 'multiply' : 'normal' }}
                    />
                    <span className="flex flex-col leading-none">
            <span
                className="font-display text-xl tracking-wide"
                style={{ color: scrolled ? '#243D24' : '#F9F5EE', letterSpacing: '0.04em' }}
            >
              Lanka Ivory
            </span>
            <span
                className="text-[0.6rem] tracking-[0.3em] uppercase mt-1"
                style={{ color: scrolled ? '#B8963A' : '#D4AE5A' }}
            >
              Destinations
            </span>
          </span>
                </Link>

                {/* Links (desktop) — all five together */}
                <ul className="hidden lg:flex items-center gap-7">
                    {NAV_ITEMS.map(item => (
                        <li
                            key={item.label}
                            className="relative"
                            onMouseEnter={() => item.children && setOpenDrop(item.label)}
                            onMouseLeave={() => setOpenDrop(null)}
                        >
                            {item.children ? (
                                <span
                                    className="nav-link cursor-pointer text-sm font-medium tracking-wider transition-colors duration-200"
                                    style={{
                                        color: textColor,
                                        letterSpacing: '0.08em',
                                        textTransform: 'uppercase',
                                        fontSize: '0.75rem',
                                    }}
                                >
                  {item.label}
                </span>
                            ) : (
                                <Link
                                    href={item.href!}
                                    className="nav-link text-sm font-medium tracking-wider transition-colors duration-200"
                                    style={{
                                        color: textColor,
                                        letterSpacing: '0.08em',
                                        textTransform: 'uppercase',
                                        fontSize: '0.75rem',
                                    }}
                                >
                                    {item.label}
                                </Link>
                            )}

                            {/* Dropdown */}
                            {item.children && openDrop === item.label && (
                                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50">
                                    <ul
                                        className="min-w-[230px] py-2 overflow-hidden"
                                        style={{
                                            backgroundColor: panelBg,
                                            backdropFilter: 'blur(16px) saturate(1.4)',
                                            WebkitBackdropFilter: 'blur(16px) saturate(1.4)',
                                            border: '1px solid ' + panelBorder,
                                            borderRadius: '14px',
                                            boxShadow: '0 18px 44px rgba(26,23,18,0.28)',
                                        }}
                                    >
                                        {item.children.map(child => (
                                            <li key={child.href}>
                                                <Link
                                                    href={child.href}
                                                    className="lid-drop-item block mx-2 px-4 py-2.5 text-sm transition-all duration-200"
                                                    style={{ color: itemColor, borderRadius: '10px' }}
                                                    onClick={() => setOpenDrop(null)}
                                                >
                                                    {child.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Right cluster: language (always visible) + CTA (desktop) + hamburger (mobile) */}
                <div className="flex items-center gap-2 lg:gap-5">
                    {/* Language — visible on every breakpoint, not tucked inside the mobile menu */}
                    <div className="relative" ref={langRef}>
                        <button
                            onClick={() => setLangOpen(o => !o)}
                            className="flex items-center gap-1 lg:gap-1.5 px-2.5 py-1.5 lg:px-4 lg:py-2 transition-all duration-200 hover:opacity-80"
                            style={{
                                color: textColor,
                                letterSpacing: '0.08em',
                                textTransform: 'uppercase',
                                fontSize: '0.68rem',
                                fontWeight: 500,
                                borderRadius: '25px',
                                border: '1px solid ' + (scrolled ? 'rgba(36,61,36,0.2)' : 'rgba(249,245,238,0.35)'),
                            }}
                            aria-haspopup="true"
                            aria-expanded={langOpen}
                        >
                            {lang}
                            <svg
                                width="9"
                                height="6"
                                viewBox="0 0 10 6"
                                fill="none"
                                aria-hidden="true"
                                style={{ transform: langOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}
                            >
                                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" />
                            </svg>
                        </button>
                        {langOpen && (
                            <ul
                                className="absolute right-0 mt-3 min-w-[160px] py-2 z-50 overflow-hidden"
                                style={{
                                    backgroundColor: panelBg,
                                    backdropFilter: 'none',
                                    WebkitBackdropFilter: 'none',
                                    border: '1px solid ' + panelBorder,
                                    borderRadius: '14px',
                                    boxShadow: '0 18px 44px rgba(26,23,18,0.28)',
                                }}
                            >
                                {LANGS.map(l => (
                                    <li key={l.code}>
                                        <button
                                            onClick={() => { setLang(l.code); setLangOpen(false); translateTo(l.gCode) }}
                                            className="lid-drop-item w-full flex items-center justify-between gap-4 mx-2 px-4 py-2 text-left transition-all duration-200"
                                            style={{
                                                color: l.code === lang ? '#D4AE5A' : itemColor,
                                                fontWeight: l.code === lang ? 600 : 400,
                                                fontSize: '0.85rem',
                                                borderRadius: '10px',
                                                width: 'calc(100% - 1rem)',
                                            }}
                                        >
                                            {l.label}
                                            <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.14em', color: '#B8963A' }}>
                        {l.code}
                      </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* CTA — desktop only */}
                    <Link
                        href="/contact"
                        className="hidden lg:inline-flex items-center gap-2 text-sm font-medium px-6 py-2.5 transition-all duration-200 hover:brightness-110"
                        style={{
                            borderRadius: '25px',
                            backgroundColor: '#B8963A',
                            color: '#F9F5EE',
                            letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            fontSize: '0.72rem',
                        }}
                    >
                        Plan Your Journey
                    </Link>

                    {/* Hamburger — mobile only */}
                    <button
                        className="lg:hidden flex flex-col gap-1.5 p-1"
                        onClick={() => setMenuOpen(o => !o)}
                        aria-label="Open menu"
                    >
                        {[0, 1, 2].map(i => (
                            <span
                                key={i}
                                className="block w-6 h-px transition-all duration-300"
                                style={{ backgroundColor: textColor }}
                            />
                        ))}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className="lg:hidden transition-all duration-300 overflow-y-auto"
                style={{ maxHeight: menuOpen ? '80vh' : '0', backgroundColor: '#F9F5EE' }}
            >
                <div className="px-6 py-6 flex flex-col gap-1">
                    {NAV_ITEMS.map(item => (
                        item.children ? (
                            <div key={item.label} style={{ borderBottom: '1px solid rgba(36,61,36,0.12)' }}>
                                <button
                                    onClick={() => setMobileDrop(mobileDrop === item.label ? null : item.label)}
                                    className="w-full flex items-center justify-between py-3 font-display text-lg"
                                    style={{ color: '#1A1712' }}
                                >
                                    {item.label}
                                    <svg
                                        width="12"
                                        height="8"
                                        viewBox="0 0 10 6"
                                        fill="none"
                                        style={{ transform: mobileDrop === item.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}
                                    >
                                        <path d="M1 1l4 4 4-4" stroke="#243D24" strokeWidth="1.4" />
                                    </svg>
                                </button>
                                {mobileDrop === item.label && (
                                    <div className="pb-3 pl-3 flex flex-col gap-2">
                                        {item.children.map(child => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                onClick={() => setMenuOpen(false)}
                                                className="text-sm py-1"
                                                style={{ color: '#5C4A2A' }}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                key={item.label}
                                href={item.href!}
                                onClick={() => setMenuOpen(false)}
                                className="py-3 font-display text-lg"
                                style={{ color: '#1A1712', borderBottom: '1px solid rgba(36,61,36,0.12)' }}
                            >
                                {item.label}
                            </Link>
                        )
                    ))}

                    <Link
                        href="/contact"
                        onClick={() => setMenuOpen(false)}
                        className="mt-4 self-start px-6 py-2.5 text-sm font-medium"
                        style={{ backgroundColor: '#B8963A', color: '#F9F5EE', borderRadius: '25px' }}
                    >
                        Plan Your Journey
                    </Link>
                </div>
            </div>
        </nav>
    )
}