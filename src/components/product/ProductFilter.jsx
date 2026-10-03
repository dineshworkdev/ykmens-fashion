import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedFilterIcon, AnimatedCloseIcon, AnimatedChevronRight } from '../common/AnimatedIcons';
import { formatCurrency } from '../../utils/formatters';

const CATEGORY_ITEMS = [
  { slug: 'all', label: 'ALL' },
  { slug: 'outerwear', label: 'OUTERWEAR' },
  { slug: 'shirts', label: 'SHIRTS' },
  { slug: 'trousers', label: 'TROUSERS' },
  { slug: 't-shirts', label: 'T-SHIRTS & TOPS' },
  { slug: 'tailoring', label: 'TAILORING & BLAZERS' },
  { slug: 'knitwear', label: 'FINE KNITWEAR' },
];

const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', '30', '32', '34', '36', '38', '40', '42', '46 (S)', '48 (M)', '50 (L)', '52 (XL)'];

const AVAILABLE_COLORS = [
  { name: 'Obsidian Black', hex: '#0D0D0D' },
  { name: 'Deep Olive', hex: '#272401' },
  { name: 'Sand Alabaster', hex: '#F2EFEA' },
  { name: 'Ice Slate', hex: '#DFE5F3' },
  { name: 'Muted Slate', hex: '#557373' },
  { name: 'Midnight Navy', hex: '#142F40' },
];

const PRICE_TIERS = [
  { label: 'All Prices', range: [0, 20000] },
  { label: 'Under ₹4,000', range: [0, 4000] },
  { label: '₹4,000 – ₹7,000', range: [4000, 7000] },
  { label: 'Above ₹7,000', range: [7000, 20000] },
];

/**
 * YK MENS FASHION - Product Filter & Discovery System
 * 
 * Features:
 * - Category navigation bar (ALL, OUTERWEAR, SHIRTS, TROUSERS, etc.)
 * - Filter toggle button with badge and AnimatedFilterIcon
 * - Animated sort dropdown
 * - Expandable filter panel (Size, Color, Availability, Price)
 * - Mobile bottom sheet drawer for easy thumb access
 */
