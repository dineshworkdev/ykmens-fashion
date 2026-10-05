import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
  memo,
} from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
  animate,
  useReducedMotion,
} from 'framer-motion';
import ProductCard from '../product/ProductCard';

/**
 * GarmentRackShowcase:
 * Physical, believable Boutique Clothing Rack for both Mobile and Desktop.
 * 
 * Physical Hierarchy:
 * FLOOR / POST STRUCTURE
 *       ↓
 * HORIZONTAL RACK PIPE
 *       ↓
 * HANGER HOOK (visibly wraps over the pipe)
 *       ↓
 * HANGER BODY (shoulders & mounting clamps)
 *       ↓
 * PRODUCT CARD (existing ProductCard with showcase={true})
 * 
 * Strict Physical Rules:
 * - The horizontal pipe is the actual support structure.
 * - Hanger hook visibly wraps around and rests on the top of the pipe.
 * - Hanger body connects the hook directly to the card frame immediately below it (zero floating gaps).
 * - The entire hanging unit (Hanger + Card) moves together along the pipe.
 * - transformOrigin: '50% 24px' (the pipe contact point) ensures centered scaling never lifts the hook off the pipe.
 * - All unwanted artificial experiment labels removed.
 */

// Responsive geometry parameters for mobile and desktop
function getRackParams(width) {
  if (width < 640) {
    const cardWidth = Math.min(270, Math.max(240, width * 0.74));
    return {
      cardWidth,
      gap: 22,
      spacing: cardWidth + 22,
      sideScale: 0.88,
      sideOpacity: 0.72,
    };
  } else if (width < 1024) {
    return {
      cardWidth: 290,
      gap: 26,
      spacing: 316,
      sideScale: 0.90,
      sideOpacity: 0.76,
    };
  } else {
    return {
      cardWidth: 320,
      gap: 36,
      spacing: 356,
      sideScale: 0.92,
      sideOpacity: 0.82,
    };
  }
}

/**
 * HangingUnit:
 * A single, cohesive physical object: Hanger Hook + Hanger Body + Product Card.
 * Slides along the horizontal pipe as one unified entity.
 */
