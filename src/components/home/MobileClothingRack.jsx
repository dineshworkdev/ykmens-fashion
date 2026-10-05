import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
  animate,
  useReducedMotion,
} from 'framer-motion';
import { AnimatedArrowRight } from '../common/AnimatedIcons';

/**
 * MobileClothingRack:
 * Tactile, mobile-first garment rail / clothing rack interaction.
 * 
 * Visual Architecture:
 * - Real architectural clothing rail running horizontally across the section.
 * - Garments hang physically from the rail with realistic hanger hooks and sculpted shoulder bars.
 * - Multiple garments visible at once (center primary garment flanked by partially visible neighbors).
 * - Avoids isolated rectangular card boxes; conveys physical fabric suspended on a luxury boutique rail.
 * 
 * Mobile Touch Physics:
 * - DRAG -> MOVE ALONG RAIL -> MOMENTUM -> SETTLE.
 * - touchAction: 'pan-y' allows natural native vertical page scrolling without scroll-jacking.
 * - Horizontal gestures control rack sliding with spring momentum.
 * - Centered garment becomes prominent (scale 1.0, full opacity, prominent depth).
 * - Surrounding garments tuck back slightly (scale 0.84, lower opacity, subtle hanger sway).
 * - Tapping centered garment navigates to product details. Tapping side garments scrolls them into focus.
 * - Full prefers-reduced-motion support.
 */

// Spacing constants for mobile viewport
const ITEM_WIDTH = 216; // width of each hanging garment
const ITEM_GAP = 24;    // physical gap along rail
const SPACING = ITEM_WIDTH + ITEM_GAP; // 240px center-to-center

/**
 * Individual Hanging Garment Component:
 * Binds directly to the continuous trackX motion value on the GPU.
 */
