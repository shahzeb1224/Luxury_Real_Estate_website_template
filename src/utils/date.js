import { formatDate, formatTime, formatDateTime, formatRelativeTime } from '@/lib/formatters';

/**
 * Date utility functions
 * Re-export formatters and add additional utilities
 */

export const dateUtils = {
  format: formatDate,
  formatTime: formatTime,
  formatDateTime: formatDateTime,
  formatRelative: formatRelativeTime,

  /**
   * Check if a date is today
   * @param {string|number|Date} date - Date to check
   * @returns {boolean} True if today
   */
  isToday: (date) => {
    if (!date) return false;
    const d = new Date(date);
    if (isNaN(d.getTime())) return false;
    const today = new Date();
    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    );
  },

  /**
   * Check if a date is in the past
   * @param {string|number|Date} date - Date to check
   * @returns {boolean} True if in the past
   */
  isPast: (date) => {
    if (!date) return false;
    const d = new Date(date);
    if (isNaN(d.getTime())) return false;
    return d < new Date();
  },

  /**
   * Check if a date is in the future
   * @param {string|number|Date} date - Date to check
   * @returns {boolean} True if in the future
   */
  isFuture: (date) => {
    if (!date) return false;
    const d = new Date(date);
    if (isNaN(d.getTime())) return false;
    return d > new Date();
  },

  /**
   * Add days to a date
   * @param {string|number|Date} date - Date to add to
   * @param {number} days - Number of days to add
   * @returns {Date} New date
   */
  addDays: (date, days) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return new Date();
    d.setDate(d.getDate() + days);
    return d;
  },

  /**
   * Add months to a date
   * @param {string|number|Date} date - Date to add to
   * @param {number} months - Number of months to add
   * @returns {Date} New date
   */
  addMonths: (date, months) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return new Date();
    d.setMonth(d.getMonth() + months);
    return d;
  },

  /**
   * Add years to a date
   * @param {string|number|Date} date - Date to add to
   * @param {number} years - Number of years to add
   * @returns {Date} New date
   */
  addYears: (date, years) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return new Date();
    d.setFullYear(d.getFullYear() + years);
    return d;
  },

  /**
   * Get the difference in days between two dates
   * @param {string|number|Date} date1 - First date
   * @param {string|number|Date} date2 - Second date
   * @returns {number} Difference in days
   */
  daysBetween: (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return 0;
    const diff = d2.getTime() - d1.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  },

  /**
   * Get the start of the day (midnight)
   * @param {string|number|Date} date - Date to adjust
   * @returns {Date} Start of day
   */
  startOfDay: (date) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  },

  /**
   * Get the end of the day
   * @param {string|number|Date} date - Date to adjust
   * @returns {Date} End of day
   */
  endOfDay: (date) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return new Date();
    d.setHours(23, 59, 59, 999);
    return d;
  },

  /**
   * Check if a date is between two dates (inclusive)
   * @param {string|number|Date} date - Date to check
   * @param {string|number|Date} start - Start date
   * @param {string|number|Date} end - End date
   * @returns {boolean} True if between
   */
  isBetween: (date, start, end) => {
    const d = new Date(date);
    const s = new Date(start);
    const e = new Date(end);
    if (isNaN(d.getTime()) || isNaN(s.getTime()) || isNaN(e.getTime())) return false;
    return d >= s && d <= e;
  },

  /**
   * Get the age from a birthdate
   * @param {string|number|Date} birthdate - Birthdate
   * @returns {number} Age in years
   */
  getAge: (birthdate) => {
    if (!birthdate) return 0;
    const d = new Date(birthdate);
    if (isNaN(d.getTime())) return 0;
    const now = new Date();
    let age = now.getFullYear() - d.getFullYear();
    const month = now.getMonth() - d.getMonth();
    if (month < 0 || (month === 0 && now.getDate() < d.getDate())) {
      age--;
    }
    return age;
  },
};

export default dateUtils;
