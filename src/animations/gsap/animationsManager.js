/**
 * GSAP Animation Manager
 * Centralized control for all animations
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ANIMATION_CONFIG, SAFE_ANIMATION_PROPS } from './config';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

class AnimationsManager {
  constructor() {
    this.animations = [];
    this.timelines = [];
    this.contexts = [];
    this.isReducedMotion = false;
    this.scrollTriggers = [];

    // Check for reduced motion preference
    if (typeof window !== 'undefined') {
      this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
        this.isReducedMotion = e.matches;
      });
    }
  }

  /**
   * Get animation duration respecting reduced motion
   */
  getDuration(duration = ANIMATION_CONFIG.durations.standard) {
    if (this.isReducedMotion) {
      return ANIMATION_CONFIG.reducedMotion.duration;
    }
    return duration;
  }

  /**
   * Get animation delay respecting reduced motion
   */
  getDelay(delay = 0) {
    if (this.isReducedMotion) {
      return ANIMATION_CONFIG.reducedMotion.delay;
    }
    return delay;
  }

  /**
   * Create a GSAP animation with reduced motion support
   */
  createAnimation(target, props, config = {}) {
    if (this.isReducedMotion) {
      // Skip animations that would cause layout shift
      const skipProps = ['x', 'y', 'scale', 'rotation', 'transform'];
      const hasSkipProp = skipProps.some((prop) => props[prop] !== undefined);

      if (hasSkipProp) {
        return null;
      }

      // Only allow opacity changes with reduced motion
      const safeProps = { opacity: props.opacity };
      return gsap.set(target, safeProps);
    }

    const animation = gsap.to(target, {
      ...props,
      duration: this.getDuration(config.duration),
      delay: this.getDelay(config.delay),
      ease: config.ease || ANIMATION_CONFIG.easings.luxury,
      overwrite: 'auto',
    });

    this.animations.push(animation);
    return animation;
  }

  /**
   * Create a GSAP timeline
   */
  createTimeline(config = {}) {
    const tl = gsap.timeline({
      duration: this.getDuration(config.duration),
      delay: this.getDelay(config.delay),
      ease: config.ease || ANIMATION_CONFIG.easings.luxury,
      ...config,
    });

    this.timelines.push(tl);
    return tl;
  }

  /**
   * Create a ScrollTrigger
   */
  createScrollTrigger(config) {
    if (this.isReducedMotion) {
      return null;
    }

    const trigger = ScrollTrigger.create({
      ...config,
      onEnter: (self) => {
        if (config.onEnter) config.onEnter(self);
      },
      onLeave: (self) => {
        if (config.onLeave) config.onLeave(self);
      },
      onEnterBack: (self) => {
        if (config.onEnterBack) config.onEnterBack(self);
      },
      onLeaveBack: (self) => {
        if (config.onLeaveBack) config.onLeaveBack(self);
      },
    });

    this.scrollTriggers.push(trigger);
    return trigger;
  }

  /**
   * Create a ScrollTrigger timeline
   */
  createScrollTriggerTimeline(config) {
    if (this.isReducedMotion) {
      return null;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: config.trigger,
        start: config.start || 'top 80%',
        end: config.end || 'bottom 20%',
        toggleActions: config.toggleActions || 'play none none none',
        markers: false,
        ...config.scrollTrigger,
      },
      defaults: {
        duration: this.getDuration(config.duration || ANIMATION_CONFIG.durations.standard),
        ease: config.ease || ANIMATION_CONFIG.easings.luxury,
      },
    });

    this.timelines.push(tl);
    return tl;
  }

  /**
   * Create a stagger animation
   */
  createStagger(targets, fromProps, toProps, staggerConfig = {}) {
    if (this.isReducedMotion) {
      return gsap.set(targets, { opacity: 1 });
    }

    const stagger = {
      each: this.getDuration(staggerConfig.each || ANIMATION_CONFIG.delays.stagger),
      from: staggerConfig.from || 'start',
      ease: staggerConfig.ease || ANIMATION_CONFIG.easings.luxury,
    };

    // Start from initial state
    gsap.set(targets, fromProps);

    const animation = gsap.to(targets, {
      ...toProps,
      duration: this.getDuration(staggerConfig.duration || ANIMATION_CONFIG.durations.standard),
      delay: this.getDelay(staggerConfig.delay || 0),
      stagger,
      ease: stagger.ease,
      overwrite: 'auto',
    });

    this.animations.push(animation);
    return animation;
  }

  /**
   * Kill all animations
   */
  killAll() {
    this.animations.forEach((anim) => anim.kill());
    this.timelines.forEach((tl) => tl.kill());
    this.scrollTriggers.forEach((st) => st.kill());

    this.animations = [];
    this.timelines = [];
    this.scrollTriggers = [];
  }

  /**
   * Refresh ScrollTrigger
   */
  refresh() {
    ScrollTrigger.refresh();
  }

  /**
   * Clean up all animations
   */
  cleanup() {
    this.killAll();
    ScrollTrigger.getAll().forEach((st) => st.kill());
  }
}

// Singleton instance
export const animationsManager = new AnimationsManager();

export default animationsManager;
