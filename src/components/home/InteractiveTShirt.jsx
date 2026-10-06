import React, { useState, useCallback, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import lottie from 'lottie-web/build/player/lottie_light';
import garmentAnimationData from '../../assets/animations/animated_garment.json';

// Curated YK MENS FASHION Brand Story Messages (Deterministic sequence)
const BRAND_MESSAGES = [
  'YK MENS FASHION — Built for everyday confidence.',
  "Designed for modern men's wardrobes.",
  'Simple pieces. Strong presence.',
  'Explore the collection.',
];

// Refined luxury cubic bezier for editorial transitions
const luxuryEase = [0.22, 1, 0.36, 1];

/**
 * AnimatedGarmentInteraction (InteractiveTShirt)
 * 
 * A living fashion artwork micro-interaction for the YK MENS FASHION Hero:
 * - Powered by a genuine pre-animated vector Lottie garment asset (intrinsic linework construction loop)
 * - Restrained editorial presentation in warm ivory/mocha palette (no generic circle, no status dots)
 * - Click/tap cycles through brand storytelling messages with zero counters or UI clutter
 * - Accessible with keyboard activation (Enter/Space), ARIA roles, and reduced-motion support
 */
export const InteractiveTShirt = memo(function InteractiveTShirt({ className = '' }) {
  const shouldReduceMotion = useReducedMotion();
  const [messageIndex, setMessageIndex] = useState(null);
  const animContainerRef = useRef(null);
  const animInstanceRef = useRef(null);
  const loopTimeoutRef = useRef(null);

  // Initialize continuous intrinsic Lottie animation
  useEffect(() => {
    if (!animContainerRef.current) return;

    // Load lightweight SVG vector animation
    const anim = lottie.loadAnimation({
      container: animContainerRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: !shouldReduceMotion,
      animationData: garmentAnimationData,
    });
    animInstanceRef.current = anim;

    const handleComplete = () => {
      loopTimeoutRef.current = setTimeout(() => {
        if (animInstanceRef.current) {
          animInstanceRef.current.goToAndPlay(0, true);
        }
      }, 1600);
    };

    if (shouldReduceMotion) {
      // Freeze on fully drawn garment for users with motion sensitivity
      anim.goToAndStop(100, true);
    } else {
      // Continuous living loop: draws the garment, holds gracefully, and repeats
      anim.addEventListener('complete', handleComplete);
    }

    return () => {
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
      anim.removeEventListener('complete', handleComplete);
      anim.destroy();
      animInstanceRef.current = null;
    };
  }, [shouldReduceMotion]);

  // Cycle to next brand message
  const handleNextMessage = useCallback(() => {
    setMessageIndex((prev) => (prev === null ? 0 : (prev + 1) % BRAND_MESSAGES.length));
    if (animInstanceRef.current && !shouldReduceMotion) {
      animInstanceRef.current.play();
    }
  }, [shouldReduceMotion]);

  const handleDismissMessage = useCallback((e) => {
    e.stopPropagation();
    setMessageIndex(null);
  }, []);

  return (
    <div
      className={`relative inline-flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-3.5 ${className}`}
      role="region"
      aria-label="YK Mens Fashion Garment Interaction"
    >
      {/* Editorial Garment Vignette */}
      <motion.button
        type="button"
        onClick={handleNextMessage}
        whileHover={shouldReduceMotion ? {} : { y: -2 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
        aria-label={
          messageIndex === null
            ? 'Explore YK MENS FASHION brand note'
            : 'Next brand note'
        }
        aria-expanded={messageIndex !== null}
        className="relative group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#FFFFFF] rounded-2xl border border-[#E4D7CC] shadow-[0_2px_14px_rgba(74,58,50,0.06)] hover:border-[#B09C8D] hover:shadow-[0_4px_20px_rgba(74,58,50,0.1)] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#4A3A32] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF7F2] cursor-pointer transition-all duration-300 select-none shrink-0"
      >
        {/* Subtle decorative top tailor notch accent */}
        <span
          className="absolute top-1.5 inset-x-4 h-[1px] bg-[#EADFD4] rounded-full group-hover:bg-[#C5B3A4] transition-colors"
          aria-hidden="true"
        />

        {/* Intrinsic Pre-Animated Garment Asset Container */}
        <div
          ref={animContainerRef}
          className="w-11 h-11 sm:w-13 sm:h-13 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        />

        {/* Subtle decorative bottom tailor notch accent */}
        <span
          className="absolute bottom-1.5 inset-x-4 h-[1px] bg-[#EADFD4] rounded-full group-hover:bg-[#C5B3A4] transition-colors"
          aria-hidden="true"
        />
      </motion.button>

      {/* Editorial Brand Message Reveal */}
      <AnimatePresence mode="wait">
        {messageIndex !== null && (
          <motion.div
            key="story-container"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -8, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 6, scale: 0.98 }}
            transition={{ duration: 0.3, ease: luxuryEase }}
            className="relative flex items-center max-w-full"
          >
            {/* Fine architectural hairline connector (desktop/tablet) */}
            <span
              className="hidden sm:block w-3 h-px bg-[#D8C8BA] shrink-0"
              aria-hidden="true"
            />

            {/* Editorial Story Panel */}
            <div
              onClick={handleNextMessage}
              role="status"
              aria-live="polite"
              className="relative flex items-center justify-between gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-[#FFFFFF] border border-[#E4D7CC] rounded-xl shadow-[0_4px_18px_rgba(74,58,50,0.07)] hover:border-[#B09C8D] transition-colors max-w-[270px] sm:max-w-[340px] cursor-pointer"
            >
              {/* Tailored vertical accent seam in brand Mocha */}
              <span
                className="w-[2px] self-stretch bg-[#4A3A32] rounded-full shrink-0"
                aria-hidden="true"
              />

              {/* Story Content with typography hierarchy */}
              <div className="flex flex-col min-w-0 pr-1">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={messageIndex}
                    initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -3 }}
                    transition={{ duration: 0.22, ease: luxuryEase }}
                    className="font-serif italic text-xs sm:text-[13px] text-[#33251F] leading-snug tracking-wide line-clamp-2 select-none"
                  >
                    &ldquo;{BRAND_MESSAGES[messageIndex]}&rdquo;
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Subtle Dismiss Control */}
              <button
                type="button"
                onClick={handleDismissMessage}
                aria-label="Dismiss message"
                className="p-1 text-[#B09C8D] hover:text-[#33251F] rounded-lg hover:bg-[#FAF7F2] transition-colors focus:outline-hidden focus-visible:ring-1 focus-visible:ring-[#4A3A32] shrink-0 self-center cursor-pointer"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default InteractiveTShirt;
