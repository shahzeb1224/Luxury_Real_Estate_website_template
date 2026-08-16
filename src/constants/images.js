export const IMAGE_SIZES = {
  // Home page
  hero: { width: 1920, height: 1080, quality: 80 },
  propertyCard: { width: 600, height: 400, quality: 75 },
  propertyCardMobile: { width: 400, height: 300, quality: 70 },
  agentCard: { width: 400, height: 400, quality: 75 },
  locationCard: { width: 600, height: 400, quality: 75 },
  blogCard: { width: 800, height: 450, quality: 75 },
  testimonial: { width: 100, height: 100, quality: 70 },
  partnerLogo: { width: 200, height: 100, quality: 65 },
};

export const IMAGE_FORMATS = {
  modern: ['webp', 'avif'],
  fallback: ['jpeg', 'png'],
};

export const getImageUrl = (path, options = {}) => {
  const { width, height, quality = 80, format = 'webp' } = options;

  // Use a CDN or image optimization service
  // Example with Cloudinary:
  // return `https://cdn.eliterealestate.com/${path}?w=${width}&h=${height}&q=${quality}&f=${format}`;

  // Fallback: return path with query params
  const params = new URLSearchParams();
  if (width) params.set('w', width);
  if (height) params.set('h', height);
  if (quality) params.set('q', quality);
  if (format) params.set('f', format);

  return `${path}${params.toString() ? '?' + params.toString() : ''}`;
};
