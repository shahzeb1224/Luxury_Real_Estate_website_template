/**
 * Navbar Animations
 * Sticky scroll, hover, and menu animations
 */

import gsap from 'gsap';
import animationsManager from './animationsManager';
import { ANIMATION_CONFIG } from './config';

export const navbarAnimations = {
  /**
   * Navbar scroll reveal (transparent to solid)
   */
  scrollReveal: (navbar, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.standard,
      ease = ANIMATION_CONFIG.easings.smooth,
      solidBg = 'rgba(255,255,255,0.95)',
      solidShadow = '0 4px 20px rgba(0,0,0,0.06)',
      start = 'top -20',
      end = 'top -80',
    } = config;

    if (!navbar) return;

    if (animationsManager.isReducedMotion) {
      gsap.set(navbar, { backgroundColor: solidBg, boxShadow: solidShadow });
      return;
    }

    // Set initial state
    gsap.set(navbar, {
      backgroundColor: 'rgba(255,255,255,0)',
      boxShadow: 'none',
    });

    return animationsManager.createScrollTrigger({
      trigger: navbar,
      start,
      end,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(navbar, {
          backgroundColor: `rgba(255,255,255,${progress * 0.95})`,
          boxShadow: `0 ${progress * 4}px ${progress * 20}px rgba(0,0,0,${progress * 0.06})`,
          duration: 0.1,
          overwrite: 'auto',
        });
      },
    });
  },

  /**
   * Navbar logo animation
   */
  logo: (logo, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.standard,
      ease = ANIMATION_CONFIG.easings.luxury,
      from = { opacity: 0, x: -20 },
      to = { opacity: 1, x: 0 },
      delay = 0.1,
    } = config;

    if (!logo) return;

    if (animationsManager.isReducedMotion) {
      gsap.set(logo, { opacity: 1, x: 0 });
      return;
    }

    return animationsManager.createAnimation(
      logo,
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
   * Navbar links entrance (staggered)
   */
  linksEntrance: (links, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.standard,
      stagger = 0.05,
      ease = ANIMATION_CONFIG.easings.elegant,
      from = { opacity: 0, y: -10 },
      to = { opacity: 1, y: 0 },
      delay = 0.2,
    } = config;

    if (!links || links.length === 0) return;

    if (animationsManager.isReducedMotion) {
      links.forEach((link) => gsap.set(link, { opacity: 1, y: 0 }));
      return;
    }

    return animationsManager.createStagger(links, from, to, {
      duration,
      delay,
      ease,
      each: stagger,
      from: 'start',
    });
  },

  /**
   * Mobile menu slide animation
   */
  mobileMenu: (menu, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.fast,
      ease = ANIMATION_CONFIG.easings.easeOut,
      from = { x: '100%' },
      to = { x: '0%' },
      overlay,
    } = config;

    if (!menu) return;

    if (animationsManager.isReducedMotion) {
      gsap.set(menu, { x: '0%' });
      if (overlay) gsap.set(overlay, { opacity: 1 });
      return;
    }

    const tl = animationsManager.createTimeline({
      duration,
      ease,
    });

    // Overlay fade
    if (overlay) {
      tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: duration * 0.5 });
    }

    // Menu slide
    tl.fromTo(
      menu,
      from,
      {
        ...to,
        duration,
        ease,
      },
      '-=0.1'
    );

    return tl;
  },

  /**
   * Mobile menu close animation
   */
  mobileMenuClose: (menu, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.fast,
      ease = ANIMATION_CONFIG.easings.easeIn,
      to = { x: '100%' },
      overlay,
    } = config;

    if (!menu) return;

    if (animationsManager.isReducedMotion) {
      gsap.set(menu, { x: '100%' });
      if (overlay) gsap.set(overlay, { opacity: 0 });
      return;
    }

    const tl = animationsManager.createTimeline({
      duration,
      ease,
    });

    // Menu slide out
    tl.to(menu, {
      ...to,
      duration,
      ease,
    });

    // Overlay fade
    if (overlay) {
      tl.to(overlay, { opacity: 0, duration: duration * 0.7 }, '-=0.1');
    }

    return tl;
  },

  /**
   * Navbar hover underline animation
   */
  hoverUnderline: (link, config = {}) => {
    const {
      duration = ANIMATION_CONFIG.durations.fast,
      ease = ANIMATION_CONFIG.easings.smooth,
      width = '100%',
    } = config;

    if (!link) return;

    if (animationsManager.isReducedMotion) {
      return;
    }

    const underline = link.querySelector('.nav-underline') || link;

    const enterAnim = () => {
      gsap.to(underline, {
        scaleX: 1,
        duration,
        ease,
        transformOrigin: 'left center',
        overwrite: 'auto',
      });
    };

    const leaveAnim = () => {
      gsap.to(underline, {
        scaleX: 0,
        duration,
        ease,
        transformOrigin: 'left center',
        overwrite: 'auto',
      });
    };

    link.addEventListener('mouseenter', enterAnim);
    link.addEventListener('mouseleave', leaveAnim);

    return () => {
      link.removeEventListener('mouseenter', enterAnim);
      link.removeEventListener('mouseleave', leaveAnim);
    };
  },
};

export default navbarAnimations;
