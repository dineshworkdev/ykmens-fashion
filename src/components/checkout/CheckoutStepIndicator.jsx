import React from 'react';
import { CHECKOUT_STEPS } from '../../utils/constants';
import { Check } from '../../assets/icons';

/**
 * Checkout Progress Indicator Component
 * Desktop: 5-step numbered progress bar
 * Mobile: Compact pill status indicator
 */
export const CheckoutStepIndicator = ({ currentStep }) => {
  const steps = [
    { number: CHECKOUT_STEPS.REVIEW, label: 'Cart' },
    { number: CHECKOUT_STEPS.CUSTOMER, label: 'Details' },
    { number: CHECKOUT_STEPS.SHIPPING, label: 'Shipping' },
    { number: CHECKOUT_STEPS.SUMMARY, label: 'Review' },
    { number: CHECKOUT_STEPS.PAYMENT, label: 'Payment' },
  ];

  return (
    <nav aria-label="Checkout Progress" className="mb-8">
      {/* Mobile Compact Progress Bar */}
      <div className="md:hidden bg-[#E7DECD]/50 border border-[#DFE5F3] rounded-2xl p-3.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] uppercase tracking-wider font-bold text-[#0D0D0D]">
            Step {currentStep} of {steps.length}: {steps.find(s => s.number === currentStep)?.label}
          </span>
          <span className="text-[10px] text-[#557373] font-medium">
            {Math.round((currentStep / steps.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-[#DFE5F3] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#0D0D0D] h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop Multi-Step Tracker */}
      <ol className="hidden md:flex items-center justify-between relative bg-[#E7DECD]/30 border border-[#DFE5F3] rounded-2xl p-4 lg:p-5">
        {steps.map((step, idx) => {
          const isActive = step.number === currentStep;
          const isPassed = step.number < currentStep;

          return (
            <React.Fragment key={step.number}>
              <li className="flex items-center space-x-2.5 z-10">
                <span
                  className={`w-7 h-7 flex items-center justify-center text-xs font-bold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-[#0D0D0D] text-[#F2EFEA] ring-4 ring-[#DFE5F3]'
                      : isPassed
                      ? 'bg-[#272401] text-[#F2EFEA]'
                      : 'bg-[#DFE5F3] text-[#557373]'
                  }`}
                >
                  {isPassed ? <Check className="w-3.5 h-3.5" /> : step.number}
                </span>
                <span
                  className={`text-xs uppercase tracking-wider font-semibold transition-colors ${
                    isActive
                      ? 'text-[#0D0D0D] font-bold'
                      : isPassed
                      ? 'text-[#272401]'
                      : 'text-[#557373]'
                  }`}
                >
                  {step.label}
                </span>
              </li>

              {/* Connecting line between steps */}
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 mx-3 h-0.5 rounded transition-colors ${
                    isPassed ? 'bg-[#272401]' : 'bg-[#DFE5F3]'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default CheckoutStepIndicator;
