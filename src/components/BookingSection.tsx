import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Send,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Phone,
  QrCode,
  Sparkles,
  MapPin
} from 'lucide-react';
import { PackageItem, ContactInfo, Booking } from '../data/stuntsData';

interface BookingSectionProps {
  packages: PackageItem[];
  contact: ContactInfo;
  selectedPackageId: string | null;
  onAddBooking: (data: Omit<Booking, 'id' | 'createdAt' | 'status'>) => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  packages,
  contact,
  selectedPackageId,
  onAddBooking,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState('Matric Dance');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [participants, setParticipants] = useState('2');
  const [packageId, setPackageId] = useState(selectedPackageId || 'premium');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  useEffect(() => {
    if (selectedPackageId) {
      setPackageId(selectedPackageId);
    }
  }, [selectedPackageId]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!phone.trim()) errs.phone = 'Phone / WhatsApp number is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email address is required';
    if (!eventDate) errs.eventDate = 'Event date is required';
    if (!eventLocation.trim()) errs.eventLocation = 'Event venue or location is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const matchedPkg = packages.find((p) => p.id === packageId);
    const packageName = matchedPkg
      ? `${matchedPkg.name} (${matchedPkg.price})`
      : 'Custom Package';

    onAddBooking({
      fullName,
      phone,
      email,
      eventType,
      eventDate,
      eventLocation,
      participants,
      packageId,
      packageName,
      message,
    });

