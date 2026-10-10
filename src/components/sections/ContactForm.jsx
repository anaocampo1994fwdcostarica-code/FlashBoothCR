import { Send } from 'lucide-react'

export default function ContactForm() {
  return (
    <section id="contacto" className="py-16 sm:py-20 lg:py-24 relative border-t border-line/60 bg-base">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-purple-400 font-bold block mb-2">
            CONTACTO
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white leading-tight">
            ¿Listo para <span className="italic font-normal text-purple-200">comenzar?</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-4 max-w-xl mx-auto">
            Cuéntanos sobre tu evento y te responderemos en menos de 24 horas.
          </p>
        </div>

        <form
          action="https://formsubmit.co/tu-email@ejemplo.com" // <- Cambia esto a tu correo real
          method="POST"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 rounded-2xl sm:rounded-3xl bg-panel/80 border border-line p-5 sm:p-10 shadow-2xl shadow-purple-950/20"
        >
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Nombre</label>
            <input
              type="text"
              name="name"
              required
              className="w-full min-h-11 px-4 py-3 rounded-xl bg-base border border-line focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm text-white placeholder-gray-500 transition"
              placeholder="Tu nombre"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full min-h-11 px-4 py-3 rounded-xl bg-base border border-line focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm text-white placeholder-gray-500 transition"
              placeholder="tu@email.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Teléfono</label>
            <input
              type="tel"
              name="phone"
              className="w-full min-h-11 px-4 py-3 rounded-xl bg-base border border-line focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm text-white placeholder-gray-500 transition"
              placeholder="+506 8888 8888"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Tipo de Evento</label>
            <select
              name="event_type"
              className="w-full min-h-11 px-4 py-3 rounded-xl bg-base border border-line focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm text-white transition appearance-none"
            >
              <option value="Cumpleaños">Cumpleaños</option>
              <option value="Bodas">Bodas</option>
              <option value="Corporativo">Corporativo</option>
              <option value="Quinceaños">Quinceaños</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Mensaje</label>
            <textarea
              name="message"
              rows="4"
              required
              className="w-full px-4 py-3 rounded-xl bg-base border border-line focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none text-sm text-white placeholder-gray-500 transition resize-none"
              placeholder="Cuéntanos sobre tu evento, fecha y número de invitados..."
            ></textarea>
          </div>
          <div className="sm:col-span-2 flex justify-stretch sm:justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto justify-center px-6 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/40 transition-all hover:scale-105 flex items-center gap-2"
            >
              <Send size={16} />
              Enviar mensaje
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
