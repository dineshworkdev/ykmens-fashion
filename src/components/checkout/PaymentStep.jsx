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
    <div className="bg-[#2C1E18] border border-[#3E2B21] rounded-2xl p-6 sm:p-8 space-y-6 text-[#FAF7F2]">
      <div className="pb-4 border-b border-[#3E2B21]">
        <h2 className="text-sm uppercase tracking-widest font-bold text-[#FAF7F2]">
          Payment Method
        </h2>
        <p className="text-xs text-[#C8B8AA] mt-0.5">
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
                  ? 'border-[#FAF7F2] bg-[#341F17] shadow-sm'
                  : 'border-[#3E2B21] bg-[#1D1410] hover:border-[#C8B8AA]/40'
              }`}
            >
              <div className="flex items-start sm:items-center space-x-3.5">
                <input
                  type="radio"
                  name="paymentGateway"
                  value={gw.id}
                  checked={isSelected}
                  onChange={() => onSelectGateway(gw.id)}
                  className="mt-0.5 sm:mt-0 text-[#FAF7F2] focus:ring-[#D99E84] accent-[#D99E84]"
                />
                <div>
                  <span className="text-xs sm:text-sm font-bold text-[#FAF7F2] block">
                    {gw.name}
                  </span>
                  <span className="text-[11px] text-[#C8B8AA]">
                    {gw.id === 'razorpay'
                      ? 'UPI, NetBanking & Indian Debit/Credit Cards'
                      : 'International & Domestic Card Hosted Checkout'}
                  </span>
                </div>
              </div>
              <CreditCard className="w-5 h-5 text-[#D99E84] flex-shrink-0 ml-2 mt-0.5 sm:mt-0" />
            </label>
          );
        })}
      </div>

      {/* Truthful Gateway Readiness Notice */}
      <div className="p-4 sm:p-5 bg-[#341F17] border border-[#3E2B21] rounded-xl flex items-start space-x-3.5">
        <AlertCircle className="w-5 h-5 text-[#D99E84] flex-shrink-0 mt-0.5" />
        <div className="text-xs text-[#C8B8AA] leading-relaxed space-y-1">
          <p className="font-bold uppercase tracking-wider text-[#FAF7F2]">
            Payment Gateway Integration Notice
          </p>
          <p className="text-[#C8B8AA]">
            Payment processing will be available once the live payment gateway keys are connected.
          </p>
          <p className="text-[#A8988B]">
            This frontend demonstration records the order as <strong className="text-[#FAF7F2]">Payment Pending</strong> without charging live funds or collecting card numbers.
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-[#34151C] border border-[#A6445D]/50 rounded-xl text-xs text-[#E892A2] font-medium flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#3E2B21]">
        <button
          type="button"
          onClick={onPrev}
          disabled={isProcessing}
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-[#3E2B21] text-[#FAF7F2] hover:bg-[#341F17] text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Review</span>
        </button>

        <button
          type="button"
          onClick={onInitiatePayment}
          disabled={isProcessing}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#FAF7F2] text-[#1D1410] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#E8DEC8] active:scale-95 transition-all flex items-center justify-center space-x-2 shadow-md disabled:opacity-50"
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
