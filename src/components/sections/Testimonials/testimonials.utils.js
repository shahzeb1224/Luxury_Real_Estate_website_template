import { RATING } from './testimonials.constants';

/**
 * Get rating stars configuration
 * @param {number} rating - Rating value (0-5)
 * @returns {object} Stars configuration
 */
export const getRatingStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = RATING.MAX - fullStars - (hasHalfStar ? 1 : 0);

  return {
    fullStars,
    hasHalfStar,
    emptyStars,
  };
};

/**
 * Get rating display text
 * @param {number} rating - Rating value
 * @returns {string} Rating display text
 */
export const getRatingText = (rating) => {
  if (rating >= 4.8) return 'Exceptional';
  if (rating >= 4.5) return 'Excellent';
  if (rating >= 4.0) return 'Very Good';
  if (rating >= 3.5) return 'Good';
  if (rating >= 3.0) return 'Average';
  return 'Below Average';
};

/**
 * Get transaction type display
 * @param {string} type - Transaction type
 * @returns {string} Display text
 */
export const getTransactionDisplay = (type) => {
  const types = {
    purchase: 'Purchase',
    sale: 'Sale',
    rent: 'Rent',
    investment: 'Investment',
  };
  return types[type] || type;
};

/**
 * Filter testimonials by rating threshold
 * @param {Array} testimonials - Testimonials array
 * @param {number} minRating - Minimum rating
 * @returns {Array} Filtered testimonials
 */
export const filterTestimonialsByRating = (testimonials, minRating = 4) => {
  return testimonials.filter((t) => t.rating >= minRating);
};

/**
 * Get featured testimonials
 * @param {Array} testimonials - Testimonials array
 * @param {number} limit - Maximum number
 * @returns {Array} Featured testimonials
 */
export const getFeaturedTestimonials = (testimonials, limit = 3) => {
  return testimonials.filter((t) => t.featured).slice(0, limit);
};

/**
 * Get testimonial statistics
 * @param {Array} testimonials - Testimonials array
 * @returns {object} Statistics
 */
export const getTestimonialStats = (testimonials) => {
  const total = testimonials.length;
  const verified = testimonials.filter((t) => t.verified).length;
  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / total;

  return {
    total,
    verified,
    averageRating: Math.round(averageRating * 10) / 10,
  };
};

export default {
  getRatingStars,
  getRatingText,
  getTransactionDisplay,
  filterTestimonialsByRating,
  getFeaturedTestimonials,
  getTestimonialStats,
};
