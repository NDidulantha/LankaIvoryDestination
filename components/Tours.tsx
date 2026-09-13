import Image from 'next/image'
import { JOURNEYS } from '@/lib/journeys'

const TOURS = JOURNEYS.slice(0, 4).map(j => ({
    title: j.title,
    days: j.duration,
    price: 'From ' + j.price,
    highlights: j.highlights,
    img: j.images[0],
    alt: j.title + ' — signature tour of Sri Lanka',
}))

export default function Tours() {
    return (
        <section id="tours" className="py-14 md:py-32">
            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-10 md:mb-16">
                    <p
                        className="text-xs font-medium tracking-widest mb-4"
                        style={{ color: '#B8963A', textTransform: 'uppercase', letterSpacing: '0.2em' }}
                    >
                        Curated Itineraries
                    </p>
                    <h2
                        className="font-display text-3xl md:text-5xl"
                        style={{ color: '#1A1712', fontWeight: 400, lineHeight: 1.15 }}
                    >
                        Journeys crafted<br />with uncommon care
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {TOURS.map(tour => (
                        <article
                            key={tour.title}
                            className="group cursor-pointer h-full flex flex-col"
                            style={{ border: '1px solid rgba(184,150,58,0.15)' }}
                        >
                            <div className="overflow-hidden h-40 sm:h-52 relative">
                                <Image
                                    src={tour.img}
                                    alt={tour.alt}
                                    fill
                                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    style={{ backgroundColor: '#243D24' }}
                                />
                                <div
                                    className="absolute inset-0"
                                    style={{ background: 'linear-gradient(to top, rgba(26,23,18,0.5) 0%, transparent 60%)' }}
                                />
                                <span
                                    className="absolute bottom-4 left-4 text-xs font-medium tracking-widest uppercase"
                                    style={{ color: '#D4AE5A', letterSpacing: '0.15em', fontSize: '0.65rem' }}
                                >
                  {tour.days}
                </span>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <h3
                                    className="font-display text-xl mb-1"
                                    style={{ color: '#1A1712', fontWeight: 400 }}
                                >
                                    {tour.title}
                                </h3>
                                <p
                                    className="text-sm mb-5"
                                    style={{ color: '#B8963A', fontWeight: 500 }}
                                >
                                    {tour.price} <span style={{ color: '#8A8278', fontWeight: 300 }}>per person</span>
                                </p>

                                <ul className="space-y-1.5 mb-6">
                                    {tour.highlights.map(h => (
                                        <li
                                            key={h}
                                            className="flex items-center gap-2.5 text-sm"
                                            style={{ color: '#5C4A2A', fontWeight: 300 }}
                                        >
                                            <span style={{ color: '#B8963A', fontSize: '0.5rem' }}>◆</span>
                                            {h}
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="/contact"
                                    className="flex flex-nowrap items-center justify-center gap-2 w-full text-sm font-medium tracking-wider uppercase py-3 mt-auto transition-all duration-300 hover:opacity-90"
                                    style={{
                                        borderRadius: '25px',
                                        backgroundColor: '#B8963A',
                                        color: '#F9F5EE',
                                        letterSpacing: '0.1em',
                                        fontSize: '0.7rem',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    <span>Book Now</span>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </a>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <a
                        href="/tours/signature-journeys"
                        className="inline-flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-wider transition-all duration-300 bg-transparent text-[#B8963A] hover:bg-[#B8963A] hover:text-[#F9F5EE]"
                        style={{
                            borderRadius: '25px',
                            border: '1.5px solid #B8963A',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            fontSize: '0.75rem',
                        }}
                    >
                        View All Tours
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}