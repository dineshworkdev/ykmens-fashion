/**
 * Application Constants
 */

export const ROUTES = Object.freeze({
  HOME: '/',
  SHOP: '/shop',
  NEW_ARRIVALS: '/new-arrivals',
  COLLECTIONS: '/collections',
  COLLECTION_DETAIL: '/collection/:slug',
  PRODUCT_DETAIL: '/product/:slug',
  SEARCH: '/search',
  LOOKBOOK: '/lookbook',
  ABOUT: '/about',
  CONTACT: '/contact',
  WISHLIST: '/wishlist',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ORDER_CONFIRMATION: '/order-confirmation',
});

export const STOCK_STATUS = Object.freeze({
  IN_STOCK: 'in_stock',
  LOW_STOCK: 'low_stock',
  OUT_OF_STOCK: 'out_of_stock',
});

export const PAYMENT_STATUS = Object.freeze({
  PENDING: 'pending',
  AUTHORIZED: 'authorized',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'refunded',
});

export const ORDER_STATUS = Object.freeze({
  PLACED: 'placed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
});

export const CHECKOUT_STEPS = Object.freeze({
  REVIEW: 1,
  CUSTOMER: 2,
  SHIPPING: 3,
  SUMMARY: 4,
  PAYMENT: 5,
  CONFIRMATION: 6,
});

export const STORAGE_KEYS = Object.freeze({
  CART: 'yk_mens_fashion_cart_v1',
  WISHLIST: 'yk_mens_fashion_wishlist_v1',
  ORDERS: 'yk_mens_fashion_orders_v1',
  LAST_ORDER: 'yk_mens_fashion_last_order_v1',
});
