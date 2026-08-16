import React from 'react';
import { cn } from '@/utils/cn';
import HeroBackground from '../HeroBackground';
import HeroContent from '../HeroContent';
import HeroStats from '../HeroStats';
import ScrollIndicator from '../ScrollIndicator';

const Hero = React.forwardRef(
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
      // Background
      background,
      // Stats
      stats,
      // Variants
      variant = 'full',
      overlay = 'dark',
      overlayOpacity = 60,
      // Styling
      className = '',
      contentClassName = '',
      // State
      loading = false,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      full: 'min-h-screen',
      large: 'min-h-[80vh]',
      medium: 'min-h-[60vh]',
      compact: 'min-h-[40vh]',
    };

    const overlayClasses = {
      dark: 'bg-gradient-to-b from-navy-900/70 via-navy-900/50 to-navy-900/80',
      gold: 'bg-gradient-to-b from-navy-900/60 via-gold-900/30 to-navy-900/70',
      gradient: 'bg-gradient-to-b from-transparent via-navy-900/40 to-navy-900/80',
      none: '',
    };

    return (
      <section
        ref={ref}
        className={cn('relative w-full overflow-hidden pt-10', variantClasses[variant], className)}
        aria-label="Hero Section"
        {...props}
      >
        {/* Background */}
        <HeroBackground
          src={background?.src}
          type={background?.type || 'image'}
          poster={background?.poster}
          fallback={background?.fallback}
          priority={true}
        />

        {/* Overlay */}
        <div
          className={cn('absolute inset-0', overlayClasses[overlay], `opacity-${overlayOpacity}`)}
          aria-hidden="true"
        />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 sm:px-6 lg:px-8">
          <div className={cn('w-full max-w-5xl mx-auto text-center', contentClassName)}>
            {/* Main Content */}
            <HeroContent
              eyebrow={eyebrow}
              headline={headline}
              subheadline={subheadline}
              description={description}
              primaryCTA={primaryCTA}
              secondaryCTA={secondaryCTA}
              align="center"
              className="mb-8 sm:mb-12"
            />

            {/* Stats */}
            {stats && stats.length > 0 && (
              <HeroStats stats={stats} variant="light" columns={4} className="max-w-3xl mx-auto" />
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator
          color="light"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        />
      </section>
    );
  }
);

Hero.displayName = 'Hero';

export default React.memo(Hero);
