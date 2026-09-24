import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Shield } from 'lucide-react';
import { ContactInfo } from '../data/stuntsData';

interface NavbarProps {
  contact: ContactInfo;
  onNavigateToBooking: (packageId?: string) => void;
  onOpenAdmin: () => void;
  currentView: 'site' | 'admin';
}

export const Navbar: React.FC<NavbarProps> = ({
  contact,
  onNavigateToBooking,
  onOpenAdmin,
  currentView
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#hero' },
    { label: 'ABOUT', href: '#about' },
    { label: 'SERVICES', href: '#services' },
    { label: 'PACKAGES', href: '#packages' },
    { label: 'PORTFOLIO', href: '#portfolio' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (currentView === 'admin') {
      // If in admin mode, click will return to site and scroll
      window.location.hash = href;
      window.location.reload();
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'py-3.5 bg-black/90 backdrop-blur-md border-b border-white/10 shadow-2xl'
            : 'py-5 bg-gradient-to-b from-black/80 via-black/40 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Zone 1: Single Brand Wordmark in Bebas Neue display */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#hero');
            }}
            className="flex items-center gap-2 group"
          >
            <span className="font-display text-3xl sm:text-4xl tracking-wider text-white group-hover:text-red-500 transition-colors">
              STUNTS
            </span>
            <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
          </a>

          {/* Zone 2: 4-6 Clean Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-xs font-semibold tracking-widest text-zinc-300 hover:text-white relative py-1 transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={`https://wa.me/${contact.whatsappNumber}?text=Hi%20STUNTS%20Photography%20%26%20Videography%2C%20I%20would%20like%20to%20enquire%20about%20booking.`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp STUNTS"
              className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
              title="Chat on WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => onNavigateToBooking()}
              className="px-5 py-2 text-xs font-bold uppercase tracking-widest text-white bg-red-600 hover:bg-red-700 active:scale-95 rounded-sm transition-all duration-200 shadow-md shadow-red-950/40 cursor-pointer whitespace-nowrap"
            >
              BOOK NOW
            </button>

            <button
              onClick={onOpenAdmin}
              className="p-2 text-zinc-500 hover:text-zinc-300 transition-colors"
              title="Studio Portal / Admin"
              aria-label="Admin Login"
            >
              <Shield className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-3">
            <button
              onClick={() => onNavigateToBooking()}
              className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white bg-red-600 rounded-sm"
            >
              BOOK
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Animated Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-6 pt-24 sm:hidden animate-fadeIn">
          <div className="flex flex-col space-y-6">
            <span className="text-xs uppercase tracking-widest text-red-500 font-bold">
              Navigation Menu
            </span>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="font-display text-4xl tracking-wider text-zinc-100 hover:text-red-500 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToBooking();
              }}
              className="w-full py-3.5 text-center font-bold tracking-widest uppercase text-white bg-red-600 rounded-sm"
            >
              BOOK YOUR SESSION
            </button>

            <div className="flex justify-between items-center text-xs text-zinc-400 pt-2">
              <a
                href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                className="hover:text-white"
              >
                {contact.phone}
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-zinc-500 hover:text-red-400 flex items-center gap-1"
              >
                <Shield className="w-3 h-3" /> Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
