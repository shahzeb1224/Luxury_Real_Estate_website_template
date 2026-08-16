/**
 * Formatter Functions
 * Consistent formatting across the application
 */

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  if (typeof amount !== 'number' || isNaN(amount)) return '--';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format currency in compact notation (e.g., $1.2M)
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted compact currency string
 */
export const formatCompactCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  if (typeof amount !== 'number' || isNaN(amount)) return '--';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: 'compact',
    compactDisplay: 'short',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(amount);
};

/**
 * Format price range
 * @param {number} min - Minimum price
 * @param {number} max - Maximum price
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted price range
 */
export const formatPriceRange = (min, max, currency = 'USD') => {
  if (!min && !max) return '--';
  if (min && !max) return `${formatCurrency(min, currency)}+`;
  if (!min && max) return `Up to ${formatCurrency(max, currency)}`;
  return `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}`;
};

/**
 * Format area (square footage)
 * @param {number} area - Area in square feet
 * @param {string} unit - Unit (default: 'sqft')
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted area string
 */
export const formatArea = (area, unit = 'sqft', locale = 'en-US') => {
  if (typeof area !== 'number' || isNaN(area)) return '--';

  const formatted = new Intl.NumberFormat(locale, {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(area);

  return `${formatted} ${unit}`;
};

/**
 * Format area in square meters
 * @param {number} area - Area in square feet
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted area in square meters
 */
export const formatAreaMetric = (area, locale = 'en-US') => {
  if (typeof area !== 'number' || isNaN(area)) return '--';

  const sqm = area * 0.092903;
  const formatted = new Intl.NumberFormat(locale, {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(sqm);

  return `${formatted} m²`;
};

/**
 * Format phone number
 * @param {string} phone - Phone number string
 * @param {string} locale - Locale (default: 'US')
 * @returns {string} Formatted phone number
 */
export const formatPhone = (phone, locale = 'US') => {
  if (!phone) return '--';

  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }

  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }

  // International format
  if (cleaned.length > 11) {
    const countryCode = cleaned.slice(0, cleaned.length - 10);
    const area = cleaned.slice(-10, -7);
    const prefix = cleaned.slice(-7, -4);
    const suffix = cleaned.slice(-4);
    return `+${countryCode} (${area}) ${prefix}-${suffix}`;
  }

  return phone;
};

/**
 * Format address
 * @param {object} address - Address object
 * @param {string} address.street - Street address
 * @param {string} address.city - City
 * @param {string} address.state - State/Province
 * @param {string} address.zip - Zip/Postal code
 * @param {string} address.country - Country
 * @param {string} format - Format: 'full', 'short', 'line'
 * @returns {string} Formatted address
 */
export const formatAddress = (address, format = 'full') => {
  if (!address) return '--';

  const parts = [address.street, address.city, address.state, address.zip, address.country].filter(
    Boolean
  );

  if (format === 'full') {
    return parts.join(', ');
  }

  if (format === 'short') {
    return [address.city, address.state, address.country].filter(Boolean).join(', ');
  }

  if (format === 'line') {
    return parts.join(' ');
  }

  return parts.join(', ');
};

/**
 * Format date
 * @param {string|number|Date} date - Date to format
 * @param {string} format - Format type: 'short', 'medium', 'long', 'full'
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'medium', locale = 'en-US') => {
  if (!date) return '--';

  const d = new Date(date);
  if (isNaN(d.getTime())) return '--';

  const options = {
    short: {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit',
    },
    medium: {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    },
    long: {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    },
    full: {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    },
    iso: {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
  };

  const selected = options[format] || options.medium;
  return new Intl.DateTimeFormat(locale, selected).format(d);
};

/**
 * Format time
 * @param {string|number|Date} date - Date to format
 * @param {string} format - Format type: '12h', '24h'
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted time string
 */
export const formatTime = (date, format = '12h', locale = 'en-US') => {
  if (!date) return '--';

  const d = new Date(date);
  if (isNaN(d.getTime())) return '--';

  const options =
    format === '24h'
      ? { hour: '2-digit', minute: '2-digit', hour12: false }
      : { hour: 'numeric', minute: '2-digit', hour12: true };

  return new Intl.DateTimeFormat(locale, options).format(d);
};

/**
 * Format date and time
 * @param {string|number|Date} date - Date to format
 * @param {string} dateFormat - Date format
 * @param {string} timeFormat - Time format
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (
  date,
  dateFormat = 'medium',
  timeFormat = '12h',
  locale = 'en-US'
) => {
  const dateStr = formatDate(date, dateFormat, locale);
  const timeStr = formatTime(date, timeFormat, locale);
  return `${dateStr} at ${timeStr}`;
};

/**
 * Format relative time (e.g., "2 days ago")
 * @param {string|number|Date} date - Date to compare
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date, locale = 'en-US') => {
  if (!date) return '--';

  const d = new Date(date);
  if (isNaN(d.getTime())) return '--';

  const now = new Date();
  const diff = now - d;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const rtf = new Intl.RelativeTimeFormatter(locale, { numeric: 'auto' });

  if (years > 0) return rtf.format(-years, 'year');
  if (months > 0) return rtf.format(-months, 'month');
  if (weeks > 0) return rtf.format(-weeks, 'week');
  if (days > 0) return rtf.format(-days, 'day');
  if (hours > 0) return rtf.format(-hours, 'hour');
  if (minutes > 0) return rtf.format(-minutes, 'minute');
  return rtf.format(-seconds, 'second');
};

/**
 * Format number with thousand separators
 * @param {number} number - Number to format
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted number
 */
export const formatNumber = (number, locale = 'en-US') => {
  if (typeof number !== 'number' || isNaN(number)) return '--';

  return new Intl.NumberFormat(locale, {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};

/**
 * Format percentage
 * @param {number} value - Value to format
 * @param {number} decimals - Number of decimal places (default: 1)
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, decimals = 1, locale = 'en-US') => {
  if (typeof value !== 'number' || isNaN(value)) return '--';

  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
};

export default {
  formatCurrency,
  formatCompactCurrency,
  formatPriceRange,
  formatArea,
  formatAreaMetric,
  formatPhone,
  formatAddress,
  formatDate,
  formatTime,
  formatDateTime,
  formatRelativeTime,
  formatNumber,
  formatPercentage,
};
