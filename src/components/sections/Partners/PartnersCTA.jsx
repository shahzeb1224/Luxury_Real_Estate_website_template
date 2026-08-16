import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { ChevronRight, Handshake, Building2 } from 'lucide-react';
import Button from '@/components/ui/Button';

const PartnersCTA = React.forwardRef(({ className = '', ...props }, ref) => {
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
        <div className="flex justify-center gap-2 mb-4">
          <Handshake className="w-5 h-5 text-gold-500" />
          <span className="text-xs font-medium uppercase tracking-wider text-navy-400">
            Partnership Opportunities
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-navy-800">
          Interested in Partnering with Us?
        </h3>
        <p className="text-navy-600 mt-3 max-w-2xl mx-auto">
          Join our network of premier real estate professionals and service providers dedicated to
          excellence.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <Link to="/partnership">
            <Button variant="luxury" size="lg" className="min-w-[200px]">
              <span>Become a Partner</span>
              <Handshake className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <Link to="/contact">
            <Button variant="secondary" size="lg" className="min-w-[160px]">
              <span>Contact Us</span>
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-navy-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            Industry Leaders
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            Trusted Network
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            Premium Services
          </span>
        </div>
      </div>
    </div>
  );
});

PartnersCTA.displayName = 'PartnersCTA';

export default React.memo(PartnersCTA);
