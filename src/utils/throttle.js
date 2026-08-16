/**
 * Throttle a function
 * @param {Function} fn - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (fn, limit = 300) => {
  let inThrottle = false;
  let lastFn = null;
  let lastTime = 0;

  return (...args) => {
    const now = Date.now();

    if (!inThrottle) {
      fn(...args);
      lastTime = now;
      inThrottle = true;

      setTimeout(() => {
        inThrottle = false;
        if (lastFn) {
          lastFn();
          lastFn = null;
        }
      }, limit);
    } else {
      lastFn = () => fn(...args);
    }
  };
};

/**
 * Throttle a function with trailing edge
 * @param {Function} fn - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @param {boolean} trailing - Execute on trailing edge
 * @returns {Function} Throttled function
 */
export const throttleWithOptions = (fn, limit = 300, trailing = true) => {
  let waiting = false;
  let lastArgs = null;

  return (...args) => {
    if (!waiting) {
      fn(...args);
      waiting = true;

      setTimeout(() => {
        waiting = false;
        if (trailing && lastArgs) {
          fn(...lastArgs);
          lastArgs = null;
        }
      }, limit);
    } else if (trailing) {
      lastArgs = args;
    }
  };
};

export default throttle;
