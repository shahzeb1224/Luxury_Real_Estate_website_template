/**
 * useScrollReveal Hook
 * Reusable hook for scroll-triggered reveal animations
 */

import { useEffect, useRef, useCallback } from 'react';
import animationsManager from '../animationsManager';
import { ANIMATION_CONFIG } from '../config';
import gsap from 'gsap';

export const useScrollReveal = (config = {}) => {
  const elementRef = useRef(null);
  const animationRef = useRef(null);

  const {
    duration = ANIMATION_CONFIG.durations.standard,
    ease = ANIMATION_CONFIG.easings.luxury,
    from = { opacity: 0, y: 30 },
    to = { opacity: 1, y: 0 },
    start = 'top 85%',
    end = 'bottom 20%',
    toggleActions = 'play none none reverse',
    once = true,
    scrub = false,
    markers = false,
    reducedMotionFallback = { opacity: 1 },
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
    trigger = null,
  } = config;

  const createReveal = useCallback(() => {
    if (!elementRef.current) return;

    // Check reduced motion
    if (animationsManager.isReducedMotion) {
      gsap.set(elementRef.current, reducedMotionFallback);
      return;
    }

    // Kill existing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    const triggerElement = trigger || elementRef.current;

    // Create scroll-triggered animation
    const anim = animationsManager.createScrollTriggerTimeline({
      trigger: triggerElement,
      start,
      end,
      toggleActions: once ? 'play none none none' : toggleActions,
      scrub,
      markers,
      duration,
      ease,
      scrollTrigger: {
        onEnter: onEnter,
        onLeave: onLeave,
        onEnterBack: onEnterBack,
        onLeaveBack: onLeaveBack,
      },
    });

    if (anim) {
      // Set initial state
      gsap.set(elementRef.current, from);
      // Animate to target
      anim.to(elementRef.current, {
        ...to,
        duration,
        ease,
      });
      animationRef.current = anim;
    }
  }, [
    duration,
    ease,
    from,
    to,
    start,
    end,
    toggleActions,
    once,
    scrub,
    markers,
    reducedMotionFallback,
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
    trigger,
  ]);

  // Create reveal on mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      createReveal();
    }, 50);

    return () => clearTimeout(timeout);
  }, [createReveal]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
    };
  }, []);

  // Refresh ScrollTrigger when element changes
  useEffect(() => {
    animationsManager.refresh();
  }, []);

  return {
    ref: elementRef,
    createReveal,
    animation: animationRef.current,
  };
};

export default useScrollReveal;
