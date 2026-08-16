/**
 * Helper Functions
 * Common utilities used across the application
 */

/**
 * Deep clone an object or array
 * @param {any} obj - Object to clone
 * @returns {any} Cloned object
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 * @param {any} value - Value to check
 * @returns {boolean} True if empty
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Check if value is a valid JavaScript object
 * @param {any} value - Value to check
 * @returns {boolean} True if object
 */
export const isObject = (value) => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

/**
 * Check if value is a function
 * @param {any} value - Value to check
 * @returns {boolean} True if function
 */
export const isFunction = (value) => {
  return typeof value === 'function';
};

/**
 * Check if value is a string
 * @param {any} value - Value to check
 * @returns {boolean} True if string
 */
export const isString = (value) => {
  return typeof value === 'string' || value instanceof String;
};

/**
 * Check if value is a number
 * @param {any} value - Value to check
 * @returns {boolean} True if number
 */
export const isNumber = (value) => {
  return typeof value === 'number' && !isNaN(value);
};

/**
 * Check if value is an array
 * @param {any} value - Value to check
 * @returns {boolean} True if array
 */
export const isArray = (value) => {
  return Array.isArray(value);
};

/**
 * Get nested property from object using dot notation
 * @param {object} obj - Object to search
 * @param {string} path - Dot notation path (e.g., 'user.profile.name')
 * @param {any} defaultValue - Default value if not found
 * @returns {any} Property value or default
 */
export const getNestedValue = (obj, path, defaultValue = undefined) => {
  if (!obj || typeof obj !== 'object') return defaultValue;
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return defaultValue;
    }
    current = current[key];
  }
  return current !== undefined ? current : defaultValue;
};

/**
 * Set nested property using dot notation
 * @param {object} obj - Object to modify
 * @param {string} path - Dot notation path
 * @param {any} value - Value to set
 * @returns {object} Modified object
 */
export const setNestedValue = (obj, path, value) => {
  if (!obj || typeof obj !== 'object') return obj;
  const keys = path.split('.');
  const lastKey = keys.pop();
  let current = obj;
  for (const key of keys) {
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    current = current[key];
  }
  current[lastKey] = value;
  return obj;
};

/**
 * Group array items by key
 * @param {Array} array - Array to group
 * @param {string} key - Key to group by
 * @returns {object} Grouped object
 */
export const groupBy = (array, key) => {
  if (!Array.isArray(array)) return {};
  return array.reduce((result, item) => {
    const groupKey = item[key];
    if (groupKey === undefined || groupKey === null) return result;
    if (!result[groupKey]) result[groupKey] = [];
    result[groupKey].push(item);
    return result;
  }, {});
};

/**
 * Sort array by key
 * @param {Array} array - Array to sort
 * @param {string} key - Key to sort by
 * @param {string} order - 'asc' or 'desc'
 * @returns {Array} Sorted array
 */
export const sortBy = (array, key, order = 'asc') => {
  if (!Array.isArray(array)) return [];
  const sorted = [...array];
  sorted.sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    if (aVal === bVal) return 0;
    if (order === 'asc') return aVal < bVal ? -1 : 1;
    return aVal > bVal ? -1 : 1;
  });
  return sorted;
};

/**
 * Convert array of objects to map by key
 * @param {Array} array - Array to convert
 * @param {string} key - Key to use as map key
 * @returns {object} Map object
 */
export const toMap = (array, key) => {
  if (!Array.isArray(array)) return {};
  return array.reduce((result, item) => {
    const mapKey = item[key];
    if (mapKey !== undefined && mapKey !== null) {
      result[mapKey] = item;
    }
    return result;
  }, {});
};

/**
 * Pick specific keys from object
 * @param {object} obj - Source object
 * @param {string[]} keys - Keys to pick
 * @returns {object} New object with picked keys
 */
export const pick = (obj, keys) => {
  if (!obj || typeof obj !== 'object') return {};
  return keys.reduce((result, key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
    return result;
  }, {});
};

/**
 * Omit specific keys from object
 * @param {object} obj - Source object
 * @param {string[]} keys - Keys to omit
 * @returns {object} New object without omitted keys
 */
export const omit = (obj, keys) => {
  if (!obj || typeof obj !== 'object') return {};
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
};

/**
 * Debounced promise wrapper
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debouncePromise = (fn, delay = 300) => {
  let timeoutId = null;
  return (...args) => {
    clearTimeout(timeoutId);
    return new Promise((resolve, reject) => {
      timeoutId = setTimeout(() => {
        Promise.resolve(fn(...args))
          .then(resolve)
          .catch(reject);
      }, delay);
    });
  };
};

/**
 * Sleep for specified duration
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Promise that resolves after delay
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generate random ID
 * @param {number} length - Length of ID (default: 8)
 * @returns {string} Random ID
 */
export const generateId = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str || typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Truncate string to max length
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated string
 */
export const truncate = (str, maxLength, suffix = '...') => {
  if (!str || typeof str !== 'string') return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + suffix;
};

export default {
  deepClone,
  isEmpty,
  isObject,
  isFunction,
  isString,
  isNumber,
  isArray,
  getNestedValue,
  setNestedValue,
  groupBy,
  sortBy,
  toMap,
  pick,
  omit,
  debouncePromise,
  sleep,
  generateId,
  capitalize,
  truncate,
};
