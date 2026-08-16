import { STATISTIC_VARIANTS } from './statistics.constants';

/**
 * Get statistic card color variant classes
 * @param {string} color - Color variant key
 * @returns {object} Variant classes
 */
export const getStatisticColorVariant = (color = 'navy') => {
  const variant = STATISTIC_VARIANTS.CARD[color.toUpperCase()] || STATISTIC_VARIANTS.CARD.NAVY;
  return STATISTIC_VARIANTS.COLOR[variant.toUpperCase()] || STATISTIC_VARIANTS.COLOR.NAVY;
};

/**
 * Format statistic value
 * @param {number} value - Value to format
 * @param {string} format - Format type ('number', 'currency', 'percent')
 * @param {string} prefix - Prefix string
 * @param {string} suffix - Suffix string
 * @returns {string} Formatted value
 */
export const formatStatisticValue = (value, format = 'number', prefix = '', suffix = '') => {
  if (typeof value !== 'number') return `${prefix}${value}${suffix}`;

  const formatter = new Intl.NumberFormat('en-US', {
    style: format === 'currency' ? 'currency' : 'decimal',
    currency: format === 'currency' ? 'USD' : undefined,
    minimumFractionDigits: 0,
    maximumFractionDigits: format === 'percent' ? 1 : 0,
  });

  const formatted =
    format === 'currency' ? formatter.format(value).replace('$', '') : formatter.format(value);

  return `${prefix}${formatted}${suffix}`;
};

/**
 * Get trend icon name
 * @param {string} trend - Trend type ('up', 'down', 'stable')
 * @returns {string} Icon component name
 */
export const getTrendIcon = (trend = 'stable') => {
  const icons = {
    up: 'TrendingUp',
    down: 'TrendingDown',
    stable: 'MapPin',
  };
  return icons[trend] || icons.stable;
};

/**
 * Get trend color class
 * @param {string} trend - Trend type ('up', 'down', 'stable')
 * @returns {string} Color class
 */
export const getTrendColor = (trend = 'stable') => {
  return STATISTIC_VARIANTS.TREND_COLORS[trend] || STATISTIC_VARIANTS.TREND_COLORS.stable;
};

export default {
  getStatisticColorVariant,
  formatStatisticValue,
  getTrendIcon,
  getTrendColor,
};

