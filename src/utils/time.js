export function parseTimeValue(value) {
  if (!/^\d{2}:\d{2}$/.test(value)) return undefined

  const [hour24, minute] = value.split(':').map(Number)
  if (hour24 > 23 || minute > 59) return undefined

  return {
    hour: hour24 % 12 || 12,
    minute,
    period: hour24 < 12 ? 'AM' : 'PM',
  }
}

export function to24HourTime(hour, minute, period) {
  const hourNumber = Number(hour)
  const minuteNumber = Number(minute)
  if (hourNumber < 1 || hourNumber > 12 || minuteNumber < 0 || minuteNumber > 59 || !['AM', 'PM'].includes(period)) return ''

  const hour24 = period === 'AM'
    ? (hourNumber === 12 ? 0 : hourNumber)
    : (hourNumber === 12 ? 12 : hourNumber + 12)

  return `${String(hour24).padStart(2, '0')}:${String(minuteNumber).padStart(2, '0')}`
}

export function formatTimeField(value) {
  const time = parseTimeValue(value)
  if (!time) return ''
  const period = time.period === 'AM' ? 'a. m.' : 'p. m.'
  return `${String(time.hour).padStart(2, '0')}:${String(time.minute).padStart(2, '0')} ${period}`
}
