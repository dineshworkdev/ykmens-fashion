import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/formatters';
import { ROUTES } from '../../utils/constants';
import { ArrowRight, ShoppingBag } from '../../assets/icons';

/**
 * Premium Cart Summary Breakdown
 * Subtotal, Shipping status, and Checkout triggers.
 */
export const CartSummary = ({
  subtotal,
  shipping = 0,
  total,
  itemCount,
  onProceed,
  showCheckoutButton = true,
  className = '',
}) => {
  return (
    <div
      className={`bg-[#FFFFFF] border border-[#E4D7CC] rounded-2xl p-6 sm:p-7 space-y-5 shadow-xl text-[#4A3A32] ${className}`}
    >
      <div className="flex items-center justify-between pb-4 border-b border-[#E4D7CC]">
        <h3 className="text-xs uppercase tracking-widest font-bold text-[#33251F]">
          Order Summary
        </h3>
        {itemCount !== undefined && (
          <span className="text-xs text-[#6B5549] font-medium">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
        )}
      </div>

      <div className="space-y-3 text-xs">
        <div className="flex justify-between items-center text-[#6B5549]">
          <span>Subtotal</span>
          <motion.span
            key={subtotal}
            initial={{ opacity: 0.7, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="font-semibold text-[#33251F] text-sm"
          >
            {formatCurrency(subtotal)}
          </motion.span>
        </div>

        <div className="flex justify-between items-center text-[#6B5549]">
          <span>Shipping</span>
          <span className="font-medium text-[#6B5549]">
            {shipping === 0 ? 'Calculated at checkout' : formatCurrency(shipping)}
          </span>
        </div>
      </div>

      <div className="pt-4 border-t border-[#E4D7CC] flex justify-between items-baseline">
        <span className="text-xs uppercase tracking-wider font-bold text-[#33251F]">
          Total
        </span>
        <motion.span
          key={total || subtotal}
          initial={{ opacity: 0.7, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-xl font-bold text-[#33251F] tracking-tight"
        >
          {formatCurrency(total || subtotal)}
        </motion.span>
      </div>

      {showCheckoutButton && (
        <div className="pt-2">
          {onProceed ? (
            <button
              type="button"
              onClick={onProceed}
              disabled={subtotal === 0}
              className="w-full py-3.5 px-6 bg-[#4A3A32] text-[#FAF7F2] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#33251F] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 disabled:opacity-40 disabled:pointer-events-none shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <Link
              to={ROUTES.CHECKOUT}
              className="block w-full py-3.5 px-6 bg-[#4A3A32] text-[#FAF7F2] text-xs uppercase tracking-widest font-bold rounded-xl text-center hover:bg-[#33251F] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          <div className="mt-4 pt-4 border-t border-[#E4D7CC] text-center">
            <Link
              to={ROUTES.SHOP}
              className="text-[11px] uppercase tracking-wider text-[#6B5549] hover:text-[#33251F] font-medium transition-colors"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSummary;
