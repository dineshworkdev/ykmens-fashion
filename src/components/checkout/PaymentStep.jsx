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
    <div className="bg-[#F2EFEA] border border-[#DFE5F3] rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="pb-4 border-b border-[#DFE5F3]">
        <h2 className="text-sm uppercase tracking-widest font-bold text-[#0D0D0D]">
          Payment Method
        </h2>
        <p className="text-xs text-[#557373] mt-0.5">
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
                  ? 'border-[#0D0D0D] bg-[#DFE5F3]/50 shadow-sm'
                  : 'border-[#DFE5F3] bg-[#F2EFEA] hover:border-[#557373]'
              }`}
            >
              <div className="flex items-start sm:items-center space-x-3.5">
                <input
                  type="radio"
                  name="paymentGateway"
                  value={gw.id}
                  checked={isSelected}
                  onChange={() => onSelectGateway(gw.id)}
                  className="mt-0.5 sm:mt-0 text-[#0D0D0D] focus:ring-[#0D0D0D] accent-[#0D0D0D]"
                />
                <div>
                  <span className="text-xs sm:text-sm font-bold text-[#0D0D0D] block">
                    {gw.name}
                  </span>
                  <span className="text-[11px] text-[#557373]">
                    {gw.id === 'razorpay'
                      ? 'UPI, NetBanking & Indian Debit/Credit Cards'
                      : 'International & Domestic Card Hosted Checkout'}
                  </span>
                </div>
              </div>
              <CreditCard className="w-5 h-5 text-[#142F40] flex-shrink-0 ml-2 mt-0.5 sm:mt-0" />
            </label>
          );
        })}
      </div>

      {/* Truthful Gateway Readiness Notice */}
      <div className="p-4 sm:p-5 bg-[#E7DECD]/60 border border-[#DFE5F3] rounded-xl flex items-start space-x-3.5">
        <AlertCircle className="w-5 h-5 text-[#272401] flex-shrink-0 mt-0.5" />
        <div className="text-xs text-[#272401] leading-relaxed space-y-1">
          <p className="font-bold uppercase tracking-wider text-[#0D0D0D]">
            Payment Gateway Integration Notice
          </p>
          <p className="text-[#393A10]">
            Payment processing will be available once the live payment gateway keys are connected.
          </p>
          <p className="text-[#557373]">
            This frontend demonstration records the order as <strong>Payment Pending</strong> without charging live funds or collecting card numbers.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-[#EDE7C7] border border-[#8B0000]/40 rounded-xl text-xs text-[#8B0000] font-medium flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#DFE5F3]">
        <button
          type="button"
          onClick={onPrev}
          disabled={isProcessing}
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#DFE5F3] text-[#0D0D0D] hover:bg-[#DFE5F3] text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Review</span>
        </button>

        <button
          type="button"
          onClick={onInitiatePayment}
          disabled={isProcessing}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#0D0D0D] text-[#F2EFEA] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#272401] active:scale-95 transition-all flex items-center justify-center space-x-2 shadow-md disabled:opacity-50"
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
