import { useCallback, useRef, useState } from 'react'

export default function BeforeAfterSlider({ before, after, altBefore = 'Antes', altAfter = 'Después' }) {
  const containerRef = useRef(null)
  const [position, setPosition] = useState(50)
  const update = useCallback((x) => { const rect = containerRef.current?.getBoundingClientRect(); if (rect?.width) setPosition(Math.min(100, Math.max(0, ((x - rect.left) / rect.width) * 100))) }, [])
  const onKeyDown = (event) => { const step = event.shiftKey ? 10 : 2; if (event.key === 'ArrowLeft') { event.preventDefault(); setPosition((v) => Math.max(0, v - step)) }; if (event.key === 'ArrowRight') { event.preventDefault(); setPosition((v) => Math.min(100, v + step)) }; if (event.key === 'Home') { event.preventDefault(); setPosition(0) }; if (event.key === 'End') { event.preventDefault(); setPosition(100) } }
  return <div ref={containerRef} role="slider" tabIndex={0} aria-label={`Comparador ${altBefore} y ${altAfter}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(position)} onKeyDown={onKeyDown} onPointerDown={(e) => { e.currentTarget.setPointerCapture?.(e.pointerId); update(e.clientX) }} onPointerMove={(e) => e.buttons && update(e.clientX)} className="relative h-full w-full cursor-ew-resize select-none overflow-hidden rounded-xl bg-black touch-none">
    <img src={after} alt={altAfter} className="absolute inset-0 h-full w-full object-contain" draggable={false} />
    <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}><img src={before} alt={altBefore} className="absolute inset-0 h-full w-full object-contain" draggable={false} /></div>
    <span className="absolute left-3 top-3 z-10 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Antes</span><span className="absolute right-3 top-3 z-10 rounded-full bg-purple-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">Después</span>
    <div className="pointer-events-none absolute bottom-0 top-0 z-10 w-0.5 bg-white/90" style={{ left: `${position}%` }}><div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg"><svg className="h-4 w-4 text-purple-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7l-5 5 5 5M16 7l5 5-5 5" /></svg></div></div>
  </div>
}
