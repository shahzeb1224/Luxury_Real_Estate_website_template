/**
 * SEO Utilities
 * Comprehensive SEO management for the application
 */

import config from '@/constants/config';
import routes from '@/constants/routes';

/**
 * Generate SEO metadata object
 * @param {object} options - SEO options
 * @param {string} options.title - Page title
 * @param {string} options.description - Page description
 * @param {string} options.keywords - Page keywords
 * @param {string} options.image - OG image URL
 * @param {string} options.url - Page URL
 * @param {string} options.type - OG type
 * @param {string} options.canonical - Canonical URL
 * @param {object} options.additional - Additional meta tags
 * @returns {object} SEO metadata object
 */
export const generateSEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  canonical,
  additional = {},
}) => {
  const defaultTitle = config.seo.defaultTitle;
  const defaultDescription = config.seo.defaultDescription;
  const defaultImage = config.seo.ogImage.url;
  const siteUrl = config.seo.siteUrl;
  const siteName = config.seo.siteName;
  const locale = config.seo.locale;
  const twitterHandle = config.seo.twitterHandle;

  const seoTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoImage = image || defaultImage;
  const seoUrl = url ? `${siteUrl}${url}` : siteUrl;
  const seoCanonical = canonical || seoUrl;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: keywords || config.seo.defaultKeywords,
    canonical: seoCanonical,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: seoUrl,
      siteName: siteName,
      images: [
        {
          url: seoImage,
          width: config.seo.ogImage.width || 1200,
          height: config.seo.ogImage.height || 630,
          alt: seoTitle,
        },
      ],
      type: type,
      locale: locale,
    },
    twitter: {
      card: 'summary_large_image',
      site: twitterHandle,
      title: seoTitle,
      description: seoDescription,
      image: seoImage,
    },
    additional: {
      'theme-color': config.seo.themeColor,
      ...additional,
    },
  };
};

/**
 * Generate page-specific SEO metadata
 * @param {string} page - Page name
 * @param {object} params - Page parameters
 * @param {object} overrides - Override values
 * @returns {object} Page SEO metadata
 */
export const generatePageSEO = (page, params = {}, overrides = {}) => {
  const pageConfig = {
    home: {
      title: 'Luxury Real Estate | Premium Properties & Villas',
      description:
        'Discover the finest luxury properties and villas. Elite Real Estate offers premium homes, expert agents, and white-glove service.',
      keywords: 'luxury real estate, premium properties, villas, mansions',
      type: 'website',
    },
    buy: {
      title: 'Buy Luxury Properties | Elite Real Estate',
      description:
        'Browse our curated collection of luxury properties for sale. Find your dream home with our expert real estate agents.',
      keywords: 'buy luxury homes, properties for sale, real estate listings',
      type: 'website',
    },
    rent: {
      title: 'Luxury Rentals | Premium Properties for Rent',
      description:
        'Discover premium rental properties. Find luxury homes, apartments, and villas for rent.',
      keywords: 'luxury rentals, properties for rent, rental homes',
      type: 'website',
    },
    commercial: {
      title: 'Commercial Properties | Elite Real Estate',
      description:
        'Discover premium commercial properties including offices, retail spaces, and warehouses.',
      keywords: 'commercial properties, office spaces, retail spaces, warehouses',
      type: 'website',
    },
    luxury: {
      title: 'Luxury Collection | Elite Real Estate',
      description:
        'Explore our curated collection of ultra-luxury properties. Waterfront estates, modern penthouses, and historic mansions.',
      keywords: 'ultra-luxury properties, luxury estates, penthouses, mansions',
      type: 'website',
    },
    property: {
      title: `${params.title} | Luxury Property for Sale`,
      description: `${params.description || `Explore this luxury property: ${params.title}`}`,
      keywords: `luxury property, ${params.location}, ${params.type}`,
      type: 'product',
    },
    agents: {
      title: 'Expert Real Estate Agents | Elite Real Estate',
      description:
        'Meet our team of expert real estate agents. Specializing in luxury properties and premium client service.',
      keywords: 'real estate agents, luxury agents, property experts',
      type: 'website',
    },
    agent: {
      title: `${params.name} | Real Estate Agent | Elite Real Estate`,
      description: `Contact ${params.name}, expert real estate agent specializing in luxury properties. ${params.specialty || ''}`,
      keywords: `real estate agent, ${params.name}, luxury agent, ${params.location}`,
      type: 'person',
    },
    about: {
      title: 'About Elite Real Estate | Luxury Real Estate Experts',
      description:
        'Learn about Elite Real Estate - our story, values, and commitment to excellence in luxury real estate.',
      keywords: 'about us, luxury real estate company, real estate experts',
      type: 'website',
    },
    blog: {
      title: 'Real Estate Blog | Market Insights & Luxury Living',
      description:
        'Stay informed with the latest market insights, luxury living tips, and real estate news.',
      keywords: 'real estate blog, market insights, luxury living, property news',
      type: 'website',
    },
    post: {
      title: `${params.title} | Real Estate Blog | Elite Real Estate`,
      description: `${params.excerpt || `Read about ${params.title}`}`,
      keywords: `real estate, ${params.category}, ${params.tags}`,
      type: 'article',
    },
    contact: {
      title: 'Contact Elite Real Estate | Luxury Real Estate Experts',
      description:
        'Get in touch with our team of luxury real estate experts. Schedule a consultation or inquiry today.',
      keywords: 'contact us, real estate inquiry, consultation',
      type: 'website',
    },
  };

  const config = pageConfig[page] || pageConfig.home;
  const merged = { ...config, ...overrides };

  return generateSEO({
    title: merged.title,
    description: merged.description,
    keywords: merged.keywords,
    url: routes[page] ? routes[page].replace(/:(\w+)/g, (_, key) => params[key] || '') : '',
    type: merged.type,
  });
};

