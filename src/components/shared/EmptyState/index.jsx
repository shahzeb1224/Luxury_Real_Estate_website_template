import React from 'react';
import { cn } from '@/utils/cn';
import { Search, Home, Filter, Inbox } from 'lucide-react';

const EmptyState = React.forwardRef(
  (
    {
      // Content
      icon = 'search',
      title = 'No results found',
      description = "Try adjusting your search or filters to find what you're looking for.",
      // Action
      action,
      actionVariant = 'primary',
      actionHref = '#',
      // Size
      size = 'md',
      // Styling
      className = '',
      iconClassName = '',
      titleClassName = '',
      descriptionClassName = '',
      // Children
      children,
      ...props
    },
    ref
  ) => {
    const iconMap = {
      search: Search,
      home: Home,
      filter: Filter,
      inbox: Inbox,
      default: Inbox,
    };

    const IconComponent = iconMap[icon] || iconMap.default;

    const sizeClasses = {
      sm: {
        icon: 'w-10 h-10',
        title: 'text-lg',
        description: 'text-sm',
        spacing: 'space-y-2',
      },
      md: {
        icon: 'w-14 h-14',
        title: 'text-2xl',
        description: 'text-base',
        spacing: 'space-y-3',
      },
      lg: {
        icon: 'w-20 h-20',
        title: 'text-3xl',
        description: 'text-lg',
        spacing: 'space-y-4',
      },
    };

    const currentSize = sizeClasses[size];

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center text-center',
          'p-8 sm:p-12',
          'rounded-2xl border-2 border-dashed border-navy-200',
          className
        )}
        {...props}
      >
        {/* Icon */}
        <div
          className={cn(
            'flex items-center justify-center rounded-full',
            'bg-navy-50 text-navy-400',
            currentSize.icon,
            iconClassName
          )}
        >
          <IconComponent className="w-1/2 h-1/2" />
        </div>

        {/* Content */}
        <div className={cn('mt-4', currentSize.spacing)}>
          <h3
            className={cn(
              'font-playfair font-semibold text-navy-800',
              currentSize.title,
              titleClassName
            )}
          >
            {title}
          </h3>

          {description && (
            <p
              className={cn(
                'text-navy-500 max-w-sm',
                currentSize.description,
                descriptionClassName
              )}
            >
              {description}
            </p>
          )}

          {children}
        </div>

        {/* Action */}
        {action && (
          <div className="mt-6">
            <a
              href={actionHref}
              className={cn(
                'inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-colors',
                actionVariant === 'primary' && 'bg-navy-800 text-white hover:bg-navy-700',
                actionVariant === 'secondary' &&
                  'bg-white text-navy-800 border border-navy-200 hover:bg-navy-50',
                actionVariant === 'gold' && 'bg-gold-500 text-white hover:bg-gold-600',
                actionVariant === 'outline' &&
                  'bg-transparent text-navy-800 border-2 border-navy-800 hover:bg-navy-50'
              )}
            >
              {action}
            </a>
          </div>
        )}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';

export default EmptyState;
