export interface PackageItem {
  id: string;
  number: string;
  name: string;
  price: string;
  priceNumeric: number;
  duration: string;
  editedPhotos: string;
  rawFiles?: string;
  highlightsVideo?: string;
  creativeReel: string;
  badge?: string;
  featured?: boolean;
  description?: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'MATRIC' | 'WEDDINGS' | 'EVENTS' | 'PORTRAITS' | 'VIDEOS';
  image: string;
  location?: string;
  date?: string;
  aspectRatio?: 'tall' | 'wide' | 'square';
  videoUrl?: string;
}

export interface Booking {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  eventLocation: string;
  participants: string;
  packageId: string;
  packageName: string;
  message: string;
  status: 'New' | 'Contacted' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface ContactInfo {
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string; // 27645153586
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  facebook: string;
  facebookUrl: string;
  tiktok: string;
  tiktokUrl: string;
  instagram: string;
  instagramUrl: string;
  email: string;
  qrDestinationUrl: string;
}

export interface SiteSettings {
  brandName: string;
  tagline: string;
  secondaryTagline: string;
  travelNotice: string;
  adminPin: string;
  heroVideoUrl: string;
  showreelUrl: string;
}

// Initial default packages straight from flyer
export const INITIAL_PACKAGES: PackageItem[] = [
  {
    id: 'lite',
    number: 'PACKAGE 01',
    name: 'LITE',
    price: 'R2,000',
    priceNumeric: 2000,
    duration: '1 HOUR',
    editedPhotos: '20 EDITED PHOTOS',
    creativeReel: '30 - 60 SEC CREATIVE REEL',
    description: 'Perfect for quick individual or couple matric portraits before heading out to the venue.'
  },
  {
    id: 'standard',
    number: 'PACKAGE 02',
    name: 'STANDARD',
    price: 'R2,500',
    priceNumeric: 2500,
    duration: '2 HOURS',
    editedPhotos: '40 EDITED PHOTOS',
    creativeReel: '30 - 60 SEC CREATIVE REEL',
    description: 'Comprehensive coverage of preparations, departures, and formal entrance moments.'
  },
  {
    id: 'premium',
    number: 'PACKAGE 03',
    name: 'PREMIUM',
    price: 'R3,500',
    priceNumeric: 3500,
    duration: '4 HOURS',
    editedPhotos: '60 EDITED PHOTOS',
    highlightsVideo: '5 - 10 MIN HIGHLIGHTS VIDEO',
    creativeReel: '30 - 60 SEC CREATIVE REEL',
    featured: true,
    description: 'Our most popular package. In-depth photography plus cinematic highlight film.'
  },
  {
    id: 'deluxe',
    number: 'PACKAGE 04',
    name: 'DELUXE',
    price: 'R6,500',
    priceNumeric: 6500,
    duration: 'UP TO 8 HOURS',
    editedPhotos: '120 EDITED PHOTOS',
    rawFiles: 'UNLIMITED RAW FILES',
    highlightsVideo: '10 - 15 MIN HIGHLIGHTS VIDEO',
    creativeReel: '30 - 60 SEC CREATIVE REEL',
    badge: 'UP TO 6 PARTICIPANTS',
    description: 'VIP full-day red-carpet experience with friends or group. Every unforgettable second captured.'
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'matric',
    number: '01',
    title: 'MATRIC DANCES',
    description: 'Professional matric dance photography and videography designed to capture every important moment.',
    image: '/src/assets/images/hero_matric_couple_1790271673501.jpg',
    tag: 'Pretoria & Gauteng'
  },
  {
    id: 'weddings',
    number: '02',
    title: 'WEDDINGS',
    description: 'Capture the emotions, details and unforgettable moments of your wedding day.',
    image: '/src/assets/images/portfolio_wedding_couple_1790271709672.jpg',
    tag: 'Ceremonies & Receptions'
  },
  {
    id: 'events',
    number: '03',
    title: 'EVENTS',
    description: 'Professional event photography and videography for celebrations and special occasions.',
    image: '/src/assets/images/matric_night_feature_1790271685576.jpg',
    tag: 'Parties & Galas'
  },
  {
    id: 'portraits',
    number: '04',
    title: 'PORTRAITS',
    description: 'Creative portrait sessions with professional lighting and editing.',
    image: '/src/assets/images/hero_matric_couple_1790271673501.jpg',
    tag: 'Studio & Outdoor'
  },
  {
    id: 'videography',
    number: '05',
    title: 'VIDEOGRAPHY',
    description: 'Cinematic event videos, highlight videos and creative reels.',
    image: '/src/assets/images/about_photographer_1790271696194.jpg',
    tag: '4K Cinema & Drone'
  },
  {
    id: 'social',
    number: '06',
    title: 'SOCIAL MEDIA CONTENT',
    description: 'Short-form professional content optimized for Instagram, TikTok and other social platforms.',
    image: '/src/assets/images/matric_night_feature_1790271685576.jpg',
    tag: 'Trending Reels & Shorts'
  }
];

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'port-1',
    title: 'Crimson Elegance Matric Walk',
    category: 'MATRIC',
    image: '/src/assets/images/hero_matric_couple_1790271673501.jpg',
    location: 'Arcadia, Pretoria',
    date: '2026',
    aspectRatio: 'square'
  },
  {
    id: 'port-2',
    title: 'Grand Ballroom Matric Gala Arrival',
    category: 'MATRIC',
    image: '/src/assets/images/matric_night_feature_1790271685576.jpg',
    location: 'Menlyn Maine, Pretoria',
    date: '2026',
    aspectRatio: 'wide'
  },
  {
    id: 'port-3',
    title: 'Golden Sunset Wedding Promise',
    category: 'WEDDINGS',
    image: '/src/assets/images/portfolio_wedding_couple_1790271709672.jpg',
    location: 'Cullinan Country Club',
    date: '2026',
    aspectRatio: 'tall'
  },
  {
    id: 'port-4',
    title: 'Behind the Cinema Lens: Studio Master',
    category: 'VIDEOS',
    image: '/src/assets/images/about_photographer_1790271696194.jpg',
    location: 'STUNTS Studio, Madiba St',
    date: '2026',
    aspectRatio: 'wide',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-friends-walking-together-at-night-42862-large.mp4'
  },
  {
    id: 'port-5',
    title: 'High-Fashion Matric Silhouette',
    category: 'PORTRAITS',
    image: '/src/assets/images/hero_matric_couple_1790271673501.jpg',
    location: 'Union Buildings Garden',
    date: '2026',
    aspectRatio: 'tall'
  },
  {
    id: 'port-6',
    title: 'Celebration Confetti Night Gala',
    category: 'EVENTS',
    image: '/src/assets/images/matric_night_feature_1790271685576.jpg',
    location: 'Brooklyn, Pretoria',
    date: '2026',
    aspectRatio: 'square'
  }
];

