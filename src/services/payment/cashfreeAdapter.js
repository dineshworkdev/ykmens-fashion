import { PaymentGatewayInterface } from './paymentGateway';

/**
 * Loads the official Cashfree JS SDK v3 dynamically if not already available.
 * @returns {Promise<any>}
 */
export async function loadCashfreeSDK() {
  if (typeof window === 'undefined') return null;

  if (typeof window.Cashfree === 'function') {
    return window.Cashfree;
  }

  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[src*="cashfree.com/js/v3/cashfree.js"]');
    if (existingScript) {
      if (typeof window.Cashfree === 'function') {
        return resolve(window.Cashfree);
      }
      existingScript.addEventListener('load', () => {
        if (typeof window.Cashfree === 'function') {
          resolve(window.Cashfree);
        } else {
          reject(new Error('Cashfree SDK loaded but window.Cashfree is not available'));
        }
      });
      existingScript.addEventListener('error', () => {
        reject(new Error('Failed to load Cashfree JS SDK'));
      });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    script.onload = () => {
      if (typeof window.Cashfree === 'function') {
        resolve(window.Cashfree);
      } else {
        reject(new Error('Cashfree SDK script loaded but window.Cashfree constructor was not found.'));
      }
    };
    script.onerror = () => {
      reject(new Error('Unable to load Cashfree SDK from https://sdk.cashfree.com/js/v3/cashfree.js. Please check your network connection.'));
    };
    document.head.appendChild(script);
  });
}

/**
 * Cashfree Payment Gateway Adapter (Sandbox Mode)
 * 
 * - Communicates strictly with our Cloudflare Worker backend POST /api/cashfree/create-order.
 * - Never contains or exposes Cashfree App ID or Secret Key in frontend code.
 * - Launches Cashfree Hosted Web Checkout via cashfree.checkout({ paymentSessionId, redirectTarget: '_self' }).
 */
export class CashfreePaymentAdapter extends PaymentGatewayInterface {
  constructor() {
    super();
    this.name = 'cashfree';
    this.mode = 'sandbox';
    this.endpointUrl = '/api/cashfree/create-order';
    this.cashfreeInstance = null;
  }

  /**
   * Initializes the Cashfree SDK instance in sandbox mode.
   * @param {object} [config]
   * @returns {Promise<boolean>}
   */
  async initialize(config = {}) {
    try {
      const CashfreeConstructor = await loadCashfreeSDK();
      if (!CashfreeConstructor) {
        throw new Error('Cashfree SDK could not be initialized.');
      }

      this.cashfreeInstance = CashfreeConstructor({
        mode: config.mode || this.mode,
      });

      return Boolean(this.cashfreeInstance);
    } catch (err) {
      console.error('Failed to initialize Cashfree SDK:', err);
      throw err;
    }
  }

  /**
   * Creates an order via the Cloudflare Worker backend and launches Cashfree Hosted Checkout.
   * @param {object} params
   * @param {string} params.orderId
   * @param {number} params.amount
   * @param {string} params.currency
   * @param {object} params.customer
   * @param {object} params.shipping
   * @param {string} [params.returnUrl]
   * @returns {Promise<{ orderId: string, paymentSessionId: string, cfOrderId: string, status: string }>}
   */
  async createPaymentSession({ orderId, amount, currency = 'INR', customer, shipping, returnUrl }) {
    // 1. Ensure Cashfree SDK is initialized before launching
    if (!this.cashfreeInstance) {
      await this.initialize();
    }

    // 2. Derive return URL fallback
    const defaultReturnUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/order-confirmation?order_id={order_id}`
      : undefined;

    // 3. Format customer payload
    const customerPayload = {
      name: customer
        ? `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 'Valued Customer'
        : 'Valued Customer',
      email: customer?.email || 'customer@ykmensfashion.com',
      phone: customer?.phone || '9999999999',
    };

    // 4. Request order creation & payment session from Worker
    let response;
    try {
      response = await fetch(this.endpointUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          amount,
          currency,
          customer: customerPayload,
          returnUrl: returnUrl || defaultReturnUrl,
        }),
      });
    } catch (networkError) {
      throw new Error(`Network error connecting to payment gateway: ${networkError.message}`);
    }

    const data = await response.json().catch(() => null);

    if (!response.ok || !data?.success || !data?.payment_session_id) {
      const errorMessage =
        data?.message ||
        data?.error ||
        `Cashfree order creation failed with status ${response.status}.`;
      throw new Error(errorMessage);
    }

    const paymentSessionId = data.payment_session_id;
    const cfOrderId = data.cf_order_id;
    const resolvedOrderId = data.order_id || orderId;

    // 5. Trigger Cashfree Hosted Web Checkout redirection
    try {
      const checkoutResult = await this.cashfreeInstance.checkout({
        paymentSessionId,
        redirectTarget: '_self',
      });

      if (checkoutResult?.error) {
        throw new Error(checkoutResult.error.message || 'Cashfree checkout failed to start.');
      }
    } catch (launchError) {
      console.error('Cashfree checkout redirection error:', launchError);
      throw new Error(launchError.message || 'Unable to open Cashfree Hosted Checkout.');
    }

    return {
      orderId: resolvedOrderId,
      paymentSessionId,
      cfOrderId,
      status: data.order_status || 'ACTIVE',
    };
  }

  /**
   * Stub for payment verification (handled in subsequent backend step).
   * @param {object} payload
   * @returns {Promise<{ isSuccessful: boolean, transactionId?: string, error?: string }>}
   */
  async verifyPayment(payload) {
    return {
      isSuccessful: false,
      error: 'Payment verification will be processed by backend verification service.',
    };
  }
}

export default CashfreePaymentAdapter;
