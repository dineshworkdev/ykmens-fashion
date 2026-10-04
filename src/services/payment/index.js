import { CashfreePaymentAdapter } from './cashfreeAdapter';
import { StripePaymentAdapter } from './stripeAdapter';
import { RazorpayPaymentAdapter } from './razorpayAdapter';

/**
 * Payment Service Abstraction Registry
 */
const adapters = {
  cashfree: new CashfreePaymentAdapter(),
  stripe: new StripePaymentAdapter(),
  razorpay: new RazorpayPaymentAdapter(),
};

export const paymentService = {
  /**
   * Retrieves an adapter for the requested payment provider.
   * @param {'cashfree'|'stripe'|'razorpay'} provider
   */
  getGateway(provider = 'cashfree') {
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
      {
        id: 'cashfree',
        name: 'Cashfree Payments (Sandbox)',
        description: 'UPI, Credit/Debit Cards, NetBanking via Cashfree Hosted Checkout',
        isDefault: true,
      },
      {
        id: 'stripe',
        name: 'Credit / Debit Card (Stripe Hosted Checkout)',
        description: 'International & Domestic Card Hosted Checkout',
      },
      {
        id: 'razorpay',
        name: 'UPI / Cards / NetBanking (Razorpay Standard Checkout)',
        description: 'UPI, NetBanking & Indian Debit/Credit Cards',
      },
    ];
  },
};

export { PaymentGatewayInterface } from './paymentGateway';
export { CashfreePaymentAdapter } from './cashfreeAdapter';
export { StripePaymentAdapter } from './stripeAdapter';
export { RazorpayPaymentAdapter } from './razorpayAdapter';

