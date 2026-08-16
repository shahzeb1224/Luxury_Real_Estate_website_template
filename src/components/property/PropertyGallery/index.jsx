import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { ChevronLeft, ChevronRight, X, Grid3x3, Maximize2 } from 'lucide-react';
import { lockScroll } from '@/utils/scroll';
import { modalVariants } from '@/animations/framer';

const PropertyGallery = ({
  images = [],
  title = 'Property Gallery',
  layout = 'grid',
  showThumbnails = true,
  showCount = true,
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const galleryRef = useRef(null);

  const totalImages = images.length;

  useEffect(() => {
    if (isFullscreen) {
      lockScroll(true);
    } else {
      lockScroll(false);
    }
    return () => lockScroll(false);
  }, [isFullscreen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isFullscreen) return;
      if (e.key === 'Escape') closeFullscreen();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  const openFullscreen = (index) => {
    setActiveIndex(index);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    setIsZoomed(false);
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
    if (distance > threshold) handleNext();
    else if (distance < -threshold) handlePrev();
    setTouchStart(null);
    setTouchEnd(null);
  };

  if (totalImages === 0) {
    return (
      <div className="flex items-center justify-center p-8 bg-navy-50 rounded-2xl">
        <p className="text-navy-500">No images available</p>
      </div>
    );
  }

  // Grid Layout
  if (layout === 'grid') {
    const gridClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-2 sm:grid-cols-4',
    };

    const cols = totalImages >= 4 ? 4 : totalImages;

    return (
      <div className={cn('w-full', className)}>
        <div className={cn('grid gap-1', gridClasses[cols])}>
          {images.slice(0, 5).map((image, index) => {
            const [loaded, setLoaded] = useState(false);
            const isLast = index === 4;
            const remaining = totalImages - 5;

            return (
              <button
                key={index}
                onClick={() => openFullscreen(index)}
                className={cn(
                  'relative overflow-hidden bg-navy-100 group focus:outline-none focus:ring-2 focus:ring-gold-500',
                  index === 0 && cols >= 2 ? 'col-span-2 row-span-2' : '',
                  index === 0 && cols === 1 ? 'aspect-[4/3]' : 'aspect-square'
                )}
                aria-label={`View image ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`${title} - Image ${index + 1}`}
                  className={cn(
                    'w-full h-full object-cover transition-transform duration-500 group-hover:scale-105',
                    loaded ? 'opacity-100' : 'opacity-0'
                  )}
                  onLoad={() => setLoaded(true)}
                  loading={index < 2 ? 'eager' : 'lazy'}
                />
                {!loaded && <div className="absolute inset-0 bg-navy-100 animate-pulse" />}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3 h-3" />
                </div>
                {isLast && remaining > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                    <span className="text-white text-2xl font-bold">+{remaining}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {showCount && totalImages > 1 && (
          <div className="mt-3 text-sm text-navy-500">{totalImages} images</div>
        )}

        {showThumbnails && totalImages > 5 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {images.slice(5, 12).map((image, index) => (
              <button
                key={index + 5}
                onClick={() => openFullscreen(index + 5)}
                className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-navy-100 focus:outline-none focus:ring-2 focus:ring-gold-500"
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 6}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
            {totalImages > 12 && (
              <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-navy-200 flex items-center justify-center text-sm text-navy-500 font-medium">
                +{totalImages - 12}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Fullscreen Modal
  return (
    <>
      <div className="relative overflow-hidden rounded-2xl bg-navy-100 aspect-[4/3] sm:aspect-[16/9]">
        <img
          src={images[activeIndex]}
          alt={`${title} - Image ${activeIndex + 1}`}
          className="w-full h-full object-cover"
        />
        {totalImages > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => openFullscreen(activeIndex)}
              className="absolute bottom-2 right-2 p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 left-2 px-3 py-1 rounded-lg bg-black/50 text-white text-sm">
              {activeIndex + 1} / {totalImages}
            </div>
          </>
        )}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            variants={modalVariants.overlay}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-modal bg-black/95 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Fullscreen gallery"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.img
              key={activeIndex}
              src={images[activeIndex]}
              alt={`${title} - Image ${activeIndex + 1}`}
              className={cn(
                'max-w-full max-h-[90vh] object-contain cursor-zoom-in',
                isZoomed && 'cursor-zoom-out scale-150'
              )}
              onClick={() => setIsZoomed(!isZoomed)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: isZoomed ? 1.5 : 1 }}
              transition={{ duration: 0.3 }}
            />

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 bg-black/50 rounded-xl backdrop-blur-sm max-w-[80vw] overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    'flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden transition-all',
                    index === activeIndex
                      ? 'ring-2 ring-gold-500 scale-110'
                      : 'opacity-50 hover:opacity-100'
                  )}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {activeIndex + 1} / {totalImages}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PropertyGallery;
