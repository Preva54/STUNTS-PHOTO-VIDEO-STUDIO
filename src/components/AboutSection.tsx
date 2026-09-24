import React from 'react';
import { Camera, Film, MapPin, Award } from 'lucide-react';
import { aboutPhotographer } from '../assets/images';

export const AboutSection: React.FC = () => {
  const stats = [
    { value: '100+', label: 'MOMENTS CAPTURED', icon: Camera },
    { value: '4+', label: 'PACKAGE OPTIONS', icon: Award },
    { value: 'PHOTO + VIDEO', label: 'FULL SERVICE', icon: Film },
    { value: 'PRETORIA', label: 'BASED & MOBILE', icon: MapPin },
  ];

  return (
    <section id="about" className="relative py-24 bg-black border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-red-950/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Photography with Red Accent Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Red Corner Accent */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-red-600 z-10 pointer-events-none" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-red-600 z-10 pointer-events-none" />

              {/* Main Image Container */}
              <div className="relative rounded-sm overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl group">
                <img
                  src={aboutPhotographer}
                  alt="STUNTS Photography & Videography Studio Behind the Lens"
                  referrerPolicy="no-referrer"
                  className="w-full h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                {/* Badge Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-500 block">
                      STUNTS CREATIVE LAB
                    </span>
                    <span className="text-sm font-semibold text-white">
                      498 Madiba St, Arcadia, Pretoria
                    </span>
                  </div>
                  <span className="w-3 h-3 rounded-full bg-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text & Animated Stat Matrix */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-6 h-[2px] bg-red-600" />
                <span className="text-xs font-bold tracking-[0.25em] text-red-500 uppercase">
                  ABOUT STUNTS
                </span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-[0.95]">
                WE CAPTURE <br />
                <span className="text-red-600">WHAT MATTERS.</span>
              </h2>
            </div>

            <div className="space-y-4 text-zinc-300 text-base sm:text-lg font-light leading-relaxed">
              <p>
                <strong className="font-semibold text-white">
                  STUNTS Photography &amp; Videography Services
                </strong>{' '}
                is dedicated to capturing meaningful moments and transforming them into
                memories you can relive for years to come.
              </p>
              <p className="text-zinc-400">
                We specialize in creating professional photography and cinematic videos
                for special occasions, with a focus on quality, creativity, and
                unforgettable visual storytelling. From high-fashion matric dances and
                dream weddings to intimate portraits and high-energy gala events.
              </p>
            </div>

            {/* Statistics Matrix */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat, idx) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={idx}
                    className="p-5 bg-zinc-950/80 border border-white/10 rounded-sm hover:border-red-600/50 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-display text-3xl sm:text-4xl text-white tracking-wider group-hover:text-red-500 transition-colors">
                        {stat.value}
                      </span>
                      <IconComponent className="w-5 h-5 text-zinc-500 group-hover:text-red-500 transition-colors" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
