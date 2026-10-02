/**
 * YK MENS FASHION - Animation & Motion Architecture
 * 
 * Refined Framer Motion variants, easing curves, and spring configs
 * for the Phase 4 Visual Polish pass.
 */

// Refined cubic bezier curves for luxury menswear aesthetics
export const luxuryEase = [0.22, 1, 0.36, 1];
export const smoothOut = [0.0, 0.0, 0.2, 1.0];

// Refined spring configs for physical, haptic feel
export const MOTION_SPRINGS = Object.freeze({
  snappy: { type: 'spring', stiffness: 420, damping: 28 },
  gentle: { type: 'spring', stiffness: 220, damping: 24 },
  slow: { type: 'spring', stiffness: 120, damping: 20 },
});

// Editorial Image Clip-Path Reveal System
export const clipRevealVariants = {
  hidden: {
    clipPath: 'inset(12% 0% 0% 0% round 1.5rem)',
    opacity: 0,
    scale: 1.04,
  },
  visible: {
    clipPath: 'inset(0% 0% 0% 0% round 1.5rem)',
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.85,
      ease: luxuryEase,
    },
  },
};

// Horizontal Directional Wipe Reveal
export const directionalWipeVariants = {
  hidden: {
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
    scale: 1.05,
    opacity: 0.5,
  },
  visible: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: luxuryEase,
    },
  },
};

// Staggered Headline Text Line Reveal
export const textLineVariants = {
  hidden: {
    y: '105%',
    opacity: 0,
  },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: luxuryEase,
    },
  },
};

// Staggered Container for Lists and Grids
export const staggerContainer = (staggerTime = 0.08, delay = 0.05) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerTime,
      delayChildren: delay,
    },
  },
});

// Card Viewport Entry with Natural Elevation
export const cardViewportReveal = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: luxuryEase,
    },
  },
};

// Subtle Card Hover for Desktop
export const desktopCardHover = {
  rest: {
    y: 0,
    transition: { duration: 0.3, ease: luxuryEase },
  },
  hover: {
    y: -4,
    transition: { duration: 0.3, ease: luxuryEase },
  },
};

// Page Transition Variants for React Router
export const pageTransitions = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: luxuryEase },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2 },
  },
};
