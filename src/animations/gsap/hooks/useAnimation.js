/**
 * useAnimation Hook
 * Reusable hook for GSAP animations
 */

import { useEffect, useRef, useCallback, useMemo } from 'react';
import animationsManager from '../animationsManager';
import { ANIMATION_CONFIG } from '../config';
import gsap from 'gsap';

export const useAnimation = (config = {}) => {
  const elementRef = useRef(null);
  const animationRef = useRef(null);

  const {
    duration = ANIMATION_CONFIG.durations.standard,
    delay = 0,
    ease = ANIMATION_CONFIG.easings.luxury,
    from = {},
    to = {},
    triggerOnMount = true,
    triggerOnScroll = false,
    scrollTriggerConfig = {},
    reducedMotionFallback = { opacity: 1 },
  } = config;

  // Memoize animation config to prevent re-renders
  const animationConfig = useMemo(
    () => ({
      duration,
      delay,
      ease,
      from,
      to,
    }),
    [duration, delay, ease, from, to]
  );

  // Create animation
  const createAnimation = useCallback(() => {
    if (!elementRef.current) return;

    // Kill existing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Check reduced motion
    if (animationsManager.isReducedMotion) {
      gsap.set(elementRef.current, reducedMotionFallback);
      return;
    }

    // Set initial state
    if (Object.keys(from).length > 0) {
      gsap.set(elementRef.current, from);
    }

    // Determine animation type
    if (triggerOnScroll) {
      // Scroll-triggered animation
      const tl = animationsManager.createScrollTriggerTimeline({
        trigger: elementRef.current,
        ...scrollTriggerConfig,
        duration,
        ease,
      });

      if (tl) {
        tl.fromTo(elementRef.current, from, to);
        animationRef.current = tl;
      }
    } else {
      // Mount-triggered animation
      const anim = animationsManager.createAnimation(
        elementRef.current,
        {
          ...to,
          duration,
          delay,
          ease,
        },
        { duration, delay, ease }
      );
      animationRef.current = anim;
    }
  }, [
    duration,
    delay,
    ease,
    from,
    to,
    triggerOnScroll,
    scrollTriggerConfig,
    reducedMotionFallback,
  ]);

  // Trigger animation on mount
  useEffect(() => {
    if (triggerOnMount) {
      // Small delay to ensure DOM is ready
      const timeout = setTimeout(() => {
        createAnimation();
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [createAnimation, triggerOnMount]);

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
    if (triggerOnScroll) {
      animationsManager.refresh();
    }
  }, [triggerOnScroll]);

  return { ref: elementRef, createAnimation, animation: animationRef.current };
};

export default useAnimation;
