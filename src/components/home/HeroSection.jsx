import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Container from '../layout/Container';
import FashionButton from '../common/FashionButton';
import { ROUTES } from '../../utils/constants';
import { AnimatedArrowRight } from '../common/AnimatedIcons';

// Refined luxury cubic bezier curves
const luxuryEase = [0.22, 1, 0.36, 1];

// Category cues for quick wardrobe navigation (replacing generic benefit bullets)
const HERO_CATEGORIES = [
  { label: 'Outerwear', slug: 'outerwear', code: '01' },
  { label: 'Shirts', slug: 'shirts', code: '02' },
  { label: 'Trousers', slug: 'trousers', code: '03' },
  { label: 'Tailoring', slug: 'outerwear', code: '04' },
];

/**
 * YK MENS FASHION — HERO SECTION VISUAL UPGRADE
 * 
 * Mobile + Desktop Editorial Fashion Composition
 * - Visual Dominance: Primary fashion visual takes center stage
 * - Immediate recognition: "This is a modern men's fashion brand"
 * - Mobile-first structure: Fashion Visual -> Brand Label -> Headline -> Short Copy -> Dominant CTAs
 * - Desktop editorial structure: Asymmetric balance, layered imagery, intentional negative space
 * - Color discipline: Light Sand (#F2EFEA), Cream (#EDE7C7), Parchment (#E7DECD), Ice (#DFE5F3) dominant
 *   Dark Obsidian (#0D0D0D) and Espresso (#200E01) for text, buttons, and borders
 *   Crimson (#8B0000) reserved for subtle accents
 * - Respects prefers-reduced-motion
 */
