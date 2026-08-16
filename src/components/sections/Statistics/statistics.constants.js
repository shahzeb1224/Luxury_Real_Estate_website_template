export const STATISTIC_VARIANTS = {
  CARD: {
    NAVY: 'navy',
    GOLD: 'gold',
    DARK: 'dark',
    GLASS: 'glass',
  },
  COLOR: {
    NAVY: {
      bg: 'bg-navy-50',
      icon: 'text-navy-600',
      value: 'text-navy-800',
      label: 'text-navy-500',
      border: 'border-navy-200',
    },
    GOLD: {
      bg: 'bg-gold-50',
      icon: 'text-gold-600',
      value: 'text-navy-800',
      label: 'text-navy-500',
      border: 'border-gold-200',
    },
    DARK: {
      bg: 'bg-navy-800',
      icon: 'text-gold-400',
      value: 'text-white',
      label: 'text-navy-300',
      border: 'border-navy-700',
    },
    GLASS: {
      bg: 'bg-glass-white backdrop-blur-sm',
      icon: 'text-navy-600',
      value: 'text-navy-800',
      label: 'text-navy-500',
      border: 'border-white/20',
    },
  },
  TREND: {
    UP: 'up',
    DOWN: 'down',
    STABLE: 'stable',
  },
  TREND_COLORS: {
    up: 'text-success-600 bg-success-50',
    down: 'text-danger-600 bg-danger-50',
    stable: 'text-navy-600 bg-navy-50',
  },
};

export const ANIMATION = {
  STAGGER_DELAY: 80,
  DURATION: 600,
  COUNTER_DURATION: 1200,
  EASING: 'cubic-bezier(0.16, 1, 0.3, 1)',
  TRANSITION: 'all 600ms cubic-bezier(0.16, 1, 0.3, 1)',
};

export const GRID = {
  STATISTICS: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
  INVESTMENT: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  GAP: 'gap-4 sm:gap-6',
};

export default {
  STATISTIC_VARIANTS,
  ANIMATION,
  GRID,
};
