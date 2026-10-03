import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../components/layout/Container';
import { ArrowRight, ShoppingBag, Eye, Layers, CheckCircle2 } from '../assets/icons';
import { ROUTES } from '../utils/constants';
import { CATEGORIES } from '../data/categories';

/**
 * About Page (/about)
 * Explains YK MENS FASHION clearly and truthfully without fabricated founder stories or fake claims.
 */
export const AboutPage = () => {
  const shoppingSteps = [
    {
      step: '01',
      title: 'Browse Curated Collections',
      description: 'Explore focused categories and seasonal silhouettes designed for contemporary menswear.',
      icon: Layers,
    },
    {
      step: '02',
      title: 'Inspect Garment Details',
      description: 'Review high-resolution imagery, fabric details, structured cuts, and sizing specifications.',
      icon: Eye,
    },
    {
      step: '03',
      title: 'Select Size & Color',
      description: 'Choose your preferred size and color variants with responsive stock availability.',
      icon: CheckCircle2,
    },
    {
      step: '04',
      title: 'Direct Order Placement',
      description: 'Add pieces to your bag and proceed through a clean, truthful multi-step checkout experience.',
      icon: ShoppingBag,
    },
  ];

  return (
    <div className="bg-[#241812] text-[#FAF7F2] py-10 md:py-16 space-y-16 md:space-y-24">
      {/* SECTION 1 — INTRO */}
      <section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Intro Text */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-6 space-y-5"
            >
              <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#C8B8AA] font-semibold">
                <Link to={ROUTES.HOME} className="hover:text-[#FAF7F2]">
                  Home
                </Link>
                <span>/</span>
                <span className="text-[#FAF7F2]">About</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF7F2] leading-tight">
                About YK MENS FASHION
              </h1>

              <div className="space-y-4 text-sm sm:text-base text-[#C8B8AA] leading-relaxed">
                <p className="text-[#FAF7F2] font-medium text-base sm:text-lg">
                  YK MENS FASHION is a contemporary men's clothing brand dedicated to refined silhouettes, disciplined proportions, and everyday versatility.
                </p>
                <p>
                  We focus on building a cohesive wardrobe for modern men: sharp blazers that hold clean structure without stiffness, breathable shirts tailored for ease, relaxed pleated trousers, and substantial layering pieces.
                </p>
                <p>
                  Our design approach favors balanced, enduring pieces over fleeting trends—giving you clothing that feels natural, polished, and confident wherever you go.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to={ROUTES.COLLECTIONS}
                  className="inline-flex items-center space-x-2 px-6 py-3.5 bg-[#FAF7F2] text-[#1D1410] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#E8DEC8] active:scale-95 transition-all shadow-md"
                >
                  <span>Explore Collections</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to={ROUTES.SHOP}
                  className="inline-flex items-center space-x-2 px-6 py-3.5 border border-[#3E2B21] bg-[#2C1E18] text-[#FAF7F2] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#3E2B21] transition-colors"
                >
                  <span>Shop All Products</span>
                </Link>
              </div>
            </motion.div>

            {/* Intro Hero Imagery with Clip-Path Reveal */}
            <motion.div
              initial={{ clipPath: 'inset(10% 0% 0% 0% round 1.5rem)', opacity: 0 }}
              animate={{ clipPath: 'inset(0% 0% 0% 0% round 1.5rem)', opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6"
            >
              <div className="relative aspect-[4/5] sm:aspect-[5/6] bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-xl border border-[#E8DEC8]">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85"
                  alt="YK MENS FASHION Tailoring & Menswear"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-[#FAF7F2]">
                  <span className="text-[11px] uppercase tracking-widest font-semibold block text-[#D99E84]">
                    Contemporary Silhouette
                  </span>
                  <p className="text-lg font-bold">
                    Tailored Structure & Modern Wearability
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* SECTION 2 — WHAT WE OFFER (DEEP FOREST OLIVE) */}
      <section className="bg-[#202920] py-16 border-y border-[#2E3A2E]">
        <Container>
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-widest text-[#D99E84] font-bold block mb-1">
              Curated Wardrobe
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF7F2]">
              What We Offer
            </h2>
            <p className="text-sm text-[#C8B8AA] mt-2 leading-relaxed">
              Explore our core menswear categories designed to seamlessly pair with one another.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Link
                  to={`${ROUTES.SHOP}?category=${category.slug}`}
                  className="group block bg-[#FAF7F2] border border-[#E8DEC8] rounded-2xl overflow-hidden hover:border-[#A6445D] transition-all shadow-sm hover:shadow-xl"
                >
                  <div className="aspect-[4/3] bg-[#EFEAE2] overflow-hidden relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-[#FAF7F2] text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
                      {category.itemCount}
                    </div>
                  </div>

                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-[#1D1410] text-base group-hover:text-[#A6445D] transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-xs text-[#6A5C52] mt-0.5">
                        {category.subheading || category.tagline}
                      </p>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-[#E8DEC8]/60 group-hover:bg-[#1D1410] group-hover:text-[#FAF7F2] flex items-center justify-center transition-colors flex-shrink-0 text-[#1D1410]">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 3 — THE SHOPPING EXPERIENCE */}
      <section>
        <Container>
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-widest text-[#D99E84] font-bold block mb-1">
              Straightforward Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF7F2]">
              The Shopping Experience
            </h2>
            <p className="text-sm text-[#C8B8AA] mt-2 leading-relaxed">
              We keep the e-commerce journey intuitive and transparent from initial discovery to final checkout.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {shoppingSteps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.step}
                  className="bg-[#2C1E18] border border-[#3E2B21] rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#D99E84]">
                        {step.step}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-[#3E2B21] text-[#FAF7F2] flex items-center justify-center">
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="font-bold text-[#FAF7F2] text-sm">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#C8B8AA] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* SECTION 4 — CALL TO ACTION (RICH BURGUNDY) */}
      <section>
        <Container>
          <div className="bg-[#34151C] border border-[#4A1E28] rounded-3xl p-8 sm:p-12 lg:p-16 text-center space-y-6 shadow-xl">
            <span className="text-xs uppercase tracking-widest text-[#D99E84] font-bold block">
              Discover YK MENS FASHION
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2] max-w-xl mx-auto">
              Ready to explore our curated menswear?
            </h2>
            <p className="text-xs sm:text-sm text-[#D4BFC4] max-w-md mx-auto leading-relaxed">
              Browse our complete catalog of shirts, blazers, trousers, outerwear, and accessories.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={ROUTES.COLLECTIONS}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#FAF7F2] text-[#1D1410] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#E8DEC8] active:scale-95 transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <span>Explore The Collections</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={ROUTES.SHOP}
                className="w-full sm:w-auto px-8 py-3.5 border border-[#FAF7F2]/30 text-[#FAF7F2] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#FAF7F2]/10 transition-colors"
              >
                <span>Shop All Products</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default AboutPage;
