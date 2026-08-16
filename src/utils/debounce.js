/**
 * Debounce a function
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (fn, delay = 300) => {
  let timeoutId = null;

  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
};

/**
 * Debounce a function with leading edge option
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @param {boolean} leading - Execute on leading edge
 * @returns {Function} Debounced function
 */
export const debounceWithOptions = (fn, delay = 300, leading = false) => {
  let timeoutId = null;
  let lastCall = 0;

  return (...args) => {
    const now = Date.now();

    if (leading && now - lastCall >= delay) {
      fn(...args);
      lastCall = now;
      return;
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
      lastCall = Date.now();
    }, delay);
  };
};

export default debounce;
