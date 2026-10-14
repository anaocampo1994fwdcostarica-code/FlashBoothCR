import { useCallback, useEffect, useRef, useState } from 'react'
import { Camera, Printer, Search, Smartphone, Sparkles, X } from 'lucide-react'

const FEATURES = [
  { icon: Camera, title: 'Fotografía profesional', desc: 'Imágenes de alta calidad con iluminación profesional.', image: '/images/foto profesional.jpeg' },
  { icon: Smartphone, title: 'Contenido digital', desc: 'Fotos, videos, Stories y diseños listos para compartir en redes.', image: '/images/Contenido digital.jpg' },
  { icon: Sparkles, title: 'Experiencias con IA', desc: 'Fondos virtuales y transformaciones creativas para fotos únicas.', image: '/images/fondos-ia.jpg' },
  { icon: Printer, title: 'Recuerdos impresos', desc: 'Tiras fotográficas 2×6” impresas al instante para llevarse el momento.', image: '/images/recuerdos-impresos.jpg' },
]

function ServiceModal({ feature, onClose, returnFocusRef }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const restoreFrameRef = useRef(0)

  useEffect(() => {
    cancelAnimationFrame(restoreFrameRef.current)
    const returnFocusTarget = returnFocusRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); return }
      if (event.key !== 'Tab') return
      const focusable = dialogRef.current?.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      restoreFrameRef.current = requestAnimationFrame(() => returnFocusTarget?.focus())
    }
  }, [onClose, returnFocusRef])

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 pt-[max(1rem,env(safe-area-inset-top))] backdrop-blur-xs sm:p-8" onMouseDown={onClose} role="presentation">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="service-modal-title" className="relative flex max-h-full w-full max-w-5xl flex-col rounded-2xl border border-purple-300/25 bg-[#100d1b] p-3 shadow-2xl shadow-black/70 sm:p-5" onMouseDown={(event) => event.stopPropagation()}>
        <button ref={closeRef} type="button" onClick={onClose} className="absolute right-3 top-3 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/70 bg-[#0b0912]/95 text-white shadow-lg shadow-black/70 transition hover:border-purple-200 hover:bg-purple-700 focus:outline-hidden focus:ring-4 focus:ring-purple-300/80 sm:right-5 sm:top-5" aria-label="Cerrar imagen"><X size={24} strokeWidth={2.5} aria-hidden="true" /></button>
        <div className="mb-3 flex min-h-11 items-center gap-4 px-1 pr-14 sm:pr-16">
          <h3 id="service-modal-title" className="text-base font-semibold text-white sm:text-lg">{feature.title}</h3>
        </div>
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-xl bg-black/40">
          <img src={feature.image} alt={feature.title} className="max-h-[calc(100vh-10rem)] max-w-full object-contain" />
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  const sectionRef = useRef(null)
  const glowRef = useRef(null)
  const frameRef = useRef(null)
  const triggerRef = useRef(null)
  const [activeFeature, setActiveFeature] = useState(null)

  const updateGlow = useCallback((event) => {
    const section = sectionRef.current
    const glow = glowRef.current
    if (!section || !glow) return
    const bounds = section.getBoundingClientRect()
    const x = event.clientX - bounds.left
    const y = event.clientY - bounds.top
    cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      glow.style.setProperty('--service-glow-x', `${x}px`)
      glow.style.setProperty('--service-glow-y', `${y}px`)
    })
  }, [])

  useEffect(() => () => cancelAnimationFrame(frameRef.current), [])
  const openFeature = (feature, event) => { triggerRef.current = event.currentTarget; setActiveFeature(feature) }
  const closeFeature = useCallback(() => setActiveFeature(null), [])

  return (
    <section id="servicios" ref={sectionRef} className="services-with-glow border-t border-line/60 bg-base py-16 sm:py-20 lg:py-24" onMouseEnter={(event) => { sectionRef.current?.classList.add('services-glow-active'); updateGlow(event) }} onMouseMove={updateGlow} onMouseLeave={() => sectionRef.current?.classList.remove('services-glow-active')}>
      <div ref={glowRef} className="services-glow" aria-hidden="true" />
      <div className="services-content site-container">
        <div data-reveal className="overflow-hidden rounded-3xl border border-line-soft bg-panel shadow-2xl shadow-black/30 lg:grid lg:grid-cols-[1.03fr_.97fr]">
          <div className="relative h-[420px] overflow-hidden sm:h-[520px] lg:h-auto lg:min-h-[760px]">
            <img src="/images/foto-principal.jpg" alt="Experiencia FlashBooth" loading="lazy" className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07060c]/90 via-[#07060c]/10 to-transparent" />
            <div className="absolute bottom-7 left-7 sm:bottom-10 sm:left-10"><p className="font-serif text-2xl italic leading-none text-white sm:text-3xl">Momentos<br />que se comparten ♡</p><p className="mt-4 text-[9px] font-semibold tracking-[.28em] text-white/75">FOTOS · EXPERIENCIAS · RECUERDOS</p></div>
          </div>
          <div className="flex flex-col p-6 sm:p-8 lg:p-10 xl:p-12">
            <div className="mb-7 lg:mb-8">
              <div className="mb-5 flex items-center gap-3"><span className="h-px w-16 bg-brand" /><span className="text-[10px] font-bold tracking-[.28em] text-purple-300">MÁS QUE FOTOS</span></div>
              <h2 className="font-serif text-4xl leading-[1.05] text-white sm:text-5xl xl:text-[3.45rem]">Más que fotos.<br />Contenido para<br className="hidden sm:block" />{' '}<span className="bg-gradient-to-r from-brand to-brand-indigo bg-clip-text italic text-transparent">recordar y compartir.</span></h2>
              <p className="mt-6 max-w-xl !text-[#D1D5DB] text-sm leading-relaxed sm:text-base">FlashBooth convierte cada momento de tu evento en fotografías, recuerdos impresos y contenido digital que tus invitados pueden llevarse, compartir y disfrutar después de la celebración.</p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:flex-1 lg:auto-rows-fr">
              {FEATURES.map((feature) => {
                const Icon = feature.icon
                return <article key={feature.title} data-reveal className="flex min-h-[276px] flex-col rounded-2xl border border-line-soft bg-card/90 p-4 transition-colors hover:border-purple-500/60 sm:min-h-[300px] sm:p-5">
                  <div className="flex min-w-0 items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-brand-indigo text-white shadow-lg shadow-purple-950/50"><Icon size={18} aria-hidden="true" /></span><h3 className="min-w-0 text-sm font-bold text-white">{feature.title}</h3></div>
                  <p className="mt-3 text-xs leading-relaxed text-gray-300">{feature.desc}</p>
                  <button type="button" onClick={(event) => openFeature(feature, event)} className="mt-4 flex h-28 w-full items-center justify-center overflow-hidden rounded-xl bg-black/40 focus:outline-hidden focus:ring-2 focus:ring-purple-300 sm:h-32" aria-label={`Ampliar ${feature.title}`}><img src={feature.image} alt="" loading="lazy" className="h-full w-full object-contain" /></button>
                  <button type="button" onClick={(event) => openFeature(feature, event)} className="mt-auto inline-flex min-h-11 w-fit items-center gap-2 pt-4 text-xs font-semibold text-purple-100 transition hover:text-white focus:outline-hidden focus:ring-2 focus:ring-purple-300"><Search size={15} aria-hidden="true" />Ver más</button>
                </article>
              })}
            </div>
          </div>
        </div>
      </div>
      {activeFeature && <ServiceModal feature={activeFeature} onClose={closeFeature} returnFocusRef={triggerRef} />}
    </section>
  )
}
