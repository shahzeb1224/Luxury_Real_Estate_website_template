export const generateCanonical = (path) => {
  const baseUrl = import.meta.env.VITE_SITE_URL || 'https://eliterealestate.com';
  return `${baseUrl}${path}`;
};

export const generateMetaTags = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
}) => {
  const siteTitle = 'Elite Luxury Real Estate';
  const siteDescription = 'Premium luxury properties and real estate services.';

  return {
    title: title ? `${title} | ${siteTitle}` : siteTitle,
    description: description || siteDescription,
    keywords: keywords || 'luxury real estate, premium properties, luxury homes',
    og: {
      title: title || siteTitle,
      description: description || siteDescription,
      url: url || '/',
      type,
      image: image || '/images/og-image.jpg',
    },
    twitter: {
      card: 'summary_large_image',
      title: title || siteTitle,
      description: description || siteDescription,
      image: image || '/images/og-image.jpg',
    },
  };
};
