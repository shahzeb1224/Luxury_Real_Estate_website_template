/**
 * Blog Utilities
 * Pure functions for blog data manipulation
 */

/**
 * Get a single blog post by slug
 * @param {Array} posts - Array of blog posts
 * @param {string} slug - The post slug
 * @returns {Object|null} The post or null if not found
 */
export const getPostBySlug = (posts, slug) => {
  if (!Array.isArray(posts) || !slug) return null;
  return posts.find((post) => post.slug === slug) || null;
};

/**
 * Get related posts based on categories and tags
 * @param {Array} posts - Array of blog posts
 * @param {Object} post - The current post
 * @param {number} limit - Maximum number of related posts to return
 * @returns {Array} Array of related posts
 */
export const getRelatedPosts = (posts, post, limit = 3) => {
  if (!Array.isArray(posts) || !post) return [];

  const currentPostId = post.id;

  // Filter out the current post
  const otherPosts = posts.filter((p) => p.id !== currentPostId);

  // Score each post based on category and tag matches
  const scoredPosts = otherPosts.map((otherPost) => {
    let score = 0;

    // Category match (higher weight)
    if (otherPost.category === post.category) {
      score += 3;
    }

    // Tag matches
    if (post.tags && otherPost.tags) {
      const matchingTags = otherPost.tags.filter((tag) => post.tags.includes(tag));
      score += matchingTags.length;
    }

    // Author match (bonus)
    if (otherPost.author?.name === post.author?.name) {
      score += 1;
    }

    return {
      ...otherPost,
      _score: score,
    };
  });

  // Sort by score descending, then by date descending
  scoredPosts.sort((a, b) => {
    if (b._score !== a._score) {
      return b._score - a._score;
    }
    return new Date(b.date) - new Date(a.date);
  });

  // Remove the score property and return limited results
  return scoredPosts.slice(0, limit).map(({ _score, ...post }) => post);
};

/**
 * Get featured posts
 * @param {Array} posts - Array of blog posts
 * @param {number} limit - Maximum number of featured posts to return
 * @returns {Array} Array of featured posts
 */
export const getFeaturedPosts = (posts, limit = 3) => {
  if (!Array.isArray(posts)) return [];

  return posts
    .filter((post) => post.featured === true)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
};

/**
 * Filter posts by various criteria
 * @param {Array} posts - Array of blog posts
 * @param {Object} filters - Filter criteria
 * @param {string} filters.category - Category to filter by
 * @param {string} filters.tag - Tag to filter by
 * @param {string} filters.author - Author name to filter by
 * @param {string} filters.query - Search query
 * @param {boolean} filters.featured - Filter by featured status
 * @returns {Array} Filtered array of posts
 */
export const filterPosts = (posts, filters = {}) => {
  if (!Array.isArray(posts)) return [];

  let result = [...posts];

  // Category filter
  if (filters.category) {
    const categoryLower = filters.category.toLowerCase();
    result = result.filter((post) => post.category.toLowerCase() === categoryLower);
  }

  // Tag filter
  if (filters.tag) {
    const tagLower = filters.tag.toLowerCase();
    result = result.filter((post) => post.tags?.some((tag) => tag.toLowerCase() === tagLower));
  }

  // Author filter
  if (filters.author) {
    const authorLower = filters.author.toLowerCase();
    result = result.filter((post) => post.author?.name?.toLowerCase() === authorLower);
  }

  // Featured filter
  if (filters.featured !== undefined && filters.featured !== null) {
    result = result.filter((post) => post.featured === filters.featured);
  }

  // Search query filter (title, excerpt, content, category, tags)
  if (filters.query) {
    const queryLower = filters.query.toLowerCase().trim();
    result = result.filter((post) => {
      const searchableFields = [
        post.title,
        post.excerpt,
        post.content,
        post.category,
        ...(post.tags || []),
        post.author?.name,
      ];

      return searchableFields.some((field) => field?.toLowerCase().includes(queryLower));
    });
  }

  return result;
};

/**
 * Search posts by query across multiple fields
 * @param {Array} posts - Array of blog posts
 * @param {string} query - Search query
 * @param {Array} fields - Fields to search in (defaults to title, excerpt, content)
 * @returns {Array} Filtered array of posts
 */
export const searchPosts = (posts, query, fields = ['title', 'excerpt', 'content']) => {
  if (!Array.isArray(posts) || !query) return posts;

  const queryLower = query.toLowerCase().trim();

  return posts.filter((post) => {
    return fields.some((field) => {
      const value = post[field];
      if (Array.isArray(value)) {
        return value.some((item) => item.toLowerCase().includes(queryLower));
      }
      return value?.toLowerCase().includes(queryLower);
    });
  });
};

/**
 * Paginate posts
 * @param {Array} posts - Array of blog posts
 * @param {number} page - Current page number (1-indexed)
 * @param {number} perPage - Number of items per page
 * @returns {Object} Paginated result with items, total, page, totalPages, and metadata
 */
export const paginatePosts = (posts, page = 1, perPage = 9) => {
  if (!Array.isArray(posts)) {
    return {
      items: [],
      total: 0,
      page: 1,
      totalPages: 0,
      perPage,
      hasNextPage: false,
      hasPreviousPage: false,
      startIndex: 0,
      endIndex: 0,
    };
  }

  const total = posts.length;
  const totalPages = Math.ceil(total / perPage);
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, total);

  return {
    items: posts.slice(startIndex, endIndex),
    total,
    totalPages,
    page: currentPage,
    perPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    startIndex,
    endIndex,
  };
};

