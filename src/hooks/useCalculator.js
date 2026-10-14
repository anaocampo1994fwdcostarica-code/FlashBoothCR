import { useEffect, useState } from 'react'
import { calculateQuote, EXTRA_HOURS, PACKAGES } from '../data/packages'

export function useCalculator(packageId) {
  const [selectedLevel, setSelectedLevel] = useState(
    PACKAGES.find((item) => item.id === packageId) || PACKAGES.find((item) => item.id === 'experience') || PACKAGES[0]
  )
  const [extraIndex, setExtraIndex] = useState(0)
  const extra = EXTRA_HOURS[extraIndex]

  useEffect(() => {
    const selected = PACKAGES.find((item) => item.id === packageId)
    if (!selected) return undefined
    const frame = requestAnimationFrame(() => { setSelectedLevel(selected); setExtraIndex(0) })
    return () => cancelAnimationFrame(frame)
  }, [packageId])

  const quote = calculateQuote(selectedLevel.id, extra.id)

  return {
    extraHours: EXTRA_HOURS,
    selectedLevel,
    setSelectedLevel,
    extraIndex,
    setExtraIndex,
    extra: quote.extra,
    activeLevel: quote.package,
    basePrice: quote.package.price,
    baseDurationLabel: quote.package.durationLabel,
    total: quote.total,
    totalHours: quote.totalHours,
  }
}
