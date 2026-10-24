'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { dataStore } from '@/lib/data-store';
import { getKeralaOnRoadBreakdown, formatCurrencyINR } from '@/lib/kerala-tax';
import { FuelType } from '@/types';
import { 
  Calculator, 
  ShieldCheck, 
  Sparkles, 
  Info, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  TrendingDown,
  Car
} from 'lucide-react';

export function TrueOnRoadCalculator() {
  const { t, setActiveTab, setIsCreateGroupOpen } = useApp();
  const cars = dataStore.getCars();

  const [selectedCarId, setSelectedCarId] = useState(cars[0].id);
  const selectedCar = cars.find(c => c.id === selectedCarId) || cars[0];
  
  const [selectedVariantId, setSelectedVariantId] = useState(selectedCar.variants[0].id);
  const selectedVariant = selectedCar.variants.find(v => v.id === selectedVariantId) || selectedCar.variants[0];

  const [exShowroom, setExShowroom] = useState<number>(selectedVariant.exShowroomPrice);
  const [fuelType, setFuelType] = useState<FuelType>(selectedVariant.fuelType);
  const [includeZeroDep, setIncludeZeroDep] = useState(true);
  const [includeRTI, setIncludeRTI] = useState(true);
  const [includeEngineProtect, setIncludeEngineProtect] = useState(true);
  const [includeAccessories, setIncludeAccessories] = useState(true);

  // When car changes, update variant & price
  const handleCarChange = (carId: string) => {
    setSelectedCarId(carId);
    const car = cars.find(c => c.id === carId);
    if (car) {
      setSelectedVariantId(car.variants[0].id);
      setExShowroom(car.variants[0].exShowroomPrice);
      setFuelType(car.variants[0].fuelType);
    }
  };

  const handleVariantChange = (variantId: string) => {
    setSelectedVariantId(variantId);
    const variant = selectedCar.variants.find(v => v.id === variantId);
    if (variant) {
      setExShowroom(variant.exShowroomPrice);
      setFuelType(variant.fuelType);
    }
  };

  const breakdown = getKeralaOnRoadBreakdown(exShowroom, fuelType, {
    includeZeroDep,
    includeRTI,
    includeEngineProtect,
    includeAccessories
  });

  const estimatedGroupNegotiatedDiscount = Math.round(
    Math.min(140000, Math.max(50000, exShowroom * 0.045))
  );

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
            <Calculator className="w-3.5 h-3.5" />
            True On-Road Price Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Kerala RTO Road Tax & On-Road Calculator
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            Compute official Kerala Motor Vehicles Department (MVD) tax slabs, mandatory TCS, and compare individual walk-in showroom prices against collective quorum offers.
          </p>
        </div>

        {/* 2-Column Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Inputs Configurator */}
          <div className="lg:col-span-6 bg-slate-50/80 p-6 sm:p-8 rounded-3xl border border-slate-200/90 space-y-6">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-200">
              Vehicle & Configuration
            </h3>

            {/* Car Model Select */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Select Vehicle</label>
              <select
                value={selectedCarId}
                onChange={(e) => handleCarChange(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                {cars.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.make} {c.model} (Starts {formatCurrencyINR(c.startingPrice, true)})
                  </option>
                ))}
              </select>
            </div>

            {/* Variant Select */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Select Variant</label>
              <select
                value={selectedVariantId}
                onChange={(e) => handleVariantChange(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                {selectedCar.variants.map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name} — {formatCurrencyINR(v.exShowroomPrice)}
                  </option>
                ))}
              </select>
            </div>

            {/* Fuel Type & Ex-Showroom Input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Fuel / Powertrain</label>
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value as FuelType)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                >
                  <option value="PETROL">Petrol</option>
                  <option value="DIESEL">Diesel</option>
                  <option value="EV">Electric (EV - 5% Tax Concession)</option>
                  <option value="STRONG_HYBRID">Strong Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Ex-Showroom Price (₹)</label>
                <input
                  type="number"
                  value={exShowroom}
                  onChange={(e) => setExShowroom(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>
            </div>

            {/* Optional Insurance & Accessories Toggles */}
            <div className="pt-2 border-t border-slate-200 space-y-3">
              <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Insurance Add-ons & Accessories
              </span>

              <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-xs cursor-pointer hover:bg-slate-100/50 transition-colors">
                <div>
                  <div className="font-semibold text-slate-800">Zero Depreciation Cover</div>
                  <div className="text-[11px] text-slate-500">100% claim settlement without fiberglass/plastic deductions</div>
                </div>
                <input
                  type="checkbox"
                  checked={includeZeroDep}
                  onChange={(e) => setIncludeZeroDep(e.target.checked)}
                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-xs cursor-pointer hover:bg-slate-100/50 transition-colors">
                <div>
                  <div className="font-semibold text-slate-800">Return to Invoice (RTI)</div>
                  <div className="text-[11px] text-slate-500">Covers 100% original on-road purchase price in case of total loss or theft</div>
                </div>
                <input
                  type="checkbox"
                  checked={includeRTI}
                  onChange={(e) => setIncludeRTI(e.target.checked)}
                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-xs cursor-pointer hover:bg-slate-100/50 transition-colors">
                <div>
                  <div className="font-semibold text-slate-800">Engine & Gearbox Protection</div>
                  <div className="text-[11px] text-slate-500">Protection against water ingress/hydrostatic lock during Kerala monsoons</div>
                </div>
                <input
                  type="checkbox"
                  checked={includeEngineProtect}
                  onChange={(e) => setIncludeEngineProtect(e.target.checked)}
                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 text-xs cursor-pointer hover:bg-slate-100/50 transition-colors">
                <div>
                  <div className="font-semibold text-slate-800">Recommended Genuine Accessories</div>
                  <div className="text-[11px] text-slate-500">All-weather floor mats, mud flaps, dashcam, body cover</div>
                </div>
                <input
                  type="checkbox"
                  checked={includeAccessories}
                  onChange={(e) => setIncludeAccessories(e.target.checked)}
                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
              </label>
            </div>

          </div>

          {/* Right Live Itemized Results Breakdown */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-lg">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Official Kerala Tax Estimate</span>
                  <h3 className="text-xl font-extrabold text-slate-900">{selectedCar.make} {selectedCar.model}</h3>
                  <p className="text-xs text-slate-500">{selectedVariant.name}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    Slab: {breakdown.taxSlabPercentage}% {fuelType === 'EV' ? '(EV Concession)' : ''}
                  </span>
                </div>
              </div>

              {/* Line items list */}
              <div className="space-y-3 text-xs mb-6">
                <div className="flex justify-between text-slate-700">
                  <span>Ex-Showroom Price</span>
                  <span className="font-bold text-slate-900">{formatCurrencyINR(breakdown.exShowroom)}</span>
                </div>

                <div className="flex justify-between text-slate-700">
                  <span className="flex items-center gap-1">
                    Kerala Road Tax (MVD {breakdown.taxSlabPercentage}%)
                    <Info className="w-3 h-3 text-slate-400" />
                  </span>
                  <span className="font-bold text-slate-900">{formatCurrencyINR(breakdown.roadTax)}</span>
                </div>

                <div className="flex justify-between text-slate-700">
                  <span>Kerala Road Safety Cess (1%)</span>
                  <span className="font-semibold text-slate-900">{formatCurrencyINR(breakdown.roadSafetyCess)}</span>
                </div>

                {breakdown.tcs > 0 && (
                  <div className="flex justify-between text-slate-700">
                    <span className="flex items-center gap-1">
                      TCS (1% under Sec 206C(1F) for &gt;₹10L)
                      <Info className="w-3 h-3 text-slate-400" />
                    </span>
                    <span className="font-semibold text-slate-900">{formatCurrencyINR(breakdown.tcs)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-700">
                  <span>Fastag + RTO Registration Formalities</span>
                  <span className="font-semibold text-slate-900">{formatCurrencyINR(breakdown.fastag + breakdown.registrationHypothecation)}</span>
                </div>

                <div className="flex justify-between text-slate-700">
                  <span>Total Estimated Comprehensive Insurance</span>
                  <span className="font-semibold text-slate-900">{formatCurrencyINR(breakdown.totalEstimatedInsurance)}</span>
                </div>

                {breakdown.recommendedAccessories > 0 && (
                  <div className="flex justify-between text-slate-700">
                    <span>Genuine Accessories Pack</span>
                    <span className="font-semibold text-slate-900">{formatCurrencyINR(breakdown.recommendedAccessories)}</span>
                  </div>
                )}
              </div>

              {/* Final On-Road Box */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white mb-6">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span>Standard Walk-in On-Road Showroom Price:</span>
                  <span className="line-through">{formatCurrencyINR(breakdown.estimatedStandardOnRoad)}</span>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                      Effective GroupDrive Quorum Price:
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-white">
                      {formatCurrencyINR(breakdown.estimatedStandardOnRoad - estimatedGroupNegotiatedDiscount)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-emerald-500/20 text-emerald-300 font-bold text-xs px-2.5 py-1 rounded-lg border border-emerald-500/30">
                      Save ~{formatCurrencyINR(estimatedGroupNegotiatedDiscount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => setIsCreateGroupOpen(true)}
                  className="w-full sm:flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                  Start Quorum for this Variant
                </button>

                <button
                  onClick={() => setActiveTab('groups')}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
                >
                  Browse Existing Groups
                </button>
              </div>

            </div>

            {/* Verification Note */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 leading-relaxed">
              <strong>Source Notice:</strong> Slabs verified as per {breakdown.ruleSource}. Last reviewed {breakdown.lastVerifiedDate}. Individual dealership handling or logistics fees are not sanctioned statutory charges.
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
