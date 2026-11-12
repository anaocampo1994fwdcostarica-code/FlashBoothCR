import { useEffect, useRef } from 'react'

const canAnimate = () => typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useScrollReveal() {
  useEffect(() => {
    if (!canAnimate() || !('IntersectionObserver' in window)) return undefined
    const elements = [...document.querySelectorAll('[data-reveal]')]
    if (!elements.length) return undefined
    document.documentElement.classList.add('motion-ready')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-revealed')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])
}

export function useViewportFloat() {
  const ref = useRef(null)
  useEffect(() => {
    const element = ref.current
    if (!element || !canAnimate() || !('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver(([entry]) => element.classList.toggle('is-in-view', entry.isIntersecting), { threshold: 0.1 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  return ref
}

export function useParallax(maxOffset = 5) {
  const ref = useRef(null)
  useEffect(() => {
    const element = ref.current
    if (!element || !canAnimate() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined
    let frame = 0
    let targetX = 0; let targetY = 0; let currentX = 0; let currentY = 0
    const render = () => {
      currentX += (targetX - currentX) * 0.16; currentY += (targetY - currentY) * 0.16
      element.style.setProperty('--parallax-x', `${currentX.toFixed(2)}px`)
      element.style.setProperty('--parallax-y', `${currentY.toFixed(2)}px`)
      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) frame = requestAnimationFrame(render)
      else frame = 0
    }
    const update = (event) => { const box = element.parentElement?.getBoundingClientRect(); if (!box) return; targetX = ((event.clientX - box.left) / box.width - .5) * maxOffset * 2; targetY = ((event.clientY - box.top) / box.height - .5) * maxOffset * 2; if (!frame) frame = requestAnimationFrame(render) }
    const reset = () => { targetX = 0; targetY = 0; if (!frame) frame = requestAnimationFrame(render) }
    const parent = element.parentElement
    parent?.addEventListener('pointermove', update); parent?.addEventListener('pointerleave', reset)
    return () => { parent?.removeEventListener('pointermove', update); parent?.removeEventListener('pointerleave', reset); cancelAnimationFrame(frame) }
  }, [maxOffset])
  return ref
}
