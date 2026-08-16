import { CTA_VARIANTS } from './cta.constants';

/**
 * Get background variant class
 * @param {string} variant - Background variant
 * @returns {string} Background class
 */
export const getBackgroundVariant = (variant = 'navy') => {
  const variants = {
    navy: CTA_VARIANTS.BACKGROUND.NAVY,
    gold: CTA_VARIANTS.BACKGROUND.GOLD,
    white: CTA_VARIANTS.BACKGROUND.WHITE,
    glass: CTA_VARIANTS.BACKGROUND.GLASS,
  };
  return variants[variant] || variants.navy;
};

/**
 * Get text variant class
 * @param {string} variant - Text variant
 * @returns {string} Text class
 */
export const getTextVariant = (variant = 'light') => {
  const variants = {
    light: CTA_VARIANTS.TEXT.LIGHT,
    dark: CTA_VARIANTS.TEXT.DARK,
    gold: CTA_VARIANTS.TEXT.GOLD,
  };
  return variants[variant] || variants.light;
};

/**
 * Format phone number for display
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone
 */
export const formatPhoneForDisplay = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
};

/**
 * Format phone for tel: link
 * @param {string} phone - Phone number
 * @returns {string} Cleaned phone
 */
export const formatPhoneForLink = (phone) => {
  if (!phone) return '';
  return phone.replace(/\D/g, '');
};

/**
 * Format WhatsApp number for link
 * @param {string} phone - Phone number
 * @returns {string} WhatsApp formatted number
 */
export const formatWhatsAppNumber = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  // Remove leading 1 for US numbers if present
  const number = cleaned.startsWith('1') ? cleaned.slice(1) : cleaned;
  return number;
};

/**
 * Get benefit icon component
 * @param {string} icon - Icon key
 * @returns {string} Icon component name
 */
export const getBenefitIcon = (icon) => {
  const icons = {
    users: 'Users',
    checkcircle: 'CheckCircle',
    crown: 'Crown',
    trendingup: 'TrendingUp',
    heart: 'Heart',
    sparkles: 'Sparkles',
    star: 'Star',
    shield: 'Shield',
    award: 'Award',
  };
  return icons[icon?.toLowerCase()] || 'CheckCircle';
};

export default {
  getBackgroundVariant,
  getTextVariant,
  formatPhoneForDisplay,
  formatPhoneForLink,
  formatWhatsAppNumber,
  getBenefitIcon,
};
