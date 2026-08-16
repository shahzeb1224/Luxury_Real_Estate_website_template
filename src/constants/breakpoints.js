/**
 * Breakpoint System
 * Mobile-first approach with consistent naming
 */

export const breakpoints = {
  /**
   * Breakpoint values in pixels
   */
  values: {
    xs: 480,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
    '3xl': 1920,
  },

  /**
   * Breakpoint values in rem (based on 16px root font size)
   */
  valuesInRem: {
    xs: '30rem', // 480px
    sm: '40rem', // 640px
    md: '48rem', // 768px
    lg: '64rem', // 1024px
    xl: '80rem', // 1280px
    '2xl': '96rem', // 1536px
    '3xl': '120rem', // 1920px
  },

  /**
   * Media Query Strings (min-width)
   */
  min: {
    xs: '@media (min-width: 480px)',
    sm: '@media (min-width: 640px)',
    md: '@media (min-width: 768px)',
    lg: '@media (min-width: 1024px)',
    xl: '@media (min-width: 1280px)',
    '2xl': '@media (min-width: 1536px)',
    '3xl': '@media (min-width: 1920px)',
  },

  /**
   * Media Query Strings (max-width)
   */
  max: {
    xs: '@media (max-width: 479px)',
    sm: '@media (max-width: 639px)',
    md: '@media (max-width: 767px)',
    lg: '@media (max-width: 1023px)',
    xl: '@media (max-width: 1279px)',
    '2xl': '@media (max-width: 1535px)',
    '3xl': '@media (max-width: 1919px)',
  },

  /**
   * Media Query Strings (min and max)
   */
  between: {
    xsSm: '@media (min-width: 480px) and (max-width: 639px)',
    smMd: '@media (min-width: 640px) and (max-width: 767px)',
    mdLg: '@media (min-width: 768px) and (max-width: 1023px)',
    lgXl: '@media (min-width: 1024px) and (max-width: 1279px)',
    xl2xl: '@media (min-width: 1280px) and (max-width: 1535px)',
  },

  /**
   * Device-specific media queries
   */
  device: {
    mobile: '@media (max-width: 767px)',
    tablet: '@media (min-width: 768px) and (max-width: 1023px)',
    desktop: '@media (min-width: 1024px)',
    large: '@media (min-width: 1280px)',
    ultra: '@media (min-width: 1536px)',
  },

  /**
   * Orientation-specific
   */
  orientation: {
    portrait: '@media (orientation: portrait)',
    landscape: '@media (orientation: landscape)',
  },

  /**
   * Dark mode
   */
  darkMode: '@media (prefers-color-scheme: dark)',
  lightMode: '@media (prefers-color-scheme: light)',

  /**
   * Reduced motion
   */
  reducedMotion: '@media (prefers-reduced-motion: reduce)',
};

/**
 * Helper functions
 */
export const getMediaQuery = (breakpoint, type = 'min') => {
  const value = breakpoints.values[breakpoint];
  if (!value) return null;
  return type === 'min' ? `(min-width: ${value}px)` : `(max-width: ${value - 1}px)`;
};

export const getDeviceType = (width) => {
  if (width < breakpoints.values.md) return 'mobile';
  if (width < breakpoints.values.lg) return 'tablet';
  if (width < breakpoints.values.xl) return 'desktop';
  return 'large';
};

export const isMobile = (width) => width < breakpoints.values.md;
export const isTablet = (width) => width >= breakpoints.values.md && width < breakpoints.values.lg;
export const isDesktop = (width) => width >= breakpoints.values.lg;

export default breakpoints;
