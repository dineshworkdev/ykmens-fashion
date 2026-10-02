import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import Container from '../layout/Container';
import { ROUTES } from '../../utils/constants';
import { AnimatedArrowRight } from '../common/AnimatedIcons';

// Spring configuration: ultra-responsive, zero lag, smooth liquid damping
const runwaySpringConfig = {
  stiffness: 280,
  damping: 32,
  mass: 0.15,
};

// Curated 4 master categories with verified assets and enhanced runway tilt
const CATEGORY_ITEMS = [
  {
    code: '01',
    name: 'Outerwear',
    slug: 'outerwear',
    image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1000&q=85',
    ctaText: 'Explore Outerwear',
    subtitle: 'Tailored overcoats & structured silhouettes',
    // Mobile runway geometry: left-biased with initial tilt -6°
    mobileAlign: 'mr-auto ml-3 sm:ml-8',
    baseRotate: -6,
    baseShift: -16,
    // Desktop runway geometry: upper-left along the curved path
    desktopY: '-translate-y-6',
    desktopRotate: -5.5,
    desktopScale: 0.95,
  },
  {
    code: '02',
    name: 'Shirts',
    slug: 'shirts',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=85',
    ctaText: 'Explore Shirts',
    subtitle: 'Concealed plackets & crisp luxury cotton',
    // Mobile runway geometry: right-biased with initial tilt +5.5°
    mobileAlign: 'ml-auto mr-3 sm:mr-8',
    baseRotate: 5.5,
    baseShift: 18,
    // Desktop runway geometry: center-left apex dipping into the curve
    desktopY: 'translate-y-8',
    desktopRotate: 4.5,
    desktopScale: 1.04,
  },
  {
    code: '03',
    name: 'Trousers',
    slug: 'trousers',
    image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1000&q=85',
    ctaText: 'Explore Trousers',
    subtitle: 'High-rise pleated wool & relaxed movement',
    // Mobile runway geometry: left-biased with initial tilt -5°
    mobileAlign: 'mr-auto ml-4 sm:ml-10',
    baseRotate: -5,
    baseShift: -14,
    // Desktop runway geometry: center-right curving upwards
    desktopY: '-translate-y-3',
    desktopRotate: -4.5,
    desktopScale: 0.98,
  },
  {
    code: '04',
    name: 'T-Shirts & Tops',
    slug: 't-shirts',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=85',
    ctaText: 'Explore Tops',
    subtitle: 'Heavyweight mercerized foundations',
    // Mobile runway geometry: right-biased with initial tilt +5.5°
    mobileAlign: 'ml-auto mr-4 sm:mr-10',
    baseRotate: 5.5,
    baseShift: 16,
    // Desktop runway geometry: far-right settling downwards
    desktopY: 'translate-y-10',
    desktopRotate: 5.5,
    desktopScale: 0.94,
  },
];

/**
 * Mobile Runway Card:
 * Continuous scroll-driven motion passed through a responsive spring layer.
 * As the user scrolls vertically, each card continuously glides along the invisible curved runway:
 * - Resting tilt (-6° or +5.5°)
 * - Smoothly straightens toward 0° at focal position (center viewport)
 * - Scale expands continuously (0.93 -> 0.96 -> 1.00 -> 1.025 -> 1.00 -> 0.96 -> 0.93)
 * - Image crop & parallax drift continuously inside card
 * - Gracefully returns to resting tilt as it leaves focal position
 * - Zero snapping, zero pauses, zero scroll-jacking.
 */
