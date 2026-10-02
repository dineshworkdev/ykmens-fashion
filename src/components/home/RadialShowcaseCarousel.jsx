import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { animate, useReducedMotion } from 'framer-motion';
import ProductCard from '../product/ProductCard';

/**
 * YK MENS FASHION - Phase 4A Radial Showcase Carousel
 * 
 * Strict Physical & Visual Rules:
 * - Products are physically arranged along the UPPER FRONT ARC of an invisible horizontal ring/donut.
 * - The donut/ring is NEVER visible (no circles, rings, 3D cylinders, or outlines).
 * - CENTER CARD:
 *   * VERY LARGE (100% scale)
 *   * 100% OPAQUE
 *   * STRAIGHT / UPRIGHT (0° rotation)
 *   * FRONT-MOST (highest z-index / depth)
 *   * Dominant, fully interactive (product clicks, wishlist, view product)
 * - SIDE CARDS:
 *   * Significantly smaller (~72-76% scale)
 *   * Visibly tilted in opposite directions along the circular arc
 *   * Visually behind the center card, secondary hierarchy
 *   * Reduced opacity (~0.80)
 *   * Tapping/clicking brings them to the center
 * - GESTURES & PHYSICS:
 *   * Real-time drag/swipe tracking
 *   * Smooth spring snap physics on release
 *   * Vertical scroll passthrough on mobile
 *   * Wrap-around continuous circular navigation
 *   * Accessible keyboard navigation (ArrowLeft / ArrowRight)
 *   * Reduced-motion support
 */

// Helper to calculate circular shortest offset in range [-N/2, N/2]
function getCircularOffset(itemIndex, currentPos, total) {
  if (total <= 0) return 0;
  let diff = (itemIndex - (currentPos % total)) % total;
  while (diff > total / 2) diff -= total;
  while (diff < -total / 2) diff += total;
  return diff;
}

// Compute responsive geometry parameters based on viewport width
function getResponsiveParams(width) {
  if (width < 640) {
    // Mobile (320px - 639px)
    const cardWidth = Math.min(290, Math.max(240, width * 0.76));
    return {
      cardWidth,
      rx: Math.min(460, Math.max(310, width * 1.05)),
      ry: 160,
      angleStepDeg: 24,
      tiltAngleDeg: 6.5,
      yAngleDeg: 12,
      depthStep: 60,
      sideScale: 0.72,
      dragSensitivity: 200,
    };
  } else if (width < 1024) {
    // Tablet (640px - 1023px)
    return {
      cardWidth: 320,
      rx: 680,
      ry: 230,
      angleStepDeg: 24,
      tiltAngleDeg: 7.0,
      yAngleDeg: 14,
      depthStep: 80,
      sideScale: 0.74,
      dragSensitivity: 260,
    };
  } else {
    // Desktop (1024px+)
    return {
      cardWidth: 360,
      rx: 860,
      ry: 290,
      angleStepDeg: 24,
      tiltAngleDeg: 7.5,
      yAngleDeg: 16,
      depthStep: 90,
      sideScale: 0.76,
      dragSensitivity: 300,
    };
  }
}

