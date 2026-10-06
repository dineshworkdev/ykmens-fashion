import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../components/layout/Container';
import HeroSection from '../components/home/HeroSection';
import FeaturedCategoriesCurved from '../components/home/FeaturedCategoriesCurved';
import RadialShowcaseCarousel from '../components/home/RadialShowcaseCarousel';
import GarmentRackShowcase from '../components/home/GarmentRackShowcase';
import FashionButton from '../components/common/FashionButton';
import { PRODUCTS } from '../data/products';
import { ROUTES } from '../utils/constants';
import {
  AnimatedArrowRight,
  AnimatedArrowLeft,
  AnimatedChevronRight,
} from '../components/common/AnimatedIcons';

// Refined luxury cubic bezier curves
const luxuryEase = [0.22, 1, 0.36, 1];

// Stable slice of seasonal new arrivals for the showcase
const SEASONAL_SHOWCASE_PRODUCTS = PRODUCTS.filter((p) => p.newArrivalStatus).slice(0, 6);

export const HomePage = () => {
  const carouselRef = useRef(null);

  return (
    <div className="bg-[#FAF7F2] text-[#4A3A32] overflow-x-hidden selection:bg-[#EADFD4] selection:text-[#33251F]">
      {/* =========================================================================
          CHAPTER 01: HERO — EDITORIAL MODERN MENSWEAR HERO
          Surface: Warm Ivory #FAF7F2
          Typography: Deep Espresso #33251F + Mocha Brown #4A3A32
          ========================================================================= */}
      <HeroSection />

      {/* =========================================================================
          CHAPTER 02: FEATURED CATEGORIES — INVISIBLE CURVED EDITORIAL RUNWAY
          Surface: Cream Latte #EADFD4 + Pure White #FFFFFF Cards
          Composition: Flowing S-Curve Runway driven by normal vertical scroll
          ========================================================================= */}
      <FeaturedCategoriesCurved />

      {/* =========================================================================
          CHAPTER 03: SHOWCASE RUNWAY (SEASONAL SHOWCASE)
          Surface: Soft Warm Cream #F5EFE8
          Showcase Rule: NO product prices on homepage showcase.
          ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#F5EFE8] border-b border-[#E4D7CC] text-[#4A3A32] overflow-hidden">
        <Container>
          {/* Section Header with Slider Navigation Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-6 sm:mb-8 border-b border-[#E4D7CC] gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#6B5549] font-bold block mb-2">
                New Arrivals
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#33251F]">
                Seasonal Showcase
              </h2>
            </div>

            {/* Slider Action Buttons */}
            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => carouselRef.current?.prev()}
                  aria-label="Previous product"
                  className="p-3 bg-[#FFFFFF] hover:bg-[#FAF7F2] border border-[#D8C8BA] text-[#33251F] rounded-xl transition-colors shadow-xs active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4A3A32]/30"
                >
                  <AnimatedArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => carouselRef.current?.next()}
                  aria-label="Next product"
                  className="p-3 bg-[#FFFFFF] hover:bg-[#FAF7F2] border border-[#D8C8BA] text-[#33251F] rounded-xl transition-colors shadow-xs active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4A3A32]/30"
                >
                  <AnimatedArrowRight className="w-4 h-4" />
                </button>
              </div>
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

          {/* Seasonal Showcase: Realistic Garment Rack (Mobile & Desktop) */}
          <GarmentRackShowcase
            ref={carouselRef}
            products={SEASONAL_SHOWCASE_PRODUCTS}
          />
        </Container>
      </section>

      {/* =========================================================================
          CHAPTER 04: CLOSING BRAND INVITATION
          Surface: Cream Latte #EADFD4
          Clear CTA directing users toward Shop & Collections
          ========================================================================= */}
      <section className="py-20 sm:py-24 bg-[#EADFD4] border-b border-[#D8C8BA]">
        <Container>
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#6B5549] font-bold block">
              Step Into YK Mens Fashion
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#33251F]">
              Upgrade Your Everyday Wardrobe
            </h2>

            <p className="text-sm sm:text-base text-[#4A3A32] leading-relaxed max-w-xl mx-auto">
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
