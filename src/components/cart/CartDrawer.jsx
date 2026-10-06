import React, { useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, ArrowRight } from '../../assets/icons';
import { useCart } from '../../hooks/useCart';
import { formatCurrency } from '../../utils/formatters';
import { ROUTES } from '../../utils/constants';
import CartItem from './CartItem';

/**
 * Premium Cart Drawer Component
 * - Desktop: Slide-in from the right with rounded-l-3xl edges
 * - Mobile: Bottom-sheet drawer with rounded-t-3xl corners & drag bar
 */
export const CartDrawer = memo(function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    subtotal,
    cartCount,
    incrementQuantity,
    decrementQuantity,
    removeItem,
  } = useCart();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        closeDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Shopping Bag Drawer">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-[#33251F]/50 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Container (Desktop: Right slide-in, Mobile: Bottom-sheet) */}
          <div className="fixed inset-0 pointer-events-none flex flex-col justify-end md:flex-row md:justify-end">
            <motion.div
              initial={{ y: '100%', md: { y: 0, x: '100%' } }}
              animate={{ y: 0, x: 0 }}
              exit={{ y: '100%', md: { y: 0, x: '100%' } }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              style={{ willChange: 'transform' }}
              className="pointer-events-auto w-full md:w-[420px] lg:w-[460px] max-h-[88vh] md:max-h-full h-full bg-[#FAF7F2] border-t md:border-t-0 md:border-l border-[#E4D7CC] rounded-t-3xl md:rounded-t-none md:rounded-l-3xl shadow-2xl flex flex-col overflow-hidden text-[#4A3A32]"
            >
              {/* Mobile Drag Indicator Bar */}
              <div className="md:hidden flex justify-center pt-3 pb-1">
                <div className="w-12 h-1.5 bg-[#D8C8BA] rounded-full" />
              </div>

              {/* Header */}
              <div className="px-6 py-4 border-b border-[#E4D7CC] flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#EADFD4] flex items-center justify-center text-[#33251F]">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold tracking-tight text-[#33251F] uppercase">
                      Shopping Bag
                    </h2>
                    <span className="text-xs text-[#6B5549]">
                      {cartCount} {cartCount === 1 ? 'piece' : 'pieces'} selected
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={closeDrawer}
                  aria-label="Close bag drawer"
                  className="w-9 h-9 rounded-full bg-[#FFFFFF] hover:bg-[#FAF7F2] border border-[#D8C8BA] flex items-center justify-center text-[#4A3A32] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Items or Empty State */}
              <div className="flex-1 overflow-y-auto px-6 divide-y divide-[#E4D7CC]">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#EADFD4] flex items-center justify-center text-[#6B5549] mb-4">
                      <ShoppingBag className="w-7 h-7" />
                    </div>
                    <h3 className="text-base font-bold uppercase tracking-wider text-[#33251F] mb-1">
                      Your Bag is Empty
                    </h3>
                    <p className="text-xs text-[#6B5549] max-w-[220px] mb-6">
                      Add pieces you want to take with you.
                    </p>
                    <Link
                      to={ROUTES.SHOP}
                      onClick={closeDrawer}
                      className="px-6 py-3 bg-[#4A3A32] text-[#FAF7F2] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#33251F] transition-colors"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <CartItem
                        key={item.itemKey}
                        item={item}
                        compact
                        onIncrement={incrementQuantity}
                        onDecrement={decrementQuantity}
                        onRemove={removeItem}
                      />
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Drawer Footer with Subtotal & Actions */}
              {items.length > 0 && (
                <div className="p-6 bg-[#FFFFFF] border-t border-[#E4D7CC] space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#6B5549]">
                        Subtotal
                      </span>
                      <motion.span
                        key={subtotal}
                        initial={{ opacity: 0.7, y: -3 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-lg font-bold text-[#33251F]"
                      >
                        {formatCurrency(subtotal)}
                      </motion.span>
                    </div>
                    <p className="text-[11px] text-[#8B7768]">
                      Shipping calculated at checkout
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <Link
                      to={ROUTES.CART}
                      onClick={closeDrawer}
                      className="py-3 px-4 rounded-xl border border-[#D8C8BA] text-[#33251F] text-xs uppercase tracking-wider font-bold text-center hover:bg-[#FAF7F2] transition-colors"
                    >
                      View Cart
                    </Link>
                    <Link
                      to={ROUTES.CHECKOUT}
                      onClick={closeDrawer}
                      className="py-3 px-4 rounded-xl bg-[#4A3A32] text-[#FAF7F2] text-xs uppercase tracking-wider font-bold text-center hover:bg-[#33251F] flex items-center justify-center space-x-1.5 shadow-md transition-colors"
                    >
                      <span>Checkout</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
});

export default CartDrawer;
