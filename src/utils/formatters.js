/**
 * Formatting Utilities
 */

/**
 * Formats a numeric price into a localized currency string.
 * Uses Indian Rupee (INR / ₹) as the primary currency.
 * Example: ₹4,999, ₹3,499
 * @param {number} amount
 * @param {string} currency - Default 'INR'
 * @param {string} locale - Default 'en-IN'
 * @returns {string}
 */
export const formatCurrency = (amount, currency = 'INR', locale = 'en-IN') => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₹0';
  }
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Formats a Date object or timestamp into standard readable display.
 * @param {Date|string|number} date
 * @returns {string}
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d);
};

/**
 * Generates a clean unique order identifier with prefix.
 * e.g. YK-20261002-8F9B
 * @returns {string}
 */
export const generateOrderId = () => {
  const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `YK-${randomSuffix}`;
};

/**
 * Creates a URL-friendly slug from a string.
 * @param {string} text
 * @returns {string}
 */
export const slugify = (text) => {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
