import { FuelType } from '@/types';

export interface KeralaTaxBreakdown {
  exShowroom: number;
  taxSlabPercentage: number;
  roadTax: number;
  roadSafetyCess: number;
  tcs: number; // 1% if > 10 Lakhs
  fastag: number;
  registrationHypothecation: number;
  baseMandatoryGovtCharges: number;
  
  // Insurance estimates
  estimatedInsurance: number;
  zeroDepAddon: number;
  rtiAddon: number;
  engineProtectAddon: number;
  totalEstimatedInsurance: number;
  
  // Recommended genuine accessories
  recommendedAccessories: number;
  
  // Overall estimated on-road price
  estimatedStandardOnRoad: number;
  
  // Verification info
  lastVerifiedDate: string;
  ruleSource: string;
}

/**
 * Calculates official Kerala RTO Road Tax & government levies with decimal-safe precision.
 * Verified against Kerala Motor Vehicles Taxation (Amendment) Act & Kerala EV Policy.
 */
export function calculateKeralaRoadTax(
  exShowroom: number,
  fuelType: FuelType = 'PETROL'
): { slabPercentage: number; roadTax: number; roadSafetyCess: number } {
  // If electric vehicle, Kerala grants 5% flat road tax concession
  if (fuelType === 'EV') {
    const slabPercentage = 5;
    const roadTax = Math.round(exShowroom * 0.05);
    const roadSafetyCess = Math.round(roadTax * 0.01);
    return { slabPercentage, roadTax, roadSafetyCess };
  }

  let slabPercentage = 9;
  if (exShowroom <= 500000) {
    slabPercentage = 9;
  } else if (exShowroom <= 1000000) {
    slabPercentage = 11;
  } else if (exShowroom <= 1500000) {
    slabPercentage = 13;
  } else if (exShowroom <= 2000000) {
    slabPercentage = 16;
  } else {
    slabPercentage = 21;
  }

  const roadTax = Math.round((exShowroom * slabPercentage) / 100);
  const roadSafetyCess = Math.max(250, Math.round(roadTax * 0.01));

  return { slabPercentage, roadTax, roadSafetyCess };
}

/**
 * Computes Tax Collected at Source (TCS) under Section 206C(1F) of IT Act.
 * 1% on motor vehicles having ex-showroom value exceeding ₹10,00,000.
 */
export function calculateTCS(exShowroom: number): number {
  if (exShowroom > 1000000) {
    return Math.round(exShowroom * 0.01);
  }
  return 0;
}

/**
 * Comprehensive Kerala On-Road Price breakdown calculator.
 */
export function getKeralaOnRoadBreakdown(
  exShowroom: number,
  fuelType: FuelType = 'PETROL',
  options: {
    includeZeroDep?: boolean;
    includeRTI?: boolean;
    includeEngineProtect?: boolean;
    includeAccessories?: boolean;
  } = {}
): KeralaTaxBreakdown {
  const { slabPercentage, roadTax, roadSafetyCess } = calculateKeralaRoadTax(exShowroom, fuelType);
  const tcs = calculateTCS(exShowroom);
  const fastag = 500;
  const registrationHypothecation = 1500;
  const baseMandatoryGovtCharges = roadTax + roadSafetyCess + tcs + fastag + registrationHypothecation;

  // Insurance baseline estimation (1-year Own Damage + 3-year mandatory IRDAI Third Party)
  // Approx 3.2% of ex-showroom for comprehensive base
  const estimatedInsurance = Math.round(exShowroom * 0.032);
  const zeroDepAddon = options.includeZeroDep !== false ? Math.round(exShowroom * 0.007) : 0;
  const rtiAddon = options.includeRTI !== false ? Math.round(exShowroom * 0.0035) : 0;
  const engineProtectAddon = options.includeEngineProtect !== false ? Math.round(exShowroom * 0.002) : 0;
  
  const totalEstimatedInsurance = estimatedInsurance + zeroDepAddon + rtiAddon + engineProtectAddon;
  const recommendedAccessories = options.includeAccessories ? Math.round(Math.min(25000, exShowroom * 0.012)) : 0;

  const estimatedStandardOnRoad = exShowroom + baseMandatoryGovtCharges + totalEstimatedInsurance + recommendedAccessories;

  return {
    exShowroom,
    taxSlabPercentage: slabPercentage,
    roadTax,
    roadSafetyCess,
    tcs,
    fastag,
    registrationHypothecation,
    baseMandatoryGovtCharges,
    estimatedInsurance,
    zeroDepAddon,
    rtiAddon,
    engineProtectAddon,
    totalEstimatedInsurance,
    recommendedAccessories,
    estimatedStandardOnRoad,
    lastVerifiedDate: 'April 2026',
    ruleSource: 'Kerala Motor Vehicles Department (MVD) Gazette Notification & IRDAI Guidelines'
  };
}

/**
 * Format INR with Indian numbering system (Lakhs and Crores).
 * Example: 1845000 -> "₹18.45 Lakh" or "₹18,45,000"
 */
export function formatCurrencyINR(amount: number, compact: boolean = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  
  if (compact) {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} Lakh`;
    }
    if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}k`;
    }
  }

  // Standard Indian comma format (xx,xx,xxx)
  const isNegative = amount < 0;
  const absVal = Math.abs(Math.round(amount)).toString();
  
  let lastThree = absVal.substring(absVal.length - 3);
  const otherNumbers = absVal.substring(0, absVal.length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
  
  return `${isNegative ? '-' : ''}₹${formatted}`;
}
