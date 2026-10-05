/**
 * YK MENS FASHION - Master Color Library & Design Tokens
 * 
 * MASTER PALETTE FAMILY:
 * #FAF7F2 — Warm Ivory
 * #F5EFE8 — Soft Warm Cream
 * #EADFD4 — Cream Latte
 * #E4D7CC — Light Beige
 * #D8C8BA — Muted Beige
 * #C5B3A4 — Warm Taupe
 * #B09C8D — Soft Taupe
 * #8B7768 — Muted Mocha
 * #6B5549 — Coffee Brown
 * #4A3A32 — Mocha Brown
 * #33251F — Deep Espresso
 * #FFFFFF — Pure White
 * 
 * HIERARCHY:
 * LIGHT COLORS DOMINATE (Backgrounds, Section surfaces, Cards)
 * RICH MOCHA / ESPRESSO BROWNS PROVIDE CONTRAST & STRUCTURE (Typography, Buttons, Active States)
 */

export const MASTER_COLORS = Object.freeze({
  // Light Backgrounds & Surfaces
  WARM_IVORY: '#FAF7F2',
  WARM_CREAM: '#F5EFE8',
  CREAM_LATTE: '#EADFD4',
  LIGHT_BEIGE: '#E4D7CC',
  MUTED_BEIGE: '#D8C8BA',
  PURE_WHITE: '#FFFFFF',

  // Warm Taupe & Intermediate Accents
  WARM_TAUPE: '#C5B3A4',
  SOFT_TAUPE: '#B09C8D',
  MUTED_MOCHA: '#8B7768',

  // Rich Dark Browns (Typography, Structure, Primary Buttons)
  COFFEE_BROWN: '#6B5549',
  MOCHA_BROWN: '#4A3A32',
  DEEP_ESPRESSO: '#33251F',

  // Core & Backwards Compatibility Aliases
  MOCHA: '#4A3A32',
  LATTE: '#EADFD4',
  WHITE: '#FFFFFF',
  DEEP_MOCHA: '#33251F',
  SURFACE_MOCHA: '#6B5549',
  BORDER_MOCHA: '#D8C8BA',
  CREAM_TAUPE: '#B09C8D',
  SAND_TAUPE: '#C5B3A4',
  LATTE_BORDER: '#E4D7CC',
  CREAM_WHITE: '#FAF7F2',
  WARM_FOAM: '#FAF7F2',

  ICE: '#EADFD4',
  SLATE: '#8B7768',
  OLIVE: '#4A3A32',
  SAND: '#FAF7F2',
  DARK: '#4A3A32',
  VELVET_ROSE: '#EADFD4',
  MIDNIGHT_NAVY: '#33251F',
  SEA_GLASS: '#E4D7CC',
  ARMY_OLIVE: '#4A3A32',
  PARCHMENT: '#E4D7CC',
  CHALK_CREAM: '#F5EFE8',
  CRIMSON: '#4A3A32',
  BURGUNDY: '#33251F',
  ESPRESSO: '#33251F',
  DARK_ESPRESSO: '#33251F',
  DARK_WARM_BROWN: '#4A3A32',
  DARK_MUTED_OLIVE: '#33251F',
  DARK_MUTED_TEAL: '#4A3A32',
  DARK_BURGUNDY: '#33251F',
  DARK_CHARCOAL_BROWN: '#33251F',
  SOFT_BEIGE: '#E4D7CC',
  MUTED_TAUPE: '#B09C8D',
  LIGHT_TAUPE: '#E4D7CC',
});

// Editorial Theme Chapters (Light-First Hierarchy)
export const DARK_COLOR_CHAPTERS = Object.freeze({
  hero: {
    bg: MASTER_COLORS.WARM_IVORY,
    border: MASTER_COLORS.LIGHT_BEIGE,
    heading: MASTER_COLORS.DEEP_ESPRESSO,
    headingItalic: MASTER_COLORS.COFFEE_BROWN,
    text: MASTER_COLORS.MOCHA_BROWN,
    accent: MASTER_COLORS.MOCHA_BROWN,
    surfaceCard: MASTER_COLORS.PURE_WHITE,
    surfaceCardText: MASTER_COLORS.DEEP_ESPRESSO,
  },
  categories: {
    bg: MASTER_COLORS.CREAM_LATTE,
    border: MASTER_COLORS.MUTED_BEIGE,
    heading: MASTER_COLORS.DEEP_ESPRESSO,
    text: MASTER_COLORS.MOCHA_BROWN,
    accent: MASTER_COLORS.COFFEE_BROWN,
    cardBg: MASTER_COLORS.PURE_WHITE,
    cardBorder: MASTER_COLORS.MUTED_BEIGE,
    cardText: MASTER_COLORS.DEEP_ESPRESSO,
  },
  showcase: {
    bg: MASTER_COLORS.WARM_CREAM,
    border: MASTER_COLORS.LIGHT_BEIGE,
    heading: MASTER_COLORS.DEEP_ESPRESSO,
    text: MASTER_COLORS.MOCHA_BROWN,
    accent: MASTER_COLORS.MOCHA_BROWN,
    controlBg: MASTER_COLORS.PURE_WHITE,
    controlBorder: MASTER_COLORS.MUTED_BEIGE,
  },
  cta: {
    bg: MASTER_COLORS.CREAM_LATTE,
    border: MASTER_COLORS.MUTED_BEIGE,
    heading: MASTER_COLORS.DEEP_ESPRESSO,
    text: MASTER_COLORS.MOCHA_BROWN,
    accent: MASTER_COLORS.MOCHA_BROWN,
  },
  footer: {
    bg: MASTER_COLORS.CREAM_LATTE,
    border: MASTER_COLORS.MUTED_BEIGE,
    heading: MASTER_COLORS.DEEP_ESPRESSO,
    text: MASTER_COLORS.COFFEE_BROWN,
    accent: MASTER_COLORS.MOCHA_BROWN,
  },
});

export const COLOR_CHAPTERS = Object.freeze({
  heroLight: {
    bg: MASTER_COLORS.WARM_IVORY,
    surface: MASTER_COLORS.PURE_WHITE,
    text: MASTER_COLORS.MOCHA_BROWN,
    heading: MASTER_COLORS.DEEP_ESPRESSO,
    accent: MASTER_COLORS.MOCHA_BROWN,
    muted: MASTER_COLORS.MUTED_MOCHA,
    border: MASTER_COLORS.LIGHT_BEIGE,
  },
});
