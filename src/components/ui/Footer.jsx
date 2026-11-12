import { MapPin } from 'lucide-react'
import { FloatingIcon } from './MotionDecorations'
import SocialLinks from './SocialLinks'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-base py-10 sm:py-12">
      <div className="site-container flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2.5 text-white">
          <FloatingIcon delay="-.8s" className="h-9 w-9 items-center justify-center rounded-lg border-2 border-white/90 p-1.5">
            <svg className="w-full h-full fill-none stroke-white stroke-[2.2]" viewBox="0 0 24 24">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
          </FloatingIcon>
          <div className="flex flex-col leading-none font-bold text-xs tracking-widest uppercase">
            <span>FLASH</span>
            <span>BOOTH</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} FlashBooth Costa Rica. Todos los derechos reservados.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <SocialLinks />
          <span className="flex items-center gap-1.5 text-xs text-gray-500 ml-2">
            <MapPin size={14} /> San José, Costa Rica
          </span>
        </div>
      </div>
    </footer>
  )
}
