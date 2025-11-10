
import React, { useEffect } from 'react';
import type { GalleryItem } from '../types';

interface GalleryModalProps {
  item: GalleryItem;
  onClose: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 flex justify-between items-start border-b">
          <div className="pr-4">
            <h3 className="text-xl font-bold font-display">{item.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{item.description}</p>
            {item.videoUrl && (
              <a
                href={item.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 bg-sky-100 text-sky-700 font-semibold px-4 py-2 rounded-md hover:bg-sky-200 transition-colors duration-300 text-sm"
              >
                <i className="fas fa-play-circle"></i>
                <span>Ver Vídeo do Local</span>
              </a>
            )}
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800 text-2xl flex-shrink-0">&times;</button>
        </div>
        <div className="flex-grow flex items-center justify-center overflow-auto p-4 bg-slate-100">
          {item.type === 'image' ? (
            <img src={item.src} alt={item.title} className="max-w-full max-h-[70vh] object-contain" />
          ) : (
            <div className="w-full aspect-video">
              <iframe 
                src={item.src} 
                title={item.title} 
                className="w-full h-full"
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
