import React from 'react';
import { ArrowDown, Calendar, Sparkles, ChevronRight } from 'lucide-react';
import { heroMatricCouple } from '../assets/images';

interface HeroProps {
  onBookClick: () => void;
  onWorkClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onWorkClick }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black pt-20 pb-16"
    >
      {/* Background with dark gradient & cinematic ambient glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle radial red spotlight behind the visual circle */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-red-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-red-950/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Textured dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Column: Editorial Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6 sm:space-y-8">
            {/* Small Label with Red Accent Line */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-red-600" />
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-red-500 uppercase">
                STUNTS PHOTOGRAPHY &amp; VIDEOGRAPHY
              </span>
            </div>

            {/* Main Editorial Heading */}
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] xl:text-[6.5rem] tracking-tight leading-[0.92] text-white uppercase select-none">
              <span className="block text-white">
                CAPTURE <span className="text-red-600 drop-shadow-[0_0_25px_rgba(255,0,0,0.4)]">THE</span>
              </span>
              <span className="block text-white">MOMENT.</span>
              <span className="block mt-2 sm:mt-4 text-zinc-400">
                RELIVE <span className="text-red-600">THE</span>
              </span>
              <span className="block text-white">MEMORY.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-zinc-300 text-base sm:text-lg max-w-xl font-light leading-relaxed">
              Professional photography and videography for matric dances, weddings,
              celebrations and unforgettable moments in Pretoria and beyond.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onBookClick}
                className="group relative px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-xs sm:text-sm rounded-sm transition-all duration-300 shadow-xl shadow-red-950/50 flex items-center justify-center gap-3 cursor-pointer overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  BOOK YOUR SESSION
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={onWorkClick}
                className="px-8 py-4 border border-zinc-700 hover:border-red-600/70 text-zinc-200 hover:text-white font-semibold uppercase tracking-widest text-xs sm:text-sm rounded-sm transition-all duration-300 hover:bg-white/5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>VIEW OUR WORK</span>
                <ChevronRight className="w-4 h-4 text-red-500" />
              </button>
            </div>

            {/* Quick trust badges matching the flyer */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                Matric Dance Packages Available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                Pretoria CBD &amp; Gauteng
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                Photo + 4K Video Reels
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Effect - Circular Photography Element inspired by flyer */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px]">
              {/* Outer Thin White Dashed Orbit Ring */}
              <div className="absolute -inset-4 rounded-full border border-white/15 border-dashed animate-spin-slow pointer-events-none" />

              {/* Red Circular Brush & Gradient Stroke Ring */}
              <div className="absolute -inset-2 rounded-full p-[3px] bg-gradient-to-tr from-red-600 via-transparent to-red-600 animate-spin-reverse-slow pointer-events-none opacity-80" />

              {/* Red Glow Halo */}
              <div className="absolute inset-0 rounded-full bg-red-600/20 blur-xl pointer-events-none" />

              {/* Main Circular Photography Frame */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-red-600/90 shadow-2xl shadow-red-950/80 bg-zinc-950 group">
                <img
                  src={heroMatricCouple}
                  alt="STUNTS Matric Dance Couple Photography Pretoria"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

                {/* Decorative floating label inside circle */}
                <div className="absolute bottom-6 inset-x-0 text-center pointer-events-none px-4">
                  <span className="font-script text-2xl sm:text-3xl text-red-500 drop-shadow-md">
                    Matric Dance Special
                  </span>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-zinc-300 font-bold">
                    PRETORIA 2026
                  </p>
                </div>
              </div>

              {/* Floating Orbiting Accent Badges */}
              <div className="absolute -top-2 right-2 bg-black/90 backdrop-blur-md border border-red-600/40 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wider text-white shadow-xl flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-red-500" />
                <span>CINEMATIC 4K</span>
              </div>

              <div className="absolute -bottom-2 -left-2 bg-black/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wider text-zinc-200 shadow-xl flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                <span>72HR SNEAK PEEK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors cursor-pointer">
          <a href="#about" className="flex flex-col items-center gap-1">
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown className="w-4 h-4 text-red-500 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};
