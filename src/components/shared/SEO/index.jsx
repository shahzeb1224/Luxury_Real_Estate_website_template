import React from 'react';
import { Helmet } from 'react-helmet-async';
import config from '@/constants/config';
// Add Organization structured data
export const OrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Elite Luxury Real Estate',
  legalName: 'Elite Real Estate LLC',
  description: 'Premium luxury real estate agency specializing in high-end properties.',
  url: 'https://eliterealestate.com',
  telephone: '+1-888-555-0123',
  email: 'info@eliterealestate.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Luxury Boulevard',
    addressLocality: 'Beverly Hills',
    addressRegion: 'CA',
    postalCode: '90210',
    addressCountry: 'US',
  },
  openingHours: 'Mo-Fr 09:00-18:00',
  priceRange: '$$$',
  image: 'https://eliterealestate.com/images/logo.png',
  sameAs: [
    'https://facebook.com/eliterealestate',
    'https://instagram.com/eliterealestate',
    'https://linkedin.com/company/eliterealestate',
  ],
});
const SEO = ({
  // Basic
  title,
  description,
  keywords,
  // URL
  url,
  canonical,
  // Images
  image,
  imageWidth = 1200,
  imageHeight = 630,
  // Open Graph
  ogType = 'website',
  ogTitle,
  ogDescription,
  ogImage,
  // Twitter
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage,
  twitterHandle,
  // Additional
  noIndex = false,
  noFollow = false,
  structuredData,
  additionalMetaTags = [],
  additionalLinkTags = [],
  children,
}) => {
  const siteUrl = config.seo.siteUrl;
  const siteName = config.seo.siteName;
  const defaultTitle = config.seo.defaultTitle;
  const defaultDescription = config.seo.defaultDescription;
  const defaultKeywords = config.seo.defaultKeywords;
  const defaultImage = config.seo.ogImage.url;
  const defaultTwitterHandle = config.seo.twitterHandle;

  // Build meta tags
  const metaTags = [
    // Basic
    { name: 'description', content: description || defaultDescription },
    { name: 'keywords', content: keywords || defaultKeywords },
    ...(noIndex ? [{ name: 'robots', content: 'noindex' }] : []),
    ...(noFollow ? [{ name: 'robots', content: 'nofollow' }] : []),
    ...(noIndex && noFollow ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),

    // Open Graph
    { property: 'og:title', content: ogTitle || title || defaultTitle },
    { property: 'og:description', content: ogDescription || description || defaultDescription },
    { property: 'og:url', content: url ? `${siteUrl}${url}` : siteUrl },
    { property: 'og:site_name', content: siteName },
    { property: 'og:type', content: ogType },
    { property: 'og:locale', content: config.seo.locale },
    { property: 'og:image', content: ogImage || image || defaultImage },
    { property: 'og:image:width', content: imageWidth },
    { property: 'og:image:height', content: imageHeight },
    { property: 'og:image:alt', content: ogTitle || title || defaultTitle },

    // Twitter
    { name: 'twitter:card', content: twitterCard },
    { name: 'twitter:title', content: twitterTitle || title || defaultTitle },
    {
      name: 'twitter:description',
      content: twitterDescription || description || defaultDescription,
    },
    { name: 'twitter:image', content: twitterImage || image || defaultImage },
    ...(twitterHandle || defaultTwitterHandle
      ? [{ name: 'twitter:site', content: twitterHandle || defaultTwitterHandle }]
      : []),
  ];

  // Build link tags
  const linkTags = [
    ...(canonical ? [{ rel: 'canonical', href: canonical }] : []),
    ...(url && !canonical ? [{ rel: 'canonical', href: `${siteUrl}${url}` }] : []),
    ...additionalLinkTags,
  ];

  return (
    <>
      <Helmet>
        <title>{title ? `${title} | ${siteName}` : defaultTitle}</title>
        {metaTags.map((tag, index) => {
          if (tag.property) {
            return <meta key={`meta-${index}`} property={tag.property} content={tag.content} />;
          }
          return <meta key={`meta-${index}`} name={tag.name} content={tag.content} />;
        })}
        {linkTags.map((tag, index) => (
          <link key={`link-${index}`} rel={tag.rel} href={tag.href} />
        ))}
        {additionalMetaTags.map((tag, index) => (
          <meta key={`additional-${index}`} {...tag} />
        ))}
        {structuredData && (
          <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        )}
        {children}
      </Helmet>
    </>
  );
};

// Pre-configured SEO components for common page types

export const HomeSEO = () => (
  <SEO
    title="Luxury Real Estate | Premium Properties & Villas"
    description="Discover the finest luxury properties and villas. Elite Real Estate offers premium homes, expert agents, and white-glove service."
    keywords="luxury real estate, premium properties, villas, mansions, real estate agents"
    ogType="website"
  />
);

export const PropertySEO = ({ property }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: property.title,
    description: property.description,
    image: property.images?.[0] || '',
    offers: {
      '@type': 'Offer',
      price: property.price,
      priceCurrency: 'USD',
      availability:
        property.status === 'sold' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
    },
  };

  return (
    <SEO
      title={`${property.title} | ${property.price ? '$' + property.price : ''}`}
      description={property.description?.slice(0, 160)}
      keywords={`${property.title}, ${property.location}, luxury property`}
      image={property.images?.[0]}
      ogType="product"
      structuredData={structuredData}
    />
  );
};

export const BlogSEO = ({ post }) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || post.description,
    image: post.image || '',
    datePublished: post.publishedAt || post.date,
    author: {
      '@type': 'Person',
      name: post.author?.name || 'Elite Real Estate',
    },
  };

  return (
    <SEO
      title={`${post.title} | Real Estate Blog`}
      description={post.excerpt || post.description?.slice(0, 160)}
      keywords={post.tags?.join(', ')}
      image={post.image}
      ogType="article"
      structuredData={structuredData}
    />
  );
};

export const AgentSEO = ({ agent }) => (
  <SEO
    title={`${agent.name} | Real Estate Agent | Elite Real Estate`}
    description={`Contact ${agent.name}, expert real estate agent specializing in luxury properties.`}
    keywords={`real estate agent, ${agent.name}, luxury agent, ${agent.location}`}
    image={agent.image}
    ogType="person"
  />
);

SEO.defaultProps = {
  imageWidth: 1200,
  imageHeight: 630,
  twitterCard: 'summary_large_image',
};

SEO.displayName = 'SEO';

export default SEO;
