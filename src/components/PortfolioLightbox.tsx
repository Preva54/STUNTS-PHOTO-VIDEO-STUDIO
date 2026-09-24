import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Play } from 'lucide-react';
import { PortfolioItem } from '../data/stuntsData';

interface PortfolioLightboxProps {
  item: PortfolioItem | null;
  items: PortfolioItem[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const PortfolioLightbox: React.FC<PortfolioLightboxProps> = ({
  item,
  items,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (!item) return;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, handleKeyDown]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onClick={onClose}
    >
      {/* Top Bar: Title & Close */}
      <div
        className="flex items-center justify-between z-10 w-full max-w-7xl mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-red-600" />
          <span className="font-display text-xl sm:text-2xl text-white tracking-wide uppercase">
            {item.title}
          </span>
          <span className="text-xs text-zinc-400 hidden sm:inline">
            ({currentIndex + 1} of {items.length})
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-zinc-900/80 hover:bg-red-600 text-zinc-300 hover:text-white transition-colors cursor-pointer border border-white/10"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Center Media Viewport */}
      <div
        className="relative flex-1 flex items-center justify-center my-4 overflow-hidden w-full max-w-6xl mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {item.videoUrl ? (
          <div className="relative w-full max-h-[75vh] flex justify-center">
            <video
              src={item.videoUrl}
              controls
              autoPlay
              className="max-h-[75vh] max-w-full rounded-sm shadow-2xl border border-white/10"
            />
          </div>
        ) : (
          <img
            src={item.image}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="max-h-[75vh] max-w-full object-contain rounded-sm shadow-2xl border border-white/10 select-none"
          />
        )}

        {/* Previous Navigation Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-2 sm:left-4 p-3 rounded-full bg-black/60 hover:bg-red-600 text-white transition-all border border-white/10 hover:border-red-600 cursor-pointer group"
          aria-label="Previous Image"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Next Navigation Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-2 sm:right-4 p-3 rounded-full bg-black/60 hover:bg-red-600 text-white transition-all border border-white/10 hover:border-red-600 cursor-pointer group"
          aria-label="Next Image"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Bottom Metadata Bar */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 max-w-7xl mx-auto w-full pt-2 border-t border-white/10 gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4">
          <span className="text-red-500 font-bold uppercase tracking-widest">
            {item.category}
          </span>
          {item.location && (
            <span className="flex items-center gap-1 text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              {item.location}
            </span>
          )}
          {item.date && (
            <span className="flex items-center gap-1 text-zinc-400">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
              {item.date}
            </span>
          )}
        </div>

        <div className="text-[11px] text-zinc-500">
          Press <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-300">ESC</kbd> to close,{' '}
          <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-300">←</kbd>{' '}
          <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-300">→</kbd> to navigate
        </div>
      </div>
    </div>
  );
};
