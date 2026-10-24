'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { dataStore } from '@/lib/data-store';
import { formatCurrencyINR } from '@/lib/kerala-tax';
import { 
  Flame, 
  MapPin, 
  Users, 
  Building2, 
  TrendingUp, 
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export function KeralaDemandHeatmap() {
  const { setActiveTab, setIsCreateGroupOpen } = useApp();
  const districtDemands = dataStore.getKeralaDemands();
  const [selectedDistrict, setSelectedDistrict] = useState(districtDemands[0].district);

  const activeDemand = districtDemands.find(d => d.district === selectedDistrict) || districtDemands[0];

  return (
    <section className="py-16 bg-[#F8F9FB] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 mb-2">
            <Flame className="w-3.5 h-3.5" />
            Demand Visualization
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Kerala District-Wise Car Demand Heatmap
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Anonymized, aggregated buyer quorums across Kerala. When multiple buyers in your district register interest in the same vehicle, authorized local dealerships submit competitive group volume bids.
          </p>
        </div>

        {/* Heatmap Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left District Selector List */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-2">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span>Kerala District</span>
              <span>Active Quorums</span>
            </div>

            <div className="max-h-[420px] overflow-y-auto space-y-1.5 pr-1">
              {districtDemands.map((dist) => {
                const isSelected = dist.district === selectedDistrict;
                return (
                  <button
                    key={dist.district}
                    onClick={() => setSelectedDistrict(dist.district)}
                    className={`w-full p-3 rounded-xl text-left flex items-center justify-between transition-all ${
                      isSelected 
                        ? 'bg-slate-900 text-white shadow-md' 
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                          {dist.district}
                        </div>
                        <div className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                          {dist.activeBuyerCount} verified buyers active
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-xs font-extrabold ${isSelected ? 'text-emerald-400' : 'text-blue-600'}`}>
                        {dist.activeGroupsCount} Groups
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right District Intelligence Panel */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* Header of Active District */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">District Focus</span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  {activeDemand.district}
                </h3>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Active Buyers</div>
                  <div className="text-base font-extrabold text-slate-900">{activeDemand.activeBuyerCount}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Authorized Dealers</div>
                  <div className="text-base font-extrabold text-blue-600">{activeDemand.participatingDealers}</div>
                </div>
              </div>
            </div>

            {/* Top In-Demand Models in this District */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                Highest Quorum Demand in {activeDemand.district}
              </h4>

              <div className="space-y-2.5">
                {activeDemand.topRequestedModels.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-200/80 flex items-center justify-center text-xs font-bold text-slate-700">
                        0{idx + 1}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{item.model}</div>
                        <div className="text-[11px] text-slate-500">{item.count} Active Buyers in Quorum</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] text-slate-400">Avg. Quoted Benefit</div>
                      <div className="text-xs font-bold text-emerald-700">
                        ~{formatCurrencyINR(item.avgSavingsEstimate)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quorum match CTA */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-blue-900 leading-relaxed">
                Looking to buy in <strong>{activeDemand.district}</strong>? Join or trigger a new quorum to invite bids from local authorized dealerships within 50 km.
              </div>
              <button
                onClick={() => setIsCreateGroupOpen(true)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors whitespace-nowrap"
              >
                Start Quorum in {activeDemand.district.split(' ')[0]}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
