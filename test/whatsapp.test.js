import assert from 'node:assert/strict'
import test from 'node:test'
import { waLink, WHATSAPP_NUMBER } from '../src/config/site.js'
import { createContactWhatsAppUrl } from '../src/utils/whatsapp.js'

test('waLink usa el número central y codifica el texto', () => {
  assert.equal(WHATSAPP_NUMBER, '50687212900')
  assert.equal(waLink(), 'https://wa.me/50687212900')
  assert.equal(waLink('Hola, ¿precio?'), `https://wa.me/50687212900?text=${encodeURIComponent('Hola, ¿precio?')}`)
})

test('prepara la consulta de contacto sin enviarla ni confirmar una reserva', () => {
  const url = createContactWhatsAppUrl({
    name: ' Ana ',
    email: 'ana@example.com',
    phone: '8888 8888',
    eventType: 'Boda',
    message: 'Fecha por definir',
  })
  const parsed = new URL(url)
  assert.equal(parsed.hostname, 'wa.me')
  assert.equal(parsed.pathname, `/${WHATSAPP_NUMBER}`)
  assert.equal(parsed.searchParams.get('text'), [
    'Hola FlashBooth, quiero realizar una consulta:',
    'Nombre: Ana',
    'Teléfono: 8888 8888',
    'Email: ana@example.com',
    'Tipo de evento: Boda',
    'Mensaje: Fecha por definir',
  ].join('\n'))
})

test('omite teléfono y email cuando vienen vacíos', () => {
  const text = new URL(createContactWhatsAppUrl({ name: 'Ana', eventType: 'Otro', message: 'Hola' })).searchParams.get('text')
  assert.ok(!text.includes('Teléfono'))
  assert.ok(!text.includes('Email'))
})
