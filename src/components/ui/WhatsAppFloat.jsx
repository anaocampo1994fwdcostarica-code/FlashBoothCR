export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/50687812800?text=Hola%2C%20quisiera%20cotizar%20un%20FlashBooth%20para%20mi%20evento"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Cotizar por WhatsApp"
      className="group fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-green-500/50 transition-all duration-300 hover:scale-110 hover:bg-[#20ba55] focus-visible:scale-110"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-35" aria-hidden="true" />
      <span className="absolute -inset-1 rounded-full border border-green-200/70 animate-[pulse_1.8s_ease-in-out_infinite]" aria-hidden="true" />
      <span className="absolute right-[calc(100%+14px)] whitespace-nowrap rounded-lg bg-[#151120] px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg shadow-black/30 transition-all duration-200 translate-x-2 pointer-events-none group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
        ¿Cotizamos tu evento?
        <span className="absolute right-[-5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 bg-[#151120]" aria-hidden="true" />
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="27"
        height="27"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative z-10"
        aria-hidden="true"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
        <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
      </svg>
    </a>
  )
}
