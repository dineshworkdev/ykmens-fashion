import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../components/layout/Container';
import { ArrowRight, Eye, ShoppingBag, Layers } from '../assets/icons';
import { ROUTES } from '../utils/constants';

/**
 * Lookbook Page (/lookbook)
 * Editorial visual inspiration showcase connecting styled looks to authentic menswear pieces.
 * Mobile-first responsive layout with mature micro-interactions.
 */
export const LookbookPage = () => {
  const [activeLookId, setActiveLookId] = useState(null);

  const curatedLooks = [
    {
      id: 'look-tailored-silhouette',
      number: 'LOOK 01',
      title: 'The Tailored Silhouette',
      subtitle: 'Unstructured single-breasted blazer styled with high-rise pleated wool trousers.',
      primaryImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
      detailImage: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=800&q=80',
      pieces: [
        { name: 'Unstructured Single-Breasted Blazer', slug: 'architectural-blazer-dark', category: 'Tailoring' },
        { name: 'Pleated Wool Flannel Trousers', slug: 'wide-leg-pleated-trousers-olive', category: 'Trousers' },
      ],
      collectionSlug: 'tailored-modernity',
      collectionName: 'The Tailored Edit',
      aspectRatio: 'aspect-[4/5]',
    },
    {
      id: 'look-structured-outerwear',
      number: 'LOOK 02',
      title: 'Structured Outerwear & Proportions',
      subtitle: 'Double-breasted virgin wool overcoat draped cleanly over a concealed placket poplin shirt.',
      primaryImage: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&w=1200&q=85',
      detailImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
      pieces: [
        { name: 'Structured Wool Overcoat', slug: 'structured-wool-overcoat-obsidian', category: 'Outerwear' },
        { name: 'Concealed Placket Poplin Shirt', slug: 'minimalist-poplin-shirt-alabaster', category: 'Shirts' },
      ],
      collectionSlug: 'architectural-outerwear',
      collectionName: 'Structured Outerwear',
      aspectRatio: 'aspect-[3/4]',
    },
    {
      id: 'look-tactile-layers',
      number: 'LOOK 03',
      title: 'Tactile Warmth & Everyday Ease',
      subtitle: 'Dense ribbed cashmere mockneck layered with clean wool flannel trousers.',
      primaryImage: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=85',
      detailImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
      pieces: [
        { name: 'Ribbed Cashmere Mockneck', slug: 'ribbed-cashmere-mockneck-slate', category: 'Fine Knitwear' },
        { name: 'Pleated Wool Flannel Trousers', slug: 'wide-leg-pleated-trousers-olive', category: 'Trousers' },
      ],
      collectionSlug: 'tactile-layers',
      collectionName: 'Tactile Knitwear & Layers',
      aspectRatio: 'aspect-[4/5]',
    },
    {
      id: 'look-everyday-foundations',
      number: 'LOOK 04',
      title: 'Everyday Clean Foundation',
      subtitle: 'Crisp two-ply poplin shirting paired with disciplined tailoring for daily wear.',
      primaryImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=85',
      detailImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      pieces: [
        { name: 'Concealed Placket Poplin Shirt', slug: 'minimalist-poplin-shirt-alabaster', category: 'Shirts' },
        { name: 'Unstructured Single-Breasted Blazer', slug: 'architectural-blazer-dark', category: 'Tailoring' },
      ],
      collectionSlug: 'everyday-foundations',
      collectionName: 'Everyday Foundations',
      aspectRatio: 'aspect-[3/4]',
    },
  ];

  return (
    <div className="py-10 md:py-16 space-y-16 md:space-y-24">
      {/* Header */}
      <Container>
        <div className="pb-8 border-b border-[#DFE5F3]">
          <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#557373] font-semibold mb-2">
            <Link to={ROUTES.HOME} className="hover:text-[#0D0D0D]">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#0D0D0D]">Lookbook</span>
          </div>

          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0D0D0D]">
              Visual Lookbook
            </h1>
            <p className="text-sm sm:text-base text-[#557373] mt-3 leading-relaxed">
              Curated menswear pairings and proportions. Explore how tailored cuts, tactile knitwear, and structured outerwear come together.
            </p>
          </div>
        </div>
      </Container>

      {/* Editorial Looks List */}
      <Container>
        <div className="space-y-24 sm:space-y-32">
          {curatedLooks.map((look, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={look.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                {/* Visual Image Composition (Desktop Asymmetric, Mobile Full) */}
                <div
                  className={`lg:col-span-7 relative ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="relative">
                    {/* Primary Hero Image with Refined Clip-Path Reveal */}
                    <motion.div
                      initial={{ clipPath: 'inset(8% 0% 0% 0% round 1.5rem)', opacity: 0 }}
                      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 1.5rem)', opacity: 1 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                      className={`${look.aspectRatio} bg-[#E7DECD] rounded-3xl overflow-hidden shadow-lg border border-[#DFE5F3] relative group`}
                    >
                      <img
                        src={look.primaryImage}
                        alt={look.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/40 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-80 transition-opacity" />

                      {/* Floating Badge */}
                      <div className="absolute top-4 left-4 bg-[#F2EFEA]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-[#0D0D0D] border border-[#DFE5F3]">
                        {look.number}
                      </div>
                    </motion.div>

                    {/* Secondary Detail Floating Card (Desktop Only with Hover Lift) */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 15 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className={`hidden sm:block absolute -bottom-8 ${
                        isEven ? '-right-6' : '-left-6'
                      } w-44 lg:w-48 aspect-[3/4] bg-[#F2EFEA] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl border-2 border-[#F2EFEA] z-10 group/card transition-all duration-500 hover:-translate-y-2`}
                    >
                      <img
                        src={look.detailImage}
                        alt={`${look.title} detail`}
                        className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700 ease-out"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-[#0D0D0D]/20 group-hover/card:bg-transparent transition-colors" />
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#0D0D0D]/80 backdrop-blur-sm text-[#F2EFEA] text-[9px] uppercase tracking-wider font-semibold py-1 px-2 rounded-md text-center">
                        Fabric & Cut
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Editorial Information & Shop Integration */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-widest text-[#8B0000] font-bold block">
                      {look.number} • {look.collectionName}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0D0D0D]">
                      {look.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#557373] leading-relaxed pt-1">
                      {look.subtitle}
                    </p>
                  </div>

                  {/* Featured Pieces in This Look */}
                  <div className="bg-[#F2EFEA] border border-[#DFE5F3] rounded-2xl p-5 space-y-3">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-[#0D0D0D] block pb-2 border-b border-[#DFE5F3]">
                      Featured Pieces
                    </span>
                    <div className="space-y-2.5">
                      {look.pieces.map((piece) => (
                        <div
                          key={piece.slug}
                          className="flex items-center justify-between text-xs group"
                        >
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-[#557373] block">
                              {piece.category}
                            </span>
                            <span className="font-semibold text-[#0D0D0D] group-hover:text-[#8B0000] transition-colors">
                              {piece.name}
                            </span>
                          </div>
                          <Link
                            to={`/product/${piece.slug}`}
                            className="inline-flex items-center space-x-1 text-[11px] font-semibold text-[#142F40] hover:text-[#0D0D0D] p-1 transition-colors"
                          >
                            <span>Inspect</span>
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-wrap gap-3">
                    <Link
                      to={`/collection/${look.collectionSlug}`}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-[#0D0D0D] text-[#F2EFEA] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#272401] active:scale-95 transition-all shadow-md"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      to={ROUTES.SHOP}
                      className="inline-flex items-center space-x-1.5 px-5 py-3 border border-[#DFE5F3] text-[#0D0D0D] text-xs uppercase tracking-wider font-semibold rounded-xl hover:bg-[#DFE5F3] transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Shop The Look</span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>

      {/* Bottom Exploration Banner */}
      <section>
        <Container>
          <div className="bg-[#EDE7C7]/60 border border-[#DFE5F3] rounded-3xl p-8 sm:p-12 text-center space-y-5 shadow-sm">
            <span className="text-xs uppercase tracking-widest text-[#272401] font-bold block">
              Complete Wardrobe
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0D0D0D] max-w-xl mx-auto">
              Want to see all available menswear pieces?
            </h2>
            <p className="text-xs sm:text-sm text-[#393A10] max-w-md mx-auto leading-relaxed">
              Browse our full catalog with interactive filters for size, category, color, and availability.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to={ROUTES.SHOP}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#0D0D0D] text-[#F2EFEA] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#272401] active:scale-95 transition-all shadow-md"
              >
                Browse Shop Catalog
              </Link>
              <Link
                to={ROUTES.COLLECTIONS}
                className="w-full sm:w-auto px-8 py-3.5 border border-[#0D0D0D] text-[#0D0D0D] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#DFE5F3] transition-colors"
              >
                View All Collections
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default LookbookPage;