/**
 * Generate structured data for properties
 * @param {object} property - Property object
 * @returns {object} Structured data JSON-LD
 */
export const generatePropertySchema = (property) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: property.title,
    description: property.description,
    image: property.images?.[0] || '',
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: property.currency || 'USD',
      availability:
        property.status === 'sold' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
      url: `${config.seo.siteUrl}/property/${property.id}`,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.address?.street || '',
      addressLocality: property.address?.city || '',
      addressRegion: property.address?.state || '',
      postalCode: property.address?.zip || '',
      addressCountry: property.address?.country || 'US',
    },
    geo: property.coordinates
      ? {
          '@type': 'GeoCoordinates',
          latitude: property.coordinates.lat,
          longitude: property.coordinates.lng,
        }
      : undefined,
    floorSize: property.sqft
      ? {
          '@type': 'QuantitativeValue',
          value: property.sqft,
          unitText: 'sqft',
        }
      : undefined,
    numberOfRooms: property.bedrooms,
    numberOfBathrooms: property.bathrooms,
  };
};

/**
 * Generate structured data for organization
 * @returns {object} Organization schema
 */
export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: config.company.name,
    legalName: config.company.legalName,
    description: config.app.description,
    foundingDate: `${config.company.founded}`,
    telephone: config.company.phone,
    email: config.company.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.company.address.street,
      addressLocality: config.company.address.city,
      addressRegion: config.company.address.state,
      postalCode: config.company.address.zip,
      addressCountry: config.company.address.country,
    },
    url: config.seo.siteUrl,
    logo: `${config.seo.siteUrl}/images/logo.png`,
    sameAs: [
      config.social.facebook,
      config.social.instagram,
      config.social.linkedin,
      config.social.youtube,
      config.social.twitter,
    ],
  };
};

/**
 * Generate structured data for article
 * @param {object} article - Article object
 * @param {object} author - Author object
 * @returns {object} Article schema
 */
export const generateArticleSchema = (article, author) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt || article.description,
    image: article.image || '',
    datePublished: article.publishedAt || article.date,
    dateModified: article.updatedAt || article.date,
    author: {
      '@type': 'Person',
      name: author?.name || 'Elite Real Estate',
    },
    publisher: {
      '@type': 'Organization',
      name: config.company.name,
      logo: {
        '@type': 'ImageObject',
        url: `${config.seo.siteUrl}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${config.seo.siteUrl}/blog/${article.slug}`,
    },
  };
};

/**
 * Generate structured data for breadcrumb
 * @param {Array} items - Breadcrumb items
 * @returns {object} Breadcrumb schema
 */
export const generateBreadcrumbSchema = (items) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${config.seo.siteUrl}${item.href}`,
    })),
  };
};

/**
 * Generate meta tags from SEO object
 * @param {object} seo - SEO object
 * @returns {string} Meta tags HTML string
 */
export const generateMetaTags = (seo) => {
  const tags = [];

  // Basic meta tags
  tags.push(`<title>${seo.title}</title>`);
  tags.push(`<meta name="description" content="${seo.description}" />`);
  if (seo.keywords) {
    tags.push(`<meta name="keywords" content="${seo.keywords}" />`);
  }
  if (seo.canonical) {
    tags.push(`<link rel="canonical" href="${seo.canonical}" />`);
  }

  // Open Graph
  tags.push(`<meta property="og:title" content="${seo.openGraph.title}" />`);
  tags.push(`<meta property="og:description" content="${seo.openGraph.description}" />`);
  tags.push(`<meta property="og:url" content="${seo.openGraph.url}" />`);
  tags.push(`<meta property="og:site_name" content="${seo.openGraph.siteName}" />`);
  tags.push(`<meta property="og:type" content="${seo.openGraph.type}" />`);
  tags.push(`<meta property="og:locale" content="${seo.openGraph.locale}" />`);
  if (seo.openGraph.images && seo.openGraph.images.length > 0) {
    tags.push(`<meta property="og:image" content="${seo.openGraph.images[0].url}" />`);
    tags.push(`<meta property="og:image:width" content="${seo.openGraph.images[0].width}" />`);
    tags.push(`<meta property="og:image:height" content="${seo.openGraph.images[0].height}" />`);
    tags.push(`<meta property="og:image:alt" content="${seo.openGraph.images[0].alt}" />`);
  }

  // Twitter
  tags.push(`<meta name="twitter:card" content="${seo.twitter.card}" />`);
  if (seo.twitter.site) {
    tags.push(`<meta name="twitter:site" content="${seo.twitter.site}" />`);
  }
  tags.push(`<meta name="twitter:title" content="${seo.twitter.title}" />`);
  tags.push(`<meta name="twitter:description" content="${seo.twitter.description}" />`);
  if (seo.twitter.image) {
    tags.push(`<meta name="twitter:image" content="${seo.twitter.image}" />`);
  }

  // Additional meta tags
  if (seo.additional) {
    for (const [key, value] of Object.entries(seo.additional)) {
      tags.push(`<meta name="${key}" content="${value}" />`);
    }
  }

  return tags.join('\n');
};

/**
 * Generate complete SEO component data
 * @param {object} options - SEO options
 * @returns {object} Complete SEO data
 */
export const getSEOData = (options) => {
  const seo = generateSEO(options);
  return {
    ...seo,
    metaTags: generateMetaTags(seo),
    structuredData: options.structuredData || null,
  };
};

export default {
  generateSEO,
  generatePageSEO,
  generatePropertySchema,
  generateOrganizationSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateMetaTags,
  getSEOData,
};
