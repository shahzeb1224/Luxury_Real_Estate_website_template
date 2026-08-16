export const RENT_HERO_DATA = {
  title: 'Premium Rental Properties',
  subtitle: 'Find your perfect home in luxury',
  description:
    "Discover an exclusive collection of premium rental properties in the world's most desirable locations. From luxury apartments to waterfront villas, find your ideal rental home.",
  stats: [
    { label: 'Rental Properties', value: '350+', suffix: '' },
    { label: 'Cities Covered', value: '15', suffix: '+' },
    { label: 'Happy Tenants', value: '1200', suffix: '+' },
    { label: 'Lease Options', value: 'Flexible', suffix: '' },
  ],
};

export const RENTAL_PROPERTIES = [
  {
    id: 'rent-001',
    title: 'Luxury Apartment with Ocean Views',
    location: 'Santa Monica, CA',
    price: 4500,
    type: 'Apartment',
    purpose: 'rent',
    area: 1800,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    status: 'active',
    images: [getPropertyImage(7)],
    featured: true,
    badge: 'Featured',
    leaseTerm: 'Yearly',
    availableDate: '2024-12-01',
    deposit: 4500,
    utilitiesIncluded: false,
    furnished: true,
    petsAllowed: true,
    smokingAllowed: false,
    floor: 12,
    yearBuilt: 2020,
  },
  // ... more rental properties would be defined here
];

export default {
  RENT_HERO_DATA,
  RENTAL_PROPERTIES,
};
import { getPropertyImage } from '@/assets/images/properties';
