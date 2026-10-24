'use client';

import React from 'react';
import { Car } from '@/types';
import { getKeralaOnRoadBreakdown, formatCurrencyINR } from '@/lib/kerala-tax';
import { X, ShieldCheck, Zap, Fuel, Calendar, Users, ArrowRight } from 'lucide-react';

interface CarDetailModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
  onJoinQuorum: (car: Car) => void;
}

export function CarDetailModal({ car, isOpen, onClose, onJoinQuorum }: CarDetailModalProps) {
  if (!isOpen || !car) return null;

  const breakdown = getKeralaOnRoadBreakdown(car.startingPrice, car.fuelOptions[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            {car.make}
          </span>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight">
            {car.model}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {car.tagline}
          </p>
        </div>

        {/* Car Image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 mb-6 border border-slate-100">
          <img src={car.image} alt={car.model} className="w-full h-full object-cover" />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-slate-900/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
              {car.bodyType}
            </span>
            <span className="bg-blue-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
              {car.fuelOptions.join(' • ')}
            </span>
          </div>
        </div>

        {/* Specifications Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 mb-6 text-center">
          <div>
            <div className="text-xs font-bold text-slate-900">{car.variants[0].claimedMileageOrRange}</div>
            <div className="text-[10px] text-slate-400">Claimed Efficiency</div>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">{car.acceleration0to100 || '8.9s'}</div>
            <div className="text-[10px] text-slate-400">0-100 km/h</div>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">{car.bootSpace || '433 L'}</div>
            <div className="text-[10px] text-slate-400">Boot Space</div>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">{car.groundClearance || '190 mm'}</div>
            <div className="text-[10px] text-slate-400">Ground Clr</div>
          </div>
        </div>

        {/* Variants List */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Available Kerala Variants & Pricing
          </h4>

          <div className="space-y-2">
            {car.variants.map((v) => {
              const varBreakdown = getKeralaOnRoadBreakdown(v.exShowroomPrice, v.fuelType);
              return (
                <div key={v.id} className="p-3.5 rounded-2xl border border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-xs text-slate-900">{v.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {v.transmission} • {v.fuelType} • {v.keyFeatures.slice(0, 2).join(', ')}
                    </div>
                  </div>

                  <div className="text-right sm:text-right">
                    <div className="font-black text-sm text-slate-900">
                      {formatCurrencyINR(v.exShowroomPrice)}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Est. On-Road: <strong>{formatCurrencyINR(varBreakdown.estimatedStandardOnRoad)}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Starts from</div>
            <div className="text-xl font-extrabold text-slate-900">{formatCurrencyINR(car.startingPrice, true)}</div>
          </div>

          <button
            onClick={() => {
              onClose();
              onJoinQuorum(car);
            }}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold shadow-md transition-all flex items-center gap-2"
          >
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>Join Quorum for {car.model}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
