import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { formatCurrency } from '../../utils/formatters';
import {
  AnimatedHeartIcon,
  AnimatedBagIcon,
  AnimatedArrowRight,
} from '../common/AnimatedIcons';

/**
 * YK MENS FASHION - Premium Reusable Product Card
 * 
 * Strict Compliance:
 * - Refined rounded corner language (rounded-2xl container, rounded-xl image stage).
 * - NO fake numbering (N° 01, N° 02 removed).
 * - Light surface container (#FFFFFF / #F2EFEA).
 * - Smooth secondary image crossfade reveal on desktop hover.
 * - Dedicated animated wishlist heart interaction.
 * - Quick View trigger integration.
 * - Localized Indian Rupee (₹) pricing with Indian standard formatting.
 */
export const ProductCard = ({
  product,
  variant = 'standard',
  showcase = false,
  onQuickView,
  className = '',
}) => {
  const { addItem, openDrawer } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Standard'
  );
  const [selectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : 'Default'
  );

  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = product.stockStatus === 'out_of_stock';
  const isFeatured = variant === 'featured';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addItem(product, { size: selectedSize, color: selectedColor }, 1);
    openDrawer();
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col bg-white border border-[#E7DECD] hover:border-[#200E01] rounded-2xl shadow-xs hover:shadow-md transition-all duration-300 p-3.5 sm:p-5 active:scale-[0.99] ${
        isFeatured ? 'md:col-span-2' : ''
      } ${className}`}
    >
      {/* Product Image Stage with Rounded Corners & Secondary Image Reveal */}
      <div
        className={`relative w-full rounded-xl overflow-hidden bg-[#F2EFEA] mb-3.5 select-none ${
          isFeatured ? 'aspect-[4/3] sm:aspect-[16/11]' : 'aspect-[3/4]'
        }`}
      >
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          {/* Primary Image */}
          {product.images && product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className={`w-full h-full object-cover object-top transition-all duration-700 ease-out ${
                isHovered && product.images[1] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
              }`}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#557373] text-xs">
              Menswear Visual
            </div>
          )}

          {/* Secondary Hover Image Reveal */}
          {product.images && product.images[1] && (
            <img
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
              loading="lazy"
            />
          )}
        </Link>

        {/* Category & Status Pill Tag */}
        <div className="absolute top-3 left-3 flex items-center space-x-1.5 z-10 pointer-events-none">
          <span className="px-2.5 py-1 bg-white/95 backdrop-blur-xs text-[10px] uppercase tracking-wider font-semibold text-[#200E01] rounded-lg shadow-xs">
            {product.category}
          </span>
          {product.newArrivalStatus && (
            <span className="px-2 py-0.5 bg-[#8B0000] text-[#EDE7C7] text-[9px] uppercase tracking-wider font-bold rounded-lg shadow-xs">
              New
            </span>
          )}
        </div>

        {/* Floating Animated Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          aria-label={isFavorited ? 'Remove from saved' : 'Save piece'}
          className="absolute top-3 right-3 p-2.5 bg-white/95 hover:bg-white rounded-full text-[#200E01] shadow-xs z-10 transition-transform active:scale-90"
        >
          <AnimatedHeartIcon isFavorited={isFavorited} className="w-4 h-4" />
        </button>

        {/* Desktop Quick View Overlay Bar */}
        {onQuickView && !showcase && (
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-x-3 bottom-3 z-20 hidden sm:flex items-center space-x-2"
              >
                <button
                  type="button"
                  onClick={handleQuickViewClick}
                  className="flex-1 py-2.5 bg-white/95 hover:bg-white text-[#0D0D0D] rounded-xl text-xs uppercase tracking-wider font-bold shadow-md transition-colors flex items-center justify-center space-x-1.5"
                >
                  <span>Quick View</span>
                </button>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  aria-label="Add to bag"
                  className="p-2.5 bg-[#0D0D0D] hover:bg-[#200E01] text-white rounded-xl shadow-md transition-colors"
                >
                  <AnimatedBagIcon className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Product Content & Typography */}
      <div className="flex-1 flex flex-col justify-between pt-1">
        <div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#0D0D0D] tracking-wide mb-1 leading-snug">
            <Link to={`/product/${product.slug}`} className="hover:text-[#8B0000] transition-colors">
              {product.name}
            </Link>
          </h3>

          <p className="text-xs text-[#557373] line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>
        </div>

        {/* Action Row: Showcase mode vs Catalog mode */}
        <div className="pt-3 border-t border-[#DFE5F3] flex items-center justify-between">
          {showcase ? (
            /* Homepage Showcase: Clean CTA, No price clutter */
            <div className="w-full flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#557373]">
                Showcase Piece
              </span>
              <Link
                to={`/product/${product.slug}`}
                className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-bold text-[#0D0D0D] hover:text-[#8B0000] transition-colors group/link"
              >
                <span>View Product</span>
                <AnimatedArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          ) : (
            /* Catalog Mode: Localized Indian Rupee ₹ pricing */
            <>
              <div className="flex items-baseline space-x-2">
                {product.salePrice ? (
                  <>
                    <span className="font-serif text-base sm:text-lg font-bold text-[#8B0000]">
                      {formatCurrency(product.salePrice)}
                    </span>
                    <span className="text-xs text-[#557373] line-through">
                      {formatCurrency(product.price)}
                    </span>
                  </>
                ) : (
                  <span className="font-serif text-base sm:text-lg font-bold text-[#0D0D0D]">
                    {formatCurrency(product.price)}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {onQuickView && (
                  <button
                    type="button"
                    onClick={handleQuickViewClick}
                    className="sm:hidden text-[11px] uppercase tracking-wider font-bold text-[#557373] hover:text-[#0D0D0D] px-2 py-1"
                  >
                    Quick View
                  </button>
                )}
                <Link
                  to={`/product/${product.slug}`}
                  className="inline-flex items-center space-x-1 text-xs uppercase tracking-wider font-bold text-[#200E01] hover:text-[#8B0000] transition-colors"
                >
                  <span>View</span>
                  <AnimatedArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
