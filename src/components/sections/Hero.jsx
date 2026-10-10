import { MessageCircle, Package } from 'lucide-react'
import heroImage from '../../assets/hero.jpg'

export default function Hero() {
  return (
    <section id="inicio" className="hero-shell relative isolate flex min-h-[720px] overflow-hidden bg-base bg-cover bg-no-repeat pt-20 sm:min-h-[760px] sm:pt-24 lg:min-h-[820px] lg:pt-20" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#07060c]/95 via-[#07060c]/78 via-45% to-[#07060c]/10" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-[#07060c]/65 to-transparent" />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="flex w-full max-w-[42rem] flex-col items-start">
          <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 sm:mb-5 sm:gap-x-3"><span className="block w-10 shrink-0 bg-purple-400 h-[1.5px]" /><span className="text-[10px] font-bold tracking-[0.22em] text-white uppercase sm:text-[11px]">FLASHBOOTH</span><span className="text-[10px] font-medium tracking-[0.16em] text-gray-300 uppercase sm:text-[11px]">FOTOGRAFÍA · CONTENIDO · EXPERIENCIAS</span></div>
          <h1 className="mb-5 max-w-[10ch] text-left font-serif text-[clamp(2.7rem,6vw,5.7rem)] font-bold leading-[0.98] tracking-tight text-white sm:mb-6 sm:max-w-[11ch]">Convierte tu evento en contenido que todos quieran <span className="italic font-normal text-purple-200">compartir.</span></h1>
          <p className="mb-7 w-full max-w-xl text-base leading-relaxed text-white sm:mb-8 sm:text-lg">Fotografías profesionales, impresiones instantáneas y experiencias digitales personalizadas para que tus invitados puedan compartir, guardar y recordar cada momento.</p>
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
            <a href="https://wa.me/50687812800?text=Hola,%20quisiera%20cotizar%20un%20FlashBooth%20para%20mi%20evento" target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-7 py-3.5 text-xs font-semibold text-white shadow-xl shadow-purple-600/40 transition-all hover:scale-105 hover:from-purple-500 hover:to-indigo-500 sm:text-sm"><MessageCircle size={16} /><span>Cotizar por WhatsApp →</span></a>
            <a href="#paquetes" className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-xs font-medium text-gray-200 transition hover:bg-white/10 hover:text-white sm:text-sm"><Package size={16} /><span>Ver paquetes</span></a>
          </div>
        </div>
      </div>
    </section>
  )
}
