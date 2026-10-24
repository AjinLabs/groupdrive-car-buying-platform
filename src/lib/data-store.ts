import { 
  Car, 
  BuyerGroup, 
  Dealership, 
  DealerQuotation, 
  TestDriveRequest, 
  KeralaDistrictDemand, 
  GroupMember,
  Role
} from '@/types';
import { getKeralaOnRoadBreakdown } from './kerala-tax';

// High-fidelity car catalog with accurate Kerala specifications & variants
export const INITIAL_CARS: Car[] = [
  {
    id: 'car-hyundai-creta',
    make: 'Hyundai',
    model: 'Creta 2026',
    bodyType: 'SUV',
    seatingCapacity: 5,
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop',
    startingPrice: 1100000,
    fuelOptions: ['PETROL', 'DIESEL'],
    transmissions: ['MANUAL', 'AUTOMATIC', 'DCT'],
    acceleration0to100: '8.9s',
    topSpeed: '190 km/h',
    bootSpace: '433 L',
    groundClearance: '190 mm',
    ncapSafetyRating: 5,
    tagline: 'The undisputed segment benchmark with Level 2 ADAS and panoramic sunroof.',
    popularInDistricts: ['Ernakulam (Kochi)', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur'],
    variants: [
      {
        id: 'var-creta-sxo-dct',
        name: 'SX(O) 1.5 Turbo Petrol DCT',
        exShowroomPrice: 2015000,
        fuelType: 'PETROL',
        transmission: 'DCT',
        engineCc: 1482,
        claimedMileageOrRange: '18.4 kmpl',
        keyFeatures: ['ADAS Level 2 (19 features)', 'Panoramic Sunroof', 'Ventilated Front Seats', 'Bose 8-Speaker Audio']
      },
      {
        id: 'var-creta-sx-diesel-at',
        name: 'SX 1.5 CRDi Diesel AT',
        exShowroomPrice: 1750000,
        fuelType: 'DIESEL',
        transmission: 'AUTOMATIC',
        engineCc: 1493,
        claimedMileageOrRange: '19.1 kmpl',
        keyFeatures: ['10.25-inch Touchscreen', 'Wireless Android Auto/Apple CarPlay', '6 Airbags Standard', 'Rear Disc Brakes']
      },
      {
        id: 'var-creta-s-petrol-mt',
        name: 'S(O) 1.5 MPi Petrol 6MT',
        exShowroomPrice: 1435000,
        fuelType: 'PETROL',
        transmission: 'MANUAL',
        engineCc: 1497,
        claimedMileageOrRange: '17.4 kmpl',
        keyFeatures: ['Push Button Start', 'Cruise Control', 'Dual Zone Climate Control', 'LED MFR Headlamps']
      }
    ]
  },
  {
    id: 'car-tata-nexon-ev',
    make: 'Tata',
    model: 'Nexon.ev Long Range',
    bodyType: 'SUV',
    seatingCapacity: 5,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop',
    startingPrice: 1449000,
    fuelOptions: ['EV'],
    transmissions: ['AUTOMATIC'],
    acceleration0to100: '8.9s',
    topSpeed: '150 km/h',
    bootSpace: '350 L',
    groundClearance: '190 mm',
    ncapSafetyRating: 5,
    tagline: "India's highest selling electric SUV with 5% flat Kerala road tax concession.",
    popularInDistricts: ['Ernakulam (Kochi)', 'Thiruvananthapuram', 'Kottayam', 'Thrissur'],
    variants: [
      {
        id: 'var-nexon-empowered-lr',
        name: 'Empowered Plus 45 kWh Long Range',
        exShowroomPrice: 1719000,
        fuelType: 'EV',
        transmission: 'AUTOMATIC',
        batteryKwh: 45,
        claimedMileageOrRange: '489 km (C75 MIDC)',
        keyFeatures: ['Vehicle-to-Load (V2L) Capability', '12.3-inch Cinematic Touchscreen', '360-Degree Surround Camera', 'Arcade.ev App Suite']
      },
      {
        id: 'var-nexon-fearless-lr',
        name: 'Fearless Plus 45 kWh Long Range',
        exShowroomPrice: 1599000,
        fuelType: 'EV',
        transmission: 'AUTOMATIC',
        batteryKwh: 45,
        claimedMileageOrRange: '489 km (C75 MIDC)',
        keyFeatures: ['Fast DC Charging (10-80% in 40 min)', 'Sequential LED DRLs with Charging Indicator', 'Wireless Smartphone Charger']
      }
    ]
  },
  {
    id: 'car-toyota-innova-hycross',
    make: 'Toyota',
    model: 'Innova Hycross Strong Hybrid',
    bodyType: 'MPV',
    seatingCapacity: 7,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
    startingPrice: 1977000,
    fuelOptions: ['STRONG_HYBRID', 'PETROL'],
    transmissions: ['CVT', 'AUTOMATIC'],
    acceleration0to100: '9.5s',
    topSpeed: '175 km/h',
    bootSpace: '991 L (seats folded)',
    groundClearance: '185 mm',
    ncapSafetyRating: 5,
    tagline: 'Unmatched Kerala family luxury with self-charging TNGA Hybrid powertrain.',
    popularInDistricts: ['Ernakulam (Kochi)', 'Kozhikode', 'Malappuram', 'Thiruvananthapuram'],
    variants: [
      {
        id: 'var-hycross-zxo',
        name: 'ZX(O) 2.0L Strong Hybrid e-Drive (7S)',
        exShowroomPrice: 3098000,
        fuelType: 'STRONG_HYBRID',
        transmission: 'CVT',
        engineCc: 1987,
        claimedMileageOrRange: '23.24 kmpl',
        keyFeatures: ['Ottoman Captain Recliner Seats', 'Toyota Safety Sense ADAS', 'Panoramic Sunroof with Mood Lighting', 'JBL 9-Speaker Audio']
      },
      {
        id: 'var-hycross-vx',
        name: 'VX 2.0L Strong Hybrid e-Drive (8S)',
        exShowroomPrice: 2597000,
        fuelType: 'STRONG_HYBRID',
        transmission: 'CVT',
        engineCc: 1987,
        claimedMileageOrRange: '23.24 kmpl',
        keyFeatures: ['Full Hybrid EV Drive Mode', 'Soft Touch Instrument Panel', 'Dual Function DRLs', 'Front & Rear Parking Sensors']
      }
    ]
  },
  {
    id: 'car-mahindra-xuv700',
    make: 'Mahindra',
    model: 'XUV700',
    bodyType: 'SUV',
    seatingCapacity: 7,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200&auto=format&fit=crop',
    startingPrice: 1399000,
    fuelOptions: ['DIESEL', 'PETROL'],
    transmissions: ['AUTOMATIC', 'MANUAL'],
    acceleration0to100: '8.8s',
    topSpeed: '200 km/h',
    bootSpace: '450 L',
    groundClearance: '200 mm',
    ncapSafetyRating: 5,
    tagline: 'High power mStallion and mHawk engines with advanced ADAS and twin HD screens.',
    popularInDistricts: ['Thrissur', 'Kozhikode', 'Ernakulam (Kochi)', 'Kannur'],
    variants: [
      {
        id: 'var-xuv700-ax7l-diesel-at',
        name: 'AX7 Luxury 2.2L Diesel AT (7S)',
        exShowroomPrice: 2499000,
        fuelType: 'DIESEL',
        transmission: 'AUTOMATIC',
        engineCc: 2184,
        claimedMileageOrRange: '16.5 kmpl',
        keyFeatures: ['Sony 12-Speaker 3D Immersive Sound', 'Smart Door Handles', 'Blind View Monitor', 'Electronic Park Brake with Auto Hold']
      },
      {
        id: 'var-xuv700-ax5-diesel-mt',
        name: 'AX5 2.2L Diesel 6MT (7S)',
        exShowroomPrice: 1789000,
        fuelType: 'DIESEL',
        transmission: 'MANUAL',
        engineCc: 2184,
        claimedMileageOrRange: '17.2 kmpl',
        keyFeatures: ['Dual 10.25-inch Digital Screens', 'Skyroof Panoramic Glass', 'Cornering Lamps', 'Curtain Airbags for All Rows']
      }
    ]
  },
  {
    id: 'car-vw-virtus',
    make: 'Volkswagen',
    model: 'Virtus GT',
    bodyType: 'SEDAN',
    seatingCapacity: 5,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop',
    startingPrice: 1156000,
    fuelOptions: ['PETROL'],
    transmissions: ['DCT', 'AUTOMATIC', 'MANUAL'],
    acceleration0to100: '8.7s',
    topSpeed: '205 km/h',
    bootSpace: '521 L',
    groundClearance: '179 mm',
    ncapSafetyRating: 5,
    tagline: 'Pure German driving dynamics, class-leading 521L boot, and 5-Star Global NCAP safety.',
    popularInDistricts: ['Ernakulam (Kochi)', 'Kottayam', 'Thiruvananthapuram', 'Kozhikode'],
    variants: [
      {
        id: 'var-virtus-gt-plus-dsg',
        name: 'GT Plus 1.5 TSI EVO DSG',
        exShowroomPrice: 1940000,
        fuelType: 'PETROL',
        transmission: 'DCT',
        engineCc: 1498,
        claimedMileageOrRange: '19.62 kmpl',
        keyFeatures: ['Active Cylinder Technology (ACT)', 'Sporty Red Brake Callipers', 'Digital Cockpit Pro', 'Ventilated Leather Seats']
      },
      {
        id: 'var-virtus-topline-at',
        name: 'Topline 1.0 TSI AT',
        exShowroomPrice: 1630000,
        fuelType: 'PETROL',
        transmission: 'AUTOMATIC',
        engineCc: 999,
        claimedMileageOrRange: '18.12 kmpl',
        keyFeatures: ['Electric Sunroof', 'Auto Headlamps & Rain Sensors', 'Wireless App-Connect', 'Cruise Control']
      }
    ]
  },
  {
    id: 'car-mahindra-thar-roxx',
    make: 'Mahindra',
    model: 'Thar ROXX 4x4',
    bodyType: 'SUV',
    seatingCapacity: 5,
    image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?q=80&w=1200&auto=format&fit=crop',
    startingPrice: 1299000,
    fuelOptions: ['DIESEL', 'PETROL'],
    transmissions: ['AUTOMATIC', 'MANUAL'],
    acceleration0to100: '9.2s',
    topSpeed: '180 km/h',
    bootSpace: '644 L',
    groundClearance: '217 mm',
    ncapSafetyRating: 5,
    tagline: '5-door luxury off-roader with panoramic Skyroof and Level 2 ADAS.',
    popularInDistricts: ['Kannur', 'Kozhikode', 'Ernakulam (Kochi)', 'Wayanad'],
    variants: [
      {
        id: 'var-thar-roxx-ax7l-4x4-at',
        name: 'AX7L 4x4 2.2L Diesel AT',
        exShowroomPrice: 2249000,
        fuelType: 'DIESEL',
        transmission: 'AUTOMATIC',
        engineCc: 2184,
        claimedMileageOrRange: '15.2 kmpl',
        keyFeatures: ['4XPLOR Intelligent Terrain System', 'Electronic Locking Differential', 'Harman Kardon 9-Speaker Audio', 'Level 2 ADAS']
      }
    ]
  }
];

// Verified Dealerships in Kerala
export const INITIAL_DEALERSHIPS: Dealership[] = [
  {
    id: 'dealer-popular-hyundai-kochi',
    name: 'Popular Hyundai Kochi',
    brand: 'Hyundai',
    groupName: 'Popular Vehicles & Services Ltd',
    district: 'Ernakulam (Kochi)',
    city: 'Kochi',
    address: 'NH-66 Bypass, Vyttila, Kochi, Kerala 682019',
    contactPerson: 'Arun Varma (General Manager - Institutional Sales)',
    phone: '+91 484 280 8888',
    email: 'groupsales.kochi@popularhyundai.com',
    verification: {
      isVerified: true,
      verifiedAt: '2025-11-10',
      gstin: '32AABCP1234D1Z5',
      tradeLicenseNumber: 'KMC/EXP/2024/9120',
      authorizedBrands: ['Hyundai'],
      verificationBadge: 'PLATINUM'
    },
    rating: 4.9,
    totalQuotesSubmitted: 142,
    successfulGroupDeals: 38,
    averageResponseTimeHours: 2.4
  },
  {
    id: 'dealer-nippon-toyota-kalamassery',
    name: 'Nippon Toyota Kalamassery',
    brand: 'Toyota',
    groupName: 'Nippon Motor Corporation',
    district: 'Ernakulam (Kochi)',
    city: 'Kochi',
    address: 'Premier Junction, Kalamassery, Kochi, Kerala 683104',
    contactPerson: 'Suresh Menon (VP - Customer Experience)',
    phone: '+91 484 255 1200',
    email: 'fleet@nippontoyota.com',
    verification: {
      isVerified: true,
      verifiedAt: '2025-10-18',
      gstin: '32AABCN9876K1Z2',
      tradeLicenseNumber: 'KLM/AUT/2024/871',
      authorizedBrands: ['Toyota'],
      verificationBadge: 'PLATINUM'
    },
    rating: 4.9,
    totalQuotesSubmitted: 119,
    successfulGroupDeals: 31,
    averageResponseTimeHours: 3.1
  },
  {
    id: 'dealer-kvr-tata-kozhikode',
    name: 'KVR Tata Motors Kozhikode',
    brand: 'Tata',
    groupName: 'KVR Auto Group',
    district: 'Kozhikode',
    city: 'Kozhikode',
    address: 'Near English Church, Kannur Road, Kozhikode, Kerala 673011',
    contactPerson: 'Faisal Mohammed (Corporate Sales Lead)',
    phone: '+91 495 276 5400',
    email: 'ev.sales@kvrtata.com',
    verification: {
      isVerified: true,
      verifiedAt: '2025-12-01',
      gstin: '32AABCK3344R1ZY',
      tradeLicenseNumber: 'KKD/AUTO/2024/514',
      authorizedBrands: ['Tata', 'Tata.ev'],
      verificationBadge: 'GOLD'
    },
    rating: 4.8,
    totalQuotesSubmitted: 89,
    successfulGroupDeals: 24,
    averageResponseTimeHours: 4.0
  },
  {
    id: 'dealer-evm-vw-cheranalloor',
    name: 'EVM Volkswagen Cheranalloor',
    brand: 'Volkswagen',
    groupName: 'EVM Group Motors',
    district: 'Ernakulam (Kochi)',
    city: 'Kochi',
    address: 'Container Road Junction, Cheranalloor, Kochi, Kerala 682034',
    contactPerson: 'Georgy Mathew (Sales Director)',
    phone: '+91 484 661 7000',
    email: 'sales@evmvolkswagen.com',
    verification: {
      isVerified: true,
      verifiedAt: '2025-11-20',
      gstin: '32AABCE5566T1ZQ',
      tradeLicenseNumber: 'KMC/EXP/2024/6011',
      authorizedBrands: ['Volkswagen'],
      verificationBadge: 'GOLD'
    },
    rating: 4.7,
    totalQuotesSubmitted: 64,
    successfulGroupDeals: 19,
    averageResponseTimeHours: 3.8
  },
  {
    id: 'dealer-pothens-hyundai-tvm',
    name: 'Pothens Hyundai Trivandrum',
    brand: 'Hyundai',
    groupName: 'Pothens Auto Ventures',
    district: 'Thiruvananthapuram',
    city: 'Thiruvananthapuram',
    address: 'Pattom - Kowdiar Road, Kuravankonam, Thiruvananthapuram 695003',
    contactPerson: 'Deepak Pillai (Institutional Sales)',
    phone: '+91 471 243 3311',
    email: 'quotes@pothenshyundai.com',
    verification: {
      isVerified: true,
      verifiedAt: '2025-12-15',
      gstin: '32AABCP4433E1ZK',
      tradeLicenseNumber: 'TRV/MOT/2024/1109',
      authorizedBrands: ['Hyundai'],
      verificationBadge: 'VERIFIED'
    },
    rating: 4.8,
    totalQuotesSubmitted: 76,
    successfulGroupDeals: 18,
    averageResponseTimeHours: 4.5
  }
];

// Active buyer groups with real member count and Kerala context
export const INITIAL_GROUPS: BuyerGroup[] = [
  {
    id: 'grp-creta-kochi-01',
    code: 'GD-KL-CRETA-01',
    carId: 'car-hyundai-creta',
    carMake: 'Hyundai',
    carModel: 'Creta 2026',
    carImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop',
    targetVariantId: 'var-creta-sxo-dct',
    targetVariantName: 'SX(O) 1.5 Turbo Petrol DCT',
    district: 'Ernakulam (Kochi)',
    state: 'Kerala',
    dealershipRadiusKm: 50,
    targetMembers: 15,
    currentMembers: 14,
    status: 'READY_FOR_QUOTES',
    createdAt: '2026-04-10T10:00:00Z',
    closingDate: '2026-04-28T23:59:59Z',
    estimatedDeliveryWindow: '14 - 21 Days',
    indicativeMinSavings: 65000,
    indicativeMaxSavings: 95000,
    quotationCount: 3,
    eligibleDealerships: ['dealer-popular-hyundai-kochi', 'dealer-pothens-hyundai-tvm'],
    members: [
      {
        id: 'mem-1',
        userId: 'user-rahul-menon',
        userName: 'Rahul Menon',
        userPhoneMasked: '+91 98470 *****',
        district: 'Ernakulam (Kochi)',
        selectedVariantId: 'var-creta-sxo-dct',
        selectedVariantName: 'SX(O) 1.5 Turbo Petrol DCT',
        targetBudget: 2400000,
        preferredPurchaseTimeline: 'Within 20 days',
        needFinance: true,
        needExchange: false,
        joinedAt: '2026-04-10T11:20:00Z',
        isOrganizer: true
      },
      {
        id: 'mem-2',
        userId: 'user-vipin-das',
        userName: 'Vipin Das',
        userPhoneMasked: '+91 94471 *****',
        district: 'Ernakulam (Kochi)',
        selectedVariantId: 'var-creta-sxo-dct',
        selectedVariantName: 'SX(O) 1.5 Turbo Petrol DCT',
        targetBudget: 2450000,
        preferredPurchaseTimeline: 'Within 30 days',
        needFinance: false,
        needExchange: true,
        joinedAt: '2026-04-11T09:15:00Z'
      },
      {
        id: 'mem-3',
        userId: 'user-neha-kurian',
        userName: 'Dr. Neha Kurian',
        userPhoneMasked: '+91 97455 *****',
        district: 'Kottayam',
        selectedVariantId: 'var-creta-sx-diesel-at',
        selectedVariantName: 'SX 1.5 CRDi Diesel AT',
        targetBudget: 2100000,
        preferredPurchaseTimeline: 'Within 15 days',
        needFinance: true,
        needExchange: false,
        joinedAt: '2026-04-12T14:40:00Z'
      }
    ]
  },
  {
    id: 'grp-nexon-tvm-04',
    code: 'GD-KL-NEXONEV-04',
    carId: 'car-tata-nexon-ev',
    carMake: 'Tata',
    carModel: 'Nexon.ev Long Range',
    carImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop',
    targetVariantId: 'var-nexon-empowered-lr',
    targetVariantName: 'Empowered Plus 45 kWh Long Range',
    district: 'Thiruvananthapuram',
    state: 'Kerala',
    dealershipRadiusKm: 60,
    targetMembers: 10,
    currentMembers: 8,
    status: 'GATHERING_BUYERS',
    createdAt: '2026-04-14T12:00:00Z',
    closingDate: '2026-05-05T23:59:59Z',
    estimatedDeliveryWindow: '7 - 14 Days',
    indicativeMinSavings: 50000,
    indicativeMaxSavings: 75000,
    quotationCount: 2,
    eligibleDealerships: ['dealer-kvr-tata-kozhikode'],
    members: [
      {
        id: 'mem-4',
        userId: 'user-ananya-nair',
        userName: 'Ananya Nair',
        userPhoneMasked: '+91 98950 *****',
        district: 'Thiruvananthapuram',
        selectedVariantId: 'var-nexon-empowered-lr',
        selectedVariantName: 'Empowered Plus 45 kWh Long Range',
        targetBudget: 1900000,
        preferredPurchaseTimeline: 'Within 30 days',
        needFinance: true,
        needExchange: false,
        joinedAt: '2026-04-14T12:30:00Z',
        isOrganizer: true
      }
    ]
  },
  {
    id: 'grp-hycross-calicut-02',
    code: 'GD-KL-HYCROSS-02',
    carId: 'car-toyota-innova-hycross',
    carMake: 'Toyota',
    carModel: 'Innova Hycross Strong Hybrid',
    carImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
    targetVariantId: 'var-hycross-zxo',
    targetVariantName: 'ZX(O) 2.0L Strong Hybrid e-Drive (7S)',
    district: 'Kozhikode',
    state: 'Kerala',
    dealershipRadiusKm: 70,
    targetMembers: 12,
    currentMembers: 12,
    status: 'QUOTES_RECEIVED',
    createdAt: '2026-04-05T08:00:00Z',
    closingDate: '2026-04-26T23:59:59Z',
    estimatedDeliveryWindow: '25 - 35 Days',
    indicativeMinSavings: 80000,
    indicativeMaxSavings: 130000,
    quotationCount: 4,
    eligibleDealerships: ['dealer-nippon-toyota-kalamassery'],
    members: [
      {
        id: 'mem-5',
        userId: 'user-muhammed-shafi',
        userName: 'Muhammed Shafi',
        userPhoneMasked: '+91 94960 *****',
        district: 'Kozhikode',
        selectedVariantId: 'var-hycross-zxo',
        selectedVariantName: 'ZX(O) 2.0L Strong Hybrid e-Drive (7S)',
        targetBudget: 3800000,
        preferredPurchaseTimeline: 'Immediate',
        needFinance: false,
        needExchange: false,
        joinedAt: '2026-04-05T08:30:00Z',
        isOrganizer: true
      }
    ]
  },
  {
    id: 'grp-virtus-kochi-03',
    code: 'GD-KL-VIRTUS-03',
    carId: 'car-vw-virtus',
    carMake: 'Volkswagen',
    carModel: 'Virtus GT',
    carImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1200&auto=format&fit=crop',
    targetVariantId: 'var-virtus-gt-plus-dsg',
    targetVariantName: 'GT Plus 1.5 TSI EVO DSG',
    district: 'Ernakulam (Kochi)',
    state: 'Kerala',
    dealershipRadiusKm: 50,
    targetMembers: 8,
    currentMembers: 7,
    status: 'QUOTES_RECEIVED',
    createdAt: '2026-04-12T15:00:00Z',
    closingDate: '2026-05-01T23:59:59Z',
    estimatedDeliveryWindow: 'Immediate (Stock ready)',
    indicativeMinSavings: 55000,
    indicativeMaxSavings: 90000,
    quotationCount: 3,
    eligibleDealerships: ['dealer-evm-vw-cheranalloor'],
    members: [
      {
        id: 'mem-6',
        userId: 'user-karthik-s',
        userName: 'Karthik S.',
        userPhoneMasked: '+91 90480 *****',
        district: 'Ernakulam (Kochi)',
        selectedVariantId: 'var-virtus-gt-plus-dsg',
        selectedVariantName: 'GT Plus 1.5 TSI EVO DSG',
        targetBudget: 2350000,
        preferredPurchaseTimeline: 'Within 15 days',
        needFinance: true,
        needExchange: false,
        joinedAt: '2026-04-12T15:30:00Z',
        isOrganizer: true
      }
    ]
  }
];

// Itemized Dealership Quotations with Kerala Tax Breakdown & Completeness Scores
export const INITIAL_QUOTATIONS: DealerQuotation[] = [
  {
    id: 'quote-pop-creta-01',
    groupId: 'grp-creta-kochi-01',
    groupCode: 'GD-KL-CRETA-01',
    dealerId: 'dealer-popular-hyundai-kochi',
    dealerName: 'Popular Hyundai Kochi',
    dealerDistrict: 'Ernakulam (Kochi)',
    dealerBadge: 'PLATINUM',
    variantId: 'var-creta-sxo-dct',
    variantName: 'SX(O) 1.5 Turbo Petrol DCT',
    carModel: 'Creta 2026',
    version: 1,
    exShowroom: 2015000,
    keralaRoadTax: 423150, // 21% slab for > 20L
    roadSafetyCess: 4232, // 1%
    tcsAmount: 20150, // 1% TCS
    fastag: 500,
    registrationHypothecation: 1500,
    insuranceAmount: 64500, // 1 yr OD + 3 yr TP + Zero Dep + RTI
    insuranceProvider: 'HDFC ERGO Comprehensive (Zero Dep + RTI + Engine Protect Included)',
    insuranceCoverage: ['Zero Depreciation', 'Return to Invoice (RTI)', 'Engine & Gearbox Protector', 'Consumables Cover'],
    logisticsHandlingCharge: 0, // Zero handling fee (100% compliant!)
    includedAccessories: ['3D All-Weather Floor Mats', 'Boot Mat', 'Mud Flaps', 'Magnetic Sunshades', 'Car Perfume & Microfiber Pack'],
    accessoriesAmount: 0, // Included complimentary in group offer!
    extendedWarrantyYears: 2,
    extendedWarrantyAmount: 18500,
    groupNegotiationDiscount: 85000, // Direct group volume reduction!
    totalOnRoadPrice: 2462532,
    effectiveNetSavings: 98500, // Compared to standard single walk-in buyer quote of ~₹25.61L
    deliveryDays: 14,
    deliveryTimelineText: 'Ready in stock at Kalamassery yard. 14 Days guaranteed.',
    quoteValidUntil: '2026-04-30T23:59:59Z',
    submittedAt: '2026-04-18T14:30:00Z',
    status: 'ACTIVE',
    quoteCompletenessScore: 100, // All mandatory disclosures provided transparently
    unusualChargeFlag: false
  },
  {
    id: 'quote-pothens-creta-02',
    groupId: 'grp-creta-kochi-01',
    groupCode: 'GD-KL-CRETA-01',
    dealerId: 'dealer-pothens-hyundai-tvm',
    dealerName: 'Pothens Hyundai Trivandrum',
    dealerDistrict: 'Thiruvananthapuram',
    dealerBadge: 'VERIFIED',
    variantId: 'var-creta-sxo-dct',
    variantName: 'SX(O) 1.5 Turbo Petrol DCT',
    carModel: 'Creta 2026',
    version: 1,
    exShowroom: 2015000,
    keralaRoadTax: 423150,
    roadSafetyCess: 4232,
    tcsAmount: 20150,
    fastag: 500,
    registrationHypothecation: 1500,
    insuranceAmount: 51200, // Lower headline price but missing RTI
    insuranceProvider: 'National Insurance (Basic Zero Dep only)',
    insuranceCoverage: ['Zero Depreciation'],
    logisticsHandlingCharge: 12500, // Flagged handling fee!
    logisticsFeeDisclosedReason: 'Secondary stock transit & dealer warehouse handling fee',
    includedAccessories: ['Floor Mats'],
    accessoriesAmount: 8500,
    extendedWarrantyYears: 0,
    extendedWarrantyAmount: 0,
    groupNegotiationDiscount: 60000,
    totalOnRoadPrice: 2476732,
    effectiveNetSavings: 58000,
    deliveryDays: 25,
    deliveryTimelineText: '20 - 25 days transit from regional depot.',
    quoteValidUntil: '2026-04-28T23:59:59Z',
    submittedAt: '2026-04-19T10:15:00Z',
    status: 'ACTIVE',
    quoteCompletenessScore: 78,
    unusualChargeFlag: true,
    unusualChargeDetails: 'Includes ₹12,500 Logistics/Handling fee. Supreme Court and Kerala MVD regulations prohibit mandatory dealer handling charges.'
  },
  {
    id: 'quote-nippon-hycross-01',
    groupId: 'grp-hycross-calicut-02',
    groupCode: 'GD-KL-HYCROSS-02',
    dealerId: 'dealer-nippon-toyota-kalamassery',
    dealerName: 'Nippon Toyota Kalamassery',
    dealerDistrict: 'Ernakulam (Kochi)',
    dealerBadge: 'PLATINUM',
    variantId: 'var-hycross-zxo',
    variantName: 'ZX(O) 2.0L Strong Hybrid e-Drive (7S)',
    carModel: 'Innova Hycross Strong Hybrid',
    version: 1,
    exShowroom: 3098000,
    keralaRoadTax: 650580, // 21%
    roadSafetyCess: 6506,
    tcsAmount: 30980,
    fastag: 500,
    registrationHypothecation: 1800,
    insuranceAmount: 98000,
    insuranceProvider: 'Toyota Protect - ICICI Lombard Comprehensive with RTI, Zero Dep, Tyre & Rim Cover',
    insuranceCoverage: ['Zero Depreciation', 'Return to Invoice', 'Engine Protect', 'Tyre & Rim Secure'],
    logisticsHandlingCharge: 0,
    includedAccessories: ['Side Foot Steps', 'Mudguard Set', 'All Weather Mats', 'Chrome Door Visors'],
    accessoriesAmount: 0,
    extendedWarrantyYears: 2,
    extendedWarrantyAmount: 24000,
    groupNegotiationDiscount: 110000, // Massive group discount
    totalOnRoadPrice: 3800366,
    effectiveNetSavings: 135000,
    deliveryDays: 28,
    deliveryTimelineText: 'Direct allocation batch from Bidadi plant. 28 days.',
    quoteValidUntil: '2026-05-02T23:59:59Z',
    submittedAt: '2026-04-16T16:00:00Z',
    status: 'ACTIVE',
    quoteCompletenessScore: 100,
    unusualChargeFlag: false
  }
];

// District demand mapping across 14 Kerala districts
export const KERALA_DISTRICT_DEMANDS: KeralaDistrictDemand[] = [
  {
    district: 'Ernakulam (Kochi)',
    activeBuyerCount: 84,
    activeGroupsCount: 7,
    topRequestedModels: [
      { model: 'Hyundai Creta', count: 32, avgSavingsEstimate: 85000 },
      { model: 'Toyota Innova Hycross', count: 24, avgSavingsEstimate: 125000 },
      { model: 'Tata Nexon EV', count: 18, avgSavingsEstimate: 68000 },
      { model: 'Volkswagen Virtus', count: 10, avgSavingsEstimate: 72000 }
    ],
    participatingDealers: 12,
    latitude: 9.9816,
    longitude: 76.2999
  },
  {
    district: 'Thiruvananthapuram',
    activeBuyerCount: 62,
    activeGroupsCount: 5,
    topRequestedModels: [
      { model: 'Tata Nexon EV', count: 26, avgSavingsEstimate: 72000 },
      { model: 'Hyundai Creta', count: 19, avgSavingsEstimate: 80000 },
      { model: 'Mahindra XUV700', count: 17, avgSavingsEstimate: 95000 }
    ],
    participatingDealers: 9,
    latitude: 8.5241,
    longitude: 76.9366
  },
  {
    district: 'Kozhikode',
    activeBuyerCount: 58,
    activeGroupsCount: 5,
    topRequestedModels: [
      { model: 'Toyota Innova Hycross', count: 28, avgSavingsEstimate: 130000 },
      { model: 'Mahindra Thar ROXX', count: 18, avgSavingsEstimate: 60000 },
      { model: 'Hyundai Creta', count: 12, avgSavingsEstimate: 82000 }
    ],
    participatingDealers: 8,
    latitude: 11.2588,
    longitude: 75.7804
  },
  {
    district: 'Thrissur',
    activeBuyerCount: 44,
    activeGroupsCount: 4,
    topRequestedModels: [
      { model: 'Mahindra XUV700', count: 19, avgSavingsEstimate: 90000 },
      { model: 'Toyota Innova Hycross', count: 14, avgSavingsEstimate: 115000 },
      { model: 'Tata Nexon EV', count: 11, avgSavingsEstimate: 65000 }
    ],
    participatingDealers: 7,
    latitude: 10.5276,
    longitude: 76.2144
  },
  {
    district: 'Kottayam',
    activeBuyerCount: 36,
    activeGroupsCount: 3,
    topRequestedModels: [
      { model: 'Volkswagen Virtus', count: 15, avgSavingsEstimate: 75000 },
      { model: 'Hyundai Creta', count: 12, avgSavingsEstimate: 80000 },
      { model: 'Tata Nexon EV', count: 9, avgSavingsEstimate: 65000 }
    ],
    participatingDealers: 5,
    latitude: 9.5916,
    longitude: 76.5222
  },
  {
    district: 'Kannur',
    activeBuyerCount: 31,
    activeGroupsCount: 3,
    topRequestedModels: [
      { model: 'Mahindra Thar ROXX', count: 16, avgSavingsEstimate: 62000 },
      { model: 'Toyota Innova Hycross', count: 10, avgSavingsEstimate: 120000 },
      { model: 'Hyundai Creta', count: 5, avgSavingsEstimate: 78000 }
    ],
    participatingDealers: 4,
    latitude: 11.8745,
    longitude: 75.3704
  },
  {
    district: 'Malappuram',
    activeBuyerCount: 41,
    activeGroupsCount: 3,
    topRequestedModels: [
      { model: 'Toyota Innova Hycross', count: 22, avgSavingsEstimate: 128000 },
      { model: 'Hyundai Creta', count: 12, avgSavingsEstimate: 85000 },
      { model: 'Mahindra Thar ROXX', count: 7, avgSavingsEstimate: 60000 }
    ],
    participatingDealers: 5,
    latitude: 11.0735,
    longitude: 76.0740
  },
  {
    district: 'Kollam',
    activeBuyerCount: 28,
    activeGroupsCount: 2,
    topRequestedModels: [
      { model: 'Tata Nexon EV', count: 14, avgSavingsEstimate: 67000 },
      { model: 'Hyundai Creta', count: 10, avgSavingsEstimate: 80000 },
      { model: 'Volkswagen Virtus', count: 4, avgSavingsEstimate: 70000 }
    ],
    participatingDealers: 4,
    latitude: 8.8932,
    longitude: 76.6141
  },
  {
    district: 'Palakkad',
    activeBuyerCount: 25,
    activeGroupsCount: 2,
    topRequestedModels: [
      { model: 'Mahindra XUV700', count: 11, avgSavingsEstimate: 88000 },
      { model: 'Hyundai Creta', count: 9, avgSavingsEstimate: 80000 },
      { model: 'Toyota Innova Hycross', count: 5, avgSavingsEstimate: 115000 }
    ],
    participatingDealers: 4,
    latitude: 10.7867,
    longitude: 76.6548
  },
  {
    district: 'Alappuzha',
    activeBuyerCount: 22,
    activeGroupsCount: 2,
    topRequestedModels: [
      { model: 'Tata Nexon EV', count: 11, avgSavingsEstimate: 65000 },
      { model: 'Hyundai Creta', count: 8, avgSavingsEstimate: 78000 },
      { model: 'Volkswagen Virtus', count: 3, avgSavingsEstimate: 70000 }
    ],
    participatingDealers: 3,
    latitude: 9.4981,
    longitude: 76.3388
  }
];

// Test Drive Requests
export const INITIAL_TEST_DRIVES: TestDriveRequest[] = [
  {
    id: 'td-101',
    userId: 'user-rahul-menon',
    userName: 'Rahul Menon',
    userPhone: '+91 98470 12345',
    carId: 'car-hyundai-creta',
    carName: 'Hyundai Creta 2026',
    variantName: 'SX(O) 1.5 Turbo Petrol DCT',
    dealerId: 'dealer-popular-hyundai-kochi',
    dealerName: 'Popular Hyundai Kochi',
    preferredDate: '2026-04-26',
    preferredTimeSlot: '11:00 AM - 12:30 PM',
    preferredLocation: 'DOORSTEP',
    address: 'Flat 4B, Skyline Imperial, Panampilly Nagar, Kochi',
    status: 'CONFIRMED',
    notes: 'Please bring the matte finish Titan Gray color for visual inspection.',
    createdAt: '2026-04-20T10:15:00Z'
  }
];

// In-Memory Singleton Store for the Application Session
class DataStore {
  private cars: Car[] = [...INITIAL_CARS];
  private groups: BuyerGroup[] = [...INITIAL_GROUPS];
  private dealerships: Dealership[] = [...INITIAL_DEALERSHIPS];
  private quotations: DealerQuotation[] = [...INITIAL_QUOTATIONS];
  private testDrives: TestDriveRequest[] = [...INITIAL_TEST_DRIVES];
  private demands: KeralaDistrictDemand[] = [...KERALA_DISTRICT_DEMANDS];

  // Cars
  public getCars(): Car[] {
    return this.cars;
  }

  public getCarById(id: string): Car | undefined {
    return this.cars.find(c => c.id === id);
  }

  // Groups
  public getGroups(): BuyerGroup[] {
    return this.groups;
  }

  public getGroupById(id: string): BuyerGroup | undefined {
    return this.groups.find(g => g.id === id);
  }

  public createGroup(data: {
    carId: string;
    variantId?: string;
    district: string;
    dealershipRadiusKm: number;
    targetMembers: number;
    creatorName: string;
    creatorPhone: string;
    targetBudget: number;
    purchaseTimeline: string;
  }): BuyerGroup {
    const car = this.getCarById(data.carId);
    if (!car) throw new Error('Car not found');

    const variant = car.variants.find(v => v.id === data.variantId) || car.variants[0];
    const groupCode = `GD-KL-${car.model.replace(/\s+/g, '').toUpperCase().slice(0, 5)}-${Math.floor(10 + Math.random() * 90)}`;

    const newGroup: BuyerGroup = {
      id: `grp-${Date.now()}`,
      code: groupCode,
      carId: car.id,
      carMake: car.make,
      carModel: car.model,
      carImage: car.image,
      targetVariantId: variant.id,
      targetVariantName: variant.name,
      district: data.district,
      state: 'Kerala',
      dealershipRadiusKm: data.dealershipRadiusKm,
      targetMembers: Math.max(5, data.targetMembers),
      currentMembers: 1,
      status: 'GATHERING_BUYERS',
      createdAt: new Date().toISOString(),
      closingDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
      estimatedDeliveryWindow: '14 - 25 Days',
      indicativeMinSavings: 45000,
      indicativeMaxSavings: 85000,
      quotationCount: 0,
      eligibleDealerships: this.dealerships
        .filter(d => d.verification.authorizedBrands.includes(car.make))
        .map(d => d.id),
      members: [
        {
          id: `mem-${Date.now()}`,
          userId: `user-${Date.now()}`,
          userName: data.creatorName,
          userPhoneMasked: data.creatorPhone.replace(/(\+91\s?\d{2})\d{4}(\d{4})/, '$1****$2'),
          district: data.district,
          selectedVariantId: variant.id,
          selectedVariantName: variant.name,
          targetBudget: data.targetBudget,
          preferredPurchaseTimeline: data.purchaseTimeline,
          needFinance: true,
          needExchange: false,
          joinedAt: new Date().toISOString(),
          isOrganizer: true
        }
      ]
    };

    this.groups.unshift(newGroup);
    return newGroup;
  }

  public joinGroup(groupId: string, memberData: {
    userName: string;
    userPhone: string;
    district: string;
    selectedVariantId: string;
    targetBudget: number;
    preferredPurchaseTimeline: string;
    needFinance: boolean;
    needExchange: boolean;
  }): { success: boolean; group?: BuyerGroup; error?: string } {
    const group = this.getGroupById(groupId);
    if (!group) return { success: false, error: 'Group not found' };

    // Transaction-safe join check
    const existing = group.members.find(m => m.userName.toLowerCase() === memberData.userName.toLowerCase() || m.userPhoneMasked.includes(memberData.userPhone.slice(-4)));
    if (existing) {
      return { success: false, error: 'You are already an active member of this buyer group' };
    }

    const car = this.getCarById(group.carId);
    const variant = car?.variants.find(v => v.id === memberData.selectedVariantId);

    const newMember: GroupMember = {
      id: `mem-${Date.now()}`,
      userId: `user-${Date.now()}`,
      userName: memberData.userName,
      userPhoneMasked: memberData.userPhone.length >= 10 
        ? memberData.userPhone.slice(0, 4) + ' **** ' + memberData.userPhone.slice(-3)
        : '+91 98*** **420',
      district: memberData.district,
      selectedVariantId: memberData.selectedVariantId,
      selectedVariantName: variant ? variant.name : group.targetVariantName || 'Standard Variant',
      targetBudget: memberData.targetBudget,
      preferredPurchaseTimeline: memberData.preferredPurchaseTimeline,
      needFinance: memberData.needFinance,
      needExchange: memberData.needExchange,
      joinedAt: new Date().toISOString(),
      isOrganizer: false
    };

    group.members.push(newMember);
    group.currentMembers = Math.max(group.currentMembers + 1, group.members.length);

    // Transition lifecycle
    if (group.currentMembers >= group.targetMembers) {
      group.status = 'READY_FOR_QUOTES';
    } else if (group.currentMembers >= 3 && group.status === 'OPEN') {
      group.status = 'GATHERING_BUYERS';
    }

    return { success: true, group };
  }

  // Dealerships
  public getDealerships(): Dealership[] {
    return this.dealerships;
  }

  public getDealerById(id: string): Dealership | undefined {
    return this.dealerships.find(d => d.id === id);
  }

  // Quotations
  public getQuotations(): DealerQuotation[] {
    return this.quotations;
  }

  public getQuotesByGroupId(groupId: string): DealerQuotation[] {
    return this.quotations.filter(q => q.groupId === groupId);
  }

  public submitQuotation(quoteData: {
    groupId: string;
    dealerId: string;
    variantId: string;
    exShowroom: number;
    keralaRoadTax: number;
    roadSafetyCess: number;
    tcsAmount: number;
    fastag: number;
    registrationHypothecation: number;
    insuranceAmount: number;
    insuranceProvider: string;
    insuranceCoverage: string[];
    logisticsHandlingCharge: number;
    logisticsFeeDisclosedReason?: string;
    includedAccessories: string[];
    accessoriesAmount: number;
    extendedWarrantyYears: number;
    extendedWarrantyAmount: number;
    groupNegotiationDiscount: number;
    deliveryDays: number;
    deliveryTimelineText: string;
    validDays: number;
  }): DealerQuotation {
    const group = this.getGroupById(quoteData.groupId);
    if (!group) throw new Error('Group not found');

    const dealer = this.getDealerById(quoteData.dealerId);
    if (!dealer) throw new Error('Dealer not found');

    const car = this.getCarById(group.carId);
    const variant = car?.variants.find(v => v.id === quoteData.variantId) || car?.variants[0];

    // Compute server-side validated total
    const totalOnRoadPrice = 
      quoteData.exShowroom +
      quoteData.keralaRoadTax +
      quoteData.roadSafetyCess +
      quoteData.tcsAmount +
      quoteData.fastag +
      quoteData.registrationHypothecation +
      quoteData.insuranceAmount +
      quoteData.logisticsHandlingCharge +
      quoteData.accessoriesAmount +
      quoteData.extendedWarrantyAmount -
      quoteData.groupNegotiationDiscount;

    // Check for unusual / prohibited charges
    const unusualChargeFlag = quoteData.logisticsHandlingCharge > 0;
    const unusualChargeDetails = unusualChargeFlag 
      ? `Disclosed handling charge of ₹${quoteData.logisticsHandlingCharge.toLocaleString('en-IN')}. Kerala MVD and apex court judgments classify mandatory handling as unapproved.`
      : undefined;

    // Completeness score
    let score = 50;
    if (quoteData.insuranceCoverage.length >= 2) score += 20;
    if (quoteData.deliveryTimelineText.length > 5) score += 10;
    if (quoteData.logisticsHandlingCharge === 0) score += 10;
    if (quoteData.extendedWarrantyYears > 0) score += 10;

    const newQuote: DealerQuotation = {
      id: `quote-${Date.now()}`,
      groupId: group.id,
      groupCode: group.code,
      dealerId: dealer.id,
      dealerName: dealer.name,
      dealerDistrict: dealer.district,
      dealerBadge: dealer.verification.verificationBadge as 'PLATINUM' | 'GOLD' | 'VERIFIED',
      variantId: variant?.id || 'var-default',
      variantName: variant?.name || 'Standard Variant',
      carModel: car?.model || group.carModel,
      version: 1,
      exShowroom: quoteData.exShowroom,
      keralaRoadTax: quoteData.keralaRoadTax,
      roadSafetyCess: quoteData.roadSafetyCess,
      tcsAmount: quoteData.tcsAmount,
      fastag: quoteData.fastag,
      registrationHypothecation: quoteData.registrationHypothecation,
      insuranceAmount: quoteData.insuranceAmount,
      insuranceProvider: quoteData.insuranceProvider,
      insuranceCoverage: quoteData.insuranceCoverage,
      logisticsHandlingCharge: quoteData.logisticsHandlingCharge,
      logisticsFeeDisclosedReason: quoteData.logisticsFeeDisclosedReason,
      includedAccessories: quoteData.includedAccessories,
      accessoriesAmount: quoteData.accessoriesAmount,
      extendedWarrantyYears: quoteData.extendedWarrantyYears,
      extendedWarrantyAmount: quoteData.extendedWarrantyAmount,
      groupNegotiationDiscount: quoteData.groupNegotiationDiscount,
      totalOnRoadPrice,
      effectiveNetSavings: quoteData.groupNegotiationDiscount + (quoteData.accessoriesAmount === 0 ? 15000 : 0),
      deliveryDays: quoteData.deliveryDays,
      deliveryTimelineText: quoteData.deliveryTimelineText,
      quoteValidUntil: new Date(Date.now() + (quoteData.validDays || 14) * 24 * 60 * 60 * 1000).toISOString(),
      submittedAt: new Date().toISOString(),
      status: 'ACTIVE',
      quoteCompletenessScore: Math.min(100, score),
      unusualChargeFlag,
      unusualChargeDetails
    };

    this.quotations.push(newQuote);
    group.quotationCount = this.getQuotesByGroupId(group.id).length;
    group.status = 'QUOTES_RECEIVED';

    return newQuote;
  }

  // Test Drives
  public getTestDrives(): TestDriveRequest[] {
    return this.testDrives;
  }

  public createTestDriveRequest(data: {
    userId: string;
    userName: string;
    userPhone: string;
    carId: string;
    dealerId: string;
    preferredDate: string;
    preferredTimeSlot: string;
    preferredLocation: 'DOORSTEP' | 'DEALERSHIP';
    address: string;
    notes?: string;
  }): TestDriveRequest {
    const car = this.getCarById(data.carId);
    const dealer = this.getDealerById(data.dealerId);

    const newRequest: TestDriveRequest = {
      id: `td-${Date.now()}`,
      userId: data.userId,
      userName: data.userName,
      userPhone: data.userPhone,
      carId: data.carId,
      carName: car ? `${car.make} ${car.model}` : 'Automobile',
      variantName: car?.variants[0].name || 'Top Variant',
      dealerId: data.dealerId,
      dealerName: dealer?.name || 'Authorized Dealership',
      preferredDate: data.preferredDate,
      preferredTimeSlot: data.preferredTimeSlot,
      preferredLocation: data.preferredLocation,
      address: data.address,
      status: 'REQUESTED',
      notes: data.notes,
      createdAt: new Date().toISOString()
    };

    this.testDrives.unshift(newRequest);
    return newRequest;
  }

  public updateTestDriveStatus(id: string, status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED'): boolean {
    const td = this.testDrives.find(t => t.id === id);
    if (!td) return false;
    td.status = status;
    return true;
  }

  // Kerala Demands
  public getKeralaDemands(): KeralaDistrictDemand[] {
    return this.demands;
  }

  // Platform Metrics
  public getPlatformStats() {
    const totalMembers = this.groups.reduce((acc, g) => acc + g.currentMembers, 0);
    const totalQuotes = this.quotations.length;
    const totalQuotedValue = this.quotations.reduce((acc, q) => acc + q.totalOnRoadPrice, 0);

    return {
      activeBuyers: totalMembers + 285, // seeded + active
      activeBuyerGroups: this.groups.length,
      verifiedDealerships: this.dealerships.length,
      totalQuotedVolumeCr: (totalQuotedValue / 10000000 + 4.8).toFixed(1), // in ₹ Crores
      avgSavingsPerCar: '₹82,500',
      districtsCovered: 14,
      dealerResponseRate: '98.4%'
    };
  }
}

// Global singleton instance
export const dataStore = new DataStore();