    setIsSubmitted(true);
  };

  const getActiveWhatsAppUrl = () => {
    const matchedPkg = packages.find((p) => p.id === packageId);
    let msg = '';
    if (matchedPkg) {
      msg = `Hi STUNTS, I would like to enquire about the ${matchedPkg.name} Matric Dance Package for ${matchedPkg.price}.`;
    } else {
      msg = `Hi STUNTS Photography & Videography, I would like to enquire about booking a photography/videography package. Please send me more information.`;
    }
    return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  // QR Code destination can be configured in contact or defaults to WhatsApp
  const qrTarget = contact.qrDestinationUrl || getActiveWhatsAppUrl();
  const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    qrTarget
  )}&color=000000&bgcolor=ffffff`;

  return (
    <section id="booking" className="py-24 bg-black relative border-t border-white/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-red-950/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading, Direct WhatsApp Action & QR Code flyer reference */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-6 h-[2px] bg-red-600" />
                <span className="text-xs font-bold tracking-[0.25em] text-red-500 uppercase">
                  RESERVATION &amp; ENQUIRY
                </span>
              </div>

              <h2 className="font-display text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.92]">
                LET'S CAPTURE <br />
                <span className="text-red-600">YOUR MOMENT.</span>
              </h2>

              <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
                Ready to make your event unforgettable? Secure your date early —
                matric dance season and weekend dates fill rapidly across Pretoria.
              </p>
            </div>

            {/* Instant WhatsApp Booking Card (Section 16) */}
            <div className="p-6 bg-gradient-to-br from-zinc-950 to-black border border-red-600/40 rounded-sm shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-red-500 block">
                    FASTEST RESPONSE
                  </span>
                  <h4 className="font-display text-xl text-white uppercase">
                    BOOK VIA WHATSAPP
                  </h4>
                </div>
              </div>

              <p className="text-xs text-zinc-400 font-light">
                Direct hotline with the STUNTS studio team. Instant responses, package
                availability checks, and custom quotation requests.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={getActiveWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest text-center rounded-sm transition-all duration-200 shadow-md shadow-red-950/60 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>BOOK VIA WHATSAPP</span>
                </a>

                <button
                  type="button"
                  onClick={() => setShowQRModal(true)}
                  className="py-3 px-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-white/10 font-bold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <QrCode className="w-4 h-4 text-red-500" />
                  <span>SCAN QR</span>
                </button>
              </div>

              <div className="text-[11px] text-zinc-500 pt-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                <span>Phone / WhatsApp: <strong>064 515 3586</strong></span>
              </div>
            </div>

            {/* Travel Radius Reminder */}
            <div className="p-4 bg-zinc-950 border border-white/10 rounded-sm flex items-start gap-3">
              <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <p className="text-xs text-zinc-400">
                <strong className="text-white">Studio Location:</strong> 498 Madiba St,
                Arcadia, Pretoria. Standard rates include locations up to 15km of
                Pretoria CBD.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7 bg-zinc-950 border border-white/10 p-6 sm:p-10 rounded-sm shadow-2xl relative">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-6 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-600 flex items-center justify-center mx-auto text-red-500 shadow-xl">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-display text-3xl sm:text-4xl text-white uppercase">
                    THANK YOU!
                  </h3>
                  <p className="text-zinc-300 text-sm max-w-md mx-auto leading-relaxed">
                    Your booking request has been received. STUNTS will contact you
                    shortly to confirm availability and details.
                  </p>
                </div>

                <div className="p-4 bg-black border border-white/10 rounded-sm max-w-md mx-auto text-left text-xs space-y-1 text-zinc-400">
                  <p><strong className="text-white">Client:</strong> {fullName}</p>
                  <p><strong className="text-white">Event:</strong> {eventType} on {eventDate}</p>
                  <p><strong className="text-white">Package:</strong> {packages.find(p => p.id === packageId)?.name || 'Custom'}</p>
                  <p><strong className="text-white">Location:</strong> {eventLocation}</p>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                  <a
                    href={getActiveWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest rounded-sm flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" /> Speed Up on WhatsApp
                  </a>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFullName('');
                      setPhone('');
                      setEmail('');
                      setEventLocation('');
                      setMessage('');
                    }}
                    className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs uppercase tracking-wider rounded-sm font-semibold"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-white/10 pb-4 mb-6">
                  <h3 className="font-display text-2xl sm:text-3xl text-white uppercase">
                    BOOKING REQUEST FORM
                  </h3>
                  <p className="text-zinc-400 text-xs mt-1">
                    Fill out the form below to receive a formal booking confirmation.
                  </p>
                </div>

                {/* 2-Column Fields: Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Lesedi Mokoena"
                      className={`w-full px-4 py-3 bg-black border rounded-sm text-white text-sm focus:outline-none transition-colors ${
                        errors.fullName
                          ? 'border-red-600 focus:border-red-500'
                          : 'border-white/15 focus:border-red-600'
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-red-500 text-[11px] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.fullName}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                      Phone Number / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 064 515 3586"
                      className={`w-full px-4 py-3 bg-black border rounded-sm text-white text-sm focus:outline-none transition-colors ${
                        errors.phone
                          ? 'border-red-600 focus:border-red-500'
                          : 'border-white/15 focus:border-red-600'
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-red-500 text-[11px] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. name@example.com"
                    className={`w-full px-4 py-3 bg-black border rounded-sm text-white text-sm focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-red-600 focus:border-red-500'
                        : 'border-white/15 focus:border-red-600'
                    }`}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </span>
                  )}
                </div>

                {/* 2-Column: Event Type & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                      Event Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full px-4 py-3 bg-black border border-white/15 rounded-sm text-white text-sm focus:outline-none focus:border-red-600"
                    >
                      <option value="Matric Dance">Matric Dance</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Birthday">Birthday</option>
                      <option value="Corporate Event">Corporate Event</option>
                      <option value="Portrait Session">Portrait Session</option>
                      <option value="Other">Other Celebration</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                      Event Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className={`w-full px-4 py-3 bg-black border rounded-sm text-white text-sm focus:outline-none transition-colors ${
                        errors.eventDate
                          ? 'border-red-600 focus:border-red-500'
                          : 'border-white/15 focus:border-red-600'
                      }`}
                    />
                    {errors.eventDate && (
                      <span className="text-red-500 text-[11px] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.eventDate}
                      </span>
                    )}
                  </div>
                </div>

                {/* 2-Column: Location & Participants */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                      Event Location / Venue <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      placeholder="e.g. Menlyn, Pretoria"
                      className={`w-full px-4 py-3 bg-black border rounded-sm text-white text-sm focus:outline-none transition-colors ${
                        errors.eventLocation
                          ? 'border-red-600 focus:border-red-500'
                          : 'border-white/15 focus:border-red-600'
                      }`}
                    />
                    {errors.eventLocation && (
                      <span className="text-red-500 text-[11px] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.eventLocation}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                      Number of Participants
                    </label>
                    <select
                      value={participants}
                      onChange={(e) => setParticipants(e.target.value)}
                      className="w-full px-4 py-3 bg-black border border-white/15 rounded-sm text-white text-sm focus:outline-none focus:border-red-600"
                    >
                      <option value="1">1 Person (Solo Portrait)</option>
                      <option value="2">2 People (Couple)</option>
                      <option value="4">3–4 People (Small Group)</option>
                      <option value="6">Up to 6 Participants (Deluxe)</option>
                      <option value="10+">10+ People (Full Class / Party)</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Package Dropdown */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Preferred Package
                  </label>
                  <select
                    value={packageId}
                    onChange={(e) => setPackageId(e.target.value)}
                    className="w-full px-4 py-3 bg-black border border-white/15 rounded-sm text-white text-sm focus:outline-none focus:border-red-600"
                  >
                    {packages.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} — {pkg.price} ({pkg.duration}, {pkg.editedPhotos})
                      </option>
                    ))}
                    <option value="custom">Custom Photography / Videography Package</option>
                  </select>
                </div>

                {/* Additional Message */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Additional Message / Special Requests
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your theme, gown colors, pre-dance photo spot (e.g. Union Buildings), or any special requests..."
                    className="w-full px-4 py-3 bg-black border border-white/15 rounded-sm text-white text-sm focus:outline-none focus:border-red-600"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-widest text-xs sm:text-sm rounded-sm transition-all duration-200 shadow-xl shadow-red-950/70 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  REQUEST A BOOKING
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* QR Code Modal (Section 22: SCAN TO BOOK NOW) */}
      {showQRModal && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowQRModal(false)}
        >
          <div
            className="relative bg-zinc-950 border border-white/20 p-8 rounded-sm max-w-sm w-full text-center space-y-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-1">
              <span className="text-xs font-bold tracking-[0.2em] text-red-500 uppercase">
                FROM THE FLYER
              </span>
              <h3 className="font-display text-3xl text-white uppercase">
                SCAN TO BOOK NOW
              </h3>
              <p className="text-zinc-400 text-xs">
                Scan with your phone camera to connect with STUNTS instantly on
                WhatsApp.
              </p>
            </div>

            <div className="p-4 bg-white rounded-sm inline-block shadow-inner mx-auto">
              <img
                src={qrCodeApiUrl}
                alt="STUNTS WhatsApp Booking QR Code"
                className="w-52 h-52 mx-auto"
              />
            </div>

            <div className="space-y-2">
              <p className="text-xs text-zinc-300 font-semibold">
                Destination: WhatsApp (+27 64 515 3586)
              </p>
              <a
                href={qrTarget}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors"
              >
                Open Link Directly
              </a>
              <button
                onClick={() => setShowQRModal(false)}
                className="text-xs text-zinc-500 hover:text-white pt-2 block mx-auto"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
