const STATS = [
  { value: '24h', title: 'Respuesta Rápida', desc: 'Atención inmediata' },
  { value: '100%', title: 'Asistencia Total', desc: 'Staff profesional presente' },
  { value: '100%', title: 'Personalización', desc: 'Marcos e interfaz a tu gusto' },
  { value: '300dpi', title: 'Calidad Premium', desc: 'Sublimación térmica real' },
]

export default function StatsBar() {
  return (
    <section className="py-10 sm:py-12 relative border-b border-line/60 bg-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
          {STATS.map((stat) => (
            <div
              key={stat.title}
              className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-panel/80 border border-line/60 hover:border-purple-500/30 transition flex flex-col justify-center shadow-lg shadow-purple-950/20"
            >
              <span className="text-2xl sm:text-4xl font-bold text-white tracking-tight">{stat.value}</span>
              <span className="text-sm font-semibold text-gray-200 mt-1">{stat.title}</span>
              <span className="text-xs text-gray-400 mt-0.5">{stat.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