const MobileRunwayCard = ({ item, shouldReduceMotion }) => {
  const cardRef = useRef(null);

  const { scrollYProgress: rawScrollProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Spring-smoothed scroll progress eliminates stickiness and jitter
  const smoothProgress = useSpring(rawScrollProgress, runwaySpringConfig);

  // Continuous multi-point scale interpolation
  const scale = useTransform(
    smoothProgress,
    [0, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
    shouldReduceMotion
      ? [1, 1, 1, 1, 1, 1, 1]
      : [0.93, 0.95, 0.98, 1.025, 0.98, 0.95, 0.93]
  );

  // High-visibility continuous opacity
  const opacity = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    shouldReduceMotion ? [1, 1, 1, 1, 1] : [0.86, 0.94, 1, 0.94, 0.86]
  );

  // Continuous rotation: Starts at resting tilt, continuously travels to 0° at focus (0.5), then returns
  const rotate = useTransform(
    smoothProgress,
    [0, 0.2, 0.35, 0.5, 0.65, 0.8, 1],
    shouldReduceMotion
      ? [0, 0, 0, 0, 0, 0, 0]
      : [
          `${item.baseRotate}deg`,
          `${item.baseRotate * 0.75}deg`,
          `${item.baseRotate * 0.35}deg`,
          '0deg',
          `${item.baseRotate * 0.35}deg`,
          `${item.baseRotate * 0.75}deg`,
          `${item.baseRotate}deg`,
        ]
  );

  // Continuous horizontal sway along the curved runway
  const x = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    shouldReduceMotion
      ? [0, 0, 0, 0, 0]
      : [
          `${item.baseShift}px`,
          `${item.baseShift * 0.6}px`,
          '0px',
          `${item.baseShift * -0.3}px`,
          `${item.baseShift * -0.5}px`,
        ]
  );

  // Subtle image crop & parallax reaction
  const imageScale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    shouldReduceMotion ? [1, 1, 1] : [1.02, 1.06, 1.02]
  );

  const imageY = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    shouldReduceMotion ? ['0px', '0px', '0px'] : ['-6px', '0px', '6px']
  );

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale,
        opacity,
        rotate,
        x,
      }}
      className={`w-[84%] max-w-[320px] sm:max-w-[360px] ${item.mobileAlign} relative my-6 sm:my-8 origin-center`}
    >
      <Link
        to={`${ROUTES.SHOP}?category=${item.slug}`}
        className="group block bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 border border-[#E7DECD] shadow-md active:scale-[0.98] transition-all duration-300"
      >
        {/* Visual Frame */}
        <div className="relative aspect-[3.7/4.4] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#EDE7C7]/40 mb-3.5">
          <motion.img
            style={{
              scale: imageScale,
              y: imageY,
            }}
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-top will-change-transform"
            loading="lazy"
          />

          {/* Minimal Editorial Code Badge */}
          <div className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-[#0D0D0D]/80 backdrop-blur-xs text-[#F2EFEA] text-[10px] tracking-[0.2em] font-mono rounded-full">
            {item.code}
          </div>
        </div>

        {/* Category Information */}
        <div className="px-1 pb-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0D0D0D] tracking-tight group-hover:text-[#8B0000] transition-colors">
              {item.name}
            </h3>
            <span className="text-[10px] font-mono text-[#557373]">
              WARDROBE
            </span>
          </div>

          <p className="text-xs text-[#557373] line-clamp-1 mb-2.5">
            {item.subtitle}
          </p>

          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#200E01] group-hover:text-[#8B0000] transition-colors">
            <span>{item.ctaText}</span>
            <AnimatedArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/**
 * Desktop Runway Item:
 * Positions cards along an undulating curved editorial path across the panoramic section.
 * Center apex card is elevated, side cards are angled and scaled naturally.
 * Uses continuous spring smoothing for fluid vertical scroll response.
 */
const DesktopRunwayItem = ({ item, sectionProgress, index, shouldReduceMotion }) => {
  // Staggered wave offset along the curve
  const phase = index * 0.2;
  const start = Math.max(0, phase - 0.1);
  const peak = phase + 0.18;
  const end = Math.min(1, phase + 0.45);

  const scrollScale = useTransform(
    sectionProgress,
    [start, peak, end],
    shouldReduceMotion
      ? [1, 1, 1]
      : [item.desktopScale, item.desktopScale * 1.04, item.desktopScale]
  );

  const scrollY = useTransform(
    sectionProgress,
    [0, 0.5, 1],
    shouldReduceMotion
      ? [0, 0, 0]
      : [index % 2 === 0 ? -14 : 14, 0, index % 2 === 0 ? 14 : -14]
  );

  return (
    <motion.div
      style={{
        scale: scrollScale,
        y: scrollY,
        rotate: '0deg',
      }}
      className={`relative z-10 ${item.desktopY} origin-center`}
    >
      <Link
        to={`${ROUTES.SHOP}?category=${item.slug}`}
        className="group block bg-white rounded-[1.75rem] p-4 border border-[#E7DECD] hover:border-[#0D0D0D] shadow-sm hover:shadow-xl transition-all duration-500 ease-out"
      >
        {/* Visual Frame */}
        <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#EDE7C7]/40 mb-4">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Minimal Editorial Code Badge */}
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#0D0D0D]/80 backdrop-blur-xs text-[#F2EFEA] text-[10px] tracking-[0.2em] font-mono rounded-full">
            {item.code}
          </div>
        </div>

        {/* Category Information */}
        <div className="px-1">
          <span className="text-[10px] font-mono text-[#557373] uppercase tracking-wider block mb-1">
            Wardrobe / {item.code}
          </span>
          <h3 className="font-serif text-2xl font-bold text-[#0D0D0D] tracking-tight group-hover:text-[#8B0000] transition-colors mb-1.5">
            {item.name}
          </h3>
          <p className="text-xs text-[#557373] line-clamp-1 mb-3">
            {item.subtitle}
          </p>

          <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-[#200E01] group-hover:text-[#8B0000] transition-colors">
            <span>{item.ctaText}</span>
            <AnimatedArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/**
 * YK MENS FASHION — FEATURED CATEGORIES
 * INVISIBLE CURVED EDITORIAL PATH / RUNWAY
 * 
 * - Mobile: Continuous flowing curved path with spring-smoothed scroll physics & subtle tilt
 * - Desktop: Upright, stable, premium cards arranged along an undulating curved wave layout
 * - Background: Rich warm parchment surface (#ECE6DA) providing tactile section separation
 */
export const FeaturedCategoriesCurved = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress: rawSectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Desktop smooth spring layer for the section wave
  const smoothSectionProgress = useSpring(rawSectionProgress, runwaySpringConfig);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-28 bg-[#E6DACB] border-b border-[#D5C7B6] overflow-hidden relative"
    >
      {/* Subtle atmospheric tonal accents */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-32 left-1/3 w-96 h-96 rounded-full bg-[#EDE7C7] blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 rounded-full bg-[#DFE5F3] blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-10 sm:mb-14 border-b border-[#D5C7B6] gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#8B0000] font-bold block mb-2">
              Explore Wardrobe
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0D0D0D]">
              Featured Categories
            </h2>
          </div>
          <Link
            to={ROUTES.SHOP}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-bold text-[#200E01] hover:text-[#8B0000] transition-colors group"
          >
            <span>View All Categories</span>
            <AnimatedArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* =========================================================================
            MOBILE RUNWAY (Screen < 1024px)
            Continuous invisible curved path driven by spring-smoothed vertical scroll:
            Outerwear (resting tilt -6°, left bias)
            ↓
            Shirts (resting tilt +5.5°, right bias)
            ↓
            Trousers (resting tilt -5°, left bias)
            ↓
            T-Shirts & Tops (resting tilt +5.5°, right bias)
            Smoothly interpolates to 0° at viewport center, then returns to resting tilt.
            ========================================================================= */}
        <div className="flex flex-col lg:hidden relative py-4 overflow-hidden">
          {CATEGORY_ITEMS.map((item) => (
            <MobileRunwayCard
              key={item.slug}
              item={item}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>

        {/* =========================================================================
            DESKTOP CURVED RUNWAY (Screen >= 1024px)
            Invisible flowing S-curve runway across horizontal space:
            Card 1 (Outerwear, upper-left, -5.5°)
               ↘
                Card 2 (Shirts, center-left focal apex, +4.5°)
               ↗
            Card 3 (Trousers, center-right, -4.5°)
               ↘
                Card 4 (T-Shirts & Tops, far-right, +5.5°)
            Smooth spring-driven continuous wave as user scrolls down.
            ========================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 xl:gap-8 items-center py-8 min-h-[540px]">
          {CATEGORY_ITEMS.map((item, index) => (
            <DesktopRunwayItem
              key={item.slug}
              item={item}
              index={index}
              sectionProgress={smoothSectionProgress}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedCategoriesCurved;
