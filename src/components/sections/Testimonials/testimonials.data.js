import { getAgentImage } from '@/assets/images/agents';

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    client: {
      name: 'Michael & Lisa Chen',
      image: getAgentImage(1),
    },
    location: 'Beverly Hills, CA',
    propertyType: 'Luxury Villa',
    transactionType: 'purchase',
    rating: 5,
    quote:
      "Elite Real Estate made our dream home a reality. Their team's expertise, professionalism, and dedication were unmatched throughout the entire process.",
    year: '2024',
    verified: true,
    featured: true,
  },
  {
    id: 2,
    client: {
      name: 'Jennifer Williams',
      image: getAgentImage(2),
    },
    location: 'Malibu, CA',
    propertyType: 'Beachfront Estate',
    transactionType: 'sale',
    rating: 5,
    quote:
      'Selling our beachfront property was made effortless. The marketing strategy and negotiation skills were exceptional.',
    year: '2024',
    verified: true,
    featured: false,
  },
  {
    id: 3,
    client: {
      name: 'David & Sarah Anderson',
      image: getAgentImage(0),
    },
    location: 'Santa Monica, CA',
    propertyType: 'Modern Penthouse',
    transactionType: 'purchase',
    rating: 4.5,
    quote:
      "We couldn't be happier with our new penthouse. The team went above and beyond to find exactly what we were looking for.",
    year: '2023',
    verified: true,
    featured: false,
  },
  {
    id: 4,
    client: {
      name: 'Robert Tanaka',
      image: getAgentImage(1),
    },
    location: 'Beverly Hills, CA',
    propertyType: 'Luxury Condo',
    transactionType: 'investment',
    rating: 5,
    quote:
      "The investment guidance was invaluable. I've seen exceptional returns on my luxury condo investment.",
    year: '2023',
    verified: true,
    featured: false,
  },
  {
    id: 5,
    client: {
      name: 'Amanda Foster',
      image: getAgentImage(2),
    },
    location: 'Orange County, CA',
    propertyType: 'Custom Home',
    transactionType: 'purchase',
    rating: 5,
    quote:
      'From the first consultation to the final handover, the service was impeccable. Truly a world-class experience.',
    year: '2024',
    verified: true,
    featured: false,
  },
  {
    id: 6,
    client: {
      name: 'James & Maria Rodriguez',
      image: getAgentImage(0),
    },
    location: 'Los Angeles, CA',
    propertyType: 'Commercial Building',
    transactionType: 'purchase',
    rating: 4.5,
    quote:
      'The commercial property acquisition was handled with precision. Great team to work with!',
    year: '2023',
    verified: true,
    featured: false,
  },
];

export const SUCCESS_STORIES_DATA = [
  {
    client: 'The Johnson Family',
    location: 'Beverly Hills, CA',
    propertyType: 'Luxury Villa',
    challenge:
      'Finding a 6-bedroom villa with a private pool and tennis court within a tight timeline.',
    solution:
      'Elite Real Estate curated a custom search and arranged private viewings within 48 hours.',
    outcome:
      'Successfully purchased a 7,500 sqft villa with all desired amenities, 15% below market value.',
    investmentGrowth: '+18% ROI',
    image: getAgentImage(0),
    href: '/stories/johnson-family',
  },
  {
    client: 'The Patel Family',
    location: 'Malibu, CA',
    propertyType: 'Beachfront Estate',
    challenge: 'Selling a beachfront property in a competitive market while maximizing value.',
    solution:
      'Developed a premium marketing campaign with professional photography, video tours, and targeted outreach.',
    outcome: 'Property sold in 14 days at 8% above asking price with multiple offers.',
    investmentGrowth: '+12% ROI',
    image: getAgentImage(1),
    href: '/stories/patel-family',
  },
];

export const RATING_DATA = {
  average: 4.9,
  total: 320,
  verified: 280,
  breakdown: {
    5: 280,
    4: 25,
    3: 10,
    2: 3,
    1: 2,
  },
};

export default {
  TESTIMONIALS_DATA,
  SUCCESS_STORIES_DATA,
  RATING_DATA,
};
