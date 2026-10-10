/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // FlashBooth design tokens: dark layered surfaces with a violet CTA.
        base: '#07060c',
        panel: '#0e0c18',
        card: '#131122',
        'card-alt': '#121020',
        line: '#232038',
        'line-soft': '#26223e',
        brand: {
          DEFAULT: '#7c3aed',
          bright: '#a855f7',
          soft: '#c084fc',
          indigo: '#6366f1',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
