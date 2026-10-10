import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: '¿Cómo funciona el Photobooth con IA?',
    a: 'Nuestro sistema utiliza inteligencia artificial para generar fondos virtuales y transformaciones creativas en tiempo real. Tus invitados se paran frente a la cámara, eligen su fondo o estilo, y la IA hace la magia al instante.',
  },
  {
    q: '¿Cuánto espacio se necesita para el FlashBooth?',
    a: 'Recomendamos un espacio mínimo de 3x3 metros para la configuración estándar, incluyendo el área de props y la estación de impresión.',
  },
  {
    q: '¿Las fotos se pueden compartir al instante en redes sociales?',
    a: '¡Sí! Todas nuestras experiencias incluyen galería digital online accesible por QR. Los invitados pueden descargar sus fotos y videos directamente en sus teléfonos y compartirlos en Instagram, TikTok, etc., al momento.',
  },
  {
    q: '¿Qué incluye el diseño personalizado?',
    a: 'Incluye el diseño de la interfaz de la pantalla táctil, marcos para las fotos y tiras fotográficas, y la página de la galería online, todo adaptado a la identidad visual y temática de tu evento.',
  },
  {
    q: '¿Hay algún costo por envío o configuración?',
    a: 'Los precios mostrados ya incluyen la configuración y desmontaje del equipo dentro del Gran Área Metropolitana de Costa Rica. Para zonas fuera del GAM, aplica un cargo adicional de traslado que se cotiza aparte.',
  },
  {
    q: '¿Cómo puedo reservar?',
    a: 'Puedes reservar directamente a través de nuestro cotizador en la página o por WhatsApp. Te pedimos un abono del 50% para confirmar la fecha y el saldo se cancela el día del evento.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    const match = window.location.hash.match(/^#faq-(\d+)$/)
    if (match && FAQS[Number(match[1])]) {
      setOpenIndex(Number(match[1]))
      requestAnimationFrame(() => document.getElementById(`faq-${match[1]}`)?.scrollIntoView({ block: 'center' }))
    }
  }, [])

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section id="faq" className="py-16 sm:py-20 lg:py-24 relative border-t border-line/60 bg-base">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-purple-400 font-bold block mb-2">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white leading-tight">
            Preguntas <span className="italic font-normal text-purple-200">frecuentes.</span>
          </h2>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {FAQS.map(({ q, a }, i) => (
            <div id={i === 0 ? 'faq-0' : undefined} key={i} className="rounded-2xl bg-panel/80 border border-line overflow-hidden">
              <button
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-white/5 transition"
              >
                <span className="text-sm sm:text-base font-semibold !text-gray-100 pr-4">{q}</span>
                <ChevronDown
                  size={18}
                  className={`text-purple-400 shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <div className="px-5 pb-5 text-sm !text-gray-200 leading-relaxed border-t border-line/50 pt-4">
                  {a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
