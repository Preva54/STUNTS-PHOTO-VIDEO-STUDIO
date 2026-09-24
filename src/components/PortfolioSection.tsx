import React, { useState, useMemo } from 'react';
import { Eye, Play, Sparkles } from 'lucide-react';
import { PortfolioItem } from '../data/stuntsData';
import { PortfolioLightbox } from './PortfolioLightbox';

interface PortfolioSectionProps {
  portfolio: PortfolioItem[];
}

type CategoryType = 'ALL' | 'MATRIC' | 'WEDDINGS' | 'EVENTS' | 'PORTRAITS' | 'VIDEOS';

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ portfolio }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('ALL');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const categories: CategoryType[] = ['ALL', 'MATRIC', 'WEDDINGS', 'EVENTS', 'PORTRAITS', 'VIDEOS'];

  const filteredItems = useMemo(() => {
    if (activeCategory === 'ALL') return portfolio;
    return portfolio.filter((item) => item.category === activeCategory);
  }, [portfolio, activeCategory]);

  const currentSelectedItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  const handleNext = () => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((selectedItemIndex + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (selectedItemIndex === null) return;
    setSelectedItemIndex((selectedItemIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="portfolio" className="py-24 bg-black relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-6 h-[2px] bg-red-600" />
              <span className="text-xs font-bold tracking-[0.25em] text-red-500 uppercase">
                GALLERY ARCHIVE
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl text-white tracking-tight uppercase">
              OUR <span className="text-red-600">WORK</span>
            </h2>
            <p className="text-zinc-400 text-sm font-light">
              REAL MOMENTS. REAL MEMORIES.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-950 border border-white/10 rounded-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedItemIndex(null);
                }}
                className={`px-3 sm:px-4 py-1.5 text-xs font-bold tracking-wider rounded-sm transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => {
            const isWide = item.aspectRatio === 'wide';
            const isTall = item.aspectRatio === 'tall';

            return (
              <div
                key={item.id}
                onClick={() => setSelectedItemIndex(index)}
                className={`group relative rounded-sm overflow-hidden bg-zinc-950 border border-white/10 hover:border-red-600/70 transition-all duration-500 cursor-pointer ${
                  isWide ? 'sm:col-span-2' : ''
                } ${isTall ? 'sm:row-span-2' : ''}`}
              >
                <div className="relative w-full h-72 sm:h-80 md:h-96 overflow-hidden bg-zinc-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/hero_matric_couple.jpg';
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                  />

                  {/* Dark gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Top category tag */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red-500 bg-black/70 backdrop-blur-md px-2.5 py-1 border border-red-600/30 rounded-sm">
                      {item.category}
                    </span>
                  </div>

                  {/* Video indicator icon if video */}
                  {item.videoUrl && (
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg">
                      <Play className="w-4 h-4 ml-0.5" />
                    </div>
                  )}

                  {/* Bottom Information overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                    <h3 className="font-display text-2xl text-white tracking-wide uppercase group-hover:text-red-400 transition-colors line-clamp-1">
                      {item.title}
                    </h3>

                    <div className="flex items-center justify-between text-xs text-zinc-400 mt-2 pt-2 border-t border-white/10">
                      <span>{item.location || 'Pretoria, ZA'}</span>
                      <span className="flex items-center gap-1 text-red-500 font-bold uppercase text-[10px] tracking-wider group-hover:translate-x-1 transition-transform">
                        <Eye className="w-3.5 h-3.5" /> VIEW
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subtle bottom red indicator */}
                <div className="absolute bottom-0 inset-x-0 h-1 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-20 text-center text-zinc-500 text-sm">
            No items in this category yet. Check other categories above.
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <PortfolioLightbox
        item={currentSelectedItem}
        items={filteredItems}
        currentIndex={selectedItemIndex ?? 0}
        onClose={() => setSelectedItemIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
};
