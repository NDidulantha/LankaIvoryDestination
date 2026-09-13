'use client'

import { useState } from 'react'

const STAMPS = ['🐘', '🐆', '🌴', '🐢', '🛕', '🍃', '🌊', '🦚']

export default function WritePostcard() {
    const [sent, setSent] = useState(false)
    const [name, setName] = useState('')
    const [origin, setOrigin] = useState('')
    const [tour, setTour] = useState('')
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [rating, setRating] = useState(5)
    const [stamp, setStamp] = useState('🐘')

    const monthYear = new Date()
        .toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
        .toUpperCase()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: POST to Laravel — postcard goes to moderation queue before joining the wall
        setSent(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const field: React.CSSProperties = {
        width: '100%',
        padding: '0.8rem 1rem',
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(184,150,58,0.18)',
        borderRadius: '6px',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '0.9rem',
        color: '#1A1712',
        outline: 'none',
    }
    const label: React.CSSProperties = {
        display: 'block',
        fontSize: '0.68rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'rgba(249,245,238,0.7)',
        marginBottom: '0.5rem',
    }

    if (sent) {
        return (
            <div className="max-w-2xl mx-auto px-6 pb-28">
                <div
                    className="text-center p-12"
                    style={{ backgroundColor: '#EBF0E8', borderRadius: '10px', border: '1px solid rgba(36,61,36,0.3)' }}
                >
                    <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                        style={{ backgroundColor: '#243D24' }}
                    >
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                            <path d="M5 13l4 4L19 7" stroke="#D4AE5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h2 className="font-display text-3xl mb-4" style={{ color: '#1A1712' }}>
                        Your postcard is on its way
                    </h2>
                    <p className="mb-8" style={{ color: '#5C4A2A', fontWeight: 300 }}>
                        Thank you for sharing your journey with us. Once we&apos;ve had a read, it may join the wall of
                        postcards from travellers across the island.
                    </p>
                    <a
                        href="/experiences/postcards"
                        className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium tracking-wider uppercase transition-all hover:brightness-110"
                        style={{ backgroundColor: '#B8963A', color: '#F9F5EE', borderRadius: '25px', letterSpacing: '0.08em', fontSize: '0.72rem' }}
                    >
                        Back to the wall
                    </a>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-6 pb-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* ===== LEFT: the form ===== */}
            <form onSubmit={handleSubmit} className="order-2 lg:order-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label style={label}>Your name *</label>
                        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Charlotte & Marcus" style={field} />
                    </div>
                    <div>
                        <label style={label}>Where you&apos;re from *</label>
                        <input type="text" required value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="e.g. London, UK" style={field} />
                    </div>
                </div>

                <div className="mt-5">
                    <label style={label}>Which journey did you take?</label>
                    <input type="text" value={tour} onChange={(e) => setTour(e.target.value)} placeholder="e.g. The Golden Triangle" style={field} />
                </div>

                <div className="mt-5">
                    <label style={label}>Give it a title *</label>
                    <input type="text" required maxLength={60} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="A honeymoon we'll never forget" style={field} />
                </div>

                <div className="mt-5">
                    <label style={label}>Your message *</label>
                    <textarea
                        required
                        rows={5}
                        maxLength={400}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about your trip — the moments, the guides, the places that stayed with you…"
                        style={{ ...field, resize: 'vertical' }}
                    />
                    <div className="text-right text-xs mt-1" style={{ color: 'rgba(249,245,238,0.5)' }}>
                        {message.length}/400
                    </div>
                </div>

                {/* rating */}
                <div className="mt-5">
                    <label style={label}>Your rating</label>
                    <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map((n) => (
                            <button
                                key={n}
                                type="button"
                                onClick={() => setRating(n)}
                                aria-label={n + ' stars'}
                                style={{ fontSize: '1.6rem', lineHeight: 1, color: n <= rating ? '#D4AE5A' : 'rgba(249,245,238,0.25)' }}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>

                {/* stamp picker */}
                <div className="mt-5">
                    <label style={label}>Choose your stamp</label>
                    <div className="flex flex-wrap gap-2">
                        {STAMPS.map((s) => (
                            <button
                                key={s}
                                type="button"
                                onClick={() => setStamp(s)}
                                className="flex items-center justify-center transition-all"
                                style={{
                                    width: '46px',
                                    height: '46px',
                                    fontSize: '1.4rem',
                                    borderRadius: '8px',
                                    border: '1px solid ' + (stamp === s ? '#D4AE5A' : 'rgba(212,174,90,0.3)'),
                                    backgroundColor: stamp === s ? 'rgba(212,174,90,0.15)' : 'transparent',
                                }}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* consent */}
                <label className="flex items-start gap-3 mt-6 cursor-pointer">
                    <input type="checkbox" required className="mt-1" style={{ accentColor: '#B8963A' }} />
                    <span className="text-sm" style={{ color: 'rgba(249,245,238,0.7)', fontWeight: 300 }}>
            I give permission for Lanka Ivory to publish my postcard, and I accept the privacy policy.
          </span>
                </label>

                <button
                    type="submit"
                    className="mt-7 inline-flex items-center gap-2 px-8 py-4 text-sm font-medium tracking-wider uppercase transition-all hover:brightness-110"
                    style={{ backgroundColor: '#B8963A', color: '#F9F5EE', borderRadius: '25px', letterSpacing: '0.08em', fontSize: '0.75rem' }}
                >
                    Send Your Postcard
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </form>

            {/* ===== RIGHT: live postcard preview ===== */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-28">
                <p className="text-xs font-semibold tracking-widest uppercase mb-4 text-center" style={{ color: '#D4AE5A', letterSpacing: '0.16em' }}>
                    Live preview
                </p>
                <div style={{ backgroundColor: '#F9F5EE', padding: '10px', borderRadius: '4px', boxShadow: '0 24px 60px rgba(0,0,0,0.35)' }}>
                    <div
                        style={{
                            border: '2px solid transparent',
                            borderImage:
                                'repeating-linear-gradient(45deg, #C0392B 0, #C0392B 12px, #F9F5EE 12px, #F9F5EE 24px, #2C4A87 24px, #2C4A87 36px, #F9F5EE 36px, #F9F5EE 48px) 2',
                            padding: '1.75rem',
                            minHeight: '340px',
                        }}
                    >
                        <div className="flex justify-between items-start mb-4">
              <span className="text-[0.6rem] font-semibold tracking-widest uppercase" style={{ color: '#2C6E63', letterSpacing: '0.16em' }}>
                Postcard · Sri Lanka
              </span>
                            <div
                                className="flex flex-col items-center justify-center flex-shrink-0"
                                style={{ width: '54px', height: '66px', backgroundColor: '#EAF4F1', border: '1px dashed #2C6E63', transform: 'rotate(4deg)' }}
                            >
                                <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>{stamp}</span>
                                <span style={{ fontSize: '0.42rem', color: '#2C6E63', fontWeight: 700, letterSpacing: '0.05em', marginTop: '2px' }}>CEYLON</span>
                            </div>
                        </div>

                        <h3 className="font-display text-2xl mb-3" style={{ color: '#1A1712', fontStyle: 'italic' }}>
                            {title || 'Your title appears here'}
                        </h3>
                        <p className="text-sm mb-6" style={{ color: message ? '#3A352E' : '#B0A99A', lineHeight: 1.7 }}>
                            {message || 'As you type your message, it will appear right here on the postcard…'}
                        </p>

                        <p style={{ fontFamily: "'Caveat', cursive", fontSize: '1.6rem', color: '#C0392B', lineHeight: 1 }}>
                            {name || 'Your name'}
                        </p>
                        <p className="text-xs mt-1" style={{ color: '#8A8278' }}>
                            {(origin || 'Where you’re from')}{tour ? ' · ' + tour : ''}
                        </p>

                        <div className="flex justify-between items-center mt-4 pt-3" style={{ borderTop: '1px solid rgba(26,23,18,0.12)' }}>
              <span style={{ color: '#B8963A', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
                {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
              </span>
                            <span
                                className="text-[0.6rem] tracking-wider uppercase"
                                style={{ color: '#C0392B', border: '1px solid #C0392B', borderRadius: '20px', padding: '0.2rem 0.55rem', opacity: 0.7 }}
                            >
                {monthYear}
              </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}