/**
 * Color System - Luxury Real Estate Platform
 * Inspired by Apple, Sotheby's, Christie's, and Stripe
 *
 * Every color has been carefully selected to convey:
 * - Premium quality
 * - Timeless elegance
 * - Trust and authority
 * - Sophisticated minimalism
 */

export const colors = {
  /**
   * Primary Brand Colors
   * Deep Navy - Represents trust, stability, and premium quality
   * Gold - Represents luxury, achievement, and exclusivity
   */
  primary: {
    50: '#f0f2f5',
    100: '#e0e3e8',
    200: '#c2c8d1',
    300: '#a3acba',
    400: '#8591a3',
    500: '#66758c',
    600: '#4a5a72',
    700: '#2e4058',
    800: '#1a2a3e',
    900: '#0a1524',
    DEFAULT: '#1a2a3e',
  },

  secondary: {
    50: '#f8f4e8',
    100: '#f0e8d0',
    200: '#e1d1a1',
    300: '#d2ba72',
    400: '#c3a343',
    500: '#b48c14',
    600: '#a07d11',
    700: '#8c6e0e',
    800: '#785f0b',
    900: '#645008',
    DEFAULT: '#b48c14',
  },

  /**
   * Accent Colors
   * Used for highlights and special elements
   */
  accent: {
    gold: {
      light: '#e8d5a3',
      base: '#c9a84c',
      dark: '#a6842e',
    },
    navy: {
      light: '#2e4058',
      base: '#1a2a3e',
      dark: '#0a1524',
    },
    ivory: {
      light: '#faf8f4',
      base: '#f5f2eb',
      dark: '#e8e2d6',
    },
  },

  /**
   * Neutral Colors
   * Used for text, backgrounds, and surfaces
   */
  neutral: {
    white: '#ffffff',
    offWhite: '#faf9f6',
    cream: '#f8f6f0',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    black: '#000000',
  },

  /**
   * Background Colors
   */
  background: {
    primary: '#ffffff',
    secondary: '#f8f9fa',
    tertiary: '#f0f2f5',
    dark: '#0a1524',
    ivory: '#f8f6f0',
    glass: 'rgba(255, 255, 255, 0.8)',
  },

  /**
   * Surface Colors (Cards, Modals, etc.)
   */
  surface: {
    primary: '#ffffff',
    secondary: '#f8f9fa',
    dark: '#1a2a3e',
    glass: 'rgba(255, 255, 255, 0.6)',
    elevated: '#ffffff',
  },

  /**
   * Text Colors
   */
  text: {
    primary: '#1a2a3e',
    secondary: '#4a5a72',
    muted: '#66758c',
    light: '#a3acba',
    inverse: '#ffffff',
    gold: '#c9a84c',
    navy: '#1a2a3e',
  },

  /**
   * Border Colors
   */
  border: {
    light: '#e5e7eb',
    DEFAULT: '#d1d5db',
    medium: '#a3acba',
    dark: '#4a5a72',
    gold: '#c9a84c',
    navy: '#1a2a3e',
  },

  /**
   * Semantic Colors
   */
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    DEFAULT: '#059669',
  },

  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    DEFAULT: '#d97706',
  },

  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    DEFAULT: '#dc2626',
  },

  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    DEFAULT: '#2563eb',
  },

  /**
   * Overlay Colors
   * Used for modals, dropdowns, etc.
   */
  overlay: {
    light: 'rgba(0, 0, 0, 0.2)',
    DEFAULT: 'rgba(0, 0, 0, 0.5)',
    dark: 'rgba(0, 0, 0, 0.7)',
    navy: 'rgba(10, 21, 36, 0.8)',
    glass: 'rgba(255, 255, 255, 0.3)',
  },

  /**
   * Glass Effects
   */
  glass: {
    white: 'rgba(255, 255, 255, 0.8)',
    light: 'rgba(255, 255, 255, 0.6)',
    medium: 'rgba(255, 255, 255, 0.4)',
    dark: 'rgba(26, 26, 46, 0.6)',
    gold: 'rgba(201, 168, 76, 0.15)',
    navy: 'rgba(26, 26, 46, 0.85)',
  },

  /**
   * Hover Colors
   */
  hover: {
    primary: '#2e4058',
    secondary: '#c9a84c',
    gold: '#c9a84c',
    navy: '#2e4058',
    light: 'rgba(0, 0, 0, 0.05)',
    dark: 'rgba(255, 255, 255, 0.1)',
    glass: 'rgba(255, 255, 255, 0.9)',
  },

  /**
   * Dark Mode Colors
   */
  dark: {
    background: {
      primary: '#0a1524',
      secondary: '#1a2a3e',
      tertiary: '#2e4058',
    },
    surface: {
      primary: '#1a2a3e',
      secondary: '#2e4058',
      elevated: '#2e4058',
      glass: 'rgba(26, 42, 62, 0.85)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a3acba',
      muted: '#66758c',
      inverse: '#1a2a3e',
    },
    border: {
      light: '#2e4058',
      DEFAULT: '#4a5a72',
      dark: '#66758c',
    },
  },
};

/**
 * Color Utility Functions
 */
export const getColor = (path) => {
  return path.split('.').reduce((obj, key) => obj?.[key], colors);
};

export const getContrastColor = (hex) => {
  // Convert hex to RGB and calculate luminance
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#1a2a3e' : '#ffffff';
};

export const isDarkColor = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
};

export default colors;
