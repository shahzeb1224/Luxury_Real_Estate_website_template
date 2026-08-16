import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import { cardVariants } from '@/animations/framer';
import { getPropertyImage } from '@/assets/images/properties';
import { getAgentImage } from '@/assets/images/agents';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Calendar, Clock, User, ChevronRight } from 'lucide-react';
export { default as Blog } from './Blog';
const Blog = ({
  posts = [],
  loading = false,
  title = 'Latest Insights',
  subtitle = 'Expert perspectives on luxury real estate',
  viewAllLink = '/blog',
  columns = 3,
  className = '',
  ...props
}) => {
  const [imageLoaded, setImageLoaded] = useState({});

  const handleImageLoad = (id) => {
    setImageLoaded((prev) => ({ ...prev, [id]: true }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  const defaultPosts = [
    {
      id: '1',
      title: '10 Trends Shaping Luxury Real Estate in 2024',
      slug: '10-trends-shaping-luxury-real-estate-2024',
      excerpt:
        'Discover the latest trends shaping the luxury real estate market in 2024, from sustainable design to smart home technology.',
      image: getPropertyImage(0),
      category: 'Market Insights',
      date: '2024-06-15',
      author: {
        name: 'Sarah Johnson',
        avatar: getAgentImage(0),
      },
      readTime: 5,
    },
    {
      id: '2',
      title: 'How to Find the Perfect Luxury Villa',
      slug: 'how-to-find-the-perfect-luxury-villa',
      excerpt:
        "A comprehensive guide to finding and purchasing the perfect luxury villa in today's competitive market.",
      image: getPropertyImage(1),
      category: 'Buying Guide',
      date: '2024-06-10',
      author: {
        name: 'Michael Chen',
        avatar: getAgentImage(1),
      },
      readTime: 4,
    },
    {
      id: '3',
      title: 'The Future of Smart Home Technology',
      slug: 'the-future-of-smart-home-technology',
      excerpt:
        'Explore how smart home technology is transforming luxury living and what features homebuyers are looking for.',
      image: getPropertyImage(2),
      category: 'Technology',
      date: '2024-06-05',
      author: {
        name: 'Jennifer Williams',
        avatar: getAgentImage(2),
      },
      readTime: 6,
    },
  ];

  const displayPosts = posts.length > 0 ? posts : defaultPosts;
  const visiblePosts = displayPosts.slice(0, columns);

  if (loading) {
    return (
      <Section padding="lg" background="white" className={className} {...props}>
        <SectionHeader title={title} subtitle={subtitle} align="center" size="md" />
        <div className={cn('grid gap-4 sm:gap-6 mt-8', columnClasses[columns])}>
          {Array.from({ length: columns }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-[4/3] bg-navy-100 rounded-t-2xl" />
              <div className="p-4 space-y-3 bg-white rounded-b-2xl border border-navy-100">
                <div className="h-4 bg-navy-100 rounded w-1/4" />
                <div className="h-5 bg-navy-100 rounded w-3/4" />
                <div className="h-3 bg-navy-100 rounded w-1/2" />
                <div className="flex gap-3">
                  <div className="h-3 bg-navy-100 rounded w-16" />
                  <div className="h-3 bg-navy-100 rounded w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section
      id="blog"
      padding="lg"
      background="gray"
      className={cn('scroll-mt-20', className)}
      {...props}
    >
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeader
            title={title}
            subtitle={subtitle}
            align="left"
            size="md"
            className="flex-1"
          />

          {viewAllLink && (
            <Link
              to={viewAllLink}
              className="flex items-center gap-1 text-sm font-medium text-navy-600 hover:text-navy-800 transition-colors group whitespace-nowrap"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        <motion.div
          variants={cardVariants.grid.container}
          initial="initial"
          animate="animate"
          className={cn('grid gap-4 sm:gap-6', columnClasses[columns])}
        >
          {visiblePosts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={cardVariants.grid.item}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Link to={`/blog/${post.slug}`} className="group block h-full">
                <Card
                  padding="none"
                  hoverable
                  className="overflow-hidden h-full transition-all duration-500 hover:shadow-premium-lg hover:-translate-y-1"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-navy-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className={cn(
                        'w-full h-full object-cover transition-transform duration-700 group-hover:scale-105',
                        imageLoaded[post.id] ? 'opacity-100' : 'opacity-0'
                      )}
                      onLoad={() => handleImageLoad(post.id)}
                      loading="lazy"
                    />
                    {!imageLoaded[post.id] && (
                      <div className="absolute inset-0 bg-navy-100 animate-pulse" />
                    )}
                    <div className="absolute top-3 left-3">
                      <Badge variant="luxury" size="sm" pill>
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 space-y-3">
                    <div className="flex items-center gap-3 text-xs text-navy-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime} min read
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-playfair font-semibold text-navy-800 group-hover:text-gold-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-navy-500 line-clamp-2">{post.excerpt}</p>

                    <div className="flex items-center justify-between pt-3 border-t border-navy-100">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden bg-navy-200 flex-shrink-0">
                          <img
                            src={post.author?.avatar}
                            alt={post.author?.name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <span className="text-xs font-medium text-navy-700">
                          {post.author?.name}
                        </span>
                      </div>
                      <span className="text-xs font-medium text-gold-500 group-hover:text-gold-600 transition-colors">
                        Read More →
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

export default React.memo(Blog);