export const HeroSection = () => {
  const shouldReduceMotion = useReducedMotion();
  const heroContainerRef = useRef(null);

  // Subtle cursor interaction for desktop image frame (disabled on reduced motion / touch)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 200 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const imageTiltX = useTransform(smoothMouseY, [-0.5, 0.5], ['2deg', '-2deg']);
  const imageTiltY = useTransform(smoothMouseX, [-0.5, 0.5], ['-2.5deg', '2.5deg']);
  const imageTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], ['-4px', '4px']);
  const imageTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], ['-4px', '4px']);

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
      className="relative bg-[#F2EFEA] border-b border-[#E7DECD] pt-4 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-20 overflow-hidden"
    >
      {/* Subtle architectural hairline accents in approved palette */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-[#E7DECD] via-transparent to-transparent hidden lg:block" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-[#E7DECD] via-transparent to-transparent hidden lg:block" />
      </div>

      <Container className="relative z-10">
        {/* =========================================================================
            MOBILE LAYOUT (Below lg: 1024px)
            Strict mobile-first hierarchy:
            1. Prominent Fashion Visual (at top)
            2. Brand Label with Crimson Accent
            3. Campaign Headline
            4. Concise Supporting Statement
            5. Dominant Action CTAs
            6. Wardrobe Category Cues
            ========================================================================= */}
        <div className="flex flex-col lg:hidden space-y-6">
          {/* 1. Mobile Fashion Visual — Front and Center */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, clipPath: 'inset(8% 0% 0% 0% round 1.25rem)' }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 1.25rem)' }}
            transition={{ duration: 0.85, ease: luxuryEase }}
            className="w-full relative"
          >
            {/* Editorial Outer Frame */}
            <div className="relative p-2 sm:p-3 bg-[#EDE7C7]/60 rounded-2xl sm:rounded-3xl border border-[#E7DECD] shadow-sm">
              <div className="relative aspect-[4/4.6] sm:aspect-[4/4.2] w-full max-h-[460px] rounded-xl sm:rounded-2xl overflow-hidden bg-[#E7DECD]/40">
                <motion.img
                  initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.06 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.1, ease: luxuryEase }}
                  src="https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1000&q=85"
                  alt="YK Mens Fashion — Modern Menswear Campaign"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                  fetchPriority="high"
                />

                {/* Subtle top season pill */}
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#0D0D0D]/80 backdrop-blur-xs text-[#F2EFEA] text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full shadow-xs">
                  New Season
                </div>

                {/* Overlaid Editorial Product Link Capsule */}
                <Link
                  to="/product/structured-wool-overcoat-obsidian"
                  className="absolute inset-x-3 bottom-3 p-3 bg-white/95 backdrop-blur-sm rounded-xl border border-[#DFE5F3] flex items-center justify-between shadow-md active:bg-[#F2EFEA] transition-colors"
                >
                  <div className="pr-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#557373] font-semibold block">
                      Featured Piece
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#0D0D0D] truncate">
                      Structured Wool Overcoat
                    </h4>
                  </div>
                  <span className="inline-flex items-center space-x-1 px-2.5 py-1.5 bg-[#0D0D0D] text-[#F2EFEA] text-[11px] font-semibold rounded-lg shrink-0">
                    <span>Shop</span>
                    <AnimatedArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* 2. Mobile Brand Label */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: luxuryEase }}
            className="flex items-center space-x-2.5 text-xs uppercase tracking-[0.25em] text-[#557373] font-semibold pt-1"
          >
            <span className="w-5 h-[2px] bg-[#8B0000] rounded-full" />
            <span>YK Mens Fashion</span>
          </motion.div>

          {/* 3. Mobile Campaign Headline */}
          <div className="space-y-1">
            <div className="overflow-hidden">
              <motion.h1
                initial={shouldReduceMotion ? { opacity: 0 } : { y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.75, delay: 0.22, ease: luxuryEase }}
                className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#0D0D0D] leading-[1.1]"
              >
                Defined By Style.
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.span
                initial={shouldReduceMotion ? { opacity: 0 } : { y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.75, delay: 0.3, ease: luxuryEase }}
                className="block font-serif font-normal italic text-[#200E01] text-2xl sm:text-3xl"
              >
                Crafted For Movement.
              </motion.span>
            </div>
          </div>

          {/* 4. Mobile Concise Supporting Statement */}
          <motion.p
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.38, ease: luxuryEase }}
            className="text-sm sm:text-base text-[#557373] leading-relaxed max-w-lg"
          >
            Modern menswear designed for everyday confidence. Elevated essentials and tailored silhouettes built to transition effortlessly.
          </motion.p>

          {/* 5. Mobile Dominant CTAs */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.44, ease: luxuryEase }}
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

          {/* 6. Mobile Wardrobe Quick Cues */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.52, ease: luxuryEase }}
            className="pt-4 border-t border-[#E7DECD]/80"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#557373] font-semibold block mb-2.5">
              Explore Wardrobe
            </span>
            <div className="flex flex-wrap gap-2">
              {HERO_CATEGORIES.map((cat) => (
                <Link
                  key={cat.label}
                  to={`/shop?category=${cat.slug}`}
                  className="px-3 py-1.5 bg-[#EDE7C7]/50 hover:bg-[#0D0D0D] text-[#200E01] hover:text-[#F2EFEA] border border-[#E7DECD] rounded-lg text-xs font-medium transition-all"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* =========================================================================
            DESKTOP LAYOUT (lg: 1024px and above)
            Sophisticated Editorial Composition:
            - Left: Distinctive typography, brand identity, concise copy, prominent CTAs
            - Right: Dominant fashion campaign visual with layered art direction and depth
            ========================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 xl:gap-14 items-center min-h-[580px] xl:min-h-[640px]">
          {/* Left Column: Brand, Headline, Copy & Actions (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-7 xl:space-y-8 z-20">
            {/* Brand Tagline with Crimson Accent */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: luxuryEase }}
              className="flex items-center space-x-3 text-xs uppercase tracking-[0.28em] text-[#557373] font-semibold"
            >
              <span className="w-8 h-[2px] bg-[#8B0000] rounded-full" />
              <span>YK Mens Fashion</span>
            </motion.div>

            {/* Campaign Headline with Masked Roll Reveal */}
            <div className="space-y-1.5">
              <div className="overflow-hidden">
                <motion.h1
                  initial={shouldReduceMotion ? { opacity: 0 } : { y: '105%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.85, delay: 0.1, ease: luxuryEase }}
                  className="font-serif text-5xl xl:text-6xl font-bold tracking-tight text-[#0D0D0D] leading-[1.05]"
                >
                  Defined By Style.
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  initial={shouldReduceMotion ? { opacity: 0 } : { y: '105%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.85, delay: 0.22, ease: luxuryEase }}
                  className="block font-serif font-normal italic text-[#200E01] text-4xl xl:text-5xl mt-0.5"
                >
                  Crafted For Movement.
                </motion.span>
              </div>
            </div>

            {/* Short, Natural Supporting Statement */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.32, ease: luxuryEase }}
              className="text-base text-[#557373] max-w-md leading-relaxed"
            >
              Modern menswear designed for everyday confidence. Elevated essentials and tailored silhouettes built to transition seamlessly from day to night.
            </motion.p>

            {/* Primary & Secondary Action Buttons */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.42, ease: luxuryEase }}
              className="flex items-center space-x-4 pt-1"
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

            {/* Editorial Wardrobe Index / Category Jump */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.52, ease: luxuryEase }}
              className="pt-6 border-t border-[#E7DECD] max-w-md"
            >
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="uppercase tracking-[0.25em] text-[#557373] font-semibold text-[11px]">
                  Wardrobe Index
                </span>
                <span className="text-[#8B0000] font-serif italic text-sm">
                  SS / 2026
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {HERO_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.label}
                    to={`/shop?category=${cat.slug}`}
                    className="group flex flex-col p-2 bg-[#EDE7C7]/40 hover:bg-[#0D0D0D] border border-[#E7DECD] rounded-xl transition-all duration-300"
                  >
                    <span className="text-[10px] font-mono text-[#557373] group-hover:text-[#EDE7C7]/80 transition-colors">
                      {cat.code}
                    </span>
                    <span className="text-xs font-semibold text-[#0D0D0D] group-hover:text-[#F2EFEA] transition-colors mt-0.5 truncate">
                      {cat.label}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Dominant Editorial Fashion Artwork (7 Columns) */}
          <div className="lg:col-span-7 relative z-10">
            {/* Subtle architectural offset backdrop */}
            <div className="absolute -inset-4 bg-[#EDE7C7]/50 rounded-[2.5rem] -rotate-1 border border-[#E7DECD]/80 -z-10 pointer-events-none" />

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
                  : { opacity: 0, clipPath: 'inset(10% 0% 0% 0% round 2rem)', scale: 0.98 }
              }
              animate={
                shouldReduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 2rem)', scale: 1 }
              }
              transition={{ duration: 1.1, delay: 0.12, ease: luxuryEase }}
              className="relative p-3.5 xl:p-4 bg-white/90 rounded-[2rem] border border-[#E7DECD] shadow-lg group"
            >
              {/* Primary Image Container */}
              <div className="relative aspect-[4/4.8] xl:aspect-[4/4.6] w-full rounded-2xl overflow-hidden bg-[#EDE7C7]/40">
                <motion.img
                  initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.25, delay: 0.18, ease: luxuryEase }}
                  src="https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1200&q=85"
                  alt="YK MENS FASHION Editorial Campaign"
                  className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                  loading="eager"
                  fetchPriority="high"
                />

                {/* Editorial Campaign Badge */}
                <div className="absolute top-4 left-4 flex items-center space-x-2 px-3 py-1.5 bg-[#0D0D0D]/85 backdrop-blur-sm text-[#F2EFEA] text-[11px] uppercase tracking-[0.2em] font-semibold rounded-lg shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#8B0000]" />
                  <span>Campaign 2026</span>
                </div>

                {/* Secondary Inset Swatch / Detail Shot (Visual craft & texture depth) */}
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.45, ease: luxuryEase }}
                  className="absolute top-4 right-4 w-28 xl:w-32 aspect-[3/4] rounded-xl overflow-hidden border-2 border-white shadow-lg bg-[#E7DECD] hidden sm:block group/inset"
                >
                  <img
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80"
                    alt="Tailoring Texture Detail"
                    className="w-full h-full object-cover object-center group-hover/inset:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0D0D0D]/80 to-transparent p-1.5 text-center">
                    <span className="text-[9px] uppercase tracking-wider text-[#F2EFEA] font-semibold block">
                      Tailored Fit
                    </span>
                  </div>
                </motion.div>

                {/* Floating Inset Action Card */}
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.48, ease: luxuryEase }}
                  className="absolute inset-x-4 bottom-4 p-4 bg-white/95 backdrop-blur-md rounded-xl border border-[#DFE5F3] flex justify-between items-center shadow-md transition-all duration-300 hover:bg-white"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#557373] font-semibold block">
                      Featured Silhouette
                    </span>
                    <h4 className="text-sm font-bold text-[#0D0D0D]">
                      Structured Wool Overcoat
                    </h4>
                  </div>
                  <Link
                    to="/product/structured-wool-overcoat-obsidian"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-[#0D0D0D] text-[#F2EFEA] hover:bg-[#8B0000] text-xs font-semibold rounded-lg transition-colors shadow-xs active:scale-95"
                  >
                    <span>Shop Piece</span>
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
