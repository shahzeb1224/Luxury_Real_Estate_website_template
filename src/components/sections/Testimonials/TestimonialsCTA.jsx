import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { ChevronRight, Star, Users } from 'lucide-react';
import Button from '@/components/ui/Button';

const TestimonialsCTA = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-10',
        'bg-white border border-navy-100',
        'text-center',
        'shadow-premium',
        className
      )}
      {...props}
    >
      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="flex justify-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
          ))}
        </div>

        <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-navy-800">
          Join Our Happy Clients
        </h3>
        <p className="text-navy-600 mt-3 max-w-2xl mx-auto">
          Experience the difference of working with a team that truly cares about your real estate
          journey.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <Link to="/contact">
            <Button variant="luxury" size="lg" className="min-w-[200px]">
              <span>Book Consultation</span>
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <Link to="/stories">
            <Button variant="secondary" size="lg" className="min-w-[160px]">
              <span>Read More Stories</span>
              <Users className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-navy-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            100% Satisfaction Guarantee
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            Verified Client Reviews
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            Real Success Stories
          </span>
        </div>
      </div>
    </div>
  );
});

TestimonialsCTA.displayName = 'TestimonialsCTA';

export default React.memo(TestimonialsCTA);
