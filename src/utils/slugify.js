/**
 * Slugify utility functions
 * Convert strings to URL-friendly slugs
 */

/**
 * Convert string to URL-friendly slug
 * @param {string} string - String to slugify
 * @param {object} options - Slugify options
 * @param {string} options.separator - Separator character (default: '-')
 * @param {boolean} options.lowercase - Convert to lowercase (default: true)
 * @param {boolean} options.trim - Trim whitespace (default: true)
 * @param {string[]} options.replacements - Custom character replacements
 * @returns {string} Slugified string
 */
export const slugify = (string, options = {}) => {
  const { separator = '-', lowercase = true, trim = true, replacements = {} } = options;

  if (!string || typeof string !== 'string') return '';

  let slug = string;

  // Custom replacements
  if (replacements && typeof replacements === 'object') {
    for (const [key, value] of Object.entries(replacements)) {
      slug = slug.replace(new RegExp(key, 'g'), value);
    }
  }

  // Convert to lowercase
  if (lowercase) {
    slug = slug.toLowerCase();
  }

  // Remove accents/diacritics
  const diacritics = {
    a: /[àáâãäåāăą]/g,
    ae: /[æ]/g,
    c: /[çćĉċč]/g,
    d: /[đď]/g,
    e: /[èéêëēĕėęě]/g,
    g: /[ĝğġģ]/g,
    h: /[ĥħ]/g,
    i: /[ìíîïĩīĭįı]/g,
    j: /[ĵ]/g,
    k: /[ķĸ]/g,
    l: /[ĺļľŀł]/g,
    n: /[ñńņňŉ]/g,
    o: /[òóôõöøōŏő]/g,
    oe: /[œ]/g,
    r: /[ŕŗř]/g,
    s: /[śŝşš]/g,
    t: /[ţťŧ]/g,
    u: /[ùúûüũūŭůűų]/g,
    w: /[ŵ]/g,
    y: /[ýŷÿ]/g,
    z: /[źżž]/g,
    ss: /[ß]/g,
  };

  for (const [ascii, pattern] of Object.entries(diacritics)) {
    slug = slug.replace(pattern, ascii);
  }

  // Remove special characters
  slug = slug.replace(/[^a-z0-9\s-]/g, '');

  // Replace spaces with separator
  slug = slug.replace(/\s+/g, separator);

  // Remove multiple separators
  slug = slug.replace(new RegExp(`${separator}+`, 'g'), separator);

  // Trim separators from ends
  if (trim) {
    slug = slug.replace(new RegExp(`^${separator}|${separator}$`, 'g'), '');
  }

  return slug;
};

/**
 * Generate slug with random suffix (for uniqueness)
 * @param {string} string - String to slugify
 * @param {number} length - Length of random suffix (default: 6)
 * @param {object} options - Slugify options
 * @returns {string} Slug with random suffix
 */
export const slugifyWithRandom = (string, length = 6, options = {}) => {
  if (!string || typeof string !== 'string') return '';

  const slug = slugify(string, options);
  const random = Math.random()
    .toString(36)
    .substring(2, 2 + length);
  return `${slug}-${random}`;
};

/**
 * Generate slug with ID suffix
 * @param {string} string - String to slugify
 * @param {string|number} id - ID to append
 * @param {object} options - Slugify options
 * @returns {string} Slug with ID suffix
 */
export const slugifyWithId = (string, id, options = {}) => {
  if (!string || typeof string !== 'string') return '';
  const slug = slugify(string, options);
  return `${slug}-${id}`;
};

/**
 * Check if string is a valid slug
 * @param {string} string - String to check
 * @param {object} options - Slugify options
 * @returns {boolean} True if valid slug
 */
export const isValidSlug = (string, options = {}) => {
  const { separator = '-' } = options;
  if (!string || typeof string !== 'string') return false;
  const pattern = new RegExp(`^[a-z0-9]+(?:${separator}[a-z0-9]+)*$`);
  return pattern.test(string);
};

/**
 * Normalize a string for comparison (e.g., for search)
 * @param {string} string - String to normalize
 * @param {object} options - Normalize options
 * @returns {string} Normalized string
 */
export const normalizeForComparison = (string, options = {}) => {
  const { separator = ' ', lowercase = true } = options;
  if (!string || typeof string !== 'string') return '';

  let normalized = string;

  // Remove accents/diacritics
  const diacritics = {
    a: /[àáâãäåāăą]/g,
    ae: /[æ]/g,
    c: /[çćĉċč]/g,
    d: /[đď]/g,
    e: /[èéêëēĕėęě]/g,
    g: /[ĝğġģ]/g,
    h: /[ĥħ]/g,
    i: /[ìíîïĩīĭįı]/g,
    j: /[ĵ]/g,
    k: /[ķĸ]/g,
    l: /[ĺļľŀł]/g,
    n: /[ñńņňŉ]/g,
    o: /[òóôõöøōŏő]/g,
    oe: /[œ]/g,
    r: /[ŕŗř]/g,
    s: /[śŝşš]/g,
    t: /[ţťŧ]/g,
    u: /[ùúûüũūŭůűų]/g,
    w: /[ŵ]/g,
    y: /[ýŷÿ]/g,
    z: /[źżž]/g,
    ss: /[ß]/g,
  };

  for (const [ascii, pattern] of Object.entries(diacritics)) {
    normalized = normalized.replace(pattern, ascii);
  }

  // Remove special characters
  normalized = normalized.replace(/[^a-zA-Z0-9\s]/g, '');

  // Convert to lowercase
  if (lowercase) {
    normalized = normalized.toLowerCase();
  }

  // Replace multiple spaces with single
  normalized = normalized.replace(/\s+/g, separator);

  // Trim
  normalized = normalized.trim();

  return normalized;
};

/**
 * Slug utilities object
 */
const slugUtils = {
  slugify,
  slugifyWithRandom,
  slugifyWithId,
  isValidSlug,
  normalizeForComparison,
};

export default slugUtils;
