import { SERVICE_VARIANTS } from './services.constants';

/**
 * Get service card variant classes based on color
 * @param {string} color - Color variant key
 * @returns {object} Variant classes
 */
export const getServiceVariantClasses = (color = 'navy') => {
  const variant = SERVICE_VARIANTS.CARD[color.toUpperCase()] || SERVICE_VARIANTS.CARD.NAVY;

  return {
    bg: SERVICE_VARIANTS.BG[variant],
    icon: SERVICE_VARIANTS.ICON[variant],
    border: SERVICE_VARIANTS.BORDER[variant],
    heading: SERVICE_VARIANTS.HEADING[variant],
    text: SERVICE_VARIANTS.TEXT[variant],
    accent: SERVICE_VARIANTS.ACCENT[variant],
  };
};

/**
 * Format service data for display
 * @param {object} service - Service data
 * @returns {object} Formatted service data
 */
export const formatServiceData = (service) => {
  return {
    ...service,
    formattedTitle: service.title,
    formattedDescription: service.description,
    iconComponent: service.icon,
  };
};

/**
 * Get service by ID
 * @param {Array} services - Services array
 * @param {string} id - Service ID
 * @returns {object|null} Service object or null
 */
export const getServiceById = (services, id) => {
  return services.find((service) => service.id === id) || null;
};

/**
 * Get featured service from services array
 * @param {Array} services - Services array
 * @param {string} featuredId - Featured service ID
 * @returns {object|null} Featured service or null
 */
export const getFeaturedService = (services, featuredId) => {
  if (featuredId) {
    return getServiceById(services, featuredId);
  }
  return services.find((service) => service.featured) || services[0] || null;
};

export default {
  getServiceVariantClasses,
  formatServiceData,
  getServiceById,
  getFeaturedService,
};
