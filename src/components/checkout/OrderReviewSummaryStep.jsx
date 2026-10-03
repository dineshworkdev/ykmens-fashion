import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../cart/CartItem';
import { formatCurrency } from '../../utils/formatters';
import { CHECKOUT_STEPS } from '../../utils/constants';
import { ArrowLeft, ArrowRight, Edit2, User, MapPin } from '../../assets/icons';

/**
 * Checkout Step 4: Comprehensive Order Review
 * Reviews products, customer contact, shipping address, and financial breakdown before payment step.
 */
export const OrderReviewSummaryStep = ({
  items,
  customer,
  shipping,
  subtotal,
  shippingCost = 0,
  total,
  onNext,
  onPrev,
  goToStep,
}) => {
  return (
    <div className="bg-[#2C1E18] border border-[#3E2B21] rounded-2xl p-6 sm:p-8 space-y-7 text-[#FAF7F2]">
      <div className="pb-4 border-b border-[#3E2B21]">
        <h2 className="text-sm uppercase tracking-widest font-bold text-[#FAF7F2]">
          Order Summary & Details
        </h2>
        <p className="text-xs text-[#C8B8AA] mt-0.5">
          Please verify your items, contact information, and shipping address before proceeding.
        </p>
      </div>

      {/* Customer & Shipping Details Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Customer Information Card */}
        <div className="p-5 bg-[#341F17] border border-[#3E2B21] rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#FAF7F2]">
                <User className="w-3.5 h-3.5 text-[#D99E84]" />
                <span>Customer</span>
              </div>
              <button
                type="button"
                onClick={() => goToStep(CHECKOUT_STEPS.CUSTOMER)}
                className="inline-flex items-center space-x-1 text-[11px] uppercase tracking-wider font-semibold text-[#D99E84] hover:text-[#FAF7F2] transition-colors"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>
            <div className="text-xs space-y-1 text-[#FAF7F2]">
              <p className="font-semibold">{customer.firstName} {customer.lastName}</p>
              <p className="text-[#C8B8AA]">{customer.email}</p>
              <p className="text-[#C8B8AA]">{customer.phone}</p>
            </div>
          </div>
        </div>

        {/* Shipping Destination Card */}
        <div className="p-5 bg-[#341F17] border border-[#3E2B21] rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#FAF7F2]">
                <MapPin className="w-3.5 h-3.5 text-[#D99E84]" />
                <span>Shipping Address</span>
              </div>
              <button
                type="button"
                onClick={() => goToStep(CHECKOUT_STEPS.SHIPPING)}
                className="inline-flex items-center space-x-1 text-[11px] uppercase tracking-wider font-semibold text-[#D99E84] hover:text-[#FAF7F2] transition-colors"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>
            <div className="text-xs space-y-1 text-[#FAF7F2]">
              <p className="font-semibold">{shipping.addressLine1}</p>
              {shipping.addressLine2 && <p className="text-[#C8B8AA]">{shipping.addressLine2}</p>}
              <p className="text-[#C8B8AA]">
                {shipping.city}, {shipping.state} - {shipping.postalCode}
              </p>
              <p className="text-[#C8B8AA]">{shipping.country}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Review */}
      <div>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#3E2B21]">
          <h3 className="text-xs uppercase tracking-widest font-bold text-[#FAF7F2]">
            Selected Products ({items.length})
          </h3>
          <button
            type="button"
            onClick={() => goToStep(CHECKOUT_STEPS.REVIEW)}
            className="inline-flex items-center space-x-1 text-[11px] uppercase tracking-wider font-semibold text-[#D99E84] hover:text-[#FAF7F2] transition-colors"
          >
            <Edit2 className="w-3 h-3" />
            <span>Edit Quantities</span>
          </button>
        </div>

        <div className="divide-y divide-[#3E2B21]">
          {items.map((item) => (
            <CartItem
              key={item.itemKey}
              item={item}
              readOnly={true}
              compact={true}
            />
          ))}
        </div>
      </div>

      {/* Financial Breakdown */}
      <div className="pt-4 border-t border-[#3E2B21] space-y-2.5 text-xs">
        <div className="flex justify-between items-center text-[#C8B8AA]">
          <span>Subtotal</span>
          <span className="font-semibold text-[#FAF7F2]">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between items-center text-[#C8B8AA]">
          <span>Shipping</span>
          <span className="font-medium text-[#D99E84]">
            {shippingCost === 0 ? 'Complimentary' : formatCurrency(shippingCost)}
          </span>
        </div>
        <div className="flex justify-between items-baseline pt-3 border-t border-[#3E2B21]">
          <span className="text-xs uppercase tracking-wider font-bold text-[#FAF7F2]">
            Total Amount
          </span>
          <span className="text-xl font-bold text-[#FAF7F2]">
            {formatCurrency(total || subtotal)}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#3E2B21]">
        <button
          type="button"
          onClick={onPrev}
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#3E2B21] text-[#FAF7F2] hover:bg-[#3E2B21] text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shipping</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#FAF7F2] text-[#1D1410] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#E8DEC8] active:scale-95 transition-all flex items-center justify-center space-x-2 shadow-md"
        >
          <span>Continue to Payment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default OrderReviewSummaryStep;
