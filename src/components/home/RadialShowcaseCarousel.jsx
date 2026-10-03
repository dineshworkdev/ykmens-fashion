import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useImperativeHandle,
  forwardRef,
  memo,
} from 'react';
import { motion, useMotionValue, useTransform, animate, useReducedMotion } from 'framer-motion';
import ProductCard from '../product/ProductCard';

/**
 * YK MENS FASHION - Phase 4A Radial Showcase Carousel (Motion & Physics Refinement)
 * 
 * Refined Motion Architecture:
 * - Direct GPU-accelerated motion values: zero React re-renders during active drag or spring settling
 * - Continuous proportional drag tracking (finger/mouse -> ring rotation)
 * - Momentum & velocity preservation on release (natural deceleration to intended card)
 * - Direction-locking gesture detection (horizontal intent vs native vertical scroll)
 * - Fully continuous scale, tilt, depth, and opacity transitions along the invisible ring
 * - Side card clicking rotates the ring smoothly to center
 * - Arrow navigation uses the exact same physical spring
 * - Full prefers-reduced-motion support
 */

// Helper to calculate circular shortest offset in range [-total/2, total/2]
function getCircularOffset(itemIndex, currentPos, total) {
  if (total <= 0) return 0;
  let diff = (itemIndex - (currentPos % total)) % total;
  while (diff > total / 2) diff -= total;
  while (diff < -total / 2) diff += total;
  return diff;
}

