import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { PACKAGES, formatCRC } from '../../data/packages'

const allBenefits = [...new Set(PACKAGES.flatMap((pkg) => pkg.features.map((feature) => feature.text.replace(/^\d+ horas? ilimitadas de fotos$/, 'Fotos ilimitadas'))))]

function PackageFlipCard({ pkg, index, onCustomize }) {
  const [flipped, setFlipped] = useState(false)
  return <article className={`package-flip-shell ${pkg.popular ? 'package-flip-recommended' : ''}`} style={{ transitionDelay: `${index * 70}ms` }}>
    <div className={`package-flip-card ${flipped ? 'is-flipped' : ''}`}>
      <div className="package-flip-face package-flip-front" aria-hidden={flipped}>
        <div className="flex min-h-7 items-start justify-between gap-2">{pkg.popular ? <span className="rounded-full border border-purple-300/60 bg-purple-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-purple-100">Recomendado</span> : <span /> }<span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-purple-100">{pkg.durationLabel}</span></div>
        <div className="my-auto"><h3 className="text-2xl font-bold tracking-wide text-white">{pkg.name}</h3><p className="mt-2 text-sm font-medium text-purple-200">{pkg.id === 'snapshot' ? 'Contenido listo para compartir' : pkg.desc.split('.')[0]}</p><div className="mt-5 text-4xl font-extrabold text-white">{formatCRC(pkg.price)}</div><span className="text-sm text-gray-400">/ evento</span><p className="mt-5 text-sm leading-relaxed text-gray-200">{pkg.desc}</p></div>
        <button type="button" tabIndex={flipped ? -1 : 0} onClick={() => setFlipped(true)} className="package-flip-outline-btn">Ver detalles</button>
      </div>
      <div className="package-flip-face package-flip-back" aria-hidden={!flipped}>
        <div><h3 className="text-xl font-bold text-white">¿Qué incluye {pkg.name}?</h3><ul className="mt-4 space-y-2 text-sm leading-snug text-gray-100">{pkg.features.map((feature) => <li key={feature.text} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-purple-300" aria-hidden="true" />{feature.text}</li>)}</ul></div>
        <div className="mt-auto"><p className="mb-3 rounded-xl border border-purple-400/30 bg-purple-500/10 px-3 py-2 text-xs text-purple-100"><strong>Concepto:</strong> {pkg.concept || pkg.desc}</p><button type="button" tabIndex={flipped ? 0 : -1} onClick={() => onCustomize(pkg.id)} className="package-flip-primary-btn">Personalizar paquete</button><button type="button" tabIndex={flipped ? 0 : -1} onClick={() => setFlipped(false)} className="package-flip-outline-btn mt-2">Volver</button></div>
      </div>
    </div>
  </article>
}

export default function Pricing({ onCustomize }) {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [comparisonOpen, setComparisonOpen] = useState(false)
  useEffect(() => { const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } }, { threshold: 0.12 }); if (sectionRef.current) observer.observe(sectionRef.current); return () => observer.disconnect() }, [])

  return <section id="paquetes" ref={sectionRef} className="border-t border-line/60 bg-base py-16 sm:py-20 lg:py-24"><div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8">
    <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10"><span className="mb-2 block text-xs font-bold uppercase tracking-widest text-purple-400 sm:text-sm">NUESTROS PAQUETES</span><h2 className="font-serif text-3xl leading-tight text-white sm:text-5xl">Elige cómo quieres recordar tu evento</h2><p className="mt-4 text-sm text-gray-300 sm:text-base">Compara nuestros paquetes y personaliza tu experiencia.</p></div>
    <div className={`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 ${visible ? 'packages-revealed' : 'packages-pending'}`}>{PACKAGES.map((pkg, index) => <PackageFlipCard key={pkg.id} pkg={pkg} index={index} onCustomize={onCustomize} />)}</div>
    <div className="mt-7 text-center"><button type="button" onClick={() => setComparisonOpen((value) => !value)} className="inline-flex items-center gap-2 rounded-full border border-purple-400/40 bg-purple-500/10 px-5 py-3 text-sm font-semibold text-purple-100 transition hover:bg-purple-500/20" aria-expanded={comparisonOpen}><ChevronDown size={17} className={comparisonOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />{comparisonOpen ? 'Ocultar comparación' : 'Comparar paquetes'}</button></div>
    {comparisonOpen && <div className="package-comparison mt-6 overflow-x-auto rounded-2xl border border-line"><table className="min-w-[760px] w-full text-left text-sm"><thead className="bg-white/5 text-white"><tr><th>Característica</th>{PACKAGES.map((pkg) => <th key={pkg.id}>{pkg.name}</th>)}</tr></thead><tbody><tr><th>Precio</th>{PACKAGES.map((pkg) => <td key={pkg.id}>{formatCRC(pkg.price)}</td>)}</tr><tr><th>Duración</th>{PACKAGES.map((pkg) => <td key={pkg.id}>{pkg.durationLabel}</td>)}</tr>{allBenefits.map((benefit) => <tr key={benefit}><th>{benefit}</th>{PACKAGES.map((pkg) => <td key={pkg.id}>{pkg.features.some((feature) => feature.text.replace(/^\d+ horas? ilimitadas de fotos$/, 'Fotos ilimitadas') === benefit) ? <span className="text-purple-200">Incluido</span> : <span className="text-gray-500">No incluido</span>}</td>)}</tr>)}</tbody></table></div>}
  </div></section>
}
