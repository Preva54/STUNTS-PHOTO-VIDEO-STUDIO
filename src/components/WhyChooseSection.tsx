import React from 'react';
import { Sliders, Zap, Film, Camera, Share2, HeartHandshake } from 'lucide-react';
import { WHY_CHOOSE_ITEMS } from '../data/stuntsData';

export const WhyChooseSection: React.FC = () => {
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return Sliders;
      case 1:
        return Zap;
      case 2:
        return Film;
      case 3:
        return Camera;
      case 4:
        return Share2;
      case 5:
        return HeartHandshake;
      default:
        return Camera;
    }
  };

  return (
    <section className="py-24 bg-black relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <span className="w-6 h-[2px] bg-red-600" />
            <span className="text-xs font-bold tracking-[0.25em] text-red-500 uppercase">
              STUDIO ADVANTAGE
            </span>
            <span className="w-6 h-[2px] bg-red-600" />
          </div>

          <h2 className="font-display text-4xl sm:text-6xl text-white tracking-tight uppercase">
            WHY <span className="text-red-600">STUNTS?</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base font-light">
            We hold your milestones to the highest production standards. Here is why
            graduates, couples, and event hosts trust STUNTS Pretoria.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_ITEMS.map((item, idx) => {
            const IconComp = getIcon(idx);
            return (
              <div
                key={idx}
                className="p-8 bg-zinc-950 border border-white/10 rounded-sm hover:border-red-600/60 transition-all duration-300 group hover:-translate-y-1 relative flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl text-zinc-500 group-hover:text-red-500 transition-colors">
                      {item.number}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center group-hover:bg-red-600/20 group-hover:border-red-600/50 transition-colors">
                      <IconComp className="w-5 h-5 text-red-500" />
                    </div>
                  </div>

                  <h3 className="font-display text-2xl text-white tracking-wide uppercase group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom line */}
                <div className="h-0.5 bg-red-600/20 group-hover:bg-red-600 mt-6 transition-colors" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
