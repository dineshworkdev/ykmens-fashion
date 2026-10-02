import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Container from '../layout/Container';
import { CATEGORIES } from '../../data/categories';
import { ROUTES } from '../../utils/constants';
import { AnimatedArrowRight } from '../common/AnimatedIcons';

// Refined luxury cubic bezier curves
const luxuryEase = [0.22, 1, 0.36, 1];

// Curated 4 master categories with verified assets
const CATEGORY_ITEMS = [
  {
    code: '01',
    name: 'Outerwear',
    slug: 'outerwear',
    image: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1000&q=85',
    ctaText: 'Explore Outerwear',
    subtitle: 'Tailored overcoats & structured silhouettes',
    // Mobile runway geometry: slightly left bias, subtle counter-clockwise tilt
    mobileAlign: 'mr-auto ml-2 sm:ml-6',
    mobileRotation: -2,
    mobileShift: -14,
    // Desktop runway geometry: upper-left along the curved path
    desktopY: '-translate-y-4',
    desktopRotation: -2.2,
    desktopScale: 0.95,
  },
  {
    code: '02',
    name: 'Shirts',
    slug: 'shirts',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=85',
    ctaText: 'Explore Shirts',
    subtitle: 'Concealed plackets & crisp luxury cotton',
    // Mobile runway geometry: slightly right bias, subtle clockwise tilt
    mobileAlign: 'ml-auto mr-2 sm:mr-6',
    mobileRotation: 2.2,
    mobileShift: 16,
    // Desktop runway geometry: center-left apex dipping into the curve
    desktopY: 'translate-y-6',
    desktopRotation: 1.8,
    desktopScale: 1.04,
  },
  {
    code: '03',
    name: 'Trousers',
    slug: 'trousers',
    image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1000&q=85',
    ctaText: 'Explore Trousers',
    subtitle: 'High-rise pleated wool & relaxed movement',
    // Mobile runway geometry: slightly left bias, subtle tilt
    mobileAlign: 'mr-auto ml-3 sm:ml-8',
    mobileRotation: -1.8,
    mobileShift: -12,
    // Desktop runway geometry: center-right curving upwards
    desktopY: '-translate-y-2',
    desktopRotation: -1.6,
    desktopScale: 0.98,
  },
  {
    code: '04',
    name: 'T-Shirts & Tops',
    slug: 't-shirts',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=85',
    ctaText: 'Explore Tops',
    subtitle: 'Heavyweight mercerized foundations',
    // Mobile runway geometry: slightly right bias
    mobileAlign: 'ml-auto mr-3 sm:mr-8',
    mobileRotation: 1.6,
    mobileShift: 14,
    // Desktop runway geometry: far-right settling downwards
    desktopY: 'translate-y-8',
    desktopRotation: 2.2,
    desktopScale: 0.94,
  },
];

/**
 * Mobile Runway Card:
 * Responds to normal vertical scrolling as it traverses the viewport.
 * The active category enters the viewport, becomes prominent and sharp, then gently settles back.
 */
