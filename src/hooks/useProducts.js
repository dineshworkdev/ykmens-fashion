import { useState, useMemo, useCallback } from 'react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { COLLECTIONS } from '../data/collections';

/**
 * Custom hook to filter, search, sort, and retrieve products.
 */
export const useProducts = (initialFilters = {}) => {
  const [searchQuery, setSearchQuery] = useState(initialFilters.search || '');
  const [selectedCategory, setSelectedCategory] = useState(initialFilters.category || 'all');
  const [selectedCollection, setSelectedCollection] = useState(initialFilters.collection || 'all');
  const [selectedSize, setSelectedSize] = useState(initialFilters.size || 'all');
  const [selectedColor, setSelectedColor] = useState(initialFilters.color || 'all');
  const [inStockOnly, setInStockOnly] = useState(initialFilters.inStockOnly || false);
  const [onlyNewArrivals, setOnlyNewArrivals] = useState(initialFilters.onlyNewArrivals || false);
  const [sortBy, setSortBy] = useState(initialFilters.sortBy || 'featured');
  const [priceRange, setPriceRange] = useState(initialFilters.priceRange || [0, 20000]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Collection filter
      if (selectedCollection !== 'all' && product.collection !== selectedCollection) {
        return false;
      }

      // Size filter
      if (selectedSize !== 'all' && !product.sizes.includes(selectedSize)) {
        return false;
      }

      // Color filter
      if (selectedColor !== 'all' && !product.colors.some((c) => c.name.toLowerCase() === selectedColor.toLowerCase())) {
        return false;
      }

      // In stock filter
      if (inStockOnly && product.stockStatus !== 'in_stock') {
        return false;
      }

      // New arrivals filter
      if (onlyNewArrivals && !product.newArrivalStatus) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesTags = product.tags.some((tag) => tag.toLowerCase().includes(query));
        const matchesCat = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesTags && !matchesCat) {
          return false;
        }
      }

      // Price filter (INR)
      const effectivePrice = product.salePrice ?? product.price;
      if (effectivePrice < priceRange[0] || effectivePrice > priceRange[1]) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice ?? a.price;
      const priceB = b.salePrice ?? b.price;

      switch (sortBy) {
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'newest':
          return b.newArrivalStatus === a.newArrivalStatus ? 0 : b.newArrivalStatus ? 1 : -1;
        case 'featured':
        default:
          return b.featuredStatus === a.featuredStatus ? 0 : b.featuredStatus ? 1 : -1;
      }
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedCollection,
    selectedSize,
    selectedColor,
    inStockOnly,
    onlyNewArrivals,
    sortBy,
    priceRange,
  ]);

  const resetFilters = useCallback(() => {
    setSelectedCategory('all');
    setSelectedCollection('all');
    setSelectedSize('all');
    setSelectedColor('all');
    setInStockOnly(false);
    setOnlyNewArrivals(false);
    setPriceRange([0, 20000]);
    setSortBy('featured');
    setSearchQuery('');
  }, []);

  const getProductBySlug = useCallback((slug) => {
    return PRODUCTS.find((p) => p.slug === slug) || null;
  }, []);

  const getFeaturedProducts = useCallback(() => {
    return PRODUCTS.filter((p) => p.featuredStatus);
  }, []);

  const getNewArrivals = useCallback(() => {
    return PRODUCTS.filter((p) => p.newArrivalStatus);
  }, []);

  const getRelatedProducts = useCallback((currentProduct, limit = 4) => {
    if (!currentProduct) return [];
    return PRODUCTS.filter(
      (p) =>
        p.id !== currentProduct.id &&
        (p.category === currentProduct.category || p.collection === currentProduct.collection)
    ).slice(0, limit);
  }, []);

  return {
    products: filteredProducts,
    allProducts: PRODUCTS,
    categories: CATEGORIES,
    collections: COLLECTIONS,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedCollection,
    setSelectedCollection,
    selectedSize,
    setSelectedSize,
    selectedColor,
    setSelectedColor,
    inStockOnly,
    setInStockOnly,
    onlyNewArrivals,
    setOnlyNewArrivals,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    resetFilters,
    getProductBySlug,
    getFeaturedProducts,
    getNewArrivals,
    getRelatedProducts,
  };
};

export default useProducts;
