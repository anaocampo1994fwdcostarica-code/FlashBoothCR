// Paquetes y precios de FlashBooth. Cada paquete tiene 3 duraciones con su precio exacto (en colones).
// Para cambiar un precio, edita el `price` de la duración correspondiente.

// Beneficios incluidos en TODOS los paquetes.
export const INCLUDED_IN_ALL = [
  'Fotos digitales de alta calidad',
  'Galería online privada',
  'Envío instantáneo por WhatsApp, código QR o correo',
  'Diseños para redes sociales',
  'Accesorios divertidos (props)',
]

export const PACKAGES = [
  {
    id: 'digital',
    name: 'Digital',
    desc: 'Contenido digital creativo para compartir en redes sociales.',
    popular: false,
    features: [
      'Fotos digitales del evento',
      'Diseños para redes sociales',
      'Galería online privada',
      'Envío instantáneo por WhatsApp, código QR o correo',
      'Accesorios divertidos (props)',
    ],
    prices: [
      { hours: 1, label: '1 hora', price: 85000 },
      { hours: 1.5, label: '1,5 horas', price: 115000 },
      { hours: 2, label: '2 horas', price: 140000 },
    ],
  },
  {
    id: 'print',
    name: 'Print',
    desc: 'Diversión digital e impresa para tus invitados.',
    popular: true,
    features: [
      'Todo lo incluido en Digital',
      '2 tiras impresas de 2 × 6 pulgadas por sesión',
      'Sesiones ilimitadas durante el servicio',
    ],
    prices: [
      { hours: 1, label: '1 hora', price: 99000 },
      { hours: 1.5, label: '1,5 horas', price: 139000 },
      { hours: 2, label: '2 horas', price: 175000 },
    ],
  },
  {
    id: 'ilimitado',
    name: 'Ilimitado',
    desc: 'Impresiones sin límites para que todos se lleven un recuerdo.',
    popular: false,
    features: [
      'Todo lo incluido en Print',
      'Tiras impresas ilimitadas de 2 × 6 pulgadas durante el servicio',
    ],
    prices: [
      { hours: 1, label: '1 hora', price: 120000 },
      { hours: 1.5, label: '1,5 horas', price: 160000 },
      { hours: 2, label: '2 horas', price: 200000 },
    ],
  },
]

export const DEFAULT_PACKAGE_ID = 'print'

export const formatCRC = (value) => `₡${String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`

export const formatDuration = (hours) => {
  const whole = Math.floor(hours)
  const half = hours % 1 !== 0
  const parts = []
  if (whole > 0) parts.push(`${whole} ${whole === 1 ? 'hora' : 'horas'}`)
  if (half) parts.push('30 min')
  return parts.join(' y ') || '0 min'
}

// Devuelve el paquete, la duración elegida y el precio exacto de esa combinación (sin recalcular).
export function calculateQuote(packageId, hours) {
  const selectedPackage = PACKAGES.find((item) => item.id === packageId)
  const option = selectedPackage?.prices.find((item) => item.hours === hours)
  if (!selectedPackage || !option) throw new Error('Paquete o duración no válidos.')
  return { package: selectedPackage, option, total: option.price }
}
