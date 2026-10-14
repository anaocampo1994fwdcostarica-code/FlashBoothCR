export const WHATSAPP_NUMBER = '50687812800'

export function createContactWhatsAppUrl({ name, email, phone = '', eventType, message }) {
  const text = [
    'Hola FlashBooth, quiero realizar una consulta:',
    `Nombre: ${name.trim()}`,
    `Email: ${email.trim()}`,
    ...(phone.trim() ? [`Teléfono: ${phone.trim()}`] : []),
    `Tipo de evento: ${eventType.trim()}`,
    `Mensaje: ${message.trim()}`,
  ].join('\n')
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}
