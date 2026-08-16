/**
 * Page-Level Animations
 * Entry, exit, and transition animations for pages
 */

import gsap from 'gsap';
import animationsManager from './animationsManager';
import { ANIMATION_CONFIG } from './config';

export const pageAnimations = {
  /**
   * Animate page entrance
   */
  enter: (container, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.standard,
      ease = ANIMATION_CONFIG.easings.luxury,
      from = { opacity: 0, y: 30 },
      to = { opacity: 1, y: 0 },
      delay = 0,
    } = config;

    if (!container) return;

    // Check reduced motion
    if (animationsManager.isReducedMotion) {
      gsap.set(container, { opacity: 1, y: 0 });
      return;
    }

    return animationsManager.createAnimation(
      container,
      {
        ...from,
        ...to,
        duration,
        delay,
        ease,
      },
      { duration, delay, ease }
    );
  },

  /**
   * Animate page exit
   */
  exit: (container, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.fast,
      ease = ANIMATION_CONFIG.easings.easeOut,
      to = { opacity: 0, y: -20 },
      delay = 0,
    } = config;

    if (!container) return;

    if (animationsManager.isReducedMotion) {
      gsap.set(container, { opacity: 1, y: 0 });
      return;
    }

    return animationsManager.createAnimation(
      container,
      {
        ...to,
        duration,
        delay,
        ease,
      },
      { duration, delay, ease }
    );
  },

  /**
   * Animate page transition (between pages)
   */
  transition: (oldContainer, newContainer, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.standard,
      ease = ANIMATION_CONFIG.easings.luxury,
      from = { opacity: 0, y: 30 },
      to = { opacity: 1, y: 0 },
    } = config;

    return new Promise((resolve) => {
      // Exit old page
      if (oldContainer) {
        animationsManager.createAnimation(
          oldContainer,
          {
            opacity: 0,
            y: -30,
            duration: duration / 2,
            ease: ANIMATION_CONFIG.easings.easeOut,
          },
          { duration: duration / 2, ease: ANIMATION_CONFIG.easings.easeOut }
        );
      }

      // Enter new page
      if (newContainer) {
        gsap.set(newContainer, from);

        setTimeout(
          () => {
            animationsManager.createAnimation(
              newContainer,
              {
                ...to,
                duration: duration / 2,
                delay: 0.1,
                ease,
              },
              { duration: duration / 2, delay: 0.1, ease }
            );

            setTimeout(resolve, duration + 100);
          },
          duration / 2 + 50
        );
      } else {
        resolve();
      }
    });
  },

  /**
   * Page section reveal sequence
   */
  revealSections: (sections, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.standard,
      stagger = 0.1,
      ease = ANIMATION_CONFIG.easings.luxury,
      from = { opacity: 0, y: 40 },
      to = { opacity: 1, y: 0 },
    } = config;

    if (!sections || sections.length === 0) return;

    if (animationsManager.isReducedMotion) {
      sections.forEach((section) => {
        gsap.set(section, { opacity: 1, y: 0 });
      });
      return;
    }

    return animationsManager.createStagger(sections, from, to, {
      duration,
      delay: 0,
      ease,
      each: stagger,
      from: 'start',
    });
  },
};

export default pageAnimations;
