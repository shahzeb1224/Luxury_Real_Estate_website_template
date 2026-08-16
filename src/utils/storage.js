/**
 * Storage utilities with type safety and error handling
 * Supports local, session, and cookie storage
 */

import config from '@/constants/config';

const storageType = {
  local: 'localStorage',
  session: 'sessionStorage',
};

/**
 * Get storage instance
 * @param {string} type - 'local' or 'session'
 * @returns {Storage} Storage instance
 */
const getStorage = (type = 'local') => {
  const storage = type === 'session' ? sessionStorage : localStorage;
  return storage;
};

/**
 * Set item in storage
 * @param {string} key - Storage key
 * @param {any} value - Value to store
 * @param {string} type - 'local' or 'session'
 * @returns {boolean} Success indicator
 */
export const setItem = (key, value, type = 'local') => {
  try {
    const storage = getStorage(type);
    const serialized = JSON.stringify(value);
    storage.setItem(key, serialized);
    return true;
  } catch (error) {
    console.error(`Storage: Failed to set item "${key}"`, error);
    return false;
  }
};

/**
 * Get item from storage
 * @param {string} key - Storage key
 * @param {any} defaultValue - Default value if not found
 * @param {string} type - 'local' or 'session'
 * @returns {any} Stored value or default
 */
export const getItem = (key, defaultValue = null, type = 'local') => {
  try {
    const storage = getStorage(type);
    const item = storage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item);
  } catch (error) {
    console.error(`Storage: Failed to get item "${key}"`, error);
    return defaultValue;
  }
};

/**
 * Remove item from storage
 * @param {string} key - Storage key
 * @param {string} type - 'local' or 'session'
 * @returns {boolean} Success indicator
 */
export const removeItem = (key, type = 'local') => {
  try {
    const storage = getStorage(type);
    storage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Storage: Failed to remove item "${key}"`, error);
    return false;
  }
};

/**
 * Clear all storage
 * @param {string} type - 'local' or 'session'
 * @returns {boolean} Success indicator
 */
export const clear = (type = 'local') => {
  try {
    const storage = getStorage(type);
    storage.clear();
    return true;
  } catch (error) {
    console.error(`Storage: Failed to clear ${type} storage`, error);
    return false;
  }
};

/**
 * Check if key exists in storage
 * @param {string} key - Storage key
 * @param {string} type - 'local' or 'session'
 * @returns {boolean} True if exists
 */
export const hasItem = (key, type = 'local') => {
  try {
    const storage = getStorage(type);
    return storage.getItem(key) !== null;
  } catch (error) {
    console.error(`Storage: Failed to check item "${key}"`, error);
    return false;
  }
};

/**
 * Get all keys from storage
 * @param {string} type - 'local' or 'session'
 * @returns {string[]} Array of keys
 */
export const getKeys = (type = 'local') => {
  try {
    const storage = getStorage(type);
    return Object.keys(storage);
  } catch (error) {
    console.error(`Storage: Failed to get keys from ${type} storage`, error);
    return [];
  }
};

/**
 * Set cookie
 * @param {string} key - Cookie key
 * @param {any} value - Cookie value
 * @param {number} days - Expiration in days
 * @param {string} path - Cookie path
 * @returns {boolean} Success indicator
 */
export const setCookie = (key, value, days = config.cookies.defaultExpiry, path = '/') => {
  try {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    const cookieString = `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}; expires=${expires.toUTCString()}; path=${path}; SameSite=Lax`;
    document.cookie = cookieString;
    return true;
  } catch (error) {
    console.error(`Storage: Failed to set cookie "${key}"`, error);
    return false;
  }
};

/**
 * Get cookie
 * @param {string} key - Cookie key
 * @param {any} defaultValue - Default value if not found
 * @returns {any} Cookie value or default
 */
export const getCookie = (key, defaultValue = null) => {
  try {
    const name = encodeURIComponent(key);
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieKey, cookieValue] = cookie.trim().split('=');
      if (cookieKey === name) {
        return JSON.parse(decodeURIComponent(cookieValue));
      }
    }
    return defaultValue;
  } catch (error) {
    console.error(`Storage: Failed to get cookie "${key}"`, error);
    return defaultValue;
  }
};

/**
 * Remove cookie
 * @param {string} key - Cookie key
 * @param {string} path - Cookie path
 * @returns {boolean} Success indicator
 */
export const removeCookie = (key, path = '/') => {
  try {
    const expires = new Date(0);
    document.cookie = `${encodeURIComponent(key)}=; expires=${expires.toUTCString()}; path=${path}`;
    return true;
  } catch (error) {
    console.error(`Storage: Failed to remove cookie "${key}"`, error);
    return false;
  }
};

/**
 * Storage utility object
 */
const storage = {
  local: {
    set: (key, value) => setItem(key, value, 'local'),
    get: (key, defaultValue) => getItem(key, defaultValue, 'local'),
    remove: (key) => removeItem(key, 'local'),
    has: (key) => hasItem(key, 'local'),
    keys: () => getKeys('local'),
    clear: () => clear('local'),
  },
  session: {
    set: (key, value) => setItem(key, value, 'session'),
    get: (key, defaultValue) => getItem(key, defaultValue, 'session'),
    remove: (key) => removeItem(key, 'session'),
    has: (key) => hasItem(key, 'session'),
    keys: () => getKeys('session'),
    clear: () => clear('session'),
  },
  cookie: {
    set: setCookie,
    get: getCookie,
    remove: removeCookie,
  },
};

export default storage;
