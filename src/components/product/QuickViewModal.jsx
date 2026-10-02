import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../../utils/formatters';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import {
  AnimatedCloseIcon,
  AnimatedHeartIcon,
  AnimatedBagIcon,
  AnimatedArrowRight,
} from '../common/AnimatedIcons';
import FashionButton from '../common/FashionButton';

/**
 * YK MENS FASHION - Quick View Modal / Bottom Sheet
 * 
 * Features:
 * - Desktop: Spacious luxury preview modal with rounded-3xl container
 * - Mobile: Touch-friendly bottom sheet with rounded-t-3xl corners
 * - Variant selection (size & color)
 * - Quantity selector
 * - Localized INR price formatting
 * - Direct Add-to-Bag integration with Cart drawer
 */
export const QuickViewModal = ({ product, isOpen, onClose }) => {
  const { addItem, openDrawer } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState(
    product?.sizes?.[0] || 'Standard'
  );
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0]?.name || 'Default'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!isOpen || !product) return null;

  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = product.stockStatus === 'out_of_stock';

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem(product, { size: selectedSize, color: selectedColor }, quantity);
    onClose();
    openDrawer();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 bg-[#0D0D0D]/50 backdrop-blur-xs"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal Window / Mobile Bottom Sheet */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-4xl bg-white rounded-t-3xl sm:rounded-3xl border border-[#E7DECD] shadow-2xl z-10 max-h-[90vh] sm:max-h-[85vh] overflow-y-auto"
        >
          {/* Close Trigger */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/90 hover:bg-[#E7DECD]/50 text-[#0D0D0D] border border-[#DFE5F3] z-20 transition-colors shadow-xs"
          >
            <AnimatedCloseIcon className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 p-6 sm:p-8 lg:p-10">
            {/* Left: Product Imagery Stage */}
            <div className="md:col-span-6 space-y-3">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-[#F2EFEA] border border-[#E7DECD]">
                <img
                  src={product.images?.[activeImageIndex] || product.images?.[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-top"
                />

                {/* Floating Wishlist Trigger */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  aria-label="Save piece"
                  className="absolute top-3.5 left-3.5 p-2.5 bg-white/90 hover:bg-white rounded-full text-[#200E01] shadow-xs transition-transform active:scale-90"
                >
                  <AnimatedHeartIcon isFavorited={isFavorited} className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnails row if multiple images exist */}
              {product.images && product.images.length > 1 && (
                <div className="flex space-x-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-14 h-18 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx
                          ? 'border-[#200E01] opacity-100'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover object-top"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Merchandising Details */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Category & Status */}
                <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-[#557373] font-semibold">
                  <span>{product.category}</span>
                  {product.newArrivalStatus && (
                    <>
                      <span>•</span>
                      <span className="text-[#8B0000] font-bold">New Arrival</span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D0D0D] leading-tight">
                  {product.name}
                </h2>

                {/* Localized Price in INR */}
                <div className="flex items-baseline space-x-3">
                  {product.salePrice ? (
                    <>
                      <span className="font-serif text-2xl font-bold text-[#8B0000]">
                        {formatCurrency(product.salePrice)}
                      </span>
                      <span className="text-sm text-[#557373] line-through">
                        {formatCurrency(product.price)}
                      </span>
                    </>
                  ) : (
                    <span className="font-serif text-2xl font-bold text-[#0D0D0D]">
                      {formatCurrency(product.price)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#557373] leading-relaxed">
                  {product.description}
                </p>

                {/* Color Selector */}
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0D0D0D] block">
                      Color: <span className="font-normal text-[#557373]">{selectedColor}</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setSelectedColor(c.name)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center space-x-2 ${
                            selectedColor === c.name
                              ? 'border-[#200E01] bg-[#EDE7C7]/50 text-[#0D0D0D] font-bold'
                              : 'border-[#DFE5F3] bg-white text-[#557373] hover:border-[#557373]'
                          }`}
                        >
                          <span
                            className="w-3 h-3 rounded-full border border-black/15 inline-block"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span>{c.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0D0D0D] block">
                      Size: <span className="font-normal text-[#557373]">{selectedSize}</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSize(s)}
                          className={`min-w-[42px] px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                            selectedSize === s
                              ? 'border-[#200E01] bg-[#0D0D0D] text-white font-bold'
                              : 'border-[#DFE5F3] bg-white text-[#0D0D0D] hover:border-[#200E01]'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity Controls */}
                <div className="flex items-center space-x-4 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0D0D0D]">
                    Quantity
                  </span>
                  <div className="flex items-center border border-[#DFE5F3] rounded-lg overflow-hidden bg-white">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-1.5 text-xs text-[#0D0D0D] hover:bg-[#F2EFEA] transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 py-1.5 text-xs font-semibold text-[#0D0D0D]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="px-3 py-1.5 text-xs text-[#0D0D0D] hover:bg-[#F2EFEA] transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-[#DFE5F3]">
                <button
                  type="button"
                  disabled={isOutOfStock}
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-[#0D0D0D] hover:bg-[#200E01] text-white rounded-xl text-xs sm:text-sm uppercase tracking-wider font-bold transition-colors flex items-center justify-center space-x-2.5 shadow-sm"
                >
                  <AnimatedBagIcon className="w-4 h-4" />
                  <span>{isOutOfStock ? 'Currently Sold Out' : 'Add to Shopping Bag'}</span>
                </button>

                <div className="text-center">
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={onClose}
                    className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-bold text-[#200E01] hover:text-[#8B0000] transition-colors"
                  >
                    <span>View Complete Product Details</span>
                    <AnimatedArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickViewModal;
