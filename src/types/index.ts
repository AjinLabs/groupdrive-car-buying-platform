export type Role = 
  | 'PUBLIC_VISITOR'
  | 'BUYER'
  | 'GROUP_ORGANIZER'
  | 'DEALER_STAFF'
  | 'DEALER_ADMIN'
  | 'PLATFORM_ADMIN';

export type FuelType = 'PETROL' | 'DIESEL' | 'EV' | 'STRONG_HYBRID' | 'CNG';
export type Transmission = 'MANUAL' | 'AUTOMATIC' | 'DCT' | 'AMT' | 'CVT';
export type BodyType = 'SUV' | 'SEDAN' | 'HATCHBACK' | 'MPV';

export interface CarVariant {
  id: string;
  name: string;
  exShowroomPrice: number; // in INR
  fuelType: FuelType;
  transmission: Transmission;
  engineCc?: number;
  batteryKwh?: number;
  claimedMileageOrRange: string; // e.g. "465 km" or "19.5 kmpl"
  keyFeatures: string[];
}

export interface Car {
  id: string;
  make: string;
  model: string;
  bodyType: BodyType;
  seatingCapacity: number;
  image: string;
  startingPrice: number; // in INR
  fuelOptions: FuelType[];
  transmissions: Transmission[];
  acceleration0to100?: string;
  topSpeed?: string;
  bootSpace?: string;
  groundClearance?: string;
  ncapSafetyRating?: number; // 5 stars
  variants: CarVariant[];
  tagline: string;
  popularInDistricts: string[]; // Kerala districts
}

export type GroupStatus = 
  | 'OPEN'
  | 'GATHERING_BUYERS'
  | 'READY_FOR_QUOTES'
  | 'QUOTES_RECEIVED'
  | 'CLOSING_SOON'
  | 'COMPLETED'
  | 'EXPIRED';

export interface GroupMember {
  id: string;
  userId: string;
  userName: string;
  userPhoneMasked: string; // e.g. "+91 98*** **420" (Privacy protected)
  district: string;
  selectedVariantId: string;
  selectedVariantName: string;
  targetBudget: number;
  preferredPurchaseTimeline: string; // e.g. "Within 15 days", "Within 30 days"
  needFinance: boolean;
  needExchange: boolean;
  joinedAt: string;
  isOrganizer?: boolean;
}

export interface BuyerGroup {
  id: string;
  code: string; // e.g. "GD-KL-CRETA-01"
  carId: string;
  carMake: string;
  carModel: string;
  carImage: string;
  targetVariantId?: string;
  targetVariantName?: string;
  district: string; // Kerala district e.g. "Ernakulam (Kochi)"
  state: string; // "Kerala"
  dealershipRadiusKm: number; // e.g. 50 km
  targetMembers: number; // e.g. 15
  currentMembers: number; // e.g. 14
  members: GroupMember[];
  status: GroupStatus;
  createdAt: string;
  closingDate: string;
  estimatedDeliveryWindow: string;
  indicativeMinSavings: number; // Indicative based on historical/target quotes
  indicativeMaxSavings: number;
  quotationCount: number;
  eligibleDealerships: string[];
}

export interface DealerVerification {
  isVerified: boolean;
  verifiedAt?: string;
  gstin: string;
  tradeLicenseNumber: string;
  authorizedBrands: string[];
  verificationBadge: 'PLATINUM' | 'GOLD' | 'VERIFIED' | 'PENDING';
}

export interface Dealership {
  id: string;
  name: string;
  brand: string;
  groupName: string; // e.g. "Popular Vehicles & Services Ltd"
  district: string;
  city: string;
  address: string;
  contactPerson: string;
  phone: string;
  email: string;
  verification: DealerVerification;
  rating: number; // e.g. 4.8
  totalQuotesSubmitted: number;
  successfulGroupDeals: number;
  averageResponseTimeHours: number;
}

export interface QuotationLineItem {
  id: string;
  name: string;
  amount: number;
  category: 'EX_SHOWROOM' | 'ROAD_TAX' | 'INSURANCE' | 'MANDATORY_FEE' | 'ACCESSORIES' | 'DISCOUNT' | 'ADD_ON';
  isOptional: boolean;
  isMandatory: boolean;
  note?: string;
}

export interface DealerQuotation {
  id: string;
  groupId: string;
  groupCode: string;
  dealerId: string;
  dealerName: string;
  dealerDistrict: string;
  dealerBadge: 'PLATINUM' | 'GOLD' | 'VERIFIED';
  variantId: string;
  variantName: string;
  carModel: string;
  version: number;
  
  // Line items
  exShowroom: number;
  keralaRoadTax: number;
  roadSafetyCess: number;
  tcsAmount: number;
  fastag: number;
  registrationHypothecation: number;
  
  // Insurance
  insuranceAmount: number;
  insuranceProvider: string;
  insuranceCoverage: string[]; // Zero Dep, RTI, Engine Protect, Key Replace
  
  // Mandatory vs Optional charges
  logisticsHandlingCharge: number; // Highlighted / flagged if illegal
  logisticsFeeDisclosedReason?: string;
  
  // Accessories & Add-ons
  includedAccessories: string[];
  accessoriesAmount: number;
  extendedWarrantyYears: number;
  extendedWarrantyAmount: number;
  
  // Discounts
  groupNegotiationDiscount: number;
  exchangeBonusOffer?: number;
  corporateOffer?: number;
  
  // Computed Totals
  totalOnRoadPrice: number;
  effectiveNetSavings: number; // vs standard individual showroom quote
  
  // Validity & Delivery
  deliveryDays: number;
  deliveryTimelineText: string;
  quoteValidUntil: string;
  submittedAt: string;
  status: 'ACTIVE' | 'REVISED' | 'EXPIRED' | 'ACCEPTED';
  
  // Trust & Score
  quoteCompletenessScore: number; // 0-100%
  unusualChargeFlag: boolean;
  unusualChargeDetails?: string;
}

export interface TestDriveRequest {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  carId: string;
  carName: string;
  variantName: string;
  dealerId: string;
  dealerName: string;
  preferredDate: string;
  preferredTimeSlot: string;
  preferredLocation: 'DOORSTEP' | 'DEALERSHIP';
  address: string;
  status: 'REQUESTED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  notes?: string;
  createdAt: string;
}

export interface KeralaDistrictDemand {
  district: string;
  activeBuyerCount: number;
  activeGroupsCount: number;
  topRequestedModels: { model: string; count: number; avgSavingsEstimate: number }[];
  participatingDealers: number;
  latitude: number;
  longitude: number;
}

export interface AIAnalysisResult {
  summaryEn: string;
  summaryMl: string;
  bestValueQuoteId: string;
  keyDifferentiators: string[];
  identifiedFlags: { quoteId: string; dealerName: string; flagEn: string; flagMl: string; severity: 'INFO' | 'WARNING' | 'ALERT' }[];
  negotiationQuestionsEn: string[];
  negotiationQuestionsMl: string[];
  insuranceComparisonNotes: string;
  deliverySpeedWinner: string;
  priceWinner: string;
}
