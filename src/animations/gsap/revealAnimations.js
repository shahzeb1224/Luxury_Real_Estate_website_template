/**
 * Reveal Animations
 * Scroll-triggered reveal animations for various elements
 */

import gsap from 'gsap';
import animationsManager from './animationsManager';
import { ANIMATION_CONFIG } from './config';

export const revealAnimations = {
  /**
   * Fade reveal on scroll
   */
  fade: (element, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.standard,
      ease = ANIMATION_CONFIG.easings.elegant,
      start = 'top 85%',
      toggleActions = 'play none none reverse',
      from = { opacity: 0 },
      to = { opacity: 1 },
    } = config;

    if (!element) return;

    if (animationsManager.isReducedMotion) {
      gsap.set(element, { opacity: 1 });
      return;
    }

    const tl = animationsManager.createScrollTriggerTimeline({
      trigger: element,
      start,
      toggleActions,
      duration,
      ease,
    });

    if (tl) {
      gsap.set(element, from);
      tl.to(element, to);
    }

    return tl;
  },

  /**
   * Slide up reveal on scroll
   */
  slideUp: (element, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.standard,
      ease = ANIMATION_CONFIG.easings.luxury,
      start = 'top 85%',
      toggleActions = 'play none none reverse',
      distance = 40,
      from = { opacity: 0, y: distance },
      to = { opacity: 1, y: 0 },
    } = config;

    if (!element) return;

    if (animationsManager.isReducedMotion) {
      gsap.set(element, { opacity: 1, y: 0 });
      return;
    }

    const tl = animationsManager.createScrollTriggerTimeline({
      trigger: element,
      start,
      toggleActions,
      duration,
      ease,
    });

    if (tl) {
      gsap.set(element, from);
      tl.to(element, to);
    }

    return tl;
  },

  /**
   * Scale reveal on scroll
   */
  scale: (element, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.standard,
      ease = ANIMATION_CONFIG.easings.luxury,
      start = 'top 85%',
      toggleActions = 'play none none reverse',
      from = { opacity: 0, scale: 0.8 },
      to = { opacity: 1, scale: 1 },
    } = config;

    if (!element) return;

    if (animationsManager.isReducedMotion) {
      gsap.set(element, { opacity: 1, scale: 1 });
      return;
    }

    const tl = animationsManager.createScrollTriggerTimeline({
      trigger: element,
      start,
      toggleActions,
      duration,
      ease,
    });

    if (tl) {
      gsap.set(element, from);
      tl.to(element, to);
    }

    return tl;
  },

  /**
   * Parallax reveal on scroll
   */
  parallax: (element, config = {}) => {
    const {
      speed = 0.5,
      start = 'top bottom',
      end = 'bottom top',
      scrub = 1,
      from = { y: 0 },
      to = { y: (delta) => delta * speed },
    } = config;

    if (!element) return;

    if (animationsManager.isReducedMotion) {
      gsap.set(element, { y: 0 });
      return;
    }

    const tl = animationsManager.createScrollTriggerTimeline({
      trigger: element,
      start,
      end,
      scrub,
    });

    if (tl) {
      tl.fromTo(element, from, to);
    }

    return tl;
  },

  /**
   * Staggered group reveal on scroll
   */
  staggerGroup: (elements, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.standard,
      stagger = 0.08,
      ease = ANIMATION_CONFIG.easings.luxury,
      start = 'top 85%',
      toggleActions = 'play none none reverse',
      from = { opacity: 0, y: 30 },
      to = { opacity: 1, y: 0 },
    } = config;

    if (!elements || elements.length === 0) return;

    if (animationsManager.isReducedMotion) {
      elements.forEach((el) => gsap.set(el, { opacity: 1, y: 0 }));
      return;
    }

    const tl = animationsManager.createScrollTriggerTimeline({
      trigger: elements[0],
      start,
      toggleActions,
      duration,
      ease,
    });

    if (tl) {
      gsap.set(elements, from);
      tl.to(elements, {
        ...to,
        duration,
        stagger,
        ease,
      });
    }

    return tl;
  },

  /**
   * Image reveal with mask
   */
  imageReveal: (container, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.slow,
      ease = ANIMATION_CONFIG.easings.luxury,
      start = 'top 80%',
      toggleActions = 'play none none reverse',
      clipFrom = '0%',
      clipTo = '100%',
      direction = 'horizontal', // 'horizontal' or 'vertical'
    } = config;

    if (!container) return;

    if (animationsManager.isReducedMotion) {
      gsap.set(container, { clipPath: 'inset(0%)' });
      return;
    }

    const clipPaths = {
      horizontal: `inset(0% ${100 - clipFrom}% 0% 0%)`,
      vertical: `inset(${100 - clipFrom}% 0% 0% 0%)`,
    };

    const clipTargets = {
      horizontal: `inset(0% ${100 - clipTo}% 0% 0%)`,
      vertical: `inset(${100 - clipTo}% 0% 0% 0%)`,
    };

    const tl = animationsManager.createScrollTriggerTimeline({
      trigger: container,
      start,
      toggleActions,
      duration,
      ease,
    });

    if (tl) {
      gsap.set(container, { clipPath: clipPaths[direction] });
      tl.to(container, { clipPath: clipTargets[direction] });
    }

    return tl;
  },

  /**
   * Section reveal sequence
   */
  sectionSequence: (sections, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.standard,
      stagger = 0.2,
      ease = ANIMATION_CONFIG.easings.luxury,
      start = 'top 85%',
      from = { opacity: 0, y: 40 },
      to = { opacity: 1, y: 0 },
    } = config;

    if (!sections || sections.length === 0) return;

    if (animationsManager.isReducedMotion) {
      sections.forEach((section) => gsap.set(section, { opacity: 1, y: 0 }));
      return;
    }

    return sections.map((section, index) => {
      const tl = animationsManager.createScrollTriggerTimeline({
        trigger: section,
        start,
        toggleActions: 'play none none reverse',
        duration,
        ease,
      });

      if (tl) {
        gsap.set(section, { ...from, delay: index * stagger });
        tl.to(section, {
          ...to,
          duration,
          ease,
        });
      }

      return tl;
    });
  },
};

export default revealAnimations;
