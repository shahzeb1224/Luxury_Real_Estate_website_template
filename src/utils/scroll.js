/**
 * Scroll utilities
 * Smooth scrolling, position detection, and scroll management
 */

/**
 * Scroll to a specific element
 * @param {string|HTMLElement} target - Element selector or element
 * @param {object} options - Scroll options
 * @param {number} options.offset - Offset from top in pixels
 * @param {string} options.behavior - Scroll behavior ('smooth' | 'auto')
 * @param {number} options.duration - Scroll duration in ms (for custom smooth)
 * @returns {Promise} Resolves when scroll is complete
 */
export const scrollToElement = (target, options = {}) => {
  return new Promise((resolve) => {
    const { offset = 0, behavior = 'smooth', duration = 500 } = options;

    // Get element
    const element = typeof target === 'string' ? document.querySelector(target) : target;

    if (!element) {
      resolve(false);
      return;
    }

    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetPosition = rect.top + scrollTop - offset;

    // Check if native smooth scroll is supported
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: targetPosition,
        behavior: behavior,
      });
      setTimeout(resolve, behavior === 'smooth' ? duration : 0);
    } else {
      // Fallback for browsers without smooth scroll support
      const startPosition = scrollTop;
      const distance = targetPosition - startPosition;
      const startTime = performance.now();

      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        const currentPosition = startPosition + distance * ease;

        window.scrollTo(0, currentPosition);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          resolve(true);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  });
};

/**
 * Scroll to top of page
 * @param {object} options - Scroll options
 * @param {string} options.behavior - Scroll behavior
 * @param {number} options.duration - Scroll duration
 * @returns {Promise} Resolves when scroll is complete
 */
export const scrollToTop = (options = {}) => {
  const { behavior = 'smooth', duration = 400 } = options;
  return scrollToElement(document.documentElement, { offset: 0, behavior, duration });
};

/**
 * Get current scroll position
 * @returns {object} { x, y, progress }
 */
export const getScrollPosition = () => {
  const x = window.pageXOffset || document.documentElement.scrollLeft;
  const y = window.pageYOffset || document.documentElement.scrollTop;
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxY > 0 ? y / maxY : 0;

  return { x, y, progress, maxY };
};

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @param {number} offset - Offset in pixels
 * @returns {boolean} True if in viewport
 */
export const isElementInViewport = (element, offset = 0) => {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const isVisible =
    rect.top < windowHeight - offset &&
    rect.bottom > offset &&
    rect.left < windowWidth - offset &&
    rect.right > offset;

  return isVisible;
};

/**
 * Get element offset from top
 * @param {HTMLElement} element - Element to get offset
 * @returns {number} Offset from top
 */
export const getElementOffset = (element) => {
  if (!element) return 0;
  const rect = element.getBoundingClientRect();
  return rect.top + (window.pageYOffset || document.documentElement.scrollTop);
};

/**
 * Smooth scroll easing functions
 */
const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

/**
 * Lock scroll on body (for modals, etc.)
 * @param {boolean} lock - Lock or unlock
 */
export const lockScroll = (lock = true) => {
  const body = document.body;
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  if (lock) {
    const scrollY = window.scrollY;
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.overflow = 'hidden';
    body.style.paddingRight = `${scrollbarWidth}px`;
  } else {
    const scrollY = parseInt(body.style.top || '0') * -1;
    body.style.position = '';
    body.style.top = '';
    body.style.left = '';
    body.style.right = '';
    body.style.overflow = '';
    body.style.paddingRight = '';
    window.scrollTo(0, scrollY);
  }
};

/**
 * Throttled scroll event listener
 * @param {Function} callback - Function to call on scroll
 * @param {number} throttle - Throttle in ms
 * @returns {Function} Cleanup function
 */
export const onScroll = (callback, throttle = 100) => {
  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        callback(getScrollPosition());
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};

/**
 * Scroll utilities object
 */
const scrollUtils = {
  to: scrollToElement,
  toTop: scrollToTop,
  getPosition: getScrollPosition,
  isInViewport: isElementInViewport,
  getOffset: getElementOffset,
  lock: lockScroll,
  on: onScroll,
};

export default scrollUtils;
