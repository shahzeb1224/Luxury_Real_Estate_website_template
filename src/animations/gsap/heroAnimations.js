/**
 * Hero Section Animations
 * Premium hero entrance and reveal animations
 */

import gsap from 'gsap';
import animationsManager from './animationsManager';
import { ANIMATION_CONFIG } from './config';

export const heroAnimations = {
  /**
   * Animate hero background
   */
  background: (element, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.cinematic,
      ease = ANIMATION_CONFIG.easings.luxury,
      from = { scale: 1.1, opacity: 0 },
      to = { scale: 1, opacity: 1 },
      delay = 0,
    } = config;

    if (!element) return;

    if (animationsManager.isReducedMotion) {
      gsap.set(element, { opacity: 1, scale: 1 });
      return;
    }

    return animationsManager.createAnimation(
      element,
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
   * Animate hero content (title, subtitle, CTA)
   */
  content: (elements, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.slow,
      stagger = 0.15,
      ease = ANIMATION_CONFIG.easings.elegant,
      from = { opacity: 0, y: 40 },
      to = { opacity: 1, y: 0 },
      delay = 0.2,
    } = config;

    if (!elements || elements.length === 0) return;

    if (animationsManager.isReducedMotion) {
      elements.forEach((el) => gsap.set(el, { opacity: 1, y: 0 }));
      return;
    }

    return animationsManager.createStagger(elements, from, to, {
      duration,
      delay,
      ease,
      each: stagger,
      from: 'start',
    });
  },

  /**
   * Animate hero statistics
   */
  stats: (elements, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.standard,
      stagger = 0.1,
      ease = ANIMATION_CONFIG.easings.luxury,
      from = { opacity: 0, y: 20 },
      to = { opacity: 1, y: 0 },
      delay = 0.4,
    } = config;

    if (!elements || elements.length === 0) return;

    if (animationsManager.isReducedMotion) {
      elements.forEach((el) => gsap.set(el, { opacity: 1, y: 0 }));
      return;
    }

    return animationsManager.createStagger(elements, from, to, {
      duration,
      delay,
      ease,
      each: stagger,
      from: 'start',
    });
  },

  /**
   * Animate scroll indicator
   */
  scrollIndicator: (element, config = {}) => {
    const {
      duration = 1.5,
      ease = ANIMATION_CONFIG.easings.gentle,
      yoyo = true,
      repeat = -1,
    } = config;

    if (!element) return;

    if (animationsManager.isReducedMotion) {
      gsap.set(element, { opacity: 0 });
      return;
    }

    return animationsManager.createAnimation(
      element,
      {
        y: 10,
        opacity: 0.6,
        duration,
        ease,
        yoyo,
        repeat,
      },
      { duration, ease }
    );
  },

  /**
   * Complete hero sequence
   */
  sequence: (container, config = {}) => {
    const {
      background,
      content,
      stats,
      scrollIndicator,
      duration = ANIMATION_CONFIG.durations.cinematic,
    } = config;

    if (!container) return;

    if (animationsManager.isReducedMotion) {
      return;
    }

    const tl = animationsManager.createTimeline({
      delay: 0.1,
      duration,
      ease: ANIMATION_CONFIG.easings.luxury,
    });

    // Background first
    if (background) {
      tl.fromTo(
        background,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: duration * 0.7, ease: ANIMATION_CONFIG.easings.luxury }
      );
    }

    // Content sequence
    if (content && content.length > 0) {
      tl.fromTo(
        content,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: ANIMATION_CONFIG.durations.slow, stagger: 0.15 },
        '-=0.4'
      );
    }

    // Stats
    if (stats && stats.length > 0) {
      tl.fromTo(
        stats,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: ANIMATION_CONFIG.durations.standard, stagger: 0.1 },
        '-=0.2'
      );
    }

    // Scroll indicator
    if (scrollIndicator) {
      tl.fromTo(scrollIndicator, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.1');
    }

    return tl;
  },
};

export default heroAnimations;
