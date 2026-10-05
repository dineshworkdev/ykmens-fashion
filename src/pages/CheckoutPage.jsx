import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Container from '../components/layout/Container';
import CheckoutStepIndicator from '../components/checkout/CheckoutStepIndicator';
import OrderReviewStep from '../components/checkout/OrderReviewStep';
import CustomerInfoStep from '../components/checkout/CustomerInfoStep';
import ShippingStep from '../components/checkout/ShippingStep';
import OrderReviewSummaryStep from '../components/checkout/OrderReviewSummaryStep';
import PaymentStep from '../components/checkout/PaymentStep';
import CartSummary from '../components/cart/CartSummary';
import { useCheckout } from '../hooks/useCheckout';
import { useCart } from '../hooks/useCart';
import { CHECKOUT_STEPS, ROUTES } from '../utils/constants';
import { ShoppingBag, ChevronDown, ChevronUp, Lock } from '../assets/icons';
import { formatCurrency } from '../utils/formatters';

/**
 * Checkout Page (/checkout)
 * Professional 2-column layout on desktop, 1-column on mobile.
 * Multi-step flow with truthful payment handling and Indian Rupee calculations.
 */
export const CheckoutPage = () => {
  const navigate = useNavigate();
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  const {
    items,
    cartCount,
    subtotal,
    shipping: shippingCost,
    total,
    emptyCart,
  } = useCart();

  const {
    currentStep,
    customer,
    shipping,
    selectedPaymentGateway,
    setSelectedPaymentGateway,
    errors,
    isProcessing,
    updateCustomer,
    updateShipping,
    nextStep,
    prevStep,
    goToStep,
    initiatePaymentAndPlaceOrder,
  } = useCheckout();

  const handlePlaceOrder = async () => {
    const result = await initiatePaymentAndPlaceOrder({
      items,
      subtotal,
      shippingCost,
      tax: 0,
      total,
      onOrderPlaced: (order) => {
        emptyCart();
        navigate(ROUTES.ORDER_CONFIRMATION, { state: { orderId: order.orderId } });
      },
    });

    if (result?.session?.redirectUrl) {
      // In production, real hosted gateway redirects directly to provider
      window.location.href = result.session.redirectUrl;
    }
  };

  // If cart is empty and no order in progress
  if (items.length === 0 && currentStep !== CHECKOUT_STEPS.CONFIRMATION) {
    return (
      <div className="bg-[#FAF7F2] text-[#4A3A32] py-20 md:py-28 min-h-[60vh] flex items-center justify-center">
        <Container>
          <div className="max-w-md mx-auto text-center bg-[#FFFFFF] border border-[#E4D7CC] rounded-3xl p-10 md:p-12 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-[#EADFD4] text-[#33251F] flex items-center justify-center mx-auto mb-5">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#33251F] uppercase mb-2">
              Your Bag is Empty
            </h1>
            <p className="text-xs md:text-sm text-[#6B5549] mb-8">
              Add pieces to your bag before proceeding to checkout.
            </p>
            <Link
              to={ROUTES.SHOP}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#4A3A32] text-[#FAF7F2] text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-[#33251F] active:scale-95 transition-all shadow-md"
            >
              Continue Shopping
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] text-[#4A3A32] py-8 md:py-14 min-h-[75vh]">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 mb-6 border-b border-[#E4D7CC]">
          <div>
            <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#6B5549] font-semibold mb-1">
              <Link to={ROUTES.CART} className="hover:text-[#33251F]">
                Shopping Bag
              </Link>
              <span>/</span>
              <span className="text-[#33251F]">Checkout</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#33251F]">
              Checkout
            </h1>
          </div>

          <div className="flex items-center space-x-2 text-xs text-[#6B5549]">
            <Lock className="w-3.5 h-3.5 text-[#4A3A32]" />
            <span className="font-medium">Direct Checkout Process</span>
          </div>
        </div>

        {/* Multi-Step Progress Tracker */}
        <CheckoutStepIndicator currentStep={currentStep} />

        {/* Mobile Collapsible Order Summary Bar */}
        <div className="lg:hidden mb-6 bg-[#FFFFFF] border border-[#E4D7CC] rounded-2xl overflow-hidden shadow-md">
          <button
            type="button"
            onClick={() => setMobileSummaryOpen((prev) => !prev)}
            className="w-full p-4 flex items-center justify-between text-left"
          >
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4 text-[#4A3A32]" />
              <span className="text-xs uppercase tracking-wider font-bold text-[#33251F]">
                Order Summary ({cartCount} {cartCount === 1 ? 'item' : 'items'})
              </span>
              {mobileSummaryOpen ? (
                <ChevronUp className="w-4 h-4 text-[#6B5549]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#6B5549]" />
              )}
            </div>
            <span className="text-sm font-bold text-[#33251F]">
              {formatCurrency(total || subtotal)}
            </span>
          </button>

          <AnimatePresence>
            {mobileSummaryOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="px-4 pb-4 border-t border-[#E4D7CC] pt-3"
              >
                <CartSummary
                  subtotal={subtotal}
                  shipping={shippingCost}
                  total={total}
                  itemCount={cartCount}
                  showCheckoutButton={false}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2-Column Desktop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Step Body */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Cart Review */}
              {currentStep === CHECKOUT_STEPS.REVIEW && (
                <motion.div
                  key="step-review"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <OrderReviewStep onNext={nextStep} />
                </motion.div>
              )}

              {/* Step 2: Customer Details */}
              {currentStep === CHECKOUT_STEPS.CUSTOMER && (
                <motion.div
                  key="step-customer"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <CustomerInfoStep
                    customer={customer}
                    onChange={updateCustomer}
                    onNext={nextStep}
                    onPrev={prevStep}
                    errors={errors}
                  />
                </motion.div>
              )}

              {/* Step 3: Shipping Details */}
              {currentStep === CHECKOUT_STEPS.SHIPPING && (
                <motion.div
                  key="step-shipping"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ShippingStep
                    shipping={shipping}
                    onChange={updateShipping}
                    onNext={nextStep}
                    onPrev={prevStep}
                    errors={errors}
                  />
                </motion.div>
              )}

              {/* Step 4: Summary Review */}
              {currentStep === CHECKOUT_STEPS.SUMMARY && (
                <motion.div
                  key="step-summary"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <OrderReviewSummaryStep
                    items={items}
                    customer={customer}
                    shipping={shipping}
                    subtotal={subtotal}
                    shippingCost={shippingCost}
                    total={total}
                    onNext={nextStep}
                    onPrev={prevStep}
                    goToStep={goToStep}
                  />
                </motion.div>
              )}

              {/* Step 5: Payment Gateway */}
              {currentStep === CHECKOUT_STEPS.PAYMENT && (
                <motion.div
                  key="step-payment"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <PaymentStep
                    selectedGateway={selectedPaymentGateway}
                    onSelectGateway={setSelectedPaymentGateway}
                    onInitiatePayment={handlePlaceOrder}
                    onPrev={prevStep}
                    isProcessing={isProcessing}
                    error={errors.general}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Sticky Order Summary Column */}
          <div className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24">
            <CartSummary
              subtotal={subtotal}
              shipping={shippingCost}
              total={total}
              itemCount={cartCount}
              showCheckoutButton={false}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CheckoutPage;
