/**
 * Card Variants
 * Card-specific animations for property cards, agent cards, etc.
 */

import { staggerVariants, hoverVariants, scaleVariants, scrollVariants } from './motionVariants';

export const cardVariants = {
  /**
   * Grid Card Entrance
   * Staggered entrance for cards in a grid
   */
  grid: {
    container: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
    item: {
      initial: { opacity: 0, y: 30, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -30, scale: 0.95 },
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  },

  /**
   * Luxury Card Entrance
   * Premium staggered entrance for luxury cards
   */
  luxury: {
    container: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
    item: {
      initial: { opacity: 0, y: 40, scale: 0.97 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -40, scale: 0.97 },
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  },

  /**
   * Property Card
   * Specialized for property listings
   */
  property: {
    container: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.35, ease: 'easeOut' },
    },
    // Card hover states
    hover: {
      scale: 1.02,
      y: -4,
      boxShadow: '0 16px 48px rgba(0,0,0,0.12)',
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    // Image hover
    imageHover: {
      scale: 1.05,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  },

  /**
   * Agent Card
   * Specialized for agent profiles
   */
  agent: {
    container: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    // Agent image hover
    avatarHover: {
      scale: 1.05,
      boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  },

  /**
   * Blog Card
   * Specialized for blog posts
   */
  blog: {
    container: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    // Image hover
    imageHover: {
      scale: 1.04,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  },

  /**
   * Testimonial Card
   * Specialized for testimonials
   */
  testimonial: {
    container: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  },

  /**
   * Service Card
   * Specialized for services
   */
  service: {
    container: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
    item: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.4, ease: 'easeOut' },
    },
    // Icon hover
    iconHover: {
      scale: 1.1,
      rotate: 3,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  },

  /**
   * Scroll Reveal Card
   * Card that reveals on scroll
   */
  scrollReveal: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },

  /**
   * Featured Card
   * Premium card with gold accent
   */
  featured: {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -30, scale: 0.95 },
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
    // Gold accent pulse
    accentPulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },

  /**
   * Glass Card
   * Glassmorphism card animations
   */
  glass: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: 'easeOut' },
    // Hover glass effect
    hover: {
      backgroundColor: 'rgba(255,255,255,0.25)',
      backdropFilter: 'blur(20px)',
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  },

  // Re-export common variants
  stagger: staggerVariants.staggerContainer,
  staggerItem: staggerVariants.staggerItem,
  hover: hoverVariants.scaleElevate,
  scale: scaleVariants.scaleIn,
  scrollRevealBase: scrollVariants.scrollReveal,
};

export default cardVariants;
