/**
 * Typography System - Luxury Real Estate Platform
 * Playfair Display for elegance and sophistication
 * Inter for readability and modern feel
 */

export const typography = {
  /**
   * Font Families
   */
  fontFamily: {
    /**
     * Primary: Playfair Display - Serif, elegant, editorial
     * Used for headings, hero text, and premium elements
     */
    primary: {
      name: 'Playfair Display',
      fallback: 'Georgia, serif',
      stack: '"Playfair Display", Georgia, serif',
    },
    /**
     * Secondary: Inter - Sans-serif, clean, highly readable
     * Used for body text, UI elements, and navigation
     */
    secondary: {
      name: 'Inter',
      fallback: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      stack: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    /**
     * Accent: Cinzel - Decorative serif for special elements
     * Used sparingly for awards, badges, and decorative text
     */
    accent: {
      name: 'Cinzel',
      fallback: 'Georgia, serif',
      stack: 'Cinzel, Georgia, serif',
    },
  },

  /**
   * Font Sizes
   * Responsive scale that maintains readability across devices
   */
  fontSize: {
    xs: {
      mobile: '12px',
      desktop: '12px',
      lineHeight: '16px',
    },
    sm: {
      mobile: '14px',
      desktop: '14px',
      lineHeight: '20px',
    },
    base: {
      mobile: '16px',
      desktop: '16px',
      lineHeight: '24px',
    },
    lg: {
      mobile: '18px',
      desktop: '18px',
      lineHeight: '28px',
    },
    xl: {
      mobile: '20px',
      desktop: '20px',
      lineHeight: '28px',
    },
    '2xl': {
      mobile: '24px',
      desktop: '24px',
      lineHeight: '32px',
    },
    '3xl': {
      mobile: '28px',
      desktop: '30px',
      lineHeight: '36px',
    },
    '4xl': {
      mobile: '32px',
      desktop: '36px',
      lineHeight: '40px',
    },
    '5xl': {
      mobile: '36px',
      desktop: '48px',
      lineHeight: '48px',
    },
    '6xl': {
      mobile: '40px',
      desktop: '60px',
      lineHeight: '60px',
    },
    '7xl': {
      mobile: '48px',
      desktop: '72px',
      lineHeight: '72px',
    },
    '8xl': {
      mobile: '56px',
      desktop: '96px',
      lineHeight: '96px',
    },
  },

  /**
   * Font Weights
   */
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  /**
   * Line Heights
   */
  lineHeight: {
    none: 1,
    tight: 1.1,
    snug: 1.25,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  /**
   * Letter Spacing
   */
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
    wider: '0.05em',
    widest: '0.1em',
  },

  /**
   * Text Styles
   */
  textStyles: {
    /**
     * Display - Hero level typography
     */
    display: {
      xxl: {
        fontFamily: 'primary',
        fontWeight: 700,
        fontSize: '8xl',
        lineHeight: 'tight',
        letterSpacing: 'tighter',
        mobileSize: '5xl',
      },
      xl: {
        fontFamily: 'primary',
        fontWeight: 700,
        fontSize: '7xl',
        lineHeight: 'tight',
        letterSpacing: 'tight',
        mobileSize: '4xl',
      },
      lg: {
        fontFamily: 'primary',
        fontWeight: 700,
        fontSize: '6xl',
        lineHeight: 'tight',
        letterSpacing: 'tight',
        mobileSize: '3xl',
      },
      md: {
        fontFamily: 'primary',
        fontWeight: 700,
        fontSize: '5xl',
        lineHeight: 'snug',
        letterSpacing: 'tight',
        mobileSize: '2xl',
      },
    },

    /**
     * Headings - Section and page titles
     */
    heading: {
      h1: {
        fontFamily: 'primary',
        fontWeight: 700,
        fontSize: '4xl',
        lineHeight: 'snug',
        letterSpacing: 'tight',
        mobileSize: '2xl',
      },
      h2: {
        fontFamily: 'primary',
        fontWeight: 600,
        fontSize: '3xl',
        lineHeight: 'snug',
        letterSpacing: 'tight',
        mobileSize: 'xl',
      },
      h3: {
        fontFamily: 'primary',
        fontWeight: 600,
        fontSize: '2xl',
        lineHeight: 'snug',
        letterSpacing: 'normal',
        mobileSize: 'lg',
      },
      h4: {
        fontFamily: 'primary',
        fontWeight: 600,
        fontSize: 'xl',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        mobileSize: 'base',
      },
      h5: {
        fontFamily: 'secondary',
        fontWeight: 600,
        fontSize: 'lg',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        mobileSize: 'base',
      },
      h6: {
        fontFamily: 'secondary',
        fontWeight: 600,
        fontSize: 'base',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        mobileSize: 'sm',
      },
    },

    /**
     * Body Text
     */
    body: {
      large: {
        fontFamily: 'secondary',
        fontWeight: 400,
        fontSize: 'lg',
        lineHeight: 'relaxed',
        letterSpacing: 'normal',
        mobileSize: 'base',
      },
      base: {
        fontFamily: 'secondary',
        fontWeight: 400,
        fontSize: 'base',
        lineHeight: 'relaxed',
        letterSpacing: 'normal',
        mobileSize: 'base',
      },
      small: {
        fontFamily: 'secondary',
        fontWeight: 400,
        fontSize: 'sm',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        mobileSize: 'sm',
      },
      caption: {
        fontFamily: 'secondary',
        fontWeight: 400,
        fontSize: 'xs',
        lineHeight: 'normal',
        letterSpacing: 'wide',
        mobileSize: 'xs',
      },
    },

    /**
     * UI Elements
     */
    ui: {
      label: {
        fontFamily: 'secondary',
        fontWeight: 500,
        fontSize: 'sm',
        lineHeight: 'normal',
        letterSpacing: 'wide',
        textTransform: 'uppercase',
      },
      button: {
        fontFamily: 'secondary',
        fontWeight: 600,
        fontSize: 'base',
        lineHeight: 'none',
        letterSpacing: 'wide',
      },
      navigation: {
        fontFamily: 'secondary',
        fontWeight: 500,
        fontSize: 'sm',
        lineHeight: 'none',
        letterSpacing: 'wide',
        textTransform: 'uppercase',
      },
      input: {
        fontFamily: 'secondary',
        fontWeight: 400,
        fontSize: 'base',
        lineHeight: 'normal',
        letterSpacing: 'normal',
      },
    },

    /**
     * Property Specific
     */
    property: {
      price: {
        fontFamily: 'primary',
        fontWeight: 700,
        fontSize: '3xl',
        lineHeight: 'snug',
        letterSpacing: 'tight',
        mobileSize: 'xl',
      },
      priceLarge: {
        fontFamily: 'primary',
        fontWeight: 700,
        fontSize: '5xl',
        lineHeight: 'snug',
        letterSpacing: 'tight',
        mobileSize: '3xl',
      },
      title: {
        fontFamily: 'primary',
        fontWeight: 600,
        fontSize: 'xl',
        lineHeight: 'snug',
        letterSpacing: 'normal',
        mobileSize: 'lg',
      },
      meta: {
        fontFamily: 'secondary',
        fontWeight: 400,
        fontSize: 'sm',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        mobileSize: 'sm',
      },
    },
  },

  /**
   * Responsive Typography Scale
   */
  responsive: {
    breakpoints: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
    scale: {
      base: 1,
      sm: 1.05,
      md: 1.1,
      lg: 1.2,
      xl: 1.3,
      '2xl': 1.4,
    },
  },

  /**
   * Typography Utility Classes Mapping
   */
  utilities: {
    display: {
      xxl: 'font-playfair text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tighter',
      xl: 'font-playfair text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight',
      lg: 'font-playfair text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight',
      md: 'font-playfair text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-snug tracking-tight',
    },
    heading: {
      h1: 'font-playfair text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-snug tracking-tight',
      h2: 'font-playfair text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-snug tracking-tight',
      h3: 'font-playfair text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold leading-snug',
      h4: 'font-playfair text-base md:text-lg lg:text-xl xl:text-2xl font-semibold leading-normal',
      h5: 'font-inter text-base md:text-lg lg:text-xl font-semibold leading-normal',
      h6: 'font-inter text-sm md:text-base lg:text-lg font-semibold leading-normal',
    },
    body: {
      large: 'font-inter text-base md:text-lg lg:text-xl leading-relaxed',
      base: 'font-inter text-base leading-relaxed',
      small: 'font-inter text-sm leading-normal',
      caption: 'font-inter text-xs leading-normal tracking-wide',
    },
    ui: {
      label: 'font-inter text-sm font-medium uppercase tracking-wider',
      button: 'font-inter text-base font-semibold tracking-wider',
      navigation: 'font-inter text-sm font-medium uppercase tracking-wider',
    },
    property: {
      price: 'font-playfair text-xl md:text-2xl lg:text-3xl font-bold leading-snug tracking-tight',
      priceLarge:
        'font-playfair text-3xl md:text-4xl lg:text-5xl font-bold leading-snug tracking-tight',
      title: 'font-playfair text-lg md:text-xl lg:text-2xl font-semibold leading-snug',
      meta: 'font-inter text-sm leading-normal',
    },
  },
};

export default typography;
