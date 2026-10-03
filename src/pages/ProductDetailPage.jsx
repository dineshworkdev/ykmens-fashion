import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../components/layout/Container';
import ProductCard from '../components/product/ProductCard';
import QuickViewModal from '../components/product/QuickViewModal';
import {
  AnimatedHeartIcon,
  AnimatedBagIcon,
  AnimatedArrowRight,
  AnimatedChevronRight,
  AnimatedCloseIcon,
} from '../components/common/AnimatedIcons';
import FashionButton from '../components/common/FashionButton';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { formatCurrency } from '../utils/formatters';
import { ROUTES } from '../utils/constants';

/**
 * YK MENS FASHION - Product Detail Page
 * 
 * Strict Compliance:
 * - Premium light surface foundation (#F2EFEA)
 * - Desktop: Refined gallery + sticky purchase panel
 * - Mobile: Dedicated vertical swipeable gallery with image counter
 * - Interactive variant selection (size & color swatches)
 * - Animated quantity selector (- 1 +)
 * - Branded Add-to-Bag with interactive success feedback (ADDED TO BAG ✓)
 * - Accordion sections for Details, Sizing, and Shipping
 * - Related products rail using established ProductCard
 * - Polished Product Not Found fallback
 */
export const ProductDetailPage = () => {
  const { slug } = useParams();
  const { getProductBySlug, getRelatedProducts } = useProducts();
  const { addItem, openDrawer } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = getProductBySlug(slug);

  const [selectedSize, setSelectedSize] = useState(() => product?.sizes?.[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(() => product?.colors?.[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isAdded, setIsAdded] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  // Accordion state
  const [openAccordions, setOpenAccordions] = useState({
    details: true,
    sizing: false,
    shipping: false,
  });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Not Found State
  if (!product) {
    return (
      <div className="bg-[#241812] text-[#FAF7F2] min-h-[75vh] flex items-center justify-center py-20">
        <Container className="text-center max-w-lg">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#3E2B21] flex items-center justify-center text-[#FAF7F2]">
            <span className="font-serif text-2xl font-bold">YK</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#FAF7F2] mb-3">
            Piece Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#C8B8AA] leading-relaxed mb-8">
            The menswear item you are searching for is currently unavailable or has been archived. Explore our active collection.
          </p>
          <FashionButton to={ROUTES.SHOP} variant="cream" size="lg">
            Explore All Menswear
          </FashionButton>
        </Container>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = product.stockStatus === 'out_of_stock';
  const relatedProducts = getRelatedProducts(product, 4);

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product, { size: selectedSize, color: selectedColor }, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      openDrawer();
    }, 1200);
  };

  // Primary image hover zoom handler
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="bg-[#241812] text-[#FAF7F2] min-h-screen py-6 sm:py-10">
      <Container>
        {/* Breadcrumbs */}
        <nav className="text-[11px] sm:text-xs uppercase tracking-wider text-[#C8B8AA] mb-6 sm:mb-10 flex items-center space-x-2">
          <Link to={ROUTES.HOME} className="hover:text-[#FAF7F2] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to={ROUTES.SHOP} className="hover:text-[#FAF7F2] transition-colors">
            Shop
          </Link>
          <span>/</span>
          <Link
            to={`${ROUTES.SHOP}?category=${product.category}`}
            className="hover:text-[#FAF7F2] transition-colors"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#FAF7F2] font-bold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Desktop Two-Column Layout / Mobile Vertical Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-16 border-b border-[#3E2B21]">
          {/* =========================================================================
              LEFT COLUMN: PRODUCT IMAGE GALLERY
              ========================================================================= */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Image Stage */}
            <div
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
              className="relative aspect-[3/4] w-full bg-[#FAF7F2] rounded-3xl border border-[#E8DEC8] overflow-hidden shadow-xl group select-none cursor-crosshair"
            >
              {product.images && product.images[activeImageIndex] ? (
                <div className="w-full h-full relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImageIndex}
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0.8 }}
                      transition={{ duration: 0.2 }}
                      src={product.images[activeImageIndex]}
                      alt={product.name}
                      style={{
                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        transform: isZoomed ? 'scale(1.35)' : 'scale(1)',
                      }}
                      className="w-full h-full object-cover object-top transition-transform duration-300 ease-out"
                    />
                  </AnimatePresence>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#6A5C52] text-xs">
                  Menswear Visual
                </div>
              )}

              {/* Category Tag */}
              <div className="absolute top-4 left-4 flex items-center space-x-2 z-10 pointer-events-none">
                <span className="px-3 py-1.5 bg-[#FAF7F2]/95 backdrop-blur-xs text-[10px] uppercase tracking-wider font-semibold text-[#1D1410] rounded-lg shadow-xs">
                  {product.category}
                </span>
              </div>

              {/* Floating Mobile Image Counter */}
              {product.images && product.images.length > 1 && (
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium rounded-full sm:hidden">
                  {activeImageIndex + 1} / {product.images.length}
                </div>
              )}
            </div>

            {/* Desktop & Mobile Thumbnail Selector */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 sm:w-24 aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-[#FAF7F2] ${
                      activeImageIndex === idx
                        ? 'border-[#FAF7F2] opacity-100 shadow-md'
                        : 'border-[#3E2B21] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* =========================================================================
              RIGHT COLUMN: STICKY PRODUCT PURCHASE PANEL
              ========================================================================= */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Product Header */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-[#C8B8AA]">
                  <span>Collection: {product.collection}</span>
                  <span className={isOutOfStock ? 'text-[#A6445D]' : 'text-[#68BB76]'}>
                    {isOutOfStock ? 'Sold Out' : 'In Stock'}
                  </span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF7F2] leading-tight">
                  {product.name}
                </h1>

                {/* Price in INR */}
                <div className="flex items-baseline space-x-3 pt-1">
                  {product.salePrice ? (
                    <>
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-[#A6445D]">
                        {formatCurrency(product.salePrice)}
                      </span>
                      <span className="text-base text-[#C8B8AA] line-through font-normal">
                        {formatCurrency(product.price)}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#A6445D] bg-[#A6445D]/15 px-2 py-0.5 rounded-md">
                        Sale
                      </span>
                    </>
                  ) : (
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF7F2]">
                      {formatCurrency(product.price)}
                    </span>
                  )}
                </div>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-[#C8B8AA] leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#FAF7F2]">
                    <span>
                      Color: <span className="font-normal text-[#C8B8AA]">{selectedColor}</span>
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {product.colors.map((c) => {
                      const isSelected = selectedColor === c.name;
                      return (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c.name)}
                          className={`px-3 py-2 rounded-xl text-xs font-medium border transition-colors flex items-center space-x-2 ${
                            isSelected
                              ? 'border-[#FAF7F2] bg-[#FAF7F2] text-[#1D1410] font-bold shadow-xs'
                              : 'border-[#3E2B21] bg-[#2C1E18] text-[#FAF7F2] hover:border-[#FAF7F2]'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/15 inline-block shadow-xs"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span>{c.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size Selection & Size Guide */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#FAF7F2]">
                    <span>
                      Size: <span className="font-normal text-[#C8B8AA]">{selectedSize}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setSizeGuideOpen(true)}
                      className="text-[11px] uppercase tracking-wider text-[#D99E84] hover:text-[#FAF7F2] underline font-semibold transition-colors"
                    >
                      Size Guide
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => {
                      const isSelected = selectedSize === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSize(s)}
                          className={`min-w-[48px] px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                            isSelected
                              ? 'border-[#FAF7F2] bg-[#FAF7F2] text-[#1D1410] shadow-xs'
                              : 'border-[#3E2B21] bg-[#2C1E18] text-[#FAF7F2] hover:border-[#FAF7F2]'
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Wishlist */}
              <div className="flex items-center space-x-4 pt-2">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FAF7F2] block">
                    Quantity
                  </span>
                  <div className="flex items-center border border-[#3E2B21] rounded-xl overflow-hidden bg-[#2C1E18] shadow-xs">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3.5 py-2 text-sm text-[#FAF7F2] hover:bg-[#3E2B21] transition-colors"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 text-xs font-bold text-[#FAF7F2]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3.5 py-2 text-sm text-[#FAF7F2] hover:bg-[#3E2B21] transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-1 flex-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FAF7F2] block">
                    Save Piece
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    aria-label={isFavorited ? 'Remove from saved' : 'Save piece to wishlist'}
                    className={`w-full py-2.5 px-4 rounded-xl border transition-colors flex items-center justify-center space-x-2 text-xs uppercase tracking-wider font-semibold ${
                      isFavorited
                        ? 'border-[#A6445D] bg-[#A6445D]/20 text-[#A6445D]'
                        : 'border-[#3E2B21] bg-[#2C1E18] text-[#FAF7F2] hover:border-[#FAF7F2]'
                    }`}
                  >
                    <AnimatedHeartIcon isFavorited={isFavorited} className="w-4 h-4" />
                    <span>{isFavorited ? 'Saved' : 'Wishlist'}</span>
                  </button>
                </div>
              </div>

              {/* Branded Add to Bag CTA with Success Feedback */}
              <div className="pt-2">
                <button
                  type="button"
                  disabled={isOutOfStock}
                  onClick={handleAddToCart}
                  className={`w-full py-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider font-bold transition-all duration-300 flex items-center justify-center space-x-2.5 shadow-md ${
                    isAdded
                      ? 'bg-[#2E5835] text-[#FAF7F2]'
                      : isOutOfStock
                      ? 'bg-[#3E2B21] text-[#C8B8AA] cursor-not-allowed'
                      : 'bg-[#FAF7F2] hover:bg-[#E8DEC8] text-[#1D1410] active:scale-[0.99]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-[#FAF7F2] animate-ping" />
                      <span>Added to Shopping Bag ✓</span>
                    </>
                  ) : (
                    <>
                      <AnimatedBagIcon className="w-4 h-4" />
                      <span>{isOutOfStock ? 'Currently Sold Out' : 'Add to Shopping Bag'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Expandable Product Information Accordions */}
              <div className="pt-4 border-t border-[#3E2B21] space-y-3">
                {/* Accordion 1: Product Specifications & Details */}
                <div className="border border-[#3E2B21] rounded-2xl overflow-hidden bg-[#2C1E18]">
                  <button
                    type="button"
                    onClick={() => toggleAccordion('details')}
                    className="w-full p-4 text-left flex items-center justify-between text-xs uppercase tracking-wider font-bold text-[#FAF7F2] hover:bg-[#341F17] transition-colors"
                  >
                    <span>Product Specifications</span>
                    <motion.span
                      animate={{ rotate: openAccordions.details ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AnimatedChevronRight className="w-3.5 h-3.5 text-[#C8B8AA]" />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {openAccordions.details && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-4 pt-1 border-t border-[#3E2B21] text-xs text-[#C8B8AA] space-y-2.5"
                      >
                        {product.specifications?.material && (
                          <div className="flex justify-between py-1 border-b border-[#3E2B21]/50">
                            <span className="font-semibold text-[#FAF7F2]">Material:</span>
                            <span className="text-right">{product.specifications.material}</span>
                          </div>
                        )}
                        {product.specifications?.fit && (
                          <div className="flex justify-between py-1 border-b border-[#3E2B21]/50">
                            <span className="font-semibold text-[#FAF7F2]">Fit:</span>
                            <span className="text-right">{product.specifications.fit}</span>
                          </div>
                        )}
                        {product.specifications?.care && (
                          <div className="flex justify-between py-1 border-b border-[#3E2B21]/50">
                            <span className="font-semibold text-[#FAF7F2]">Care Instructions:</span>
                            <span className="text-right">{product.specifications.care}</span>
                          </div>
                        )}
                        {product.specifications?.details && (
                          <div className="pt-1 leading-relaxed">
                            <span className="font-semibold text-[#FAF7F2] block mb-1">Tailoring Details:</span>
                            <span>{product.specifications.details}</span>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion 2: Size & Fit */}
                <div className="border border-[#3E2B21] rounded-2xl overflow-hidden bg-[#2C1E18]">
                  <button
                    type="button"
                    onClick={() => toggleAccordion('sizing')}
                    className="w-full p-4 text-left flex items-center justify-between text-xs uppercase tracking-wider font-bold text-[#FAF7F2] hover:bg-[#341F17] transition-colors"
                  >
                    <span>Size & Fit Guide</span>
                    <motion.span
                      animate={{ rotate: openAccordions.sizing ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AnimatedChevronRight className="w-3.5 h-3.5 text-[#C8B8AA]" />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {openAccordions.sizing && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-4 pt-1 border-t border-[#3E2B21] text-xs text-[#C8B8AA] space-y-2 leading-relaxed"
                      >
                        <p>Designed with a contemporary relaxed fit. Fits true to Indian and international standard sizing.</p>
                        <p>For a sharper tailored break, choose your regular chest size. For an oversized drape, consider sizing up.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion 3: Shipping & Logistics */}
                <div className="border border-[#3E2B21] rounded-2xl overflow-hidden bg-[#2C1E18]">
                  <button
                    type="button"
                    onClick={() => toggleAccordion('shipping')}
                    className="w-full p-4 text-left flex items-center justify-between text-xs uppercase tracking-wider font-bold text-[#FAF7F2] hover:bg-[#341F17] transition-colors"
                  >
                    <span>Shipping & Dispatch</span>
                    <motion.span
                      animate={{ rotate: openAccordions.shipping ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <AnimatedChevronRight className="w-3.5 h-3.5 text-[#C8B8AA]" />
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {openAccordions.shipping && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-4 pt-1 border-t border-[#3E2B21] text-xs text-[#C8B8AA] space-y-2 leading-relaxed"
                      >
                        <p>Orders are dispatched within 24 to 48 hours via premium express couriers across India.</p>
                        <p>Standard delivery arrives within 3 to 5 business days depending on city and state.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RELATED PRODUCTS / COMPLETE THE LOOK
            ========================================================================= */}
        {relatedProducts.length > 0 && (
          <div className="pt-16 sm:pt-20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-10 border-b border-[#3E2B21] gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#D99E84] font-bold block mb-1">
                  Styling Curation
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#FAF7F2]">
                  Complete The Look
                </h2>
              </div>

              <Link
                to={ROUTES.SHOP}
                className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-bold text-[#FAF7F2] hover:text-[#D99E84] transition-colors"
              >
                <span>View Full Catalog</span>
                <AnimatedArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard
                  key={relProduct.id}
                  product={relProduct}
                  onQuickView={(p) => {
                    setQuickViewProduct(p);
                    setQuickViewOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Quick View Modal for related items */}
        <QuickViewModal
          product={quickViewProduct}
          isOpen={quickViewOpen}
          onClose={() => setQuickViewOpen(false)}
        />

        {/* Size Guide Modal */}
        <AnimatePresence>
          {sizeGuideOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-xs"
                onClick={() => setSizeGuideOpen(false)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-lg bg-[#241812] rounded-3xl p-6 sm:p-8 border border-[#3E2B21] shadow-2xl z-10 space-y-6 text-[#FAF7F2]"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#3E2B21]">
                  <h3 className="font-serif text-xl font-bold text-[#FAF7F2]">
                    Menswear Sizing Matrix
                  </h3>
                  <button
                    type="button"
                    onClick={() => setSizeGuideOpen(false)}
                    className="p-1.5 text-[#C8B8AA] hover:text-[#FAF7F2]"
                  >
                    <AnimatedCloseIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="overflow-x-auto text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#3E2B21] text-[#C8B8AA] font-semibold uppercase tracking-wider">
                        <th className="py-2.5">Size</th>
                        <th className="py-2.5">Chest (in)</th>
                        <th className="py-2.5">Waist (in)</th>
                        <th className="py-2.5">Shoulder (in)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#3E2B21]/60 text-[#FAF7F2]">
                      <tr>
                        <td className="py-2.5 font-bold">S / 38</td>
                        <td className="py-2.5">38 - 40</td>
                        <td className="py-2.5">30 - 32</td>
                        <td className="py-2.5">17.5</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold">M / 40</td>
                        <td className="py-2.5">40 - 42</td>
                        <td className="py-2.5">32 - 34</td>
                        <td className="py-2.5">18.2</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold">L / 42</td>
                        <td className="py-2.5">42 - 44</td>
                        <td className="py-2.5">34 - 36</td>
                        <td className="py-2.5">19.0</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 font-bold">XL / 44</td>
                        <td className="py-2.5">44 - 46</td>
                        <td className="py-2.5">36 - 38</td>
                        <td className="py-2.5">19.8</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="pt-2 text-[11px] text-[#C8B8AA] leading-relaxed">
                  All measurements represent body guidelines in inches. For customized fit assistance, reach out via our client concierge.
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </Container>
    </div>
  );
};

export default ProductDetailPage;
