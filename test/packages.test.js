import assert from 'node:assert/strict'
import test from 'node:test'
import { calculateQuote, EXTRA_HOURS, formatCRC, formatDuration, PACKAGES } from '../src/data/packages.js'

const expectedTotals = {
  snapshot: [95000, 115000, 130000, 160000, 190000],
  experience: [165000, 185000, 200000, 230000, 260000],
  premium: [195000, 215000, 230000, 260000, 290000],
  platinum: [245000, 265000, 280000, 310000, 340000],
}

test('calcula las tarifas no uniformes para todos los paquetes y horas extra', () => {
  for (const pkg of PACKAGES) {
    EXTRA_HOURS.forEach((extra, index) => {
      const quote = calculateQuote(pkg.id, extra.id)
      assert.equal(quote.total, expectedTotals[pkg.id][index])
      assert.equal(quote.totalHours, pkg.durationHours + extra.hours)
    })
  }
})

test('rechaza identificadores que no existen', () => {
  assert.throws(() => calculateQuote('desconocido'), /no válidos/)
  assert.throws(() => calculateQuote('snapshot', 'desconocido'), /no válidos/)
})

test('formatea moneda y duraciones para el mensaje al cliente', () => {
  assert.equal(formatCRC(165000), '₡165.000')
  assert.equal(formatDuration(0), '0 min')
  assert.equal(formatDuration(1), '1 hora')
  assert.equal(formatDuration(2.5), '2 horas y 30 min')
})
