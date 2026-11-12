import { Facebook, Instagram, MessageCircle } from 'lucide-react'
import { FACEBOOK_URL, INSTAGRAM_URL, TIKTOK_URL, waLink } from '../../config/site'

function TikTokIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 2h-3.3v13.4a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.2a6.3 6.3 0 1 0 5.3 6.2V8.6a7.9 7.9 0 0 0 4.4 1.4V6.7a4.5 4.5 0 0 1-4.4-4.7z" />
    </svg>
  )
}

const LINKS = [
  { href: waLink(), label: 'FlashBooth en WhatsApp', Icon: MessageCircle },
  { href: INSTAGRAM_URL, label: 'FlashBooth en Instagram', Icon: Instagram },
  { href: FACEBOOK_URL, label: 'FlashBooth en Facebook', Icon: Facebook },
  { href: TIKTOK_URL, label: 'FlashBooth en TikTok', Icon: TikTokIcon },
]

export default function SocialLinks({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {LINKS.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="motion-icon-control w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 border border-line flex items-center justify-center text-gray-300 hover:text-white transition"
        >
          <span className="motion-icon"><Icon size={16} aria-hidden="true" /></span>
        </a>
      ))}
    </div>
  )
}
