'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { dataStore } from '@/lib/data-store';
import { calculateKeralaRoadTax, calculateTCS, formatCurrencyINR } from '@/lib/kerala-tax';
import { X, FileText, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SubmitQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
  onSuccess: () => void;
}

export function SubmitQuoteModal({ isOpen, onClose, groupId, onSuccess }: SubmitQuoteModalProps) {
  if (!isOpen) return null;

  const group = dataStore.getGroupById(groupId) || dataStore.getGroups()[0];
  const car = dataStore.getCarById(group.carId) || dataStore.getCars()[0];
  const variant = car.variants.find(v => v.id === group.targetVariantId) || car.variants[0];

  const dealerships = dataStore.getDealerships();
  const [dealerId, setDealerId] = useState(dealerships[0].id);

  const [exShowroom, setExShowroom] = useState(variant.exShowroomPrice);
  const taxCalc = calculateKeralaRoadTax(exShowroom, variant.fuelType);
  const tcsCalc = calculateTCS(exShowroom);

  const [insuranceAmount, setInsuranceAmount] = useState(Math.round(exShowroom * 0.032));
  const [insuranceProvider, setInsuranceProvider] = useState('HDFC ERGO Comprehensive (Zero Dep + RTI + Engine Protect)');
  const [insuranceCoverage, setInsuranceCoverage] = useState<string[]>([
    'Zero Depreciation',
    'Return to Invoice (RTI)',
    'Engine & Gearbox Protector'
  ]);

  const [logisticsHandlingCharge, setLogisticsHandlingCharge] = useState(0); // Default compliant 0
  const [groupNegotiationDiscount, setGroupNegotiationDiscount] = useState(85000);
  const [deliveryDays, setDeliveryDays] = useState(14);
  const [deliveryTimelineText, setDeliveryTimelineText] = useState('Immediate stock allocation at Kalamassery yard. 14 Days guaranteed.');
  const [submitted, setSubmitted] = useState(false);

  // Live computed total
  const totalPayable = 
    exShowroom + 
    taxCalc.roadTax + 
    taxCalc.roadSafetyCess + 
    tcsCalc + 
    500 + // fastag
    1500 + // reg
    insuranceAmount + 
    logisticsHandlingCharge - 
    groupNegotiationDiscount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dataStore.submitQuotation({
      groupId: group.id,
      dealerId,
      variantId: variant.id,
      exShowroom,
      keralaRoadTax: taxCalc.roadTax,
      roadSafetyCess: taxCalc.roadSafetyCess,
      tcsAmount: tcsCalc,
      fastag: 500,
      registrationHypothecation: 1500,
      insuranceAmount,
      insuranceProvider,
      insuranceCoverage,
      logisticsHandlingCharge,
      logisticsFeeDisclosedReason: logisticsHandlingCharge > 0 ? 'Secondary stock transit' : undefined,
      includedAccessories: ['All Weather 3D Mats', 'Mud Flaps', 'Magnetic Shades'],
      accessoriesAmount: 0,
      extendedWarrantyYears: 2,
      extendedWarrantyAmount: 18500,
      groupNegotiationDiscount,
      deliveryDays,
      deliveryTimelineText,
      validDays: 14
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onSuccess();
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-600 mb-1">
            <Building2 className="w-3.5 h-3.5" />
            Showroom Quotation Desk
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            Submit Itemized Quorum Offer
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Quorum: <strong className="font-mono text-slate-800">{group.code}</strong> • {car.make} {car.model} ({group.district})
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Quotation Published!</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Your itemized offer of {formatCurrencyINR(totalPayable)} is now live in the Quotation Arena for {group.currentMembers} verified buyers to evaluate.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Showroom Select */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Dealership Showroom</label>
              <select
                value={dealerId}
                onChange={(e) => setDealerId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900"
              >
                {dealerships.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.district}) — {d.verification.verificationBadge}
                  </option>
                ))}
              </select>
            </div>

            {/* Ex-Showroom & Road Tax display */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-700">Ex-Showroom Price:</span>
                <span className="font-bold text-slate-900">{formatCurrencyINR(exShowroom)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Kerala Road Tax (MVD {taxCalc.slabPercentage}%):</span>
                <span className="font-semibold text-slate-800">{formatCurrencyINR(taxCalc.roadTax)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-500">
                <span>Road Safety Cess + Fastag + Reg:</span>
                <span className="font-semibold text-slate-800">{formatCurrencyINR(taxCalc.roadSafetyCess + 2000)}</span>
              </div>
              {tcsCalc > 0 && (
                <div className="flex justify-between items-center text-slate-500">
                  <span>TCS (1% Govt):</span>
                  <span className="font-semibold text-slate-800">{formatCurrencyINR(tcsCalc)}</span>
                </div>
              )}
            </div>

            {/* Insurance details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Insurance Amount (₹)</label>
                <input
                  type="number"
                  required
                  value={insuranceAmount}
                  onChange={(e) => setInsuranceAmount(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Logistics / Handling Fee (₹)</label>
                <input
                  type="number"
                  value={logisticsHandlingCharge}
                  onChange={(e) => setLogisticsHandlingCharge(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-slate-900"
                />
                <span className="text-[10px] text-slate-400">Keep ₹0 to ensure 100% compliance score</span>
              </div>
            </div>

            {/* Group Discount Input */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Group Negotiation Volume Discount (₹)</label>
              <input
                type="number"
                required
                value={groupNegotiationDiscount}
                onChange={(e) => setGroupNegotiationDiscount(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-bold text-emerald-700"
              />
            </div>

            {/* Delivery Timeline text */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Guaranteed Delivery Lead Time</label>
              <input
                type="text"
                required
                value={deliveryTimelineText}
                onChange={(e) => setDeliveryTimelineText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium"
              />
            </div>

            {/* Net Total Box */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Net On-Road Price to Buyer:</div>
                <div className="text-2xl font-black">{formatCurrencyINR(totalPayable)}</div>
              </div>
              <div className="text-right">
                <span className="text-emerald-400 font-bold text-xs bg-emerald-500/20 px-2 py-1 rounded">
                  -{formatCurrencyINR(groupNegotiationDiscount)} Off
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-all"
            >
              Publish Quotation to {group.currentMembers} Buyers
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