/**
 * Sort posts by various criteria
 * @param {Array} posts - Array of blog posts
 * @param {string} sortBy - Sort field (date, title, readTime, views)
 * @param {string} order - Sort order (asc or desc)
 * @returns {Array} Sorted array of posts
 */
export const sortPosts = (posts, sortBy = 'date', order = 'desc') => {
  if (!Array.isArray(posts)) return [];

  const sorted = [...posts];

  const compare = (a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    // Handle dates
    if (sortBy === 'date') {
      valA = new Date(valA);
      valB = new Date(valB);
    }

    // Handle strings
    if (typeof valA === 'string' && typeof valB === 'string') {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }

    // Handle undefined/null
    if (valA === undefined || valA === null) return 1;
    if (valB === undefined || valB === null) return -1;

    if (valA < valB) return order === 'asc' ? -1 : 1;
    if (valA > valB) return order === 'asc' ? 1 : -1;
    return 0;
  };

  return sorted.sort(compare);
};

/**
 * Get popular posts by views or read time
 * @param {Array} posts - Array of blog posts
 * @param {string} metric - Metric to rank by (views or readTime)
 * @param {number} limit - Maximum number of posts to return
 * @returns {Array} Array of popular posts
 */
export const getPopularPosts = (posts, metric = 'views', limit = 5) => {
  if (!Array.isArray(posts)) return [];

  const sorted = sortPosts(posts, metric, 'desc');
  return sorted.slice(0, limit);
};

/**
 * Get posts by category
 * @param {Array} posts - Array of blog posts
 * @param {string} category - Category name
 * @returns {Array} Filtered array of posts
 */
export const getPostsByCategory = (posts, category) => {
  if (!Array.isArray(posts) || !category) return [];
  return posts.filter((post) => post.category.toLowerCase() === category.toLowerCase());
};

/**
 * Get posts by author
 * @param {Array} posts - Array of blog posts
 * @param {string} authorName - Author name
 * @returns {Array} Filtered array of posts
 */
export const getPostsByAuthor = (posts, authorName) => {
  if (!Array.isArray(posts) || !authorName) return [];
  return posts.filter((post) => post.author?.name?.toLowerCase() === authorName.toLowerCase());
};

/**
 * Get posts by tag
 * @param {Array} posts - Array of blog posts
 * @param {string} tag - Tag name
 * @returns {Array} Filtered array of posts
 */
export const getPostsByTag = (posts, tag) => {
  if (!Array.isArray(posts) || !tag) return [];
  const tagLower = tag.toLowerCase();
  return posts.filter((post) => post.tags?.some((t) => t.toLowerCase() === tagLower));
};

/**
 * Get all unique categories from posts
 * @param {Array} posts - Array of blog posts
 * @param {boolean} withCount - Include post count for each category
 * @returns {Array} Array of categories
 */
export const getCategories = (posts, withCount = false) => {
  if (!Array.isArray(posts)) return [];

  if (!withCount) {
    const categories = new Set(posts.map((post) => post.category));
    return Array.from(categories).sort();
  }

  const categoryMap = {};
  posts.forEach((post) => {
    const category = post.category;
    if (categoryMap[category]) {
      categoryMap[category]++;
    } else {
      categoryMap[category] = 1;
    }
  });

  return Object.entries(categoryMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};

/**
 * Get all unique tags from posts with counts
 * @param {Array} posts - Array of blog posts
 * @param {boolean} withCount - Include post count for each tag
 * @returns {Array} Array of tags
 */
export const getTags = (posts, withCount = false) => {
  if (!Array.isArray(posts)) return [];

  if (!withCount) {
    const tags = new Set();
    posts.forEach((post) => {
      post.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }

  const tagMap = {};
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      if (tagMap[tag]) {
        tagMap[tag]++;
      } else {
        tagMap[tag] = 1;
      }
    });
  });

  return Object.entries(tagMap)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};

/**
 * Get a random selection of posts
 * @param {Array} posts - Array of blog posts
 * @param {number} count - Number of posts to return
 * @returns {Array} Random selection of posts
 */
export const getRandomPosts = (posts, count = 3) => {
  if (!Array.isArray(posts) || posts.length === 0) return [];

  const shuffled = [...posts];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
};

/**
 * Get posts within a date range
 * @param {Array} posts - Array of blog posts
 * @param {string} startDate - Start date (YYYY-MM-DD)
 * @param {string} endDate - End date (YYYY-MM-DD)
 * @returns {Array} Filtered array of posts
 */
export const getPostsByDateRange = (posts, startDate, endDate) => {
  if (!Array.isArray(posts)) return [];

  const start = new Date(startDate);
  const end = new Date(endDate);

  return posts.filter((post) => {
    const postDate = new Date(post.date);
    return postDate >= start && postDate <= end;
  });
};

/**
 * Get archive data (years and months with post counts)
 * @param {Array} posts - Array of blog posts
 * @returns {Object} Archive data grouped by year and month
 */
export const getArchiveData = (posts) => {
  if (!Array.isArray(posts)) return {};

  const archive = {};

  posts.forEach((post) => {
    const date = new Date(post.date);
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'long' });

    if (!archive[year]) {
      archive[year] = {};
    }
    if (!archive[year][month]) {
      archive[year][month] = 0;
    }
    archive[year][month]++;
  });

  return archive;
};

export default {
  getPostBySlug,
  getRelatedPosts,
  getFeaturedPosts,
  filterPosts,
  searchPosts,
  paginatePosts,
  sortPosts,
  getPopularPosts,
  getPostsByCategory,
  getPostsByAuthor,
  getPostsByTag,
  getCategories,
  getTags,
  getRandomPosts,
  getPostsByDateRange,
  getArchiveData,
};
