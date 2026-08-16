import React from 'react';
import { cn } from '@/utils/cn';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import WhyChooseCard from './WhyChooseCard';
import WhyChooseStats from './WhyChooseStats';
import WhyChooseCTA from './WhyChooseCTA';
import { WHY_CHOOSE_DATA, STATS_DATA, CORE_VALUES } from './whyChoose.data';

const WhyChooseUs = React.forwardRef(
  (
    {
      cards = WHY_CHOOSE_DATA,
      stats = STATS_DATA,
      coreValues = CORE_VALUES,
      loading = false,
      title = 'Why Choose Elite Real Estate',
      subtitle = 'Excellence in every detail',
      description = 'With decades of combined experience and a passion for luxury real estate, we deliver exceptional service that exceeds expectations.',
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <Section
        ref={ref}
        id="why-choose-us"
        padding="lg"
        background="gray"
        className={cn('scroll-mt-20', className)}
        {...props}
      >
        <div className="space-y-10 lg:space-y-14">
          {/* Header */}
          <SectionHeader
            title={title}
            subtitle={subtitle}
            description={description}
            align="center"
            size="lg"
            className="max-w-3xl mx-auto"
          />

          {/* Trust Cards */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-32 bg-navy-100 rounded-2xl" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card, index) => (
                <WhyChooseCard key={card.id || index} {...card} index={index} />
              ))}
            </div>
          )}

          {/* Core Values - Horizontal Scroll */}
          <div className="relative">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-medium uppercase tracking-wider text-navy-400">
                Our Core Values
              </span>
              <span className="flex-1 h-px bg-navy-200" />
            </div>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {coreValues.map((value, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white border border-navy-100 rounded-full text-sm font-medium text-navy-700 hover:border-gold-300 hover:shadow-premium-sm transition-all duration-300"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>

          {/* Statistics */}
          {stats && stats.length > 0 && <WhyChooseStats stats={stats} />}

          {/* CTA */}
          <WhyChooseCTA />
        </div>
      </Section>
    );
  }
);

WhyChooseUs.displayName = 'WhyChooseUs';

export default React.memo(WhyChooseUs);
