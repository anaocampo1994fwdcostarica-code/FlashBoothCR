import { useParallax, useViewportFloat } from '../../hooks/useMotion'

export function FloatingIcon({ children, delay = '0s', className = '' }) {
  const ref = useViewportFloat()
  return <span ref={ref} style={{ '--float-delay': delay }} className={`motion-float ${className}`}>{children}</span>
}

export function ParallaxOrb({ className = '' }) {
  const ref = useParallax()
  return <span ref={ref} aria-hidden="true" className={`motion-parallax-orb ${className}`} />
}
