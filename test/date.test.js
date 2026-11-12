import assert from 'node:assert/strict'
import test from 'node:test'
import { formatDateField, formatEventDate, parseLocalDate, toLocalDateValue } from '../src/utils/date.js'
import { createQuoteWhatsAppUrl } from '../src/utils/whatsapp.js'

test('convierte fechas del cotizador sin pasar por UTC', () => {
  const date = parseLocalDate('2026-10-15')
  assert.equal(date.getFullYear(), 2026)
  assert.equal(date.getMonth(), 9)
  assert.equal(date.getDate(), 15)
  assert.equal(toLocalDateValue(date), '2026-10-15')
  assert.equal(formatDateField('2026-10-15'), '15/10/2026')
  assert.equal(formatEventDate('2026-10-15'), '15 de octubre de 2026')
})

test('rechaza fechas inexistentes', () => {
  assert.equal(parseLocalDate('2026-02-30'), undefined)
  assert.equal(parseLocalDate('15/10/2026'), undefined)
})

test('incluye la fecha y la hora elegidas en la consulta sin enviarla', () => {
  const url = createQuoteWhatsAppUrl([
    `Fecha del evento: ${formatEventDate('2026-12-24')}`,
    'Hora de inicio: 18:30',
  ])
  const text = new URL(url).searchParams.get('text')
  assert.match(text, /Fecha del evento: 24 de diciembre de 2026/)
  assert.match(text, /Hora de inicio: 18:30/)
})
