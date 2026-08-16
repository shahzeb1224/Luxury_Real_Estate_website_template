/**
 * Framer Motion Animation System
 * Centralized export for all animation variants
 */

import buttonVariants from './buttonVariants';
import cardVariants from './cardVariants';
import modalVariants from './modalVariants';
import motionVariants from './motionVariants';
import pageVariants, { pageTransitionPresets } from './pageVariants';

// Core Variants
export {
  motionVariants,
  fadeVariants,
  slideVariants,
  scaleVariants,
  staggerVariants,
  hoverVariants,
  tapVariants,
  gestureVariants,
  scrollVariants,
  transitionVariants,
  staggerOptions,
} from './motionVariants';

// Page Variants
export { pageVariants, pageTransitionPresets } from './pageVariants';

// Card Variants
export { cardVariants } from './cardVariants';

// Modal Variants
export { modalVariants } from './modalVariants';

// Button Variants
export { buttonVariants } from './buttonVariants';

// Default export
export default {
  motion: motionVariants,
  page: pageVariants,
  card: cardVariants,
  modal: modalVariants,
  button: buttonVariants,
  presets: {
    page: pageTransitionPresets,
  },
};
