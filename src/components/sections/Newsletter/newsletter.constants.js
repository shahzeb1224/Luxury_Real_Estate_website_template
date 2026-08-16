export const NEWSLETTER_BENEFIT_ICONS = {
  SPARKLES: 'Sparkles',
  HOME: 'Home',
  BRIEFCASE: 'Briefcase',
  TRENDING_UP: 'TrendingUp',
  LINE_CHART: 'LineChart',
  MAP_PIN: 'MapPin',
  DOLLAR_SIGN: 'DollarSign',
  CLOCK: 'Clock',
};

export const FORM = {
  INTEREST_OPTIONS: [
    { value: 'buying', label: 'Buying a Property' },
    { value: 'renting', label: 'Renting a Property' },
    { value: 'commercial', label: 'Commercial Real Estate' },
    { value: 'investment', label: 'Property Investment' },
    { value: 'luxury', label: 'Luxury Collection' },
    { value: 'all', label: 'All Categories' },
  ],
  VALIDATION: {
    NAME_MIN: 2,
    NAME_MAX: 60,
  },
};

export const ANIMATION = {
  STAGGER_DELAY: 80,
  DURATION: 500,
  EASING: 'cubic-bezier(0.16, 1, 0.3, 1)',
  TRANSITION: 'all 500ms cubic-bezier(0.16, 1, 0.3, 1)',
};

export default {
  NEWSLETTER_BENEFIT_ICONS,
  FORM,
  ANIMATION,
};
