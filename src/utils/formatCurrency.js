/**
 * Format a number as currency
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = "USD", locale = "en-US") => {
  if (typeof amount !== "number" || isNaN(amount)) {
    return "--";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format a number as currency with compact notation (e.g., $1.2M)
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted compact currency string
 */
export const formatCompactCurrency = (
  amount,
  currency = "USD",
  locale = "en-US",
) => {
  if (typeof amount !== "number" || isNaN(amount)) {
    return "--";
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    notation: "compact",
    compactDisplay: "short",
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(amount);
};

export default formatCurrency;
