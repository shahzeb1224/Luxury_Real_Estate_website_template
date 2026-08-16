import { FORM } from './newsletter.constants';

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Validate name
 * @param {string} name - Name to validate
 * @returns {boolean} True if valid
 */
export const isValidName = (name) => {
  return name && name.trim().length >= FORM.VALIDATION.NAME_MIN;
};

/**
 * Validate newsletter form data
 * @param {object} data - Form data
 * @returns {object} Validation errors
 */
export const validateNewsletterForm = (data) => {
  const errors = {};

  if (!data.name || data.name.trim().length < FORM.VALIDATION.NAME_MIN) {
    errors.name = `Name must be at least ${FORM.VALIDATION.NAME_MIN} characters`;
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.consent) {
    errors.consent = 'You must agree to receive updates';
  }

  return errors;
};

/**
 * Get interest label from value
 * @param {string} value - Interest value
 * @returns {string} Interest label
 */
export const getInterestLabel = (value) => {
  const options = FORM.INTEREST_OPTIONS;
  const option = options.find((opt) => opt.value === value);
  return option ? option.label : value;
};

/**
 * Format newsletter data for API submission
 * @param {object} data - Form data
 * @returns {object} Formatted data
 */
export const formatNewsletterData = (data) => {
  return {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    interest: data.interest,
    consent: data.consent,
    source: 'website_newsletter',
    timestamp: new Date().toISOString(),
  };
};

export default {
  isValidEmail,
  isValidName,
  validateNewsletterForm,
  getInterestLabel,
  formatNewsletterData,
};
