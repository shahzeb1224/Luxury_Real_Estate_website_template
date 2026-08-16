/**
 * useBlog Hook
 * A comprehensive hook for managing blog data with filtering, sorting, and pagination
 *
 * @param {Object} options - Configuration options
 * @param {Array} options.initialPosts - Initial blog posts data
 * @param {number} options.itemsPerPage - Number of items per page (default: 9)
 * @param {string} options.defaultSort - Default sort field (default: 'date')
 * @param {string} options.defaultOrder - Default sort order (default: 'desc')
 * @param {string} options.initialCategory - Initial category filter
 * @param {string} options.initialTag - Initial tag filter
 * @param {string} options.initialQuery - Initial search query
 * @param {boolean} options.initialFeatured - Initial featured filter
 * @returns {Object} Blog state and control functions
 *
 * @example
 * const { posts, loading, filterByCategory, searchPosts } = useBlog({
 *   initialPosts: blogData,
 *   itemsPerPage: 6,
 * });
 */

import { useState, useMemo, useCallback, useEffect } from 'react';
import {
  filterPosts,
  searchPosts,
  sortPosts,
  paginatePosts,
  getFeaturedPosts,
  getCategories,
  getTags,
} from '@/lib/blog';

const useBlog = (options = {}) => {
  const {
    initialPosts = [],
    itemsPerPage = 9,
    defaultSort = 'date',
    defaultOrder = 'desc',
    initialCategory = '',
    initialTag = '',
    initialQuery = '',
    initialFeatured = false,
  } = options;

  // State
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(defaultSort);
  const [sortOrder, setSortOrder] = useState(defaultOrder);
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [tagFilter, setTagFilter] = useState(initialTag);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [featuredFilter, setFeaturedFilter] = useState(initialFeatured);
  const [error, setError] = useState(null);

  // Compute filtered posts with useMemo
  const filteredPosts = useMemo(() => {
    let result = posts;

    // Apply search
    if (searchQuery) {
      result = searchPosts(result, searchQuery);
    }

    // Apply filters
    const filters = {
      category: categoryFilter || undefined,
      tag: tagFilter || undefined,
      featured: featuredFilter || undefined,
    };
    result = filterPosts(result, filters);

    // Apply sorting
    result = sortPosts(result, sortBy, sortOrder);

    return result;
  }, [posts, searchQuery, categoryFilter, tagFilter, featuredFilter, sortBy, sortOrder]);

  // Compute paginated posts
  const paginatedResult = useMemo(() => {
    return paginatePosts(filteredPosts, currentPage, itemsPerPage);
  }, [filteredPosts, currentPage, itemsPerPage]);

  // Compute categories and tags from filtered posts
  const categories = useMemo(() => {
    return getCategories(filteredPosts, true);
  }, [filteredPosts]);

  const tags = useMemo(() => {
    return getTags(filteredPosts, true);
  }, [filteredPosts]);

  // Featured posts
  const featuredPosts = useMemo(() => {
    return getFeaturedPosts(posts);
  }, [posts]);

  // Simulate loading (for API integration)
  const loadPosts = useCallback(async (fetchFn) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFn();
      setPosts(data);
      setCurrentPage(1);
    } catch (err) {
      setError(err.message || 'Failed to load posts');
      console.error('useBlog: Error loading posts', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter by category
  const filterByCategory = useCallback((category) => {
    setCategoryFilter(category);
    setCurrentPage(1);
  }, []);

  // Filter by tag
  const filterByTag = useCallback((tag) => {
    setTagFilter(tag);
    setCurrentPage(1);
  }, []);

  // Filter by featured status
  const filterByFeatured = useCallback((featured) => {
    setFeaturedFilter(featured);
    setCurrentPage(1);
  }, []);

  // Search posts
  const searchPostsByQuery = useCallback((query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  // Sort posts
  const sortPostsBy = useCallback((field, order = 'desc') => {
    setSortBy(field);
    setSortOrder(order);
    setCurrentPage(1);
  }, []);

  // Reset all filters
  const resetFilters = useCallback(() => {
    setCategoryFilter('');
    setTagFilter('');
    setSearchQuery('');
    setFeaturedFilter(false);
    setSortBy(defaultSort);
    setSortOrder(defaultOrder);
    setCurrentPage(1);
  }, [defaultSort, defaultOrder]);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return !!(categoryFilter || tagFilter || searchQuery || featuredFilter);
  }, [categoryFilter, tagFilter, searchQuery, featuredFilter]);

  // Go to specific page
  const goToPage = useCallback(
    (page) => {
      const totalPages = paginatedResult.totalPages;
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
      // Scroll to top of results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [paginatedResult.totalPages]
  );

  // Go to next page
  const goToNextPage = useCallback(() => {
    if (paginatedResult.hasNextPage) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [paginatedResult.hasNextPage]);

  // Go to previous page
  const goToPreviousPage = useCallback(() => {
    if (paginatedResult.hasPreviousPage) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [paginatedResult.hasPreviousPage]);

  // Update posts data (for external updates)
  const updatePosts = useCallback((newPosts) => {
    setPosts(newPosts);
    setCurrentPage(1);
  }, []);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchQuery('');
    setCurrentPage(1);
  }, []);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  // Simulated loading effect (for future API integration)
  useEffect(() => {
    if (initialPosts.length > 0) {
      setPosts(initialPosts);
    }
  }, [initialPosts]);

  return {
    // Data
    posts: paginatedResult.items,
    allPosts: filteredPosts,
    featuredPosts,
    categories,
    tags,
    totalPosts: paginatedResult.total,
    totalPages: paginatedResult.totalPages,
    currentPage: paginatedResult.page,
    hasNextPage: paginatedResult.hasNextPage,
    hasPreviousPage: paginatedResult.hasPreviousPage,

    // Loading & Error
    loading,
    error,

    // Filters
    categoryFilter,
    tagFilter,
    searchQuery,
    featuredFilter,
    sortBy,
    sortOrder,
    hasActiveFilters,

    // Actions
    loadPosts,
    filterByCategory,
    filterByTag,
    filterByFeatured,
    searchPostsByQuery,
    sortPostsBy,
    resetFilters,
    clearSearch,
    clearAllFilters,
    updatePosts,
    goToPage,
    goToNextPage,
    goToPreviousPage,
  };
};

export default useBlog;
