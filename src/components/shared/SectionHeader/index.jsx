import React from 'react';
import { cn } from '@/utils/cn';
import Badge from '@/components/ui/Badge';

const SectionHeader = React.forwardRef(
  (
    {
      // Content
      eyebrow,
      badge,
      title,
      subtitle,
      description,
      // CTA
      cta,
      ctaVariant = 'primary',
      ctaHref = '#',
      // Alignment
      align = 'left',
      // Size
      size = 'md',
      // Styling
      className = '',
      titleClassName = '',
      subtitleClassName = '',
      descriptionClassName = '',
      // Semantic
      as: TitleComponent = 'h2',
      ...props
    },
    ref
  ) => {
    const alignClasses = {
      left: 'text-left items-start',
      center: 'text-center items-center',
      right: 'text-right items-end',
    };

    const sizeClasses = {
      sm: {
        title: 'text-2xl sm:text-3xl',
        subtitle: 'text-base',
        description: 'text-sm',
      },
      md: {
        title: 'text-3xl sm:text-4xl',
        subtitle: 'text-lg',
        description: 'text-base',
      },
      lg: {
        title: 'text-4xl sm:text-5xl',
        subtitle: 'text-xl',
        description: 'text-lg',
      },
      xl: {
        title: 'text-5xl sm:text-6xl',
        subtitle: 'text-2xl',
        description: 'text-xl',
      },
    };

    const titleClasses = cn(
      'font-playfair font-bold text-navy-800',
      sizeClasses[size].title,
      align === 'center' && 'mx-auto',
      titleClassName
    );

    const subtitleClasses = cn(
      'font-inter font-medium text-navy-600',
      sizeClasses[size].subtitle,
      align === 'center' && 'mx-auto',
      subtitleClassName
    );

    const descriptionClasses = cn(
      'font-inter text-navy-500 max-w-2xl',
      sizeClasses[size].description,
      align === 'center' && 'mx-auto',
      descriptionClassName
    );

    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-2', alignClasses[align], className)}
        {...props}
      >
        {/* Eyebrow */}
        {eyebrow && (
          <span
            className={cn(
              'text-sm font-inter font-medium uppercase tracking-wider text-gold-500',
              align === 'center' && 'mx-auto'
            )}
          >
            {eyebrow}
          </span>
        )}

        {/* Badge */}
        {badge && (
          <Badge
            variant="luxury"
            size="md"
            className={cn('inline-flex', align === 'center' && 'mx-auto')}
          >
            {badge}
          </Badge>
        )}

        {/* Title */}
        {title && <TitleComponent className={titleClasses}>{title}</TitleComponent>}

        {/* Subtitle */}
        {subtitle && <p className={subtitleClasses}>{subtitle}</p>}

        {/* Description */}
        {description && <p className={descriptionClasses}>{description}</p>}

        {/* CTA */}
        {cta && (
          <div className={cn('mt-4', align === 'center' && 'mx-auto')}>
            <a
              href={ctaHref}
              className={cn(
                'inline-flex items-center font-semibold transition-colors',
                ctaVariant === 'primary' && 'text-navy-800 hover:text-navy-600',
                ctaVariant === 'gold' && 'text-gold-500 hover:text-gold-600',
                ctaVariant === 'underline' && 'text-navy-800 hover:text-navy-600 underline'
              )}
            >
              {cta}
              <svg
                className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;
