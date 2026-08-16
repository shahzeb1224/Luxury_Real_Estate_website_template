import React, { useState, useEffect, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { getPropertyImage } from '@/assets/images/properties';
import { Search, ChevronRight, Tag, X } from 'lucide-react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { NewsletterForm } from '@/components/forms';

const BlogSidebar = forwardRef(
  (
    {
      categories = [],
      recentPosts = [],
      tags = [],
      onSearch,
      onCategoryClick,
      onTagClick,
      searchValue = '',
      activeCategory = '',
      activeTag = '',
      className = '',
      ...props
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = useState(searchValue);

    // Sync with external search value
    useEffect(() => {
      setSearchQuery(searchValue);
    }, [searchValue]);

    const handleSearch = (e) => {
      e.preventDefault();
      if (onSearch) {
        onSearch(searchQuery);
      }
    };

    const handleInputChange = (e) => {
      const value = e.target.value;
      setSearchQuery(value);
      // Real-time search on every keystroke (debounced in parent)
      if (onSearch) {
        onSearch(value);
      }
    };

    const handleClearSearch = () => {
      setSearchQuery('');
      if (onSearch) {
        onSearch('');
      }
    };

    const formatDate = (dateString) => {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return '';
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    };

    const displayCategories =
      categories.length > 0
        ? categories
        : [
            { name: 'Market Insights', count: 2 },
            { name: 'Buying Guide', count: 1 },
            { name: 'Technology', count: 1 },
            { name: 'Sustainability', count: 1 },
            { name: 'Investment', count: 2 },
            { name: 'Neighborhoods', count: 1 },
            { name: 'Interior Design', count: 1 },
            { name: 'Selling Guide', count: 1 },
            { name: 'Finance', count: 1 },
            { name: 'Architecture', count: 1 },
          ];

    const displayRecentPosts =
      recentPosts.length > 0
        ? recentPosts
        : [
            {
              id: 'recent-1',
              title: '10 Trends Shaping Luxury Real Estate in 2024',
              slug: 'trends-shaping-luxury-real-estate-2024',
              date: '2024-06-15',
              image: getPropertyImage(0),
            },
            {
              id: 'recent-2',
              title: 'How to Find the Perfect Luxury Villa',
              slug: 'how-to-find-perfect-luxury-villa',
              date: '2024-06-10',
              image: getPropertyImage(1),
            },
            {
              id: 'recent-3',
              title: 'The Future of Smart Home Technology',
              slug: 'future-of-smart-home-technology',
              date: '2024-06-05',
              image: getPropertyImage(2),
            },
          ];

    const displayTags =
      tags.length > 0
        ? tags
        : [
            'Luxury',
            'Investment',
            'Commercial',
            'Villa',
            'Apartment',
            'Market Trends',
            'Design',
            'Finance',
            'Sustainability',
            'Technology',
          ];

    return (
      <aside ref={ref} className={cn('space-y-6', className)} aria-label="Blog sidebar" {...props}>
        {/* Search Widget */}
        <Card padding="lg" className="border-navy-100">
          <h4 className="font-semibold text-navy-800 mb-3">Search</h4>
          <div className="relative">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  size="sm"
                  className="w-full pr-8"
                  aria-label="Search blog posts"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-navy-100 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5 text-navy-400" />
                  </button>
                )}
              </div>
              <Button
                type="submit"
                variant="luxury"
                size="sm"
                className="flex-shrink-0"
                aria-label="Submit search"
              >
                <Search className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>

        {/* Categories Widget */}
        <Card padding="lg" className="border-navy-100">
          <h4 className="font-semibold text-navy-800 mb-3">Categories</h4>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => onCategoryClick?.('')}
                className={cn(
                  'flex items-center justify-between w-full text-sm transition-colors group',
                  !activeCategory
                    ? 'text-navy-800 font-medium'
                    : 'text-navy-600 hover:text-navy-800'
                )}
              >
                <span className="flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5 text-navy-400" />
                  All Categories
                </span>
              </button>
            </li>
            {displayCategories.map((category) => (
              <li key={category.name || category.label}>
                <button
                  onClick={() => onCategoryClick?.(category.name || category.label)}
                  className={cn(
                    'flex items-center justify-between w-full text-sm transition-colors group',
                    activeCategory === (category.name || category.label)
                      ? 'text-navy-800 font-medium'
                      : 'text-navy-600 hover:text-navy-800'
                  )}
                >
                  <span className="flex items-center gap-1">
                    <ChevronRight className="w-3.5 h-3.5 text-navy-400 group-hover:translate-x-0.5 transition-transform" />
                    {category.name || category.label}
                  </span>
                  {category.count !== undefined && (
                    <Badge variant="default" size="sm" pill>
                      {category.count}
                    </Badge>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </Card>

        {/* Recent Posts Widget */}
        <Card padding="lg" className="border-navy-100">
          <h4 className="font-semibold text-navy-800 mb-3">Recent Posts</h4>
          <ul className="space-y-3">
            {displayRecentPosts.map((post) => (
              <li key={post.id}>
                <Link to={`/blog/${post.slug}`} className="flex gap-3 group">
                  <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-navy-100">
                    <img
                      src={post.image || getPropertyImage(0)}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-medium text-navy-800 group-hover:text-gold-600 transition-colors line-clamp-2">
                      {post.title}
                    </h5>
                    <p className="text-xs text-navy-500 mt-0.5">
                      {post.date ? formatDate(post.date) : ''}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        {/* Popular Tags Widget */}
        <Card padding="lg" className="border-navy-100">
          <h4 className="font-semibold text-navy-800 mb-3">Popular Tags</h4>
          <div className="flex flex-wrap gap-2">
            {displayTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagClick?.(tag)}
                className={cn(
                  'px-3 py-1 text-xs rounded-full transition-colors',
                  activeTag === tag
                    ? 'bg-navy-800 text-white hover:bg-navy-700'
                    : 'bg-navy-50 text-navy-600 hover:bg-navy-100 hover:text-navy-800'
                )}
              >
                #{tag}
              </button>
            ))}
          </div>
        </Card>

        {/* Newsletter Widget */}
        <Card
          padding="lg"
          className="border-gold-100/30 bg-gradient-to-br from-gold-50 to-gold-100/50"
        >
          <h4 className="font-semibold text-navy-800 mb-2">Stay Updated</h4>
          <p className="text-sm text-navy-500 mb-3">
            Get the latest insights delivered to your inbox.
          </p>
          <NewsletterForm
            variant="minimal"
            placeholder="Enter your email"
            submitLabel="Subscribe"
            className="space-y-2"
            nameLabel="Full Name"
            showName={false}
          />
        </Card>
      </aside>
    );
  }
);

BlogSidebar.displayName = 'BlogSidebar';

export default React.memo(BlogSidebar);
