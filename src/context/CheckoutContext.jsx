import React, { createContext, useContext, useState, useCallback } from 'react';
import { CHECKOUT_STEPS, PAYMENT_STATUS } from '../utils/constants';
import { validateCustomerInfo, validateShippingAddress } from '../utils/validators';
import { orderService } from '../services/orders/orderService';
import { paymentService } from '../services/payment';

const CheckoutContext = createContext(null);

export const CheckoutProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(CHECKOUT_STEPS.REVIEW);

  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [shipping, setShipping] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    deliveryInstructions: '',
  });

  const [selectedPaymentGateway, setSelectedPaymentGateway] = useState('cashfree');
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const updateCustomer = useCallback((field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  }, []);

  const updateShipping = useCallback((field, value) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  }, []);

  const goToStep = useCallback((stepNumber) => {
    if (stepNumber >= CHECKOUT_STEPS.REVIEW && stepNumber <= CHECKOUT_STEPS.CONFIRMATION) {
      setCurrentStep(stepNumber);
    }
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep === CHECKOUT_STEPS.CUSTOMER) {
      const validation = validateCustomerInfo(customer);
      if (!validation.isValid) {
        setErrors(validation.errors);
        return false;
      }
    }

    if (currentStep === CHECKOUT_STEPS.SHIPPING) {
      const validation = validateShippingAddress(shipping);
      if (!validation.isValid) {
        setErrors(validation.errors);
        return false;
      }
    }

    setErrors({});
    setCurrentStep((prev) => Math.min(prev + 1, CHECKOUT_STEPS.CONFIRMATION));
    return true;
  }, [currentStep, customer, shipping]);

  const prevStep = useCallback(() => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, CHECKOUT_STEPS.REVIEW));
  }, []);

  /**
   * Finalizes the order and connects with the payment gateway abstraction.
   * Does NOT capture credit cards locally. Initiates real gateway session or records pending order.
   */
  const initiatePaymentAndPlaceOrder = useCallback(
    async ({ items, subtotal, shippingCost, tax, total, onOrderPlaced }) => {
      if (!items || items.length === 0) {
        setErrors({ general: 'Cart is empty' });
        return null;
      }

      setIsProcessing(true);
      setErrors({});

      try {
        const order = orderService.createOrder({
          customer,
          shipping,
          items,
          subtotal,
          shippingCost,
          tax,
          total,
          paymentGateway: selectedPaymentGateway,
          paymentStatus: PAYMENT_STATUS.PENDING,
        });

        // Query the gateway abstraction
        const gateway = paymentService.getGateway(selectedPaymentGateway);
        const session = await gateway.createPaymentSession({
          orderId: order.orderId,
          amount: total,
          currency: 'INR',
          customer,
        });

        setCompletedOrder(order);
        setCurrentStep(CHECKOUT_STEPS.CONFIRMATION);

        if (onOrderPlaced) {
          onOrderPlaced(order, session);
        }

        return { order, session };
      } catch (err) {
        setErrors({ general: err.message || 'Payment initiation failed' });
        return null;
      } finally {
        setIsProcessing(false);
      }
    },
    [customer, shipping, selectedPaymentGateway]
  );

  const resetCheckout = useCallback(() => {
    setCurrentStep(CHECKOUT_STEPS.REVIEW);
    setCustomer({ firstName: '', lastName: '', email: '', phone: '' });
    setShipping({
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
      deliveryInstructions: '',
    });
    setErrors({});
    setIsProcessing(false);
  }, []);

  const value = {
    currentStep,
    customer,
    shipping,
    selectedPaymentGateway,
    setSelectedPaymentGateway,
    errors,
    isProcessing,
    completedOrder,
    updateCustomer,
    updateShipping,
    goToStep,
    nextStep,
    prevStep,
    initiatePaymentAndPlaceOrder,
    resetCheckout,
  };

  return <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>;
};

export const useCheckoutContext = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckoutContext must be used within a CheckoutProvider');
  }
  return context;
};

export default CheckoutContext;
