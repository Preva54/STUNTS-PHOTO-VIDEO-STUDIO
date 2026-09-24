import React, { useState } from 'react';
import { Play, X, Film, Sparkles, CheckCircle2 } from 'lucide-react';

interface VideoShowcaseProps {
  videoUrl?: string;
  onBookClick: () => void;
}

export const VideoShowcase: React.FC<VideoShowcaseProps> = ({
  videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-friends-walking-together-at-night-42862-large.mp4',
  onBookClick,
}) => {
  const [isPlayingModal, setIsPlayingModal] = useState(false);

  const videoPillars = [
    {
      title: 'HIGHLIGHTS VIDEOS',
      desc: '5–15 minute cinematic recap films crafted with precision soundtrack scoring.',
    },
    {
      title: 'CREATIVE REELS',
      desc: '30–60 second high-energy clips tailored for TikTok & Instagram virality.',
    },
    {
      title: 'EVENT VIDEOS',
      desc: 'Atmospheric multi-angle coverage capturing the soul of your celebration.',
    },
    {
      title: 'MATRIC DANCE FILMS',
      desc: 'Red-carpet grand entrances, couple portraits, and euphoric dance floor vibes.',
    },
  ];

  return (
    <section className="py-24 bg-zinc-950 relative border-t border-white/5 overflow-hidden">
      {/* Red ambient glow */}
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <span className="w-6 h-[2px] bg-red-600" />
            <span className="text-xs font-bold tracking-[0.25em] text-red-500 uppercase">
              CINEMATIC PRODUCTION
            </span>
            <span className="w-6 h-[2px] bg-red-600" />
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase">
            MOTION. <span className="text-red-600">MEMORY.</span> STORY.
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base font-light">
            We don’t just take photographs. We direct, shoot, and grade cinema-quality
            films that capture the motion and emotion of your finest milestones.
          </p>
        </div>

        {/* Large Cinematic Video Container */}
        <div className="relative rounded-sm overflow-hidden bg-black border border-white/10 shadow-2xl group max-w-5xl mx-auto mb-16">
          <div className="relative aspect-video w-full overflow-hidden bg-zinc-900">
            <img
              src="/src/assets/images/matric_night_feature_1790271685576.jpg"
              alt="STUNTS Cinematic Film Showcase"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-75 group-hover:brightness-90"
            />

            {/* Dark Scrim */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

            {/* Central Big Play Button */}
            <button
              onClick={() => setIsPlayingModal(true)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-2xl shadow-red-950/80 transition-all duration-300 hover:scale-110 cursor-pointer group/btn"
              aria-label="Play Cinema Showreel"
            >
              <div className="absolute inset-0 rounded-full border-2 border-white/40 animate-ping opacity-60" />
              <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 text-white fill-white" />
            </button>

            {/* Bottom Floating Bar */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/10">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                <span className="text-[11px] font-bold tracking-widest text-white uppercase">
                  STUNTS 4K SHOWREEL
                </span>
              </div>
              <div className="text-[11px] text-zinc-300 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/10 hidden sm:block">
                PRETORIA &amp; GAUTENG EVENTS
              </div>
            </div>
          </div>
        </div>

        {/* 4 Video Service Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videoPillars.map((pillar, i) => (
            <div
              key={i}
              className="p-6 bg-black border border-white/10 rounded-sm hover:border-red-600/50 transition-all duration-300 space-y-3 group"
            >
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Film className="w-4 h-4" />
              </div>
              <h3 className="font-display text-xl text-white tracking-wide uppercase group-hover:text-red-400 transition-colors">
                {pillar.title}
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed font-light">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {isPlayingModal && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setIsPlayingModal(false)}
        >
          <div
            className="relative w-full max-w-5xl bg-zinc-950 border border-white/20 rounded-sm overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Bar */}
            <div className="p-4 bg-zinc-900 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span className="font-display text-lg text-white tracking-wider uppercase">
                  STUNTS CINEMA SHOWREEL
                </span>
              </div>
              <button
                onClick={() => setIsPlayingModal(false)}
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video element */}
            <div className="relative aspect-video bg-black">
              <video
                src={videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-zinc-900/90 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-zinc-400">
                Want a highlight film or creative reel for your matric dance or wedding?
              </span>
              <button
                onClick={() => {
                  setIsPlayingModal(false);
                  onBookClick();
                }}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
              >
                Enquire Video Package
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
