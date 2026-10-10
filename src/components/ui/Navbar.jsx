import { useState } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'

const NAV_LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#paquetes', label: 'Precios' },
  { href: '#galeria', label: 'Galería' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [active, setActive] = useState('#inicio')
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-base/60 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2.5 text-white tracking-wider group">
          <div className="w-9 h-9 border-2 border-white/90 rounded-lg flex items-center justify-center p-1.5">
            <svg className="w-full h-full fill-none stroke-white stroke-[2.2]" viewBox="0 0 24 24">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </div>
          <div className="flex flex-col leading-none font-bold text-xs tracking-widest uppercase text-white">
            <span>FLASH</span>
            <span>BOOTH</span>
          </div>
        </a>

        <div className="flex items-center gap-3">
          <nav className="hidden xl:flex items-center gap-1.5 text-xs text-gray-300 font-medium">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActive(link.href)}
                className={`px-4 py-1.5 rounded-full border transition ${
                  active === link.href
                    ? 'bg-white/10 text-white border-white/15'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border-white/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="https://wa.me/50687812800"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 px-3 sm:px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/40 transition-all hover:scale-105"
          >
            <MessageCircle size={14} aria-hidden="true" />
            <span className="hidden sm:inline">Cotizar</span>
          </a>

          <button
            className="xl:hidden w-11 h-11 flex items-center justify-center text-white"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="xl:hidden flex flex-col gap-1 px-4 sm:px-6 pb-4 bg-base/95 backdrop-blur-md border-t border-white/5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => {
                setActive(link.href)
                setMenuOpen(false)
              }}
              className={`px-4 py-3 rounded-full text-sm border transition ${
                active === link.href
                  ? 'bg-white/10 text-white border-white/15'
                  : 'bg-white/5 text-gray-300 border-white/5'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
