/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-navy': '#0A2F6B',
        'brand-gold': '#D4AF37',
        'brand-light-gold': '#F4C542',
        'brand-bg': '#050B14',
        'brand-text': '#F8FAFC',
        'heading': '#F5F7FA',
        'body': '#CBD5E1',
        'muted': '#94A3B8',
        'on-light': '#050B14',
      }
    },
  },
  plugins: [],
}
