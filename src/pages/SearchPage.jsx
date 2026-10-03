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
    <div className="bg-[#241812] text-[#FAF7F2] min-h-screen py-10 sm:py-16">
      <Container>
        {/* Search Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[#D99E84] font-bold block">
              Catalog Search
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#FAF7F2]">
              Search Menswear
            </h1>
            <p className="text-xs sm:text-sm text-[#C8B8AA] leading-relaxed max-w-lg mx-auto">
              Search by garment silhouette, category, material, or color palette.
            </p>
          </motion.div>

          {/* Interactive Search Bar Input */}
          <div className="mt-8 relative">
            <div className="relative flex items-center bg-[#2C1E18] rounded-2xl border border-[#3E2B21] hover:border-[#FAF7F2]/50 focus-within:border-[#FAF7F2] shadow-xl transition-all overflow-hidden p-2">
              <div className="pl-3.5 pr-2 text-[#D99E84]">
                <AnimatedSearchIcon className="w-5 h-5 text-[#D99E84]" />
              </div>

              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coats, shirts, wool trousers, blazers..."
                className="w-full py-3 px-2 bg-transparent text-[#FAF7F2] placeholder-[#C8B8AA]/60 text-sm sm:text-base font-medium focus:outline-none"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  aria-label="Clear search input"
                  className="p-2 mr-1 rounded-xl text-[#C8B8AA] hover:text-[#FAF7F2] hover:bg-[#3E2B21] transition-colors"
                >
                  <AnimatedCloseIcon className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Suggested Search Query Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
              <span className="text-[#C8B8AA] font-medium mr-1">Popular:</span>
              {SUGGESTED_SEARCHES.map((query) => (
                <button
                  key={query}
                  type="button"
                  onClick={() => setSearchQuery(query)}
                  className="px-3 py-1 bg-[#2C1E18] hover:bg-[#3E2B21] border border-[#3E2B21] text-[#FAF7F2] rounded-lg font-medium transition-colors"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Metadata Bar */}
        {searchQuery.trim() && (
          <div className="pb-6 mb-8 border-b border-[#3E2B21] flex items-center justify-between text-xs sm:text-sm">
            <span className="text-[#C8B8AA]">
              Showing <span className="font-bold text-[#FAF7F2]">{products.length}</span>{' '}
              {products.length === 1 ? 'piece' : 'pieces'} matching{' '}
              <span className="font-bold text-[#FAF7F2]">"{searchQuery}"</span>
            </span>

            <button
              type="button"
              onClick={handleClearSearch}
              className="text-xs uppercase tracking-wider font-bold text-[#D99E84] hover:underline"
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
          <div className="py-16 sm:py-24 text-center bg-[#2C1E18] rounded-3xl border border-[#3E2B21] p-8 sm:p-12 max-w-xl mx-auto shadow-xl">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#3E2B21] flex items-center justify-center text-[#FAF7F2]">
              <AnimatedSearchIcon className="w-6 h-6 text-[#FAF7F2]" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-[#FAF7F2] mb-2">
              No Pieces Found
            </h3>

            <p className="text-xs sm:text-sm text-[#C8B8AA] leading-relaxed max-w-md mx-auto mb-8">
              We couldn't find what you're looking for with "{searchQuery}". Check your spelling or explore our complete catalog.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <FashionButton
                to={ROUTES.SHOP}
                variant="cream"
                size="md"
              >
                View All Products
              </FashionButton>

              <FashionButton
                to={ROUTES.COLLECTIONS}
                variant="outlineLight"
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
