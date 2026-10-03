import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from '../components/layout/Container';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilter from '../components/product/ProductFilter';
import QuickViewModal from '../components/product/QuickViewModal';
import { useProducts } from '../hooks/useProducts';

/**
 * YK MENS FASHION - Shop Page
 * 
 * Strict Compliance:
 * - Premium light surface foundation (#F2EFEA)
 * - Category navigation matching exact requirements
 * - URL query parameter synchronization (?category=, ?filter=new)
 * - Responsive filter & sort system
 * - Quick View modal support
 * - Clean mobile-first hierarchy with zero overflow
 */
export const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const filterParam = searchParams.get('filter');

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
    onlyNewArrivals,
    setOnlyNewArrivals,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    resetFilters,
  } = useProducts({
    category: categoryParam || 'all',
    onlyNewArrivals: filterParam === 'new',
  });

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  // Sync category param from URL
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    if (filterParam === 'new') {
      setOnlyNewArrivals(true);
    }
  }, [categoryParam, filterParam, setSelectedCategory, setOnlyNewArrivals]);

  const handleCategorySelect = (categorySlug) => {
    setSelectedCategory(categorySlug);
    const newParams = new URLSearchParams(searchParams);
    if (categorySlug === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', categorySlug);
    }
    setSearchParams(newParams);
  };

  const handleOpenQuickView = (product) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const categoryHeadings = {
    all: { title: 'SHOP', subtitle: 'Sculpted silhouettes, tactile fabrics, and versatile everyday menswear.' },
    outerwear: { title: 'OUTERWEAR', subtitle: 'Double-breasted overcoats, structured jackets, and weatherproof tailoring.' },
    shirts: { title: 'SHIRTS', subtitle: 'Precision-cut poplin dress shirts, utility overshirts, and relaxed drapes.' },
    trousers: { title: 'TROUSERS', subtitle: 'Pleated wide-leg wool flannel trousers and relaxed modern chinos.' },
    't-shirts': { title: 'T-SHIRTS & TOPS', subtitle: 'Dense mercerized cotton foundations and structured knitwear.' },
    tailoring: { title: 'TAILORING & BLAZERS', subtitle: 'Unconstructed blazers and sharp double-breasted formal pieces.' },
    knitwear: { title: 'FINE KNITWEAR', subtitle: 'Pure cashmere mocknecks and extrafine merino wool cableknits.' },
  };

  const currentHeading = categoryHeadings[selectedCategory] || categoryHeadings.all;

  return (
    <div className="bg-[#241812] text-[#FAF7F2] min-h-screen py-10 sm:py-16">
      <Container>
        {/* Shop Header: Confident, Distinctive, Balanced */}
        <div className="mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2 max-w-2xl"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-[#D99E84] font-bold block">
              Menswear Catalog
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF7F2]">
              {onlyNewArrivals ? 'New Arrivals' : currentHeading.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#C8B8AA] leading-relaxed">
              {currentHeading.subtitle}
            </p>
          </motion.div>
        </div>

        {/* Polished Filter & Category Navigation System */}
        <ProductFilter
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
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

        {/* Creative & Structured Product Grid */}
        <ProductGrid
          products={products}
          onQuickView={handleOpenQuickView}
          onResetFilters={resetFilters}
          showFeaturedSpan={selectedCategory === 'all'}
          emptyMessage="No menswear pieces found matching your selected criteria. Try adjusting your size, color, or price filters."
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

export default ShopPage;
