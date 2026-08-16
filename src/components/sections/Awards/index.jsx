import React from 'react';
import { cn } from '@/utils/cn';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import AwardCard from './AwardCard';
import CertificationCard from './CertificationCard';
import AwardsTimeline from './AwardsTimeline';
import Milestones from './Milestones';
import AwardsCTA from './AwardsCTA';
import { AWARDS_DATA, CERTIFICATIONS_DATA, MILESTONES_DATA } from './awards.data';

const Awards = React.forwardRef(
  (
    {
      awards = AWARDS_DATA,
      certifications = CERTIFICATIONS_DATA,
      milestones = MILESTONES_DATA,
      loading = false,
      title = 'Awards & Recognition',
      subtitle = 'Excellence acknowledged globally',
      description = 'Our commitment to excellence has been recognized by industry leaders and prestigious organizations worldwide.',
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <Section
        ref={ref}
        id="awards"
        padding="lg"
        background="gray"
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

          {/* Milestones */}
          <Milestones milestones={milestones} loading={loading} />

          {/* Awards Timeline */}
          <AwardsTimeline awards={awards} loading={loading} />

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-playfair font-semibold text-navy-800">
                  Certifications & Memberships
                </h3>
                <span className="text-sm text-navy-500">
                  {certifications.length} certifications
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {certifications.map((cert, index) => (
                  <CertificationCard key={index} {...cert} />
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <AwardsCTA />
        </div>
      </Section>
    );
  }
);

Awards.displayName = 'Awards';

export default React.memo(Awards);
