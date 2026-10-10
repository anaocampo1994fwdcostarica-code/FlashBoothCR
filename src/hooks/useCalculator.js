import { useState, useMemo, useEffect } from 'react'
import { PACKAGES, formatCRC } from '../data/packages'

export const formatDuration = (h) => {
  const whole = Math.floor(h)
  const half = h % 1 !== 0
  const parts = []
  if (whole > 0) parts.push(`${whole} ${whole === 1 ? 'hora' : 'horas'}`)
  if (half) parts.push('30 min')
  return parts.join(' y ') || '0 min'
}

export const SERVICES = [
  {
    id: 'ia',
    name: 'Photobooth IA',
    subtitle: 'Fondos virtuales IA',
    levels: PACKAGES,
    defaultLevelId: 'experience',
  },
]

export const EXTRA_HOURS = [
  { id: 'base', hours: 0, label: 'Incluido', mult: 0 },
  { id: 'h1', hours: 1, label: '+1h', mult: 20000 },
  { id: 'h2', hours: 2, label: '+2h', mult: 35000 },
  { id: 'h3', hours: 3, label: '+3h', mult: 65000 },
  { id: 'h4', hours: 4, label: '+4h', mult: 95000 },
]

const WHATSAPP_NUMBER = '50687812800'

export function useCalculator(packageId) {
  const [selectedService, setSelectedService] = useState(SERVICES[0])
  const [selectedLevel, setSelectedLevel] = useState(
    PACKAGES.find((p) => p.id === SERVICES[0].defaultLevelId) || PACKAGES[0]
  )
  const [extraIndex, setExtraIndex] = useState(0)
  const extra = EXTRA_HOURS[extraIndex]

  useEffect(() => {
    const selected = PACKAGES.find((item) => item.id === packageId)
    if (selected) { setSelectedLevel(selected); setExtraIndex(0) }
  }, [packageId])

  const hasLevels = Boolean(selectedService.levels)
  const activeLevel = hasLevels ? selectedLevel : null

  const basePrice = hasLevels && activeLevel ? activeLevel.price : selectedService.basePrice
  const baseDurationHours = hasLevels && activeLevel ? activeLevel.durationHours : selectedService.baseDurationHours
  const baseDurationLabel = hasLevels && activeLevel ? activeLevel.durationLabel : selectedService.baseDurationLabel

  const total = basePrice + extra.mult
  const totalHours = baseDurationHours + extra.hours

  const selectService = (svc) => {
    setSelectedService(svc)
    if (svc.levels) {
      const def = svc.levels.find((p) => p.id === svc.defaultLevelId) || svc.levels[0]
      setSelectedLevel(def)
    }
    setExtraIndex(0)
  }

  const whatsappUrl = useMemo(() => {
    let msg = `Hola FlashBooth! 📸✨ Quiero cotizar y reservar la siguiente configuración:%0A%0A`
    msg += `• *Servicio:* ${selectedService.name}%0A`
    if (hasLevels && activeLevel) {
      msg += `• *Paquete:* ${activeLevel.name}${extra.hours > 0 ? ` + ${extra.hours}h adicionales` : ''}%0A`
    }
    msg += `• *Duración total:* ${formatDuration(totalHours)}%0A`
    msg += `• *Monto Estimado:* ${formatCRC(total)}%0A%0A`
    msg += `¿Tienen disponibilidad para mi fecha?`
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`
  }, [selectedService, activeLevel, extra, total, totalHours, hasLevels])

  return {
    services: SERVICES,
    extraHours: EXTRA_HOURS,
    selectedService,
    selectedLevel,
    setSelectedLevel,
    selectService,
    extraIndex,
    setExtraIndex,
    extra,
    hasLevels,
    activeLevel,
    basePrice,
    baseDurationLabel,
    total,
    totalHours,
    whatsappUrl,
  }
}
