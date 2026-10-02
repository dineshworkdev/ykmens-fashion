/**
 * YK MENS FASHION - Data Type Definitions
 * Documented via JSDoc for strict schema compliance across components and state.
 */

/**
 * @typedef {Object} ProductSpecification
 * @property {string} material
 * @property {string} fit
 * @property {string} care
 * @property {string} origin
 * @property {string} [details]
 */

/**
 * @typedef {Object} ProductColor
 * @property {string} name
 * @property {string} hex
 */

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} slug
 * @property {string} name
 * @property {string} category
 * @property {string} collection
 * @property {string} description
 * @property {number} price
 * @property {number|null} salePrice
 * @property {string[]} images
 * @property {string[]} sizes
 * @property {ProductColor[]} colors
 * @property {'in_stock'|'low_stock'|'out_of_stock'} stockStatus
 * @property {boolean} featuredStatus
 * @property {boolean} newArrivalStatus
 * @property {string[]} tags
 * @property {ProductSpecification} specifications
 */

/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} slug
 * @property {string} name
 * @property {string} description
 */

/**
 * @typedef {Object} Collection
 * @property {string} id
 * @property {string} slug
 * @property {string} name
 * @property {string} description
 * @property {string} season
 */

/**
 * @typedef {Object} CartItemVariant
 * @property {string} size
 * @property {string} [color]
 */

/**
 * @typedef {Object} CartItem
 * @property {string} id - Product ID
 * @property {string} itemKey - Unique composite key: `${id}-${size}-${color}`
 * @property {string} slug
 * @property {string} name
 * @property {number} price
 * @property {number|null} salePrice
 * @property {string} image
 * @property {CartItemVariant} variant
 * @property {number} quantity
 */

/**
 * @typedef {Object} CustomerDetails
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} phone
 */

/**
 * @typedef {Object} ShippingDetails
 * @property {string} addressLine1
 * @property {string} [addressLine2]
 * @property {string} city
 * @property {string} state
 * @property {string} postalCode
 * @property {string} country
 * @property {string} [deliveryInstructions]
 */

/**
 * @typedef {Object} Order
 * @property {string} orderId
 * @property {string} createdAt
 * @property {CustomerDetails} customer
 * @property {ShippingDetails} shipping
 * @property {CartItem[]} items
 * @property {number} subtotal
 * @property {number} shippingCost
 * @property {number} tax
 * @property {number} total
 * @property {'pending'|'authorized'|'paid'|'failed'} paymentStatus
 * @property {'placed'|'processing'|'shipped'|'delivered'|'cancelled'} orderStatus
 * @property {string} paymentGateway
 * @property {string|null} transactionId
 */

export {};
