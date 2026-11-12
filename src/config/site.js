// Configuración central del sitio: contacto, redes y tarifas compartidas.
// Cambia aquí el WhatsApp o las redes; el resto del sitio usa estos valores.

export const WHATSAPP_NUMBER = '50687212900' // número visible: 8721-2900
export const WHATSAPP_DISPLAY = '8721-2900'

export const INSTAGRAM_URL = 'https://www.instagram.com/flashbooth.cr'
export const TIKTOK_URL = 'https://www.tiktok.com/@flashbooth.cr'
export const FACEBOOK_URL = 'https://www.facebook.com/share/19g5buYMow/'

export const CONTACT_EMAIL = 'TU_CORREO@dominio.com' // TODO: reemplazar por el correo real del negocio


export function waLink(text) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}
