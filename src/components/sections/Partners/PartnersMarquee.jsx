import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/utils/cn';

const PartnersMarquee = React.forwardRef(
  (
    {
      partners = [],
      speed = 40,
      direction = 'left',
      pauseOnHover = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const [isPaused, setIsPaused] = useState(false);
    const [duplicatedPartners, setDuplicatedPartners] = useState([]);
    const containerRef = useRef(null);
    const marqueeRef = useRef(null);
    const animationRef = useRef(null);
    const positionRef = useRef(0);
    const speedRef = useRef(speed);

    // Duplicate partners for seamless scrolling
    useEffect(() => {
      if (partners.length > 0) {
        // Duplicate enough times to fill the viewport
        const duplicated = [];
        const count = Math.max(3, Math.ceil(window.innerWidth / 200) + 2);
        for (let i = 0; i < count; i++) {
          duplicated.push(...partners);
        }
        setDuplicatedPartners(duplicated);
      }
    }, [partners]);

    const animate = useCallback(() => {
      if (!marqueeRef.current || !containerRef.current) return;

      const step = direction === 'left' ? -0.5 : 0.5;
      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = marqueeRef.current.scrollWidth;

      if (!isPaused) {
        positionRef.current += step;
      }

      // Reset position for seamless looping
      if (direction === 'left' && positionRef.current < -contentWidth / 2) {
        positionRef.current += contentWidth / 2;
      } else if (direction === 'right' && positionRef.current > 0) {
        positionRef.current -= contentWidth / 2;
      }

      marqueeRef.current.style.transform = `translateX(${positionRef.current}px)`;
      animationRef.current = requestAnimationFrame(animate);
    }, [isPaused, direction]);

    useEffect(() => {
      if (duplicatedPartners.length === 0) return;

      // Set initial position
      const containerWidth = containerRef.current?.offsetWidth || 0;
      if (containerWidth > 0 && marqueeRef.current) {
        const contentWidth = marqueeRef.current.scrollWidth;
        if (direction === 'left') {
          positionRef.current = 0;
        } else {
          positionRef.current = -contentWidth / 2;
        }
        marqueeRef.current.style.transform = `translateX(${positionRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [duplicatedPartners, animate, direction]);

    // Pause on hover
    const handleMouseEnter = () => {
      if (pauseOnHover) setIsPaused(true);
    };

    const handleMouseLeave = () => {
      if (pauseOnHover) setIsPaused(false);
    };

    if (partners.length === 0) return null;

    return (
      <div
        ref={(el) => {
          containerRef.current = el;
          if (ref) {
            if (typeof ref === 'function') ref(el);
            else ref.current = el;
          }
        }}
        className={cn(
          'relative overflow-hidden py-4',
          'bg-navy-50 rounded-2xl border border-navy-100',
          className
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <div
          ref={marqueeRef}
          className="flex items-center gap-8 sm:gap-12 will-change-transform"
          style={{ whiteSpace: 'nowrap' }}
        >
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ height: '50px' }}
            >
              {partner.logo ? (
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-[120px] sm:max-w-[160px] object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  loading="lazy"
                />
              ) : (
                <span className="text-lg font-playfair font-bold text-navy-400">
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
);

PartnersMarquee.displayName = 'PartnersMarquee';

export default React.memo(PartnersMarquee);
