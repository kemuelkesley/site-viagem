
import React, { useRef, useState, useEffect, useCallback } from 'react';
import type { GalleryItem } from '../types';

interface GalleryProps {
  items: GalleryItem[];
  onOpenModal: (item: GalleryItem) => void;
}

// Helper function to chunk array into pages
const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const chunkedArr: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
};

export const Gallery: React.FC<GalleryProps> = ({ items, onOpenModal }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const showArrows = items.length > 6;

  const pages = chunkArray(items, 6);

  const checkButtons = useCallback(() => {
    if (!showArrows || !scrollContainerRef.current) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    };
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, [showArrows]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkButtons();
      container.addEventListener('scroll', checkButtons, { passive: true });
      window.addEventListener('resize', checkButtons);
      
      return () => {
        container.removeEventListener('scroll', checkButtons);
        window.removeEventListener('resize', checkButtons);
      };
    }
  }, [items, checkButtons]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };
  
  return (
    <section id="galeria" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-2">Minhas Aventuras</h2>
          <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">Uma coleção de momentos e lugares que moldaram minha jornada.</p>
        </div>
        
        <div className="relative">
          {showArrows && canScrollLeft && (
            <button 
              onClick={() => handleScroll('left')}
              className="absolute top-1/2 -left-2 sm:-left-6 z-10 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md transition"
              aria-label="Anterior"
            >
              <i className="fas fa-chevron-left text-slate-800"></i>
            </button>
          )}
          
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
          >
            {pages.map((pageItems, pageIndex) => (
              <div 
                key={pageIndex}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-shrink-0 w-full snap-start"
              >
                {pageItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                    onClick={() => onOpenModal(item)}
                  >
                    <img src={item.thumbnail} alt={item.title} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-center text-white p-4">
                        {item.type === 'video' && <i className="far fa-play-circle text-4xl mb-2"></i>}
                        {item.type === 'image' && <i className="far fa-eye text-4xl mb-2"></i>}
                        <h3 className="font-bold text-lg">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {showArrows && canScrollRight && (
             <button 
              onClick={() => handleScroll('right')}
              className="absolute top-1/2 -right-2 sm:-right-6 z-10 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md transition"
              aria-label="Próximo"
            >
              <i className="fas fa-chevron-right text-slate-800"></i>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
