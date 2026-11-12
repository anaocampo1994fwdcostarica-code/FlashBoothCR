import { useEffect, useState } from 'react'
import { calculateQuote, DEFAULT_PACKAGE_ID, PACKAGES } from '../data/packages'

const findPackage = (id) => PACKAGES.find((item) => item.id === id)

// Paquete + duración (1 h, 1,5 h o 2 h). El total es el precio exacto de esa combinación.
export function useCalculator(packageId) {
  const [selectedLevel, setSelectedLevel] = useState(findPackage(packageId) || findPackage(DEFAULT_PACKAGE_ID) || PACKAGES[0])
  const [hours, setHours] = useState(selectedLevel.prices[0].hours)

  // Cuando se elige un paquete desde la sección de precios, el cotizador lo selecciona.
  useEffect(() => {
    const selected = findPackage(packageId)
    if (!selected) return undefined
    const frame = requestAnimationFrame(() => setSelectedLevel(selected))
    return () => cancelAnimationFrame(frame)
  }, [packageId])

  // Si el paquete no ofrece la duración elegida, vuelve a la primera disponible.
  const validHours = selectedLevel.prices.some((item) => item.hours === hours) ? hours : selectedLevel.prices[0].hours
  const quote = calculateQuote(selectedLevel.id, validHours)

  return {
    activeLevel: quote.package,
    setSelectedLevel,
    durationOptions: quote.package.prices,
    hours: validHours,
    setHours,
    durationLabel: quote.option.label,
    total: quote.total,
  }
}
