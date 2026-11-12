import { MessageCircle, Package } from 'lucide-react'
import heroPhoto from '../../assets/hero-boda.jpg'
import heroPhotoWebp from '../../assets/hero-boda.webp'
import { waLink } from '../../config/site'
import { QUOTE_GREETING } from '../../utils/whatsapp'

const HERO_ALT = 'Photobooth FlashBooth en una boda: pantalla con tiras fotográficas personalizadas, cámara profesional e impresora'

// Celular: foto arriba (300 px) y texto debajo. Tablet/escritorio: texto a la izquierda sobre #07090D y foto a la derecha.
// La foto no se edita: solo se recorta con object-fit y se funde con un degradado en su borde izquierdo.
export default function Hero() {
  return (
    <section id="inicio" className="hero-split">
      <div className="hero-split-media">
        <picture>
          <source srcSet={heroPhotoWebp} type="image/webp" />
          <img src={heroPhoto} alt={HERO_ALT} width="1448" height="1086" fetchpriority="high" decoding="async" />
        </picture>
        <div className="hero-split-fade" aria-hidden="true" />
      </div>

      <div className="hero-split-copy">
        <div className="hero-label-content">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-3"><span className="block w-10 shrink-0 bg-purple-400 h-[1.5px]" /><span className="text-[10px] font-bold tracking-[0.22em] text-white uppercase sm:text-[11px]">FLASHBOOTH</span><span className="text-[10px] font-medium tracking-[0.16em] text-gray-300 uppercase sm:text-[11px]">FOTOGRAFÍA · CONTENIDO · EXPERIENCIAS</span></div>
        </div>
        <div className="hero-title-content">
          <h1 className="mb-5 max-w-[12ch] text-left font-serif font-bold leading-[1.02] tracking-tight text-white sm:mb-6">Convierte tu evento en contenido que todos quieran <span className="italic font-normal text-purple-200">compartir.</span></h1>
          <p className="hero-description w-full max-w-xl text-base leading-relaxed text-white sm:text-lg">Fotografías profesionales, impresiones instantáneas y experiencias digitales personalizadas para que tus invitados puedan compartir, guardar y recordar cada momento.</p>
        </div>
        <div className="hero-bottom-content">
          <div id="hero-actions" className="flex w-full flex-col items-stretch gap-3 xl:w-auto xl:flex-row xl:items-center xl:gap-4">
            <a href={waLink(QUOTE_GREETING)} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-7 py-3.5 text-xs font-semibold text-white shadow-xl shadow-purple-600/40 transition-all hover:scale-105 hover:from-purple-500 hover:to-indigo-500 sm:text-sm"><MessageCircle size={16} /><span>Cotizar por WhatsApp →</span></a>
            <a href="#paquetes" className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-xs font-medium text-gray-200 transition hover:bg-white/10 hover:text-white sm:text-sm"><Package size={16} /><span>Ver paquetes</span></a>
          </div>
        </div>
      </div>
    </section>
  )
}
