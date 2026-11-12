import assert from 'node:assert/strict'
import test from 'node:test'
import { calculateQuote, CREDITS_NOTE, DEFAULT_PACKAGE_ID, formatCRC, formatDuration, INCLUDED_IN_ALL, PACKAGES } from '../src/data/packages.js'

// Precios exactos acordados con el negocio (sin redondeos ni recálculos).
const EXPECTED_PRICES = {
  digital: { 1: 85000, 1.5: 115000, 2: 140000 },
  print: { 1: 99000, 1.5: 139000, 2: 175000 },
  ilimitado: { 1: 120000, 1.5: 160000, 2: 200000 },
}

test('hay exactamente 3 paquetes: Digital, Print (recomendado) e Ilimitado', () => {
  assert.deepEqual(PACKAGES.map((pkg) => pkg.name), ['Digital', 'Print', 'Ilimitado'])
  assert.deepEqual(PACKAGES.filter((pkg) => pkg.popular).map((pkg) => pkg.id), ['print'])
  assert.equal(DEFAULT_PACKAGE_ID, 'print')
})

test('el total es el precio exacto de cada paquete y duración', () => {
  for (const [packageId, prices] of Object.entries(EXPECTED_PRICES)) {
    for (const [hours, price] of Object.entries(prices)) {
      const quote = calculateQuote(packageId, Number(hours))
      assert.equal(quote.total, price)
      assert.equal(quote.option.hours, Number(hours))
    }
  }
})

test('rechaza paquetes o duraciones que no existen', () => {
  assert.throws(() => calculateQuote('premium', 1), /no válidos/)
  assert.throws(() => calculateQuote('digital', 3), /no válidos/)
})

test('exporta los beneficios generales y la nota de créditos', () => {
  assert.equal(INCLUDED_IN_ALL.length, 5)
  assert.match(CREDITS_NOTE, /créditos de cortesía/)
})

test('formatea moneda y duraciones para el mensaje al cliente', () => {
  assert.equal(formatCRC(139000), '₡139.000')
  assert.equal(formatDuration(1), '1 hora')
  assert.equal(formatDuration(1.5), '1 hora y 30 min')
  assert.equal(formatDuration(2), '2 horas')
})
