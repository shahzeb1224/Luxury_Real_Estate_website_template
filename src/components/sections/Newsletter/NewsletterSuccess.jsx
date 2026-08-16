import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { CheckCircle, ArrowRight, Mail } from 'lucide-react';
import Button from '@/components/ui/Button';

const NewsletterSuccess = React.forwardRef(
  ({ name, email, onReset, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative bg-gradient-to-br from-success-50 to-gold-50',
          'rounded-2xl p-6 sm:p-8 lg:p-10',
          'border border-success-200',
          'text-center',
          'shadow-premium',
          className
        )}
        {...props}
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-success-400/5 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gold-400/5 rounded-full blur-2xl" />

        <div className="relative z-10">
          {/* Success Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-success-100 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-success-600" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-navy-800">You&apos;re In!</h3>

          {/* Message */}
          <div className="mt-3 max-w-md mx-auto">
            <p className="text-navy-600">
              Welcome to the Elite Circle, {name || 'valued subscriber'}!
            </p>
            <div className="flex items-center justify-center gap-2 mt-2 text-sm text-navy-500">
              <Mail className="w-4 h-4" />
              <span>Confirmation sent to {email}</span>
            </div>
          </div>

          {/* Benefits reminder */}
          <div className="mt-4 p-4 bg-white/80 rounded-xl border border-navy-100 max-w-sm mx-auto">
            <p className="text-xs text-navy-500">
              ✨ You&apos;ll now receive exclusive luxury listings, market insights, and investment
              opportunities.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
            <Link to="/buy">
              <Button variant="luxury" size="md" className="min-w-[160px]">
                <span>Browse Properties</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>

            <Button variant="ghost" size="md" onClick={onReset} className="min-w-[140px]">
              Subscribe Another
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

NewsletterSuccess.displayName = 'NewsletterSuccess';

export default React.memo(NewsletterSuccess);
