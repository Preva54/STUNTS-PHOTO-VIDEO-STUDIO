import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface FeaturedMatricSectionProps {
  onViewPackages: () => void;
}

export const FeaturedMatricSection: React.FC<FeaturedMatricSectionProps> = ({
  onViewPackages,
}) => {
  return (
    <section className="relative min-h-[550px] flex items-center justify-center overflow-hidden border-y border-white/10 bg-black">
      {/* Cinematic Ken Burns Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/matric_night_feature_1790271685576.jpg"
          alt="Matric Night Gala Pretoria"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center animate-ken-burns filter brightness-45 contrast-125"
        />
        {/* Layered dark gradients for editorial depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,0,0,0.15),transparent_60%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-red-600" />
            <span className="font-script text-2xl sm:text-3xl text-red-500">
              Exclusive Experience
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-[0.92]">
            MATRIC NIGHT. <br />
            <span className="text-red-600">CAPTURED DIFFERENTLY.</span>
          </h2>

          <p className="text-zinc-300 text-base sm:text-lg font-light leading-relaxed">
            From the entrance to the final dance, we capture the moments that make
            your matric dance unforgettable. Tailored luxury lighting, red-carpet
            angles, and viral creative reels that stand the test of time.
          </p>

          <div className="pt-2">
            <button
              onClick={onViewPackages}
              className="group px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-xs sm:text-sm rounded-sm transition-all duration-300 shadow-xl shadow-red-950/60 flex items-center gap-3 cursor-pointer"
            >
              <span>VIEW MATRIC PACKAGES</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
