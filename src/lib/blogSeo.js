/**
 * Blog SEO Utilities
 * Functions for generating SEO metadata and JSON-LD schemas
 * Luxury real estate focused
 */

/**
 * Generate blog meta tags
 * @param {Object} post - Blog post object
 * @param {Object} config - Configuration object
 * @param {string} config.siteName - Site name
 * @param {string} config.siteUrl - Site URL
 * @param {string} config.defaultImage - Default OG image
 * @param {string} config.twitterHandle - Twitter handle
 * @param {string} config.defaultDescription - Default description
 * @returns {Object} Meta tag object
 */
export const generateBlogMeta = (post, config = {}) => {
  const {
    siteName = 'Elite Real Estate',
    siteUrl = 'https://eliterealestate.com',
    defaultImage = '/images/og-image.jpg',
    twitterHandle = '@eliterealestate',
    defaultDescription = 'Expert insights on luxury real estate, market trends, and investment strategies.',
  } = config;

  const title = post?.title ? `${post.title} | ${siteName}` : `${siteName} | Blog`;
  const description = post?.excerpt || post?.content?.slice(0, 160) || defaultDescription;
  const image = post?.featuredImage || defaultImage;
  const url = post?.slug ? `${siteUrl}/blog/${post.slug}` : `${siteUrl}/blog`;
  const datePublished = post?.date || new Date().toISOString();
  const dateModified = post?.updatedAt || datePublished;

  return {
    title,
    description,
    keywords: post?.tags?.join(', ') || 'luxury real estate, real estate blog, market insights',
    canonical: url,
    openGraph: {
      title,
      description,
      url,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post?.title || 'Luxury Real Estate Blog',
        },
      ],
      type: 'article',
      locale: 'en_US',
      article: {
        publishedTime: datePublished,
        modifiedTime: dateModified,
        author: post?.author?.name || 'Elite Real Estate',
        tags: post?.tags || [],
        section: post?.category || 'Real Estate',
      },
    },
    twitter: {
      card: 'summary_large_image',
      site: twitterHandle,
      title,
      description,
      image,
    },
    additional: {
      'article:published_time': datePublished,
      'article:modified_time': dateModified,
      'article:author': post?.author?.name || 'Elite Real Estate',
      'article:section': post?.category || 'Real Estate',
      'article:tag': post?.tags?.join(', ') || '',
    },
  };
};

/**
 * Generate Article JSON-LD Schema
 * @param {Object} post - Blog post object
 * @param {Object} config - Configuration object
 * @param {string} config.siteUrl - Site URL
 * @param {string} config.defaultImage - Default image
 * @param {string} config.publisherName - Publisher name
 * @param {string} config.publisherLogo - Publisher logo URL
 * @returns {Object} Article schema
 */
