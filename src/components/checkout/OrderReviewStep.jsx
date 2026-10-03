import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../cart/CartItem';
import Button from '../common/Button';
import { useCart } from '../../hooks/useCart';
import { ROUTES } from '../../utils/constants';
import { ArrowRight, ShoppingBag, Edit2 } from '../../assets/icons';
import { formatCurrency } from '../../utils/formatters';

/**
 * Checkout Step 1: Cart Review
 */
export const OrderReviewStep = ({ onNext }) => {
  const { items, subtotal, incrementQuantity, decrementQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-[#2C1E18] border border-[#3E2B21] rounded-2xl p-8 text-center space-y-4 text-[#FAF7F2]">
        <div className="w-12 h-12 rounded-full bg-[#3E2B21] text-[#FAF7F2] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#FAF7F2] uppercase">
          Your Bag is Empty
        </h3>
        <p className="text-xs text-[#C8B8AA]">
          Please add items to your shopping bag before proceeding through checkout.
        </p>
        <Link
          to={ROUTES.SHOP}
          className="inline-block px-6 py-2.5 bg-[#FAF7F2] text-[#1D1410] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#E8DEC8] transition-colors"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#2C1E18] border border-[#3E2B21] rounded-2xl p-6 sm:p-8 space-y-6 text-[#FAF7F2]">
      <div className="flex items-center justify-between pb-4 border-b border-[#3E2B21]">
        <div>
          <h2 className="text-sm uppercase tracking-widest font-bold text-[#FAF7F2]">
            Cart Review
          </h2>
          <span className="text-xs text-[#C8B8AA]">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your bag
          </span>
        </div>

        <Link
          to={ROUTES.CART}
          className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-semibold text-[#D99E84] hover:text-[#FAF7F2] transition-colors"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>Edit Bag</span>
        </Link>
      </div>

      {/* Cart Items List */}
      <div className="divide-y divide-[#3E2B21]">
        {items.map((item) => (
          <CartItem
            key={item.itemKey}
            item={item}
            onIncrement={incrementQuantity}
            onDecrement={decrementQuantity}
            onRemove={removeItem}
          />
        ))}
      </div>

      {/* Subtotal Preview */}
      <div className="pt-4 border-t border-[#3E2B21] flex justify-between items-center text-sm font-semibold text-[#FAF7F2]">
        <span className="text-xs uppercase tracking-wider text-[#C8B8AA]">Subtotal</span>
        <span className="text-base font-bold">{formatCurrency(subtotal)}</span>
      </div>

      {/* Action Button */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#FAF7F2] text-[#1D1410] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#E8DEC8] active:scale-95 transition-all flex items-center justify-center space-x-2 shadow-md"
        >
          <span>Continue to Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default OrderReviewStep;
