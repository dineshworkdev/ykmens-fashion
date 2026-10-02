import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../components/layout/Container';
import HeroSection from '../components/home/HeroSection';
import RadialShowcaseCarousel from '../components/home/RadialShowcaseCarousel';
import FashionButton from '../components/common/FashionButton';
import { useProducts } from '../hooks/useProducts';
import { CATEGORIES } from '../data/categories';
import { ROUTES } from '../utils/constants';
import {
  AnimatedArrowRight,
  AnimatedArrowLeft,
  AnimatedChevronRight,
} from '../components/common/AnimatedIcons';

// Refined luxury cubic bezier curves
const luxuryEase = [0.22, 1, 0.36, 1];

/**
 * YK MENS FASHION - Phase 2A Final Visual Reconstruction
 * 
 * Strict Compliance:
 * - LIGHT / MEDIUM-LIGHT SURFACES dominate the entire experience (#F2EFEA, #E7DECD, #EDE7C7, #DFE5F3).
 * - NO dark dominant page backgrounds (#0D0D0D, #200E01, etc. used only for text, borders, buttons, accents).
 * - Seamless visual connection from loading animation stage (#FFFFFF / light) to homepage surface.
 * - Balanced typography hierarchy (confident, fashionable, readable — NOT giant text-9xl).
 * - Refined corner radius system (rounded-2xl containers, rounded-xl images & buttons).
 * - NO fake fashion magazine text (removed issue numbers, N° 01, coordinates, atelier claims).
 * - Homepage is a SHOWCASE: no prices displayed on showcase sections.
 * - Practical, touch-friendly CTAs: "EXPLORE SHOP", "SHOP NOW", "EXPLORE COLLECTION".
 * - Fully structured, mobile-first layouts with zero awkward overlaps.
 */
