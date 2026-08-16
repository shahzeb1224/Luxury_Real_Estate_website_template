import React from 'react';
import { cn } from '@/utils/cn';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import PartnerCard from './PartnerCard';
import PartnersGrid from './PartnersGrid';
import PartnersMarquee from './PartnersMarquee';
import PartnersCTA from './PartnersCTA';
import { PARTNERS_DATA, FEATURED_PARTNERS } from './partners.data';

const Partners = React.forwardRef(
  (
    {
      partners = PARTNERS_DATA,
      featuredPartners = FEATURED_PARTNERS,
      loading = false,
      title = 'Our Trusted Partners',
      subtitle = 'Collaborating with industry leaders',
      description = 'We partner with the most respected names in real estate, finance, and luxury services to deliver exceptional value to our clients.',
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <Section
        ref={ref}
        id="partners"
        padding="lg"
        background="white"
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

          {/* Featured Partners - Marquee */}
          {!loading && featuredPartners.length > 0 && (
            <PartnersMarquee partners={featuredPartners} />
          )}

          {/* Partners Grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-24 bg-navy-100 rounded-xl" />
                </div>
              ))}
            </div>
          ) : (
            <PartnersGrid partners={partners} />
          )}

          {/* CTA */}
          <PartnersCTA />
        </div>
      </Section>
    );
  }
);

Partners.displayName = 'Partners';

export default React.memo(Partners);