const MobileRunwayCard = ({ item, index, shouldReduceMotion }) => {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Scroll-linked transformations along the invisible path
  const scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    shouldReduceMotion ? [1, 1, 1, 1, 1] : [0.92, 0.96, 1.03, 0.96, 0.92]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 0.8, 1],
    shouldReduceMotion ? [1, 1, 1, 1, 1] : [0.65, 0.9, 1, 0.9, 0.65]
  );

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    shouldReduceMotion
      ? [0, 0, 0]
      : [`${item.mobileRotation}deg`, '0deg', `${item.mobileRotation * 0.7}deg`]
  );

  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    shouldReduceMotion ? [0, 0, 0] : [`${item.mobileShift}px`, '0px', `${item.mobileShift * -0.5}px`]
  );

  const imageScale = useTransform(
    scrollYProgress,
    [0.2, 0.5, 0.8],
    shouldReduceMotion ? [1, 1, 1] : [1.05, 1, 1.05]
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
      className={`w-[88%] max-w-[340px] sm:max-w-[380px] ${item.mobileAlign} relative my-6 sm:my-8`}
    >
      <Link
        to={`${ROUTES.SHOP}?category=${item.slug}`}
        className="group block bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-3.5 border border-[#E7DECD] shadow-md active:scale-[0.98] transition-all duration-300"
      >
        {/* Visual Frame */}
        <div className="relative aspect-[3.7/4.4] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#EDE7C7]/40 mb-3.5">
          <motion.img
            style={{ scale: imageScale }}
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out"
            loading="lazy"
          />

          {/* Minimal Editorial Badge */}
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
 * As the user scrolls vertically through the section, the cards respond in a coordinated wave.
 */
const DesktopRunwayItem = ({ item, index, sectionProgress, shouldReduceMotion }) => {
  // Wave phase offset for continuous scroll-reactive progression
  const phase = index * 0.2;
  const start = Math.max(0, phase - 0.1);
  const peak = phase + 0.15;
  const end = Math.min(1, phase + 0.4);

  const scrollScale = useTransform(
    sectionProgress,
    [start, peak, end],
    shouldReduceMotion
      ? [1, 1, 1]
      : [item.desktopScale, item.desktopScale * 1.05, item.desktopScale]
  );

  const scrollY = useTransform(
    sectionProgress,
    [0, 0.5, 1],
    shouldReduceMotion ? [0, 0, 0] : [index % 2 === 0 ? -12 : 12, 0, index % 2 === 0 ? 12 : -12]
  );

  const scrollRotate = useTransform(
    sectionProgress,
    [0, 0.5, 1],
    shouldReduceMotion
      ? [0, 0, 0]
      : [
          `${item.desktopRotation}deg`,
          `${item.desktopRotation * 0.4}deg`,
          `${item.desktopRotation}deg`,
        ]
  );

  return (
    <motion.div
      style={{
        scale: scrollScale,
        y: scrollY,
        rotate: scrollRotate,
      }}
      className={`relative z-10 ${item.desktopY}`}
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

          {/* Minimal Editorial Badge */}
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
 * Distinct Visual Architecture:
 * - NOT a normal 4-card grid
 * - NOT a carousel or card stack
 * - The composition follows an invisible flowing S-curve runway
 * - Mobile-first: Alternating horizontal bias + subtle rotations driven by natural vertical scroll
 * - Desktop: Undulating panoramic runway where categories sit along a flowing curved geometry
 * - Driven by the user's natural vertical scroll (no scroll-jacking, no horizontal swiping)
 */
export const FeaturedCategoriesCurved = () => {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 lg:py-28 bg-[#E7DECD]/40 border-b border-[#DFE5F3] overflow-hidden relative"
    >
      {/* Subtle atmospheric tonal accents */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute -top-32 left-1/3 w-96 h-96 rounded-full bg-[#EDE7C7] blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 rounded-full bg-[#DFE5F3] blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-10 sm:mb-14 border-b border-[#DFE5F3] gap-4">
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
            Flowing invisible curved path driven by normal vertical scroll:
            Outerwear (left bias, slight tilt)
            ↓
            Shirts (right bias, clockwise tilt)
            ↓
            Trousers (left bias, slight tilt)
            ↓
            T-Shirts & Tops (right bias, clockwise tilt)
            Active card expands slightly and sharpens as it reaches viewport center.
            ========================================================================= */}
        <div className="flex flex-col lg:hidden relative py-2">
          {CATEGORY_ITEMS.map((item, index) => (
            <MobileRunwayCard
              key={item.slug}
              item={item}
              index={index}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>

        {/* =========================================================================
            DESKTOP CURVED RUNWAY (Screen >= 1024px)
            Invisible flowing S-curve runway across horizontal space:
            Card 1 (Outerwear, upper-left)
               ↘
                Card 2 (Shirts, center-left focal apex)
               ↗
            Card 3 (Trousers, center-right)
               ↘
                Card 4 (T-Shirts & Tops, far-right)
            Scroll-linked continuous wave as user scrolls down.
            ========================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6 xl:gap-8 items-center py-6 min-h-[520px]">
          {CATEGORY_ITEMS.map((item, index) => (
            <DesktopRunwayItem
              key={item.slug}
              item={item}
              index={index}
              sectionProgress={sectionProgress}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedCategoriesCurved;