const HangingUnit = memo(function HangingUnit({
  product,
  index,
  total,
  trackX,
  params,
  activeIndex,
  onSelect,
  shouldReduceMotion,
  isDraggingRef,
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Relative distance of this unit from the center of the rack
  const offsetFromCenter = useTransform(
    trackX,
    (x) => x + index * params.spacing
  );

  // Scale: Centered card is 1.0, side cards scale slightly smaller
  // Transform origin is pinned to Y = 24px (the exact pipe contact point) so the hook never detaches
  const scale = useTransform(
    offsetFromCenter,
    [
      -params.spacing * 1.5,
      -params.spacing,
      0,
      params.spacing,
      params.spacing * 1.5,
    ],
    shouldReduceMotion
      ? [1, 1, 1, 1, 1]
      : [
          params.sideScale * 0.95,
          params.sideScale,
          1.0,
          params.sideScale,
          params.sideScale * 0.95,
        ]
  );

  // Dynamic opacity: 1.0 at center, gracefully fading in depth on sides
  const opacity = useTransform(
    offsetFromCenter,
    [
      -params.spacing * 2,
      -params.spacing,
      0,
      params.spacing,
      params.spacing * 2,
    ],
    [0.4, params.sideOpacity, 1.0, params.sideOpacity, 0.4]
  );

  // Z-Index: centered card rests in front of neighbors
  const zIndex = useTransform(offsetFromCenter, (dist) =>
    Math.round(40 - Math.min(35, (Math.abs(dist) / params.spacing) * 12))
  );

  // Natural restrained hanger sway along the rail during motion
  const rotateZ = useTransform(
    offsetFromCenter,
    [-params.spacing, 0, params.spacing],
    shouldReduceMotion ? [0, 0, 0] : [-1.2, 0, 1.2]
  );

  const handleClick = (e) => {
    // If the user was actively dragging, do not focus or navigate
    if (isDraggingRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Clicking a side card focuses and centers it on the rack
    if (index !== activeIndex) {
      e.preventDefault();
      e.stopPropagation();
      onSelect(index);
    }
  };

  const isCurrentCenter = index === activeIndex;

  return (
    <motion.div
      style={{
        width: `${params.cardWidth}px`,
        scale,
        opacity,
        zIndex,
        rotateZ,
        transformOrigin: '50% 24px', // Physical contact point where the hook rests on the pipe!
        touchAction: 'pan-y',
      }}
      className="shrink-0 select-none flex flex-col items-center cursor-pointer will-change-transform"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* =========================================================================
          HANGER ASSEMBLY (Hook + Shoulders + Card Mounting Clamps)
          Visibly wraps over the pipe and holds the card from its top edge.
          ========================================================================= */}
      <div className="relative w-full flex flex-col items-center pointer-events-none z-20">
        {/* Metal Hook: Physically loops over the horizontal pipe */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          <svg
            viewBox="0 0 40 40"
            fill="none"
            className="w-10 h-10 drop-shadow-xs overflow-visible"
            aria-hidden="true"
          >
            {/* Rear stem going behind the pipe down to the hanger shoulders */}
            <path
              d="M 20 24 L 20 38"
              stroke="#4A3A32"
              strokeWidth="2.8"
              strokeLinecap="round"
            />
            {/* Hook Arch: Resting on top of the pipe surface (Y=24) and curving over it */}
            <path
              d="M 20 24 C 20 16, 29 15, 29 9 C 29 4, 21 2, 17 6 C 14.5 8.5, 14 13, 14 18 C 14 24, 15 28, 16 30"
              stroke="#6B5549"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Polished bronze reflection luster highlight on the front curve */}
            <path
              d="M 19 22 C 19 17, 27.5 16, 27.5 9.5 C 27.5 5.5, 21.5 3.5, 18 7 C 15.5 9.5, 15 14, 15 19 C 15 24, 15.5 27, 16.5 29"
              stroke="#C4B2A2"
              strokeWidth="0.9"
              strokeLinecap="round"
              fill="none"
              opacity="0.9"
            />
            {/* Swivel collar rivet anchoring the hook to the wooden shoulder bar */}
            <circle cx="20" cy="38" r="2.8" fill="#33251F" />
            <circle cx="20" cy="38" r="1.2" fill="#C4B2A2" />
          </svg>
        </div>

        {/* Sculpted Luxury Wooden Hanger Shoulders */}
        <div className="relative w-[84%] max-w-[248px] h-5 -mt-1 flex items-center justify-center">
          <svg
            viewBox="0 0 248 20"
            fill="none"
            className="w-full h-full drop-shadow-sm overflow-visible"
            aria-hidden="true"
          >
            {/* Contoured Coat Hanger Shoulder Contour */}
            <path
              d="M 8 18 C 42 13, 94 3, 124 3 C 154 3, 206 13, 240 18 C 242 18.5, 242 20, 240 20 C 206 16, 154 7, 124 7 C 94 7, 42 16, 8 20 C 6 20, 6 18.5, 8 18 Z"
              fill="url(#hangerWoodGradPhysical)"
            />
            {/* Upper wood bevel highlight line */}
            <path
              d="M 10 18 C 44 13.5, 95 3.8, 124 3.8 C 153 3.8, 204 13.5, 238 18"
              stroke="#A89582"
              strokeWidth="0.9"
              strokeLinecap="round"
              opacity="0.85"
            />
            <defs>
              <linearGradient
                id="hangerWoodGradPhysical"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#33251F" />
                <stop offset="25%" stopColor="#4A3A32" />
                <stop offset="50%" stopColor="#5A483E" />
                <stop offset="75%" stopColor="#4A3A32" />
                <stop offset="100%" stopColor="#33251F" />
              </linearGradient>
            </defs>
          </svg>

          {/* Heavy-duty brass card-mounting clamps clasping the card's top frame */}
          <div className="absolute -bottom-1 left-5 w-4 h-3.5 rounded-xs bg-gradient-to-b from-[#6B5549] to-[#33251F] shadow-xs border border-[#C4B2A2]/60 z-30" />
          <div className="absolute -bottom-1 right-5 w-4 h-3.5 rounded-xs bg-gradient-to-b from-[#6B5549] to-[#33251F] shadow-xs border border-[#C4B2A2]/60 z-30" />
        </div>
      </div>

      {/* =========================================================================
          EXISTING PRODUCT CARD
          Held physically by the hanger immediately below it (zero floating gap).
          The product photograph remains completely clean inside the card.
          ========================================================================= */}
      <div
        className={`relative z-10 w-full -mt-0.5 transition-shadow duration-300 ${
          isCurrentCenter
            ? 'shadow-[0_24px_48px_-12px_rgba(74,58,50,0.25)]'
            : isHovered
            ? 'shadow-[0_18px_36px_-8px_rgba(74,58,50,0.18)]'
            : 'shadow-[0_12px_24px_-6px_rgba(74,58,50,0.12)]'
        } rounded-2xl`}
      >
        <ProductCard
          product={product}
          showcase={true}
          className="w-full pointer-events-auto"
        />
      </div>
    </motion.div>
  );
});

export const GarmentRackShowcase = forwardRef(function GarmentRackShowcase(
  { products = [], className = '' },
  ref
) {
  const containerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Responsive stage parameters
  const [params, setParams] = useState(() =>
    getRackParams(typeof window !== 'undefined' ? window.innerWidth : 1200)
  );

  const total = products.length;
  const maxDrag = Math.max(0, (total - 1) * params.spacing);

  // Continuous motion value driving the rack translation along the pipe
  const trackX = useMotionValue(0);

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      setParams(getRackParams(window.innerWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Monitor track position and update activeIndex when a card settles near center
  useMotionValueEvent(trackX, 'change', (latest) => {
    const rawIndex = Math.round(-latest / params.spacing);
    const clampedIndex = Math.max(0, Math.min(total - 1, rawIndex));
    if (clampedIndex !== activeIndex) {
      setActiveIndex(clampedIndex);
    }
  });

  // Animate rack smoothly to a specific card index
  const scrollToIndex = useCallback(
    (index) => {
      const targetIndex = Math.max(0, Math.min(total - 1, index));
      const targetX = -targetIndex * params.spacing;
      animate(trackX, targetX, {
        type: 'spring',
        stiffness: 260,
        damping: 28,
        mass: 0.8,
      });
      setActiveIndex(targetIndex);
    },
    [trackX, total, params.spacing]
  );

  // Expose prev() and next() methods for header navigation buttons
  useImperativeHandle(
    ref,
    () => ({
      prev: () => scrollToIndex(activeIndex - 1),
      next: () => scrollToIndex(activeIndex + 1),
      scrollToIndex,
    }),
    [activeIndex, scrollToIndex]
  );

  const handleDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleDragEnd = () => {
    // Release drag lock slightly after drag ends to prevent accidental link click
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 140);
  };

  if (!products || products.length === 0) return null;

  return (
    <div
      className={`w-full relative py-2 select-none overflow-hidden ${className}`}
      ref={containerRef}
    >
      {/* =========================================================================
          PHYSICAL CLOTHING RACK FRAME
          - Standing vertical upright posts on left and right (Floor/Structure)
          - Solid horizontal cylindrical crossbar pipe spanning across
          ========================================================================= */}
      <div className="relative w-full flex items-center mb-0 pointer-events-none z-10">
        {/* Left Vertical Upright Post with Floor Mount Bracket */}
        <div className="flex flex-col items-center shrink-0 z-20">
          <div className="w-3.5 h-10 rounded-r-md bg-gradient-to-r from-[#33251F] via-[#5A483E] to-[#4A3A32] shadow-md border-r border-[#6B5549]" />
        </div>

        {/* Horizontal Crossbar Pipe (Y-coordinate aligns with the hanger hooks) */}
        <div className="relative flex-1 h-[14px] bg-gradient-to-b from-[#FAF7F2] via-[#8B7768] to-[#33251F] rounded-full shadow-sm mx-[-4px] z-10">
          {/* Top brushed metallic reflection streak */}
          <div className="absolute inset-x-0 top-[1px] h-[2.5px] bg-[#FFFFFF]/85 rounded-full" />
          {/* Underside ambient depth drop-shadow */}
          <div className="absolute inset-x-0 -bottom-[4px] h-[4px] bg-[#33251F]/20 blur-[1.5px]" />
        </div>

        {/* Right Vertical Upright Post with Floor Mount Bracket */}
        <div className="flex flex-col items-center shrink-0 z-20">
          <div className="w-3.5 h-10 rounded-l-md bg-gradient-to-l from-[#33251F] via-[#5A483E] to-[#4A3A32] shadow-md border-l border-[#6B5549]" />
        </div>
      </div>

      {/* =========================================================================
          DRAGGABLE CLOTHING RACK STAGE
          Horizontal drag gestures move the entire unit (Hanger + Card) along the pipe.
          touch-action: pan-y preserves native vertical page scrolling.
          ========================================================================= */}
      <div
        className="relative w-full overflow-hidden pt-0 pb-6 -mt-[25px]"
        style={{ touchAction: 'pan-y' }}
      >
        {/* Subtle boutique ambient shadow gradient on sides */}
        <div className="absolute top-0 bottom-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#F5EFE8] to-transparent z-30 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#F5EFE8] to-transparent z-30 pointer-events-none" />

        {/* Draggable container with exact viewport-center padding */}
        <div
          className="w-full flex"
          style={{
            paddingLeft: `calc(50% - ${params.cardWidth / 2}px)`,
            paddingRight: `calc(50% - ${params.cardWidth / 2}px)`,
          }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: -maxDrag, right: 0 }}
            dragElastic={0.12}
            dragTransition={{
              power: 0.16,
              timeConstant: 220,
              modifyTarget: (target) =>
                Math.round(target / params.spacing) * params.spacing,
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
                  marginRight: index === total - 1 ? 0 : params.gap,
                }}
              >
                <HangingUnit
                  product={product}
                  index={index}
                  total={total}
                  trackX={trackX}
                  params={params}
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
    </div>
  );
});

export default GarmentRackShowcase;
