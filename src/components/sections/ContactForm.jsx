import { useState } from 'react'
import { Send } from 'lucide-react'
import { createContactWhatsAppUrl } from '../../utils/whatsapp'

const ERROR_MESSAGES = { name: 'Escribe tu nombre.', message: 'Cuéntanos sobre tu evento.' }

export default function ContactForm() {
  const [submission, setSubmission] = useState({ state: 'idle', message: '' })
  const [errors, setErrors] = useState({})

  const clearError = (field) => setErrors((current) => (current[field] ? { ...current, [field]: '' } : current))

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const values = {
      name: String(data.get('name') || ''),
      email: String(data.get('email') || ''),
      phone: String(data.get('phone') || ''),
      eventType: String(data.get('event_type') || ''),
      message: String(data.get('message') || ''),
    }
    const nextErrors = Object.fromEntries(['name', 'message'].filter((field) => !values[field].trim()).map((field) => [field, ERROR_MESSAGES[field]]))
    setErrors(nextErrors)
    const firstInvalid = ['name', 'message'].find((field) => nextErrors[field])
    if (firstInvalid) {
      form.elements.namedItem(firstInvalid)?.focus()
      setSubmission({ state: 'idle', message: '' })
      return
    }
    window.open(createContactWhatsAppUrl(values), '_blank', 'noopener,noreferrer')
    setSubmission({ state: 'success', message: 'La consulta quedó preparada en WhatsApp. Esto no confirma una reserva.' })
  }
  return (
    <section id="contacto" className="py-16 sm:py-20 lg:py-24 relative border-t border-line/60 bg-base">
      <div className="site-container">
        <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-8">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-purple-400 font-bold block mb-2">
            CONTACTO
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white leading-tight">
            ¿Listo para <span className="italic font-normal text-purple-200">comenzar?</span>
          </h2>
          <p className="text-sm sm:text-base mt-4 max-w-xl mx-auto" style={{ color: '#fff' }}>
            Para consultas especiales o corporativas, cuéntanos qué necesitas y cómo podemos contactarte.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto grid w-full max-w-[760px] grid-cols-1 gap-4 rounded-2xl border border-line bg-panel/80 p-5 shadow-2xl shadow-purple-950/20 sm:grid-cols-2 sm:gap-5 sm:p-7"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Nombre</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              required
              maxLength="100"
              onChange={() => clearError('name')}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              className="w-full min-h-11 px-4 py-3 rounded-xl bg-base border border-line focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-hidden text-sm text-white placeholder-gray-500 transition"
              placeholder="Tu nombre"
            />
            {errors.name && <span id="contact-name-error" role="alert" className="text-xs text-red-300">{errors.name}</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Email (opcional)</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              maxLength="254"
              className="w-full min-h-11 px-4 py-3 rounded-xl bg-base border border-line focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-hidden text-sm text-white placeholder-gray-500 transition"
              placeholder="tu@email.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-phone" className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Teléfono</label>
            <input
              id="contact-phone"
              type="tel"
              name="phone"
              maxLength="30"
              className="w-full min-h-11 px-4 py-3 rounded-xl bg-base border border-line focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-hidden text-sm text-white placeholder-gray-500 transition"
              placeholder="+506 8888 8888"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact-event-type" className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Tipo de Evento</label>
            <select
              id="contact-event-type"
              name="event_type"
              className="w-full min-h-11 px-4 py-3 rounded-xl bg-base border border-line focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-hidden text-sm text-white transition appearance-none"
            >
              <option value="Cumpleaños">Cumpleaños</option>
              <option value="Bodas">Bodas</option>
              <option value="Corporativo">Corporativo</option>
              <option value="Quinceaños">Quinceaños</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label htmlFor="contact-message" className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Mensaje</label>
            <textarea
              id="contact-message"
              name="message"
              rows="4"
              required
              maxLength="2000"
              onChange={() => clearError('message')}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              className="min-h-[120px] w-full resize-y rounded-xl border border-line bg-base px-4 py-3 text-sm text-white placeholder-gray-500 outline-hidden transition focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="Cuéntanos sobre tu evento, fecha y número de invitados..."
            ></textarea>
            {errors.message && <span id="contact-message-error" role="alert" className="text-xs text-red-300">{errors.message}</span>}
          </div>
          <div className="sm:col-span-2 flex justify-stretch sm:justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto justify-center px-6 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/40 transition-all hover:scale-105 flex items-center gap-2"
            >
              <Send size={16} />
              Preparar consulta en WhatsApp
            </button>
          </div>
          {submission.message && <p role="status" aria-live="polite" className="sm:col-span-2 rounded-xl border border-green-300/30 bg-green-300/10 p-3 text-sm text-green-100">{submission.message}</p>}
        </form>
      </div>
    </section>
  )
}
