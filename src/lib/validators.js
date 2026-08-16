/**
 * Validator Functions
 * Comprehensive validation for forms and data
 */

/**
 * Check if email is valid
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email.trim());
};

/**
 * Check if phone number is valid
 * @param {string} phone - Phone number to validate
 * @param {string} locale - Locale (default: 'US')
 * @returns {boolean} True if valid
 */
export const isValidPhone = (phone, locale = 'US') => {
  if (!phone || typeof phone !== 'string') return false;
  const cleaned = phone.replace(/\D/g, '');

  if (locale === 'US') {
    return cleaned.length === 10 || cleaned.length === 11;
  }

  // International: minimum 7 digits, maximum 15
  return cleaned.length >= 7 && cleaned.length <= 15;
};

/**
 * Check if URL is valid
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid
 */
export const isValidUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Check if value is not empty
 * @param {any} value - Value to check
 * @returns {boolean} True if not empty
 */
export const isRequired = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value).length > 0;
  return true;
};

/**
 * Check if value meets minimum length
 * @param {any} value - Value to check
 * @param {number} min - Minimum length
 * @returns {boolean} True if meets minimum
 */
export const hasMinLength = (value, min) => {
  if (!value) return false;
  if (typeof value === 'string') return value.length >= min;
  if (Array.isArray(value)) return value.length >= min;
  return false;
};

/**
 * Check if value meets maximum length
 * @param {any} value - Value to check
 * @param {number} max - Maximum length
 * @returns {boolean} True if meets maximum
 */
export const hasMaxLength = (value, max) => {
  if (!value) return true;
  if (typeof value === 'string') return value.length <= max;
  if (Array.isArray(value)) return value.length <= max;
  return true;
};

/**
 * Check if value is within range
 * @param {number} value - Value to check
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean} True if within range
 */
export const isInRange = (value, min, max) => {
  if (typeof value !== 'number' || isNaN(value)) return false;
  return value >= min && value <= max;
};

/**
 * Check if value is a valid number
 * @param {any} value - Value to check
 * @returns {boolean} True if valid number
 */
export const isValidNumber = (value) => {
  if (typeof value === 'number' && !isNaN(value)) return true;
  if (typeof value === 'string') {
    const num = Number(value);
    return !isNaN(num) && value.trim() !== '';
  }
  return false;
};

/**
 * Check if value is a valid integer
 * @param {any} value - Value to check
 * @returns {boolean} True if valid integer
 */
export const isValidInteger = (value) => {
  if (!isValidNumber(value)) return false;
  const num = Number(value);
  return Number.isInteger(num);
};

/**
 * Check if value is a valid positive number
 * @param {any} value - Value to check
 * @returns {boolean} True if positive
 */
export const isPositive = (value) => {
  if (!isValidNumber(value)) return false;
  return Number(value) > 0;
};

/**
 * Check if value is a valid positive integer
 * @param {any} value - Value to check
 * @returns {boolean} True if positive integer
 */
export const isPositiveInteger = (value) => {
  return isValidInteger(value) && Number(value) > 0;
};

/**
 * Check if value is a valid property ID
 * @param {string} id - Property ID to validate
 * @returns {boolean} True if valid
 */
export const isValidPropertyId = (id) => {
  if (!id || typeof id !== 'string') return false;
  // Property ID pattern: 8-10 alphanumeric characters
  const pattern = /^[A-Z0-9]{8,10}$/i;
  return pattern.test(id);
};

/**
 * Check if value is a valid zip code
 * @param {string} zip - Zip code to validate
 * @param {string} locale - Locale (default: 'US')
 * @returns {boolean} True if valid
 */
export const isValidZip = (zip, locale = 'US') => {
  if (!zip || typeof zip !== 'string') return false;

  if (locale === 'US') {
    return /^\d{5}(-\d{4})?$/.test(zip.trim());
  }

  // International: 4-10 alphanumeric characters
  // eslint-disable-next-line no-useless-escape
  return /^[A-Z0-9\s\-]{4,10}$/i.test(zip.trim());
};

/**
 * Check if value is a valid credit card number (basic)
 * @param {string} cardNumber - Card number to validate
 * @returns {boolean} True if valid
 */
export const isValidCreditCard = (cardNumber) => {
  if (!cardNumber || typeof cardNumber !== 'string') return false;
  const cleaned = cardNumber.replace(/\D/g, '');
  if (cleaned.length < 13 || cleaned.length > 19) return false;

  // Luhn algorithm
  let sum = 0;
  let shouldDouble = false;
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i));
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

/**
 * Check if value matches a pattern
 * @param {any} value - Value to check
 * @param {RegExp} pattern - Regular expression pattern
 * @returns {boolean} True if matches
 */
export const matchesPattern = (value, pattern) => {
  if (!value || typeof value !== 'string') return false;
  return pattern.test(value);
};

/**
 * Check if strings match (case insensitive)
 * @param {string} value1 - First string
 * @param {string} value2 - Second string
 * @returns {boolean} True if match
 */
export const matchesString = (value1, value2) => {
  if (!value1 || !value2) return false;
  return value1.toLowerCase().trim() === value2.toLowerCase().trim();
};

/**
 * Create validator object with validation functions
 * @param {object} rules - Validation rules
 * @returns {object} Validator object
 */
export const createValidator = (rules) => {
  const validate = (values) => {
    const errors = {};

    for (const [field, fieldRules] of Object.entries(rules)) {
      const value = values[field];

      for (const [rule, ruleValue] of Object.entries(fieldRules)) {
        let isValid = true;
        let errorMessage = '';

        switch (rule) {
          case 'required':
            isValid = isRequired(value);
            errorMessage = `${field} is required`;
            break;
          case 'minLength':
            isValid = hasMinLength(value, ruleValue);
            errorMessage = `${field} must be at least ${ruleValue} characters`;
            break;
          case 'maxLength':
            isValid = hasMaxLength(value, ruleValue);
            errorMessage = `${field} must be at most ${ruleValue} characters`;
            break;
          case 'email':
            isValid = isValidEmail(value);
            errorMessage = `${field} must be a valid email address`;
            break;
          case 'phone':
            isValid = isValidPhone(value);
            errorMessage = `${field} must be a valid phone number`;
            break;
          case 'url':
            isValid = isValidUrl(value);
            errorMessage = `${field} must be a valid URL`;
            break;
          case 'number':
            isValid = isValidNumber(value);
            errorMessage = `${field} must be a valid number`;
            break;
          case 'integer':
            isValid = isValidInteger(value);
            errorMessage = `${field} must be a valid integer`;
            break;
          case 'positive':
            isValid = isPositive(value);
            errorMessage = `${field} must be a positive number`;
            break;
          case 'range':
            isValid = isInRange(value, ruleValue.min, ruleValue.max);
            errorMessage = `${field} must be between ${ruleValue.min} and ${ruleValue.max}`;
            break;
          case 'match':
            isValid = matchesString(value, values[ruleValue]);
            errorMessage = `${field} must match ${ruleValue}`;
            break;
          default:
            break;
        }

        if (!isValid) {
          errors[field] = errorMessage;
          break;
        }
      }
    }

    return errors;
  };

  return { validate };
};

export default {
  isValidEmail,
  isValidPhone,
  isValidUrl,
  isRequired,
  hasMinLength,
  hasMaxLength,
  isInRange,
  isValidNumber,
  isValidInteger,
  isPositive,
  isPositiveInteger,
  isValidPropertyId,
  isValidZip,
  isValidCreditCard,
  matchesPattern,
  matchesString,
  createValidator,
};
