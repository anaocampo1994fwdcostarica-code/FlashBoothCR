import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react'

const GALLERY_IMAGES = [
  { image: '/images/gallery/galeria-6.jpg', title: 'Experiencia western' }, { image: '/images/gallery/galeria-6-western.jpg', title: 'Experiencia western' },
  { image: '/images/gallery/galeria-5.jpg', title: 'Momento FlashBooth' }, { image: '/images/gallery/galeria-7.jpg', title: 'Fondo virtual de fantasía' },
  { image: '/images/gallery/galeria-9.jpg', title: 'Fondo virtual neón' }, { image: '/images/gallery/galeria-2.jpg', title: 'Celebración de quince años' },
  { image: '/images/gallery/galeria-priscilla.jpg', title: 'Celebración Priscilla' }, { image: '/images/gallery/galeria-4.jpg', title: 'Recuerdo FlashBooth' },
  { image: '/images/gallery/galeria-3.jpg', title: 'Recuerdo FlashBooth' }, { image: '/images/gallery/foto-grupal.jpg', title: 'Foto grupal FlashBooth' },
]

const PRINT_DESIGNS = [
  { image: '/photo-strips/trimmed/1.png', title: 'Tira de quince años' }, { image: '/photo-strips/trimmed/2.png', title: 'Tira de boda' },
  { image: '/photo-strips/trimmed/3.png', title: 'Tira familiar' }, { image: '/photo-strips/trimmed/4.png', title: 'Tira de quince años' },
  { image: '/photo-strips/trimmed/5.png', title: 'Tira de marca' }, { image: '/photo-strips/trimmed/6.png', title: 'Tira de marca' },
]

const wrap = (index, length) => (index + length) % length

