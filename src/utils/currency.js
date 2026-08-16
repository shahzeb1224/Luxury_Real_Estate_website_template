import { formatCurrency, formatCompactCurrency, formatPriceRange } from '@/lib/formatters';

/**
 * Currency utility functions
 * Re-export formatters and add additional utilities
 */

export const currencyUtils = {
  format: formatCurrency,
  formatCompact: formatCompactCurrency,
  formatRange: formatPriceRange,

  /**
   * Parse currency string to number
   * @param {string} value - Currency string
   * @returns {number} Parsed number
   */
  parse: (value) => {
    if (!value || typeof value !== 'string') return 0;
    const cleaned = value.replace(/[^0-9.-]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  },

  /**
   * Convert currency (simple conversion)
   * @param {number} amount - Amount in source currency
   * @param {number} rate - Conversion rate
   * @returns {number} Converted amount
   */
  convert: (amount, rate) => {
    if (typeof amount !== 'number' || isNaN(amount)) return 0;
    if (typeof rate !== 'number' || isNaN(rate)) return amount;
    return amount * rate;
  },

  /**
   * Format down payment percentage
   * @param {number} price - Total price
   * @param {number} downPayment - Down payment amount
   * @param {string} locale - Locale
   * @returns {string} Formatted percentage
   */
  formatDownPayment: (price, downPayment, locale = 'en-US') => {
    if (typeof price !== 'number' || price <= 0) return '--';
    if (typeof downPayment !== 'number' || downPayment < 0) return '--';

    const percentage = (downPayment / price) * 100;
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    }).format(percentage / 100);
  },

  /**
   * Estimate monthly mortgage payment (simplified)
   * @param {number} price - Property price
   * @param {number} downPayment - Down payment amount
   * @param {number} rate - Annual interest rate (e.g., 6.5)
   * @param {number} term - Loan term in years (default: 30)
   * @param {number} propertyTaxRate - Annual property tax rate (default: 1.2)
   * @param {number} insuranceRate - Annual insurance rate (default: 0.5)
   * @returns {object} Monthly payment breakdown
   */
  estimateMonthlyPayment: (
    price,
    downPayment,
    rate,
    term = 30,
    propertyTaxRate = 1.2,
    insuranceRate = 0.5
  ) => {
    if (typeof price !== 'number' || price <= 0) {
      return { total: 0, principal: 0, tax: 0, insurance: 0 };
    }

    const loanAmount = price - (downPayment || 0);
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = term * 12;

    // Monthly principal and interest
    let principal = 0;
    if (loanAmount > 0 && rate > 0) {
      principal =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    } else if (loanAmount > 0) {
      principal = loanAmount / numberOfPayments;
    }

    // Monthly property tax
    const tax = (price * (propertyTaxRate / 100)) / 12;

    // Monthly insurance
    const insurance = (price * (insuranceRate / 100)) / 12;

    return {
      principal: Math.round(principal),
      tax: Math.round(tax),
      insurance: Math.round(insurance),
      total: Math.round(principal + tax + insurance),
    };
  },

  /**
   * Check if a value is a valid price
   * @param {any} value - Value to check
   * @returns {boolean} True if valid price
   */
  isValidPrice: (value) => {
    if (typeof value !== 'number' || isNaN(value)) return false;
    return value >= 0;
  },

  /**
   * Get price range from array of prices
   * @param {number[]} prices - Array of prices
   * @returns {object} { min, max }
   */
  getPriceRange: (prices) => {
    if (!Array.isArray(prices) || prices.length === 0) {
      return { min: 0, max: 0 };
    }
    const validPrices = prices.filter((p) => typeof p === 'number' && !isNaN(p) && p >= 0);
    if (validPrices.length === 0) {
      return { min: 0, max: 0 };
    }
    return {
      min: Math.min(...validPrices),
      max: Math.max(...validPrices),
    };
  },

  /**
   * Check if price is within range
   * @param {number} price - Price to check
   * @param {number} min - Minimum price
   * @param {number} max - Maximum price
   * @returns {boolean} True if within range
   */
  isPriceInRange: (price, min, max) => {
    if (typeof price !== 'number' || isNaN(price)) return false;
    if (typeof min === 'number' && !isNaN(min) && price < min) return false;
    if (typeof max === 'number' && !isNaN(max) && price > max) return false;
    return true;
  },
};

export default currencyUtils;