export const INITIAL_CONTACT: ContactInfo = {
  phone: '064 515 3586',
  phoneDisplay: '064 515 3586',
  whatsappNumber: '27645153586',
  addressLine1: '498 Madiba St',
  addressLine2: 'Arcadia',
  city: 'Pretoria',
  country: 'South Africa',
  facebook: 'Stunts Photography Pretoria',
  facebookUrl: 'https://www.facebook.com/StuntsPhotographyPretoria',
  tiktok: '@stunts_photography',
  tiktokUrl: 'https://www.tiktok.com/@stunts_photography',
  instagram: '@stunts_photography',
  instagramUrl: 'https://www.instagram.com/stunts_photography',
  email: 'info@stuntsphotography.co.za',
  qrDestinationUrl: 'https://wa.me/27645153586?text=Hi%20STUNTS%20Photography%2C%20I%20scanned%20your%20flyer%20QR%20code%20and%20would%20like%20to%20enquire%20about%20a%20Matric%20Dance%20Package.'
};

export const INITIAL_SETTINGS: SiteSettings = {
  brandName: 'STUNTS',
  tagline: 'CAPTURE THE MOMENT. RELIVE THE MEMORY.',
  secondaryTagline: 'Matric Dance Packages',
  travelNotice: 'PRICES ARE BASED ON DISTANCES UP TO 15KM OF PRETORIA CBD. TRAVEL OUTSIDE THIS AREA IS CHARGED SEPARATELY.',
  adminPin: 'stunts2026',
  heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-friends-walking-together-at-night-42862-large.mp4',
  showreelUrl: 'https://assets.mixkit.co/videos/preview/mixkit-friends-walking-together-at-night-42862-large.mp4'
};

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b-101',
    fullName: 'Lesedi Mokoena',
    phone: '082 345 6789',
    email: 'lesedi.mokoena@gmail.com',
    eventType: 'Matric Dance',
    eventDate: '2026-10-14',
    eventLocation: 'Pretoria Boys High Venue, Pretoria',
    participants: '2',
    packageId: 'premium',
    packageName: 'Premium (R3,500)',
    message: 'We would love photos at the Union Buildings before the dance and highlights video.',
    status: 'Confirmed',
    createdAt: '2026-09-22T08:30:00.000Z'
  },
  {
    id: 'b-102',
    fullName: 'Kagiso Sithole',
    phone: '071 987 6543',
    email: 'kagiso.s@outlook.com',
    eventType: 'Matric Dance',
    eventDate: '2026-10-21',
    eventLocation: 'Waterkloof Golf Estate',
    participants: '6',
    packageId: 'deluxe',
    packageName: 'Deluxe (R6,500)',
    message: 'Friend group of 6 graduates booking the full day 8-hour deluxe experience.',
    status: 'New',
    createdAt: '2026-09-24T06:15:00.000Z'
  },
  {
    id: 'b-103',
    fullName: 'Nandi Van Der Merwe',
    phone: '083 456 7890',
    email: 'nandi.vdm@icloud.com',
    eventType: 'Wedding',
    eventDate: '2026-11-07',
    eventLocation: 'Pretoria National Botanical Gardens',
    participants: '2',
    packageId: 'deluxe',
    packageName: 'Deluxe (R6,500)',
    message: 'Wedding ceremony and evening celebration photography + cinematic reel.',
    status: 'Contacted',
    createdAt: '2026-09-23T14:20:00.000Z'
  }
];

