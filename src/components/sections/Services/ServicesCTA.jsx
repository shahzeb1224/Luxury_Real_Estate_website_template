import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Phone, MessageCircle, Calendar, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';

const ServicesCTA = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-10',
        'bg-gradient-to-br from-navy-50 to-gold-50',
        'border border-navy-100',
        'text-center',
        className
      )}
      {...props}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-navy-400/10 rounded-full blur-2xl" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-navy-800">
          Need Expert Guidance?
        </h3>
        <p className="text-navy-600 mt-3 max-w-2xl mx-auto">
          Our team of luxury real estate experts is ready to assist you with every step of your
          property journey.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <Link to="/contact">
            <Button variant="luxury" size="lg" className="min-w-[200px]">
              <span>Book Free Consultation</span>
              <Calendar className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <Link to="/buy">
            <Button variant="secondary" size="lg" className="min-w-[160px]">
              <span>Explore Services</span>
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 text-sm text-navy-500">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5" />
            <a href="tel:+18885550123" className="hover:text-navy-700 transition-colors">
              (888) 555-0123
            </a>
          </div>
          <span className="text-navy-300">|</span>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hover:text-navy-700 transition-colors cursor-pointer">
              Chat with Expert
            </span>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-navy-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            No Obligation
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            Free Consultation
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            100% Confidential
          </span>
        </div>
      </div>
    </div>
  );
});

ServicesCTA.displayName = 'ServicesCTA';

export default React.memo(ServicesCTA);

