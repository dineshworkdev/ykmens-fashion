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
      <div className="bg-[#F2EFEA] border border-[#DFE5F3] rounded-2xl p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#DFE5F3] text-[#557373] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#0D0D0D] uppercase">
          Your Bag is Empty
        </h3>
        <p className="text-xs text-[#557373]">
          Please add items to your shopping bag before proceeding through checkout.
        </p>
        <Link
          to={ROUTES.SHOP}
          className="inline-block px-6 py-2.5 bg-[#0D0D0D] text-[#F2EFEA] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#272401] transition-colors"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F2EFEA] border border-[#DFE5F3] rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#DFE5F3]">
        <div>
          <h2 className="text-sm uppercase tracking-widest font-bold text-[#0D0D0D]">
            Cart Review
          </h2>
          <span className="text-xs text-[#557373]">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your bag
          </span>
        </div>

        <Link
          to={ROUTES.CART}
          className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-semibold text-[#142F40] hover:text-[#0D0D0D] transition-colors"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>Edit Bag</span>
        </Link>
      </div>

      {/* Cart Items List */}
      <div className="divide-y divide-[#DFE5F3]">
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
      <div className="pt-4 border-t border-[#DFE5F3] flex justify-between items-center text-sm font-semibold text-[#0D0D0D]">
        <span className="text-xs uppercase tracking-wider text-[#557373]">Subtotal</span>
        <span className="text-base font-bold">{formatCurrency(subtotal)}</span>
      </div>

      {/* Action Button */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#0D0D0D] text-[#F2EFEA] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#272401] active:scale-95 transition-all flex items-center justify-center space-x-2 shadow-md"
        >
          <span>Continue to Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default OrderReviewStep;
