export const PARTNERS_DATA = [
  // Property Developers
  {
    id: 1,
    name: 'Beverly Hills Development Group',
    logo: getPropertyImage(0),
    category: 'developer',
    description: 'Premier luxury residential developer in Southern California',
    website: 'https://example.com',
    verified: true,
    featured: true,
  },
  {
    id: 2,
    name: 'Pacific Crest Properties',
    logo: getPropertyImage(1),
    category: 'developer',
    description: 'Innovative commercial and residential developments',
    website: 'https://example.com',
    verified: true,
    featured: false,
  },

  // Banks
  {
    id: 3,
    name: 'First Republic Bank',
    logo: getPropertyImage(2),
    category: 'bank',
    description: 'Premier private banking and wealth management',
    website: 'https://example.com',
    verified: true,
    featured: true,
  },
  {
    id: 4,
    name: 'City National Bank',
    logo: getPropertyImage(3),
    category: 'bank',
    description: 'Customized banking solutions for high-net-worth clients',
    website: 'https://example.com',
    verified: true,
    featured: false,
  },

  // Mortgage Providers
  {
    id: 5,
    name: 'Guaranteed Rate Mortgage',
    logo: getPropertyImage(4),
    category: 'mortgage',
    description: 'Competitive rates and personalized mortgage solutions',
    website: 'https://example.com',
    verified: true,
    featured: false,
  },
  {
    id: 6,
    name: 'JPMorgan Chase',
    logo: getPropertyImage(5),
    category: 'mortgage',
    description: 'Comprehensive mortgage and lending services',
    website: 'https://example.com',
    verified: true,
    featured: false,
  },

  // Investment Firms
  {
    id: 7,
    name: 'Blackstone Real Estate',
    logo: getPropertyImage(6),
    category: 'investment',
    description: 'Global real estate investment and advisory',
    website: 'https://example.com',
    verified: true,
    featured: true,
  },
  {
    id: 8,
    name: 'Goldman Sachs Realty',
    logo: getPropertyImage(7),
    category: 'investment',
    description: 'Strategic real estate investment solutions',
    website: 'https://example.com',
    verified: true,
    featured: false,
  },

  // Architecture Firms
  {
    id: 9,
    name: 'Foster + Partners',
    logo: getPropertyImage(8),
    category: 'architecture',
    description: 'World-renowned architecture and design firm',
    website: 'https://example.com',
    verified: true,
    featured: false,
  },
  {
    id: 10,
    name: 'Gensler',
    logo: getPropertyImage(9),
    category: 'architecture',
    description: 'Leading global architecture and design practice',
    website: 'https://example.com',
    verified: true,
    featured: false,
  },

  // Interior Design
  {
    id: 11,
    name: 'Kelly Wearstler Design',
    logo: getPropertyImage(10),
    category: 'design',
    description: 'Award-winning luxury interior design',
    website: 'https://example.com',
    verified: true,
    featured: false,
  },
  {
    id: 12,
    name: 'Rockwell Group',
    logo: getPropertyImage(11),
    category: 'design',
    description: 'Innovative design and architecture studio',
    website: 'https://example.com',
    verified: true,
    featured: false,
  },

  // Legal Partners
  {
    id: 13,
    name: 'Gibson Dunn',
    logo: getPropertyImage(12),
    category: 'legal',
    description: 'Premier real estate and corporate law firm',
    website: 'https://example.com',
    verified: true,
    featured: false,
  },
  {
    id: 14,
    name: 'Latham & Watkins',
    logo: getPropertyImage(13),
    category: 'legal',
    description: 'Global legal counsel for complex real estate transactions',
    website: 'https://example.com',
    verified: true,
    featured: false,
  },

  // Construction
  {
    id: 15,
    name: 'Turner Construction',
    logo: getPropertyImage(14),
    category: 'construction',
    description: 'Leading construction and project management',
    website: 'https://example.com',
    verified: true,
    featured: false,
  },
  {
    id: 16,
    name: 'Skanska USA',
    logo: getPropertyImage(15),
    category: 'construction',
    description: 'Premium construction and development services',
    website: 'https://example.com',
    verified: true,
    featured: false,
  },

  // Insurance
  {
    id: 17,
    name: 'Chubb Insurance',
    logo: getPropertyImage(0),
    category: 'insurance',
    description: 'Elite property and casualty insurance',
    website: 'https://example.com',
    verified: true,
    featured: false,
  },
  {
    id: 18,
    name: 'AIG Private Client Group',
    logo: getPropertyImage(1),
    category: 'insurance',
    description: 'Specialized insurance for luxury properties',
    website: 'https://example.com',
    verified: true,
    featured: false,
  },
];

export const FEATURED_PARTNERS = PARTNERS_DATA.filter((p) => p.featured);

export default {
  PARTNERS_DATA,
  FEATURED_PARTNERS,
};
import { getPropertyImage } from '@/assets/images/properties';
