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
});

// Light-first chapter color themes for visual storytelling
// Dominant surfaces are light (#F2EFEA, #E7DECD, #EDE7C7, #DFE5F3)
// Dark colors provide strong, crisp typographic and graphical contrast
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

