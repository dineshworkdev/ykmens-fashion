import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Container from '../components/layout/Container';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilter from '../components/product/ProductFilter';
import QuickViewModal from '../components/product/QuickViewModal';
import { useProducts } from '../hooks/useProducts';

/**
 * YK MENS FASHION - New Arrivals Page
 * 
 * Strict Compliance:
 * - Reuses the exact Phase 2A/2B visual language with its own distinct identity.
 * - Confident, practical header without fake magazine labels (no N° 01, ISSUE 01, etc.).
 * - Visual emphasis on new menswear arrivals.
 * - Quick View modal support.
 * - Light surface foundation (#F2EFEA).
 */
export const NewArrivalsPage = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    selectedSize,
    setSelectedSize,
    selectedColor,
    setSelectedColor,
    inStockOnly,
    setInStockOnly,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    resetFilters,
  } = useProducts({
    onlyNewArrivals: true,
  });

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
    <div className="bg-[#FAF7F2] text-[#4A3A32] min-h-screen py-10 sm:py-16">
      <Container>
        {/* New Arrivals Header */}
        <div className="mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2 max-w-2xl"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[#8B7768] font-bold block">
              Just Released
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#33251F]">
              New Arrivals
            </h1>
            <p className="text-xs sm:text-sm text-[#6B5549] leading-relaxed">
              Explore the latest additions to our menswear collection. Fresh tailoring, relaxed outerwear, and elevated daily staples.
            </p>
          </motion.div>
        </div>

        {/* Filter & Category Controls */}
        <ProductFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
          inStockOnly={inStockOnly}
          onToggleInStock={setInStockOnly}
          priceRange={priceRange}
          onChangePriceRange={setPriceRange}
          sortBy={sortBy}
          onChangeSort={setSortBy}
          onResetFilters={resetFilters}
          totalCount={products.length}
        />

        {/* Product Grid */}
        <ProductGrid
          products={products}
          onQuickView={handleOpenQuickView}
          onResetFilters={resetFilters}
          showFeaturedSpan={true}
          emptyMessage="No new arrival pieces match your selected filter criteria."
        />

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

export default NewArrivalsPage;
