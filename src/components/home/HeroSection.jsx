import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Container from '../layout/Container';
import FashionButton from '../common/FashionButton';
import { ROUTES } from '../../utils/constants';
import { PRODUCTS } from '../../data/products';
import { AnimatedArrowRight } from '../common/AnimatedIcons';
import InteractiveBrandPet from './InteractiveBrandPet';

// Refined luxury cubic bezier curves
const luxuryEase = [0.22, 1, 0.36, 1];

/**
 * YK MENS FASHION — HOMEPAGE HERO SECTION REFINEMENT
 * 
 * Strict Brand Compliance:
 * - IMAGE + PRODUCT NAME + CATEGORY + CTA all represent the same real product from products.js
 * - Clean editorial visual composition (Light sand #F2EFEA dominant, #EDE7C7 / #E7DECD accents)
 * - Concise, authentic copy: "Modern menswear designed for everyday confidence."
 * - High-impact, mobile-first visual hierarchy: Visual -> Label -> Headline -> Short Copy -> Primary CTA
 * - Refined, un-cluttered floating product panel: FEATURED PIECE / [Product Name] / Shop →
 * - Polished Framer Motion reveals with full prefers-reduced-motion support
 */
export const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const heroContainerRef = useRef(null);

  // Directly bind to verified product from products.js (yk-prod-001)
  const heroProduct = PRODUCTS.find((p) => p.slug === 'structured-wool-overcoat-obsidian') || PRODUCTS[0];

  // Subtle cursor interaction for desktop image frame (disabled on reduced motion / touch)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 200 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const imageTiltX = useTransform(smoothMouseY, [-0.5, 0.5], ['1.8deg', '-1.8deg']);
  const imageTiltY = useTransform(smoothMouseX, [-0.5, 0.5], ['-2deg', '2deg']);
  const imageTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], ['-3px', '3px']);
  const imageTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], ['-3px', '3px']);

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || !heroContainerRef.current) return;
    const rect = heroContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={heroContainerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-[#FAF7F2] border-b border-[#E4D7CC] pt-3 sm:pt-6 lg:pt-8 pb-10 sm:pb-14 lg:pb-16 overflow-hidden"
    >
      {/* Subtle architectural hairline accents in approved warm beige palette */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-[#E4D7CC] via-transparent to-transparent hidden lg:block" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-[#E4D7CC] via-transparent to-transparent hidden lg:block" />
      </div>

      <Container className="relative z-10">
        {/* =========================================================================
            MOBILE HERO LAYOUT (Below lg: 1024px)
            Mobile is the primary design target:
            FASHION IMAGE
            ↓
            YK MENS FASHION
            ↓
            Defined By Style.
            Crafted For Movement.
            ↓
            "Modern menswear designed for everyday confidence."
            ↓
            Primary CTA (Explore Shop) + Secondary CTA
            ========================================================================= */}
        <div className="flex flex-col lg:hidden space-y-5">
          {/* 1. Mobile Fashion Visual — Dominant at Top */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14, clipPath: 'inset(6% 0% 0% 0% round 1.25rem)' }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 1.25rem)' }}
            transition={{ duration: 0.85, ease: luxuryEase }}
            className="w-full relative"
          >
            {/* Outer Frame */}
            <div className="relative p-2 sm:p-2.5 bg-[#FFFFFF] rounded-2xl border border-[#E4D7CC] shadow-sm">
              <div className="relative aspect-[4/4.5] sm:aspect-[4/4.2] w-full max-h-[420px] rounded-xl overflow-hidden bg-[#EADFD4]">
                <motion.img
                  initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.05, ease: luxuryEase }}
                  src={heroProduct.images[0]}
                  alt={`YK Mens Fashion — ${heroProduct.name}`}
                  className="w-full h-full object-cover object-[center_top]"
                  loading="eager"
                  fetchPriority="high"
                />

                {/* Clean Floating Product Panel: Pure White Card on Cream */}
                <Link
                  to={`/product/${heroProduct.slug}`}
                  className="absolute inset-x-2.5 bottom-2.5 p-3 bg-[#FFFFFF] rounded-xl border border-[#E4D7CC] flex items-center justify-between shadow-md active:bg-[#FAF7F2] transition-colors"
                >
                  <div className="pr-2 min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-[#8B7768] font-semibold block">
                      Featured Piece
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#33251F] truncate">
                      {heroProduct.name}
                    </h4>
                  </div>
                  <span className="inline-flex items-center space-x-1 px-3 py-1.5 bg-[#4A3A32] text-[#FAF7F2] text-xs font-semibold rounded-lg shrink-0">
                    <span>Shop</span>
                    <AnimatedArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* 2. Mobile Brand Label & Interactive Brand Pet */}
          <div className="flex items-center justify-between pt-0.5">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12, ease: luxuryEase }}
              className="flex items-center space-x-2 text-xs uppercase tracking-[0.25em] text-[#6B5549] font-semibold"
            >
              <span className="w-4 h-[2px] bg-[#4A3A32] rounded-full" />
              <span>YK Mens Fashion</span>
            </motion.div>

            {/* Interactive Brand Pet: Sir Kip (Mobile Hero Anchor) */}
            <InteractiveBrandPet className="shrink-0 -my-3" />
          </div>

          {/* 3. Mobile Campaign Headline */}
          <div className="space-y-0.5">
            <div className="overflow-hidden">
              <motion.h1
                initial={shouldReduceMotion ? { opacity: 0 } : { y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.75, delay: 0.18, ease: luxuryEase }}
                className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#33251F] leading-[1.08]"
              >
                Defined By Style.
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.span
                initial={shouldReduceMotion ? { opacity: 0 } : { y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.75, delay: 0.25, ease: luxuryEase }}
                className="block font-serif font-normal italic text-[#6B5549] text-2xl sm:text-3xl"
              >
                Crafted For Movement.
              </motion.span>
            </div>
          </div>

          {/* 4. Mobile Supporting Copy — Concise & Punchy */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32, ease: luxuryEase }}
            className="text-sm sm:text-base text-[#4A3A32] leading-relaxed max-w-md"
          >
            Modern menswear designed for everyday confidence.
          </motion.p>

          {/* 5. Mobile Primary & Secondary CTAs */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.38, ease: luxuryEase }}
            className="flex flex-col sm:flex-row gap-3 pt-1"
          >
            <FashionButton
              to={ROUTES.SHOP}
              variant="dark"
              size="md"
              className="w-full sm:w-auto justify-center"
            >
              Explore Shop
            </FashionButton>

            <FashionButton
              to={ROUTES.COLLECTIONS}
              variant="outlineDark"
              size="md"
              showArrow={false}
              className="w-full sm:w-auto justify-center"
            >
              View Collections
            </FashionButton>
          </motion.div>
        </div>

        {/* =========================================================================
            DESKTOP HERO LAYOUT (lg: 1024px and above)
            Editorial Composition:
            - Left: YK Brand Label, Campaign Statement, Concise Copy, Dominant CTAs
            - Right: Dominant Fashion Artwork with refined framing, secondary tailoring inset & clean piece card
            ========================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 xl:gap-12 items-center min-h-[560px] xl:min-h-[600px]">
          {/* Left Column: Brand & Campaign Statement (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 xl:space-y-7 z-20">
            {/* Brand Tagline with Accent */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: luxuryEase }}
              className="flex items-center space-x-3 text-xs uppercase tracking-[0.28em] text-[#6B5549] font-semibold"
            >
              <span className="w-7 h-[2px] bg-[#4A3A32] rounded-full" />
              <span>YK Mens Fashion</span>
            </motion.div>

            {/* Campaign Headline with Masked Roll Reveal */}
            <div className="space-y-1">
              <div className="overflow-hidden">
                <motion.h1
                  initial={shouldReduceMotion ? { opacity: 0 } : { y: '105%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.85, delay: 0.08, ease: luxuryEase }}
                  className="font-serif text-5xl xl:text-6xl font-bold tracking-tight text-[#33251F] leading-[1.05]"
                >
                  Defined By Style.
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  initial={shouldReduceMotion ? { opacity: 0 } : { y: '105%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.85, delay: 0.18, ease: luxuryEase }}
                  className="block font-serif font-normal italic text-[#6B5549] text-4xl xl:text-5xl mt-0.5"
                >
                  Crafted For Movement.
                </motion.span>
              </div>
            </div>

            {/* Short, Natural Supporting Statement */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: luxuryEase }}
              className="text-base text-[#4A3A32] max-w-sm leading-relaxed"
            >
              Modern menswear designed for everyday confidence.
            </motion.p>

            {/* Primary & Secondary Action Buttons */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.36, ease: luxuryEase }}
              className="flex items-center space-x-4 pt-2"
            >
              <FashionButton
                to={ROUTES.SHOP}
                variant="dark"
                size="lg"
              >
                Explore Shop
              </FashionButton>

              <FashionButton
                to={ROUTES.COLLECTIONS}
                variant="outlineDark"
                size="lg"
                showArrow={false}
              >
                View Collections
              </FashionButton>
            </motion.div>

            {/* Interactive YK Brand Pet: Sir Kip (Desktop Hero Placement — open space below CTAs, above the fold) */}
            <div className="self-start ml-8 pt-1">
              <InteractiveBrandPet />
            </div>
          </div>

          {/* Right Column: Dominant Editorial Fashion Artwork (7 Columns) */}
          <div className="lg:col-span-7 relative z-10">
            {/* Subtle architectural offset backdrop */}
            <div className="absolute -inset-3 bg-[#EADFD4]/60 rounded-[2.25rem] -rotate-1 border border-[#D8C8BA] -z-10 pointer-events-none" />

            {/* Main Interactive Framed Composition */}
            <motion.div
              style={
                shouldReduceMotion
                  ? {}
                  : {
                      rotateX: imageTiltX,
                      rotateY: imageTiltY,
                      x: imageTranslateX,
                      y: imageTranslateY,
                      transformPerspective: 1000,
                    }
              }
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, clipPath: 'inset(8% 0% 0% 0% round 1.75rem)', scale: 0.98 }
              }
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 1.75rem)', scale: 1 }
              }
              transition={{ duration: 1.05, delay: 0.1, ease: luxuryEase }}
              className="relative p-3.5 xl:p-4 bg-[#FFFFFF] rounded-[1.85rem] border border-[#E4D7CC] shadow-[0_20px_50px_rgba(74,58,50,0.08)] group"
            >
              {/* Primary Image Container */}
              <div className="relative aspect-[4/4.7] xl:aspect-[4/4.5] w-full rounded-2xl overflow-hidden bg-[#EADFD4]">
                <motion.img
                  initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.06 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.2, delay: 0.15, ease: luxuryEase }}
                  src={heroProduct.images[0]}
                  alt={`YK Mens Fashion — ${heroProduct.name}`}
                  className="w-full h-full object-cover object-[center_top] transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                  loading="eager"
                  fetchPriority="high"
                />

                {/* Secondary Inset Swatch / Detail Shot (Visual craft & texture depth) */}
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.4, ease: luxuryEase }}
                  className="absolute top-4 right-4 w-28 xl:w-32 aspect-[3/4] rounded-xl overflow-hidden border-2 border-[#FFFFFF] shadow-lg bg-[#EADFD4] hidden sm:block group/inset"
                >
                  <img
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80"
                    alt="Tailoring Texture Detail"
                    className="w-full h-full object-cover object-center group-hover/inset:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#33251F]/80 to-transparent p-1.5 text-center">
                    <span className="text-[9px] uppercase tracking-wider text-[#FFFFFF] font-semibold block">
                      Tailored Fit
                    </span>
                  </div>
                </motion.div>

                {/* Floating Inset Action Card: Pure White Card with beige border */}
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.42, ease: luxuryEase }}
                  className="absolute inset-x-4 bottom-4 p-4 bg-[#FFFFFF]/95 backdrop-blur-md rounded-xl border border-[#E4D7CC] flex justify-between items-center shadow-lg transition-all duration-300 hover:bg-[#FFFFFF]"
                >
                  <div className="pr-3">
                    <span className="text-[10px] uppercase tracking-wider text-[#8B7768] font-semibold block">
                      Featured Piece
                    </span>
                    <h4 className="text-sm font-bold text-[#33251F]">
                      {heroProduct.name}
                    </h4>
                  </div>
                  <Link
                    to={`/product/${heroProduct.slug}`}
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-[#4A3A32] text-[#FAF7F2] hover:bg-[#33251F] text-xs font-semibold rounded-lg transition-colors shadow-xs active:scale-95 shrink-0"
                  >
                    <span>Shop</span>
                    <AnimatedArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
