import React from 'react';
import {
  Check,
  Clock,
  Camera,
  Film,
  Sparkles,
  MapPin,
  Image as ImageIcon,
  Download,
  Share2,
  Palette,
  Flame,
  MessageSquare
} from 'lucide-react';
import { PackageItem, PACKAGE_FEATURES_LIST, ContactInfo } from '../data/stuntsData';

interface PackagesSectionProps {
  packages: PackageItem[];
  contact: ContactInfo;
  onSelectPackage: (pkg: PackageItem) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  packages,
  contact,
  onSelectPackage,
}) => {
  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'gallery':
        return ImageIcon;
      case 'download':
        return Download;
      case 'sparkle':
        return Sparkles;
      case 'clock':
        return Clock;
      case 'palette':
        return Palette;
      case 'share':
        return Share2;
      default:
        return Sparkles;
    }
  };

  const generateWhatsAppPackageUrl = (pkg: PackageItem) => {
    const text = `Hi STUNTS Photography & Videography, I would like to enquire about the ${pkg.name} Matric Dance Package for ${pkg.price}.`;
    return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="packages" className="py-24 bg-zinc-950 relative overflow-hidden border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/10 border border-red-600/30 rounded-full">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs font-bold tracking-[0.2em] text-red-500 uppercase">
              OFFICIAL 2026 RATES
            </span>
          </div>

          <h2 className="font-display text-5xl sm:text-7xl text-white tracking-tight uppercase leading-[0.9]">
            MATRIC DANCE <br />
            <span className="text-red-600">PACKAGES</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base font-light">
            Choose the package that fits your celebration. Designed directly from our
            official studio service roster with cinema grading and fast sneak peeks.
          </p>
        </div>

        {/* Four Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 mb-20 items-stretch">
          {packages.map((pkg) => {
            const isDeluxe = pkg.name.toLowerCase().includes('deluxe');
            const isPremium = pkg.name.toLowerCase().includes('premium');

            return (
              <div
                key={pkg.id}
                className={`relative rounded-sm bg-black border transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-2.5 ${
                  isPremium
                    ? 'border-red-600 shadow-xl shadow-red-950/60 ring-1 ring-red-600/50'
                    : 'border-white/10 hover:border-red-600/60 hover:shadow-2xl hover:shadow-red-950/40'
                }`}
              >
                {/* Popular / Featured Ribbon */}
                {isPremium && (
                  <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.18em] px-3 py-1 rounded-bl-sm flex items-center gap-1 z-10 shadow-md">
                    <Flame className="w-3 h-3" /> MOST POPULAR
                  </div>
                )}

                {/* Deluxe Participants Badge */}
                {pkg.badge && (
                  <div className="absolute top-0 right-0 bg-white text-black text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1 rounded-bl-sm z-10 shadow-md">
                    {pkg.badge}
                  </div>
                )}

                <div className="p-6 sm:p-7 space-y-6 flex-1">
                  {/* Top package indicator */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold tracking-[0.2em] text-red-500 uppercase block">
                      {pkg.number}
                    </span>
                    <h3 className="font-display text-4xl text-white tracking-wide uppercase">
                      {pkg.name}
                    </h3>
                  </div>

                  {/* Price Tag */}
                  <div className="pb-4 border-b border-white/10">
                    <div className="font-display text-4xl sm:text-5xl text-white tracking-tight flex items-baseline gap-1">
                      <span className="text-red-500 font-sans text-2xl font-bold">R</span>
                      <span>{pkg.price.replace(/[^0-9,]/g, '')}</span>
                    </div>
                    <span className="text-[11px] tracking-wider text-zinc-400 block mt-1">
                      Full Session Package
                    </span>
                  </div>

                  {/* Feature Checklist matching flyer */}
                  <ul className="space-y-3.5 text-xs text-zinc-300 font-medium">
                    <li className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white font-bold">{pkg.duration}</strong>
                      </span>
                    </li>

                    <li className="flex items-start gap-2.5">
                      <Camera className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white font-bold">{pkg.editedPhotos}</strong>
                      </span>
                    </li>

                    {pkg.rawFiles && (
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-red-400 font-bold tracking-wide">
                          {pkg.rawFiles}
                        </span>
                      </li>
                    )}

                    {pkg.highlightsVideo && (
                      <li className="flex items-start gap-2.5">
                        <Film className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-white font-bold">
                            {pkg.highlightsVideo}
                          </strong>
                        </span>
                      </li>
                    )}

                    <li className="flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-white font-bold">{pkg.creativeReel}</strong>
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Bottom Actions */}
                <div className="p-6 pt-0 space-y-2.5">
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className={`w-full py-3 px-4 font-bold text-xs uppercase tracking-widest rounded-sm transition-all duration-200 cursor-pointer ${
                      isPremium
                        ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-950'
                        : 'bg-zinc-900 hover:bg-red-600 text-white border border-white/10 hover:border-red-600'
                    }`}
                  >
                    BOOK {pkg.name}
                  </button>

                  <a
                    href={generateWhatsAppPackageUrl(pkg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 text-[11px] font-semibold text-zinc-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3 h-3 text-red-500" />
                    <span>WhatsApp Enquiry</span>
                  </a>
                </div>

                {/* Subtle bottom red strip */}
                <div className="h-1 bg-red-600/30 group-hover:bg-red-600 transition-colors" />
              </div>
            );
          })}
        </div>

        {/* 9. PACKAGE FEATURES STRIP */}
        <div className="bg-black border border-white/10 rounded-sm p-6 sm:p-8 mb-12 shadow-2xl relative">
          <div className="text-center mb-8">
            <span className="text-xs font-bold tracking-[0.25em] text-red-500 uppercase">
              INCLUDED WITH EVERY PACKAGE
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-white tracking-wide uppercase mt-1">
              THE STUNTS SIGNATURE STANDARD
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {PACKAGE_FEATURES_LIST.map((feature, idx) => {
              const IconComp = getFeatureIcon(feature.icon);
              return (
                <div key={idx} className="flex flex-col items-center space-y-2 group">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 group-hover:border-red-600 group-hover:bg-red-600/10 transition-all duration-300 flex items-center justify-center">
                    <IconComp className="w-5 h-5 text-red-500" />
                  </div>
                  <h4 className="font-display text-base text-white tracking-wide uppercase">
                    {feature.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 leading-tight">
                    {feature.subtitle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 10. TRAVEL INFORMATION BANNER */}
        <div className="relative rounded-sm overflow-hidden bg-gradient-to-r from-red-950/60 via-black to-zinc-950 border-2 border-red-600/60 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-950">
              <MapPin className="w-7 h-7" />
            </div>
            <div className="space-y-1 text-left">
              <span className="text-xs font-bold tracking-[0.2em] text-red-400 uppercase block">
                IMPORTANT TRAVEL NOTICE
              </span>
              <p className="font-display text-lg sm:text-xl md:text-2xl text-white tracking-wide uppercase">
                PRICES ARE BASED ON DISTANCES UP TO 15KM OF PRETORIA CBD.
              </p>
              <p className="text-xs sm:text-sm text-zinc-300 font-light">
                TRAVEL OUTSIDE THIS AREA IS CHARGED SEPARATELY.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${contact.whatsappNumber}?text=Hi%20STUNTS%20Photography%2C%20I%20would%20like%20to%20check%20if%20my%20event%20location%20is%20within%20the%2015km%20Pretoria%20CBD%20radius.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white hover:bg-zinc-200 text-black font-bold uppercase tracking-widest text-xs rounded-sm transition-colors shrink-0 cursor-pointer"
          >
            Check My Location
          </a>
        </div>
      </div>
    </section>
  );
};
