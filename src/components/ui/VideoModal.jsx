import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export default function VideoModal({ src, poster, onClose, returnFocusRef }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const restoreFrameRef = useRef(0)

  useEffect(() => {
    cancelAnimationFrame(restoreFrameRef.current)
    const previousFocus = returnFocusRef?.current || document.activeElement
    const previousOverflow = document.body.style.overflow
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return }
      if (e.key !== 'Tab') return
      const focusable = dialogRef.current?.querySelectorAll('button:not([disabled]), [href], video[controls], [tabindex]:not([tabindex="-1"])')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
      restoreFrameRef.current = requestAnimationFrame(() => previousFocus?.focus())
    }
  }, [onClose, returnFocusRef])

  if (!src) return null

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xs flex items-center justify-center p-4 sm:p-10"
      onClick={onClose}
      role="presentation"
    >
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Reproductor de video" className="relative flex h-full w-full items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <button
          ref={closeRef}
          autoFocus
          type="button"
          onClick={onClose}
          aria-label="Cerrar video"
          className="absolute right-0 top-0 z-10 flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/70 bg-[#0b0912]/95 text-white shadow-lg shadow-black/70 transition hover:bg-purple-700 focus:outline-hidden focus:ring-4 focus:ring-purple-300/80"
        >
          <X size={22} aria-hidden="true" />
        </button>
        <video src={src} poster={poster} controls autoPlay playsInline preload="none" className="max-h-full max-w-full rounded-2xl bg-black object-contain shadow-2xl" />
      </div>
    </div>
  )
}