export const generateArticleSchema = (post, config = {}) => {
  const {
    siteUrl = 'https://eliterealestate.com',
    defaultImage = '/images/og-image.jpg',
    publisherName = 'Elite Real Estate',
    publisherLogo = '/images/logo.png',
  } = config;

  if (!post) {
    return null;
  }

  const image = post.featuredImage || defaultImage;
  const datePublished = post.date || new Date().toISOString();
  const dateModified = post.updatedAt || datePublished;
  const author = post.author?.name || 'Elite Real Estate';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.content?.slice(0, 200),
    image: image,
    datePublished: datePublished,
    dateModified: dateModified,
    author: {
      '@type': 'Person',
      name: author,
      url: post.author?.url || `${siteUrl}/agents`,
    },
    publisher: {
      '@type': 'Organization',
      name: publisherName,
      logo: {
        '@type': 'ImageObject',
        url: publisherLogo,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(', ') || '',
    articleSection: post.category || 'Real Estate',
    about: {
      '@type': 'Thing',
      name: post.category || 'Real Estate',
    },
    wordCount: post.content?.split(/\s+/).length || 0,
    timeRequired: `${post.readTime || 5} min`,
  };

  // Add author schema if we have more details
  if (post.author?.image) {
    schema.author.image = {
      '@type': 'ImageObject',
      url: post.author.image,
    };
  }

  // Add comments if available
  if (post.comments && post.comments.length > 0) {
    schema.comment = post.comments.map((comment) => ({
      '@type': 'Comment',
      author: {
        '@type': 'Person',
        name: comment.author,
      },
      text: comment.text,
      datePublished: comment.date,
    }));
  }

  return schema;
};

/**
 * Generate Blog Breadcrumb JSON-LD Schema
 * @param {Array} breadcrumbs - Array of breadcrumb items
 * @param {Object} config - Configuration object
 * @param {string} config.siteUrl - Site URL
 * @returns {Object} Breadcrumb schema
 */
export const generateBreadcrumbSchema = (breadcrumbs = [], config = {}) => {
  const { siteUrl = 'https://eliterealestate.com' } = config;

  // Default breadcrumbs for blog
  const defaultBreadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
  ];

  const items = breadcrumbs.length > 0 ? breadcrumbs : defaultBreadcrumbs;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${siteUrl}${item.href}`,
    })),
  };

  return schema;
};

/**
 * Generate FAQ JSON-LD Schema for blog posts
 * @param {Array} faqs - Array of FAQ items
 * @param {Object} config - Configuration object
 * @param {string} config.siteUrl - Site URL
 * @returns {Object} FAQ schema
 */
export const generateFAQSchema = (faqs = [], config = {}) => {
  const { siteUrl = 'https://eliterealestate.com' } = config;

  if (!faqs || faqs.length === 0) {
    return null;
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return schema;
};

/**
 * Generate Blog Collection JSON-LD Schema
 * @param {Array} posts - Array of blog posts
 * @param {Object} config - Configuration object
 * @param {string} config.siteUrl - Site URL
 * @param {string} config.name - Collection name
 * @param {string} config.description - Collection description
 * @returns {Object} Collection schema
 */
export const generateCollectionSchema = (posts = [], config = {}) => {
  const {
    siteUrl = 'https://eliterealestate.com',
    name = 'Elite Real Estate Blog',
    description = 'Expert insights on luxury real estate, market trends, and investment strategies.',
  } = config;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: name,
    description: description,
    url: `${siteUrl}/blog`,
    about: {
      '@type': 'Thing',
      name: 'Luxury Real Estate',
    },
    keywords: 'luxury real estate, real estate blog, market insights, investment',
    hasPart: posts.slice(0, 10).map((post) => ({
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt || post.content?.slice(0, 200),
      image: post.featuredImage || '',
      datePublished: post.date || '',
      url: `${siteUrl}/blog/${post.slug}`,
      author: {
        '@type': 'Person',
        name: post.author?.name || 'Elite Real Estate',
      },
    })),
  };

  return schema;
};

/**
 * Generate Author JSON-LD Schema
 * @param {Object} author - Author object
 * @param {Object} config - Configuration object
 * @param {string} config.siteUrl - Site URL
 * @param {string} config.publisherName - Publisher name
 * @param {string} config.publisherLogo - Publisher logo URL
 * @returns {Object} Author schema
 */
export const generateAuthorSchema = (author, config = {}) => {
  const {
    siteUrl = 'https://eliterealestate.com',
    publisherName = 'Elite Real Estate',
    publisherLogo = '/images/logo.png',
  } = config;

  if (!author) {
    return null;
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    description: author.bio || `${author.name} is a luxury real estate expert at ${publisherName}.`,
    url: author.url || `${siteUrl}/agents`,
    image: author.image || '',
    jobTitle: author.title || 'Real Estate Expert',
    worksFor: {
      '@type': 'Organization',
      name: publisherName,
      logo: {
        '@type': 'ImageObject',
        url: publisherLogo,
      },
    },
    sameAs: [
      ...(author.facebook ? [author.facebook] : []),
      ...(author.instagram ? [author.instagram] : []),
      ...(author.linkedin ? [author.linkedin] : []),
      ...(author.twitter ? [author.twitter] : []),
    ].filter(Boolean),
  };

  return schema;
};

/**
 * Generate Blog Posting Schema
 * @param {Object} post - Blog post object
 * @param {Object} config - Configuration object
 * @param {string} config.siteUrl - Site URL
 * @param {string} config.defaultImage - Default image
 * @param {string} config.publisherName - Publisher name
 * @param {string} config.publisherLogo - Publisher logo URL
 * @returns {Object} Blog posting schema
 */
export const generateBlogPostingSchema = (post, config = {}) => {
  const {
    siteUrl = 'https://eliterealestate.com',
    defaultImage = '/images/og-image.jpg',
    publisherName = 'Elite Real Estate',
    publisherLogo = '/images/logo.png',
  } = config;

  if (!post) {
    return null;
  }

  const articleSchema = generateArticleSchema(post, config);

  if (!articleSchema) {
    return null;
  }

  // Enhance with BlogPosting specific properties
  return {
    ...articleSchema,
    '@type': 'BlogPosting',
    discussionUrl: `${siteUrl}/blog/${post.slug}#comments`,
    commentCount: post.comments?.length || 0,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
  };
};

/**
 * Generate Meta Tags HTML
 * @param {Object} meta - Meta object from generateBlogMeta
 * @returns {string} HTML meta tags string
 */
