import { waLink } from '../config/site.js'

export const QUOTE_GREETING = 'Hola, quisiera cotizar un FlashBooth para mi evento'

export function createQuoteWhatsAppUrl(lines) {
  return waLink(lines.join('\n'))
}

export function createContactWhatsAppUrl({ name, email = '', phone = '', eventType, message }) {
  const text = [
    'Hola FlashBooth, quiero realizar una consulta:',
    `Nombre: ${name.trim()}`,
    ...(phone.trim() ? [`Teléfono: ${phone.trim()}`] : []),
    ...(email.trim() ? [`Email: ${email.trim()}`] : []),
    `Tipo de evento: ${eventType.trim()}`,
    `Mensaje: ${message.trim()}`,
  ].join('\n')
  return waLink(text)
}
