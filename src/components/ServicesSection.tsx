import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ServiceItem } from '../data/stuntsData';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onSelectService,
}) => {
  return (
    <section id="services" className="py-24 bg-black relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-6 h-[2px] bg-red-600" />
              <span className="text-xs font-bold tracking-[0.25em] text-red-500 uppercase">
                SERVICES PORTFOLIO
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl text-white tracking-tight uppercase">
              WHAT WE <span className="text-red-600">CAPTURE</span>
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-md">
            From premier matric dance packages to lavish weddings and viral social
            reels, our team brings cinema-grade equipment and creative vision.
          </p>
        </div>

        {/* 6 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service.title)}
              className="group relative rounded-sm bg-zinc-950 border border-white/10 hover:border-red-600/60 transition-all duration-400 hover:-translate-y-2 overflow-hidden cursor-pointer flex flex-col justify-between shadow-xl"
            >
              {/* Card Image Container */}
              <div className="relative h-56 w-full overflow-hidden bg-zinc-900">
                <img
                  src={service.image}
                  alt={service.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/hero_matric_couple.jpg';
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                {/* Big Editorial Number */}
                <div className="absolute top-4 left-4">
                  <span className="font-display text-4xl sm:text-5xl text-white/80 group-hover:text-red-500 transition-colors">
                    {service.number}
                  </span>
                </div>

                {/* Subtag unboxed */}
                <div className="absolute top-5 right-4 text-[11px] font-semibold tracking-wider uppercase text-zinc-400">
                  {service.tag}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-display text-2xl sm:text-3xl text-white tracking-wide group-hover:text-red-500 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Action Row */}
                <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">
                    Enquire Service
                  </span>
                  <div className="w-8 h-8 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-zinc-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Bottom Red Accent Line */}
              <div className="absolute bottom-0 inset-x-0 h-[3px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
