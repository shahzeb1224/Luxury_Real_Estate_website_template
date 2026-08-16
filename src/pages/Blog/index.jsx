import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { pageVariants } from '@/animations/framer';
import { useSearchParams } from 'react-router-dom';
import { cn } from '@/utils/cn';
import Container from '@/components/shared/Container';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { BlogGrid, BlogSidebar } from '@/components/blog';
import { BLOG_POSTS, BLOG_CATEGORIES, BLOG_TAGS } from '@/data/blog';
import { filterPosts, sortPosts, paginatePosts, getCategories, getTags } from '@/lib/blog';
import { generateBlogSEOData } from '@/lib/blogSeo';
import { useDebounce } from '@/hooks/useDebounce';
import Loading from '@/components/shared/Loading';

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(BLOG_POSTS);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get('category') || '');
  const [tagFilter, setTagFilter] = useState(searchParams.get('tag') || '');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search query (300ms)
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Filter posts based on all criteria
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Apply search
    if (debouncedSearchQuery) {
      setIsSearching(true);
      result = filterPosts(result, { query: debouncedSearchQuery });
    } else {
      setIsSearching(false);
    }

    // Apply category filter
    if (categoryFilter) {
      result = filterPosts(result, { category: categoryFilter });
    }

    // Apply tag filter
    if (tagFilter) {
      result = filterPosts(result, { tag: tagFilter });
    }

    // Sort
    result = sortPosts(result, sortBy, sortOrder);

    return result;
  }, [posts, debouncedSearchQuery, categoryFilter, tagFilter, sortBy, sortOrder]);

  // Paginate results
  const paginatedResult = useMemo(() => {
    return paginatePosts(filteredPosts, currentPage, itemsPerPage);
  }, [filteredPosts, currentPage, itemsPerPage]);

  // Get unique categories and tags from filtered posts
  const categories = useMemo(() => {
    return getCategories(filteredPosts, true);
  }, [filteredPosts]);

  const tags = useMemo(() => {
    return getTags(filteredPosts, true);
  }, [filteredPosts]);

  // Get recent posts (for sidebar)
  const recentPosts = useMemo(() => {
    return sortPosts(posts, 'date', 'desc').slice(0, 5);
  }, [posts]);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearchQuery) params.set('q', debouncedSearchQuery);
    if (categoryFilter) params.set('category', categoryFilter);
    if (tagFilter) params.set('tag', tagFilter);
    setSearchParams(params, { replace: true });
  }, [debouncedSearchQuery, categoryFilter, tagFilter, setSearchParams]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, categoryFilter, tagFilter, sortBy, sortOrder]);

  // Handle search from sidebar
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  // Handle category filter from sidebar
  const handleCategoryClick = useCallback((category) => {
    setCategoryFilter(category === 'All' ? '' : category);
    setCurrentPage(1);
  }, []);

  // Handle tag filter from sidebar
  const handleTagClick = useCallback((tag) => {
    setTagFilter(tag === '#' ? '' : tag);
    setCurrentPage(1);
  }, []);

  // Handle sort change
  const handleSortChange = useCallback((field, order) => {
    setSortBy(field);
    setSortOrder(order || 'desc');
    setCurrentPage(1);
  }, []);

  // Handle page change
  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setCategoryFilter('');
    setTagFilter('');
    setCurrentPage(1);
  }, []);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
  ];

  // SEO data
  const seoData = generateBlogSEOData(null, {
    siteName: 'Elite Real Estate',
    siteUrl: 'https://eliterealestate.com',
    defaultImage: '/images/og-image.jpg',
    twitterHandle: '@eliterealestate',
    publisherName: 'Elite Real Estate',
    publisherLogo: '/images/logo.png',
    defaultDescription:
      'Expert insights on luxury real estate, market trends, and investment strategies.',
  });

  // Check if any filters are active
  const hasActiveFilters = !!(searchQuery || categoryFilter || tagFilter);

  return (
    <motion.div
      variants={pageVariants.fadeUp}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-gray-50 min-h-screen"
    >
      <Helmet>
        <title>Real Estate Blog | Market Insights & Luxury Living | Elite Real Estate</title>
        <meta
          name="description"
          content="Stay informed with the latest real estate market insights, luxury living tips, and investment strategies from Elite Real Estate experts."
        />
        <link rel="canonical" href="https://eliterealestate.com/blog" />
        <meta property="og:title" content="Real Estate Blog | Market Insights & Luxury Living" />
        <meta
          property="og:description"
          content="Expert insights on luxury real estate, market trends, and investment strategies."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        {seoData.schemasHTML && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: seoData.schemasJSON?.[0] || '' }}
          />
        )}
      </Helmet>

      {/* Breadcrumb */}
      <Container className="py-4">
        <Breadcrumb items={breadcrumbItems} />
      </Container>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 py-16 sm:py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-500 blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-gold-400 blur-3xl" />
        </div>

        <Container className="relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-white leading-[1.08]">
              Real Estate Insights
            </h1>
            <p className="text-gold-400 text-xl sm:text-2xl font-playfair font-semibold mt-2">
              Expert perspectives on luxury living
            </p>
            <p className="text-navy-300 text-base sm:text-lg mt-4 max-w-2xl">
              Discover the latest market trends, investment strategies, and luxury lifestyle
              insights from our team of experts.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Section padding="lg" background="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Blog Grid */}
            <div className="lg:col-span-2">
              {/* Results Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-xl font-playfair font-semibold text-navy-800">
                    {hasActiveFilters ? 'Search Results' : 'Latest Articles'}
                  </h2>
                  <p className="text-sm text-navy-500">
                    {paginatedResult.total.toLocaleString()} article
                    {paginatedResult.total !== 1 ? 's' : ''}
                    {debouncedSearchQuery && ` for "${debouncedSearchQuery}"`}
                    {categoryFilter && ` in ${categoryFilter}`}
                    {tagFilter && ` tagged #${tagFilter}`}
                  </p>
                </div>

                {/* Active Filters */}
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="text-sm font-medium text-gold-500 hover:text-gold-600 transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>

              {/* Loading State */}
              {loading ? (
                <Loading variant="skeleton" className="h-64" />
              ) : (
                <BlogGrid
                  posts={paginatedResult.items}
                  loading={loading}
                  columns={2}
                  showFeatured={!hasActiveFilters && currentPage === 1}
                  className="mt-4"
                />
              )}

              {/* Pagination */}
              {paginatedResult.totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(paginatedResult.page - 1)}
                      disabled={!paginatedResult.hasPreviousPage}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                        paginatedResult.hasPreviousPage
                          ? 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      )}
                      aria-label="Previous page"
                    >
                      Previous
                    </button>

                    <span className="text-sm text-navy-500">
                      Page {paginatedResult.page} of {paginatedResult.totalPages}
                    </span>

                    <button
                      onClick={() => handlePageChange(paginatedResult.page + 1)}
                      disabled={!paginatedResult.hasNextPage}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                        paginatedResult.hasNextPage
                          ? 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      )}
                      aria-label="Next page"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Blog Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar
                categories={categories.length > 0 ? categories : BLOG_CATEGORIES}
                recentPosts={recentPosts}
                tags={tags.length > 0 ? tags.map((t) => t.name) : BLOG_TAGS}
                onSearch={handleSearch}
                searchValue={searchQuery}
                onCategoryClick={handleCategoryClick}
                onTagClick={handleTagClick}
                activeCategory={categoryFilter}
                activeTag={tagFilter}
              />
            </div>
          </div>
        </Container>
      </Section>
    </motion.div>
  );
};

export default React.memo(BlogPage);
