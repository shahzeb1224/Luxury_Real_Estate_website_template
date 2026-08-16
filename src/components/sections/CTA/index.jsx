import React from 'react';
import { cn } from '@/utils/cn';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import CTABenefits from './CTABenefits';
import CTAButtons from './CTAButtons';
import CTATrust from './CTATrust';
import { CTA_BENEFITS_DATA, TRUST_INDICATORS_DATA } from './cta.data';

export const CTA = React.forwardRef(
  (
    {
      benefits = CTA_BENEFITS_DATA,
      trustIndicators = TRUST_INDICATORS_DATA,
      loading = false,
      title = 'Ready to Find Your Dream Property?',
      subtitle = 'Experience the difference of working with true real estate experts',
      description = 'From luxury villas to premium commercial spaces, our team is dedicated to helping you make the right decision.',
      primaryCTA = { label: 'Schedule Consultation', href: '/contact' },
      secondaryCTA = { label: 'Browse Properties', href: '/buy' },
      phoneCTA = '+1 (888) 555-0123',
      whatsappCTA = '+1 (888) 555-0123',
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <Section
        ref={ref}
        id="call-to-action"
        padding="xl"
        background="navy-dark"
        className={cn(
          'scroll-mt-20 relative overflow-hidden',
          'bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700',
          className
        )}
        {...props}
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-navy-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-2xl" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Header */}
          <SectionHeader
            title={title}
            subtitle={subtitle}
            description={description}
            align="center"
            size="lg"
            className="text-white"
            titleClassName="text-white"
            subtitleClassName="text-gold-400"
            descriptionClassName="text-navy-300 max-w-2xl"
          />

          {/* Benefits */}
          <CTABenefits benefits={benefits} loading={loading} />

          {/* Buttons */}
          <CTAButtons
            primaryCTA={primaryCTA}
            secondaryCTA={secondaryCTA}
            phoneCTA={phoneCTA}
            whatsappCTA={whatsappCTA}
            loading={loading}
          />

          {/* Trust Indicators */}
          <CTATrust trustIndicators={trustIndicators} loading={loading} />
        </div>
      </Section>
    );
  }
);

CTA.displayName = 'CTA';

export default React.memo(CTA);
