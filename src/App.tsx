import React, { useState, useEffect } from 'react';
import { useStuntsStore } from './data/useStuntsStore';
import { PackageItem } from './data/stuntsData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PackagesSection } from './components/PackagesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { FeaturedMatricSection } from './components/FeaturedMatricSection';
import { VideoShowcase } from './components/VideoShowcase';
import { WhyChooseSection } from './components/WhyChooseSection';
import { BookingSection } from './components/BookingSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const {
    packages,
    services,
    portfolio,
    contact,
    settings,
    bookings,
    isAdminAuthenticated,
    updatePackages,
    updateServices,
    updatePortfolio,
    updateContact,
    updateSettings,
    addBooking,
    updateBookingStatus,
    deleteBooking,
    loginAdmin,
    logoutAdmin,
    resetToFlyerDefaults,
  } = useStuntsStore();

  const [currentView, setCurrentView] = useState<'site' | 'admin'>('site');
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);

  // Sync hash for routing (/admin or #admin)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('site');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigateToBooking = (packageId?: string) => {
    if (packageId) {
      setSelectedPackageId(packageId);
    }
    if (currentView === 'admin') {
      setCurrentView('site');
      window.location.hash = '';
    }
    setTimeout(() => {
      const el = document.getElementById('booking');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleSelectPackage = (pkg: PackageItem) => {
    setSelectedPackageId(pkg.id);
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceName: string) => {
    // If user clicked Matric Dances, select premium by default, or scroll to booking
    if (serviceName.toLowerCase().includes('matric')) {
      setSelectedPackageId('premium');
    }
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWorkClick = () => {
    const el = document.getElementById('portfolio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAdmin = () => {
    window.location.hash = '#admin';
    setCurrentView('admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnToSite = () => {
    window.location.hash = '';
    setCurrentView('site');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentView === 'admin') {
    return (
      <AdminDashboard
        packages={packages}
        services={services}
        portfolio={portfolio}
        contact={contact}
        settings={settings}
        bookings={bookings}
        isAuthenticated={isAdminAuthenticated}
        onLogin={loginAdmin}
        onLogout={logoutAdmin}
        onUpdatePackages={updatePackages}
        onUpdateServices={updateServices}
        onUpdatePortfolio={updatePortfolio}
        onUpdateContact={updateContact}
        onUpdateSettings={updateSettings}
        onUpdateBookingStatus={updateBookingStatus}
        onDeleteBooking={deleteBooking}
        onResetDefaults={resetToFlyerDefaults}
        onReturnToSite={handleReturnToSite}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white font-sans overflow-x-hidden">
      {/* 3. Sticky Navigation Bar */}
      <Navbar
        contact={contact}
        onNavigateToBooking={() => handleNavigateToBooking()}
        onOpenAdmin={handleOpenAdmin}
        currentView={currentView}
      />

      {/* Main Website Flow */}
      <main>
        {/* 4 & 5. Hero Section with Circular Photography Effect */}
        <Hero
          onBookClick={() => handleNavigateToBooking()}
          onWorkClick={handleWorkClick}
        />

        {/* 6. About STUNTS Section */}
        <AboutSection />

        {/* 7. Services Section */}
        <ServicesSection
          services={services}
          onSelectService={handleSelectService}
        />

        {/* 8, 9 & 10. Matric Dance Packages, Features & Travel Notice */}
        <PackagesSection
          packages={packages}
          contact={contact}
          onSelectPackage={handleSelectPackage}
        />

        {/* 11. Portfolio Section with Masonry & Lightbox */}
        <PortfolioSection portfolio={portfolio} />

        {/* 12. Featured Matric Experience with Ken Burns */}
        <FeaturedMatricSection
          onViewPackages={() => {
            const el = document.getElementById('packages');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 13. Video Showcase */}
        <VideoShowcase
          videoUrl={settings.heroVideoUrl}
          onBookClick={() => handleNavigateToBooking('deluxe')}
        />

        {/* 14. Why Choose STUNTS */}
        <WhyChooseSection />

        {/* 15, 16 & 22. Booking Section & WhatsApp Reservation & QR Code */}
        <BookingSection
          packages={packages}
          contact={contact}
          selectedPackageId={selectedPackageId}
          onAddBooking={addBooking}
        />

        {/* 17 & 18. Contact & Social Media Showcase */}
        <ContactSection contact={contact} />
      </main>

      {/* 19. Footer */}
      <Footer
        contact={contact}
        onNavigateToBooking={() => handleNavigateToBooking()}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* 20. Floating WhatsApp Button */}
      <FloatingWhatsApp contact={contact} />
    </div>
  );
}