const HangingGarment = ({
  product,
  index,
  total,
  trackX,
  activeIndex,
  onSelect,
  shouldReduceMotion,
  isDraggingRef,
}) => {
  const navigate = useNavigate();

  // Relative distance of this garment from the center of the mobile screen
  const offsetFromCenter = useTransform(trackX, (x) => x + index * SPACING);

  // Dynamic scale: 1.0 at center, scaling down to 0.84 on sides
  const scale = useTransform(
    offsetFromCenter,
    [-SPACING * 1.5, -SPACING, 0, SPACING, SPACING * 1.5],
    shouldReduceMotion
      ? [1, 1, 1, 1, 1]
      : [0.78, 0.84, 1.0, 0.84, 0.78]
  );

  // Dynamic opacity: 1.0 at center, gracefully fading on sides
  const opacity = useTransform(
    offsetFromCenter,
    [-SPACING * 2, -SPACING, 0, SPACING, SPACING * 2],
    [0.45, 0.75, 1.0, 0.75, 0.45]
  );

  // Dynamic Z-Index: centered garment rests in front of neighbors
  const zIndex = useTransform(offsetFromCenter, (dist) =>
    Math.round(40 - Math.min(35, (Math.abs(dist) / SPACING) * 12))
  );

  // Physical hanger sway angle as garment travels along rail
  const rotateZ = useTransform(
    offsetFromCenter,
    [-SPACING, 0, SPACING],
    shouldReduceMotion ? [0, 0, 0] : [-2.5, 0, 2.5]
  );

  // Slight vertical elevation: center garment hangs proud; sides drop slightly
  const y = useTransform(
    offsetFromCenter,
    [-SPACING, 0, SPACING],
    shouldReduceMotion ? [0, 0, 0] : [6, 0, 6]
  );

  const handleClick = (e) => {
    // If the user was dragging/swiping, do not trigger click
    if (isDraggingRef.current) {
      e.preventDefault();
      return;
    }

    if (index === activeIndex) {
      // Centered garment tapped: Navigate to product detail
      navigate(`/product/${product.slug}`);
    } else {
      // Side garment tapped: Center it on the rail
      e.preventDefault();
      onSelect(index);
    }
  };

  const isCurrentCenter = index === activeIndex;

  return (
    <motion.div
      style={{
        width: ITEM_WIDTH,
        scale,
        opacity,
        zIndex,
        rotateZ,
        y,
        transformOrigin: '50% 0%', // hangs naturally from top hook
        touchAction: 'pan-y',
      }}
      className="shrink-0 select-none cursor-pointer flex flex-col items-center"
      onClick={handleClick}
    >
      {/* =====================================================================
          HANGER HOOK & SHOULDER ASSEMBLY
          Visually anchors the garment directly onto the horizontal clothing rail
          ===================================================================== */}
      <div className="relative w-full flex flex-col items-center pointer-events-none -mb-1">
        {/* Metal Hanger Hook looping over rail */}
        <div className="relative w-8 h-8 flex items-center justify-center">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            className="w-7 h-7 drop-shadow-xs"
            aria-hidden="true"
          >
            {/* Hook curve sitting over the rail */}
            <path
              d="M 16 28 L 16 17 C 16 11, 23 10, 23 5 C 23 1.5, 17 0.5, 14 3.5"
              stroke="#6B5549"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Metallic brass highlight reflection on hook */}
            <path
              d="M 16 26 L 16 18 C 16 13, 21.5 12, 21.5 6 C 21.5 3.5, 17.5 2, 15 4"
              stroke="#C4B2A2"
              strokeWidth="1"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
            {/* Swivel collar rivet connecting hook to wooden hanger */}
            <circle cx="16" cy="28" r="2.2" fill="#4A3A32" />
          </svg>
        </div>

        {/* Sculpted Wood/Brass Hanger Shoulder Bar */}
        <div className="relative w-[184px] h-3 -mt-1.5 flex items-center justify-center">
          <svg
            viewBox="0 0 184 14"
            fill="none"
            className="w-full h-full drop-shadow-sm"
            aria-hidden="true"
          >
            {/* Contoured coat hanger contour */}
            <path
              d="M 4 12 C 30 10, 70 3, 92 3 C 114 3, 154 10, 180 12 C 182 12.5, 182 14, 180 14 C 154 12, 114 6, 92 6 C 70 6, 30 12, 4 14 C 2 14, 2 12.5, 4 12 Z"
              fill="url(#hangerWoodGrad)"
            />
            {/* Wood edge bevel highlight */}
            <path
              d="M 6 12 C 32 10, 71 3.5, 92 3.5 C 113 3.5, 152 10, 178 12"
              stroke="#A89582"
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity="0.85"
            />
            <defs>
              <linearGradient id="hangerWoodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#33251F" />
                <stop offset="25%" stopColor="#4A3A32" />
                <stop offset="50%" stopColor="#5A483E" />
                <stop offset="75%" stopColor="#4A3A32" />
                <stop offset="100%" stopColor="#33251F" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* =====================================================================
          HANGING GARMENT BODY
          Draped menswear silhouette suspended in space (NOT an isolated card)
          ===================================================================== */}
      <div
        className={`relative w-full aspect-[3/4.2] rounded-b-2xl rounded-t-sm overflow-hidden transition-all duration-300 ${
          isCurrentCenter
            ? 'shadow-[0_20px_40px_-10px_rgba(74,58,50,0.28)] ring-1 ring-[#D8C8BA]'
            : 'shadow-[0_12px_24px_-8px_rgba(74,58,50,0.18)] opacity-95'
        } bg-[#FAF7F2]`}
      >
        {/* Garment Photography */}
        {product.images && product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-top will-change-transform pointer-events-none"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#8B7768] text-xs font-mono">
            YK TAILORED
          </div>
        )}

        {/* Soft fabric ambient light vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#33251F]/30 via-transparent to-[#FAF7F2]/10 pointer-events-none" />

        {/* Tailored Fabric Label at Hem */}
        <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between pointer-events-none">
          <span className="px-2 py-0.5 bg-[#FAF7F2]/95 backdrop-blur-xs text-[#33251F] text-[9px] font-mono tracking-widest uppercase rounded-sm border border-[#D8C8BA]/80 shadow-2xs">
            {product.category || 'Atelier'}
          </span>
          {isCurrentCenter && (
            <span className="px-2 py-0.5 bg-[#4A3A32]/90 text-[#FAF7F2] text-[9px] font-mono tracking-wider rounded-sm shadow-2xs">
              IN FOCUS
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const MobileClothingRack = ({ products = [] }) => {
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartTimeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const total = products.length;
  // Maximum drag boundary on the left
  const maxDrag = Math.max(0, (total - 1) * SPACING);

  // Continuous motion value driving the rail position
  const trackX = useMotionValue(0);

  // Monitor track position and update activeIndex when a garment settles near center
  useMotionValueEvent(trackX, 'change', (latest) => {
    const rawIndex = Math.round(-latest / SPACING);
    const clampedIndex = Math.max(0, Math.min(total - 1, rawIndex));
    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex);
    }
  });

  // Animate rack smoothly to a specific garment index
  const scrollToIndex = useCallback(
    (index) => {
      const targetX = -index * SPACING;
      animate(trackX, targetX, {
        type: 'spring',
        stiffness: 260,
        damping: 28,
        mass: 0.8,
      });
      setActiveIndex(index);
    },
    [trackX]
  );

  const handleDragStart = () => {
    isDraggingRef.current = true;
    dragStartTimeRef.current = Date.now();
  };

  const handleDragEnd = () => {
    // Release drag lock slightly after drag ends to prevent accidental tap navigation
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 120);
  };

  const activeProduct = products[activeIndex] || products[0];

  if (!products || products.length === 0) return null;

  return (
    <div className="w-full relative py-2 select-none overflow-hidden" ref={containerRef}>
      {/* Hint badge: Subtle physical prompt */}
      <div className="flex items-center justify-between mb-4 px-1">
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#8B7768] flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4A3A32] inline-block animate-pulse" />
          <span>Garment Rail • Swipe along rack</span>
        </span>
        <span className="text-[10px] font-mono text-[#8B7768]">
          0{activeIndex + 1} / 0{total}
        </span>
      </div>

      {/* =========================================================================
          HORIZONTAL CLOTHING RAIL
          Architectural brushed bronze/mocha metal rod running across entire width
          ========================================================================= */}
      <div className="relative w-full flex items-center mb-0 px-1 pointer-events-none z-30">
        {/* Left mounting bracket */}
        <div className="w-2.5 h-7 rounded-r-md bg-gradient-to-r from-[#33251F] to-[#5A483E] shadow-sm shrink-0" />

        {/* Main horizontal cylindrical rail */}
        <div className="relative flex-1 h-[7px] bg-gradient-to-b from-[#A89582] via-[#6B5549] to-[#33251F] rounded-full shadow-xs">
          {/* Top highlight reflection stripe */}
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-[#FAF7F2]/60 rounded-full" />
          {/* Lower drop shadow */}
          <div className="absolute inset-x-0 -bottom-[3px] h-[3px] bg-[#33251F]/15 blur-[1px]" />
        </div>

        {/* Right mounting bracket */}
        <div className="w-2.5 h-7 rounded-l-md bg-gradient-to-l from-[#33251F] to-[#5A483E] shadow-sm shrink-0" />
      </div>

      {/* =========================================================================
          DRAGGABLE GARMENT RACK STAGE
          Horizontal drag gestures move garments along rail with natural momentum.
          touch-action: pan-y preserves native vertical page scrolling.
          ========================================================================= */}
      <div
        className="relative w-full overflow-hidden pt-2 pb-6 -mt-3.5"
        style={{ touchAction: 'pan-y' }}
      >
        {/* Subtle boutique ambient shadow gradient on sides */}
        <div className="absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-[#F5EFE8] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-6 bg-gradient-to-l from-[#F5EFE8] to-transparent z-20 pointer-events-none" />

        {/* Draggable container with exact viewport-center padding */}
        <div
          className="w-full flex"
          style={{
            paddingLeft: `calc(50% - ${ITEM_WIDTH / 2}px)`,
            paddingRight: `calc(50% - ${ITEM_WIDTH / 2}px)`,
          }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: -maxDrag, right: 0 }}
            dragElastic={0.12}
            dragTransition={{
              power: 0.18,
              timeConstant: 220,
              modifyTarget: (target) => Math.round(target / SPACING) * SPACING,
            }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            style={{
              x: trackX,
              touchAction: 'pan-y',
            }}
            className="flex items-start will-change-transform cursor-grab active:cursor-grabbing"
          >
            {products.map((product, index) => (
              <div
                key={product.id || product.slug || index}
                style={{
                  marginRight: index === total - 1 ? 0 : ITEM_GAP,
                }}
              >
                <HangingGarment
                  product={product}
                  index={index}
                  total={total}
                  trackX={trackX}
                  activeIndex={activeIndex}
                  onSelect={scrollToIndex}
                  shouldReduceMotion={shouldReduceMotion}
                  isDraggingRef={isDraggingRef}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* =========================================================================
          CENTERED GARMENT EDITORIAL INFORMATION PANEL
          Clean, non-cluttered details for the currently active garment on the rack.
          Tapping navigates directly to the product detail page.
          ========================================================================= */}
      {activeProduct && (
        <div className="mt-2 pt-4 border-t border-[#E4D7CC] flex flex-col items-center text-center px-4">
          {/* Rail Position Notches */}
          <div className="flex items-center space-x-2 mb-3">
            {products.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Slide to garment ${i + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  i === activeIndex
                    ? 'w-6 h-1.5 bg-[#4A3A32]'
                    : 'w-1.5 h-1.5 bg-[#D8C8BA] hover:bg-[#A89582]'
                }`}
              />
            ))}
          </div>

          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#8B7768] block mb-1">
            Wardrobe • {activeProduct.category || 'Curated'}
          </span>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#33251F] tracking-tight mb-1 line-clamp-1">
            {activeProduct.name}
          </h3>

          <p className="text-xs text-[#6B5549] max-w-xs mx-auto line-clamp-1 mb-3">
            {activeProduct.description || 'Premium tailored construction crafted with pure mercerized cotton.'}
          </p>

          <Link
            to={`/product/${activeProduct.slug}`}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-bold text-[#4A3A32] hover:text-[#33251F] transition-colors border-b border-[#4A3A32] pb-0.5 active:opacity-75 group"
          >
            <span>View Garment Details</span>
            <AnimatedArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileClothingRack;