export const ProductFilter = ({
  selectedCategory,
  onSelectCategory,
  selectedSize,
  onSelectSize,
  selectedColor,
  onSelectColor,
  inStockOnly,
  onToggleInStock,
  priceRange,
  onChangePriceRange,
  sortBy,
  onChangeSort,
  onResetFilters,
  totalCount = 0,
}) => {
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  // Calculate active filter count
  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedSize && selectedSize !== 'all' ? 1 : 0) +
    (selectedColor && selectedColor !== 'all' ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (priceRange && (priceRange[0] > 0 || priceRange[1] < 20000) ? 1 : 0);

  const sortLabels = {
    featured: 'Featured',
    newest: 'New Arrivals',
    'price-asc': 'Price: Low to High',
    'price-desc': 'Price: High to Low',
  };

  return (
    <div className="mb-8 space-y-4">
      {/* 1. Category Navigation Bar (Desktop & Horizontal Scroll Mobile) */}
      <div className="relative pb-1">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none py-1">
          {CATEGORY_ITEMS.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => onSelectCategory(cat.slug)}
                className={`relative px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-xl whitespace-nowrap transition-all duration-200 select-none ${
                  isActive
                    ? 'bg-[#FAF7F2] text-[#200E01] shadow-xs'
                    : 'bg-[#2D1F17] text-[#D4C5B6] hover:text-[#FAF7F2] border border-[#3E2C22] hover:border-[#FAF7F2]'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Utility Control Bar: Filter Trigger, Sort, Active Indicators, Product Count */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-[#231711] rounded-2xl border border-[#3E2B21] shadow-xs">
        {/* Left: Filter Toggle & Product Count */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={() => setFilterPanelOpen(!filterPanelOpen)}
            className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all ${
              filterPanelOpen || activeFiltersCount > 0
                ? 'bg-[#FAF7F2] text-[#200E01]'
                : 'bg-[#2D1F17] hover:bg-[#38261E] text-[#FAF7F2] border border-[#3E2B21]'
            }`}
          >
            <AnimatedFilterIcon className="w-4 h-4" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#8B0000] text-[#FAF7F2] text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {activeFiltersCount > 0 && onResetFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs uppercase tracking-wider font-semibold text-[#D99E84] hover:underline"
            >
              Clear All
            </button>
          )}

          <span className="text-xs text-[#C8B8AA] font-medium pl-1">
            {totalCount} {totalCount === 1 ? 'Piece' : 'Pieces'}
          </span>
        </div>

        {/* Right: Custom Animated Sort Dropdown */}
        <div className="relative">
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase tracking-wider text-[#C8B8AA] font-semibold hidden sm:inline">
              Sort:
            </span>
            <button
              type="button"
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              className="px-4 py-2.5 bg-[#2D1F17] hover:bg-[#38261E] border border-[#3E2B21] rounded-xl text-xs uppercase tracking-wider font-bold text-[#FAF7F2] flex items-center justify-between space-x-3 min-w-[170px] transition-colors"
            >
              <span>{sortLabels[sortBy] || 'Featured'}</span>
              <motion.span
                animate={{ rotate: sortDropdownOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <AnimatedChevronRight className="w-3.5 h-3.5" />
              </motion.span>
            </button>
          </div>

          {/* Sort Dropdown Menu */}
          <AnimatePresence>
            {sortDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-52 bg-[#231711] rounded-2xl border border-[#3E2B21] shadow-xl py-2 z-30 overflow-hidden text-[#FAF7F2]"
              >
                {Object.entries(sortLabels).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      onChangeSort(key);
                      setSortDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left text-xs uppercase tracking-wider transition-colors flex items-center justify-between ${
                      sortBy === key
                        ? 'bg-[#2E1E17] text-[#FAF7F2] font-bold'
                        : 'text-[#D4C5B6] hover:text-[#FAF7F2] hover:bg-[#2E1E17]'
                    }`}
                  >
                    <span>{label}</span>
                    {sortBy === key && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A6445D]" />
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 3. Expandable Filter Panel (Accordion on Desktop, Drawer/Sheet on Mobile) */}
      <AnimatePresence>
        {filterPanelOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-6 sm:p-8 bg-[#231711] rounded-3xl border border-[#3E2B21] shadow-md space-y-6 sm:space-y-8 text-[#FAF7F2]">
              <div className="flex items-center justify-between pb-4 border-b border-[#3E2B21]">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#FAF7F2]">
                  Refine Menswear Catalog
                </h3>
                <button
                  type="button"
                  onClick={() => setFilterPanelOpen(false)}
                  className="p-1.5 text-[#C8B8AA] hover:text-[#FAF7F2] transition-colors"
                  aria-label="Close filters"
                >
                  <AnimatedCloseIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {/* Filter 1: Size */}
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#FAF7F2] block">
                    Size
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={() => onSelectSize('all')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                        selectedSize === 'all'
                          ? 'bg-[#FAF7F2] text-[#200E01] border-[#FAF7F2]'
                          : 'bg-[#2D1F17] text-[#FAF7F2] border-[#3E2B21] hover:border-[#FAF7F2]'
                      }`}
                    >
                      All
                    </button>
                    {AVAILABLE_SIZES.slice(0, 8).map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => onSelectSize(sz)}
                        className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                          selectedSize === sz
                            ? 'bg-[#FAF7F2] text-[#200E01] border-[#FAF7F2] font-bold'
                            : 'bg-[#2D1F17] text-[#D4C5B6] border-[#3E2B21] hover:border-[#FAF7F2]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter 2: Color Palette */}
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#FAF7F2] block">
                    Color Palette
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectColor('all')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                        selectedColor === 'all'
                          ? 'bg-[#FAF7F2] text-[#200E01] border-[#FAF7F2]'
                          : 'bg-[#2D1F17] text-[#FAF7F2] border-[#3E2B21] hover:border-[#FAF7F2]'
                      }`}
                    >
                      All
                    </button>
                    {AVAILABLE_COLORS.map((col) => (
                      <button
                        key={col.name}
                        type="button"
                        onClick={() => onSelectColor(col.name)}
                        className={`px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors flex items-center space-x-1.5 ${
                          selectedColor.toLowerCase() === col.name.toLowerCase()
                            ? 'bg-[#FAF7F2] text-[#200E01] border-[#FAF7F2] font-bold'
                            : 'bg-[#2D1F17] text-[#D4C5B6] border-[#3E2B21] hover:border-[#FAF7F2]'
                        }`}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-white/20 inline-block"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span>{col.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filter 3: Price Tier (INR) */}
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#FAF7F2] block">
                    Price Range (₹)
                  </span>
                  <div className="space-y-1.5">
                    {PRICE_TIERS.map((tier) => {
                      const isSelected =
                        priceRange &&
                        priceRange[0] === tier.range[0] &&
                        priceRange[1] === tier.range[1];
                      return (
                        <button
                          key={tier.label}
                          type="button"
                          onClick={() => onChangePriceRange(tier.range)}
                          className={`w-full px-3 py-2 text-left text-xs font-medium rounded-lg border transition-colors flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#FAF7F2] text-[#200E01] border-[#FAF7F2] font-bold'
                              : 'bg-[#2D1F17] text-[#D4C5B6] border-[#3E2B21] hover:border-[#FAF7F2]'
                          }`}
                        >
                          <span>{tier.label}</span>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#A6445D]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Filter 4: Availability */}
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#FAF7F2] block">
                    Availability
                  </span>
                  <label className="flex items-center space-x-3 p-3 bg-[#2D1F17] rounded-xl border border-[#3E2B21] cursor-pointer hover:border-[#FAF7F2] transition-colors">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => onToggleInStock(e.target.checked)}
                      className="w-4 h-4 rounded text-[#A6445D] focus:ring-0 cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-[#FAF7F2]">
                      In Stock Pieces Only
                    </span>
                  </label>
                </div>
              </div>

              {/* Bottom Actions Row */}
              <div className="pt-4 border-t border-[#3E2B21] flex items-center justify-between">
                <span className="text-xs text-[#C8B8AA]">
                  Showing {totalCount} matching pieces
                </span>
                <div className="flex items-center space-x-3">
                  {onResetFilters && (
                    <button
                      type="button"
                      onClick={onResetFilters}
                      className="px-4 py-2 text-xs uppercase tracking-wider font-bold text-[#C8B8AA] hover:text-[#FAF7F2] transition-colors"
                    >
                      Reset All
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setFilterPanelOpen(false)}
                    className="px-6 py-2.5 bg-[#FAF7F2] text-[#200E01] rounded-xl text-xs uppercase tracking-wider font-bold hover:bg-[#EDE7C7] transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductFilter;
