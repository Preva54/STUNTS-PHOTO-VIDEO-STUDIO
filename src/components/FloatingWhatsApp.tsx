import React, { useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { ContactInfo } from '../data/stuntsData';

interface FloatingWhatsAppProps {
  contact: ContactInfo;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ contact }) => {
  const [isHovered, setIsHovered] = useState(false);

  const defaultMsg =
    'Hi STUNTS Photography & Videography, I would like to enquire about booking a photography/videography package. Please send me more information.';

  return (
    <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip Label */}
      <div
        className={`bg-zinc-950 text-white text-xs font-semibold px-3 py-1.5 rounded-sm border border-red-600/40 shadow-xl transition-all duration-300 pointer-events-none hidden sm:block ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}
      >
        <span className="text-red-500 mr-1.5 font-bold">●</span>
        Chat with STUNTS
      </div>

      {/* Floating Button */}
      <a
        href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(defaultMsg)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with STUNTS on WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-14 h-14 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-2xl shadow-red-950/80 transition-all duration-300 hover:scale-105 active:scale-95 group border-2 border-white/20"
      >
        {/* Subtle Pulse ring */}
        <span className="absolute -inset-1 rounded-full bg-red-600/40 animate-ping pointer-events-none opacity-75" />

        <Phone className="w-6 h-6 text-white transition-transform group-hover:rotate-12" />

        {/* Small active badge */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-white border-2 border-black flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-red-600" />
        </span>
      </a>
    </aside>
  );
};
