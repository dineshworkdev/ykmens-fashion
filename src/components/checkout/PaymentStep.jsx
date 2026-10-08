import React from 'react';
import { CreditCard, ArrowLeft, ArrowRight, AlertCircle, CheckCircle2 } from '../../assets/icons';
import { paymentService } from '../../services/payment';

/**
 * Checkout Step 5: Truthful Payment Configuration
 * 
 * Strict architectural rule:
 * No fake homemade credit card form. Truthfully explains the gateway readiness
 * and development mode status for Stripe / Razorpay adapters.
 * Final action: "PLACE ORDER".
 */
export const PaymentStep = ({
  selectedGateway,
  onSelectGateway,
  onInitiatePayment,
  onPrev,
  isProcessing,
  error,
}) => {
  const supportedGateways = paymentService.getSupportedGateways();

  return (
    <div className="bg-[#FFFFFF] border border-[#E4D7CC] rounded-2xl p-6 sm:p-8 space-y-6 text-[#4A3A32]">
      <div className="pb-4 border-b border-[#E4D7CC]">
        <h2 className="text-sm uppercase tracking-widest font-bold text-[#33251F]">
          Payment Method
        </h2>
        <p className="text-xs text-[#6B5549] mt-0.5">
          Select your preferred payment gateway adapter for this order.
        </p>
      </div>

      {/* Gateway Options */}
      <div className="space-y-3">
        {supportedGateways.map((gw) => {
          const isSelected = selectedGateway === gw.id;
          return (
            <label
              key={gw.id}
              className={`flex items-start sm:items-center justify-between p-4 sm:p-5 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'border-[#4A3A32] bg-[#FAF7F2] shadow-sm'
                  : 'border-[#D8C8BA] bg-[#FFFFFF] hover:border-[#4A3A32]'
              }`}
            >
              <div className="flex items-start sm:items-center space-x-3.5">
                <input
                  type="radio"
                  name="paymentGateway"
                  value={gw.id}
                  checked={isSelected}
                  onChange={() => onSelectGateway(gw.id)}
                  className="mt-0.5 sm:mt-0 text-[#4A3A32] focus:ring-[#4A3A32] accent-[#4A3A32]"
                />
                <div>
                  <span className="text-xs sm:text-sm font-bold text-[#33251F] block">
                    {gw.name}
                  </span>
                  <span className="text-[11px] text-[#6B5549]">
                    {gw.description || (gw.id === 'cashfree'
                      ? 'UPI, Cards, NetBanking via Cashfree Payments'
                      : gw.id === 'razorpay'
                      ? 'UPI, NetBanking & Indian Debit/Credit Cards'
                      : 'International & Domestic Card Hosted Checkout')}
                  </span>
                </div>
              </div>
              <CreditCard className="w-5 h-5 text-[#4A3A32] flex-shrink-0 ml-2 mt-0.5 sm:mt-0" />
            </label>
          );
        })}
      </div>

      {/* Truthful Gateway Readiness Notice */}
      <div className="p-4 sm:p-5 bg-[#FAF7F2] border border-[#D8C8BA] rounded-xl flex items-start space-x-3.5">
        <AlertCircle className="w-5 h-5 text-[#4A3A32] flex-shrink-0 mt-0.5" />
        <div className="text-xs text-[#6B5549] leading-relaxed space-y-1">
          <p className="font-bold uppercase tracking-wider text-[#33251F]">
            {selectedGateway === 'cashfree'
              ? 'Cashfree Secure Checkout'
              : 'Payment Gateway Integration Notice'}
          </p>
          <p className="text-[#6B5549]">
            {selectedGateway === 'cashfree'
              ? 'Clicking Place Order securely creates an order on the backend and launches the Cashfree Hosted Checkout session.'
              : 'Payment processing will be available once the live payment gateway keys are connected.'}
          </p>
          <p className="text-[#8B7768]">
            {selectedGateway === 'cashfree'
              ? 'All transactions are encrypted and securely processed via Cashfree Payments.'
              : 'This frontend demonstration records the order as Payment Pending without charging live funds or collecting card numbers.'}
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-[#FAF7F2] border border-[#6B5549] rounded-xl text-xs text-[#6B5549] font-medium flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#E4D7CC]">
        <button
          type="button"
          onClick={onPrev}
          disabled={isProcessing}
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#D8C8BA] text-[#33251F] hover:bg-[#FAF7F2] text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Review</span>
        </button>

        <button
          type="button"
          onClick={onInitiatePayment}
          disabled={isProcessing}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#4A3A32] text-[#FAF7F2] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#33251F] active:scale-95 transition-all flex items-center justify-center space-x-2 shadow-md disabled:opacity-50"
        >
          {isProcessing ? (
            <span>Placing Order...</span>
          ) : (
            <>
              <span>Place Order</span>
              <CheckCircle2 className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentStep;
