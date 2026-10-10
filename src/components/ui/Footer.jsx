import { MessageCircle, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-base py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5 text-white">
          <div className="w-9 h-9 border-2 border-white/90 rounded-lg flex items-center justify-center p-1.5">
            <svg className="w-full h-full fill-none stroke-white stroke-[2.2]" viewBox="0 0 24 24">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
          <div className="flex flex-col leading-none font-bold text-xs tracking-widest uppercase">
            <span>FLASH</span>
            <span>BOOTH</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} FlashBooth Costa Rica. Todos los derechos reservados.
        </p>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/50687812800"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 border border-line flex items-center justify-center text-gray-300 hover:text-white transition"
          >
            <MessageCircle size={16} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 border border-line flex items-center justify-center text-gray-300 hover:text-white transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
          <span className="flex items-center gap-1.5 text-xs text-gray-500 ml-2">
            <MapPin size={14} /> San José, Costa Rica
          </span>
        </div>
      </div>
    </footer>
  )
}
