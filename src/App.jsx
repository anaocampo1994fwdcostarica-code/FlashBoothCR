import { useEffect, useState } from 'react'
import Home from './pages/Home'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const finishLoading = () => window.setTimeout(() => setLoading(false), 450)
    if (document.readyState === 'complete') finishLoading()
    else window.addEventListener('load', finishLoading, { once: true })
    return () => window.removeEventListener('load', finishLoading)
  }, [])

  if (loading) {
    return <div className="flashbooth-loading" role="status" aria-live="polite" aria-label="Cargando FlashBooth"><div className="loader" aria-hidden="true" /><span>Cargando experiencia FlashBooth…</span></div>
  }

  return <Home />
}
