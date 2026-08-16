/**
 * Blog Image Assets
 * SVG placeholder images for blog posts
 * Each image is a themed placeholder with blog post context
 */

export const BLOG_IMAGES = {
  'blog-1.webp':
    'data:image/svg+xml;charset=UTF-8,' +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#1a2a3e"/>
      <rect x="0" y="0" width="800" height="600" fill="url(#grad)" opacity="0.3"/>
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#c9a84c;stop-opacity:1"/>
          <stop offset="100%" style="stop-color:#f0e8d0;stop-opacity:1"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <circle cx="400" cy="250" r="60" fill="none" stroke="#c9a84c" stroke-width="3" opacity="0.3"/>
      <circle cx="400" cy="250" r="90" fill="none" stroke="#c9a84c" stroke-width="2" opacity="0.15"/>
      <text x="400" y="240" font-family="Playfair Display, Georgia, serif" font-size="36" font-weight="bold" fill="#c9a84c" text-anchor="middle" filter="url(#glow)">LUXURY</text>
      <text x="400" y="290" font-family="Playfair Display, Georgia, serif" font-size="28" font-weight="bold" fill="#e8d5a3" text-anchor="middle" opacity="0.8">REAL ESTATE</text>
      <text x="400" y="340" font-family="Inter, sans-serif" font-size="14" fill="#a3acba" text-anchor="middle">Elite Real Estate</text>
      <rect x="300" y="370" width="200" height="2" fill="#c9a84c" opacity="0.5"/>
      <text x="400" y="400" font-family="Inter, sans-serif" font-size="12" fill="#66758c" text-anchor="middle">BLOG</text>
    </svg>
  `),

  'blog-2.webp':
    'data:image/svg+xml;charset=UTF-8,' +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#0a1524"/>
      <rect x="0" y="0" width="800" height="600" fill="url(#grad2)" opacity="0.4"/>
      <defs>
        <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#c9a84c;stop-opacity:1"/>
          <stop offset="100%" style="stop-color:#1a2a3e;stop-opacity:1"/>
        </linearGradient>
        <filter id="glow2">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <circle cx="200" cy="200" r="120" fill="#c9a84c" opacity="0.05"/>
      <circle cx="600" cy="400" r="100" fill="#c9a84c" opacity="0.05"/>
      <text x="400" y="240" font-family="Playfair Display, Georgia, serif" font-size="40" font-weight="bold" fill="#c9a84c" text-anchor="middle" filter="url(#glow2)">The Art of</text>
      <text x="400" y="300" font-family="Playfair Display, Georgia, serif" font-size="32" font-weight="bold" fill="#e8d5a3" text-anchor="middle" opacity="0.9">Luxury Living</text>
      <text x="400" y="360" font-family="Inter, sans-serif" font-size="14" fill="#8591a3" text-anchor="middle">Elite Real Estate Blog</text>
      <rect x="320" y="380" width="160" height="2" fill="#c9a84c" opacity="0.4"/>
    </svg>
  `),

  'blog-3.webp':
    'data:image/svg+xml;charset=UTF-8,' +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#1a2a3e"/>
      <rect x="0" y="0" width="800" height="600" fill="url(#grad3)" opacity="0.2"/>
      <defs>
        <linearGradient id="grad3" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#c9a84c;stop-opacity:1"/>
          <stop offset="100%" style="stop-color:#0a1524;stop-opacity:1"/>
        </linearGradient>
        <filter id="glow3">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect x="180" y="180" width="440" height="240" rx="12" fill="none" stroke="#c9a84c" stroke-width="1.5" opacity="0.2"/>
      <text x="400" y="240" font-family="Playfair Display, Georgia, serif" font-size="34" font-weight="bold" fill="#f0e8d0" text-anchor="middle" filter="url(#glow3)">Insights</text>
      <text x="400" y="290" font-family="Playfair Display, Georgia, serif" font-size="26" font-weight="bold" fill="#c9a84c" text-anchor="middle">From the Experts</text>
      <text x="400" y="340" font-family="Inter, sans-serif" font-size="13" fill="#8591a3" text-anchor="middle">Elite Real Estate</text>
      <rect x="330" y="360" width="140" height="2" fill="#c9a84c" opacity="0.3"/>
    </svg>
  `),

  'blog-4.webp':
    'data:image/svg+xml;charset=UTF-8,' +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#0a1524"/>
      <rect x="0" y="0" width="800" height="600" fill="url(#grad4)" opacity="0.3"/>
      <defs>
        <linearGradient id="grad4" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" style="stop-color:#c9a84c;stop-opacity:1"/>
          <stop offset="100%" style="stop-color:#1a2a3e;stop-opacity:1"/>
        </linearGradient>
        <filter id="glow4">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <circle cx="400" cy="300" r="150" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.1"/>
      <circle cx="400" cy="300" r="100" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.15"/>
      <circle cx="400" cy="300" r="50" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.2"/>
      <text x="400" y="280" font-family="Playfair Display, Georgia, serif" font-size="38" font-weight="bold" fill="#c9a84c" text-anchor="middle" filter="url(#glow4)">ELEGANCE</text>
      <text x="400" y="330" font-family="Inter, sans-serif" font-size="16" font-weight="300" fill="#a3acba" text-anchor="middle" letter-spacing="4">REAL ESTATE</text>
    </svg>
  `),

  'blog-5.webp':
    'data:image/svg+xml;charset=UTF-8,' +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#1a2a3e"/>
      <rect x="0" y="0" width="800" height="600" fill="url(#grad5)" opacity="0.25"/>
      <defs>
        <linearGradient id="grad5" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#e8d5a3;stop-opacity:1"/>
          <stop offset="100%" style="stop-color:#0a1524;stop-opacity:1"/>
        </linearGradient>
        <filter id="glow5">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <text x="400" y="230" font-family="Playfair Display, Georgia, serif" font-size="42" font-weight="bold" fill="#c9a84c" text-anchor="middle" filter="url(#glow5)">MODERN</text>
      <text x="400" y="290" font-family="Playfair Display, Georgia, serif" font-size="28" font-weight="bold" fill="#e8d5a3" text-anchor="middle">Luxury Estates</text>
      <text x="400" y="340" font-family="Inter, sans-serif" font-size="13" fill="#8591a3" text-anchor="middle">Elite Real Estate Blog</text>
      <rect x="310" y="360" width="180" height="2" fill="#c9a84c" opacity="0.3"/>
    </svg>
  `),

  'blog-6.webp':
    'data:image/svg+xml;charset=UTF-8,' +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#0a1524"/>
      <rect x="0" y="0" width="800" height="600" fill="url(#grad6)" opacity="0.2"/>
      <defs>
        <linearGradient id="grad6" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a2a3e;stop-opacity:1"/>
          <stop offset="100%" style="stop-color:#c9a84c;stop-opacity:1"/>
        </linearGradient>
        <filter id="glow6">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect x="150" y="150" width="500" height="300" rx="8" fill="none" stroke="#c9a84c" stroke-width="1.5" opacity="0.15"/>
      <text x="400" y="260" font-family="Playfair Display, Georgia, serif" font-size="36" font-weight="bold" fill="#c9a84c" text-anchor="middle" filter="url(#glow6)">EXCLUSIVE</text>
      <text x="400" y="310" font-family="Playfair Display, Georgia, serif" font-size="22" font-weight="bold" fill="#e8d5a3" text-anchor="middle" opacity="0.8">Insights & Trends</text>
      <text x="400" y="370" font-family="Inter, sans-serif" font-size="12" fill="#66758c" text-anchor="middle">Elite Real Estate</text>
    </svg>
  `),

  'blog-7.webp':
    'data:image/svg+xml;charset=UTF-8,' +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#1a2a3e"/>
      <rect x="0" y="0" width="800" height="600" fill="url(#grad7)" opacity="0.3"/>
      <defs>
        <linearGradient id="grad7" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" style="stop-color:#c9a84c;stop-opacity:1"/>
          <stop offset="100%" style="stop-color:#1a2a3e;stop-opacity:1"/>
        </linearGradient>
        <filter id="glow7">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <path d="M200 300 L400 150 L600 300 L400 450 Z" fill="none" stroke="#c9a84c" stroke-width="1.5" opacity="0.15"/>
      <text x="400" y="240" font-family="Playfair Display, Georgia, serif" font-size="34" font-weight="bold" fill="#c9a84c" text-anchor="middle" filter="url(#glow7)">DISCOVER</text>
      <text x="400" y="290" font-family="Playfair Display, Georgia, serif" font-size="26" font-weight="bold" fill="#e8d5a3" text-anchor="middle">Luxury Living</text>
      <text x="400" y="350" font-family="Inter, sans-serif" font-size="12" fill="#8591a3" text-anchor="middle">Elite Real Estate Blog</text>
    </svg>
  `),

  'blog-8.webp':
    'data:image/svg+xml;charset=UTF-8,' +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#0a1524"/>
      <rect x="0" y="0" width="800" height="600" fill="url(#grad8)" opacity="0.2"/>
      <defs>
        <linearGradient id="grad8" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" style="stop-color:#c9a84c;stop-opacity:1"/>
          <stop offset="100%" style="stop-color:#0a1524;stop-opacity:1"/>
        </linearGradient>
        <filter id="glow8">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <circle cx="200" cy="200" r="80" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.1"/>
      <circle cx="600" cy="400" r="80" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.1"/>
      <text x="400" y="250" font-family="Playfair Display, Georgia, serif" font-size="38" font-weight="bold" fill="#c9a84c" text-anchor="middle" filter="url(#glow8)">PRESTIGE</text>
      <text x="400" y="300" font-family="Playfair Display, Georgia, serif" font-size="24" font-weight="bold" fill="#e8d5a3" text-anchor="middle">Real Estate</text>
      <text x="400" y="350" font-family="Inter, sans-serif" font-size="13" fill="#66758c" text-anchor="middle">Elite Real Estate Blog</text>
    </svg>
  `),

  'blog-9.webp':
    'data:image/svg+xml;charset=UTF-8,' +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#1a2a3e"/>
      <rect x="0" y="0" width="800" height="600" fill="url(#grad9)" opacity="0.25"/>
      <defs>
        <linearGradient id="grad9" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#0a1524;stop-opacity:1"/>
          <stop offset="100%" style="stop-color:#c9a84c;stop-opacity:1"/>
        </linearGradient>
        <filter id="glow9">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <text x="400" y="230" font-family="Playfair Display, Georgia, serif" font-size="40" font-weight="bold" fill="#c9a84c" text-anchor="middle" filter="url(#glow9)">ELEGANT</text>
      <text x="400" y="280" font-family="Playfair Display, Georgia, serif" font-size="28" font-weight="bold" fill="#e8d5a3" text-anchor="middle">Luxury Properties</text>
      <text x="400" y="330" font-family="Inter, sans-serif" font-size="13" fill="#8591a3" text-anchor="middle">Elite Real Estate Blog</text>
      <rect x="310" y="350" width="180" height="2" fill="#c9a84c" opacity="0.3"/>
    </svg>
  `),

  'blog-10.webp':
    'data:image/svg+xml;charset=UTF-8,' +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#0a1524"/>
      <rect x="0" y="0" width="800" height="600" fill="url(#grad10)" opacity="0.3"/>
      <defs>
        <linearGradient id="grad10" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" style="stop-color:#e8d5a3;stop-opacity:1"/>
          <stop offset="100%" style="stop-color:#0a1524;stop-opacity:1"/>
        </linearGradient>
        <filter id="glow10">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect x="160" y="160" width="480" height="280" rx="12" fill="none" stroke="#c9a84c" stroke-width="1.5" opacity="0.15"/>
      <text x="400" y="250" font-family="Playfair Display, Georgia, serif" font-size="36" font-weight="bold" fill="#c9a84c" text-anchor="middle" filter="url(#glow10)">BEYOND</text>
      <text x="400" y="300" font-family="Playfair Display, Georgia, serif" font-size="26" font-weight="bold" fill="#e8d5a3" text-anchor="middle">Luxury Living</text>
      <text x="400" y="360" font-family="Inter, sans-serif" font-size="12" fill="#66758c" text-anchor="middle">Elite Real Estate Blog</text>
    </svg>
  `),

  'blog-11.webp':
    'data:image/svg+xml;charset=UTF-8,' +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#1a2a3e"/>
      <rect x="0" y="0" width="800" height="600" fill="url(#grad11)" opacity="0.2"/>
      <defs>
        <linearGradient id="grad11" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#c9a84c;stop-opacity:1"/>
          <stop offset="100%" style="stop-color:#1a2a3e;stop-opacity:1"/>
        </linearGradient>
        <filter id="glow11">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <text x="400" y="240" font-family="Playfair Display, Georgia, serif" font-size="38" font-weight="bold" fill="#c9a84c" text-anchor="middle" filter="url(#glow11)">TIMELESS</text>
      <text x="400" y="290" font-family="Playfair Display, Georgia, serif" font-size="28" font-weight="bold" fill="#e8d5a3" text-anchor="middle">Real Estate</text>
      <text x="400" y="340" font-family="Inter, sans-serif" font-size="13" fill="#8591a3" text-anchor="middle">Elite Real Estate Blog</text>
      <rect x="310" y="360" width="180" height="2" fill="#c9a84c" opacity="0.3"/>
    </svg>
  `),

  'blog-12.webp':
    'data:image/svg+xml;charset=UTF-8,' +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <rect width="800" height="600" fill="#0a1524"/>
      <rect x="0" y="0" width="800" height="600" fill="url(#grad12)" opacity="0.25"/>
      <defs>
        <linearGradient id="grad12" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#c9a84c;stop-opacity:1"/>
          <stop offset="100%" style="stop-color:#0a1524;stop-opacity:1"/>
        </linearGradient>
        <filter id="glow12">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <circle cx="200" cy="300" r="120" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.08"/>
      <circle cx="600" cy="300" r="120" fill="none" stroke="#c9a84c" stroke-width="1" opacity="0.08"/>
      <text x="400" y="250" font-family="Playfair Display, Georgia, serif" font-size="34" font-weight="bold" fill="#c9a84c" text-anchor="middle" filter="url(#glow12)">INSPIRED</text>
      <text x="400" y="300" font-family="Playfair Display, Georgia, serif" font-size="26" font-weight="bold" fill="#e8d5a3" text-anchor="middle">Luxury Estates</text>
      <text x="400" y="350" font-family="Inter, sans-serif" font-size="13" fill="#66758c" text-anchor="middle">Elite Real Estate Blog</text>
    </svg>
  `),
};

/**
 * Get blog image by number or name
 * @param {string|number} identifier - Blog image identifier (1-12 or filename)
 * @returns {string} SVG data URI
 */
export const getBlogImage = (identifier) => {
  if (typeof identifier === 'number') {
    const key = `blog-${identifier}.webp`;
    return BLOG_IMAGES[key] || BLOG_IMAGES['blog-1.webp'];
  }
  return BLOG_IMAGES[identifier] || BLOG_IMAGES['blog-1.webp'];
};

/**
 * Get all blog image paths
 * @returns {string[]} Array of image paths
 */
export const getBlogImagePaths = () => {
  return Object.keys(BLOG_IMAGES);
};

export default BLOG_IMAGES;
