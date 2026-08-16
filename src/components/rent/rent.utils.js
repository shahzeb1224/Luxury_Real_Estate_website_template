import { RENT_FILTER_DEFAULTS } from './rent.constants';

/**
 * Filter rental properties by all criteria
 * @param {Array} properties - Array of rental properties
 * @param {Object} filters - Filter object
 * @returns {Array} Filtered properties
 */
export const filterRentalProperties = (properties, filters = RENT_FILTER_DEFAULTS) => {
  let result = [...properties];

  // Property type filter
  if (filters.propertyType !== 'all') {
    result = result.filter((p) => p.type.toLowerCase() === filters.propertyType);
  }

  // Price range filter
  if (filters.priceMin) {
    result = result.filter((p) => p.price >= Number(filters.priceMin));
  }
  if (filters.priceMax) {
    result = result.filter((p) => p.price <= Number(filters.priceMax));
  }

  // Area range filter
  if (filters.areaMin) {
    result = result.filter((p) => p.area >= Number(filters.areaMin));
  }
  if (filters.areaMax) {
    result = result.filter((p) => p.area <= Number(filters.areaMax));
  }

  // Bedrooms filter
  if (filters.bedrooms !== 'any') {
    const beds = Number(filters.bedrooms);
    result = result.filter((p) => p.bedrooms >= beds);
  }

  // Bathrooms filter
  if (filters.bathrooms !== 'any') {
    const baths = Number(filters.bathrooms);
    result = result.filter((p) => p.bathrooms >= baths);
  }

  // Features filter
  if (filters.features && filters.features.length > 0) {
    filters.features.forEach((feature) => {
      result = result.filter((p) => p[feature] === true);
    });
  }

  // Lease term filter
  if (filters.leaseTerm !== 'any') {
    result = result.filter((p) => p.leaseTerm === filters.leaseTerm);
  }

  // Availability date filter
  if (filters.availableFrom) {
    result = result.filter((p) => p.availableDate >= filters.availableFrom);
  }

  // Floor filter
  if (filters.floor !== 'any') {
    const floorNum = Number(filters.floor);
    result = result.filter((p) => p.floor >= floorNum);
  }

  // Boolean filters
  if (filters.furnished) {
    result = result.filter((p) => p.furnished);
  }
  if (filters.utilitiesIncluded) {
    result = result.filter((p) => p.utilitiesIncluded);
  }
  if (filters.petsAllowed) {
    result = result.filter((p) => p.petsAllowed);
  }
  if (filters.smokingAllowed) {
    result = result.filter((p) => p.smokingAllowed);
  }

  // Status filter
  if (filters.status !== 'all') {
    result = result.filter((p) => p.status === filters.status);
  }

  return result;
};

/**
 * Sort rental properties
 * @param {Array} properties - Array of rental properties
 * @param {string} sortBy - Sort key
 * @returns {Array} Sorted properties
 */
export const sortRentalProperties = (properties, sortBy = 'relevance') => {
  const sorted = [...properties];

  switch (sortBy) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      sorted.sort((a, b) => new Date(b.availableDate) - new Date(a.availableDate));
      break;
    case 'oldest':
      sorted.sort((a, b) => new Date(a.availableDate) - new Date(b.availableDate));
      break;
    case 'beds':
      sorted.sort((a, b) => b.bedrooms - a.bedrooms);
      break;
    case 'baths':
      sorted.sort((a, b) => b.bathrooms - a.bathrooms);
      break;
    case 'area':
      sorted.sort((a, b) => b.area - a.area);
      break;
    case 'relevance':
    default:
      // Keep original order or apply relevance scoring
      break;
  }

  return sorted;
};

/**
 * Paginate rental properties
 * @param {Array} properties - Array of rental properties
 * @param {number} page - Current page (1-indexed)
 * @param {number} perPage - Items per page
 * @returns {Object} Paginated results
 */
export const paginateRentalProperties = (properties, page = 1, perPage = 12) => {
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return {
    items: properties.slice(start, end),
    total: properties.length,
    totalPages: Math.ceil(properties.length / perPage),
    currentPage: page,
    perPage,
    startIndex: start,
    endIndex: Math.min(end, properties.length),
  };
};

/**
 * Get rental price per month formatted
 * @param {number} price - Monthly price
 * @param {string} leaseTerm - Lease term
 * @returns {string} Formatted price with term
 */
export const formatRentalPrice = (price, leaseTerm = 'Monthly') => {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  const termMap = {
    Monthly: '/mo',
    Yearly: '/yr',
    Flexible: '/mo',
  };

  return `${formatted} ${termMap[leaseTerm] || '/mo'}`;
};

/**
 * Format availability date
 * @param {string} date - Date string
 * @returns {string} Formatted date
 */
export const formatAvailabilityDate = (date) => {
  if (!date) return 'Available Now';
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Available Now';

  const now = new Date();
  const diff = d - now;

  if (diff < 0) return 'Available Now';
  if (diff < 24 * 60 * 60 * 1000) return 'Available Tomorrow';
  if (diff < 7 * 24 * 60 * 60 * 1000) {
    const days = Math.ceil(diff / (24 * 60 * 60 * 1000));
    return `Available in ${days} days`;
  }

  return `Available ${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
};

/**
 * Check if a property is available for immediate move-in
 * @param {Object} property - Rental property
 * @returns {boolean} True if available now
 */
export const isAvailableNow = (property) => {
  if (!property.availableDate) return true;
  const availableDate = new Date(property.availableDate);
  const now = new Date();
  return availableDate <= now;
};

/**
 * Get lease term display
 * @param {string} term - Lease term
 * @returns {string} Display label
 */
export const getLeaseTermDisplay = (term) => {
  const terms = {
    Monthly: 'Month-to-Month',
    Yearly: '12-Month Lease',
    Flexible: 'Flexible Terms',
  };
  return terms[term] || term;
};

export default {
  filterRentalProperties,
  sortRentalProperties,
  paginateRentalProperties,
  formatRentalPrice,
  formatAvailabilityDate,
  isAvailableNow,
  getLeaseTermDisplay,
};
