import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({
  items,
  separator = <ChevronRight className="w-3 h-3" />,
  showHome = true,
  homeHref = '/',
  className = '',
  ...props
}) => {
  // Generate structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href,
    })),
  };

  const allItems = showHome ? [{ label: 'Home', href: homeHref }, ...items] : items;

  return (
    <nav
      className={cn(
        'flex items-center gap-2 text-sm text-navy-500',
        'overflow-x-auto whitespace-nowrap py-2',
        className
      )}
      aria-label="Breadcrumb"
      {...props}
    >
      {/* Structured Data */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>

      {allItems.map((item, index) => {
        const isLast = index === allItems.length - 1;

        return (
          <React.Fragment key={index}>
            {/* Breadcrumb Item */}
            <div className="flex items-center gap-2">
              {index === 0 && showHome && <Home className="w-3.5 h-3.5" />}
              {isLast ? (
                <span className="text-navy-800 font-medium" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link to={item.href} className="hover:text-navy-800 transition-colors">
                  {item.label}
                </Link>
              )}
            </div>

            {/* Separator */}
            {!isLast && <span className="text-navy-300 flex-shrink-0">{separator}</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default React.memo(Breadcrumb);
