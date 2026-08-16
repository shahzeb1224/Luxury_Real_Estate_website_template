/**
 * GSAP Animation Configuration
 * Centralized timing, easing, and performance settings
 */

export const ANIMATION_CONFIG = {
  durations: {
    micro: 0.15,
    fast: 0.3,
    standard: 0.5,
    slow: 0.7,
    leisurely: 1.0,
    cinematic: 1.5,
  },
  delays: {
    none: 0,
    short: 0.1,
    medium: 0.2,
    long: 0.4,
    stagger: 0.08,
  },
  easings: {
    // Premium luxury easings
    luxury: 'power3.out',
    elegant: 'power2.out',
    smooth: 'power1.inOut',
    gentle: 'sine.inOut',
    premium: 'back.out(1.2)',
    bounce: 'back.out(1.7)',
    // Standard easings
    easeIn: 'power2.in',
    easeOut: 'power2.out',
    easeInOut: 'power2.inOut',
    linear: 'none',
  },
  reducedMotion: {
    duration: 0.01,
    delay: 0,
  },
};

// GPU-accelerated properties only
export const GPU_PROPS = {
  transform: true,
  opacity: true,
  filter: true,
  willChange: 'transform, opacity',
};

// Safe properties for animation (GPU-accelerated)
export const SAFE_ANIMATION_PROPS = [
  'x',
  'y',
  'z',
  'scale',
  'scaleX',
  'scaleY',
  'rotation',
  'rotationX',
  'rotationY',
  'opacity',
  'filter',
];

export default ANIMATION_CONFIG;
