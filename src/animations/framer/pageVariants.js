/**
 * Page Variants
 * Page-level animations for routing and transitions
 */

import { fadeVariants, slideVariants, scaleVariants, staggerVariants } from './motionVariants';

export const pageVariants = {
  /**
   * Fade Page Transition
   * Simple fade in/out for pages
   */
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },

  /**
   * Fade Up Page Transition
   * Fade in with upward motion
   */
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },

  /**
   * Fade Down Page Transition
   * Fade in with downward motion
   */
  fadeDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },

  /**
   * Scale Page Transition
   * Fade in with scale effect
   */
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },

  /**
   * Slide Page Transition
   * Slide in from bottom
   */
  slideUp: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },

  /**
   * Slide Left Page Transition
   * Slide in from right
   */
  slideLeft: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },

  /**
   * Slide Right Page Transition
   * Slide in from left
   */
  slideRight: {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 40 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },

  /**
   * Stagger Page Transition
   * Staggered children entrance
   */
  stagger: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.08,
    },
  },

  /**
   * Stagger Children Variant
   * For children of stagger page
   */
  staggerChild: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },

  /**
   * Custom Page Transition with Spring
   */
  spring: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      mass: 1,
    },
  },

  /**
   * Luxury Page Transition
   * Premium slow entrance
   */
  luxury: {
    initial: { opacity: 0, y: 40, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -40, scale: 0.97 },
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },

  /**
   * Editorial Page Transition
   * Magazine-style entrance
   */
  editorial: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -60 },
    transition: {
      duration: 0.7,
      ease: [0.7, 0, 0.3, 1],
    },
  },

  /**
   * Quick Page Transition
   * Fast entrance for high-traffic pages
   */
  quick: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

// Page transition presets
export const pageTransitionPresets = {
  fade: pageVariants.fade,
  fadeUp: pageVariants.fadeUp,
  fadeDown: pageVariants.fadeDown,
  scale: pageVariants.scale,
  slideUp: pageVariants.slideUp,
  slideLeft: pageVariants.slideLeft,
  slideRight: pageVariants.slideRight,
  stagger: pageVariants.stagger,
  spring: pageVariants.spring,
  luxury: pageVariants.luxury,
  editorial: pageVariants.editorial,
  quick: pageVariants.quick,
};

export default pageVariants;
