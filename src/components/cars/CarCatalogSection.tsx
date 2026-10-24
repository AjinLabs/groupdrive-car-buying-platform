'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Car, FuelType, BodyType } from '@/types';
import { dataStore } from '@/lib/data-store';
import { formatCurrencyINR, getKeralaOnRoadBreakdown } from '@/lib/kerala-tax';
import { 
  Search, 
  Filter, 
  Fuel, 
  Gauge, 
  Zap, 
  ShieldCheck, 
  Users, 
  ArrowRight,
  Eye,
  SlidersHorizontal,
  Plus
} from 'lucide-react';

interface CarCatalogSectionProps {
  onSelectCarForBreakdown: (car: Car) => void;
  onJoinGroupForCar: (car: Car) => void;
}

export function CarCatalogSection({ onSelectCarForBreakdown, onJoinGroupForCar }: CarCatalogSectionProps) {
  const { t } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFuel, setSelectedFuel] = useState<string>('ALL');
  const [selectedBody, setSelectedBody] = useState<string>('ALL');
  const [maxBudget, setMaxBudget] = useState<number>(3500000);

  const allCars = dataStore.getCars();

  const filteredCars = allCars.filter(car => {
    if (searchTerm && !car.make.toLowerCase().includes(searchTerm.toLowerCase()) && !car.model.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    if (selectedFuel !== 'ALL' && !car.fuelOptions.includes(selectedFuel as FuelType)) {
      return false;
    }
    if (selectedBody !== 'ALL' && car.bodyType !== selectedBody) {
      return false;
    }
    if (car.startingPrice > maxBudget) {
      return false;
    }
    return true;
  });

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Kerala Automotive Catalogue
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Explore Vehicles & Active Buyer Quorums
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Prices verified with Kerala Motor Vehicles Department (MVD) tax slabs and IRDAI insurance guidelines.
          </p>
        </div>

        {/* Main Grid: Filters Sidebar (Tesla Style) + Vehicles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Filters Sidebar */}
          <div className="lg:col-span-3 bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80 space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
                Refine Search
              </span>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedFuel('ALL');
                  setSelectedBody('ALL');
                  setMaxBudget(3500000);
                }}
                className="text-[11px] font-semibold text-blue-600 hover:text-blue-800"
              >
                Reset All
              </button>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Search Model</label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Creta, Nexon, Hycross..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Fuel Type Pills */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Powertrain</label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'ALL', label: 'All Types' },
                  { id: 'EV', label: '⚡ Electric (EV)' },
                  { id: 'PETROL', label: 'Petrol' },
                  { id: 'DIESEL', label: 'Diesel' },
                  { id: 'STRONG_HYBRID', label: 'Strong Hybrid' }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFuel(f.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-all ${
                      selectedFuel === f.id
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Body Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Body Style</label>
              <div className="flex flex-wrap gap-1.5">
                {['ALL', 'SUV', 'SEDAN', 'MPV'].map(b => (
                  <button
                    key={b}
                    onClick={() => setSelectedBody(b)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedBody === b
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {b === 'ALL' ? 'All Styles' : b}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <label className="font-semibold text-slate-700">Max Ex-Showroom</label>
                <span className="font-bold text-blue-600">{formatCurrencyINR(maxBudget, true)}</span>
              </div>
              <input
                type="range"
                min="1000000"
                max="3500000"
                step="100000"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>₹10 Lakh</span>
                <span>₹35 Lakh</span>
              </div>
            </div>

            {/* Disclaimer pill */}
            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-[11px] text-blue-900 leading-relaxed">
              💡 <strong>Kerala Tax Tip:</strong> Electric Vehicles (like Tata Nexon.ev) enjoy a special <strong>5% flat road tax</strong> under Kerala EV Policy, compared to 16%-21% for standard fuel engines.
            </div>

          </div>

          {/* Right Vehicle Cards Grid (Tesla Inventory Style) */}
          <div className="lg:col-span-9 space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
              <span>Showing <strong>{filteredCars.length}</strong> vehicles matching criteria</span>
              <span className="font-semibold text-slate-700">Prices in Indian Rupee (₹)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCars.map(car => {
                const onRoadEst = getKeralaOnRoadBreakdown(car.startingPrice, car.fuelOptions[0]);
                const activeGroups = dataStore.getGroups().filter(g => g.carId === car.id);

                return (
                  <div
                    key={car.id}
                    className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden luxury-card flex flex-col justify-between"
                  >
                    <div>
                      {/* Studio Vehicle Photography */}
                      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden group">
                        <img
                          src={car.image}
                          alt={car.model}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        
                        {/* Top Badges */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          <span className="bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                            {car.bodyType}
                          </span>
                          <span className="bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                            {car.fuelOptions.join(' • ')}
                          </span>
                        </div>

                        {car.ncapSafetyRating && (
                          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm">
                            ★ {car.ncapSafetyRating}-Star NCAP
                          </div>
                        )}
                      </div>

                      {/* Content Info */}
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div>
                            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                              {car.make}
                            </span>
                            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                              {car.model}
                            </h3>
                          </div>

                          <div className="text-right">
                            <div className="text-[10px] font-semibold text-slate-400 uppercase">Starts from</div>
                            <div className="text-lg font-black text-slate-900">
                              {formatCurrencyINR(car.startingPrice, true)}
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-slate-500 line-clamp-1 mb-4">
                          {car.tagline}
                        </p>

                        {/* Kerala On-Road Banner (Tesla Style "After Tax Benefit") */}
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs mb-4">
                          <span className="text-slate-600 font-medium">Est. Kerala On-Road:</span>
                          <span className="font-extrabold text-slate-900">
                            {formatCurrencyINR(onRoadEst.estimatedStandardOnRoad, true)}
                          </span>
                        </div>

                        {/* 3 Metric Dividers (Tesla Style) */}
                        <div className="grid grid-cols-3 divide-x divide-slate-100 py-3 border-y border-slate-100 text-center mb-4">
                          <div>
                            <div className="text-xs font-bold text-slate-900">{car.variants[0].claimedMileageOrRange}</div>
                            <div className="text-[10px] text-slate-400">Claimed Efficiency</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">{car.acceleration0to100 || '8.9s'}</div>
                            <div className="text-[10px] text-slate-400">0-100 km/h</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">{car.groundClearance || '190 mm'}</div>
                            <div className="text-[10px] text-slate-400">Ground Clr</div>
                          </div>
                        </div>

                        {/* Active Group Quorums Pill */}
                        <div className="flex items-center justify-between text-xs py-2 text-slate-600 mb-2">
                          <span className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-blue-600" />
                            <strong>{activeGroups.length} Active Quorums</strong> in Kerala
                          </span>
                          <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                            Quotation Ready
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 pt-0 flex items-center gap-2">
                      <button
                        onClick={() => onSelectCarForBreakdown(car)}
                        className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        Price Breakdown
                      </button>

                      <button
                        onClick={() => onJoinGroupForCar(car)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Users className="w-3.5 h-3.5 text-blue-400" />
                        Join Quorum
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
