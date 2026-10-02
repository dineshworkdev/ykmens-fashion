import { StripePaymentAdapter } from './stripeAdapter';
import { RazorpayPaymentAdapter } from './razorpayAdapter';

/**
 * Payment Service Abstraction Registry
 */
const adapters = {
  stripe: new StripePaymentAdapter(),
  razorpay: new RazorpayPaymentAdapter(),
};

export const paymentService = {
  /**
   * Retrieves an adapter for the requested payment provider.
   * @param {'stripe'|'razorpay'} provider
   */
  getGateway(provider = 'stripe') {
    const gateway = adapters[provider];
    if (!gateway) {
      throw new Error(`Unsupported payment provider: ${provider}`);
    }
    return gateway;
  },

  /**
   * Returns list of supported real gateways.
   */
  getSupportedGateways() {
    return [
      { id: 'stripe', name: 'Credit / Debit Card (Stripe Hosted Checkout)' },
      { id: 'razorpay', name: 'UPI / Cards / NetBanking (Razorpay Standard Checkout)' },
    ];
  },
};

export { PaymentGatewayInterface } from './paymentGateway';
export { StripePaymentAdapter } from './stripeAdapter';
export { RazorpayPaymentAdapter } from './razorpayAdapter';
