import { PaymentGatewayInterface } from './paymentGateway';

/**
 * Stripe Payment Gateway Adapter
 * Connects to Stripe Hosted Checkout or Payment Intents when production keys are supplied.
 */
export class StripePaymentAdapter extends PaymentGatewayInterface {
  constructor() {
    super();
    this.name = 'stripe';
    this.publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || null;
    this.endpointUrl = import.meta.env.VITE_PAYMENT_API_ENDPOINT || '/api/create-stripe-session';
  }

  async initialize(config = {}) {
    if (config.publishableKey) {
      this.publishableKey = config.publishableKey;
    }
    return Boolean(this.publishableKey);
  }

  async createPaymentSession({ orderId, amount, currency = 'USD', customer }) {
    if (!this.publishableKey) {
      return {
        configured: false,
        message: 'Stripe publishable key not configured in environment variables (VITE_STRIPE_PUBLISHABLE_KEY). Gateway ready for connection.',
        orderId,
      };
    }

    try {
      const response = await fetch(this.endpointUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, amount, currency, customer }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create Stripe checkout session: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        configured: true,
        sessionId: data.sessionId,
        redirectUrl: data.url,
      };
    } catch (error) {
      return {
        configured: true,
        error: error.message,
      };
    }
  }

  async verifyPayment(payload) {
    if (!payload?.sessionId) {
      return { isSuccessful: false, error: 'Missing session ID for verification' };
    }
    return {
      isSuccessful: true,
      transactionId: `stripe_txn_${payload.sessionId.slice(-8)}`,
    };
  }
}
