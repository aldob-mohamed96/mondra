export type ScreenType =
  | 'home'
  | 'news'
  | 'properties'
  | 'finishing'
  | 'more'
  | 'eligibility'
  | 'interests'
  | 'expats'
  | 'favorites'
  | 'add-listing'
  | 'notifications'
  | 'comparison';

export type PropertyType = 'apartment' | 'villa' | 'land' | 'commercial' | 'building';
export type TransactionType = 'sell' | 'rent';
export type VerificationLevel = 'field_verified' | 'owner_verified' | 'standard';
export type FinishingQuality = 'half_lux' | 'lux' | 'super_lux' | 'ultra_lux';

export interface Property {
  id: string;
  title: string;
  location: string;
  city: string;
  district: string;
  price: number;
  area: number; // in m²
  rooms: number;
  bathrooms: number;
  floor?: string;
  propertyType: PropertyType;
  transactionType: TransactionType;
  verificationLevel: VerificationLevel;
  verificationBadgeText: string;
  finishing: string;
  ownershipStatus: string;
  images: string[];
  description: string;
  featured?: boolean;
  postedDate: string;
  installmentAvailable?: boolean;
  installmentDetails?: string;
  contactPhone?: string;
  viewsCount?: number;
}

export interface BuildingMaterialPrice {
  id: string;
  name: string;
  unit: string;
  price: number;
  change: 'up' | 'down' | 'stable';
  changeAmount?: string;
  icon: string;
  category: 'core' | 'finishing' | 'masonry';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  type: 'match' | 'price' | 'news' | 'verification' | 'system';
  icon: string;
  iconBg: string;
  iconColor: string;
  read: boolean;
  targetScreen?: ScreenType;
  propertyId?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface FinishingCostResult {
  totalEstimatedMin: number;
  totalEstimatedMax: number;
  pricePerMeter: number;
  breakdown: {
    plumbingAndElectrical: number;
    masonryAndPlaster: number;
    tilesAndFlooring: number;
    carpentryAndAlumital: number;
    paintAndDecor: number;
  };
  durationWeeks: string;
}

export interface EligibilityFormData {
  age: string;
  maritalStatus: 'single' | 'married' | 'widowed_divorced' | '';
  incomeTier: string;
  previousSupport: 'yes' | 'no' | '';
  governorate: string;
}

export interface EligibilityResult {
  isEligible: boolean;
  score: number; // 0 to 100
  title: string;
  summary: string;
  reasons: string[];
  recommendations: string[];
}
