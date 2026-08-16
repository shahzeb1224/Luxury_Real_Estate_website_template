import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { ChevronRight } from 'lucide-react';
import Section from '@/components/shared/Section';
import SectionHeader from '@/components/shared/SectionHeader';
import AgentCard from '../AgentCard';
import Button from '@/components/ui/Button';

const AgentGrid = React.forwardRef(
  (
    {
      agents = [],
      loading = false,
      featuredAgent = null,
      title = 'Meet Our Expert Agents',
      subtitle = 'World-class professionals dedicated to your success',
      description = 'Our team of luxury real estate specialists brings unparalleled expertise and personalized service to every transaction.',
      viewAllLink = '/agents',
      columns = 3,
      showViewAll = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const containerRef = useRef(null);

    // Featured agent first, then rest
    const sortedAgents = featuredAgent
      ? [featuredAgent, ...agents.filter((a) => a.id !== featuredAgent.id)]
      : agents;

    const displayAgents = sortedAgents.slice(0, columns * 2);
    const hasFeatured = !!featuredAgent;

    const columnClasses = {
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    };

    const handleTouchStart = (e) => {
      setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
      setTouchEnd(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
      if (!touchStart || !touchEnd) return;
      const distance = touchStart - touchEnd;
      const threshold = 50;
      if (distance > threshold) {
        setCurrentIndex((prev) => Math.min(displayAgents.length - columns, prev + 1));
      } else if (distance < -threshold) {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
      }
      setTouchStart(null);
      setTouchEnd(null);
    };

    const visibleAgents = displayAgents.slice(currentIndex, currentIndex + columns);

    return (
      <Section
        ref={ref}
        id="agents"
        padding="lg"
        background="white"
        className={cn('scroll-mt-20', className)}
        {...props}
      >
        <div className="space-y-8 lg:space-y-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <SectionHeader
              title={title}
              subtitle={subtitle}
              description={description}
              align="left"
              size="md"
              className="flex-1"
            />

            {showViewAll && viewAllLink && (
              <Link
                to={viewAllLink}
                className="flex items-center gap-1 text-sm font-medium text-navy-600 hover:text-navy-800 transition-colors group whitespace-nowrap"
              >
                <span>View All Agents</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
          </div>

          {/* Agents Grid */}
          {loading ? (
            <div className={cn('grid gap-4 sm:gap-6', columnClasses[columns])}>
              {Array.from({ length: columns }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-[4/3] bg-navy-100 rounded-t-2xl" />
                  <div className="p-4 space-y-3 bg-white rounded-b-2xl border border-navy-100">
                    <div className="h-5 bg-navy-100 rounded w-3/4" />
                    <div className="h-3 bg-navy-100 rounded w-1/2" />
                    <div className="h-4 bg-navy-100 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : agents.length > 0 ? (
            <div
              ref={containerRef}
              className="relative"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Featured Agent (first in list) */}
              {hasFeatured && (
                <div className="mb-6">
                  <AgentCard
                    agent={displayAgents[0]}
                    variant="featured"
                    size="lg"
                    featured={true}
                    onContact={() => {}}
                  />
                </div>
              )}

              {/* Regular Agents Grid */}
              <div className={cn('grid gap-4 sm:gap-6', columnClasses[columns])}>
                {visibleAgents.map((agent) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    variant="grid"
                    size="md"
                    featured={false}
                    onContact={() => {}}
                  />
                ))}
              </div>

              {/* Show all agents CTA */}
              {displayAgents.length > columns && showViewAll && (
                <div className="text-center mt-8">
                  <Link to={viewAllLink}>
                    <Button variant="outline" size="md" className="min-w-[200px]">
                      View All Agents
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-navy-500">No agents found</p>
            </div>
          )}
        </div>
      </Section>
    );
  }
);

AgentGrid.displayName = 'AgentGrid';

export default React.memo(AgentGrid);