export const generateMetaTagsHTML = (meta) => {
  if (!meta) return '';

  const tags = [];

  // Basic meta tags
  if (meta.title) {
    tags.push(`<title>${meta.title}</title>`);
  }
  if (meta.description) {
    tags.push(`<meta name="description" content="${meta.description}" />`);
  }
  if (meta.keywords) {
    tags.push(`<meta name="keywords" content="${meta.keywords}" />`);
  }
  if (meta.canonical) {
    tags.push(`<link rel="canonical" href="${meta.canonical}" />`);
  }

  // Open Graph
  if (meta.openGraph) {
    const og = meta.openGraph;
    tags.push(`<meta property="og:title" content="${og.title}" />`);
    tags.push(`<meta property="og:description" content="${og.description}" />`);
    tags.push(`<meta property="og:url" content="${og.url}" />`);
    tags.push(`<meta property="og:site_name" content="${og.siteName}" />`);
    tags.push(`<meta property="og:type" content="${og.type}" />`);
    tags.push(`<meta property="og:locale" content="${og.locale}" />`);

    if (og.images && og.images.length > 0) {
      tags.push(`<meta property="og:image" content="${og.images[0].url}" />`);
      tags.push(`<meta property="og:image:width" content="${og.images[0].width}" />`);
      tags.push(`<meta property="og:image:height" content="${og.images[0].height}" />`);
      tags.push(`<meta property="og:image:alt" content="${og.images[0].alt}" />`);
    }

    if (og.article) {
      tags.push(`<meta property="article:published_time" content="${og.article.publishedTime}" />`);
      if (og.article.modifiedTime) {
        tags.push(`<meta property="article:modified_time" content="${og.article.modifiedTime}" />`);
      }
      if (og.article.author) {
        tags.push(`<meta property="article:author" content="${og.article.author}" />`);
      }
      if (og.article.section) {
        tags.push(`<meta property="article:section" content="${og.article.section}" />`);
      }
      if (og.article.tags && og.article.tags.length > 0) {
        og.article.tags.forEach((tag) => {
          tags.push(`<meta property="article:tag" content="${tag}" />`);
        });
      }
    }
  }

  // Twitter
  if (meta.twitter) {
    tags.push(`<meta name="twitter:card" content="${meta.twitter.card}" />`);
    if (meta.twitter.site) {
      tags.push(`<meta name="twitter:site" content="${meta.twitter.site}" />`);
    }
    tags.push(`<meta name="twitter:title" content="${meta.twitter.title}" />`);
    tags.push(`<meta name="twitter:description" content="${meta.twitter.description}" />`);
    if (meta.twitter.image) {
      tags.push(`<meta name="twitter:image" content="${meta.twitter.image}" />`);
    }
  }

  // Additional meta tags
  if (meta.additional) {
    Object.entries(meta.additional).forEach(([key, value]) => {
      tags.push(`<meta name="${key}" content="${value}" />`);
    });
  }

  return tags.join('\n');
};

/**
 * Generate all SEO data for a blog post
 * @param {Object} post - Blog post object
 * @param {Object} config - Configuration object
 * @param {string} config.siteName - Site name
 * @param {string} config.siteUrl - Site URL
 * @param {string} config.defaultImage - Default OG image
 * @param {string} config.twitterHandle - Twitter handle
 * @param {string} config.publisherName - Publisher name
 * @param {string} config.publisherLogo - Publisher logo URL
 * @param {string} config.defaultDescription - Default description
 * @param {Array} config.breadcrumbs - Breadcrumb items
 * @param {Array} config.faqs - FAQ items
 * @param {Object} config.author - Author object
 * @returns {Object} Complete SEO data
 */
export const generateBlogSEOData = (post, config = {}) => {
  const {
    siteName = 'Elite Real Estate',
    siteUrl = 'https://eliterealestate.com',
    defaultImage = '/images/og-image.jpg',
    twitterHandle = '@eliterealestate',
    publisherName = 'Elite Real Estate',
    publisherLogo = '/images/logo.png',
    defaultDescription = 'Expert insights on luxury real estate, market trends, and investment strategies.',
    breadcrumbs = [],
    faqs = [],
    author = null,
  } = config;

  const seoConfig = {
    siteName,
    siteUrl,
    defaultImage,
    twitterHandle,
    publisherName,
    publisherLogo,
    defaultDescription,
  };

  // Generate all schemas
  const schemas = [];

  // Article schema
  const articleSchema = generateBlogPostingSchema(post, seoConfig);
  if (articleSchema) {
    schemas.push(articleSchema);
  }

  // Breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbs.length > 0 ? breadcrumbs : undefined,
    seoConfig
  );
  if (breadcrumbSchema) {
    schemas.push(breadcrumbSchema);
  }

  // FAQ schema
  if (faqs && faqs.length > 0) {
    const faqSchema = generateFAQSchema(faqs, seoConfig);
    if (faqSchema) {
      schemas.push(faqSchema);
    }
  }

  // Author schema
  if (author || post?.author) {
    const authorData = author || post.author;
    const authorSchema = generateAuthorSchema(authorData, seoConfig);
    if (authorSchema) {
      schemas.push(authorSchema);
    }
  }

  // Meta tags
  const meta = generateBlogMeta(post, seoConfig);
  const metaHTML = generateMetaTagsHTML(meta);

  return {
    meta,
    metaHTML,
    schemas,
    schemasJSON: schemas.map((schema) => JSON.stringify(schema)),
    schemasHTML: schemas
      .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
      .join('\n'),
  };
};

export default {
  generateBlogMeta,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateCollectionSchema,
  generateAuthorSchema,
  generateBlogPostingSchema,
  generateMetaTagsHTML,
  generateBlogSEOData,
};
