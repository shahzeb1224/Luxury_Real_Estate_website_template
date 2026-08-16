/**
 * Application Configuration
 * Centralized config for the entire platform
 */

export const config = {
  /**
   * Application Metadata
   */
  app: {
    name: 'Elite Luxury Real Estate',
    shortName: 'Elite Real Estate',
    tagline: 'Discover Extraordinary Living',
    description:
      'Elite Luxury Real Estate is a premier real estate platform offering curated luxury properties, villas, and commercial spaces for discerning clients worldwide.',
    version: '1.0.0',
    year: new Date().getFullYear(),
    url: 'https://eliterealestate.com',
  },

  /**
   * Company Information
   */
  company: {
    name: 'Elite Luxury Real Estate Group',
    legalName: 'Elite Real Estate LLC',
    founded: 2020,
    phone: '+1 (888) 555-0123',
    phoneDisplay: '(888) 555-0123',
    email: 'info@eliterealestate.com',
    address: {
      street: '123 Luxury Boulevard',
      city: 'Beverly Hills',
      state: 'CA',
      zip: '90210',
      country: 'USA',
      full: '123 Luxury Boulevard, Beverly Hills, CA 90210, USA',
    },
    hours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 4:00 PM',
      sunday: 'Closed',
    },
  },

  /**
   * Social Media Links
   */
  social: {
    facebook: 'https://facebook.com/eliterealestate',
    instagram: 'https://instagram.com/eliterealestate',
    linkedin: 'https://linkedin.com/company/eliterealestate',
    youtube: 'https://youtube.com/eliterealestate',
    twitter: 'https://twitter.com/eliterealestate',
    pinterest: 'https://pinterest.com/eliterealestate',
    tiktok: 'https://tiktok.com/@eliterealestate',
  },

  /**
   * Contact Information
   */
  contact: {
    phone: {
      primary: '+1 (888) 555-0123',
      secondary: '+1 (888) 555-0124',
      tollFree: '1-800-555-0123',
    },
    email: {
      general: 'info@eliterealestate.com',
      sales: 'sales@eliterealestate.com',
      support: 'support@eliterealestate.com',
      careers: 'careers@eliterealestate.com',
    },
    whatsapp: '+1 (888) 555-0123',
    emergency: '+1 (888) 555-9999',
  },

  /**
   * Default SEO Configuration
   */
  seo: {
    defaultTitle: 'Elite Luxury Real Estate | Premium Properties & Villas',
    defaultDescription:
      'Discover the finest luxury properties and villas. Elite Real Estate offers premium homes, expert agents, and white-glove service.',
    defaultKeywords:
      'luxury real estate, premium properties, luxury homes, real estate agents, property for sale, villas, mansions, waterfront properties',
    siteName: 'Elite Luxury Real Estate',
    siteUrl: 'https://eliterealestate.com',
    twitterHandle: '@eliterealestate',
    locale: 'en_US',
    themeColor: '#1a2a3e',
    backgroundColor: '#ffffff',
    ogImage: {
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Elite Luxury Real Estate - Premium Properties',
    },
  },

  /**
   * Navigation Structure
   */
  navigation: {
    main: [
      { label: 'Buy', href: '/buy' },
      { label: 'Rent', href: '/rent' },
      { label: 'Commercial', href: '/commercial' },
      { label: 'Luxury', href: '/luxury' },
      { label: 'Agents', href: '/agents' },
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
    utility: [
      { label: 'Sign In', href: '/login' },
      { label: 'Register', href: '/register' },
      { label: 'Favorites', href: '/favorites' },
      { label: 'Compare', href: '/compare' },
    ],
    footer: {
      company: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
        { label: 'FAQs', href: '/faq' },
      ],
      properties: [
        { label: 'Buy Properties', href: '/buy' },
        { label: 'Rent Properties', href: '/rent' },
        { label: 'Commercial', href: '/commercial' },
        { label: 'Luxury Collection', href: '/luxury' },
      ],
      resources: [
        { label: 'Blog', href: '/blog' },
        { label: 'Agents', href: '/agents' },
        { label: 'Market Insights', href: '/market-insights' },
        { label: 'Investment Guide', href: '/investment-guide' },
      ],
      legal: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'Accessibility', href: '/accessibility' },
      ],
    },
  },

  /**
   * Pagination Settings
   */
  pagination: {
    defaultPageSize: 12,
    options: [12, 24, 48, 96],
    maxResults: 100,
  },

  /**
   * Property Filters
   */
  filters: {
    priceRange: {
      min: 0,
      max: 100000000,
      step: 10000,
    },
    areaRange: {
      min: 0,
      max: 50000,
      step: 100,
    },
    bedrooms: {
      min: 0,
      max: 10,
    },
    bathrooms: {
      min: 0,
      max: 10,
    },
  },

  /**
   * API Configuration
   */
  api: {
    baseUrl: import.meta.env.VITE_API_URL || '/api',
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000,
  },

  /**
   * Feature Flags
   */
  features: {
    darkMode: true,
    analytics: true,
    chat: false,
    aiRecommendations: false,
    virtualTours: true,
    savedSearches: true,
    notifications: true,
  },

  /**
   * Third-Party Services
   */
  services: {
    googleMaps: {
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    },
    analytics: {
      id: import.meta.env.VITE_GA_MEASUREMENT_ID,
    },
    sentry: {
      dsn: import.meta.env.VITE_SENTRY_DSN,
    },
  },

  /**
   * Cookie Settings
   */
  cookies: {
    defaultExpiry: 30, // days
    secure: import.meta.env.PROD,
    sameSite: 'Lax',
    domain: import.meta.env.VITE_COOKIE_DOMAIN || 'localhost',
  },

  /**
   * Storage Keys
   */
  storage: {
    theme: 'elite-theme',
    auth: 'elite-auth',
    favorites: 'elite-favorites',
    searchHistory: 'elite-search-history',
    recentlyViewed: 'elite-recently-viewed',
    userPreferences: 'elite-user-preferences',
  },

  /**
   * Date & Time Formats
   */
  formats: {
    date: 'MMM D, YYYY',
    dateShort: 'MM/DD/YYYY',
    dateLong: 'MMMM D, YYYY',
    time: 'h:mm A',
    dateTime: 'MMM D, YYYY h:mm A',
    currency: 'USD',
    locale: 'en-US',
    timezone: 'America/Los_Angeles',
  },
};

export default config;
