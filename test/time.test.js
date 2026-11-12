import assert from 'node:assert/strict'
import test from 'node:test'
import { formatTimeField, parseTimeValue, to24HourTime } from '../src/utils/time.js'
import { createQuoteWhatsAppUrl } from '../src/utils/whatsapp.js'

test('convierte correctamente medianoche y mediodía al formato de 24 horas', () => {
  assert.equal(to24HourTime(12, 0, 'AM'), '00:00')
  assert.equal(to24HourTime(12, 0, 'PM'), '12:00')
  assert.equal(to24HourTime(6, 30, 'PM'), '18:30')
})

test('convierte el valor interno al formato legible del campo', () => {
  assert.deepEqual(parseTimeValue('00:00'), { hour: 12, minute: 0, period: 'AM' })
  assert.deepEqual(parseTimeValue('12:00'), { hour: 12, minute: 0, period: 'PM' })
  assert.equal(formatTimeField('18:30'), '06:30 p. m.')
  assert.equal(formatTimeField('00:05'), '12:05 a. m.')
})

test('rechaza horas internas inválidas', () => {
  assert.equal(parseTimeValue('24:00'), undefined)
  assert.equal(parseTimeValue('10:60'), undefined)
  assert.equal(to24HourTime(0, 30, 'AM'), '')
})

test('incluye la hora confirmada en WhatsApp sin enviar la consulta', () => {
  const confirmedTime = to24HourTime(6, 30, 'PM')
  const url = createQuoteWhatsAppUrl([`Hora de inicio: ${confirmedTime}`])
  assert.equal(new URL(url).searchParams.get('text'), 'Hora de inicio: 18:30')
})
