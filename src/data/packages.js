export const PACKAGES = [
  { id: 'snapshot', name: 'DIGITAL', desc: 'Convierte tu evento en contenido que tus invitados puedan disfrutar, guardar y compartir inmediatamente.', price: 95000, durationHours: 1, durationLabel: '1 hora', popular: false, concept: 'Contenido para compartir', features: [{ text: 'Fotografías digitales ilimitadas.' }, { text: 'Contenido para redes sociales.' }, { text: 'Plantillas y diseños personalizados.' }, { text: 'Galería digital (acceso QR / WhatsApp).' }, { text: '10 Transformaciones Creativas con IA.' }, { text: 'Cámara e iluminación profesional + Operador.' }] },
  { id: 'experience', name: 'Clásico', desc: 'Para eventos que buscan más tiempo, personalización y acompañamiento.', price: 165000, durationHours: 2, durationLabel: '2 horas', popular: true, features: [{ text: 'Photobooth IA con fondos virtuales' }, { text: '2 horas ilimitadas de fotos' }, { text: 'Galería digital online' }, { text: 'Props divertidos' }, { text: 'Diseño personalizado del fondo' }, { text: 'Operador en sitio' }] },
  { id: 'premium', name: 'Premium', desc: 'Para que todos tengan tiempo de crear su recuerdo favorito.', price: 195000, durationHours: 3, durationLabel: '3 horas', popular: false, features: [{ text: 'Photobooth IA con fondos virtuales' }, { text: '3 horas ilimitadas de fotos' }, { text: 'Galería digital online' }, { text: 'Props divertidos' }, { text: 'Diseño personalizado del fondo' }, { text: 'Operador en sitio' }, { text: 'Álbum físico impreso' }] },
  { id: 'platinum', name: 'Experiencia Completa', desc: 'Para eventos grandes que quieren tiempo, impresiones y extras para todos.', price: 245000, durationHours: 4, durationLabel: '4 horas', popular: false, features: [{ text: 'Photobooth IA con fondos virtuales' }, { text: '4 horas ilimitadas de fotos' }, { text: 'Galería digital online' }, { text: 'Props divertidos' }, { text: 'Diseño personalizado del fondo' }, { text: 'Operador en sitio' }, { text: 'Álbum físico impreso' }, { text: 'Impresiones ilimitadas en sitio' }] },
]

export const EXTRA_HOURS = [
  { id: 'base', hours: 0, label: 'Incluido', price: 0 },
  { id: 'h1', hours: 1, label: '+1h', price: 20000 },
  { id: 'h2', hours: 2, label: '+2h', price: 35000 },
  { id: 'h3', hours: 3, label: '+3h', price: 65000 },
  { id: 'h4', hours: 4, label: '+4h', price: 95000 },
]

export const formatCRC = (value) => `₡${String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`

export const formatDuration = (hours) => {
  const whole = Math.floor(hours)
  const half = hours % 1 !== 0
  const parts = []
  if (whole > 0) parts.push(`${whole} ${whole === 1 ? 'hora' : 'horas'}`)
  if (half) parts.push('30 min')
  return parts.join(' y ') || '0 min'
}

export function calculateQuote(packageId, extraHoursId = 'base') {
  const selectedPackage = PACKAGES.find((item) => item.id === packageId)
  const extra = EXTRA_HOURS.find((item) => item.id === extraHoursId)
  if (!selectedPackage || !extra) throw new Error('Paquete u horas adicionales no válidos.')
  return {
    package: selectedPackage,
    extra,
    total: selectedPackage.price + extra.price,
    totalHours: selectedPackage.durationHours + extra.hours,
  }
}
