import { ClipboardCheck, PartyPopper, SlidersHorizontal } from 'lucide-react'
import OptimizedImage from '../ui/OptimizedImage'

const EVENTS = [
  { image: '/images/gallery/galeria-2.jpg', label: 'Celebración de quinceaños', text: 'Una composición temática creada durante un evento real.' },
  { image: '/images/gallery/experiencia-tematica.jpg', label: 'Experiencia temática', text: 'Fotografía grupal con una ambientación preparada para compartir.' },
  { image: '/images/gallery/foto-grupal.jpg', label: 'Momento grupal', text: 'Un recuerdo de invitados reunidos frente a FlashBooth.' },
]

const STEPS = [
  { icon: SlidersHorizontal, title: '1. Eliges tu experiencia', text: 'Exploras los paquetes y preparas una consulta según tu evento.' },
  { icon: ClipboardCheck, title: '2. Coordinamos los detalles', text: 'Confirmamos disponibilidad, diseño, horario y ubicación contigo.' },
  { icon: PartyPopper, title: '3. Disfrutas tu evento', text: 'FlashBooth acompaña la experiencia para crear y compartir recuerdos.' },
]

export default function RealEvents() {
  return <section id="eventos-reales" className="border-t border-line/60 bg-base py-16 sm:py-20">
    <div className="site-container">
      <div data-reveal className="mx-auto mb-8 max-w-2xl text-center"><span className="mb-2 block text-xs font-bold uppercase tracking-widest text-purple-400">EVENTOS REALES</span><h2 className="font-serif text-3xl text-white sm:text-5xl">Momentos que ya pasaron por FlashBooth</h2></div>
      <div className="grid gap-4 sm:grid-cols-3">{EVENTS.map((item) => <article key={item.image} data-reveal className="overflow-hidden rounded-2xl border border-line bg-card-alt"><OptimizedImage src={item.image} alt={item.label} loading="lazy" className="aspect-[4/3] w-full bg-black/30 object-contain" /><div className="p-4"><h3 className="font-semibold text-white">{item.label}</h3><p className="mt-1 text-sm leading-relaxed text-gray-400">{item.text}</p></div></article>)}</div>
      <div data-reveal className="mt-10 rounded-3xl border border-purple-400/25 bg-purple-950/15 p-5 sm:p-8"><h3 className="text-center font-serif text-3xl text-white">Así funciona</h3><div className="mt-6 grid gap-4 md:grid-cols-3">{STEPS.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl border border-white/10 bg-black/15 p-5"><Icon size={22} className="text-purple-300" aria-hidden="true" /><h4 className="mt-4 font-semibold text-white">{title}</h4><p className="mt-2 text-sm leading-relaxed text-gray-400">{text}</p></div>)}</div></div>
    </div>
  </section>
}
