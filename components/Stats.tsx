const STATS = [
    { value: '14+', label: 'Years Crafting Journeys' },
    { value: '4,200+', label: 'Travellers Guided' },
    { value: '97%', label: 'Would Return' },
    { value: '23', label: 'Curated Itineraries' },
]

export default function Stats() {
    return (
        <section style={{ backgroundColor: '#243D24' }}>
            <div className="max-w-7xl mx-auto px-6 py-5 sm:py-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
                {STATS.map(stat => (
                    <div key={stat.label} className="text-center">
                        <div
                            className="font-display text-2xl md:text-4xl mb-1 sm:mb-2"
                            style={{ color: '#D4AE5A', fontWeight: 400 }}
                        >
                            {stat.value}
                        </div>
                        <div
                            className="text-xs tracking-widest uppercase"
                            style={{ color: 'rgba(249,245,238,0.55)', letterSpacing: '0.14em', fontSize: '0.68rem' }}
                        >
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}