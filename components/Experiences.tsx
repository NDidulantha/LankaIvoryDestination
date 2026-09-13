export default function Experiences() {
    return (
        <section id="experiences" className="relative py-28 overflow-hidden">
            <div
                className="absolute inset-0"
                style={{ backgroundColor: '#243D24' }}
            />
            <div className="relative max-w-4xl mx-auto px-6 text-center">
                <p
                    className="text-xs font-medium tracking-widest mb-6"
                    style={{ color: '#D4AE5A', textTransform: 'uppercase', letterSpacing: '0.22em' }}
                >
                    Private Experiences
                </p>
                <h2
                    className="font-display text-4xl md:text-6xl mb-8"
                    style={{ color: '#F9F5EE', fontWeight: 400, lineHeight: 1.2 }}
                >
                    Beyond the tourist path,<br />
                    <em style={{ color: '#D4AE5A' }}>into the living island</em>
                </h2>
                <p
                    className="text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
                    style={{ color: 'rgba(249,245,238,0.75)', fontWeight: 300 }}
                >
                    Private cooking classes with village grandmothers. Dawn meditation with forest monks.
                    Snorkelling the coral gardens of Pigeon Island. Night walks with a naturalist
                    in Sinharaja&apos;s ancient rainforest.
                </p>
                <a
                    href="#contact"
                    className="inline-flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-wider uppercase transition-all hover:brightness-110"
                    style={{
                        border: '1px solid rgba(184,150,58,0.6)',
                        borderRadius:'25px',
                        backgroundColor: '#B8963A',
                        color: '#F9F5EE',
                        letterSpacing: '0.1em',
                        fontSize: '0.73rem',
                    }}
                >
                    Build a Custom Journey
                </a>
            </div>
        </section>
    )
}