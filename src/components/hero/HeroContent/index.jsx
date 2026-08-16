import React from 'react';
import { cn } from '@/utils/cn';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

const HeroContent = React.forwardRef(
  (
    {
      // Content
      eyebrow,
      headline,
      subheadline,
      description,
      // CTAs
      primaryCTA,
      secondaryCTA,
      // Trust badge
      trustBadge,
      // Alignment
      align = 'center',
      // Sizing
      size = 'lg',
      // Styling
      className = '',
      headlineClassName = '',
      subheadlineClassName = '',
      descriptionClassName = '',
      ctaClassName = '',
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
        headline: 'text-3xl sm:text-4xl lg:text-5xl',
        subheadline: 'text-lg sm:text-xl',
        description: 'text-base sm:text-lg',
      },
      md: {
        headline: 'text-4xl sm:text-5xl lg:text-6xl',
        subheadline: 'text-xl sm:text-2xl',
        description: 'text-lg sm:text-xl',
      },
      lg: {
        headline: 'text-5xl sm:text-6xl lg:text-7xl xl:text-8xl',
        subheadline: 'text-2xl sm:text-3xl',
        description: 'text-xl sm:text-2xl',
      },
      xl: {
        headline: 'text-6xl sm:text-7xl lg:text-8xl xl:text-9xl',
        subheadline: 'text-3xl sm:text-4xl',
        description: 'text-2xl sm:text-3xl',
      },
    };

    const currentSize = sizeClasses[size];

    const headlineClasses = cn(
      'font-playfair font-bold text-white leading-[1.08] tracking-tight',
      currentSize.headline,
      align === 'center' && 'mx-auto',
      headlineClassName
    );

    const subheadlineClasses = cn(
      'font-playfair font-semibold text-gold-400 leading-snug',
      currentSize.subheadline,
      align === 'center' && 'mx-auto',
      subheadlineClassName
    );

    const descriptionClasses = cn(
      'font-inter text-white/80 leading-relaxed max-w-2xl',
      currentSize.description,
      align === 'center' && 'mx-auto',
      descriptionClassName
    );

    const ctaContainerClasses = cn(
      'flex flex-wrap gap-4 mt-6 sm:mt-8',
      align === 'center' && 'justify-center',
      align === 'left' && 'justify-start',
      align === 'right' && 'justify-end',
      ctaClassName
    );

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col space-y-3 sm:space-y-4 w-full',
          alignClasses[align],
          className
        )}
        {...props}
      >
        {/* Eyebrow */}
        {eyebrow && (
          <Badge
            variant="luxury"
            size="md"
            className={cn('inline-flex', align === 'center' && 'mx-auto')}
          >
            {eyebrow}
          </Badge>
        )}

        {/* Headline */}
        {headline && <h1 className={headlineClasses}>{headline}</h1>}

        {/* Subheadline */}
        {subheadline && <h2 className={subheadlineClasses}>{subheadline}</h2>}

        {/* Description */}
        {description && <p className={descriptionClasses}>{description}</p>}

        {/* CTAs */}
        {(primaryCTA || secondaryCTA) && (
          <div className={ctaContainerClasses}>
            {primaryCTA && (
              <Button
                variant="luxury"
                size="lg"
                href={primaryCTA.href}
                className="min-w-[180px]"
                aria-label={primaryCTA.label}
              >
                {primaryCTA.label}
              </Button>
            )}

            {secondaryCTA && (
              <Button
                variant="glass"
                size="lg"
                href={secondaryCTA.href}
                className="min-w-[180px]"
                aria-label={secondaryCTA.label}
              >
                {secondaryCTA.label}
              </Button>
            )}
          </div>
        )}

        {/* Trust Badge */}
        {trustBadge && (
          <div
            className={cn(
              'mt-4 flex items-center gap-2 text-white/60 text-sm',
              align === 'center' && 'justify-center',
              align === 'left' && 'justify-start',
              align === 'right' && 'justify-end'
            )}
          >
            <span className="w-2 h-2 rounded-full bg-gold-500" />
            <span>{trustBadge}</span>
          </div>
        )}
      </div>
    );
  }
);

HeroContent.displayName = 'HeroContent';

export default React.memo(HeroContent);
