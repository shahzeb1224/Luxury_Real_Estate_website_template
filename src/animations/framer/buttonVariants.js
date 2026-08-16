/**
 * Button Variants
 * Button-specific animations for all button types
 */

import { hoverVariants, tapVariants } from './motionVariants';

export const buttonVariants = {
  /**
   * Primary Button
   * Standard primary button animations
   */
  primary: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.97, y: 0 },
    transition: { duration: 0.2, ease: 'easeOut' },
  },

  /**
   * Luxury Button
   * Premium gold button with glow
   */
  luxury: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    whileHover: {
      scale: 1.03,
      y: -2,
      boxShadow: '0 8px 32px rgba(201,168,76,0.4)',
    },
    whileTap: { scale: 0.97, y: 0 },
    transition: { duration: 0.2, ease: 'easeOut' },
  },

  /**
   * Secondary Button
   * Secondary/outline button animations
   */
  secondary: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.97, y: 0 },
    transition: { duration: 0.2, ease: 'easeOut' },
  },

  /**
   * Ghost Button
   * Ghost/transparent button animations
   */
  ghost: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.97, y: 0 },
    transition: { duration: 0.2, ease: 'easeOut' },
  },

  /**
   * Icon Button
   * Icon-only button animations
   */
  icon: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    whileHover: { scale: 1.1, rotate: 5 },
    whileTap: { scale: 0.85, rotate: 0 },
    transition: { duration: 0.2, ease: 'easeOut' },
  },

  /**
   * Heart Button
   * Favorite/heart button with pop
   */
  heart: {
    initial: { scale: 1 },
    animate: { scale: 1 },
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.8 },
    favorite: {
      scale: [1, 1.3, 1],
      transition: {
        duration: 0.3,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
    unFavorite: {
      scale: [1, 0.8, 1],
      transition: { duration: 0.2, ease: 'easeOut' },
    },
  },

  /**
   * Loading Button
   * Button with loading spinner
   */
  loading: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    whileTap: { scale: 0.97 },
    transition: { duration: 0.2, ease: 'easeOut' },
    spinner: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  },

  /**
   * CTA Button
   * High-conversion call-to-action
   */
  cta: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    whileHover: {
      scale: 1.04,
      y: -3,
      boxShadow: '0 12px 40px rgba(26,42,62,0.25)',
    },
    whileTap: { scale: 0.96, y: 0 },
    transition: { duration: 0.3, ease: 'easeOut' },
    // Pulse attention (optional)
    pulse: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },

  /**
   * Link Button
   * Text link animations
   */
  link: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    whileHover: { x: 4 },
    whileTap: { x: 0 },
    transition: { duration: 0.2, ease: 'easeOut' },
    // Underline animation
    underline: {
      width: ['0%', '100%'],
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  },

  /**
   * Social Button
   * Social media button animations
   */
  social: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    whileHover: {
      scale: 1.08,
      y: -3,
      transition: { type: 'spring', stiffness: 400, damping: 10 },
    },
    whileTap: { scale: 0.92, y: 0 },
    transition: { duration: 0.2, ease: 'easeOut' },
  },

  /**
   * Glass Button
   * Glassmorphism button animations
   */
  glass: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    whileHover: {
      scale: 1.03,
      y: -2,
      backgroundColor: 'rgba(255,255,255,0.25)',
      backdropFilter: 'blur(20px)',
    },
    whileTap: { scale: 0.97, y: 0 },
    transition: { duration: 0.2, ease: 'easeOut' },
  },

  /**
   * Tab Button
   * Tab navigation button
   */
  tab: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    whileHover: { y: -2 },
    whileTap: { y: 0 },
    active: {
      scale: 1.02,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
    inactive: {
      scale: 1,
      transition: { duration: 0.2, ease: 'easeOut' },
    },
    transition: { duration: 0.2, ease: 'easeOut' },
  },

  /**
   * Danger Button
   * Destructive action button
   */
  danger: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    whileHover: {
      scale: 1.02,
      y: -2,
      boxShadow: '0 8px 32px rgba(220,38,38,0.3)',
    },
    whileTap: { scale: 0.97, y: 0 },
    transition: { duration: 0.2, ease: 'easeOut' },
  },

  /**
   * Success Button
   * Positive action button
   */
  success: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    whileHover: {
      scale: 1.02,
      y: -2,
      boxShadow: '0 8px 32px rgba(5,150,105,0.3)',
    },
    whileTap: { scale: 0.97, y: 0 },
    transition: { duration: 0.2, ease: 'easeOut' },
  },

  // Re-export common variants
  hover: hoverVariants.scale,
  tap: tapVariants.button,
};

export default buttonVariants;
