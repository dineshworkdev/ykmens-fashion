import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../components/layout/Container';
import ProductCard from '../components/product/ProductCard';
import QuickViewModal from '../components/product/QuickViewModal';
import { AnimatedHeartIcon, AnimatedArrowRight } from '../components/common/AnimatedIcons';
import FashionButton from '../components/common/FashionButton';
import { useWishlist } from '../hooks/useWishlist';
import { ROUTES } from '../utils/constants';

/**
 * YK MENS FASHION - Wishlist Page
 * 
 * Strict Compliance:
 * - Branded empty state with "EXPLORE SHOP" action
 * - Populated state using established ProductCard system
 * - Graceful exit transitions (AnimatePresence layout) when pieces are removed
 * - Quick View modal support
 * - Light surface foundation (#F2EFEA)
 */
export const WishlistPage = () => {
  const { wishlistItems, clearWishlist } = useWishlist();

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const handleOpenQuickView = (product) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  return (
    <div className="bg-[#FAF7F2] text-[#4A3A32] min-h-[80vh] py-10 sm:py-16">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-10 border-b border-[#E4D7CC] gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#8B7768] font-bold block mb-1">
              Personal Curation
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#33251F]">
              Saved Wishlist ({wishlistItems.length})
            </h1>
          </div>

          {wishlistItems.length > 0 && (
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={clearWishlist}
                className="text-xs uppercase tracking-wider font-semibold text-[#8B7768] hover:text-[#33251F] transition-colors"
              >
                Clear All Pieces
              </button>
              <Link
                to={ROUTES.SHOP}
                className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-bold text-[#4A3A32] hover:text-[#33251F] transition-colors"
              >
                <span>Continue Shopping</span>
                <AnimatedArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Content: Empty State vs Populated Animated Grid */}
        <AnimatePresence mode="wait">
          {wishlistItems.length === 0 ? (
            /* Branded Empty State */
            <motion.div
              key="empty-wishlist"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="py-16 sm:py-24 text-center bg-[#FFFFFF] rounded-3xl border border-[#E4D7CC] p-8 sm:p-12 max-w-lg mx-auto shadow-xl"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#EADFD4] flex items-center justify-center text-[#33251F]">
                <AnimatedHeartIcon isFavorited={false} className="w-6 h-6 text-[#33251F]" />
              </div>

              <h2 className="font-serif text-2xl font-bold text-[#33251F] mb-2">
                YOUR WISHLIST IS EMPTY
              </h2>

              <p className="text-xs sm:text-sm text-[#6B5549] leading-relaxed max-w-sm mx-auto mb-8">
                Save pieces you want to come back to as you explore our menswear collections and new arrivals.
              </p>

              <FashionButton
                to={ROUTES.SHOP}
                variant="dark"
                size="lg"
              >
                Explore Shop
              </FashionButton>
            </motion.div>
          ) : (
            /* Populated Animated Grid with Graceful Exit Transitions */
            <motion.div
              key="populated-wishlist"
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence>
                {wishlistItems.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88, y: 15 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ProductCard
                      product={product}
                      onQuickView={handleOpenQuickView}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

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

export default WishlistPage;
