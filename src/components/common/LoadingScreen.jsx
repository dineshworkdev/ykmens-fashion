import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * YK MENS FASHION - Approved Brand Intro Loading Experience
 * 
 * STRICT COMPLIANCE:
 * - Uses the locked, approved brand asset /videos/animation.svg as provided.
 * - Zero modification, recoloring, or effects over the SVG.
 * - Perfectly centered and contained.
 * - Plays naturally (~3.1s for the 2.75s keyframe cycle) before a cinematic fade reveal.
 */
export const LoadingScreen = ({ onComplete }) => {
  useEffect(() => {
    // 3150ms allows the 2.75s animation sequence to complete naturally
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 3150);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      key="yk-loading-screen"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1], // Smooth luxury deceleration
        },
      }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFFFFF] select-none"
      aria-label="YK MENS FASHION Loading Intro"
    >
      {/* Centered natural presentation matching the #FFFFFF stage */}
      <div className="relative w-[85vw] max-w-[420px] aspect-square flex items-center justify-center">
        <img
          src="/videos/animation.svg"
          alt="YK MENS FASHION"
          className="w-full h-full object-contain pointer-events-none select-none"
          loading="eager"
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
