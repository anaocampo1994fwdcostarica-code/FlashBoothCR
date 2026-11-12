import { Camera, Check, Images, PartyPopper, Send, Smartphone } from 'lucide-react'
import { INCLUDED_IN_ALL, PACKAGES, formatCRC } from '../../data/packages'
import { waLink } from '../../config/site'

// Íconos para los beneficios incluidos en todos los paquetes (mismo orden que INCLUDED_IN_ALL).
const INCLUDED_ICONS = [Camera, Images, Send, Smartphone, PartyPopper]

function PackageCard({ pkg, index, onCustomize }) {
  return <article data-reveal style={{ '--reveal-delay': `${index * 70}ms` }} className={`relative flex flex-col rounded-[1.25rem] border p-5 sm:p-6 ${pkg.popular ? 'border-purple-400/90 bg-gradient-to-b from-purple-950/40 to-panel shadow-[0_16px_38px_rgba(109,40,217,.25)]' : 'border-white/10 bg-panel/90 shadow-[0_14px_32px_rgba(0,0,0,.28)]'}`}>
    <div className="flex min-h-7 items-start justify-between gap-2">
      <h3 className="text-2xl font-bold tracking-wide text-white">{pkg.name}</h3>
      {pkg.popular && <span className="rounded-full border border-purple-300/60 bg-purple-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-100">Recomendado</span>}
    </div>
    <p className="mt-2 text-sm leading-relaxed text-gray-300">{pkg.desc}</p>
    <ul className="mt-5 space-y-2 text-sm leading-snug text-gray-100" aria-label={`Qué incluye ${pkg.name}`}>
      {pkg.features.map((feature) => <li key={feature} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-purple-300" aria-hidden="true" />{feature}</li>)}
    </ul>
    {/* mt-auto: tabla y botón quedan al fondo, alineados entre tarjetas del mismo alto. */}
    <div className="mt-auto pt-6">
    <table className="w-full text-sm">
      <caption className="sr-only">Precios de {pkg.name} según la duración</caption>
      <thead><tr className="text-left text-xs uppercase tracking-wider text-gray-400"><th scope="col" className="pb-2 font-semibold">Duración</th><th scope="col" className="pb-2 text-right font-semibold">Precio</th></tr></thead>
      <tbody>
        {pkg.prices.map((option) => <tr key={option.hours} className="border-t border-white/10"><th scope="row" className="py-2.5 text-left font-medium text-gray-200">{option.label}</th><td className="py-2.5 text-right text-base font-bold text-white">{formatCRC(option.price)}</td></tr>)}
      </tbody>
    </table>
    <button type="button" onClick={() => onCustomize(pkg.id)} className={`${pkg.popular ? 'package-flip-primary-btn' : 'package-flip-outline-btn'} mt-5`}>Elegir {pkg.name}</button>
    </div>
  </article>
}

export default function Pricing({ onCustomize }) {
  return <section id="paquetes" className="border-t border-line/60 bg-base py-16 sm:py-20 lg:py-24"><div className="site-container">
    <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10"><span className="mb-2 block text-xs font-bold uppercase tracking-widest text-purple-400 sm:text-sm">NUESTROS PAQUETES</span><h2 className="font-serif text-3xl leading-tight text-white sm:text-5xl">Elige cómo quieres recordar tu evento</h2><p className="mt-4 text-sm text-gray-300 sm:text-base">Compara nuestros paquetes y personaliza tu experiencia.</p></div>

    <div className="mb-8 rounded-2xl border border-line bg-panel/70 p-4 sm:p-5" data-reveal>
      <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-gray-300">Incluido en todos los paquetes</p>
      <ul className="grid grid-cols-1 gap-3 text-sm text-gray-200 sm:grid-cols-2 lg:grid-cols-5">
        {INCLUDED_IN_ALL.map((benefit, index) => {
          const Icon = INCLUDED_ICONS[index] || Check
          return <li key={benefit} className="flex items-center gap-2.5 lg:flex-col lg:text-center"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/15 text-purple-200"><Icon size={18} aria-hidden="true" /></span>{benefit}</li>
        })}
      </ul>
    </div>

    {/* Una columna en celular y tablet; tres en escritorio. La grilla estira las tarjetas al mismo alto. */}
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">{PACKAGES.map((pkg, index) => <PackageCard key={pkg.id} pkg={pkg} index={index} onCustomize={onCustomize} />)}</div>

    <div className="mt-6 space-y-1.5 text-center text-xs leading-relaxed text-gray-400 sm:text-sm">
      <p>¿Tu evento dura más de 2 horas? <a href={waLink('Hola, quisiera cotizar un FlashBooth para un evento de más de 2 horas')} target="_blank" rel="noopener noreferrer" className="font-semibold text-purple-300 underline-offset-2 hover:text-purple-200 hover:underline">Cotiza por WhatsApp</a></p>
    </div>
  </div></section>
}
