import React from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Container from '../components/layout/Container';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../hooks/useCart';
import { ROUTES } from '../utils/constants';
import { ShoppingBag, ArrowLeft, Trash2 } from '../assets/icons';

/**
 * Full Cart Page (/cart)
 * Light-first layout with left items list and right sticky order summary.
 */
export const CartPage = () => {
  const {
    items,
    cartCount,
    subtotal,
    shipping,
    total,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    emptyCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-[#FAF7F2] text-[#4A3A32] py-20 md:py-28 min-h-[60vh] flex items-center justify-center">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-md mx-auto text-center bg-[#FFFFFF] border border-[#E4D7CC] rounded-3xl p-10 md:p-12 shadow-xl"
          >
            <div className="w-16 h-16 rounded-full bg-[#EADFD4] text-[#33251F] flex items-center justify-center mx-auto mb-5">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#33251F] uppercase mb-2">
              Your Bag is Empty
            </h1>
            <p className="text-xs md:text-sm text-[#6B5549] mb-8">
              Add pieces you want to take with you.
            </p>
            <Link
              to={ROUTES.SHOP}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#4A3A32] text-[#FAF7F2] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#33251F] active:scale-95 transition-all shadow-md"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] text-[#4A3A32] py-8 md:py-14 min-h-[75vh]">
      <Container>
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-[#E4D7CC]">
          <div>
            <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#6B5549] font-semibold mb-1">
              <Link to={ROUTES.SHOP} className="hover:text-[#33251F] flex items-center space-x-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Shop</span>
              </Link>
              <span>/</span>
              <span className="text-[#33251F]">Shopping Bag</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#33251F]">
              Shopping Bag ({cartCount})
            </h1>
          </div>

          <button
            type="button"
            onClick={emptyCart}
            className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider text-[#8B7768] hover:text-[#33251F] font-medium transition-colors self-start sm:self-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Bag</span>
          </button>
        </div>

        {/* 2-Column Desktop, 1-Column Mobile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Cart Items Column */}
          <div className="lg:col-span-8 bg-[#FFFFFF] border border-[#E4D7CC] rounded-2xl p-6 sm:p-8 shadow-xl">
            <div className="flex justify-between items-center pb-4 mb-2 border-b border-[#E4D7CC] text-xs uppercase tracking-wider font-bold text-[#8B7768]">
              <span>Product Selection</span>
              <span className="hidden sm:inline">Price</span>
            </div>

            <div className="divide-y divide-[#E4D7CC]">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <CartItem
                    key={item.itemKey}
                    item={item}
                    onIncrement={incrementQuantity}
                    onDecrement={decrementQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Sticky Order Summary Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <CartSummary
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              itemCount={cartCount}
              showCheckoutButton={true}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
