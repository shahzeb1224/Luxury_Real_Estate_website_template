/**
 * Animation System
 * Elegant, purposeful, and performance-optimized
 */

export const animations = {
  /**
   * Duration Tokens (in milliseconds)
   */
  duration: {
    instant: 0,
    micro: 150,
    fast: 300,
    base: 400,
    standard: 500,
    moderate: 600,
    slow: 700,
    leisurely: 1000,
    cinematic: 1500,
  },

  /**
   * Easing Curves
   */
  easing: {
    /**
     * Standard easings
     */
    linear: 'linear',
    ease: 'ease',
    'ease-in': 'ease-in',
    'ease-out': 'ease-out',
    'ease-in-out': 'ease-in-out',

    /**
     * Custom easings (cubic-bezier)
     */
    custom: {
      /**
       * Premium, smooth animations
       * Used for most UI transitions
       */
      premium: 'cubic-bezier(0.16, 1, 0.3, 1)',

      /**
       * Smooth, elegant entrance
       * Used for page transitions and reveals
       */
      elegant: 'cubic-bezier(0.7, 0, 0.3, 1)',

      /**
       * Slight overshoot effect
       * Used for premium interactive elements
       */
      overshoot: 'cubic-bezier(0.34, 1.56, 0.64, 1)',

      /**
       * Gentle, natural motion
       * Used for scroll animations
       */
      gentle: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',

      /**
       * Smooth, professional
       * Used for hover and micro-interactions
       */
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',

      /**
       * Bouncy, playful
       * Used sparingly for special interactions
       */
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',

      /**
       * Sharp, decisive
       * Used for urgent interactions
       */
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },

    /**
     * Preset combinations
     */
    presets: {
      entrance: 'cubic-bezier(0.7, 0, 0.3, 1)',
      exit: 'cubic-bezier(0.4, 0, 0.6, 1)',
      hover: 'cubic-bezier(0.4, 0, 0.2, 1)',
      scroll: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      modal: 'cubic-bezier(0.16, 1, 0.3, 1)',
    },
  },

  /**
   * Delay Tokens (in milliseconds)
   */
  delay: {
    none: 0,
    micro: 50,
    short: 100,
    medium: 200,
    standard: 300,
    long: 400,
    xl: 600,
    xxl: 800,
    staggered: {
      base: 50,
      increment: 100,
    },
  },

  /**
   * Transition Presets
   */
  transitions: {
    /**
     * Fade transitions
     */
    fade: {
      in: {
        duration: 500,
        easing: 'elegant',
        properties: ['opacity'],
      },
      out: {
        duration: 300,
        easing: 'ease-out',
        properties: ['opacity'],
      },
      quick: {
        duration: 200,
        easing: 'ease-out',
        properties: ['opacity'],
      },
    },

    /**
     * Slide transitions
     */
    slide: {
      up: {
        duration: 500,
        easing: 'elegant',
        properties: ['transform', 'opacity'],
      },
      down: {
        duration: 500,
        easing: 'elegant',
        properties: ['transform', 'opacity'],
      },
      left: {
        duration: 400,
        easing: 'elegant',
        properties: ['transform', 'opacity'],
      },
      right: {
        duration: 400,
        easing: 'elegant',
        properties: ['transform', 'opacity'],
      },
    },

    /**
     * Scale transitions
     */
    scale: {
      in: {
        duration: 400,
        easing: 'overshoot',
        properties: ['transform', 'opacity'],
      },
      out: {
        duration: 300,
        easing: 'ease-in',
        properties: ['transform', 'opacity'],
      },
      hover: {
        duration: 300,
        easing: 'smooth',
        properties: ['transform'],
      },
    },

    /**
     * Property card transitions
     */
    property: {
      hover: {
        duration: 300,
        easing: 'smooth',
        properties: ['transform', 'box-shadow'],
      },
      image: {
        duration: 500,
        easing: 'gentle',
        properties: ['transform'],
      },
      price: {
        duration: 600,
        easing: 'elegant',
        properties: ['color', 'transform'],
      },
    },

    /**
     * Page transitions
     */
    page: {
      enter: {
        duration: 500,
        easing: 'elegant',
        properties: ['opacity', 'transform'],
      },
      exit: {
        duration: 300,
        easing: 'ease-in',
        properties: ['opacity', 'transform'],
      },
    },

    /**
     * UI transitions
     */
    ui: {
      button: {
        duration: 200,
        easing: 'smooth',
        properties: ['background', 'transform', 'box-shadow'],
      },
      input: {
        duration: 200,
        easing: 'smooth',
        properties: ['border-color', 'box-shadow'],
      },
      card: {
        duration: 300,
        easing: 'premium',
        properties: ['transform', 'box-shadow'],
      },
      modal: {
        enter: {
          duration: 300,
          easing: 'modal',
          properties: ['opacity', 'transform'],
        },
        exit: {
          duration: 200,
          easing: 'ease-in',
          properties: ['opacity', 'transform'],
        },
      },
      dropdown: {
        duration: 200,
        easing: 'smooth',
        properties: ['opacity', 'transform'],
      },
    },

    /**
     * Scroll transitions
     */
    scroll: {
      reveal: {
        duration: 600,
        easing: 'gentle',
        properties: ['opacity', 'transform'],
        delay: 100,
      },
      parallax: {
        duration: 0,
        easing: 'linear',
        properties: ['transform'],
        offset: 0.5,
      },
    },

    /**
     * Micro-interactions
     */
    micro: {
      hover: {
        duration: 150,
        easing: 'smooth',
        properties: ['transform', 'color'],
      },
      active: {
        duration: 100,
        easing: 'sharp',
        properties: ['transform'],
      },
      focus: {
        duration: 150,
        easing: 'smooth',
        properties: ['outline', 'box-shadow'],
      },
      loading: {
        duration: 1000,
        easing: 'linear',
        properties: ['opacity'],
        infinite: true,
      },
    },
  },

  /**
   * Animation Variants (for Framer Motion/GSAP)
   */
  variants: {
    /**
     * Fade animations
     */
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    fadeUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
    fadeDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
    fadeLeft: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 },
    },
    fadeRight: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 },
    },

    /**
     * Scale animations
     */
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    },
    scaleUp: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
    },

    /**
     * Slide animations
     */
    slideUp: {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 40 },
    },
    slideDown: {
      initial: { opacity: 0, y: -40 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -40 },
    },

    /**
     * Stagger animations
     */
    stagger: {
      container: {
        animate: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      },
      item: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
      },
    },
  },

  /**
   * Animation Class Names (for Tailwind)
   */
  classes: {
    'fade-in': 'animate-fade-in',
    'fade-up': 'animate-fade-up',
    'fade-down': 'animate-fade-down',
    'fade-left': 'animate-fade-left',
    'fade-right': 'animate-fade-right',
    'scale-in': 'animate-scale-in',
    'scale-up': 'animate-scale-up',
    'slide-up': 'animate-slide-up',
    'slide-down': 'animate-slide-down',
    'slide-left': 'animate-slide-left',
    'slide-right': 'animate-slide-right',
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    bounce: 'animate-bounce',
    shimmer: 'animate-shimmer',
    'stagger-children': 'animate-stagger-children',
  },

  /**
   * Performance Guidelines
   */
  performance: {
    /**
     * Use GPU-accelerated properties
     */
    gpuAccelerated: ['transform', 'opacity', 'filter'],

    /**
     * Avoid animating layout properties
     */
    layoutProperties: [
      'width',
      'height',
      'margin',
      'padding',
      'position',
      'display',
      'grid',
      'flex',
    ],

    /**
     * Will-change optimization
     */
    willChange: {
      transform: 'will-change: transform',
      opacity: 'will-change: opacity',
      both: 'will-change: transform, opacity',
      scroll: 'will-change: scroll-position',
      contents: 'will-change: contents',
    },
  },

  /**
   * Accessibility: Reduced Motion
   */
  reducedMotion: {
    enabled: '@media (prefers-reduced-motion: reduce)',
    rules: {
      all: {
        'animation-duration': '0.01ms !important',
        'animation-iteration-count': '1 !important',
        'transition-duration': '0.01ms !important',
        'scroll-behavior': 'auto !important',
      },
    },
  },
};

export default animations;
