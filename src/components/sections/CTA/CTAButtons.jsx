import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { Calendar, Search, Phone, MessageCircle, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';

const CTAButtons = React.forwardRef(
  (
    {
      primaryCTA = { label: 'Schedule Consultation', href: '/contact' },
      secondaryCTA = { label: 'Browse Properties', href: '/buy' },
      phoneCTA = '+1 (888) 555-0123',
      whatsappCTA = '+1 (888) 555-0123',
      loading = false,
      className = '',
      ...props
    },
    ref
  ) => {
    if (loading) {
      return (
        <div
          className={cn(
            'flex flex-col sm:flex-row items-center justify-center gap-4 mb-8',
            className
          )}
        >
          <div className="animate-pulse h-14 w-48 bg-white/20 rounded-xl" />
          <div className="animate-pulse h-14 w-48 bg-white/10 rounded-xl" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col sm:flex-row items-center justify-center gap-4 mb-6',
          className
        )}
        {...props}
      >
        {/* Primary CTA - Using leftIcon and rightIcon props */}
        <Link to={primaryCTA.href}>
          <Button
            variant="luxury"
            size="lg"
            leftIcon={<Calendar className="w-4 h-4" />}
            rightIcon={<ChevronRight className="w-4 h-4" />}
            className="min-w-[200px] group"
          >
            {primaryCTA.label}
          </Button>
        </Link>

        {/* Secondary CTA - Using leftIcon prop */}
        <Link to={secondaryCTA.href}>
          <Button
            variant="glass"
            size="lg"
            leftIcon={<Search className="w-4 h-4" />}
            className="min-w-[180px] group"
          >
            {secondaryCTA.label}
          </Button>
        </Link>

        {/* Phone CTA (hidden on mobile, visible on larger screens) */}
        {phoneCTA && (
          <a
            href={`tel:${phoneCTA.replace(/\D/g, '')}`}
            className="hidden lg:flex items-center gap-2 text-sm text-navy-300 hover:text-white transition-colors"
            aria-label="Call us"
          >
            <Phone className="w-4 h-4" />
            <span>{phoneCTA}</span>
          </a>
        )}
      </div>
    );
  }
);

CTAButtons.displayName = 'CTAButtons';

export default React.memo(CTAButtons);
