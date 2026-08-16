export const RENT_SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest Available' },
  { value: 'oldest', label: 'Oldest Available' },
  { value: 'beds', label: 'Most Beds' },
  { value: 'baths', label: 'Most Baths' },
  { value: 'area', label: 'Largest Area' },
];

export const RENT_LEASE_TERMS = [
  { value: 'any', label: 'Any Term' },
  { value: 'Monthly', label: 'Monthly' },
  { value: 'Yearly', label: 'Yearly' },
  { value: 'Flexible', label: 'Flexible' },
];

export const RENT_PROPERTY_TYPES = [
  { value: 'all', label: 'All Types' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'villa', label: 'Villa' },
  { value: 'condo', label: 'Condo' },
  { value: 'penthouse', label: 'Penthouse' },
  { value: 'loft', label: 'Loft' },
  { value: 'studio', label: 'Studio' },
  { value: 'townhouse', label: 'Townhouse' },
];

export const RENT_FILTER_DEFAULTS = {
  transactionType: 'rent',
  propertyType: 'all',
  priceMin: '',
  priceMax: '',
  areaMin: '',
  areaMax: '',
  bedrooms: 'any',
  bathrooms: 'any',
  features: [],
  leaseTerm: 'any',
  availableFrom: '',
  furnished: false,
  utilitiesIncluded: false,
  petsAllowed: false,
  smokingAllowed: false,
  floor: 'any',
  status: 'active',
};

export const RENT_VIEW_OPTIONS = {
  GRID: 'grid',
  LIST: 'list',
  MAP: 'map',
};

export default {
  RENT_SORT_OPTIONS,
  RENT_LEASE_TERMS,
  RENT_PROPERTY_TYPES,
  RENT_FILTER_DEFAULTS,
  RENT_VIEW_OPTIONS,
};
