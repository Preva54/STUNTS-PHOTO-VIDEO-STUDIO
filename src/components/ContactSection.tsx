import React from 'react';
import {
  Phone,
  MapPin,
  Mail,
  ExternalLink,
  MessageCircle,
  Share2
} from 'lucide-react';
import { ContactInfo } from '../data/stuntsData';

interface ContactSectionProps {
  contact: ContactInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contact }) => {
  return (
    <section id="contact" className="py-24 bg-zinc-950 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <span className="w-6 h-[2px] bg-red-600" />
            <span className="text-xs font-bold tracking-[0.25em] text-red-500 uppercase">
              STUDIO CONTACT &amp; LOCATION
            </span>
            <span className="w-6 h-[2px] bg-red-600" />
          </div>

          <h2 className="font-display text-4xl sm:text-6xl text-white tracking-tight uppercase">
            LET'S <span className="text-red-600">TALK.</span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base font-light">
            We are based in Arcadia, Pretoria. Visit us at the studio, call our
            hotline, or message us directly on WhatsApp.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Phone / WhatsApp */}
          <a
            href={`https://wa.me/${contact.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-7 bg-black border border-white/10 rounded-sm hover:border-red-600/60 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors text-red-500">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-500 block">
                  PHONE / WHATSAPP
                </span>
                <p className="font-display text-2xl text-white tracking-wide mt-1">
                  {contact.phoneDisplay}
                </p>
              </div>
            </div>
            <span className="text-xs text-zinc-400 mt-6 pt-4 border-t border-white/5 flex items-center gap-1 group-hover:text-white transition-colors">
              Chat on WhatsApp <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </a>

          {/* Address */}
          <div className="p-7 bg-black border border-white/10 rounded-sm hover:border-red-600/60 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors text-red-500">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-500 block">
                  STUDIO ADDRESS
                </span>
                <p className="text-sm font-semibold text-white mt-1 leading-snug">
                  {contact.addressLine1},<br />
                  {contact.addressLine2},<br />
                  {contact.city}
                </p>
              </div>
            </div>
            <span className="text-xs text-zinc-400 mt-6 pt-4 border-t border-white/5">
              15km CBD Standard Radius
            </span>
          </div>

          {/* Facebook */}
          <a
            href={contact.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-7 bg-black border border-white/10 rounded-sm hover:border-red-600/60 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors text-red-500">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-500 block">
                  FACEBOOK
                </span>
                <p className="font-display text-xl text-white tracking-wide mt-1">
                  {contact.facebook}
                </p>
              </div>
            </div>
            <span className="text-xs text-zinc-400 mt-6 pt-4 border-t border-white/5 flex items-center gap-1 group-hover:text-white transition-colors">
              Follow Page <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </a>

          {/* TikTok */}
          <a
            href={contact.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-7 bg-black border border-white/10 rounded-sm hover:border-red-600/60 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors text-red-500">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-500 block">
                  TIKTOK
                </span>
                <p className="font-display text-xl text-white tracking-wide mt-1">
                  {contact.tiktok}
                </p>
              </div>
            </div>
            <span className="text-xs text-zinc-400 mt-6 pt-4 border-t border-white/5 flex items-center gap-1 group-hover:text-white transition-colors">
              Watch Reels <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </a>
        </div>

        {/* Google Maps-Style Location Area (Section 17) */}
        <div className="relative rounded-sm overflow-hidden bg-black border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Map Frame Embed for 498 Madiba St, Arcadia, Pretoria */}
            <div className="lg:col-span-8 h-80 sm:h-96 relative bg-zinc-900">
              <iframe
                title="STUNTS Photography Location Pretoria"
                src="https://maps.google.com/maps?q=498%20Madiba%20St,%20Arcadia,%20Pretoria,%20South%20Africa&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter invert-[90%] hue-rotate-180 contrast-125 brightness-90"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Studio Info Panel */}
            <div className="lg:col-span-4 p-8 bg-zinc-950 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
                    VISIT OUR STUDIO
                  </span>
                </div>

                <h3 className="font-display text-3xl text-white uppercase">
                  STUNTS PRETORIA HQ
                </h3>

                <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                  Conveniently situated in Arcadia on Madiba Street, close to the Union
                  Buildings and central Pretoria. Studio sessions and pre-matric photo
                  consultations by appointment.
                </p>

                <div className="text-xs space-y-2 text-zinc-300 pt-2 border-t border-white/10">
                  <p><strong className="text-white">Hours:</strong> Mon – Sun: 08:00 – 20:00</p>
                  <p><strong className="text-white">Service Area:</strong> Pretoria, Centurion, Midrand, Johannesburg</p>
                </div>
              </div>

              <a
                href={`https://maps.google.com/?q=498+Madiba+St,+Arcadia,+Pretoria`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest text-center rounded-sm transition-colors flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4" /> Open in Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* 18. SOCIAL MEDIA SECTION: FOLLOW THE MOMENTS */}
        <div className="mt-20 pt-16 border-t border-white/10 text-center space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-[0.25em] text-red-500 uppercase">
              COMMUNITY &amp; SHOWCASE
            </span>
            <h3 className="font-display text-3xl sm:text-5xl text-white uppercase">
              FOLLOW THE MOMENTS
            </h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto">
              See our latest work, real-time client highlights, and behind-the-scenes
              moments across our social channels.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* TikTok */}
            <a
              href={contact.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-black border border-white/10 rounded-sm hover:border-red-600 transition-all duration-300 group hover:-translate-y-1 flex flex-col items-center space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </div>
              <h4 className="font-display text-xl text-white uppercase">TIKTOK</h4>
              <span className="text-xs text-red-400 font-medium">{contact.tiktok}</span>
              <p className="text-[11px] text-zinc-400">Viral matric dance reels &amp; trends</p>
            </a>

            {/* Facebook */}
            <a
              href={contact.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-black border border-white/10 rounded-sm hover:border-red-600 transition-all duration-300 group hover:-translate-y-1 flex flex-col items-center space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h4 className="font-display text-xl text-white uppercase">FACEBOOK</h4>
              <span className="text-xs text-red-400 font-medium">{contact.facebook}</span>
              <p className="text-[11px] text-zinc-400">Photo albums &amp; community reviews</p>
            </a>

            {/* Instagram */}
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 bg-black border border-white/10 rounded-sm hover:border-red-600 transition-all duration-300 group hover:-translate-y-1 flex flex-col items-center space-y-3"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-colors">
                <Share2 className="w-5 h-5" />
              </div>
              <h4 className="font-display text-xl text-white uppercase">INSTAGRAM</h4>
              <span className="text-xs text-red-400 font-medium">{contact.instagram}</span>
              <p className="text-[11px] text-zinc-400">Editorial portraits &amp; stories</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
