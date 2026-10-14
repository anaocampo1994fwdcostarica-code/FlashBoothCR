import { MessageCircle, Package } from 'lucide-react'
import heroPhoto from '../../assets/hero.jpg'

export default function Hero() {
  return (
    <section id="inicio" className="hero-shell relative isolate flex bg-base" style={{ '--hero-desktop': `url(${heroPhoto})`, '--hero-mobile': `url(${heroPhoto})` }}>
      <div className="hero-media absolute inset-0 -z-20" aria-hidden="true" />
      <div className="hero-overlay absolute inset-0 -z-10" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-[#07060c]/65 to-transparent" />
      <div className="hero-content-wrap site-container relative z-10 flex items-center">
        <div className="hero-copy flex w-full max-w-[42rem] flex-col items-start">
          <div className="hero-label-content">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-3"><span className="block w-10 shrink-0 bg-purple-400 h-[1.5px]" /><span className="text-[10px] font-bold tracking-[0.22em] text-white uppercase sm:text-[11px]">FLASHBOOTH</span><span className="text-[10px] font-medium tracking-[0.16em] text-gray-300 uppercase sm:text-[11px]">FOTOGRAFÍA · CONTENIDO · EXPERIENCIAS</span></div>
          </div>
          <div className="hero-title-content">
            <h1 className="mb-5 max-w-[10ch] text-left font-serif text-[clamp(2.7rem,6vw,5.7rem)] font-bold leading-[0.98] tracking-tight text-white sm:mb-6 sm:max-w-[11ch]">Convierte tu evento en contenido que todos quieran <span className="italic font-normal text-purple-200">compartir.</span></h1>
            <p className="hero-description w-full max-w-xl text-base leading-relaxed text-white sm:text-lg">Fotografías profesionales, impresiones instantáneas y experiencias digitales personalizadas para que tus invitados puedan compartir, guardar y recordar cada momento.</p>
          </div>
          <div className="hero-bottom-content">
            <div id="hero-actions" className="flex w-full flex-col items-stretch gap-3 lg:w-auto lg:flex-row lg:items-center lg:gap-4">
              <a href="https://wa.me/50687812800?text=Hola,%20quisiera%20cotizar%20un%20FlashBooth%20para%20mi%20evento" target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-7 py-3.5 text-xs font-semibold text-white shadow-xl shadow-purple-600/40 transition-all hover:scale-105 hover:from-purple-500 hover:to-indigo-500 sm:text-sm"><MessageCircle size={16} /><span>Cotizar por WhatsApp →</span></a>
              <a href="#paquetes" className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-xs font-medium text-gray-200 transition hover:bg-white/10 hover:text-white sm:text-sm"><Package size={16} /><span>Ver paquetes</span></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
