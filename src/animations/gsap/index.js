/**
 * GSAP Animation System
 * Centralized export for all animation modules
 */

import animationsManager from './animationsManager';
import cardsAnimations from './cardsAnimations';
import ANIMATION_CONFIG from './config';
import heroAnimations from './heroAnimations';
import navbarAnimations from './navbarAnimations';
import pageAnimations from './pageAnimations';
import revealAnimations from './revealAnimations';
import textAnimations from './textAnimations';

// Configuration
export { default as ANIMATION_CONFIG, GPU_PROPS, SAFE_ANIMATION_PROPS } from './config';

// Animation Manager
export { default as animationsManager } from './animationsManager';

// Hooks
export * from './hooks';

// Animation Modules
export { default as pageAnimations } from './pageAnimations';
export { default as heroAnimations } from './heroAnimations';
export { default as cardsAnimations } from './cardsAnimations';
export { default as navbarAnimations } from './navbarAnimations';
export { default as textAnimations } from './textAnimations';
export { default as revealAnimations } from './revealAnimations';

// Default export
export default {
  config: ANIMATION_CONFIG,
  manager: animationsManager,
  page: pageAnimations,
  hero: heroAnimations,
  cards: cardsAnimations,
  navbar: navbarAnimations,
  text: textAnimations,
  reveal: revealAnimations,
};
