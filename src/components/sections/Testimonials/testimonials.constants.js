export const CAROUSEL = {
  COLUMNS: {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  },
  AUTOPLAY: {
    DEFAULT: true,
    INTERVAL: 6000,
  },
  TRANSITION: {
    DURATION: 500,
    EASING: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
};

export const RATING = {
  MAX: 5,
  STARS: {
    FILLED: 'fill-gold-500 text-gold-500',
    EMPTY: 'text-navy-200',
  },
};

export const TESTIMONIAL_VARIANTS = {
  CARD: {
    DEFAULT: 'default',
    FEATURED: 'premium',
  },
  TRANSACTION: {
    PURCHASE: 'Purchase',
    SALE: 'Sale',
    RENT: 'Rent',
    INVESTMENT: 'Investment',
  },
};

export const ANIMATION = {
  STAGGER_DELAY: 80,
  DURATION: 500,
  EASING: 'cubic-bezier(0.16, 1, 0.3, 1)',
  TRANSITION: 'all 500ms cubic-bezier(0.16, 1, 0.3, 1)',
};

export default {
  CAROUSEL,
  RATING,
  TESTIMONIAL_VARIANTS,
  ANIMATION,
};
