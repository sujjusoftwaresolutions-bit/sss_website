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
        'brand-bg': '#F8FAFC',
        'brand-text': '#1E293B',
      }
    },
  },
  plugins: [],
}
