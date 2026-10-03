import React from 'react';
import Input from '../common/Input';
import { ArrowLeft, ArrowRight, UserCheck } from '../../assets/icons';

/**
 * Checkout Step 2: Customer Information
 * Allows guest checkout with necessary customer contact information.
 */
export const CustomerInfoStep = ({
  customer,
  onChange,
  onNext,
  onPrev,
  errors = {},
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#2C1E18] border border-[#3E2B21] rounded-2xl p-6 sm:p-8 space-y-6 text-[#FAF7F2]"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#3E2B21]">
        <div>
          <h2 className="text-sm uppercase tracking-widest font-bold text-[#FAF7F2]">
            Customer Details
          </h2>
          <p className="text-xs text-[#C8B8AA] mt-0.5">
            Checking out as guest. We will send your order confirmation to this email.
          </p>
        </div>

        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#3E2B21] text-[#FAF7F2] text-xs font-medium self-start sm:self-auto">
          <UserCheck className="w-3.5 h-3.5" />
          <span>Guest Checkout</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="First Name"
          name="firstName"
          value={customer.firstName}
          onChange={(e) => onChange('firstName', e.target.value)}
          placeholder="e.g. Arun"
          autoComplete="given-name"
          error={errors.firstName}
          required
        />
        <Input
          label="Last Name"
          name="lastName"
          value={customer.lastName}
          onChange={(e) => onChange('lastName', e.target.value)}
          placeholder="e.g. Kumar"
          autoComplete="family-name"
          error={errors.lastName}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={customer.email}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="e.g. arun.kumar@example.com"
          autoComplete="email"
          error={errors.email}
          required
        />
        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          value={customer.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder="e.g. 9876543210"
          autoComplete="tel"
          error={errors.phone}
          required
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#3E2B21]">
        <button
          type="button"
          onClick={onPrev}
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#3E2B21] text-[#FAF7F2] hover:bg-[#3E2B21] text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Cart</span>
        </button>

        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 bg-[#FAF7F2] text-[#1D1410] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#E8DEC8] active:scale-95 transition-all flex items-center justify-center space-x-2 shadow-md"
        >
          <span>Continue to Shipping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

export default CustomerInfoStep;
