import { useRef, useState } from 'react'
import { Camera, Image as ImageIcon, Wand2, Smartphone, Play } from 'lucide-react'
import BeforeAfterSlider from '../ui/BeforeAfterSlider'
import VideoModal from '../ui/VideoModal'

const VIDEO_CARDS = [
  {
    id: 'booth',
    icon: Camera,
    title: 'Fotografía Profesional',
    desc: 'Imágenes de alta calidad con iluminación y equipo profesional para que cada momento se vea increíble.',
    video: '/videos/flashbooth.mp4',
  },
  {
    id: 'social',
    icon: Smartphone,
    title: 'Contenido para Redes',
    desc: 'Fotos, videos, boomerangs y diseños listos para compartir en Instagram, TikTok y más.',
    video: '/videos/campana-flashbooth.mp4',
  },
]

function VideoPoster({ src, title }) {
  const videoRef = useRef(null)
  const hasSelectedFrame = useRef(false)

  const selectFirstVisibleFrame = () => {
    const video = videoRef.current
    if (!video || hasSelectedFrame.current || !Number.isFinite(video.duration)) return

    // Un breve salto evita una pantalla negra o fundido inicial, sin reproducir el video.
    hasSelectedFrame.current = true
    video.currentTime = Math.min(0.5, Math.max(0.1, video.duration - 0.1))
  }

  return (
    <video
      ref={videoRef}
      src={src}
      preload="metadata"
      muted
      playsInline
      tabIndex={-1}
      aria-label={`Portada del video: ${title}`}
      onLoadedMetadata={selectFirstVisibleFrame}
      onSeeked={(event) => event.currentTarget.pause()}
      className="h-full w-full object-contain opacity-90 transition-transform duration-700 group-hover:scale-[1.02] group-hover:opacity-100"
    />
  )
}

const SLIDER_CARDS = [
  {
    id: 'fondos',
    icon: ImageIcon,
    title: 'Fondos Virtuales',
    desc: 'Cambia el escenario sin salir de tu evento. Transporta a tus invitados a cualquier lugar con fondos digitales increíbles.',
    before: '/comparisons/comparison-1.jpg',
    after: '/comparisons/comparison-2.jpg',
  },
  {
    id: 'ia',
    icon: Wand2,
    title: 'Transformaciones con IA',
    desc: 'Convierte tus fotos en experiencias únicas con inteligencia artificial, adaptadas a la temática de tu evento.',
    before: '/comparisons/comparison-3.jpg',
    after: '/comparisons/comparison-4.jpg',
  },
]

export default function VideosExperiences() {
  const [activeVideo, setActiveVideo] = useState(null)

  return (
    <section id="experiencias" className="py-16 sm:py-20 lg:py-24 relative border-t border-line/60 overflow-hidden bg-base">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[22rem] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs sm:text-sm uppercase tracking-widest text-purple-400 font-bold block mb-2">
            NUESTRAS EXPERIENCIAS
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white leading-tight">
            Experiencias que transforman{' '}
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
              tu evento.
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-4 max-w-xl mx-auto">
            Desde fondos virtuales hasta transformaciones con IA, convierte cada fotografía en una
            experiencia que tus invitados querrán compartir.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {VIDEO_CARDS.map(({ id, icon: Icon, title, desc, video }) => (
            <div
              key={id}
              className="rounded-2xl overflow-hidden border border-line-soft bg-card-alt hover:border-purple-500/50 transition"
            >
              <button
                onClick={() => setActiveVideo(video)}
                className="relative aspect-square w-full bg-black p-2 flex items-center justify-center group"
              >
                <VideoPoster src={video} title={title} />
                <div className="absolute inset-0 bg-gradient-to-t from-card-alt via-black/10 to-transparent" />
                <div className="absolute w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-purple-600/80 transition-all">
                  <Play size={24} fill="currentColor" className="translate-x-0.5" />
                </div>
              </button>
              <div className="p-5 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-purple-400 mb-1.5">
                    <Icon size={16} />
                  </div>
                  <h3 className="text-base font-bold text-white">{title}</h3>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">{desc}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveVideo(video)}
                className="mx-5 mb-5 text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                Ver video →
              </button>
            </div>
          ))}

          {SLIDER_CARDS.map(({ id, icon: Icon, title, desc, before, after }) => (
            <div
              key={id}
              className="rounded-2xl overflow-hidden border border-line-soft bg-card-alt hover:border-purple-500/50 transition"
            >
              <div className="relative aspect-square w-full bg-black">
                <BeforeAfterSlider before={before} after={after} />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 text-purple-400 mb-1.5">
                  <Icon size={16} />
                </div>
                <h3 className="text-base font-bold text-white">{title}</h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">{desc}</p>
                <a href="#paquetes" className="mt-3 inline-block text-xs font-semibold text-purple-400 hover:text-purple-300">
                  Ver más →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-panel/80 border border-line p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white font-serif italic text-lg sm:text-xl">
            ¿Listo para vivir la experiencia?
          </p>
          <a
            href="https://wa.me/50687812800"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold shadow-lg shadow-purple-600/40 transition-all hover:scale-105"
          >
            Cotizar por WhatsApp
          </a>
        </div>
      </div>

      {activeVideo && <VideoModal src={activeVideo} onClose={() => setActiveVideo(null)} />}
    </section>
  )
}
