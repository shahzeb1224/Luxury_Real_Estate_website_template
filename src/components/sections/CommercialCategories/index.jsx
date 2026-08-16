import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { motion } from 'framer-motion';
import { cardVariants } from '@/animations/framer';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import Card from '@/components/ui/Card';
import { Building2, Store, Factory, Warehouse, Building, Briefcase } from 'lucide-react';

const iconMap = {
  Building2,
  Store,
  Factory,
  Warehouse,
  Building,
  Briefcase,
};

const CommercialCategories = React.forwardRef(
  (
    {
      categories = [],
      loading = false,
      title = 'Commercial Property Types',
      subtitle = 'Find the perfect commercial space',
      viewAllLink = '/commercial',
      columns = 3,
      className = '',
      ...props
    },
    ref
  ) => {
    const columnClasses = {
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    };

    if (loading) {
      return (
        <Section ref={ref} className={className} {...props}>
          <SectionHeader title={title} subtitle={subtitle} align="center" size="md" />
          <div className={cn('grid gap-4 sm:gap-6 mt-8', columnClasses[columns])}>
            {Array.from({ length: columns }).map((_, index) => (
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
        id="commercial-categories"
        padding="lg"
        background="gray"
        className={cn('scroll-mt-20', className)}
        {...props}
      >
        <div className="space-y-8">
          <SectionHeader title={title} subtitle={subtitle} align="center" size="md" />

          <motion.div
            variants={cardVariants.grid.container}
            initial="initial"
            animate="animate"
            className={cn('grid gap-4 sm:gap-6 mt-8', columnClasses[columns])}
          >
            {categories.map((category, index) => {
              const Icon = iconMap[category.icon] || Building2;

              return (
                <motion.div
                  key={category.id}
                  variants={cardVariants.grid.item}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/commercial?type=${category.id}`} className="group block">
                    <Card
                      padding="lg"
                      hoverable
                      className={cn(
                        'h-full transition-all duration-300',
                        category.color === 'gold' ? 'border-gold-100/50' : 'border-navy-100'
                      )}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={cn(
                            'p-3 rounded-xl flex-shrink-0',
                            category.color === 'gold' ? 'bg-gold-50' : 'bg-navy-50'
                          )}
                        >
                          <Icon
                            className={cn(
                              'w-6 h-6',
                              category.color === 'gold' ? 'text-gold-500' : 'text-navy-600'
                            )}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-navy-800 group-hover:text-navy-600 transition-colors">
                            {category.label}
                          </h3>
                          <p className="text-sm text-navy-500">{category.description}</p>
                          {category.count !== undefined && (
                            <p className="text-xs text-navy-400 mt-1">
                              {category.count} properties available
                            </p>
                          )}
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {viewAllLink && (
            <div className="text-center mt-8">
              <Link to={viewAllLink}>
                <span className="text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors">
                  View All Commercial Properties →
                </span>
              </Link>
            </div>
          )}
        </div>
      </Section>
    );
  }
);

CommercialCategories.displayName = 'CommercialCategories';

export default React.memo(CommercialCategories);
