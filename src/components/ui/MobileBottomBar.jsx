import { useEffect, useState } from 'react'
import { Layers3, MessageCircle } from 'lucide-react'

// Barra fija solo en celular (ver .mobile-bottom-bar en index.css). Mientras está visible,
// el botón flotante de WhatsApp se oculta para no encimarse.
export default function MobileBottomBar() {
  const [heroActionsVisible, setHeroActionsVisible] = useState(true)

  useEffect(() => {
    const heroActions = document.getElementById('hero-actions')
    if (!heroActions || !('IntersectionObserver' in window)) {
      const frame = requestAnimationFrame(() => setHeroActionsVisible(false))
      return () => cancelAnimationFrame(frame)
    }
    const observer = new IntersectionObserver(([entry]) => setHeroActionsVisible(entry.isIntersecting), { threshold: 0.12 })
    observer.observe(heroActions)
    return () => observer.disconnect()
  }, [])

  return <nav className={`mobile-bottom-bar ${heroActionsVisible ? 'is-hero-actions-visible' : ''}`} aria-label="Acciones rápidas">
    <a href="#paquetes"><Layers3 size={17} aria-hidden="true" />Ver paquetes</a>
    <a href="#cotizador" className="is-primary"><MessageCircle size={17} aria-hidden="true" />Cotizar por WhatsApp</a>
  </nav>
}
