import React from 'react';
import { cn } from '@/utils/cn';

const Skeleton = React.forwardRef(
  (
    {
      // Type
      variant = 'text',
      // Size
      size = 'md',
      // Count (for lists)
      count = 1,
      // Styling
      className = '',
      // Content
      children,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      text: {
        sm: 'h-3 w-full',
        md: 'h-4 w-full',
        lg: 'h-6 w-3/4',
        xl: 'h-8 w-2/3',
      },
      heading: {
        sm: 'h-5 w-3/4',
        md: 'h-7 w-2/3',
        lg: 'h-9 w-1/2',
        xl: 'h-12 w-1/3',
      },
      avatar: {
        sm: 'w-8 h-8 rounded-full',
        md: 'w-10 h-10 rounded-full',
        lg: 'w-12 h-12 rounded-full',
        xl: 'w-16 h-16 rounded-full',
      },
      button: {
        sm: 'h-8 w-20 rounded-lg',
        md: 'h-10 w-24 rounded-lg',
        lg: 'h-12 w-32 rounded-lg',
        xl: 'h-14 w-40 rounded-lg',
      },
      card: {
        sm: 'h-32 w-full rounded-lg',
        md: 'h-48 w-full rounded-lg',
        lg: 'h-64 w-full rounded-lg',
        xl: 'h-80 w-full rounded-lg',
      },
      image: {
        sm: 'h-24 w-full rounded-lg',
        md: 'h-40 w-full rounded-lg',
        lg: 'h-56 w-full rounded-lg',
        xl: 'h-72 w-full rounded-lg',
      },
      'property-card': 'h-80 w-full rounded-2xl',
      'blog-card': 'h-64 w-full rounded-2xl',
    };

    const getVariantClass = () => {
      if (variant === 'property-card' || variant === 'blog-card') {
        return variantClasses[variant];
      }
      return variantClasses[variant]?.[size] || variantClasses.text.md;
    };

    // Render multiple skeletons
    if (count > 1) {
      return (
        <div ref={ref} className={cn('space-y-3', className)} {...props}>
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className={cn('bg-navy-100 rounded animate-pulse', getVariantClass())}
            />
          ))}
        </div>
      );
    }

    // Render single skeleton with children (composition)
    if (children) {
      return (
        <div ref={ref} className={cn('animate-pulse', className)} {...props}>
          {children}
        </div>
      );
    }

    // Render single skeleton
    return (
      <div
        ref={ref}
        className={cn('bg-navy-100 rounded animate-pulse', getVariantClass(), className)}
        {...props}
      />
    );
  }
);

// Sub-components for composition
const SkeletonText = ({ lines = 3, className = '', ...props }) => (
  <div className={cn('space-y-2', className)} {...props}>
    {Array.from({ length: lines }).map((_, index) => (
      <Skeleton
        key={index}
        variant="text"
        size="md"
        className={cn(index === lines - 1 && 'w-3/4')}
      />
    ))}
  </div>
);

const SkeletonCard = ({ className = '', ...props }) => (
  <div className={cn('space-y-3', className)} {...props}>
    <Skeleton variant="image" size="lg" />
    <SkeletonText lines={3} />
    <Skeleton variant="button" size="sm" className="w-24" />
  </div>
);

const SkeletonPropertyCard = ({ className = '', ...props }) => (
  <div className={cn('space-y-3', className)} {...props}>
    <Skeleton variant="property-card" />
    <SkeletonText lines={2} />
    <div className="flex justify-between">
      <Skeleton variant="text" size="sm" className="w-1/3" />
      <Skeleton variant="text" size="sm" className="w-1/4" />
    </div>
  </div>
);

const SkeletonBlogCard = ({ className = '', ...props }) => (
  <div className={cn('space-y-3', className)} {...props}>
    <Skeleton variant="blog-card" />
    <SkeletonText lines={2} />
    <Skeleton variant="text" size="sm" className="w-1/4" />
  </div>
);

Skeleton.Text = SkeletonText;
Skeleton.Card = SkeletonCard;
Skeleton.PropertyCard = SkeletonPropertyCard;
Skeleton.BlogCard = SkeletonBlogCard;

Skeleton.displayName = 'Skeleton';

export default Skeleton;
