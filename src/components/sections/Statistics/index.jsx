import React from 'react';
import { cn } from '@/utils/cn';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import StatisticCard from './StatisticCard';
import InvestmentCard from './InvestmentCard';
import StatisticsCTA from './StatisticsCTA';
import { STATISTICS_DATA, INVESTMENT_DATA } from './statistics.data';

const Statistics = React.forwardRef(
  (
    {
      statistics = STATISTICS_DATA,
      investments = INVESTMENT_DATA,
      loading = false,
      title = 'Market Statistics & Insights',
      subtitle = 'Data-driven real estate intelligence',
      description = 'Stay ahead of the market with our comprehensive statistics and investment insights for luxury properties.',
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <Section
        ref={ref}
        id="statistics"
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

          {/* Statistics Grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-32 bg-navy-100 rounded-2xl" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {statistics.map((stat, index) => (
                <StatisticCard key={stat.id || index} {...stat} index={index} />
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-navy-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-gray-50 text-xs font-medium uppercase tracking-wider text-navy-400">
                Investment Insights
              </span>
            </div>
          </div>

          {/* Investment Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-48 bg-navy-100 rounded-2xl" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {investments.map((investment, index) => (
                <InvestmentCard key={investment.id || index} {...investment} index={index} />
              ))}
            </div>
          )}

          {/* CTA */}
          <StatisticsCTA />
        </div>
      </Section>
    );
  }
);

Statistics.displayName = 'Statistics';

export default React.memo(Statistics);
