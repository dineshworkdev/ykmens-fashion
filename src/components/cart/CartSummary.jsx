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
      className={`bg-[#E7DECD]/50 border border-[#DFE5F3] rounded-2xl p-6 sm:p-7 space-y-5 shadow-sm ${className}`}
    >
      <div className="flex items-center justify-between pb-4 border-b border-[#DFE5F3]">
        <h3 className="text-xs uppercase tracking-widest font-bold text-[#0D0D0D]">
          Order Summary
        </h3>
        {itemCount !== undefined && (
          <span className="text-xs text-[#557373] font-medium">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
        )}
      </div>

      <div className="space-y-3 text-xs">
        <div className="flex justify-between items-center text-[#557373]">
          <span>Subtotal</span>
          <motion.span
            key={subtotal}
            initial={{ opacity: 0.7, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="font-semibold text-[#0D0D0D] text-sm"
          >
            {formatCurrency(subtotal)}
          </motion.span>
        </div>

        <div className="flex justify-between items-center text-[#557373]">
          <span>Shipping</span>
          <span className="font-medium text-[#142F40]">
            {shipping === 0 ? 'Calculated at checkout' : formatCurrency(shipping)}
          </span>
        </div>
      </div>

      <div className="pt-4 border-t border-[#DFE5F3] flex justify-between items-baseline">
        <span className="text-xs uppercase tracking-wider font-bold text-[#0D0D0D]">
          Total
        </span>
        <motion.span
          key={total || subtotal}
          initial={{ opacity: 0.7, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-xl font-bold text-[#0D0D0D] tracking-tight"
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
              className="w-full py-3.5 px-6 bg-[#0D0D0D] text-[#F2EFEA] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#272401] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 disabled:opacity-40 disabled:pointer-events-none shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <Link
              to={ROUTES.CHECKOUT}
              className="block w-full py-3.5 px-6 bg-[#0D0D0D] text-[#F2EFEA] text-xs uppercase tracking-widest font-bold rounded-xl text-center hover:bg-[#272401] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 shadow-md"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}

          <div className="mt-4 pt-4 border-t border-[#DFE5F3]/70 text-center">
            <Link
              to={ROUTES.SHOP}
              className="text-[11px] uppercase tracking-wider text-[#557373] hover:text-[#0D0D0D] font-medium transition-colors"
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
