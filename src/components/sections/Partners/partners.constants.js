export const PARTNER_CATEGORIES = {
  DEVELOPER: 'developer',
  BANK: 'bank',
  MORTGAGE: 'mortgage',
  INVESTMENT: 'investment',
  ARCHITECTURE: 'architecture',
  DESIGN: 'design',
  LEGAL: 'legal',
  CONSTRUCTION: 'construction',
  INSURANCE: 'insurance',
};

export const CATEGORY_LABELS = {
  [PARTNER_CATEGORIES.DEVELOPER]: 'Developer',
  [PARTNER_CATEGORIES.BANK]: 'Bank',
  [PARTNER_CATEGORIES.MORTGAGE]: 'Mortgage Provider',
  [PARTNER_CATEGORIES.INVESTMENT]: 'Investment Firm',
  [PARTNER_CATEGORIES.ARCHITECTURE]: 'Architecture',
  [PARTNER_CATEGORIES.DESIGN]: 'Interior Design',
  [PARTNER_CATEGORIES.LEGAL]: 'Legal Partner',
  [PARTNER_CATEGORIES.CONSTRUCTION]: 'Construction',
  [PARTNER_CATEGORIES.INSURANCE]: 'Insurance',
};

export const CATEGORY_COLORS = {
  [PARTNER_CATEGORIES.DEVELOPER]: 'bg-navy-50 text-navy-600',
  [PARTNER_CATEGORIES.BANK]: 'bg-gold-50 text-gold-600',
  [PARTNER_CATEGORIES.MORTGAGE]: 'bg-blue-50 text-blue-600',
  [PARTNER_CATEGORIES.INVESTMENT]: 'bg-emerald-50 text-emerald-600',
  [PARTNER_CATEGORIES.ARCHITECTURE]: 'bg-purple-50 text-purple-600',
  [PARTNER_CATEGORIES.DESIGN]: 'bg-pink-50 text-pink-600',
  [PARTNER_CATEGORIES.LEGAL]: 'bg-indigo-50 text-indigo-600',
  [PARTNER_CATEGORIES.CONSTRUCTION]: 'bg-orange-50 text-orange-600',
  [PARTNER_CATEGORIES.INSURANCE]: 'bg-teal-50 text-teal-600',
};

export const GRID = {
  COLUMNS: {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
  },
  GAP: 'gap-4 sm:gap-6',
};

export const MARQUEE = {
  SPEED: 40,
  DIRECTION: 'left',
  PAUSE_ON_HOVER: true,
};

export const ANIMATION = {
  STAGGER_DELAY: 80,
  DURATION: 500,
  EASING: 'cubic-bezier(0.16, 1, 0.3, 1)',
  TRANSITION: 'all 500ms cubic-bezier(0.16, 1, 0.3, 1)',
};

export default {
  PARTNER_CATEGORIES,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  GRID,
  MARQUEE,
  ANIMATION,
};
