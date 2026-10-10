import { useEffect } from 'react'
import { X, Check } from 'lucide-react'

export default function ServiceModal({ service, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!service) return null

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-panel border border-line shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {service.image && (
          <div className="h-56 sm:h-64 w-full overflow-hidden rounded-t-3xl">
            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          </div>
        )}

        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 flex items-center justify-center text-white transition"
        >
          <X size={18} />
        </button>

        <div className="p-6 sm:p-8">
          <h3 className="text-2xl sm:text-3xl font-serif text-white mb-3">{service.title}</h3>
          {service.description && (
            <p className="text-sm text-gray-400 leading-relaxed mb-6">{service.description}</p>
          )}

          {service.features?.length > 0 && (
            <ul className="space-y-2.5">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                  <Check size={16} className="text-purple-400 mt-0.5 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}

          <a
            href="https://wa.me/50687812800"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/40 transition-all hover:scale-[1.02]"
          >
            Cotizar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}