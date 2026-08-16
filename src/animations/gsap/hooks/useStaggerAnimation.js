/**
 * useStaggerAnimation Hook
 * Reusable hook for stagger animations
 */

import { useEffect, useRef, useCallback } from 'react';
import animationsManager from '../animationsManager';
import { ANIMATION_CONFIG } from '../config';
import gsap from 'gsap';

export const useStaggerAnimation = (config = {}) => {
  const containerRef = useRef(null);
  const childrenRefs = useRef([]);

  const {
    duration = ANIMATION_CONFIG.durations.standard,
    delay = 0,
    ease = ANIMATION_CONFIG.easings.luxury,
    from = { opacity: 0, y: 20 },
    to = { opacity: 1, y: 0 },
    stagger = 0.08,
    staggerFrom = 'start',
    triggerOnMount = true,
    triggerOnScroll = false,
    scrollTriggerConfig = {},
    reducedMotionFallback = { opacity: 1 },
    selector = null,
  } = config;

  // Register child elements
  const registerChild = useCallback((el) => {
    if (el && !childrenRefs.current.includes(el)) {
      childrenRefs.current.push(el);
    }
    return el;
  }, []);

  // Clear children refs
  const clearChildren = useCallback(() => {
    childrenRefs.current = [];
  }, []);

  // Get targets (either children or selected elements)
  const getTargets = useCallback(() => {
    if (selector && containerRef.current) {
      return containerRef.current.querySelectorAll(selector);
    }
    return childrenRefs.current;
  }, [selector]);

  // Create stagger animation
  const createStaggerAnimation = useCallback(() => {
    const targets = getTargets();
    if (!targets || targets.length === 0) return;

    // Check reduced motion
    if (animationsManager.isReducedMotion) {
      targets.forEach((el) => {
        gsap.set(el, reducedMotionFallback);
      });
      return;
    }

    // Create animation
    const anim = animationsManager.createStagger(targets, from, to, {
      duration,
      delay,
      ease,
      each: stagger,
      from: staggerFrom,
    });

    return anim;
  }, [getTargets, from, to, duration, delay, ease, stagger, staggerFrom, reducedMotionFallback]);

  // Trigger animation on mount
  useEffect(() => {
    if (triggerOnMount) {
      const timeout = setTimeout(() => {
        // Wait for children to be registered
        const targets = getTargets();
        if (targets && targets.length > 0) {
          createStaggerAnimation();
        } else {
          // Fallback: check again after a short delay
          setTimeout(() => {
            createStaggerAnimation();
          }, 100);
        }
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [createStaggerAnimation, triggerOnMount, getTargets]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      childrenRefs.current = [];
    };
  }, []);

  // Refresh ScrollTrigger when needed
  useEffect(() => {
    if (triggerOnScroll) {
      animationsManager.refresh();
    }
  }, [triggerOnScroll]);

  return {
    containerRef,
    registerChild,
    clearChildren,
    createStaggerAnimation,
  };
};

export default useStaggerAnimation;
