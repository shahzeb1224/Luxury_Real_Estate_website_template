import { CATEGORY_LABELS, CATEGORY_COLORS } from './partners.constants';

/**
 * Get category label
 * @param {string} category - Category key
 * @returns {string} Category label
 */
export const getCategoryLabel = (category) => {
  return CATEGORY_LABELS[category] || category;
};

/**
 * Get category color class
 * @param {string} category - Category key
 * @returns {string} Color class
 */
export const getCategoryColor = (category) => {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS.developer;
};

/**
 * Filter partners by category
 * @param {Array} partners - Partners array
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered partners
 */
export const filterPartnersByCategory = (partners, category) => {
  if (!category || category === 'all') return partners;
  return partners.filter((p) => p.category === category);
};

/**
 * Get featured partners
 * @param {Array} partners - Partners array
 * @param {number} limit - Maximum number
 * @returns {Array} Featured partners
 */
export const getFeaturedPartners = (partners, limit = 6) => {
  return partners.filter((p) => p.featured).slice(0, limit);
};

/**
 * Get unique categories from partners
 * @param {Array} partners - Partners array
 * @returns {Array} Unique categories
 */
export const getUniqueCategories = (partners) => {
  const categories = partners.map((p) => p.category).filter(Boolean);
  return ['all', ...new Set(categories)];
};

/**
 * Group partners by category
 * @param {Array} partners - Partners array
 * @returns {object} Grouped partners
 */
export const groupPartnersByCategory = (partners) => {
  return partners.reduce((groups, partner) => {
    const category = partner.category || 'uncategorized';
    if (!groups[category]) groups[category] = [];
    groups[category].push(partner);
    return groups;
  }, {});
};

export default {
  getCategoryLabel,
  getCategoryColor,
  filterPartnersByCategory,
  getFeaturedPartners,
  getUniqueCategories,
  groupPartnersByCategory,
};
