import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with Tailwind CSS classes
 * Combines clsx and tailwind-merge for optimal class merging
 *
 * @param {...any} classes - Class names to merge
 * @returns {string} Merged class names
 *
 * @example
 * cn('text-red-500', 'hover:text-red-700', { 'font-bold': isActive })
 * // => 'text-red-500 hover:text-red-700 font-bold'
 */
export const cn = (...classes) => {
  return twMerge(clsx(...classes));
};

export default cn;
