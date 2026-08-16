/**
 * Modal Variants
 * Modal, drawer, and overlay animations
 */

import { slideVariants, scaleVariants } from './motionVariants';

export const modalVariants = {
  /**
   * Modal Overlay
   * Fade in/out overlay
   */
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2, ease: 'easeOut' },
  },

  /**
   * Modal Container (Scale In)
   * Scale in/out modal
   */
  scale: {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 },
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },

  /**
   * Modal Container (Fade In)
   * Fade in/out modal
   */
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.25, ease: 'easeOut' },
  },

  /**
   * Modal Container (Slide Up)
   * Slide up from bottom
   */
  slideUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },

  /**
   * Modal Container (Slide Down)
   * Slide down from top
   */
  slideDown: {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },

  /**
   * Drawer (Slide In Right)
   * Slide in from right
   */
  drawerRight: {
    initial: { x: '100%' },
    animate: { x: '0%' },
    exit: { x: '100%' },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },

  /**
   * Drawer (Slide In Left)
   * Slide in from left
   */
  drawerLeft: {
    initial: { x: '-100%' },
    animate: { x: '0%' },
    exit: { x: '-100%' },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },

  /**
   * Drawer (Slide In Bottom)
   * Slide in from bottom
   */
  drawerBottom: {
    initial: { y: '100%' },
    animate: { y: '0%' },
    exit: { y: '100%' },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },

  /**
   * Drawer (Slide In Top)
   * Slide in from top
   */
  drawerTop: {
    initial: { y: '-100%' },
    animate: { y: '0%' },
    exit: { y: '-100%' },
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },

  /**
   * Premium Modal
   * Luxury modal with spring effect
   */
  premium: {
    initial: { opacity: 0, scale: 0.92, y: 30 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.92, y: 30 },
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 25,
      mass: 1,
    },
  },

  /**
   * Toast Modal
   * Quick toast notification
   */
  toast: {
    initial: { opacity: 0, x: 50, y: -20 },
    animate: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 50, y: -20 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },

  /**
   * Tooltip
   * Tooltip popup
   */
  tooltip: {
    initial: { opacity: 0, scale: 0.9, y: 5 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 5 },
    transition: { duration: 0.15, ease: 'easeOut' },
  },

  /**
   * Dropdown
   * Dropdown menu
   */
  dropdown: {
    initial: { opacity: 0, scale: 0.95, y: -5 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -5 },
    transition: { duration: 0.15, ease: 'easeOut' },
  },

  /**
   * Bottom Sheet
   * Mobile bottom sheet
   */
  bottomSheet: {
    initial: { y: '100%' },
    animate: { y: '0%' },
    exit: { y: '100%' },
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 30,
      mass: 0.8,
    },
  },
};

// Re-export slide and scale variants
modalVariants.slide = slideVariants;
modalVariants.scaleBase = scaleVariants;

export default modalVariants;