function StripCarousel({ onOpen }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState('next')
  const startX = useRef(null)
  const goTo = (index) => { setDirection(index === wrap(activeIndex - 1, PRINT_DESIGNS.length) ? 'previous' : 'next'); setActiveIndex(wrap(index, PRINT_DESIGNS.length)) }
  const previous = () => goTo(activeIndex - 1)
  const next = () => goTo(activeIndex + 1)
  const slots = [wrap(activeIndex - 1, PRINT_DESIGNS.length), activeIndex, wrap(activeIndex + 1, PRINT_DESIGNS.length)]

  return <div className="strip-carousel" onKeyDown={(event) => { if (event.key === 'ArrowLeft') { event.preventDefault(); previous() }; if (event.key === 'ArrowRight') { event.preventDefault(); next() } }}>
    <div className="strip-carousel-stage" onPointerDown={(event) => { startX.current = event.clientX }} onPointerUp={(event) => { if (startX.current === null) return; const distance = event.clientX - startX.current; if (Math.abs(distance) > 40) distance > 0 ? previous() : next(); startX.current = null }} onPointerCancel={() => { startX.current = null }}>
      {slots.map((index, slot) => {
        const design = PRINT_DESIGNS[index]
        const position = slot === 0 ? 'left' : slot === 1 ? 'center' : 'right'
        return <button key={`${position}-${design.image}-${activeIndex}`} type="button" onClick={(event) => onOpen(design, event)} className={`strip-carousel-card strip-carousel-${position} strip-carousel-${direction}`} aria-label={`Ver en grande: ${design.title}`}>
          <img src={design.image} alt={`Tira fotográfica completa: ${design.title}`} />
          <span className="strip-zoom-label"><Search size={14} aria-hidden="true" />Ver en grande</span>
        </button>
      })}
    </div>
    <div className="strip-carousel-controls">
      <button type="button" onClick={previous} className="strip-carousel-arrow" aria-label="Ver tira anterior"><ChevronLeft aria-hidden="true" /></button>
      <div className="strip-carousel-indicators" aria-label="Seleccionar tira">
        {PRINT_DESIGNS.map((design, index) => <button key={design.image} type="button" onClick={() => goTo(index)} aria-label={`Mostrar ${design.title} ${index + 1}`} aria-current={index === activeIndex ? 'true' : undefined} className={index === activeIndex ? 'is-active' : ''} />)}
      </div>
      <button type="button" onClick={next} className="strip-carousel-arrow" aria-label="Ver tira siguiente"><ChevronRight aria-hidden="true" /></button>
    </div>
  </div>
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null)
  const triggerRef = useRef(null)
  const dialogRef = useRef(null)
  const closeLightbox = useCallback(() => setLightbox(null), [])
  const openLightbox = (item, event) => { triggerRef.current = event?.currentTarget || document.activeElement; setLightbox(item) }

  useEffect(() => {
    if (!lightbox) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeButton = dialogRef.current?.querySelector('button')
    closeButton?.focus()
    const onKey = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); closeLightbox(); return }
      if (event.key !== 'Tab') return
      const focusable = dialogRef.current?.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')
      if (!focusable?.length) return
      const first = focusable[0]; const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKey); requestAnimationFrame(() => triggerRef.current?.focus()) }
  }, [lightbox, closeLightbox])

  return <section id="galeria" className="relative border-t border-line/60 bg-base py-16 sm:py-20 lg:py-24"><div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12"><span className="mb-2 block text-xs font-bold uppercase tracking-widest text-purple-400 sm:text-sm">GALERÍA</span><h2 className="font-serif text-3xl leading-tight text-white sm:text-5xl lg:text-6xl">Momentos que merecen ser <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text font-normal italic text-transparent">compartidos.</span></h2><p className="mx-auto mt-4 max-w-xl text-sm text-gray-400 sm:text-base">Una muestra de las tiras fotográficas y recuerdos creados con FlashBooth.</p></div>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">{GALLERY_IMAGES.map(({ image, title }) => <button key={image} onClick={(event) => openLightbox({ image, title }, event)} className="group rounded-xl border border-line-soft bg-card-alt p-2 transition hover:border-purple-500/50"><img src={image} alt={title} className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]" /></button>)}</div>
    <div className="mt-10 rounded-2xl border border-line bg-panel/70 p-4 sm:mt-12 sm:p-7"><div className="mx-auto mb-4 max-w-xl text-center sm:mb-5"><span className="mb-2 block text-[10px] font-bold uppercase tracking-[.2em] text-purple-400 sm:text-xs">TIRAS PERSONALIZADAS</span><h3 className="font-serif text-3xl text-white sm:text-4xl">Recuerdos que te llevas</h3><p className="mt-2 text-sm leading-relaxed text-gray-300 sm:text-base">Tiras fotográficas personalizadas para guardar lo mejor de tu evento.</p></div><StripCarousel onOpen={openLightbox} /></div>
    <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-line bg-panel/80 p-6 sm:flex-row sm:p-8"><p className="font-serif text-lg italic text-white sm:text-xl">Tu evento también puede lucir así.</p><a href="https://wa.me/50687812800" target="_blank" rel="noopener noreferrer" className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-600/40 transition-all hover:scale-105">Cotizar por WhatsApp</a></div>
  </div>{lightbox && <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-10" onMouseDown={closeLightbox} role="presentation"><div ref={dialogRef} role="dialog" aria-modal="true" aria-label={lightbox.title} className="relative flex max-h-full max-w-full items-center justify-center" onMouseDown={(event) => event.stopPropagation()}><button onClick={closeLightbox} aria-label="Cerrar imagen" className="absolute right-2 top-2 z-20 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/70 bg-[#0b0912]/95 text-white shadow-lg shadow-black/70 transition hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300/80 sm:right-4 sm:top-4"><X size={24} strokeWidth={2.5} /></button><img src={lightbox.image} alt={lightbox.title} className="max-h-[calc(100vh-2rem)] max-w-full rounded-2xl object-contain shadow-2xl" /></div></div>}</section>
}
