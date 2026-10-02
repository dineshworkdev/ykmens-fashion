/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // YK MENS FASHION - APPROVED MASTER COLOR LIBRARY
        yk: {
          // Original
          ice: '#DFE5F3',
          slate: '#557373',
          olive: '#272401',
          sand: '#F2EFEA',
          dark: '#0D0D0D',

          // Deep Palette
          rose: '#A6445D',
          navy: '#142F40',
          teal: '#62929E',
          moss: '#393A10',
          parchment: '#E7DECD',

          // Golden Luxe Palette
          cream: '#EDE7C7',
          crimson: '#8B0000',
          wine: '#5B0202',
          espresso: '#200E01',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        editorial: '0.25em',
        widestLuxe: '0.38em',
        grand: '0.5em',
      },
      boxShadow: {
        luxe: '0 20px 50px rgba(13, 13, 13, 0.45)',
        glow: '0 0 40px rgba(237, 231, 199, 0.12)',
      },
    },
  },
  plugins: [],
};
