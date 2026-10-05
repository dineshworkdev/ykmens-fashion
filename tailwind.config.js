/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // YK MENS FASHION - LIGHT-DOMINANT WARM CREAMY & MOCHA FAMILY
        yk: {
          // Primary Light Backgrounds & Surfaces
          warmIvory: '#FAF7F2',
          warmCream: '#F5EFE8',
          creamLatte: '#EADFD4',
          lightBeige: '#E4D7CC',
          mutedBeige: '#D8C8BA',
          pureWhite: '#FFFFFF',

          // Warm Taupe & Intermediate Accents
          warmTaupe: '#C5B3A4',
          softTaupe: '#B09C8D',
          mutedMocha: '#8B7768',

          // Rich Dark Browns (Typography, Structure, Primary Buttons)
          coffeeBrown: '#6B5549',
          mochaBrown: '#4A3A32',
          deepEspresso: '#33251F',

          // Core Endpoints & Backwards-Compatible Aliases
          mocha: '#4A3A32',
          latte: '#EADFD4',
          white: '#FFFFFF',
          deepMocha: '#33251F',
          surfaceMocha: '#6B5549',
          borderMocha: '#D8C8BA',
          creamTaupe: '#B09C8D',
          sandTaupe: '#C5B3A4',
          latteBorder: '#E4D7CC',
          creamWhite: '#FAF7F2',
          warmFoam: '#FAF7F2',

          ice: '#EADFD4',
          slate: '#8B7768',
          olive: '#4A3A32',
          sand: '#FAF7F2',
          dark: '#4A3A32',
          rose: '#EADFD4',
          navy: '#33251F',
          teal: '#E4D7CC',
          moss: '#4A3A32',
          parchment: '#E4D7CC',
          cream: '#F5EFE8',
          crimson: '#4A3A32',
          wine: '#33251F',
          espresso: '#33251F',
          darkEspresso: '#33251F',
          darkWarmBrown: '#4A3A32',
          darkOlive: '#33251F',
          darkTeal: '#4A3A32',
          darkBurgundy: '#33251F',
          darkCharcoal: '#33251F',
          softBeige: '#E4D7CC',
          mutedTaupe: '#B09C8D',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        brand: ['"Cinzel"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        editorial: '0.25em',
        widestLuxe: '0.38em',
        grand: '0.5em',
      },
      boxShadow: {
        luxe: '0 20px 50px rgba(74, 58, 50, 0.15)',
        glow: '0 0 40px rgba(74, 58, 50, 0.08)',
      },
    },
  },
  plugins: [],
};
