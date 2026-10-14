import assert from 'node:assert/strict'
import test from 'node:test'
import { createContactWhatsAppUrl } from '../src/utils/whatsapp.js'

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
  assert.equal(parsed.pathname, '/50687812800')
  assert.equal(parsed.searchParams.get('text'), [
    'Hola FlashBooth, quiero realizar una consulta:',
    'Nombre: Ana',
    'Email: ana@example.com',
    'Teléfono: 8888 8888',
    'Tipo de evento: Boda',
    'Mensaje: Fecha por definir',
  ].join('\n'))
})