export const HomePage = () => {
  const { getNewArrivals } = useProducts();
  const newArrivals = getNewArrivals().slice(0, 6);
  const carouselRef = useRef(null);

  // 4 Featured categories with verified high-quality imagery
  const [outerwear, shirts, trousers, tshirts] = CATEGORIES;

  return (
    <div className="bg-[#F2EFEA] text-[#0D0D0D] overflow-x-hidden selection:bg-[#8B0000] selection:text-[#EDE7C7]">
      {/* =========================================================================
          CHAPTER 01: HERO — EDITORIAL MODERN MENSWEAR HERO
          Surface: Light Sand #F2EFEA + Cream #EDE7C7
          Typography: Deep Obsidian #0D0D0D + Espresso #200E01
          Accents: Crimson #8B0000 + Slate #557373
          ========================================================================= */}
      <HeroSection />

      {/* =========================================================================
          CHAPTER 02: CATEGORY SHOWCASE
          Surface: Warm Parchment #E7DECD / Light Cream #EDE7C7
          Structured Grid: 4 categories with rounded containers & hover micro-motion
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#E7DECD]/40 border-b border-[#DFE5F3]">
        <Container>
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-12 border-b border-[#DFE5F3] gap-4">
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

          {/* Structured Category Grid: Clean 4-card grid on desktop, scroll/stack on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* 1. OUTERWEAR */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: luxuryEase }}
              className="group bg-white rounded-2xl p-4 border border-[#E7DECD] hover:border-[#200E01] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#F2EFEA] mb-4">
                <img
                  src={outerwear.image}
                  alt={outerwear.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="pt-1">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#557373] block mb-1">
                  Coats & Jackets
                </span>
                <h3 className="font-serif text-xl font-bold text-[#0D0D0D] mb-3">
                  {outerwear.name}
                </h3>
                <Link
                  to={`${ROUTES.SHOP}?category=outerwear`}
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#200E01] group-hover:text-[#8B0000] transition-colors"
                >
                  <span>Explore Outerwear</span>
                  <AnimatedChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* 2. SHIRTS */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: luxuryEase }}
              className="group bg-white rounded-2xl p-4 border border-[#E7DECD] hover:border-[#200E01] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#F2EFEA] mb-4">
                <img
                  src={shirts.image}
                  alt={shirts.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="pt-1">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#557373] block mb-1">
                  Tailored & Relaxed
                </span>
                <h3 className="font-serif text-xl font-bold text-[#0D0D0D] mb-3">
                  {shirts.name}
                </h3>
                <Link
                  to={`${ROUTES.SHOP}?category=shirts`}
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#200E01] group-hover:text-[#8B0000] transition-colors"
                >
                  <span>Explore Shirts</span>
                  <AnimatedChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* 3. TROUSERS */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: luxuryEase }}
              className="group bg-white rounded-2xl p-4 border border-[#E7DECD] hover:border-[#200E01] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#F2EFEA] mb-4">
                <img
                  src={trousers.image}
                  alt={trousers.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="pt-1">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#557373] block mb-1">
                  Pleated & Wide-Leg
                </span>
                <h3 className="font-serif text-xl font-bold text-[#0D0D0D] mb-3">
                  {trousers.name}
                </h3>
                <Link
                  to={`${ROUTES.SHOP}?category=trousers`}
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#200E01] group-hover:text-[#8B0000] transition-colors"
                >
                  <span>Explore Trousers</span>
                  <AnimatedChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* 4. T-SHIRTS */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: luxuryEase }}
              className="group bg-white rounded-2xl p-4 border border-[#E7DECD] hover:border-[#200E01] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#F2EFEA] mb-4">
                <img
                  src={tshirts.image}
                  alt={tshirts.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="pt-1">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-[#557373] block mb-1">
                  Heavyweight Cotton
                </span>
                <h3 className="font-serif text-xl font-bold text-[#0D0D0D] mb-3">
                  {tshirts.name}
                </h3>
                <Link
                  to={`${ROUTES.SHOP}?category=t-shirts`}
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#200E01] group-hover:text-[#8B0000] transition-colors"
                >
                  <span>Explore T-Shirts</span>
                  <AnimatedChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          CHAPTER 03: SHOWCASE RUNWAY (SELECTED PRODUCTS)
          Surface: Crisp Light Canvas #F2EFEA
          Showcase Rule: NO product prices on homepage showcase.
          CTAs: "VIEW PRODUCT" or "SHOP NOW".
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#F2EFEA] border-b border-[#DFE5F3] overflow-hidden">
        <Container>
          {/* Section Header with Slider Navigation Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-6 sm:mb-8 border-b border-[#DFE5F3] gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#8B0000] font-bold block mb-2">
                New Arrivals
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0D0D0D]">
                Seasonal Showcase
              </h2>
            </div>

            {/* Slider Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => carouselRef.current?.prev()}
                aria-label="Previous product"
                className="p-3 bg-white hover:bg-[#E7DECD] border border-[#DFE5F3] text-[#0D0D0D] rounded-xl transition-colors shadow-xs active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
              >
                <AnimatedArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => carouselRef.current?.next()}
                aria-label="Next product"
                className="p-3 bg-white hover:bg-[#E7DECD] border border-[#DFE5F3] text-[#0D0D0D] rounded-xl transition-colors shadow-xs active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8B0000]/30"
              >
                <AnimatedArrowRight className="w-4 h-4" />
              </button>
              <FashionButton
                to={`${ROUTES.SHOP}?filter=new`}
                variant="dark"
                size="sm"
                className="ml-2"
              >
                Shop Now
              </FashionButton>
            </div>
          </div>

          {/* Radial Carousel (Invisible Donut / Upper Front Arc Geometry) */}
          <RadialShowcaseCarousel
            ref={carouselRef}
            products={newArrivals}
          />
        </Container>
      </section>

      {/* =========================================================================
          CHAPTER 04: BRAND STORY
          Surface: Warm Light Parchment #E7DECD / Cream #EDE7C7
          Neutral Storytelling (No fake atelier/provenance claims)
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#EDE7C7]/50 border-b border-[#DFE5F3]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Story Visual with Rounded Corners */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: luxuryEase }}
              className="lg:col-span-6 relative"
            >
              <div className="relative aspect-[4/5] bg-white rounded-3xl p-3 sm:p-4 border border-[#E7DECD] shadow-md overflow-hidden">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-[#F2EFEA]">
                  <img
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85"
                    alt="YK MENS FASHION Brand Story"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>
            </motion.div>

            {/* Story Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: luxuryEase }}
              className="lg:col-span-6 space-y-6"
            >
              <span className="text-xs uppercase tracking-[0.25em] text-[#8B0000] font-bold block">
                The Philosophy
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0D0D0D] leading-[1.12]">
                Menswear Designed For Confidence & Everyday Life
              </h2>

              <p className="text-sm sm:text-base text-[#557373] leading-relaxed">
                YK MENS FASHION was founded on a simple conviction: men deserve clothing that balances sharp, confident style with genuine everyday ease. We reject stiff, uncomfortable tailoring and transient fast-fashion trends in favor of thoughtfully proportioned garments you will reach for day after day.
              </p>

              <p className="text-sm sm:text-base text-[#557373] leading-relaxed">
                From precision-cut shirts and structured outerwear to comfortable pleated trousers, every piece is made with high-quality fabrics, durable construction, and a clean modern aesthetic.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <FashionButton
                  to={ROUTES.ABOUT}
                  variant="dark"
                  size="md"
                >
                  Our Story
                </FashionButton>
                <FashionButton
                  to={ROUTES.SHOP}
                  variant="outlineDark"
                  size="md"
                  showArrow={false}
                >
                  Explore Shop
                </FashionButton>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          CHAPTER 05: LOOKBOOK HIGHLIGHT
          Surface: Ice Blue #DFE5F3 / Light Sand
          Structured Collage with Rounded Corners
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#DFE5F3]/40 border-b border-[#DFE5F3]">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-12 border-b border-[#DFE5F3] gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#8B0000] font-bold block mb-2">
                Visual Curation
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0D0D0D]">
                The Lookbook
              </h2>
            </div>
            <FashionButton
              to={ROUTES.LOOKBOOK}
              variant="dark"
              size="sm"
            >
              View Lookbook
            </FashionButton>
          </div>

          {/* Structured 3-Image Collage with Rounded Corners */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Image 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: luxuryEase }}
              className="md:col-span-5 bg-white p-3 rounded-2xl border border-[#DFE5F3] shadow-sm overflow-hidden group"
            >
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-[#F2EFEA]">
                <img
                  src="https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=1200&q=85"
                  alt="Lookbook 01"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </motion.div>

            {/* Image 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: luxuryEase }}
              className="md:col-span-4 bg-white p-3 rounded-2xl border border-[#DFE5F3] shadow-sm overflow-hidden group"
            >
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-[#F2EFEA]">
                <img
                  src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=800&q=85"
                  alt="Lookbook 02"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </motion.div>

            {/* Image 3 & CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: luxuryEase }}
              className="md:col-span-3 flex flex-col space-y-6"
            >
              <div className="bg-white p-3 rounded-2xl border border-[#DFE5F3] shadow-sm overflow-hidden group">
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-[#F2EFEA]">
                  <img
                    src="https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&w=800&q=85"
                    alt="Lookbook 03"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#DFE5F3] shadow-sm space-y-3">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#8B0000] block">
                  Curated Ensembles
                </span>
                <h4 className="font-serif text-lg font-bold text-[#0D0D0D]">
                  Complete Wardrobe Looks
                </h4>
                <p className="text-xs text-[#557373] leading-relaxed">
                  Discover how our shirts, trousers, and outerwear combine into cohesive everyday outfits.
                </p>
                <Link
                  to={ROUTES.LOOKBOOK}
                  className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#200E01] hover:text-[#8B0000] transition-colors"
                >
                  <span>Explore Ensembles</span>
                  <AnimatedChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          CHAPTER 06: CLOSING BRAND INVITATION
          Surface: Warm Light Parchment #E7DECD
          Clear CTA directing users toward Shop
          ========================================================================= */}
      <section className="py-20 sm:py-24 bg-[#E7DECD]/60">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#8B0000] font-bold block">
              Step Into YK Mens Fashion
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#0D0D0D]">
              Upgrade Your Everyday Wardrobe
            </h2>

            <p className="text-sm sm:text-base text-[#557373] leading-relaxed max-w-xl mx-auto">
              Explore our full catalog of thoughtfully designed menswear pieces. Tailored with care, delivered directly to your doorstep across India.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <FashionButton
                to={ROUTES.SHOP}
                variant="dark"
                size="lg"
              >
                Shop Now
              </FashionButton>
              <FashionButton
                to={ROUTES.COLLECTIONS}
                variant="outlineDark"
                size="lg"
                showArrow={false}
              >
                Explore Collections
              </FashionButton>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;
