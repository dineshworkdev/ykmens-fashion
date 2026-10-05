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
      <div className="bg-[#FFFFFF] border border-[#E4D7CC] rounded-2xl p-8 text-center space-y-4 text-[#4A3A32]">
        <div className="w-12 h-12 rounded-full bg-[#EADFD4] text-[#33251F] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-[#33251F] uppercase">
          Your Bag is Empty
        </h3>
        <p className="text-xs text-[#6B5549]">
          Please add items to your shopping bag before proceeding through checkout.
        </p>
        <Link
          to={ROUTES.SHOP}
          className="inline-block px-6 py-2.5 bg-[#4A3A32] text-[#FAF7F2] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#33251F] transition-colors"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] border border-[#E4D7CC] rounded-2xl p-6 sm:p-8 space-y-6 text-[#4A3A32]">
      <div className="flex items-center justify-between pb-4 border-b border-[#E4D7CC]">
        <div>
          <h2 className="text-sm uppercase tracking-widest font-bold text-[#33251F]">
            Cart Review
          </h2>
          <span className="text-xs text-[#6B5549]">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your bag
          </span>
        </div>

        <Link
          to={ROUTES.CART}
          className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-semibold text-[#4A3A32] hover:text-[#33251F] transition-colors"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>Edit Bag</span>
        </Link>
      </div>

      {/* Cart Items List */}
      <div className="divide-y divide-[#E4D7CC]">
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
      <div className="pt-4 border-t border-[#E4D7CC] flex justify-between items-center text-sm font-semibold text-[#33251F]">
        <span className="text-xs uppercase tracking-wider text-[#6B5549]">Subtotal</span>
        <span className="text-base font-bold text-[#33251F]">{formatCurrency(subtotal)}</span>
      </div>

      {/* Action Button */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#4A3A32] text-[#FAF7F2] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#33251F] active:scale-95 transition-all flex items-center justify-center space-x-2 shadow-md"
        >
          <span>Continue to Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default OrderReviewStep;
