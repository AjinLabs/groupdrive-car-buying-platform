'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { BuyerGroup, GroupStatus } from '@/types';
import { dataStore } from '@/lib/data-store';
import { formatCurrencyINR } from '@/lib/kerala-tax';
import { 
  Users, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  ArrowRight, 
  PlusCircle, 
  FileText, 
  Sparkles,
  Clock,
  Car
} from 'lucide-react';

interface LiveGroupsSectionProps {
  onSelectGroupForQuotes?: (groupId: string) => void;
  onOpenJoinModal?: (group: BuyerGroup) => void;
}

export function LiveGroupsSection({ onSelectGroupForQuotes, onOpenJoinModal }: LiveGroupsSectionProps) {
  const { t, setActiveTab, setSelectedGroupIdForQuotes, setIsCreateGroupOpen } = useApp();
  const [selectedDistrict, setSelectedDistrict] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const allGroups = dataStore.getGroups();

  const filteredGroups = allGroups.filter(g => {
    if (selectedDistrict !== 'ALL' && g.district !== selectedDistrict) return false;
    if (selectedStatus !== 'ALL' && g.status !== selectedStatus) return false;
    return true;
  });

  const districts = ['ALL', 'Ernakulam (Kochi)', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kottayam', 'Kannur'];

  const getStatusBadge = (status: GroupStatus) => {
    switch (status) {
      case 'READY_FOR_QUOTES':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {t.groupStatus.READY_FOR_QUOTES}
          </span>
        );
      case 'QUOTES_RECEIVED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <FileText className="w-3 h-3 text-blue-600" />
            {t.groupStatus.QUOTES_RECEIVED}
          </span>
        );
      case 'GATHERING_BUYERS':
      case 'OPEN':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            {t.groupStatus.GATHERING_BUYERS}
          </span>
        );
    }
  };

  return (
    <section className="py-16 bg-[#F8F9FB] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Collective Buyer Demand
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Active Kerala Buyer Groups
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Real-time quorums of verified car buyers in Kerala uniting to invite competitive dealership quotes.
            </p>
          </div>

          <button
            onClick={() => setIsCreateGroupOpen(true)}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-black text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4 text-blue-400" />
            Start a New Quorum
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-slate-200">
          <span className="text-xs font-semibold text-slate-500 mr-2 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            District:
          </span>
          {districts.map(d => (
            <button
              key={d}
              onClick={() => setSelectedDistrict(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedDistrict === d
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {d === 'ALL' ? 'All Kerala' : d}
            </button>
          ))}
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredGroups.map(group => {
            const percentFilled = Math.min(100, Math.round((group.currentMembers / group.targetMembers) * 100));
            const quotes = dataStore.getQuotesByGroupId(group.id);

            return (
              <div 
                key={group.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 luxury-card flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar with Code & Status */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                      {group.code}
                    </span>
                    {getStatusBadge(group.status)}
                  </div>

                  {/* Car Image & Title */}
                  <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-100 mb-4 border border-slate-100 group">
                    <img 
                      src={group.carImage} 
                      alt={group.carModel}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-blue-400" />
                      {group.district}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    {group.carMake} {group.carModel}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1 mb-4">
                    Preferred: {group.targetVariantName}
                  </p>

                  {/* Quorum Progress Bar */}
                  <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-blue-600" />
                        {group.currentMembers} of {group.targetMembers} Verified Buyers
                      </span>
                      <span className="font-bold text-slate-900">{percentFilled}%</span>
                    </div>

                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentFilled}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                      <span>Delivery: {group.estimatedDeliveryWindow}</span>
                      <span>Target Quorum: {group.targetMembers}</span>
                    </div>
                  </div>

                  {/* Indicative Savings & Quote Count */}
                  <div className="flex items-center justify-between text-xs py-2 px-3 rounded-lg bg-emerald-50/70 border border-emerald-100 text-emerald-900 mb-4">
                    <div>
                      <div className="text-[10px] text-emerald-700 font-medium">Indicative Quorum Savings</div>
                      <div className="font-bold">{formatCurrencyINR(group.indicativeMinSavings)} - {formatCurrencyINR(group.indicativeMaxSavings)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-emerald-700 font-medium">Dealer Offers</div>
                      <div className="font-bold text-emerald-800">{quotes.length} Quotes In</div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  {quotes.length > 0 ? (
                    <button
                      onClick={() => {
                        setSelectedGroupIdForQuotes(group.id);
                        setActiveTab('quotes');
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Compare {quotes.length} Quotes
                    </button>
                  ) : null}

                  <button
                    onClick={() => {
                      if (onOpenJoinModal) {
                        onOpenJoinModal(group);
                      }
                    }}
                    className={`py-2.5 px-4 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                      quotes.length > 0
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                        : 'flex-1 bg-slate-900 hover:bg-black text-white shadow-sm'
                    }`}
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
    </section>
  );
}