export const RadialShowcaseCarousel = forwardRef(function RadialShowcaseCarousel(
  { products = [], onActiveChange, className = '' },
  ref
) {
  const shouldReduceMotion = useReducedMotion();
  const total = products.length;

  // Continuous visual position along the invisible ring
  const [visualPos, setVisualPos] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Responsive stage parameters
  const [params, setParams] = useState(() =>
    getResponsiveParams(typeof window !== 'undefined' ? window.innerWidth : 1200)
  );

  const containerRef = useRef(null);
  const animControlsRef = useRef(null);
  const visualPosRef = useRef(0);
  visualPosRef.current = visualPos;

  // Pointer drag tracking refs
  const dragStateRef = useRef(null);

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      setParams(getResponsiveParams(window.innerWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth spring animation to a target position
  const animateTo = useCallback(
    (target, customVelocity = 0) => {
      if (total <= 0) return;
      if (animControlsRef.current) {
        animControlsRef.current.stop();
      }

      setIsAnimating(true);
      const start = visualPosRef.current;

      animControlsRef.current = animate(start, target, {
        type: shouldReduceMotion ? 'tween' : 'spring',
        duration: shouldReduceMotion ? 0.25 : undefined,
        stiffness: 260,
        damping: 28,
        mass: 0.8,
        velocity: customVelocity,
        restDelta: 0.001,
        onUpdate: (latest) => {
          setVisualPos(latest);
        },
        onComplete: () => {
          // Normalize to [0, total) to prevent floating-point drift over time
          const normalized = ((Math.round(target) % total) + total) % total;
          setVisualPos(normalized);
          setIsAnimating(false);
          if (onActiveChange) {
            onActiveChange(normalized);
          }
        },
      });
    },
    [total, shouldReduceMotion, onActiveChange]
  );

  // Navigation commands
  const navigate = useCallback(
    (direction) => {
      if (total <= 0) return;
      const current = Math.round(visualPosRef.current);
      const target = current + direction;
      animateTo(target);
    },
    [total, animateTo]
  );

  const goTo = useCallback(
    (index) => {
      if (total <= 0) return;
      const current = visualPosRef.current;
      const currentActive = Math.round(current);
      const diff = getCircularOffset(index, currentActive, total);
      animateTo(currentActive + diff);
    },
    [total, animateTo]
  );

  // Expose imperative API to parent controls (Section Header buttons)
  useImperativeHandle(
    ref,
    () => ({
      prev: () => navigate(-1),
      next: () => navigate(1),
      goTo,
      getActiveIndex: () => ((Math.round(visualPosRef.current) % total) + total) % total,
    }),
    [navigate, goTo, total]
  );

  // Handle pointer down (mouse or touch)
  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    if (total <= 0) return;

    if (animControlsRef.current) {
      animControlsRef.current.stop();
      setIsAnimating(false);
    }

    dragStateRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      lastX: e.clientX,
      lastTime: performance.now(),
      velocity: 0,
      startVisualPos: visualPosRef.current,
      isDragging: false,
      directionLocked: null, // null | 'horizontal' | 'vertical'
      pointerId: e.pointerId,
      targetElement: e.currentTarget,
    };
  };

  // Handle pointer move
  const handlePointerMove = (e) => {
    const state = dragStateRef.current;
    if (!state) return;

    const dx = e.clientX - state.startX;
    const dy = e.clientY - state.startY;

    // Detect gesture direction
    if (!state.directionLocked) {
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        if (Math.abs(dy) > Math.abs(dx)) {
          // Primarily vertical: let native page scroll happen
          state.directionLocked = 'vertical';
          return;
        } else {
          // Primarily horizontal: take over carousel control
          state.directionLocked = 'horizontal';
          state.isDragging = true;
          setIsDragging(true);
          try {
            state.targetElement?.setPointerCapture(state.pointerId);
          } catch {
            // Ignore capture error if unsupported
          }
        }
      } else {
        return;
      }
    }

    if (state.directionLocked === 'horizontal') {
      // Track velocity
      const now = performance.now();
      const dt = now - state.lastTime;
      if (dt > 0) {
        state.velocity = (e.clientX - state.lastX) / dt;
      }
      state.lastX = e.clientX;
      state.lastTime = now;

      // Real-time ring rotation: dragging left (dx < 0) advances forward
      const indexOffset = -dx / params.dragSensitivity;
      setVisualPos(state.startVisualPos + indexOffset);
    }
  };

  // Handle pointer up / cancel
  const handlePointerUp = (e) => {
    const state = dragStateRef.current;
    if (!state) return;

    if (state.isDragging) {
      try {
        state.targetElement?.releasePointerCapture(state.pointerId);
      } catch {
        // Ignore
      }

      // Suppress any accidental click that would fire after dragging
      const preventClick = (clickEvent) => {
        clickEvent.preventDefault();
        clickEvent.stopPropagation();
        window.removeEventListener('click', preventClick, true);
      };
      window.addEventListener('click', preventClick, true);

      const dx = e.clientX - state.startX;
      const velocity = state.velocity; // px/ms

      let target = visualPosRef.current;
      // Determine snap target
      if (dx < -35 || velocity < -0.3) {
        target = Math.floor(state.startVisualPos) + 1;
      } else if (dx > 35 || velocity > 0.3) {
        target = Math.ceil(state.startVisualPos) - 1;
      } else {
        target = Math.round(visualPosRef.current);
      }

      animateTo(target, -velocity * 0.4);
    }

    dragStateRef.current = null;
    setIsDragging(false);
  };

  // Handle clicking on a tilted side card to bring it to center
  const handleSideCardClick = (diff) => {
    if (isDragging) return;
    const step = diff > 0 ? 1 : -1;
    animateTo(Math.round(visualPosRef.current) + step);
  };

  // Keyboard navigation support
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      navigate(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      navigate(1);
    }
  };

  if (!products || products.length === 0) {
    return null;
  }

  const activeIndex = ((Math.round(visualPos) % total) + total) % total;

  return (
    <div
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="New Arrivals Seasonal Showcase"
      style={{
        touchAction: 'pan-y', // Native vertical scrolling, captures horizontal gestures
      }}
      className={`relative w-full overflow-hidden select-none outline-none focus-visible:ring-1 focus-visible:ring-[#8B0000]/30 rounded-3xl ${className}`}
    >
      {/* 3D Perspective Visual Stage (Cards are attached to the upper front arc of the invisible ring) */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          perspective: '1200px',
          perspectiveOrigin: 'center 42%',
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full h-[520px] sm:h-[580px] lg:h-[630px] flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {products.map((product, index) => {
          const diff = getCircularOffset(index, visualPos, total);
          const absDiff = Math.abs(diff);

          // Cards further in the back: hidden completely
          if (absDiff >= 2.6) {
            return null;
          }

          // Mathematical coordinates on the invisible ring
          const angleRad = (diff * params.angleStepDeg * Math.PI) / 180;

          // X position follows the sine of the angle along the circle
          const x = params.rx * Math.sin(angleRad);

          // Y position follows the upper front arc (center card is at the front apex y=0; sides curve down)
          const y = shouldReduceMotion ? 0 : params.ry * (1 - Math.cos(angleRad));

          // Scale: Center card is 100% scale (large, dominant). Side cards are 72-76% scale.
          let scale;
          if (absDiff <= 1) {
            scale = 1 - absDiff * (1 - params.sideScale);
          } else {
            scale = params.sideScale - (absDiff - 1) * 0.16;
          }
          scale = Math.max(0.55, Math.min(1.0, scale));

          // Opacity: Center card is 100% OPAQUE. Side cards are ~0.80 - 0.85. Far cards fade out.
          let opacity;
          if (absDiff <= 0.25) {
            opacity = 1.0;
          } else if (absDiff <= 1) {
            opacity = 1.0 - (absDiff - 0.25) * 0.25; // 0.81 at offset 1
          } else if (absDiff <= 2) {
            opacity = 0.81 - (absDiff - 1) * 0.45;
          } else {
            opacity = Math.max(0, 0.36 - (absDiff - 2) * 0.6);
          }

          // 2D Radial Tilt (rotateZ): Tangential orientation along the invisible ring
          // Left card rotates counter-clockwise (top tilts left along the arc)
          // Right card rotates clockwise (top tilts right along the arc)
          // Center card is 0° (STRAIGHT / UPRIGHT)
          const rotateZ = shouldReduceMotion ? 0 : diff * params.tiltAngleDeg;

          // 3D Inward Facing (rotateY): Cards face inward toward the center of the ring
          // Left card faces right (+), Right card faces left (-)
          // Center card faces directly at viewer (0°)
          const rotateY = shouldReduceMotion ? 0 : -diff * params.yAngleDeg;

          // 3D Depth (translateZ): Center card is at 0px (front-most). Side cards pushed into screen.
          const z = shouldReduceMotion ? 0 : -absDiff * params.depthStep;

          // Z-index: Highest for center card
          const zIndex = Math.round(30 - Math.min(28, absDiff * 10));

          // Is this the dominant active card?
          const isCenter = absDiff < 0.35;

          return (
            <div
              key={product.id}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: `${params.cardWidth}px`,
                transform: `translate3d(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px), ${z.toFixed(1)}px) rotateZ(${rotateZ.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(3)})`,
                opacity: Number(opacity.toFixed(3)),
                zIndex,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                willChange: isDragging || isAnimating ? 'transform, opacity' : 'auto',
              }}
              className="transition-[box-shadow] duration-300"
            >
              {/* Product Card Container */}
              <div
                className={`relative w-full rounded-2xl ${
                  isCenter
                    ? 'shadow-xl shadow-[#200E01]/10'
                    : 'shadow-md shadow-[#200E01]/5'
                }`}
              >
                <ProductCard
                  product={product}
                  showcase={true}
                  className="w-full"
                />

                {/* Side Card Click Overlay: tapping/clicking anywhere on a side card brings it to center */}
                {!isCenter && (
                  <button
                    type="button"
                    onClick={() => handleSideCardClick(diff)}
                    aria-label={`Show ${product.name}`}
                    className="absolute inset-0 z-30 w-full h-full cursor-pointer rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8B0000]/40 transition-colors hover:bg-[#0D0D0D]/5"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Subtle, Minimalist Progress Indicator */}
      <div className="flex items-center justify-center space-x-2 pt-2 pb-4">
        {products.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}: ${item.name}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-6 bg-[#8B0000]'
                  : 'w-1.5 bg-[#DFE5F3] hover:bg-[#557373]'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
});

export default RadialShowcaseCarousel;
