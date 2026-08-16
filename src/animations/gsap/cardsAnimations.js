/**
 * Cards Animations
 * Premium card entrance, hover, and reveal animations
 */

import gsap from 'gsap';
import animationsManager from './animationsManager';
import { ANIMATION_CONFIG } from './config';

export const cardsAnimations = {
  /**
   * Animate card entrance with stagger
   */
  entrance: (cards, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.standard,
      stagger = 0.08,
      ease = ANIMATION_CONFIG.easings.luxury,
      from = { opacity: 0, y: 40, scale: 0.95 },
      to = { opacity: 1, y: 0, scale: 1 },
      delay = 0,
    } = config;

    if (!cards || cards.length === 0) return;

    if (animationsManager.isReducedMotion) {
      cards.forEach((card) => gsap.set(card, { opacity: 1, y: 0, scale: 1 }));
      return;
    }

    return animationsManager.createStagger(cards, from, to, {
      duration,
      delay,
      ease,
      each: stagger,
      from: 'start',
    });
  },

  /**
   * Animate card on hover (elevate + scale)
   */
  hover: (card, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.fast,
      ease = ANIMATION_CONFIG.easings.smooth,
      scale = 1.03,
      y = -8,
      shadow = '0 16px 48px rgba(0,0,0,0.12)',
    } = config;

    if (!card) return;

    if (animationsManager.isReducedMotion) {
      return;
    }

    const enterAnim = () => {
      gsap.to(card, {
        scale,
        y,
        boxShadow: shadow,
        duration,
        ease,
        overwrite: 'auto',
      });
    };

    const leaveAnim = () => {
      gsap.to(card, {
        scale: 1,
        y: 0,
        boxShadow: 'none',
        duration,
        ease,
        overwrite: 'auto',
      });
    };

    card.addEventListener('mouseenter', enterAnim);
    card.addEventListener('mouseleave', leaveAnim);

    return () => {
      card.removeEventListener('mouseenter', enterAnim);
      card.removeEventListener('mouseleave', leaveAnim);
    };
  },

  /**
   * Animate card image zoom on hover
   */
  imageZoom: (image, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.slow,
      ease = ANIMATION_CONFIG.easings.gentle,
      scale = 1.08,
    } = config;

    if (!image) return;

    if (animationsManager.isReducedMotion) {
      return;
    }

    const enterAnim = () => {
      gsap.to(image, {
        scale,
        duration,
        ease,
        overwrite: 'auto',
      });
    };

    const leaveAnim = () => {
      gsap.to(image, {
        scale: 1,
        duration,
        ease,
        overwrite: 'auto',
      });
    };

    const parent = image.closest('.group') || image.parentElement;
    if (parent) {
      parent.addEventListener('mouseenter', enterAnim);
      parent.addEventListener('mouseleave', leaveAnim);

      return () => {
        parent.removeEventListener('mouseenter', enterAnim);
        parent.removeEventListener('mouseleave', leaveAnim);
      };
    }

    return null;
  },

  /**
   * Animate card reveal on scroll
   */
  scrollReveal: (cards, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.standard,
      stagger = 0.08,
      ease = ANIMATION_CONFIG.easings.luxury,
      from = { opacity: 0, y: 40 },
      to = { opacity: 1, y: 0 },
      start = 'top 85%',
      toggleActions = 'play none none reverse',
    } = config;

    if (!cards || cards.length === 0) return;

    if (animationsManager.isReducedMotion) {
      cards.forEach((card) => gsap.set(card, { opacity: 1, y: 0 }));
      return;
    }

    const tl = animationsManager.createScrollTriggerTimeline({
      trigger: cards[0],
      start,
      toggleActions,
      duration,
      ease,
    });

    if (tl) {
      tl.fromTo(cards, from, {
        ...to,
        duration,
        stagger,
        ease,
      });
    }

    return tl;
  },

  /**
   * Grid entrance animation
   */
  gridEntrance: (grid, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.standard,
      stagger = 0.06,
      ease = ANIMATION_CONFIG.easings.luxury,
      from = { opacity: 0, y: 30 },
      to = { opacity: 1, y: 0 },
      delay = 0.1,
    } = config;

    if (!grid) return;

    const cards = grid.children;

    if (animationsManager.isReducedMotion) {
      cards.forEach((card) => gsap.set(card, { opacity: 1, y: 0 }));
      return;
    }

    return animationsManager.createStagger(cards, from, to, {
      duration,
      delay,
      ease,
      each: stagger,
      from: 'start',
    });
  },
};

export default cardsAnimations;
