/**
 * Payment Gateway Service Abstraction Contract
 * 
 * Strict architectural rule:
 * Real payment processing requires a PCI-compliant hosted gateway or SDK (e.g. Stripe Checkout / Elements, Razorpay Checkout).
 * Homemade credit card collection is strictly avoided.
 */

export class PaymentGatewayInterface {
  /**
   * Initializes the payment provider SDK or environment.
   * @param {object} config
   * @returns {Promise<boolean>}
   */
  async initialize(config = {}) {
    throw new Error('initialize() must be implemented by payment gateway adapter');
  }

  /**
   * Creates a checkout session or order on the payment provider server.
   * @param {object} params
   * @param {string} params.orderId
   * @param {number} params.amount
   * @param {string} params.currency
   * @param {object} params.customer
   * @returns {Promise<{ sessionId: string, redirectUrl?: string, clientSecret?: string }>}
   */
  async createPaymentSession(params) {
    throw new Error('createPaymentSession() must be implemented by payment gateway adapter');
  }

  /**
   * Verifies the payment response received from the gateway or webhook.
   * @param {object} payload
   * @returns {Promise<{ isSuccessful: boolean, transactionId: string, error?: string }>}
   */
  async verifyPayment(payload) {
    throw new Error('verifyPayment() must be implemented by payment gateway adapter');
  }
}
