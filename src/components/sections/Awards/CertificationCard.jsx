import React from 'react';
import { cn } from '@/utils/cn';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Shield, CheckCircle, ExternalLink } from 'lucide-react';

const CertificationCard = React.forwardRef(
  ({ name, organization, logo, validUntil, description, link, className = '', ...props }, ref) => {
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [imageError, setImageError] = React.useState(false);

    const handleImageLoad = () => setImageLoaded(true);
    const handleImageError = () => {
      setImageError(true);
      setImageLoaded(true);
    };

    return (
      <Card
        ref={ref}
        variant="default"
        padding="lg"
        hoverable
        className={cn(
          'group transition-all duration-500',
          'hover:shadow-premium-lg hover:-translate-y-1',
          className
        )}
        {...props}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-12 mb-3">
          {logo && !imageError ? (
            <img
              src={logo}
              alt={name}
              className={cn(
                'max-h-full max-w-full object-contain transition-opacity duration-500',
                imageLoaded ? 'opacity-100' : 'opacity-0'
              )}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="p-2 bg-navy-50 rounded-xl">
              <Shield className="w-6 h-6 text-navy-400" />
            </div>
          )}
          {!imageLoaded && <div className="absolute inset-0  rounded-lg animate-pulse" />}
        </div>

        {/* Name */}
        <h4 className="font-semibold text-navy-800 text-sm text-center">{name}</h4>

        {/* Organization */}
        <p className="text-xs text-navy-500 text-center mt-0.5">{organization}</p>

        {/* Validity */}
        {validUntil && (
          <div className="flex items-center justify-center gap-1 mt-2 text-xs text-navy-400">
            <span>Valid until</span>
            <span className="font-medium text-navy-600">{validUntil}</span>
          </div>
        )}

        {/* Link */}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 mt-3 text-xs font-medium text-gold-600 hover:text-gold-700 transition-colors group/link"
          >
            <span>Verify Credential</span>
            <ExternalLink className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
          </a>
        )}
      </Card>
    );
  }
);

CertificationCard.displayName = 'CertificationCard';

export default React.memo(CertificationCard);
