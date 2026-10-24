'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  MapPin, 
  Users, 
  TrendingDown, 
  Award, 
  Zap,
  Building2
} from 'lucide-react';
import { formatCurrencyINR } from '@/lib/kerala-tax';

export function Hero() {
  const { t, setActiveTab, setIsCreateGroupOpen } = useApp();
  
  // Quick Finder state
  const [selectedModel, setSelectedModel] = useState('Creta');
  const [selectedDistrict, setSelectedDistrict] = useState('Ernakulam (Kochi)');
  const [budgetRange, setBudgetRange] = useState('15 - 25 Lakh');

  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200 pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background soft ambient gradient */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -z-10 w-80 h-80 bg-indigo-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-medium shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Group Purchasing for Automobiles</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero Advance Deposit • Direct Dealership Billing</span>
          </div>
        </div>

        {/* Main Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Editorial Copy */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              {t.hero.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t.hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => setActiveTab('groups')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-black text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
              >
                <span>{t.hero.ctaSecondary}</span>
                <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab('cars')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>{t.hero.ctaPrimary}</span>
              </button>
            </div>

            {/* Quick Matchmaker Card */}
            <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-slate-50/90 border border-slate-200/90 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-blue-600" />
                  Instant Quorum Matcher
                </span>
                <span className="text-[11px] text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                  Live in Kerala
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Car Model</label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Creta">Hyundai Creta 2026</option>
                    <option value="Nexon.ev">Tata Nexon.ev Long Range</option>
                    <option value="Hycross">Toyota Innova Hycross</option>
                    <option value="Virtus">Volkswagen Virtus GT</option>
                    <option value="XUV700">Mahindra XUV700</option>
                    <option value="Thar">Mahindra Thar ROXX</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Kerala District</label>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Ernakulam (Kochi)">Ernakulam (Kochi)</option>
                    <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                    <option value="Kozhikode">Kozhikode</option>
                    <option value="Thrissur">Thrissur</option>
                    <option value="Kottayam">Kottayam</option>
                    <option value="Kannur">Kannur</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Target Budget</label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="10 - 15 Lakh">₹10 Lakh - ₹15 Lakh</option>
                    <option value="15 - 25 Lakh">₹15 Lakh - ₹25 Lakh</option>
                    <option value="25 - 40 Lakh">₹25 Lakh - ₹40 Lakh</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200/60">
                <div className="text-xs text-slate-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Found <strong>14 verified buyers</strong> in active quorum for {selectedModel} in {selectedDistrict}</span>
                </div>
                <button
                  onClick={() => setActiveTab('groups')}
                  className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors whitespace-nowrap"
                >
                  Join This Quorum
                </button>
              </div>
            </div>

            {/* Micro disclaimer */}
            <p className="text-[11px] text-slate-500 italic">
              * {t.hero.indicativeNote}
            </p>
          </div>

          {/* Right Hero Visual Card (Tesla / Luxeon Style) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-8 text-white shadow-2xl border border-slate-800 overflow-hidden">
              
              {/* Subtle top badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold tracking-wider uppercase text-emerald-400">
                    Live Dealership Quoting
                  </span>
                </div>
                <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
                  GD-KL-CRETA-01
                </span>
              </div>

              {/* Vehicle Title & Specs Header */}
              <div className="space-y-1 mb-4">
                <h3 className="text-2xl font-bold tracking-tight text-white">
                  Hyundai Creta 2026
                </h3>
                <p className="text-xs text-slate-400">
                  SX(O) 1.5 Turbo Petrol DCT • Ernakulam Quorum
                </p>
              </div>

              {/* Pristine Vehicle Image */}
              <div className="relative my-4 aspect-[16/10] overflow-hidden rounded-2xl bg-slate-800/40 border border-slate-700/50 flex items-center justify-center group">
                <img
                  src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop"
                  alt="Hyundai Creta"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Floating On-Road Benefit Badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-md p-3 rounded-xl border border-slate-700 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Group Offer (Popular Hyundai)</div>
                    <div className="text-base font-extrabold text-white">₹24,62,532 <span className="text-xs font-normal text-slate-400 line-through">₹25,61,000</span></div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-emerald-500/20 text-emerald-300 font-bold text-xs px-2 py-0.5 rounded border border-emerald-500/30">
                      ₹98,500 Quoted Savings
                    </span>
                  </div>
                </div>
              </div>

              {/* Quorum Progress Bar */}
              <div className="space-y-2 mt-4 pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-400" />
                    <strong>14 of 15 Buyers Joined</strong>
                  </span>
                  <span className="text-blue-400 font-semibold">93% Threshold</span>
                </div>
                
                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5">
                  <div className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transition-all duration-1000" style={{ width: '93%' }} />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Closing in: <strong>3 Days</strong></span>
                  <span className="text-slate-300">3 Dealer Quotes In</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  setActiveTab('quotes');
                }}
                className="w-full mt-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide uppercase transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>Compare Competing Dealer Quotes</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Verified Dealership Network Marquee */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
            Verified Participating Dealerships in Kerala
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
            {[
              { name: 'Popular Hyundai', city: 'Kochi & Vyttila', brand: 'Hyundai' },
              { name: 'Nippon Toyota', city: 'Kalamassery', brand: 'Toyota' },
              { name: 'KVR Tata Motors', city: 'Kozhikode', brand: 'Tata.ev' },
              { name: 'EVM Volkswagen', city: 'Cheranalloor', brand: 'Volkswagen' },
              { name: 'Pothens Auto', city: 'Trivandrum', brand: 'Hyundai' },
              { name: 'Rajasree Motors', city: 'Kochi & Aluva', brand: 'Luxury OEM' },
            ].map((d, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl border border-slate-200/70 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all text-center"
              >
                <div className="font-bold text-xs text-slate-800">{d.name}</div>
                <div className="text-[10px] text-slate-500">{d.city}</div>
                <div className="mt-1 text-[9px] font-semibold text-blue-600 uppercase tracking-wider">{d.brand} Authorized</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