export const PACKAGE_FEATURES_LIST = [
  { title: 'ONLINE GALLERY', subtitle: 'Private password-protected digital vault', icon: 'gallery' },
  { title: 'DIGITAL DOWNLOAD', subtitle: 'Instant high-resolution file transfer', icon: 'download' },
  { title: '72-HOUR SNEAK PEEK', subtitle: '5 priority edited photos delivered fast', icon: 'sparkle' },
  { title: 'DELIVERY WITHIN UP TO 7 DAYS', subtitle: 'Rapid professional turnaround', icon: 'clock' },
  { title: 'PROFESSIONALLY COLOR GRADED', subtitle: 'Cinema-grade tones & skin retouching', icon: 'palette' },
  { title: 'SOCIAL MEDIA READY', subtitle: '9:16 vertical reels & 4:5 crops', icon: 'share' }
];

export const WHY_CHOOSE_ITEMS = [
  {
    number: '01',
    title: 'PROFESSIONAL EDITING',
    desc: 'Every image and clip undergoes master color correction, fine skin retouching, and cinematic grading.'
  },
  {
    number: '02',
    title: 'FAST DELIVERY',
    desc: 'Receive your 72-hour 5-photo sneak peek for social media, with full album completion within 7 days.'
  },
  {
    number: '03',
    title: 'CINEMATIC VIDEO',
    desc: 'Filmed with high-end cinema lenses and dynamic motion, creating movie-style reels and highlight films.'
  },
  {
    number: '04',
    title: 'HIGH-QUALITY PHOTOGRAPHY',
    desc: 'Crisp, high-resolution imagery capturing raw emotion, sharp outfits, and unforgettable atmosphere.'
  },
  {
    number: '05',
    title: 'SOCIAL MEDIA READY',
    desc: 'Turn heads on TikTok and Instagram with trend-paced, professionally graded 30–60s creative reels.'
  },
  {
    number: '06',
    title: 'PERSONALIZED EXPERIENCE',
    desc: 'Directed posing support and attentive service that puts you at total ease so you shine with confidence.'
  }
];
