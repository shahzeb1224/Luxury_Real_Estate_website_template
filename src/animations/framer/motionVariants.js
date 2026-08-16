/**
 * Framer Motion Variants
 * Centralized animation variants for consistent motion design
 */

export const fadeVariants = {
  // Fade In
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },

  // Fade In Up
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },

  // Fade In Down
  fadeInDown: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },

  // Fade In Left
  fadeInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },

  // Fade In Right
  fadeInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },

  // Fade In Scale
  fadeInScale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const slideVariants = {
  // Slide Up
  slideUp: {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 50, opacity: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },

  // Slide Down
  slideDown: {
    initial: { y: -50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },

  // Slide Left
  slideLeft: {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 50, opacity: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },

  // Slide Right
  slideRight: {
    initial: { x: -50, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },

  // Slide In Bottom (for mobile menus, drawers)
  slideInBottom: {
    initial: { y: '100%' },
    animate: { y: '0%' },
    exit: { y: '100%' },
    transition: { duration: 0.3, ease: 'easeInOut' },
  },

  // Slide In Right (for sidebars, drawers)
  slideInRight: {
    initial: { x: '100%' },
    animate: { x: '0%' },
    exit: { x: '100%' },
    transition: { duration: 0.3, ease: 'easeInOut' },
  },

  // Slide In Left
  slideInLeft: {
    initial: { x: '-100%' },
    animate: { x: '0%' },
    exit: { x: '-100%' },
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

export const scaleVariants = {
  // Scale In
  scaleIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },

  // Scale Up
  scaleUp: {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },

  // Pop In (with bounce)
  popIn: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { duration: 0.3, ease: 'anticipate' },
  },

  // Heart Pop
  heartPop: {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
    transition: { type: 'spring', stiffness: 500, damping: 15 },
  },
};

export const staggerVariants = {
  // Stagger Container (children)
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  },

  // Stagger Container (slow)
  staggerContainerSlow: {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.08,
        staggerDirection: -1,
      },
    },
  },

  // Stagger Container (fast)
  staggerContainerFast: {
    animate: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.05,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
  },

  // Stagger Item (child)
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },

  // Stagger Item (with scale)
  staggerItemScale: {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: -20 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },

  // Stagger Item (from left)
  staggerItemLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },

  // Stagger Item (from right)
  staggerItemRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export const hoverVariants = {
  // Scale Hover
  scale: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 10 },
  },

  // Elevate Hover
  elevate: {
    whileHover: { y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' },
    whileTap: { y: 0 },
    transition: { duration: 0.2, ease: 'easeOut' },
  },

  // Glow Hover
  glow: {
    whileHover: { boxShadow: '0 0 30px rgba(201,168,76,0.3)' },
    transition: { duration: 0.3, ease: 'easeOut' },
  },

  // Scale + Elevate
  scaleElevate: {
    whileHover: { scale: 1.03, y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.15)' },
    whileTap: { scale: 0.97, y: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 15 },
  },

  // Image Zoom
  imageZoom: {
    whileHover: { scale: 1.08 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },

  // Underline
  underline: {
    whileHover: { scaleX: 1 },
    whileTap: { scaleX: 0.8 },
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },

  // Opacity
  opacity: {
    whileHover: { opacity: 1 },
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

export const tapVariants = {
  // Button Tap
  button: {
    whileTap: {
      scale: 0.95,
      transition: { duration: 0.1, ease: 'easeOut' },
    },
  },

  // Card Tap
  card: {
    whileTap: {
      scale: 0.98,
      transition: { duration: 0.1, ease: 'easeOut' },
    },
  },

  // Icon Tap
  icon: {
    whileTap: {
      scale: 0.85,
      transition: { duration: 0.1, ease: 'easeOut' },
    },
  },
};

export const gestureVariants = {
  // Drag
  drag: {
    drag: true,
    dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
    dragElastic: 0.1,
    dragTransition: { power: 0.2, timeConstant: 100 },
  },

  // Drag X
  dragX: {
    drag: 'x',
    dragConstraints: { left: 0, right: 0 },
    dragElastic: 0.05,
  },

  // Drag Y
  dragY: {
    drag: 'y',
    dragConstraints: { top: 0, bottom: 0 },
    dragElastic: 0.05,
  },
};

export const scrollVariants = {
  // Scroll Reveal
  scrollReveal: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },

  // Scroll Reveal (with scale)
  scrollRevealScale: {
    initial: { opacity: 0, scale: 0.9, y: 30 },
    whileInView: { opacity: 1, scale: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },

  // Scroll Reveal (from left)
  scrollRevealLeft: {
    initial: { opacity: 0, x: -40 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },

  // Scroll Reveal (from right)
  scrollRevealRight: {
    initial: { opacity: 0, x: 40 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.5, ease: 'easeOut' },
  },

  // Scroll Parallax
  scrollParallax: {
    whileInView: { y: 0 },
    initial: { y: 50 },
    viewport: { once: false, amount: 0.1 },
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export const transitionVariants = {
  // Spring
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 20,
    mass: 1,
  },

  // Spring (gentle)
  springGentle: {
    type: 'spring',
    stiffness: 200,
    damping: 25,
    mass: 1,
  },

  // Spring (bounce)
  springBounce: {
    type: 'spring',
    stiffness: 500,
    damping: 12,
    mass: 0.5,
  },

  // Tween (smooth)
  tween: {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.5,
  },

  // Tween (ease out)
  tweenOut: {
    type: 'tween',
    ease: 'easeOut',
    duration: 0.5,
  },

  // Tween (ease in)
  tweenIn: {
    type: 'tween',
    ease: 'easeIn',
    duration: 0.5,
  },
};

export const staggerOptions = {
  // Default stagger
  default: {
    staggerChildren: 0.08,
    delayChildren: 0.1,
  },

  // Slow stagger
  slow: {
    staggerChildren: 0.15,
    delayChildren: 0.2,
  },

  // Fast stagger
  fast: {
    staggerChildren: 0.04,
    delayChildren: 0.05,
  },

  // No stagger
  none: {
    staggerChildren: 0,
    delayChildren: 0,
  },
};

// Combined export
export const motionVariants = {
  fade: fadeVariants,
  slide: slideVariants,
  scale: scaleVariants,
  stagger: staggerVariants,
  hover: hoverVariants,
  tap: tapVariants,
  gesture: gestureVariants,
  scroll: scrollVariants,
  transition: transitionVariants,
  staggerOptions,
};

export default motionVariants;
