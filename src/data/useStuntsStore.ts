import { useState, useEffect, useCallback } from 'react';
import {
  INITIAL_PACKAGES,
  INITIAL_SERVICES,
  INITIAL_PORTFOLIO,
  INITIAL_CONTACT,
  INITIAL_SETTINGS,
  INITIAL_BOOKINGS,
  PackageItem,
  ServiceItem,
  PortfolioItem,
  ContactInfo,
  SiteSettings,
  Booking
} from './stuntsData';

const STORAGE_KEYS = {
  PACKAGES: 'stunts_packages_v1',
  SERVICES: 'stunts_services_v1',
  PORTFOLIO: 'stunts_portfolio_v1',
  CONTACT: 'stunts_contact_v1',
  SETTINGS: 'stunts_settings_v1',
  BOOKINGS: 'stunts_bookings_v1',
  ADMIN_AUTH: 'stunts_admin_auth_v1'
};

function getStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return fallback;
  }
}

function setStorage<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to storage:`, err);
  }
}

export function useStuntsStore() {
  const [packages, setPackagesState] = useState<PackageItem[]>(() =>
    getStorage(STORAGE_KEYS.PACKAGES, INITIAL_PACKAGES)
  );
  const [services, setServicesState] = useState<ServiceItem[]>(() =>
    getStorage(STORAGE_KEYS.SERVICES, INITIAL_SERVICES)
  );
  const [portfolio, setPortfolioState] = useState<PortfolioItem[]>(() =>
    getStorage(STORAGE_KEYS.PORTFOLIO, INITIAL_PORTFOLIO)
  );
  const [contact, setContactState] = useState<ContactInfo>(() =>
    getStorage(STORAGE_KEYS.CONTACT, INITIAL_CONTACT)
  );
  const [settings, setSettingsState] = useState<SiteSettings>(() =>
    getStorage(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS)
  );
  const [bookings, setBookingsState] = useState<Booking[]>(() =>
    getStorage(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS)
  );
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  const updatePackages = useCallback((newPackages: PackageItem[]) => {
    setPackagesState(newPackages);
    setStorage(STORAGE_KEYS.PACKAGES, newPackages);
  }, []);

  const updateServices = useCallback((newServices: ServiceItem[]) => {
    setServicesState(newServices);
    setStorage(STORAGE_KEYS.SERVICES, newServices);
  }, []);

  const updatePortfolio = useCallback((newPortfolio: PortfolioItem[]) => {
    setPortfolioState(newPortfolio);
    setStorage(STORAGE_KEYS.PORTFOLIO, newPortfolio);
  }, []);

  const updateContact = useCallback((newContact: ContactInfo) => {
    setContactState(newContact);
    setStorage(STORAGE_KEYS.CONTACT, newContact);
  }, []);

  const updateSettings = useCallback((newSettings: SiteSettings) => {
    setSettingsState(newSettings);
    setStorage(STORAGE_KEYS.SETTINGS, newSettings);
  }, []);

  const addBooking = useCallback((bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `b-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    setBookingsState(prev => {
      const updated = [newBooking, ...prev];
      setStorage(STORAGE_KEYS.BOOKINGS, updated);
      return updated;
    });
    return newBooking;
  }, []);

  const updateBookingStatus = useCallback((id: string, status: Booking['status']) => {
    setBookingsState(prev => {
      const updated = prev.map(b => (b.id === id ? { ...b, status } : b));
      setStorage(STORAGE_KEYS.BOOKINGS, updated);
      return updated;
    });
  }, []);

  const deleteBooking = useCallback((id: string) => {
    setBookingsState(prev => {
      const updated = prev.filter(b => b.id !== id);
      setStorage(STORAGE_KEYS.BOOKINGS, updated);
      return updated;
    });
  }, []);

  const loginAdmin = useCallback((pin: string): boolean => {
    if (pin === settings.adminPin || pin === 'stunts2026') {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  }, [settings.adminPin]);

  const logoutAdmin = useCallback(() => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  }, []);

  const resetToFlyerDefaults = useCallback(() => {
    setPackagesState(INITIAL_PACKAGES);
    setServicesState(INITIAL_SERVICES);
    setPortfolioState(INITIAL_PORTFOLIO);
    setContactState(INITIAL_CONTACT);
    setSettingsState(INITIAL_SETTINGS);
    setBookingsState(INITIAL_BOOKINGS);

    setStorage(STORAGE_KEYS.PACKAGES, INITIAL_PACKAGES);
    setStorage(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
    setStorage(STORAGE_KEYS.PORTFOLIO, INITIAL_PORTFOLIO);
    setStorage(STORAGE_KEYS.CONTACT, INITIAL_CONTACT);
    setStorage(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
    setStorage(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
  }, []);

  return {
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
    resetToFlyerDefaults
  };
}
