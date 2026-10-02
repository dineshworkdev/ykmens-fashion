import { PaymentGatewayInterface } from './paymentGateway';

/**
 * Razorpay Payment Gateway Adapter
 * Connects to Razorpay Standard Checkout modal when production key id is supplied.
 */
export class RazorpayPaymentAdapter extends PaymentGatewayInterface {
  constructor() {
    super();
    this.name = 'razorpay';
    this.keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || null;
    this.endpointUrl = import.meta.env.VITE_RAZORPAY_ORDER_ENDPOINT || '/api/create-razorpay-order';
  }

  async initialize(config = {}) {
    if (config.keyId) {
      this.keyId = config.keyId;
    }
    return Boolean(this.keyId);
  }

  async createPaymentSession({ orderId, amount, currency = 'INR', customer }) {
    if (!this.keyId) {
      return {
        configured: false,
        message: 'Razorpay Key ID not configured in environment variables (VITE_RAZORPAY_KEY_ID). Gateway ready for connection.',
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
        throw new Error(`Failed to create Razorpay order: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        configured: true,
        razorpayOrderId: data.id,
        key: this.keyId,
        amount: data.amount,
        currency: data.currency,
      };
    } catch (error) {
      return {
        configured: true,
        error: error.message,
      };
    }
  }

  async verifyPayment(payload) {
    if (!payload?.razorpay_payment_id) {
      return { isSuccessful: false, error: 'Missing payment signature verification' };
    }
    return {
      isSuccessful: true,
      transactionId: payload.razorpay_payment_id,
    };
  }
}
