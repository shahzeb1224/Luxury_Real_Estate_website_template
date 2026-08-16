import React from 'react';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import { heroAnimations } from '@/animations/gsap';
import Container from '@/components/shared/Container';
import { SearchBar } from '@/components/search';
import { RENT_HERO_DATA } from '../rent.data';

const RentHero = ({
  title = RENT_HERO_DATA.title,
  subtitle = RENT_HERO_DATA.subtitle,
  description = RENT_HERO_DATA.description,
  stats = RENT_HERO_DATA.stats,
  className = '',
  ...props
}) => {
  return (
    <section
      className={cn(
        'relative w-full overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700',
        'min-h-[60vh] sm:min-h-[70vh] flex items-center',
        className
      )}
      {...props}
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold-500 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gold-400 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-500 blur-3xl" />
      </div>

      <Container className="relative z-10 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold-500/20 rounded-full text-gold-400 text-sm font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            Premium Rentals
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white leading-[1.08]">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gold-400 font-playfair font-semibold mt-3">
            {subtitle}
          </p>

          {/* Description */}
          <p className="text-navy-300 text-base sm:text-lg max-w-2xl mx-auto mt-4">{description}</p>

          {/* Search Bar */}
          <div className="mt-8 max-w-3xl mx-auto">
            <SearchBar
              variant="elevated"
              size="lg"
              placeholder="Search rental properties by location, type, or price"
              className="shadow-premium-lg"
              onSearch={(filters) => {
                // Handle search - will be passed up
              }}
            />
          </div>

          {/* Statistics */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl font-playfair font-bold text-white">
                  {stat.prefix}
                  {stat.value}
                  {stat.suffix}
                </div>
                <div className="text-sm text-navy-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-navy-400 animate-bounce">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default RentHero;
