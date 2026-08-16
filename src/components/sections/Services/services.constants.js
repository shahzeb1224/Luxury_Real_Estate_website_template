export const SERVICE_VARIANTS = {
  CARD: {
    NAVY: 'navy',
    GOLD: 'gold',
    DARK: 'dark',
    GLASS: 'glass',
  },
  ICON: {
    NAVY: 'text-navy-600',
    GOLD: 'text-gold-600',
    DARK: 'text-gold-400',
    GLASS: 'text-navy-600',
  },
  BORDER: {
    NAVY: 'border-navy-200 hover:border-navy-400',
    GOLD: 'border-gold-200 hover:border-gold-400',
    DARK: 'border-navy-700 hover:border-gold-400',
    GLASS: 'border-white/20 hover:border-gold-300',
  },
  BG: {
    NAVY: 'bg-navy-50',
    GOLD: 'bg-gold-50',
    DARK: 'bg-navy-800',
    GLASS: 'bg-glass-white backdrop-blur-sm',
  },
  HEADING: {
    NAVY: 'text-navy-800',
    GOLD: 'text-navy-800',
    DARK: 'text-white',
    GLASS: 'text-navy-800',
  },
  TEXT: {
    NAVY: 'text-navy-500',
    GOLD: 'text-navy-600',
    DARK: 'text-navy-300',
    GLASS: 'text-navy-500',
  },
  ACCENT: {
    NAVY: 'text-navy-600',
    GOLD: 'text-gold-600',
    DARK: 'text-gold-400',
    GLASS: 'text-gold-500',
  },
};

export const ANIMATION = {
  STAGGER_DELAY: 80,
  DURATION: 500,
  EASING: 'cubic-bezier(0.16, 1, 0.3, 1)',
  TRANSITION: 'all 500ms cubic-bezier(0.16, 1, 0.3, 1)',
};

export const GRID = {
  COLUMNS: {
    DEFAULT: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    GAP: 'gap-4 sm:gap-6',
  },
};

export default {
  SERVICE_VARIANTS,
  ANIMATION,
  GRID,
};
