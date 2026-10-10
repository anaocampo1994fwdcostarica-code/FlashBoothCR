import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function VideoModal({ src, onClose }) {
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

  if (!src) return null

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Cerrar video"
        className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition"
      >
        <X size={22} />
      </button>

      <div className="flex h-full w-full items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <video src={src} controls autoPlay playsInline className="max-h-full max-w-full rounded-2xl bg-black object-contain shadow-2xl" />
      </div>
    </div>
  )
}
