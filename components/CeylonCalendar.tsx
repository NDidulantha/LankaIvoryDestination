'use client'

import { useState, useMemo } from 'react'

/* ────────────────────────────────────────────────────────────
   EVENTS — added manually for now.
   When the admin panel exists, replace this array with data
   fetched from the API. Filters, timeline and hover-reveal stay the same.
   - month:    0=Jan … 11=Dec
   - category: 'Religious' | 'Cultural' | 'Music' | 'Sport' | 'Nature'
   - slug:     article URL /experiences/blog/<slug> (built later)
   - images:   put in /public/events/ → reference as /events/filename.jpg
               (1–2 images; falls back to a coloured block if missing)
   ──────────────────────────────────────────────────────────── */
type EventItem = {
    month: number
    title: string
    category: 'Religious' | 'Cultural' | 'Music' | 'Sport' | 'Nature'
    when: string
    where: string
    slug: string
    description: string
    images: string[]
}

const CAT_COLORS: Record<string, string> = {
    Religious: '#B8963A',
    Cultural: '#C0392B',
    Music: '#2C6E63',
    Sport: '#2C4A87',
    Nature: '#5C7A3A',
}
const CAT_LABEL: Record<string, string> = {
    Religious: 'Religious',
    Cultural: 'Cultural',
    Music: 'Music & Arts',
    Sport: 'Sport',
    Nature: 'Nature',
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const POYA = ['Duruthu', 'Navam', 'Medin', 'Bak', 'Vesak', 'Poson', 'Esala', 'Nikini', 'Binara', 'Vap', 'Il', 'Unduvap']
const SEASON = [
    "Whale season (south), Adam's Peak pilgrimage, southern beaches at their best",
    'Whale watching, leopard & dolphin safaris, dry southern coast',
    'Last peak of whale watching, hill-country hiking, surf',
    'New Year across the island, waterfalls & hill country in bloom',
    'Vesak lanterns everywhere; the east coast begins to open',
    'Poson pilgrimages; blue whales arrive in the east',
    'Perahera season begins; the great elephant gathering starts',
    "The island's festival peak; elephants gather at Minneriya",
    'Elephant gathering & east-coast surf continue',
    'Bird-watching season opens; tea country and the cultural triangle shine',
    'Turtle hatchlings & bird migration; calm cultural touring',
    "Adam's Peak season starts; whales return south; festive coast",
]

const EVENTS: EventItem[] = [
    { month: 0, title: 'Kelaniya Duruthu Perahera', category: 'Religious', when: 'Full moon, January', where: 'Kelaniya', slug: 'duruthu-perahera', description: "One of the island's oldest Buddhist pageants — a torch-lit procession of elephants, dancers and drummers marking the Buddha's first visit to Sri Lanka.", images: ['/events/duruthu-1.jpg', '/events/duruthu-2.jpg'] },
    { month: 0, title: 'Thai Pongal', category: 'Cultural', when: 'Mid-January', where: 'Island-wide (Tamil communities)', slug: 'thai-pongal', description: 'The Tamil harvest thanksgiving — boiling the first rice of the season, kolam art at every doorstep, and days of family feasting.', images: ['/events/pongal-1.jpg', '/events/pongal-2.jpg'] },
    { month: 0, title: 'Whale Watching (South)', category: 'Nature', when: 'November–April', where: 'Mirissa', slug: 'whale-watching-mirissa', description: 'Blue and sperm whales pass close to the southern coast — among the finest whale watching on earth.', images: ['/events/whales-south-1.jpg', '/events/whales-south-2.jpg'] },

    { month: 1, title: 'Navam Perahera', category: 'Religious', when: 'Full moon, February', where: 'Colombo', slug: 'navam-perahera', description: "A spectacular procession around Colombo's Beira Lake — hundreds of elephants, torch-bearers, whip-crackers and Kandyan dancers.", images: ['/events/navam-1.jpg', '/events/navam-2.jpg'] },
    { month: 1, title: 'Galle Literary Festival', category: 'Cultural', when: 'January / February', where: 'Galle Fort', slug: 'galle-lit-fest', description: "Writers from across the world gather within the Dutch fort ramparts for one of Asia's most beloved literary festivals.", images: ['/events/galle-lit-1.jpg', '/events/galle-lit-2.jpg'] },

    { month: 2, title: 'Maha Shivaratri', category: 'Religious', when: 'March (varies)', where: 'Trincomalee & Jaffna', slug: 'maha-shivaratri', description: 'A Hindu night of devotion — temples fill with all-night prayers, chanting and celebration honouring Lord Shiva, most vivid at the great Koneswaram and Nallur temples.', images: ['/events/shivaratri-1.jpg', '/events/shivaratri-2.jpg'] },
    { month: 2, title: 'Ramadan', category: 'Cultural', when: 'Dates vary each year', where: 'Muslim communities island-wide', slug: 'ramadan', description: 'The Islamic holy month brings a special atmosphere to Muslim neighbourhoods — evening food markets, shared iftar meals and a warm communal spirit after sunset.', images: ['/events/ramadan-1.jpg', '/events/ramadan-2.jpg'] },

    { month: 3, title: 'Sinhala & Tamil New Year', category: 'Cultural', when: 'Mid-April', where: 'Island-wide', slug: 'sinhala-tamil-new-year', description: "The island's biggest celebration — traditional games, milk rice, oil-lamp rituals and auspicious timings observed in every home.", images: ['/events/newyear-1.jpg', '/events/newyear-2.jpg'] },

    { month: 4, title: 'Vesak Poya', category: 'Religious', when: 'Full moon, May', where: 'Island-wide', slug: 'vesak-festival', description: 'The holiest Buddhist day of the year — streets glow with paper lanterns and pandals, and free food stalls (dansal) appear on every corner.', images: ['/events/vesak-1.jpg', '/events/vesak-2.jpg'] },

    { month: 5, title: 'Poson Poya', category: 'Religious', when: 'Full moon, June', where: 'Mihintale & Anuradhapura', slug: 'poson-festival', description: 'Marking the arrival of Buddhism in Sri Lanka — vast white-clad pilgrimages climb to Mihintale by candlelight.', images: ['/events/poson-1.jpg', '/events/poson-2.jpg'] },
    { month: 5, title: 'Blue Whales (East)', category: 'Nature', when: 'June–September', where: 'Trincomalee', slug: 'whale-watching-trinco', description: 'As the south quietens, the east opens — Trincomalee becomes one of the best places in the world to see blue whales.', images: ['/events/whales-east-1.jpg', '/events/whales-east-2.jpg'] },

    { month: 6, title: 'Kataragama Festival', category: 'Religious', when: 'July', where: 'Kataragama', slug: 'kataragama-festival', description: 'A raw, ecstatic festival of devotion — fire-walking, kavadi dances and acts of penance drawing pilgrims of every faith.', images: ['/events/kataragama-1.jpg', '/events/kataragama-2.jpg'] },
    { month: 6, title: 'Kandy Esala Perahera begins', category: 'Religious', when: 'July–August', where: 'Kandy', slug: 'kandy-esala-perahera', description: 'The build-up to the island\'s grandest festival — ten nights honouring the Sacred Tooth Relic with caparisoned elephants and fire dancers.', images: ['/events/esala-1.jpg', '/events/esala-2.jpg'] },
    { month: 6, title: 'Minneriya Elephant Gathering', category: 'Nature', when: 'July–September', where: 'Minneriya', slug: 'elephant-gathering', description: 'Hundreds of wild elephants converge on the receding Minneriya reservoir — the largest gathering of Asian elephants on earth.', images: ['/events/gathering-1.jpg', '/events/gathering-2.jpg'] },

    { month: 7, title: 'Kandy Esala Perahera', category: 'Cultural', when: 'August (Esala full moon)', where: 'Kandy', slug: 'kandy-esala-perahera', description: "Sri Lanka's most spectacular festival reaches its climax — a river of elephants, torch-bearers, whip-crackers and drummers through Kandy by night.", images: ['/events/esala-climax-1.jpg', '/events/esala-climax-2.jpg'] },
    { month: 7, title: 'Nallur Festival', category: 'Religious', when: 'August (25 days)', where: 'Jaffna', slug: 'nallur-festival', description: "A vibrant, weeks-long Hindu celebration at Jaffna's Nallur Kandaswamy temple — chariots, music and devotion in the north.", images: ['/events/nallur-1.jpg', '/events/nallur-2.jpg'] },

    { month: 8, title: 'Elephant Gathering & East Surf', category: 'Nature', when: 'Through September', where: 'Minneriya / Arugam Bay', slug: 'elephant-gathering', description: 'The elephant gathering continues inland while world-class point breaks fire on the east coast.', images: ['/events/surf-1.jpg', '/events/surf-2.jpg'] },

    { month: 9, title: 'Bird-Watching Season Opens', category: 'Nature', when: 'October onward', where: 'Sinharaja / Bundala', slug: 'bird-watching', description: 'Migrant birds arrive and the rainforests come alive — the start of the island\'s finest birding.', images: ['/events/birds-1.jpg', '/events/birds-2.jpg'] },

    { month: 10, title: 'Deepavali', category: 'Cultural', when: 'November', where: 'Island-wide', slug: 'deepavali', description: 'The Hindu festival of lights — homes and temples glow with oil lamps, and sweets are shared across communities.', images: ['/events/deepavali-1.jpg', '/events/deepavali-2.jpg'] },
    { month: 10, title: 'Turtle Hatchlings & Migration', category: 'Nature', when: 'November', where: 'Kosgoda / Bundala', slug: 'turtle-season', description: 'Turtle hatchlings emerge on the south-west coast as migratory birds fill the wetlands.', images: ['/events/turtles-1.jpg', '/events/turtles-2.jpg'] },

    { month: 11, title: "Adam's Peak Pilgrimage", category: 'Religious', when: 'December–May', where: 'Sri Pada', slug: 'adams-peak', description: 'The season of the sacred night climb begins — a river of lights winds up the mountain to reach the summit by dawn.', images: ['/events/adams-peak-1.jpg', '/events/adams-peak-2.jpg'] },
    { month: 11, title: 'Test Cricket Season', category: 'Sport', when: 'December–February', where: 'Galle / Colombo', slug: 'galle-test-cricket', description: 'International test cricket comes to the island — including the iconic Galle stadium beside the fort ramparts, one of the great settings in world sport.', images: ['/events/cricket-1.jpg', '/events/cricket-2.jpg'] },
    { month: 11, title: 'Christmas & New Year', category: 'Cultural', when: 'December', where: 'Negombo & Colombo', slug: 'christmas-new-year', description: "A festive atmosphere sweeps the coast — especially Negombo's churches and Colombo's hotels and street lights.", images: ['/events/christmas-1.jpg', '/events/christmas-2.jpg'] },
]

const CATEGORIES: Array<keyof typeof CAT_COLORS> = ['Religious', 'Cultural', 'Music', 'Sport', 'Nature']

export default function CeylonCalendar() {
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [pickedMonths, setPickedMonths] = useState<Set<number>>(new Set())
    const [activeCats, setActiveCats] = useState<Set<string>>(new Set())

    // date range → set of months
    const applyDates = (s: string, e: string) => {
        if (!s || !e) return
        const sd = new Date(s)
        const ed = new Date(e)
        if (ed < sd) return
        const months = new Set<number>()
        let y = sd.getFullYear()
        let m = sd.getMonth()
        while (y < ed.getFullYear() || (y === ed.getFullYear() && m <= ed.getMonth())) {
            months.add(m)
            m++
            if (m > 11) { m = 0; y++ }
            if (months.size > 12) break
        }
        setPickedMonths(months)
    }

    const onStart = (v: string) => { setStart(v); applyDates(v, end) }
    const onEnd = (v: string) => { setEnd(v); applyDates(start, v) }

    const toggleMonth = (i: number) => {
        setStart(''); setEnd('')
        setPickedMonths((prev) => {
            const next = new Set(prev)
            next.has(i) ? next.delete(i) : next.add(i)
            return next
        })
    }
    const toggleCat = (c: string) =>
        setActiveCats((prev) => {
            const next = new Set(prev)
            next.has(c) ? next.delete(c) : next.add(c)
            return next
        })
    const clearAll = () => { setStart(''); setEnd(''); setPickedMonths(new Set()); setActiveCats(new Set()) }

    const monthsToShow = pickedMonths.size ? [...pickedMonths].sort((a, b) => a - b) : [...Array(12).keys()]

    const totalMatches = useMemo(() => {
        let n = 0
        monthsToShow.forEach((i) => {
            n += EVENTS.filter((e) => e.month === i && (activeCats.size === 0 || activeCats.has(e.category))).length
        })
        return n
    }, [monthsToShow, activeCats])

    const filtersActive = pickedMonths.size > 0 || activeCats.size > 0

    return (
        <>
            {/* CONTROL PANEL */}
            <div className="sticky top-0 z-20" style={{ backgroundColor: '#EFE6D0', borderBottom: '1px solid rgba(184,150,58,0.2)' }}>
                <div className="max-w-5xl mx-auto px-6 py-5">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div className="flex flex-wrap items-end gap-4">
                            <div>
                                <label className="block text-[0.62rem] font-semibold tracking-widest uppercase mb-1.5" style={{ color: '#5C4A2A', letterSpacing: '0.1em' }}>Arrival</label>
                                <input type="date" value={start} onChange={(e) => onStart(e.target.value)}
                                       className="px-3 py-2 text-sm" style={{ border: '1px solid rgba(184,150,58,0.2)', borderRadius: '6px', backgroundColor: '#fff', color: '#1A1712' }} />
                            </div>
                            <div>
                                <label className="block text-[0.62rem] font-semibold tracking-widest uppercase mb-1.5" style={{ color: '#5C4A2A', letterSpacing: '0.1em' }}>Departure</label>
                                <input type="date" value={end} min={start} onChange={(e) => onEnd(e.target.value)}
                                       className="px-3 py-2 text-sm" style={{ border: '1px solid rgba(184,150,58,0.2)', borderRadius: '6px', backgroundColor: '#fff', color: '#1A1712' }} />
                            </div>
                            {filtersActive && (
                                <button onClick={clearAll} className="text-xs font-semibold tracking-wider uppercase py-2" style={{ color: '#B8963A', letterSpacing: '0.06em' }}>
                                    Clear all
                                </button>
                            )}
                        </div>
                        <div className="text-sm" style={{ color: '#5C4A2A' }}>
                            <b style={{ color: '#B8963A' }}>{filtersActive ? totalMatches : EVENTS.length}</b> {filtersActive ? `event${totalMatches !== 1 ? 's' : ''} match your filters` : 'events across the year'}
                        </div>
                    </div>

                    {/* month chips */}
                    <div className="flex flex-wrap gap-1.5 pt-4 mt-4" style={{ borderTop: '1px solid rgba(184,150,58,0.16)' }}>
                        {MONTHS.map((m, i) => {
                            const on = pickedMonths.has(i)
                            return (
                                <button key={m} onClick={() => toggleMonth(i)}
                                        className="text-[0.66rem] tracking-wider uppercase px-3 py-1.5 transition-all"
                                        style={{
                                            borderRadius: '25px',
                                            border: '1px solid ' + (on ? '#B8963A' : 'rgba(184,150,58,0.18)'),
                                            backgroundColor: on ? '#B8963A' : 'transparent',
                                            color: on ? '#F9F5EE' : '#5C4A2A',
                                            letterSpacing: '0.05em',
                                        }}>
                                    {m.slice(0, 3)}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* CATEGORY FILTERS */}
            <div className="max-w-5xl mx-auto px-6 pt-8 pb-2">
                <div className="flex flex-wrap justify-center gap-2.5">
                    {CATEGORIES.map((c) => {
                        const on = activeCats.has(c)
                        return (
                            <button key={c} onClick={() => toggleCat(c)}
                                    className="flex items-center gap-2 text-xs tracking-wider uppercase px-4 py-2 transition-all"
                                    style={{
                                        borderRadius: '25px',
                                        border: '1px solid ' + (on ? 'transparent' : 'rgba(184,150,58,0.2)'),
                                        backgroundColor: on ? CAT_COLORS[c] : 'transparent',
                                        color: on ? '#fff' : '#5C4A2A',
                                        letterSpacing: '0.06em',
                                    }}>
                                <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: on ? '#fff' : CAT_COLORS[c] }} />
                                {CAT_LABEL[c]}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* TIMELINE */}
            <section className="relative max-w-5xl mx-auto px-6 pt-10 pb-16">
                <div className="cc-timeline">
                    {monthsToShow.map((i) => {
                        const evs = EVENTS.filter((e) => e.month === i && (activeCats.size === 0 || activeCats.has(e.category)))
                        if (evs.length === 0 && filtersActive) return null
                        return (
                            <div key={i} className="cc-month">
                                <div className="cc-node" />
                                <div className="cc-mlabel font-display">
                                    {MONTHS[i]}
                                    <span>{POYA[i]} Poya</span>
                                </div>
                                <p className="text-sm italic mb-3" style={{ color: '#8A8278' }}>{SEASON[i]}.</p>
                                <div className="flex flex-col gap-3">
                                    {evs.map((e, idx) => (
                                        <a
                                            key={e.slug + idx}
                                            href={'/experiences/blog/' + e.slug}
                                            className="cc-event group block overflow-hidden"
                                            style={{
                                                backgroundColor: '#fff',
                                                border: '1px solid rgba(184,150,58,0.16)',
                                                borderLeft: '4px solid ' + CAT_COLORS[e.category],
                                                borderRadius: '6px',
                                                padding: '1.2rem 1.4rem',
                                            }}
                                        >
                                            <div className="flex justify-between items-start gap-3">
                                                <h3 className="font-display text-xl" style={{ color: '#1A1712' }}>{e.title}</h3>
                                                <span className="text-[0.55rem] font-bold tracking-widest uppercase px-2.5 py-1 whitespace-nowrap"
                                                      style={{ backgroundColor: CAT_COLORS[e.category], color: '#fff', borderRadius: '25px', letterSpacing: '0.1em' }}>
                          {CAT_LABEL[e.category]}
                        </span>
                                            </div>
                                            <div className="text-[0.68rem] font-semibold tracking-wider uppercase my-2" style={{ color: '#B8963A', letterSpacing: '0.08em' }}>{e.when}</div>
                                            <div className="text-sm flex items-center gap-1.5" style={{ color: '#8A8278' }}>◍ {e.where}</div>

                                            {/* reveal on hover (desktop) / always-collapsed accordion feel */}
                                            <div className="cc-reveal">
                                                <p className="text-sm mt-4 mb-3" style={{ color: '#5C4A2A' }}>{e.description}</p>
                                                <div className="flex gap-3">
                                                    {e.images.map((src, k) => (
                                                        <div key={k} className="cc-photo"
                                                             style={{
                                                                 backgroundImage: 'url(' + src + ')',
                                                                 backgroundSize: 'cover',
                                                                 backgroundPosition: 'center',
                                                                 backgroundColor: k === 0 ? CAT_COLORS[e.category] : '#2E5A6E',
                                                             }} />
                                                    ))}
                                                </div>
                                                <span className="inline-flex items-center gap-1.5 mt-4 text-[0.64rem] font-bold tracking-widest uppercase" style={{ color: '#B8963A', letterSpacing: '0.1em' }}>
                          Read the full story →
                        </span>
                                            </div>
                                        </a>
                                    ))}
                                    {evs.length === 0 && (
                                        <p className="text-sm" style={{ color: '#8A8278' }}>No major festival this month — but the island is far from quiet.</p>
                                    )}
                                </div>
                            </div>
                        )
                    })}

                    {filtersActive && totalMatches === 0 && (
                        <div className="text-center py-12" style={{ border: '1px dashed rgba(184,150,58,0.3)', borderRadius: '8px', color: '#8A8278' }}>
                            No events match those filters. <b style={{ color: '#B8963A' }}>Try widening your dates or categories.</b>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="text-center py-20 px-6" style={{ backgroundColor: '#243D24' }}>
                <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#D4AE5A', letterSpacing: '0.2em' }}>
                    Want to be there for it?
                </p>
                <h2 className="font-display text-3xl md:text-4xl mb-4" style={{ color: '#F9F5EE', fontWeight: 400 }}>
                    Build a journey around <em style={{ fontStyle: 'italic', color: '#D4AE5A' }}>a festival</em>
                </h2>
                <p className="max-w-lg mx-auto mb-8" style={{ color: 'rgba(249,245,238,0.7)', fontWeight: 300 }}>
                    Tell us which moment calls to you — the Kandy Perahera, a Vesak full moon, the whales arriving — and we&apos;ll design a trip around it.
                </p>
                <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium tracking-wider uppercase transition-all hover:brightness-110"
                   style={{ backgroundColor: '#B8963A', color: '#F9F5EE', borderRadius: '25px', letterSpacing: '0.08em', fontSize: '0.75rem' }}>
                    Plan a Festival Journey
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
            </section>
        </>
    )
}