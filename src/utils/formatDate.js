/**
 * Format a date string or timestamp
 * @param {string|number|Date} date - The date to format
 * @param {string} format - Format string (default: 'MMM D, YYYY')
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = "MMM D, YYYY", locale = "en-US") => {
  if (!date) {
    return "--";
  }

  const d = new Date(date);
  if (isNaN(d.getTime())) {
    return "--";
  }

  // Simple formatting options
  const options = {
    "MMM D, YYYY": {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
    "MMMM D, YYYY": {
      month: "long",
      day: "numeric",
      year: "numeric",
    },
    "MM/DD/YYYY": {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    },
    "YYYY-MM-DD": {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    },
    "DD MMM YYYY": {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  };

  const formatOptions = options[format] || options["MMM D, YYYY"];

  return new Intl.DateTimeFormat(locale, formatOptions).format(d);
};

/**
 * Get relative time string (e.g., "2 days ago")
 * @param {string|number|Date} date - The date to compare
 * @param {string} locale - Locale (default: 'en-US')
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date, locale = "en-US") => {
  if (!date) {
    return "--";
  }

  const d = new Date(date);
  if (isNaN(d.getTime())) {
    return "--";
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now - d) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  const rtf = new Intl.RelativeTimeFormatter(locale, { numeric: "auto" });

  for (const [unit, seconds] of Object.entries(intervals)) {
    const value = Math.floor(diffInSeconds / seconds);
    if (value >= 1) {
      return rtf.format(-value, unit);
    }
  }

  return rtf.format(-Math.floor(diffInSeconds), "second");
};

export default formatDate;
