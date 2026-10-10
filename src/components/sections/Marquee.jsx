const EVENTS = ['Graduaciones', 'Cumpleaños', 'Festivales', 'Lanzamientos', 'Quinceaños', 'Corporativos', 'Bodas']

export default function Marquee() {
  const items = [...EVENTS, ...EVENTS]

  return (
    <section className="relative bg-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative w-full overflow-hidden py-5 border-t border-b border-line/50 select-none">
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-base via-base/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-base via-base/80 to-transparent z-10 pointer-events-none" />

          <div className="marquee-track flex items-center gap-8 sm:gap-10 text-2xl sm:text-3xl md:text-4xl font-serif italic text-purple-200/90 whitespace-nowrap w-max">
            {items.map((event, i) => (
              <span key={`${event}-${i}`} className="flex items-center gap-8 sm:gap-10">
                <span className="hover:text-white transition duration-300 not-italic sm:italic">{event}</span>
                <span className="text-purple-400/50 not-italic text-base sm:text-lg">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
