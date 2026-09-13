import Image from 'next/image'

export default function About() {
    return (
        <section id="about" className="py-14 md:py-32" style={{ backgroundColor: '#EFE6D0' }}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Image collage */}
                    <div className="relative h-64 sm:h-80 lg:h-[540px]">
                        <div className="absolute top-0 left-0 w-3/4 h-4/5" style={{ backgroundColor: '#3A5C3A' }}>
                            <Image
                                src="/About/Galle_Face_Flag_-_Sri_Lanka_-_March_2017.jpg"
                                alt="Galle Fort - Light House"
                                fill
                                sizes="(max-width: 1024px) 75vw, 40vw"
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute bottom-0 right-0 w-1/2 h-1/2" style={{ backgroundColor: '#5C4A2A', border: '6px solid #EFE6D0' }}>
                            <Image
                                src="/About/lotus.jpg"
                                alt="Lotus Tower Sri Lanka"
                                fill
                                sizes="(max-width: 1024px) 50vw, 25vw"
                                className="object-cover"
                            />
                        </div>
                        {/* Gold accent line */}
                        <div
                            className="absolute -bottom-4 left-0 w-24 h-0.5"
                            style={{ backgroundColor: '#B8963A' }}
                        />
                    </div>

                    {/* Text */}
                    <div>
                        <p
                            className="text-xs font-medium tracking-widest mb-5"
                            style={{ color: '#B8963A', textTransform: 'uppercase', letterSpacing: '0.2em' }}
                        >
                            Our Philosophy
                        </p>
                        <h2
                            className="font-display text-3xl md:text-5xl mb-8"
                            style={{ color: '#1A1712', fontWeight: 400, lineHeight: 1.2 }}
                        >
                            Slow travel,<br />
                            <em style={{ fontStyle: 'italic' }}>deep connection</em>
                        </h2>
                        <div
                            className="text-sm md:text-base leading-relaxed mb-6 md:mb-8 space-y-3 md:space-y-4"
                            style={{ color: '#5C4A2A', fontWeight: 300 }}
                        >
                            <p>
                                Lanka Ivory was founded in 2011 by a pair of conservation biologists and a former
                                Colombo hotel director who shared one conviction: that the best way to see Sri Lanka
                                is slowly, with guides who love it.
                            </p>
                            <p>
                                We build itineraries around what most tours skip — a dawn with elephant mahouts,
                                lunch in a family-run rice mill, a private audience with a temple guardian who has
                                kept the flame lit for forty years.
                            </p>
                            <p>
                                Every partner lodge, every guide, every meal is chosen by someone who has been there
                                personally — and returned.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="/about"
                            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium tracking-wider transition-all duration-300 hover:opacity-90"
                            style={{
                            borderRadius: '25px',
                            backgroundColor: '#B8963A',
                            color: '#F9F5EE',
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                            fontSize: '0.73rem',
                        }}
                            >
                            Read More
                        </a>
                    </div>
                </div>
            </div>
        </div>
</section>
)
}