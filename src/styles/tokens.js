/**
 * YK MENS FASHION - Master Color Library & Design Tokens
 * 
 * STRICT APPROVED PALETTES:
 * 
 * 1. ORIGINAL COLORS:
 *    #DFE5F3, #557373, #272401, #F2EFEA, #0D0D0D
 * 
 * 2. DEEP COLOR PALETTE:
 *    #A6445D, #142F40, #62929E, #393A10, #E7DECD
 * 
 * 3. GOLDEN LUXE PALETTE:
 *    #EDE7C7, #8B0000, #5B0202, #200E01
 */

export const MASTER_COLORS = Object.freeze({
  // Original
  ICE: '#DFE5F3',
  SLATE: '#557373',
  OLIVE: '#272401',
  SAND: '#F2EFEA',
  DARK: '#0D0D0D',

  // Deep Palette
  VELVET_ROSE: '#A6445D',
  MIDNIGHT_NAVY: '#142F40',
  SEA_GLASS: '#62929E',
  ARMY_OLIVE: '#393A10',
  PARCHMENT: '#E7DECD',

  // Golden Luxe Palette
  CHALK_CREAM: '#EDE7C7',
  CRIMSON: '#8B0000',
  BURGUNDY: '#5B0202',
  ESPRESSO: '#200E01',

  // Dark Editorial Experiment Palette (Rich, Deep, Warm, Masculine, Non-black)
  DARK_ESPRESSO: '#231711',     // Floating Navbar & base shell
  DARK_WARM_BROWN: '#2C1E18',   // Hero Section
  DARK_MUTED_OLIVE: '#202920',  // Featured Categories Curved
  DARK_MUTED_TEAL: '#183038',   // Seasonal Showcase Donut Carousel
  DARK_BURGUNDY: '#34151C',     // Closing Brand CTA
  DARK_CHARCOAL_BROWN: '#1D1410', // Deepest Footer
  WARM_CREAM: '#FAF7F2',        // Primary headings, light contrast cards
  SOFT_BEIGE: '#E8DEC8',        // Secondary titles, italic highlights
  MUTED_TAUPE: '#C8B8AA',       // Supporting text & borders
  LIGHT_TAUPE: '#D4C5B6',       // Secondary navigation & labels
});

// Dark Editorial Theme Chapters for Rich Color Rhythm
export const DARK_COLOR_CHAPTERS = Object.freeze({
  // Chapter 1: Hero — Rich Warm Brown / Deep Taupe
  hero: {
    bg: MASTER_COLORS.DARK_WARM_BROWN,
    border: '#3E2A21',
    heading: MASTER_COLORS.WARM_CREAM,
    headingItalic: MASTER_COLORS.SOFT_BEIGE,
    text: MASTER_COLORS.MUTED_TAUPE,
    accent: MASTER_COLORS.VELVET_ROSE,
    surfaceCard: MASTER_COLORS.WARM_CREAM,
    surfaceCardText: MASTER_COLORS.ESPRESSO,
  },

  // Chapter 2: Featured Categories — Deep Muted Olive / Forest Tone
  categories: {
    bg: MASTER_COLORS.DARK_MUTED_OLIVE,
    border: '#2E3A2E',
    heading: MASTER_COLORS.WARM_CREAM,
    text: MASTER_COLORS.MUTED_TAUPE,
    accent: '#D99E84',
    cardBg: MASTER_COLORS.WARM_CREAM,
    cardBorder: '#E2D7C8',
    cardText: '#182018',
  },

  // Chapter 3: Seasonal Showcase — Deep Muted Teal
  showcase: {
    bg: MASTER_COLORS.DARK_MUTED_TEAL,
    border: '#22444E',
    heading: MASTER_COLORS.WARM_CREAM,
    text: MASTER_COLORS.MUTED_TAUPE,
    accent: '#D99E84',
    controlBg: '#23454F',
    controlBorder: '#366674',
  },

  // Chapter 4: Closing Brand CTA — Rich Burgundy / Warm Wine
  cta: {
    bg: MASTER_COLORS.DARK_BURGUNDY,
    border: '#4A1E28',
    heading: MASTER_COLORS.WARM_CREAM,
    text: '#D4BFC4',
    accent: '#D99E84',
  },

  // Chapter 5: Footer — Deepest Warm Brown / Charcoal
  footer: {
    bg: MASTER_COLORS.DARK_CHARCOAL_BROWN,
    border: '#2C1E18',
    heading: MASTER_COLORS.WARM_CREAM,
    text: MASTER_COLORS.MUTED_TAUPE,
    accent: MASTER_COLORS.VELVET_ROSE,
  },
});

// Light-first chapter color themes for visual storytelling (preserved for fallback)
export const COLOR_CHAPTERS = Object.freeze({
  // Chapter 1: Pale Sand & Deep Espresso / Crimson Accents
  heroLight: {
    bg: MASTER_COLORS.SAND,
    surface: MASTER_COLORS.CHALK_CREAM,
    text: MASTER_COLORS.ESPRESSO,
    heading: MASTER_COLORS.DARK,
    accent: MASTER_COLORS.CRIMSON,
    muted: MASTER_COLORS.SLATE,
    border: '#E7DECD',
  },

  // Chapter 2: Warm Parchment & Deep Olive / Berry Accents
  warmParchment: {
    bg: MASTER_COLORS.PARCHMENT,
    surface: MASTER_COLORS.SAND,
    text: MASTER_COLORS.ARMY_OLIVE,
    heading: MASTER_COLORS.OLIVE,
    accent: MASTER_COLORS.VELVET_ROSE,
    muted: MASTER_COLORS.SLATE,
    border: '#DFE5F3',
  },

  // Chapter 3: Golden Luxe Cream & Deep Midnight Navy / Sea Glass Accents
  goldenCream: {
    bg: MASTER_COLORS.CHALK_CREAM,
    surface: MASTER_COLORS.SAND,
    text: MASTER_COLORS.MIDNIGHT_NAVY,
    heading: MASTER_COLORS.ESPRESSO,
    accent: MASTER_COLORS.SEA_GLASS,
    muted: MASTER_COLORS.SLATE,
    border: 'rgba(32, 14, 1, 0.1)',
  },

  // Chapter 4: Ice Blue & Obsidian / Slate Accents
  iceMinimal: {
    bg: MASTER_COLORS.ICE,
    surface: MASTER_COLORS.SAND,
    text: MASTER_COLORS.DARK,
    heading: MASTER_COLORS.DARK,
    accent: MASTER_COLORS.SLATE,
    muted: MASTER_COLORS.SLATE,
    border: 'rgba(85, 115, 115, 0.2)',
  },

  // Chapter 5: Soft Sea Glass Wash & Burgundy Details
  seaGlassAir: {
    bg: MASTER_COLORS.SAND,
    surface: MASTER_COLORS.PARCHMENT,
    text: MASTER_COLORS.DARK,
    heading: MASTER_COLORS.BURGUNDY,
    accent: MASTER_COLORS.CRIMSON,
    muted: MASTER_COLORS.SLATE,
    border: '#E7DECD',
  },
});


