import { AWARD_ICONS } from './awards.constants';

/**
 * Get award icon component name
 * @param {string} icon - Icon key
 * @returns {string} Icon component name
 */
export const getAwardIcon = (icon) => {
  const icons = {
    award: 'Award',
    star: 'Star',
    trophy: 'Trophy',
    medal: 'Medal',
    sparkles: 'Sparkles',
  };
  return icons[icon?.toLowerCase()] || icons.award;
};

/**
 * Sort awards by year (descending)
 * @param {Array} awards - Awards array
 * @returns {Array} Sorted awards
 */
export const sortAwardsByYear = (awards) => {
  return [...awards].sort((a, b) => b.year - a.year);
};

/**
 * Get featured awards
 * @param {Array} awards - Awards array
 * @param {number} limit - Maximum number
 * @returns {Array} Featured awards
 */
export const getFeaturedAwards = (awards, limit = 3) => {
  return awards.filter((a) => a.featured).slice(0, limit);
};

/**
 * Get awards by year range
 * @param {Array} awards - Awards array
 * @param {number} startYear - Start year
 * @param {number} endYear - End year
 * @returns {Array} Filtered awards
 */
export const getAwardsByYearRange = (awards, startYear, endYear) => {
  return awards.filter((a) => a.year >= startYear && a.year <= endYear);
};

/**
 * Get total awards count
 * @param {Array} awards - Awards array
 * @returns {number} Total count
 */
export const getTotalAwards = (awards) => {
  return awards.length;
};

/**
 * Get unique organizations from awards
 * @param {Array} awards - Awards array
 * @returns {Array} Unique organizations
 */
export const getUniqueOrganizations = (awards) => {
  return [...new Set(awards.map((a) => a.organization))];
};

export default {
  getAwardIcon,
  sortAwardsByYear,
  getFeaturedAwards,
  getAwardsByYearRange,
  getTotalAwards,
  getUniqueOrganizations,
};
