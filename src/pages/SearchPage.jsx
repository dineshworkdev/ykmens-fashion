import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../components/layout/Container';
import ProductGrid from '../components/product/ProductGrid';
import QuickViewModal from '../components/product/QuickViewModal';
import { AnimatedSearchIcon, AnimatedCloseIcon, AnimatedArrowRight } from '../components/common/AnimatedIcons';
import FashionButton from '../components/common/FashionButton';
import { useProducts } from '../hooks/useProducts';
import { ROUTES } from '../utils/constants';

const SUGGESTED_SEARCHES = [
  'Wool',
  'Overcoat',
  'Poplin',
  'Trousers',
  'Cashmere',
  'Blazer',
  'T-Shirts',
  'Pleated',
];

/**
 * YK MENS FASHION - Search Experience
 * 
 * Strict Compliance:
 * - Premium, fast, and responsive search interface
 * - Input receives auto-focus with clear (X) button
 * - Suggested query chips based on real product tags/materials
 * - Polished empty state with actionable recovery pathways
 * - Quick View modal support
 * - Light surface foundation (#F2EFEA)
 */
export const SearchPage = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { products, searchQuery, setSearchQuery } = useProducts();

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  useEffect(() => {
    // Focus search input when page opens
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleOpenQuickView = (product) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="bg-[#FAF7F2] text-[#4A3A32] min-h-screen py-10 sm:py-16">
      <Container>
        {/* Search Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[#8B7768] font-bold block">
              Catalog Search
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#33251F]">
              Search Menswear
            </h1>
            <p className="text-xs sm:text-sm text-[#6B5549] leading-relaxed max-w-lg mx-auto">
              Search by garment silhouette, category, material, or color palette.
            </p>
          </motion.div>

          {/* Interactive Search Bar Input */}
          <div className="mt-8 relative">
            <div className="relative flex items-center bg-[#FFFFFF] rounded-2xl border border-[#D8C8BA] hover:border-[#4A3A32] focus-within:border-[#4A3A32] shadow-sm transition-all overflow-hidden p-2">
              <div className="pl-3.5 pr-2 text-[#4A3A32]">
                <AnimatedSearchIcon className="w-5 h-5 text-[#4A3A32]" />
              </div>

              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coats, shirts, wool trousers, blazers..."
                className="w-full py-3 px-2 bg-transparent text-[#33251F] placeholder-[#8B7768]/70 text-sm sm:text-base font-medium focus:outline-none"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  aria-label="Clear search input"
                  className="p-2 mr-1 rounded-xl text-[#8B7768] hover:text-[#33251F] hover:bg-[#FAF7F2] transition-colors"
                >
                  <AnimatedCloseIcon className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Suggested Search Query Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
              <span className="text-[#8B7768] font-medium mr-1">Popular:</span>
              {SUGGESTED_SEARCHES.map((query) => (
                <button
                  key={query}
                  type="button"
                  onClick={() => setSearchQuery(query)}
                  className="px-3 py-1 bg-[#FFFFFF] hover:bg-[#FAF7F2] border border-[#D8C8BA] text-[#4A3A32] rounded-lg font-medium transition-colors"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Metadata Bar */}
        {searchQuery.trim() && (
          <div className="pb-6 mb-8 border-b border-[#E4D7CC] flex items-center justify-between text-xs sm:text-sm">
            <span className="text-[#6B5549]">
              Showing <span className="font-bold text-[#33251F]">{products.length}</span>{' '}
              {products.length === 1 ? 'piece' : 'pieces'} matching{' '}
              <span className="font-bold text-[#33251F]">"{searchQuery}"</span>
            </span>

            <button
              type="button"
              onClick={handleClearSearch}
              className="text-xs uppercase tracking-wider font-bold text-[#4A3A32] hover:text-[#33251F] hover:underline"
            >
              Reset Search
            </button>
          </div>
        )}

        {/* Results Product Grid or Empty State */}
        {products.length > 0 ? (
          <ProductGrid
            products={products}
            onQuickView={handleOpenQuickView}
            showFeaturedSpan={false}
          />
        ) : (
          /* Polished Empty Search State */
          <div className="py-16 sm:py-24 text-center bg-[#FFFFFF] rounded-3xl border border-[#E4D7CC] p-8 sm:p-12 max-w-xl mx-auto shadow-xl">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#EADFD4] flex items-center justify-center text-[#33251F]">
              <AnimatedSearchIcon className="w-6 h-6 text-[#33251F]" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#33251F] mb-2">
              No Pieces Found
            </h3>

            <p className="text-xs sm:text-sm text-[#6B5549] leading-relaxed max-w-md mx-auto mb-8">
              We couldn't find what you're looking for with "{searchQuery}". Check your spelling or explore our complete catalog.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <FashionButton
                to={ROUTES.SHOP}
                variant="dark"
                size="md"
              >
                View All Products
              </FashionButton>

              <FashionButton
                to={ROUTES.COLLECTIONS}
                variant="outlineDark"
                size="md"
                showArrow={false}
              >
                Explore Collections
              </FashionButton>
            </div>
          </div>
        )}

        {/* Quick View Modal */}
        <QuickViewModal
          product={quickViewProduct}
          isOpen={quickViewOpen}
          onClose={handleCloseQuickView}
        />
      </Container>
    </div>
  );
};

export default SearchPage;
