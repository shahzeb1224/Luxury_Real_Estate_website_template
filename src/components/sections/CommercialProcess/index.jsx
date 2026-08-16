import React from 'react';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Card from '@/components/ui/Card';
import { Compass, Handshake, Search, Scale, CheckCircle } from 'lucide-react';

const iconMap = {
  Compass,
  Handshake,
  Search,
  Scale,
  CheckCircle,
};

const CommercialProcess = React.forwardRef(
  (
    {
      steps = [],
      loading = false,
      title = 'Our Commercial Process',
      subtitle = 'Expert guidance from start to finish',
      className = '',
      ...props
    },
    ref
  ) => {
    if (loading) {
      return (
        <Section ref={ref} className={className} {...props}>
          <SectionHeader title={title} subtitle={subtitle} align="center" size="md" />
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-32 bg-navy-100 rounded-2xl" />
              </div>
            ))}
          </div>
        </Section>
      );
    }

    return (
      <Section
        ref={ref}
        id="commercial-process"
        padding="lg"
        background="white"
        className={cn('scroll-mt-20', className)}
        {...props}
      >
        <div className="space-y-8">
          <SectionHeader title={title} subtitle={subtitle} align="center" size="md" />

          <div className="relative mt-8">
            {/* Connection Line */}
            <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-0.5 bg-gold-200 -translate-x-1/2" />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
              {steps.map((step, index) => {
                const Icon = iconMap[step.icon] || Compass;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="relative"
                  >
                    <Card
                      padding="lg"
                      hoverable
                      className="text-center h-full border border-gold-100/30"
                    >
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-gold-50 flex items-center justify-center mb-3">
                          <span className="text-sm font-bold text-gold-500">{step.step}</span>
                        </div>
                        <div className="p-2 rounded-lg bg-gold-50 mb-3">
                          <Icon className="w-5 h-5 text-gold-500" />
                        </div>
                        <h4 className="font-semibold text-navy-800">{step.title}</h4>
                        <p className="text-sm text-navy-500 mt-1">{step.description}</p>
                      </div>
                    </Card>

                    {/* Arrow between steps (desktop) */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-0.5 bg-gold-300" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>
    );
  }
);

CommercialProcess.displayName = 'CommercialProcess';

export default React.memo(CommercialProcess);
