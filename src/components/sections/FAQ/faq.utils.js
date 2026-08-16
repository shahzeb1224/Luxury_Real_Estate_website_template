import { FAQ_CATEGORY_ICONS } from './faq.constants';

/**
 * Get category icon
 * @param {string} category - Category key
 * @returns {string} Icon name
 */
export const getCategoryIcon = (category) => {
  const icons = {
    buying: 'Home',
    renting: 'Building2',
    commercial: 'Briefcase',
    luxury: 'Crown',
    investment: 'TrendingUp',
    mortgage: 'Calculator',
    legal: 'FileText',
    management: 'Users',
  };
  return icons[category] || 'HelpCircle';
};

/**
 * Get category label
 * @param {string} category - Category key
 * @param {object} categories - Categories mapping
 * @returns {string} Category label
 */
export const getCategoryLabel = (category, categories = {}) => {
  return categories[category] || category.charAt(0).toUpperCase() + category.slice(1);
};

/**
 * Filter FAQs by category
 * @param {Array} faqs - FAQs array
 * @param {string} category - Category to filter by
 * @returns {Array} Filtered FAQs
 */
export const filterFaqsByCategory = (faqs, category) => {
  if (!category || category === 'all') return faqs;
  return faqs.filter((faq) => faq.category === category);
};

/**
 * Search FAQs by query
 * @param {Array} faqs - FAQs array
 * @param {string} query - Search query
 * @returns {Array} Filtered FAQs
 */
export const searchFaqs = (faqs, query) => {
  if (!query || !query.trim()) return faqs;
  const searchTerm = query.toLowerCase().trim();
  return faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm) ||
      faq.answer.toLowerCase().includes(searchTerm) ||
      faq.category.toLowerCase().includes(searchTerm)
  );
};

/**
 * Get featured FAQ
 * @param {Array} faqs - FAQs array
 * @returns {object|null} Featured FAQ or null
 */
export const getFeaturedFaq = (faqs) => {
  return faqs.find((faq) => faq.featured) || null;
};

/**
 * Get FAQs by category with count
 * @param {Array} faqs - FAQs array
 * @param {Array} categories - Categories array
 * @returns {Array} Categories with counts
 */
export const getCategoriesWithCount = (faqs, categories) => {
  return categories.map((category) => ({
    ...category,
    count: faqs.filter((faq) => faq.category === category.id).length,
  }));
};

export default {
  getCategoryIcon,
  getCategoryLabel,
  filterFaqsByCategory,
  searchFaqs,
  getFeaturedFaq,
  getCategoriesWithCount,
};
