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
      <div className="md:hidden bg-[#2C1E18] border border-[#3E2B21] rounded-2xl p-3.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] uppercase tracking-wider font-bold text-[#FAF7F2]">
            Step {currentStep} of {steps.length}: {steps.find(s => s.number === currentStep)?.label}
          </span>
          <span className="text-[10px] text-[#C8B8AA] font-medium">
            {Math.round((currentStep / steps.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-[#3E2B21] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#FAF7F2] h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop Multi-Step Tracker */}
      <ol className="hidden md:flex items-center justify-between relative bg-[#2C1E18] border border-[#3E2B21] rounded-2xl p-4 lg:p-5 shadow-sm">
        {steps.map((step, idx) => {
          const isActive = step.number === currentStep;
          const isPassed = step.number < currentStep;

          return (
            <React.Fragment key={step.number}>
              <li className="flex items-center space-x-2.5 z-10">
                <span
                  className={`w-7 h-7 flex items-center justify-center text-xs font-bold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-[#FAF7F2] text-[#1D1410] ring-4 ring-[#FAF7F2]/20'
                      : isPassed
                      ? 'bg-[#D99E84] text-[#1D1410]'
                      : 'bg-[#3E2B21] text-[#C8B8AA]'
                  }`}
                >
                  {isPassed ? <Check className="w-3.5 h-3.5" /> : step.number}
                </span>
                <span
                  className={`text-xs uppercase tracking-wider font-semibold transition-colors ${
                    isActive
                      ? 'text-[#FAF7F2] font-bold'
                      : isPassed
                      ? 'text-[#D99E84]'
                      : 'text-[#C8B8AA]'
                  }`}
                >
                  {step.label}
                </span>
              </li>

              {/* Connecting line between steps */}
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 mx-3 h-0.5 rounded transition-colors ${
                    isPassed ? 'bg-[#D99E84]' : 'bg-[#3E2B21]'
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
