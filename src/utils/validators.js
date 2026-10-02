/**
 * Validation Utilities
 */

/**
 * Validates an email address.
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
};

/**
 * Validates a standard phone number.
 * @param {string} phone
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, '');
  return cleaned.length >= 7 && cleaned.length <= 15 && /^\d+$/.test(cleaned);
};

/**
 * Validates customer personal details.
 * @param {object} customer
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export const validateCustomerInfo = (customer = {}) => {
  const errors = {};

  if (!customer.firstName || !customer.firstName.trim()) {
    errors.firstName = 'First name is required';
  }
  if (!customer.lastName || !customer.lastName.trim()) {
    errors.lastName = 'Last name is required';
  }
  if (!customer.email || !isValidEmail(customer.email)) {
    errors.email = 'A valid email address is required';
  }
  if (!customer.phone || !isValidPhone(customer.phone)) {
    errors.phone = 'A valid phone number is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates shipping address fields.
 * @param {object} shipping
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export const validateShippingAddress = (shipping = {}) => {
  const errors = {};

  if (!shipping.addressLine1 || !shipping.addressLine1.trim()) {
    errors.addressLine1 = 'Street address is required';
  }
  if (!shipping.city || !shipping.city.trim()) {
    errors.city = 'City is required';
  }
  if (!shipping.state || !shipping.state.trim()) {
    errors.state = 'State / Province is required';
  }
  if (!shipping.postalCode || !shipping.postalCode.trim()) {
    errors.postalCode = 'Postal / ZIP code is required';
  }
  if (!shipping.country || !shipping.country.trim()) {
    errors.country = 'Country is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