// Compute responsive geometry parameters based on viewport width (Approved geometry preserved)
function getResponsiveParams(width) {
  if (width < 640) {
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

/**
 * Individual Radial Card Component:
 * Binds directly to the continuous visualPos motion value via useTransform.
 * Updates directly on the GPU with zero React re-rendering during drag or momentum.
 */
const RadialCard = memo(function RadialCard({
  product,
  index,
  total,
  visualPos,
  params,
  shouldReduceMotion,
  onSideClick,
}) {
  // Continuous 3D transform derived from the card's continuous angle around the invisible ring
  const transform = useTransform(visualPos, (pos) => {
    const diff = getCircularOffset(index, pos, total);
    const absDiff = Math.abs(diff);

    // Cards past 2.6 units away: hide behind the ring
    if (absDiff >= 2.6) {
      return 'translate3d(-50%, -50%, -9999px) scale(0)';
    }

    const angleRad = (diff * params.angleStepDeg * Math.PI) / 180;
    const x = params.rx * Math.sin(angleRad);
    const y = shouldReduceMotion ? 0 : params.ry * (1 - Math.cos(angleRad));
    const z = shouldReduceMotion ? 0 : -absDiff * params.depthStep;
    const rotateZ = shouldReduceMotion ? 0 : diff * params.tiltAngleDeg;
    const rotateY = shouldReduceMotion ? 0 : -diff * params.yAngleDeg;

    let scale;
    if (absDiff <= 1) {
      scale = 1 - absDiff * (1 - params.sideScale);
    } else {
      scale = params.sideScale - (absDiff - 1) * 0.16;
    }
    scale = Math.max(0.55, Math.min(1.0, scale));

    return `translate3d(calc(-50% + ${x.toFixed(2)}px), calc(-50% + ${y.toFixed(2)}px), ${z.toFixed(2)}px) rotateZ(${rotateZ.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
  });

  // Continuous opacity: Center card is 100% opaque; side cards gracefully fade with depth
  const opacity = useTransform(visualPos, (pos) => {
    const diff = getCircularOffset(index, pos, total);
    const absDiff = Math.abs(diff);
    if (absDiff >= 2.6) return 0;
    if (absDiff <= 0.25) return 1.0;
    if (absDiff <= 1) return 1.0 - (absDiff - 0.25) * 0.25;
    if (absDiff <= 2) return 0.81 - (absDiff - 1) * 0.45;
    return Math.max(0, 0.36 - (absDiff - 2) * 0.6);
  });

  // Continuous z-index based on proximity to center apex
  const zIndex = useTransform(visualPos, (pos) => {
    const diff = getCircularOffset(index, pos, total);
    return Math.round(30 - Math.min(28, Math.abs(diff) * 10));
  });

  // Pointer events: Disabled if card is far in the back
  const pointerEvents = useTransform(visualPos, (pos) => {
    const diff = getCircularOffset(index, pos, total);
    return Math.abs(diff) >= 2.5 ? 'none' : 'auto';
  });

  const handleClick = (e) => {
    const currentPos = visualPos.get();
    const diff = getCircularOffset(index, currentPos, total);
    // If clicking a side card, bring it smoothly to center
    if (Math.abs(diff) >= 0.4) {
      e.preventDefault();
      e.stopPropagation();
      onSideClick(diff);
    }
  };

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: `${params.cardWidth}px`,
        transform,
        opacity,
        zIndex,
        pointerEvents,
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        willChange: 'transform, opacity',
      }}
      onClick={handleClick}
      className="origin-center"
    >
      <div className="relative w-full rounded-2xl shadow-xl shadow-[#200E01]/10">
        <ProductCard
          product={product}
          showcase={true}
          className="w-full"
        />
      </div>
    </motion.div>
  );
});

export const RadialShowcaseCarousel = forwardRef(function RadialShowcaseCarousel(
  { products = [], onActiveChange, className = '' },
  ref
) {
  const shouldReduceMotion = useReducedMotion();
  const total = products.length;

  // Continuous visual position along the invisible ring (Framer Motion Value)
  const visualPos = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Responsive stage parameters
  const [params, setParams] = useState(() =>
    getResponsiveParams(typeof window !== 'undefined' ? window.innerWidth : 1200)
  );

  const containerRef = useRef(null);
  const animControlsRef = useRef(null);

  // Pointer drag tracking state
  const dragStateRef = useRef(null);
  const hasDraggedRef = useRef(false);

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      setParams(getResponsiveParams(window.innerWidth));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Synchronize activeIndex for indicators without triggering full carousel re-render
  useEffect(() => {
    const unsubscribe = visualPos.on('change', (latest) => {
      if (total <= 0) return;
      const normalized = ((Math.round(latest) % total) + total) % total;
      setActiveIndex((prev) => (prev !== normalized ? normalized : prev));
    });
    return () => unsubscribe();
  }, [visualPos, total]);

  // Smooth, physical spring animation to a target index position
  const animateTo = useCallback(
    (target, customVelocity = 0) => {
      if (total <= 0) return;
      if (animControlsRef.current) {
        animControlsRef.current.stop();
      }

      const start = visualPos.get();

      animControlsRef.current = animate(visualPos, target, {
        type: shouldReduceMotion ? 'tween' : 'spring',
        duration: shouldReduceMotion ? 0.25 : undefined,
        stiffness: 240, // Responsive, buttery smooth
        damping: 26,    // Gentle physical deceleration, no bounce/jitter
        mass: 0.7,      // Natural rotating inertia
        velocity: customVelocity,
        restDelta: 0.001,
        onComplete: () => {
          // Normalize to [0, total) to prevent floating-point drift over time
          const normalized = ((Math.round(target) % total) + total) % total;
          visualPos.set(normalized);
          setActiveIndex(normalized);
          if (onActiveChange) {
            onActiveChange(normalized);
          }
        },
      });
    },
    [total, shouldReduceMotion, onActiveChange, visualPos]
  );

  // Navigation commands
  const navigate = useCallback(
    (direction) => {
      if (total <= 0) return;
      const current = visualPos.get();
      const target = Math.round(current) + direction;
      animateTo(target);
    },
    [total, animateTo, visualPos]
  );

  const goTo = useCallback(
    (index) => {
      if (total <= 0) return;
      const current = visualPos.get();
      const currentActive = Math.round(current);
      const diff = getCircularOffset(index, currentActive, total);
      animateTo(currentActive + diff);
    },
    [total, animateTo, visualPos]
  );

  // Expose imperative API to parent controls (Section Header buttons)
  useImperativeHandle(
    ref,
    () => ({
      prev: () => navigate(-1),
      next: () => navigate(1),
      goTo,
      getActiveIndex: () => ((Math.round(visualPos.get()) % total) + total) % total,
    }),
    [navigate, goTo, total, visualPos]
  );

  // Handle pointer down (mouse or touch)
  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    if (total <= 0) return;

    // Immediately stop ongoing animation so the user can "grab" the ring in motion
    if (animControlsRef.current) {
      animControlsRef.current.stop();
    }

    const now = performance.now();
    hasDraggedRef.current = false;

    dragStateRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startVisualPos: visualPos.get(),
      samples: [{ x: e.clientX, time: now }],
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

    // Early gesture classification: distinguish horizontal ring rotation vs vertical page scroll
    if (!state.directionLocked) {
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (absDx > 6 || absDy > 6) {
        if (absDy > absDx) {
          // Primarily vertical: let native page scroll happen without hindrance
          state.directionLocked = 'vertical';
          return;
        } else {
          // Primarily horizontal: take over carousel control smoothly
          state.directionLocked = 'horizontal';
          state.isDragging = true;
          hasDraggedRef.current = true;
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
      const now = performance.now();

      // Maintain rolling buffer of recent movement samples for accurate velocity calculation
      state.samples.push({ x: e.clientX, time: now });
      while (state.samples.length > 6 || (state.samples.length > 2 && now - state.samples[0].time > 120)) {
        state.samples.shift();
      }

      // Continuous direct tracking: moving left (dx < 0) advances the ring forward
      const indexOffset = -dx / params.dragSensitivity;
      visualPos.set(state.startVisualPos + indexOffset);
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

      // Suppress any accidental click that would fire right after dragging
      const preventClick = (clickEvent) => {
        clickEvent.preventDefault();
        clickEvent.stopPropagation();
        window.removeEventListener('click', preventClick, true);
      };
      window.addEventListener('click', preventClick, true);

      // Compute weighted release velocity from recent movement samples
      let velocity = 0;
      const samples = state.samples;
      const now = performance.now();
      if (samples.length >= 2) {
        const last = samples[samples.length - 1];
        const first = samples[0];
        const dt = last.time - first.time;
        // Only consider velocity if last movement was within 100ms
        if (dt > 10 && now - last.time < 100) {
          velocity = (last.x - first.x) / dt; // in px/ms
        }
      }

      const currentPos = visualPos.get();
      // Convert physical velocity (px/ms) to index units per second
      const indexVelocity = (-velocity * 1000) / params.dragSensitivity;

      // Momentum offset: smooth momentum continuation on fast swipes, capped at 1.5 cards
      const momentumOffset = Math.max(-1.5, Math.min(1.5, indexVelocity * 0.22));
      const projectedPos = currentPos + momentumOffset;
      const target = Math.round(projectedPos);

      // Smoothly settle the ring into the focal position
      animateTo(target, indexVelocity * 0.25);
    }

    dragStateRef.current = null;
  };

  // Handle clicking on a tilted side card to bring it to center
  const handleSideCardClick = useCallback(
    (diff) => {
      if (hasDraggedRef.current) return;
      const current = visualPos.get();
      const step = diff > 0 ? 1 : -1;
      animateTo(Math.round(current) + step);
    },
    [animateTo, visualPos]
  );

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
        {products.map((product, index) => (
          <RadialCard
            key={product.id}
            product={product}
            index={index}
            total={total}
            visualPos={visualPos}
            params={params}
            shouldReduceMotion={shouldReduceMotion}
            onSideClick={handleSideCardClick}
          />
        ))}
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
                  ? 'w-6 bg-[#D99E84]'
                  : 'w-1.5 bg-[#FAF7F2]/25 hover:bg-[#FAF7F2]/50'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
});

export default RadialShowcaseCarousel;
