import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import FashionButton from '../common/FashionButton';

/**
 * Creative yet Structured Product Grid
 * 
 * Features:
 * - Responsive grid: 1-2 cols on mobile, 2-3 on tablet, 3-4 on desktop
 * - Controlled visual cadence: first featured product can occupy a highlighted 2-column span on larger screens
 * - Subtle staggered entrance animations
 * - Polished empty state with action to clear filters
 */
export const ProductGrid = ({
  products = [],
  onQuickView,
  onResetFilters,
  emptyMessage = 'No menswear pieces match your current filters.',
  showFeaturedSpan = false,
}) => {
  if (!products || products.length === 0) {
    return (
      <div className="py-20 text-center bg-white rounded-2xl border border-[#DFE5F3] p-8 max-w-lg mx-auto shadow-xs my-8">
        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#EDE7C7]/60 flex items-center justify-center text-[#200E01]">
          <span className="font-serif text-xl font-bold">YK</span>
        </div>
        <h3 className="font-serif text-xl font-bold text-[#0D0D0D] mb-2">
          No Results Found
        </h3>
        <p className="text-xs sm:text-sm text-[#557373] leading-relaxed mb-6">
          {emptyMessage}
        </p>
        {onResetFilters && (
          <FashionButton
            type="button"
            onClick={onResetFilters}
            variant="dark"
            size="sm"
            showArrow={false}
          >
            Clear All Filters
          </FashionButton>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
      {products.map((product, index) => {
        // Controlled accent: if showFeaturedSpan is true and item is marked featured, give it 2 columns on tablet/desktop
        const isFeatured = showFeaturedSpan && index === 0 && product.featuredStatus;

        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
            className={isFeatured ? 'sm:col-span-2' : ''}
          >
            <ProductCard
              product={product}
              variant={isFeatured ? 'featured' : 'standard'}
              onQuickView={onQuickView}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
