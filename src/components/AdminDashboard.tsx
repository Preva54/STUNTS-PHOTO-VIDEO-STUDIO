import React, { useState } from 'react';
import {
  Shield,
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Check,
  Save,
  RotateCcw,
  Calendar,
  Layers,
  Image as ImageIcon,
  DollarSign,
  Phone,
  Settings as SettingsIcon,
  Search,
  ExternalLink,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import {
  PackageItem,
  ServiceItem,
  PortfolioItem,
  ContactInfo,
  SiteSettings,
  Booking
} from '../data/stuntsData';

interface AdminDashboardProps {
  packages: PackageItem[];
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  contact: ContactInfo;
  settings: SiteSettings;
  bookings: Booking[];
  isAuthenticated: boolean;
  onLogin: (pin: string) => boolean;
  onLogout: () => void;
  onUpdatePackages: (pkgs: PackageItem[]) => void;
  onUpdateServices: (services: ServiceItem[]) => void;
  onUpdatePortfolio: (portfolio: PortfolioItem[]) => void;
  onUpdateContact: (contact: ContactInfo) => void;
  onUpdateSettings: (settings: SiteSettings) => void;
  onUpdateBookingStatus: (id: string, status: Booking['status']) => void;
  onDeleteBooking: (id: string) => void;
  onResetDefaults: () => void;
  onReturnToSite: () => void;
}

type AdminTab = 'bookings' | 'packages' | 'portfolio' | 'services' | 'contact' | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  packages,
  services,
  portfolio,
  contact,
  settings,
  bookings,
  isAuthenticated,
  onLogin,
  onLogout,
  onUpdatePackages,
  onUpdateServices,
  onUpdatePortfolio,
  onUpdateContact,
  onUpdateSettings,
  onUpdateBookingStatus,
  onDeleteBooking,
  onResetDefaults,
  onReturnToSite,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('bookings');

  // Bookings filter
  const [bookingFilter, setBookingFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Editing state for Packages
  const [editingPackages, setEditingPackages] = useState<PackageItem[]>(packages);
  const [packageSaveSuccess, setPackageSaveSuccess] = useState(false);

  // New Portfolio Item state
  const [newPortTitle, setNewPortTitle] = useState('');
  const [newPortCategory, setNewPortCategory] = useState<PortfolioItem['category']>('MATRIC');
  const [newPortImage, setNewPortImage] = useState('');
  const [newPortLocation, setNewPortLocation] = useState('Pretoria');
  const [showAddPortModal, setShowAddPortModal] = useState(false);

  // Contact info form state
  const [contactForm, setContactForm] = useState<ContactInfo>(contact);
  const [contactSaveSuccess, setContactSaveSuccess] = useState(false);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(settings);
  const [settingsSaveSuccess, setSettingsSaveSuccess] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(pinInput);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
      setPinInput('');
    }
  };

  // If not authenticated, show PIN entry screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#ff000010_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative max-w-md w-full bg-zinc-950 border border-white/10 p-8 rounded-sm shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-red-600/20 border border-red-600 flex items-center justify-center mx-auto text-red-500">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="font-display text-3xl text-white uppercase">
              STUNTS STUDIO PORTAL
            </h2>
            <p className="text-xs text-zinc-400">
              Enter your studio access PIN to manage packages, bookings, and portfolio.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                Studio PIN
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setLoginError(false);
                }}
                placeholder="Enter PIN (Default: stunts2026)"
                className="w-full px-4 py-3 bg-black border border-white/15 focus:border-red-600 text-white rounded-sm text-sm focus:outline-none"
                autoFocus
              />
              {loginError && (
                <p className="text-red-500 text-xs mt-1.5">
                  Invalid PIN. Try default: <span className="font-mono">stunts2026</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded-sm transition-colors cursor-pointer"
            >
              Access Studio Admin
            </button>
          </form>

          <div className="pt-4 border-t border-white/10 text-center">
            <button
              onClick={onReturnToSite}
              className="text-xs text-zinc-400 hover:text-white flex items-center justify-center gap-1 mx-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filter bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesFilter = bookingFilter === 'ALL' || b.status === bookingFilter;
    const matchesSearch =
      b.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery) ||
      b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.eventType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSavePackages = () => {
    onUpdatePackages(editingPackages);
    setPackageSaveSuccess(true);
    setTimeout(() => setPackageSaveSuccess(false), 3000);
  };

  const handleAddPortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortTitle || !newPortImage) return;

    const newItem: PortfolioItem = {
      id: `port-${Date.now()}`,
      title: newPortTitle,
      category: newPortCategory,
      image: newPortImage,
      location: newPortLocation,
      date: '2026',
      aspectRatio: 'tall',
    };

    onUpdatePortfolio([newItem, ...portfolio]);
    setNewPortTitle('');
    setNewPortImage('');
    setShowAddPortModal(false);
  };

  const handleDeletePortfolio = (id: string) => {
    if (window.confirm('Are you sure you want to delete this portfolio photo?')) {
      onUpdatePortfolio(portfolio.filter((p) => p.id !== id));
    }
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateContact(contactForm);
    setContactSaveSuccess(true);
    setTimeout(() => setContactSaveSuccess(false), 3000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(settingsForm);
    setSettingsSaveSuccess(true);
    setTimeout(() => setSettingsSaveSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Top Admin Header */}
      <header className="border-b border-white/10 bg-zinc-950 px-6 py-4 sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onReturnToSite}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded transition-colors"
            title="Return to live site"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl tracking-wider text-white">
                STUNTS
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest bg-red-600 px-2 py-0.5 rounded text-white">
                STUDIO CONTROL
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              498 Madiba St, Arcadia, Pretoria
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onReturnToSite}
            className="px-3.5 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-sm border border-white/10 transition-colors"
          >
            View Live Site
          </button>

          <button
            onClick={onLogout}
            className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-900 rounded transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Admin Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-white/10 mb-8 text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2.5 rounded-sm flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'bookings'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-zinc-950 text-zinc-400 hover:text-white border border-white/10'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Bookings ({bookings.length})
          </button>

          <button
            onClick={() => setActiveTab('packages')}
            className={`px-4 py-2.5 rounded-sm flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'packages'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-zinc-950 text-zinc-400 hover:text-white border border-white/10'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            Flyer Packages ({packages.length})
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-4 py-2.5 rounded-sm flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'portfolio'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-zinc-950 text-zinc-400 hover:text-white border border-white/10'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Portfolio Gallery ({portfolio.length})
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2.5 rounded-sm flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'contact'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-zinc-950 text-zinc-400 hover:text-white border border-white/10'
            }`}
          >
            <Phone className="w-4 h-4" />
            Contact &amp; Social
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-sm flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeTab === 'settings'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-zinc-950 text-zinc-400 hover:text-white border border-white/10'
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
            Settings
          </button>
        </div>

        {/* TAB 1: BOOKINGS MANAGEMENT */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-3xl text-white uppercase">
                  BOOKING REQUESTS
                </h3>
                <p className="text-xs text-zinc-400">
                  Manage incoming matric dance, wedding, and event reservations.
                </p>
              </div>

              {/* Status filter bar */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {['ALL', 'New', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setBookingFilter(st)}
                    className={`px-3 py-1 text-xs rounded-sm transition-colors ${
                      bookingFilter === st
                        ? 'bg-zinc-200 text-black font-bold'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Search filter */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by client name, phone, email, or event..."
                className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-white/10 rounded-sm text-sm text-white focus:outline-none focus:border-red-600"
              />
            </div>

            {/* Bookings Table */}
            <div className="bg-zinc-950 border border-white/10 rounded-sm overflow-x-auto shadow-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-black/80 text-zinc-400 border-b border-white/10 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Event &amp; Date</th>
                    <th className="p-4">Location</th>
                    <th className="p-4">Package</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredBookings.map((b) => (
                    <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4">
                        <strong className="text-white text-sm block">{b.fullName}</strong>
                        <span className="text-zinc-500 text-[11px]">
                          {new Date(b.createdAt).toLocaleDateString('en-ZA')}
                        </span>
                        {b.message && (
                          <p className="text-zinc-400 text-[11px] mt-1 max-w-xs italic line-clamp-2">
                            "{b.message}"
                          </p>
                        )}
                      </td>

                      <td className="p-4 space-y-1 text-zinc-300">
                        <div>
                          <a
                            href={`https://wa.me/${b.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-400 hover:underline font-semibold"
                          >
                            {b.phone}
                          </a>
                        </div>
                        <div className="text-zinc-500">{b.email}</div>
                      </td>

                      <td className="p-4">
                        <span className="text-white font-medium block">{b.eventType}</span>
                        <span className="text-zinc-400 text-[11px]">
                          Date: {b.eventDate} ({b.participants} pax)
                        </span>
                      </td>

                      <td className="p-4 text-zinc-300 max-w-xs truncate">
                        {b.eventLocation}
                      </td>

                      <td className="p-4">
                        <span className="text-red-400 font-bold uppercase block">
                          {b.packageName}
                        </span>
                      </td>

                      <td className="p-4">
                        <select
                          value={b.status}
                          onChange={(e) =>
                            onUpdateBookingStatus(b.id, e.target.value as Booking['status'])
                          }
                          className={`px-2.5 py-1 text-xs rounded border bg-black font-semibold uppercase tracking-wider ${
                            b.status === 'New'
                              ? 'text-red-400 border-red-500'
                              : b.status === 'Confirmed'
                              ? 'text-emerald-400 border-emerald-500'
                              : b.status === 'Completed'
                              ? 'text-blue-400 border-blue-500'
                              : b.status === 'Cancelled'
                              ? 'text-zinc-500 border-zinc-700'
                              : 'text-amber-400 border-amber-500'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this booking record?')) {
                              onDeleteBooking(b.id);
                            }
                          }}
                          className="p-1.5 text-zinc-500 hover:text-red-500 transition-colors"
                          title="Delete Booking"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredBookings.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-zinc-500">
                        No bookings matching filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: FLYER PACKAGES MANAGEMENT */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-3xl text-white uppercase">
                  EDIT FLYER PACKAGES
                </h3>
                <p className="text-xs text-zinc-400">
                  Update package pricing, durations, photo counts, and reel specifications.
                </p>
              </div>

              <button
                onClick={handleSavePackages}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Package Changes
              </button>
            </div>

            {packageSaveSuccess && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500 text-emerald-400 text-xs rounded-sm flex items-center gap-2">
                <Check className="w-4 h-4" /> Packages updated successfully! Live website will reflect changes.
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {editingPackages.map((pkg, idx) => (
                <div
                  key={pkg.id}
                  className="p-6 bg-zinc-950 border border-white/10 rounded-sm space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-bold tracking-wider text-red-500 uppercase">
                      {pkg.number}
                    </span>
                    <input
                      type="text"
                      value={pkg.name}
                      onChange={(e) => {
                        const copy = [...editingPackages];
                        copy[idx].name = e.target.value;
                        setEditingPackages(copy);
                      }}
                      className="font-display text-2xl bg-black px-2 py-1 border border-white/10 text-white rounded uppercase"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-zinc-400 mb-1">Price Display</label>
                      <input
                        type="text"
                        value={pkg.price}
                        onChange={(e) => {
                          const copy = [...editingPackages];
                          copy[idx].price = e.target.value;
                          setEditingPackages(copy);
                        }}
                        className="w-full px-3 py-2 bg-black border border-white/10 text-white rounded font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 mb-1">Duration</label>
                      <input
                        type="text"
                        value={pkg.duration}
                        onChange={(e) => {
                          const copy = [...editingPackages];
                          copy[idx].duration = e.target.value;
                          setEditingPackages(copy);
                        }}
                        className="w-full px-3 py-2 bg-black border border-white/10 text-white rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 mb-1">Edited Photos</label>
                      <input
                        type="text"
                        value={pkg.editedPhotos}
                        onChange={(e) => {
                          const copy = [...editingPackages];
                          copy[idx].editedPhotos = e.target.value;
                          setEditingPackages(copy);
                        }}
                        className="w-full px-3 py-2 bg-black border border-white/10 text-white rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-400 mb-1">Creative Reel</label>
                      <input
                        type="text"
                        value={pkg.creativeReel}
                        onChange={(e) => {
                          const copy = [...editingPackages];
                          copy[idx].creativeReel = e.target.value;
                          setEditingPackages(copy);
                        }}
                        className="w-full px-3 py-2 bg-black border border-white/10 text-white rounded"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-zinc-400 mb-1">Highlights Video (optional)</label>
                      <input
                        type="text"
                        value={pkg.highlightsVideo || ''}
                        placeholder="e.g. 5 - 10 MIN HIGHLIGHTS VIDEO"
                        onChange={(e) => {
                          const copy = [...editingPackages];
                          copy[idx].highlightsVideo = e.target.value;
                          setEditingPackages(copy);
                        }}
                        className="w-full px-3 py-2 bg-black border border-white/10 text-white rounded"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-zinc-400 mb-1">Badge (e.g. UP TO 6 PARTICIPANTS)</label>
                      <input
                        type="text"
                        value={pkg.badge || ''}
                        placeholder="Leave empty or e.g. UP TO 6 PARTICIPANTS"
                        onChange={(e) => {
                          const copy = [...editingPackages];
                          copy[idx].badge = e.target.value;
                          setEditingPackages(copy);
                        }}
                        className="w-full px-3 py-2 bg-black border border-white/10 text-white rounded"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PORTFOLIO GALLERY MANAGEMENT */}
        {activeTab === 'portfolio' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-3xl text-white uppercase">
                  PORTFOLIO SHOWCASE
                </h3>
                <p className="text-xs text-zinc-400">
                  Add, replace, or remove portfolio images seen on the live website.
                </p>
              </div>

              <button
                onClick={() => setShowAddPortModal(true)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add New Photo
              </button>
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {portfolio.map((item) => (
                <div
                  key={item.id}
                  className="bg-zinc-950 border border-white/10 rounded-sm overflow-hidden group relative flex flex-col justify-between"
                >
                  <div className="h-44 relative bg-zinc-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => handleDeletePortfolio(item.id)}
                      className="absolute top-2 right-2 p-1.5 bg-red-600/90 hover:bg-red-600 text-white rounded shadow transition-colors"
                      title="Delete Image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 text-[10px] uppercase font-bold text-red-400 rounded">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-3">
                    <h5 className="font-semibold text-xs text-white truncate">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-zinc-400 truncate">
                      {item.location || 'Pretoria'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Photo Modal */}
            {showAddPortModal && (
              <div
                className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                onClick={() => setShowAddPortModal(false)}
              >
                <div
                  className="bg-zinc-950 border border-white/20 p-6 rounded-sm max-w-md w-full space-y-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h4 className="font-display text-2xl text-white uppercase">
                    ADD PORTFOLIO PHOTO
                  </h4>

                  <form onSubmit={handleAddPortfolio} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-zinc-300 mb-1 uppercase tracking-wider font-semibold">
                        Photo Title
                      </label>
                      <input
                        type="text"
                        value={newPortTitle}
                        onChange={(e) => setNewPortTitle(e.target.value)}
                        placeholder="e.g. Pretoria High Matric Walk"
                        className="w-full px-3 py-2 bg-black border border-white/10 rounded text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 mb-1 uppercase tracking-wider font-semibold">
                        Category
                      </label>
                      <select
                        value={newPortCategory}
                        onChange={(e) =>
                          setNewPortCategory(e.target.value as PortfolioItem['category'])
                        }
                        className="w-full px-3 py-2 bg-black border border-white/10 rounded text-white"
                      >
                        <option value="MATRIC">MATRIC</option>
                        <option value="WEDDINGS">WEDDINGS</option>
                        <option value="EVENTS">EVENTS</option>
                        <option value="PORTRAITS">PORTRAITS</option>
                        <option value="VIDEOS">VIDEOS</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-zinc-300 mb-1 uppercase tracking-wider font-semibold">
                        Image URL or Path
                      </label>
                      <input
                        type="text"
                        value={newPortImage}
                        onChange={(e) => setNewPortImage(e.target.value)}
                        placeholder="e.g. /src/assets/images/... or https://..."
                        className="w-full px-3 py-2 bg-black border border-white/10 rounded text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-300 mb-1 uppercase tracking-wider font-semibold">
                        Location / Notes
                      </label>
                      <input
                        type="text"
                        value={newPortLocation}
                        onChange={(e) => setNewPortLocation(e.target.value)}
                        placeholder="e.g. Arcadia, Pretoria"
                        className="w-full px-3 py-2 bg-black border border-white/10 rounded text-white"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setShowAddPortModal(false)}
                        className="px-4 py-2 bg-zinc-900 text-zinc-400 hover:text-white rounded text-xs"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded text-xs uppercase tracking-wider"
                      >
                        Add Photo
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CONTACT & SOCIAL MEDIA */}
        {activeTab === 'contact' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h3 className="font-display text-3xl text-white uppercase">
                STUDIO CONTACT DETAILS
              </h3>
              <p className="text-xs text-zinc-400">
                Update phone numbers, physical address, and social media handles.
              </p>
            </div>

            {contactSaveSuccess && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500 text-emerald-400 text-xs rounded-sm flex items-center gap-2">
                <Check className="w-4 h-4" /> Contact details updated!
              </div>
            )}

            <form onSubmit={handleSaveContact} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 mb-1 font-semibold uppercase">
                    Phone / WhatsApp Display
                  </label>
                  <input
                    type="text"
                    value={contactForm.phoneDisplay}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, phoneDisplay: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 mb-1 font-semibold uppercase">
                    WhatsApp Int'l Number (e.g. 27645153586)
                  </label>
                  <input
                    type="text"
                    value={contactForm.whatsappNumber}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, whatsappNumber: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 mb-1 font-semibold uppercase">
                  Studio Street Address
                </label>
                <input
                  type="text"
                  value={contactForm.addressLine1}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, addressLine1: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-zinc-300 mb-1 font-semibold uppercase">
                    Suburb / Area
                  </label>
                  <input
                    type="text"
                    value={contactForm.addressLine2}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, addressLine2: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 mb-1 font-semibold uppercase">
                    City
                  </label>
                  <input
                    type="text"
                    value={contactForm.city}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, city: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-300 mb-1 font-semibold uppercase">
                    Country
                  </label>
                  <input
                    type="text"
                    value={contactForm.country}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, country: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 mb-1 font-semibold uppercase">
                  Facebook Page
                </label>
                <input
                  type="text"
                  value={contactForm.facebook}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, facebook: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1 font-semibold uppercase">
                  TikTok Handle
                </label>
                <input
                  type="text"
                  value={contactForm.tiktok}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, tiktok: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1 font-semibold uppercase">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  value={contactForm.instagram}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, instagram: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1 font-semibold uppercase">
                  Configurable QR Code Target URL
                </label>
                <input
                  type="text"
                  value={contactForm.qrDestinationUrl}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, qrDestinationUrl: e.target.value })
                  }
                  placeholder="https://wa.me/27645153586?text=..."
                  className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-white"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
              >
                Save Contact Info
              </button>
            </form>
          </div>
        )}

        {/* TAB 5: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h3 className="font-display text-3xl text-white uppercase">
                STUDIO SETTINGS &amp; POLICIES
              </h3>
              <p className="text-xs text-zinc-400">
                Configure travel notice statements, admin password, or restore defaults.
              </p>
            </div>

            {settingsSaveSuccess && (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500 text-emerald-400 text-xs rounded-sm flex items-center gap-2">
                <Check className="w-4 h-4" /> Settings updated successfully!
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 mb-1 font-semibold uppercase">
                  Travel Notice Banner Statement
                </label>
                <textarea
                  rows={2}
                  value={settingsForm.travelNotice}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, travelNotice: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-zinc-300 mb-1 font-semibold uppercase">
                  Admin Access PIN
                </label>
                <input
                  type="text"
                  value={settingsForm.adminPin}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, adminPin: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-zinc-950 border border-white/10 rounded text-white"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
              >
                Update Settings
              </button>
            </form>

            <div className="pt-8 border-t border-white/10 space-y-3">
              <h4 className="text-sm font-bold uppercase text-red-400 flex items-center gap-1.5">
                <RotateCcw className="w-4 h-4" /> Factory Reset
              </h4>
              <p className="text-xs text-zinc-400">
                Restore all packages, pricing, contact details, and initial portfolio
                back to the exact printed STUNTS Matric Dance flyer specifications.
              </p>
              <button
                type="button"
                onClick={() => {
                  if (
                    window.confirm(
                      'Restore all studio packages, pricing, and settings back to original flyer defaults?'
                    )
                  ) {
                    onResetDefaults();
                    alert('Restored to original STUNTS flyer data.');
                    window.location.reload();
                  }
                }}
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 rounded text-xs font-semibold"
              >
                Reset to Flyer Defaults
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
