import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Download, BookOpen, TrendingUp, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';

const NewsletterCTA = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-10',
        'bg-white border border-navy-100',
        'shadow-premium',
        className
      )}
      {...props}
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CTA 1: Download Guide */}
          <Link
            to="/resources/investment-guide"
            className="group flex flex-col items-center text-center p-4 rounded-xl hover:bg-navy-50 transition-colors duration-300"
          >
            <div className="p-3 bg-gold-50 rounded-xl group-hover:bg-gold-100 transition-colors duration-300">
              <Download className="w-6 h-6 text-gold-500" />
            </div>
            <h4 className="font-semibold text-navy-800 mt-3">Download Investment Guide</h4>
            <p className="text-xs text-navy-500 mt-1">Our comprehensive luxury investment guide</p>
            <span className="flex items-center gap-1 text-sm font-medium text-gold-600 mt-2 group-hover:gap-2 transition-all">
              Download Now
              <ChevronRight className="w-3 h-3" />
            </span>
          </Link>

          {/* CTA 2: Market Report */}
          <Link
            to="/resources/market-report"
            className="group flex flex-col items-center text-center p-4 rounded-xl hover:bg-navy-50 transition-colors duration-300"
          >
            <div className="p-3 bg-gold-50 rounded-xl group-hover:bg-gold-100 transition-colors duration-300">
              <BookOpen className="w-6 h-6 text-gold-500" />
            </div>
            <h4 className="font-semibold text-navy-800 mt-3">Market Report</h4>
            <p className="text-xs text-navy-500 mt-1">Quarterly luxury real estate insights</p>
            <span className="flex items-center gap-1 text-sm font-medium text-gold-600 mt-2 group-hover:gap-2 transition-all">
              Read Report
              <ChevronRight className="w-3 h-3" />
            </span>
          </Link>

          {/* CTA 3: Investment Opportunities */}
          <Link
            to="/resources/investment-opportunities"
            className="group flex flex-col items-center text-center p-4 rounded-xl hover:bg-navy-50 transition-colors duration-300"
          >
            <div className="p-3 bg-gold-50 rounded-xl group-hover:bg-gold-100 transition-colors duration-300">
              <TrendingUp className="w-6 h-6 text-gold-500" />
            </div>
            <h4 className="font-semibold text-navy-800 mt-3">Investment Opportunities</h4>
            <p className="text-xs text-navy-500 mt-1">Exclusive investment properties</p>
            <span className="flex items-center gap-1 text-sm font-medium text-gold-600 mt-2 group-hover:gap-2 transition-all">
              Explore Now
              <ChevronRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
});

NewsletterCTA.displayName = 'NewsletterCTA';

export default React.memo(NewsletterCTA);
