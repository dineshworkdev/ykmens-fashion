import React from 'react';
import Input from '../common/Input';
import { ArrowLeft, ArrowRight, MapPin } from '../../assets/icons';

/**
 * Checkout Step 3: Shipping Destination Details
 * Collects truthful address and PIN code without fake shipping courier claims.
 */
export const ShippingStep = ({
  shipping,
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
      className="bg-[#FFFFFF] border border-[#E4D7CC] rounded-2xl p-6 sm:p-8 space-y-6 text-[#4A3A32]"
    >
      <div className="flex items-center justify-between pb-4 border-b border-[#E4D7CC]">
        <div>
          <h2 className="text-sm uppercase tracking-widest font-bold text-[#33251F]">
            Shipping Destination
          </h2>
          <p className="text-xs text-[#6B5549] mt-0.5">
            Enter the physical address where you would like your order delivered.
          </p>
        </div>

        <div className="w-8 h-8 rounded-full bg-[#EADFD4] text-[#33251F] flex items-center justify-center flex-shrink-0">
          <MapPin className="w-4 h-4" />
        </div>
      </div>

      <div className="space-y-4">
        <Input
          label="Street Address / Building"
          name="addressLine1"
          value={shipping.addressLine1}
          onChange={(e) => onChange('addressLine1', e.target.value)}
          placeholder="Flat / House No., Building Name, Street"
          autoComplete="street-address"
          error={errors.addressLine1}
          required
        />

        <Input
          label="Landmark / Locality (Optional)"
          name="addressLine2"
          value={shipping.addressLine2}
          onChange={(e) => onChange('addressLine2', e.target.value)}
          placeholder="Nearby landmark, sector or locality"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="City"
            name="city"
            value={shipping.city}
            onChange={(e) => onChange('city', e.target.value)}
            placeholder="e.g. Mumbai"
            autoComplete="address-level2"
            error={errors.city}
            required
          />

          <Input
            label="State"
            name="state"
            value={shipping.state}
            onChange={(e) => onChange('state', e.target.value)}
            placeholder="e.g. Maharashtra"
            autoComplete="address-level1"
            error={errors.state}
            required
          />

          <Input
            label="PIN Code"
            name="postalCode"
            value={shipping.postalCode}
            onChange={(e) => onChange('postalCode', e.target.value)}
            placeholder="6-digit PIN"
            autoComplete="postal-code"
            error={errors.postalCode}
            required
          />
        </div>

        <div>
          <label
            htmlFor="country-select"
            className="block text-xs uppercase tracking-wider font-semibold text-[#33251F] mb-2"
          >
            Country <span className="text-[#6B5549]">*</span>
          </label>
          <div className="relative">
            <select
              id="country-select"
              value={shipping.country || 'India'}
              onChange={(e) => onChange('country', e.target.value)}
              className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#D8C8BA] rounded-xl text-[#33251F] text-sm focus:outline-none focus:ring-2 focus:ring-[#4A3A32]/20 focus:border-[#4A3A32] transition-all cursor-pointer"
            >
              <option value="India" className="bg-[#FFFFFF] text-[#33251F]">India</option>
              <option value="United States" className="bg-[#FFFFFF] text-[#33251F]">United States</option>
              <option value="United Kingdom" className="bg-[#FFFFFF] text-[#33251F]">United Kingdom</option>
              <option value="United Arab Emirates" className="bg-[#FFFFFF] text-[#33251F]">United Arab Emirates</option>
              <option value="Singapore" className="bg-[#FFFFFF] text-[#33251F]">Singapore</option>
            </select>
          </div>
        </div>

        <Input
          label="Delivery Instructions (Optional)"
          name="deliveryInstructions"
          value={shipping.deliveryInstructions || ''}
          onChange={(e) => onChange('deliveryInstructions', e.target.value)}
          placeholder="Gate code, specific building entry notes, etc."
        />
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#E4D7CC]">
        <button
          type="button"
          onClick={onPrev}
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#D8C8BA] text-[#33251F] hover:bg-[#FAF7F2] text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Details</span>
        </button>

        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 bg-[#4A3A32] text-[#FAF7F2] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#33251F] active:scale-95 transition-all flex items-center justify-center space-x-2 shadow-md"
        >
          <span>Continue to Review</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

export default ShippingStep;
