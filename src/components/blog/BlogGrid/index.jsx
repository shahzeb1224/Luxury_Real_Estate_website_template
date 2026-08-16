import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import { cardVariants } from '@/animations/framer';
import BlogCard from '../BlogCard';
import EmptyState from '@/components/shared/EmptyState';
import Skeleton from '@/components/shared/Skeleton';

const BlogGrid = forwardRef(
  (
    {
      posts = [],
      loading = false,
      columns = 3,
      variant = 'default',
      showFeatured = false,
      className = '',
      gridClassName = '',
      ...props
    },
    ref
  ) => {
    const columnClasses = {
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    };

    // Split featured and regular posts
    const featuredPost = posts.find((post) => post.featured);
    const regularPosts = posts.filter((post) => !post.featured);

    const displayPosts =
      showFeatured && featuredPost ? [featuredPost, ...regularPosts] : regularPosts;

    if (loading) {
      return (
        <div ref={ref} className={cn('w-full', className)} {...props}>
          <div className={cn('grid gap-4 sm:gap-6', columnClasses[columns])}>
            {Array.from({ length: columns }).map((_, index) => (
              <div key={index} className="space-y-3">
                <Skeleton className="aspect-[4/3] rounded-t-2xl" />
                <div className="space-y-2 p-4">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <div className="flex gap-2 pt-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (posts.length === 0) {
      return (
        <div ref={ref} className={cn('w-full py-8', className)} {...props}>
          <EmptyState
            icon="search"
            title="No blog posts found"
            description="Check back later for new articles and insights."
            className="border-0 shadow-none"
          />
        </div>
      );
    }

    // If showing featured, render featured post first with special styling
    if (showFeatured && featuredPost) {
      return (
        <div ref={ref} className={cn('w-full space-y-8', className)} {...props}>
          {/* Featured Post */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BlogCard post={featuredPost} variant="featured" />
          </motion.div>

          {/* Regular Posts Grid */}
          {regularPosts.length > 0 && (
            <motion.div
              variants={cardVariants.grid.container}
              initial="initial"
              animate="animate"
              className={cn('grid gap-4 sm:gap-6', columnClasses[columns], gridClassName)}
            >
              {regularPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  variants={cardVariants.grid.item}
                  transition={{ delay: index * 0.05 }}
                >
                  <BlogCard post={post} variant="default" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      );
    }

    // Regular grid without featured
    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        <motion.div
          variants={cardVariants.grid.container}
          initial="initial"
          animate="animate"
          className={cn('grid gap-4 sm:gap-6', columnClasses[columns], gridClassName)}
        >
          {displayPosts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={cardVariants.grid.item}
              transition={{ delay: index * 0.05 }}
            >
              <BlogCard post={post} variant={variant} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }
);

BlogGrid.displayName = 'BlogGrid';

export default React.memo(BlogGrid);
