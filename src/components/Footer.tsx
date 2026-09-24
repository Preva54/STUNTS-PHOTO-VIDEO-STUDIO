import React from 'react';
import { Phone, MapPin, MessageCircle, Share2, Shield, ArrowUp } from 'lucide-react';
import { ContactInfo } from '../data/stuntsData';

interface FooterProps {
  contact: ContactInfo;
  onNavigateToBooking: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  contact,
  onNavigateToBooking,
  onOpenAdmin,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Packages', href: '#packages' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-black text-white border-t border-white/10 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          {/* Brand & Tagline */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-4xl sm:text-5xl tracking-wider text-white">
                STUNTS
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            </div>

            <p className="text-xs sm:text-sm font-bold tracking-[0.25em] text-red-500 uppercase">
              PHOTOGRAPHY &amp; VIDEOGRAPHY SERVICES
            </p>

            <p className="font-display text-2xl sm:text-3xl text-zinc-300 uppercase tracking-wide leading-tight">
              CAPTURE THE MOMENT. <br />
              <span className="text-red-600">RELIVE THE MEMORY.</span>
            </p>

            <p className="text-zinc-400 text-xs sm:text-sm font-light max-w-sm">
              Pretoria's dedicated creative team for matric dances, luxury weddings,
              high-energy celebrations and 4K social media reels.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-300">
              EXPLORE
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-medium">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-red-500 transition-colors inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={onNavigateToBooking}
                  className="text-red-500 font-bold hover:text-red-400 uppercase tracking-wider text-xs cursor-pointer"
                >
                  Book Now →
                </button>
              </li>
            </ul>
          </div>

          {/* Studio Contact Info */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-300">
              PRETORIA STUDIO
            </h4>

            <div className="space-y-3 text-xs text-zinc-400">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>
                  {contact.addressLine1}, {contact.addressLine2}, {contact.city}, South Africa
                </span>
              </p>

              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a
                  href={`https://wa.me/${contact.whatsappNumber}`}
                  className="hover:text-white font-semibold text-zinc-200"
                >
                  {contact.phoneDisplay}
                </a>
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href={contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="STUNTS Facebook"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-red-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <a
                href={contact.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="STUNTS TikTok"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-red-600 transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </a>

              <button
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="w-9 h-9 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors ml-auto"
                title="Back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Admin link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-4">
          <p>© 2026 STUNTS Photography &amp; Videography Services. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span>Pretoria, South Africa</span>
            <button
              onClick={onOpenAdmin}
              className="text-zinc-600 hover:text-zinc-400 flex items-center gap-1 transition-colors"
              title="Studio Portal"
            >
              <Shield className="w-3 h-3" /> Studio Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
