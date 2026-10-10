export function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export function scrollToQuote(e) {
  if (e) e.preventDefault()
  scrollToId('cotizador')
}