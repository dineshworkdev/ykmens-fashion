import { safeStorage } from '../../utils/storage';
import { STORAGE_KEYS, ORDER_STATUS, PAYMENT_STATUS } from '../../utils/constants';
import { generateOrderId } from '../../utils/formatters';

/**
 * Order Service Architecture
 * Manages order persistence, retrieval, status lifecycle, and confirmation records.
 */
export const orderService = {
  /**
   * Creates a structured order instance and commits it to storage.
   * @param {object} payload
   * @returns {object} The created order
   */
  createOrder({
    customer,
    shipping,
    items,
    subtotal,
    shippingCost = 0,
    tax = 0,
    total,
    paymentGateway = 'stripe',
    paymentStatus = PAYMENT_STATUS.PENDING,
    transactionId = null,
  }) {
    const orderId = generateOrderId();
    const createdAt = new Date().toISOString();

    const newOrder = {
      orderId,
      createdAt,
      customer: {
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        email: customer.email || '',
        phone: customer.phone || '',
      },
      shipping: {
        addressLine1: shipping.addressLine1 || '',
        addressLine2: shipping.addressLine2 || '',
        city: shipping.city || '',
        state: shipping.state || '',
        postalCode: shipping.postalCode || '',
        country: shipping.country || '',
        deliveryInstructions: shipping.deliveryInstructions || '',
      },
      items: items.map((item) => ({
        id: item.id,
        itemKey: item.itemKey,
        name: item.name,
        price: item.price,
        salePrice: item.salePrice,
        effectivePrice: item.effectivePrice || item.price,
        quantity: item.quantity,
        variant: item.variant,
        image: item.image,
      })),
      subtotal,
      shippingCost,
      tax,
      total,
      paymentGateway,
      paymentStatus,
      orderStatus: ORDER_STATUS.PLACED,
      transactionId,
    };

    // Commit to orders archive
    const existingOrders = safeStorage.get(STORAGE_KEYS.ORDERS, []);
    const updatedOrders = [newOrder, ...existingOrders];
    safeStorage.set(STORAGE_KEYS.ORDERS, updatedOrders);

    // Save as last completed order for confirmation routing
    safeStorage.set(STORAGE_KEYS.LAST_ORDER, newOrder);

    return newOrder;
  },

  /**
   * Retrieves an order by its unique ID.
   * @param {string} orderId
   * @returns {object|null}
   */
  getOrderById(orderId) {
    if (!orderId) return null;
    const orders = safeStorage.get(STORAGE_KEYS.ORDERS, []);
    return orders.find((o) => o.orderId === orderId) || null;
  },

  /**
   * Retrieves the most recent order.
   * @returns {object|null}
   */
  getLastOrder() {
    return safeStorage.get(STORAGE_KEYS.LAST_ORDER, null);
  },

  /**
   * Updates order lifecycle status.
   * @param {string} orderId
   * @param {string} status
   */
  updateOrderStatus(orderId, status) {
    const orders = safeStorage.get(STORAGE_KEYS.ORDERS, []);
    const updated = orders.map((o) => (o.orderId === orderId ? { ...o, orderStatus: status } : o));
    safeStorage.set(STORAGE_KEYS.ORDERS, updated);
  },

  /**
   * Updates order payment status.
   * @param {string} orderId
   * @param {string} paymentStatus
   * @param {string} [transactionId]
   */
  updatePaymentStatus(orderId, paymentStatus, transactionId = null) {
    const orders = safeStorage.get(STORAGE_KEYS.ORDERS, []);
    const updated = orders.map((o) =>
      o.orderId === orderId
        ? {
            ...o,
            paymentStatus,
            transactionId: transactionId || o.transactionId,
          }
        : o
    );
    safeStorage.set(STORAGE_KEYS.ORDERS, updated);
  },
};
