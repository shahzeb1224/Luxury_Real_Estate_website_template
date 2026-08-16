import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { ChevronRight, TrendingUp, BarChart } from 'lucide-react';
import Button from '@/components/ui/Button';

const StatisticsCTA = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-10',
        'bg-gradient-to-br from-navy-50 to-navy-100',
        'border border-navy-200',
        'text-center',
        className
      )}
      {...props}
    >
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="flex justify-center gap-2 mb-4">
          <BarChart className="w-5 h-5 text-gold-500" />
          <span className="text-xs font-medium uppercase tracking-wider text-navy-400">
            Market Insights
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-navy-800">
          Ready to Make an Informed Investment?
        </h3>
        <p className="text-navy-600 mt-3 max-w-2xl mx-auto">
          Leverage our market expertise and data-driven insights to make confident real estate
          decisions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <Link to="/investment">
            <Button variant="luxury" size="lg" className="min-w-[200px]">
              <span>Explore Investment</span>
              <TrendingUp className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <Link to="/contact">
            <Button variant="secondary" size="lg" className="min-w-[160px]">
              <span>Talk to an Expert</span>
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-navy-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            Data-Driven Insights
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            Expert Analysis
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            Market Trends
          </span>
        </div>
      </div>
    </div>
  );
});

StatisticsCTA.displayName = 'StatisticsCTA';

export default React.memo(StatisticsCTA);
