/**
 * Text Animations
 * Premium text entrance and reveal animations
 */

import gsap from 'gsap';
import animationsManager from './animationsManager';
import { ANIMATION_CONFIG } from './config';

export const textAnimations = {
  /**
   * Text fade-up animation
   */
  fadeUp: (element, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.standard,
      ease = ANIMATION_CONFIG.easings.elegant,
      from = { opacity: 0, y: 30 },
      to = { opacity: 1, y: 0 },
      delay = 0,
    } = config;

    if (!element) return;

    if (animationsManager.isReducedMotion) {
      gsap.set(element, { opacity: 1, y: 0 });
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
   * Text split reveal (character/word by word)
   */
  splitReveal: (element, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.standard,
      stagger = 0.03,
      ease = ANIMATION_CONFIG.easings.elegant,
      from = { opacity: 0, y: 20, rotateX: 20 },
      to = { opacity: 1, y: 0, rotateX: 0 },
      delay = 0,
      splitBy = 'words', // 'chars', 'words', 'lines'
    } = config;

    if (!element) return;

    if (animationsManager.isReducedMotion) {
      gsap.set(element, { opacity: 1, y: 0, rotateX: 0 });
      return;
    }

    // Split text
    let splitText;
    try {
      const SplitText = import('gsap/SplitText').SplitText;
      splitText = new SplitText(element, { type: splitBy });
    } catch {
      // Fallback to simple fade if SplitText not available
      return animationsManager.createAnimation(
        element,
        { ...from, ...to, duration, delay, ease },
        { duration, delay, ease }
      );
    }

    if (!splitText || !splitText.elements) return;

    gsap.set(splitText.elements, from);

    return animationsManager.createStagger(splitText.elements, {}, to, {
      duration,
      delay,
      ease,
      each: stagger,
      from: 'start',
    });
  },

  /**
   * Text gradient reveal
   */
  gradientReveal: (element, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.slow,
      ease = ANIMATION_CONFIG.easings.luxury,
      startColor = 'rgba(26,42,62,0.2)',
      endColor = 'rgba(26,42,62,1)',
      delay = 0,
    } = config;

    if (!element) return;

    if (animationsManager.isReducedMotion) {
      gsap.set(element, { color: endColor });
      return;
    }

    return animationsManager.createAnimation(
      element,
      {
        color: endColor,
        duration,
        delay,
        ease,
        overwrite: 'auto',
      },
      { duration, delay, ease }
    );
  },

  /**
   * Text counter animation (for statistics)
   */
  counter: (element, targetNumber, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.standard,
      ease = ANIMATION_CONFIG.easings.easeOut,
      delay = 0,
      prefix = '',
      suffix = '',
    } = config;

    if (!element || typeof targetNumber !== 'number') return;

    if (animationsManager.isReducedMotion) {
      gsap.set(element, { innerText: `${prefix}${targetNumber}${suffix}` });
      return;
    }

    const obj = { value: 0 };

    return animationsManager.createAnimation(
      obj,
      {
        value: targetNumber,
        duration,
        delay,
        ease,
        onUpdate: () => {
          const rounded = Math.round(obj.value);
          element.innerText = `${prefix}${rounded.toLocaleString()}${suffix}`;
        },
        overwrite: 'auto',
      },
      { duration, delay, ease }
    );
  },

  /**
   * Text typewriter effect
   */
  typewriter: (element, text, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.slow,
      ease = ANIMATION_CONFIG.easings.linear,
      delay = 0,
      cursor = '|',
    } = config;

    if (!element) return;

    if (animationsManager.isReducedMotion) {
      gsap.set(element, { innerText: text });
      return;
    }

    const chars = text.split('');
    let currentText = '';
    let index = 0;

    return animationsManager.createAnimation(
      { progress: 0 },
      {
        progress: 1,
        duration,
        delay,
        ease,
        onUpdate: () => {
          const progress = this.targets()[0].progress;
          const targetIndex = Math.floor(progress * chars.length);

          if (targetIndex > index) {
            for (let i = index; i < targetIndex; i++) {
              currentText += chars[i] || '';
            }
            index = targetIndex;
            element.innerText = currentText + cursor;
          }
        },
        onComplete: () => {
          element.innerText = text;
        },
        overwrite: 'auto',
      },
      { duration, delay, ease }
    );
  },

  /**
   * Text letter by letter reveal
   */
  letterReveal: (element, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.standard,
      stagger = 0.02,
      ease = ANIMATION_CONFIG.easings.elegant,
      from = { opacity: 0, y: 10 },
      to = { opacity: 1, y: 0 },
      delay = 0,
    } = config;

    if (!element) return;

    if (animationsManager.isReducedMotion) {
      gsap.set(element, { opacity: 1, y: 0 });
      return;
    }

    // Wrap each character in a span
    const text = element.innerText;
    element.innerText = '';
    const chars = text.split('').map((char, index) => {
      const span = document.createElement('span');
      span.innerText = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      element.appendChild(span);
      return span;
    });

    return animationsManager.createStagger(chars, from, to, {
      duration,
      delay,
      ease,
      each: stagger,
      from: 'start',
    });
  },
};

export default textAnimations;
