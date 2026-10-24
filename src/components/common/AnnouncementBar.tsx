'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { Sparkles, MapPin, ShieldCheck, ArrowRight } from 'lucide-react';

export function AnnouncementBar() {
  const { t, setActiveTab } = useApp();

  return (
    <div className="bg-[#0B1220] text-white text-xs font-medium py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="inline-flex items-center gap-1 bg-blue-600/30 text-blue-300 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-blue-500/30">
            <Sparkles className="w-3 h-3 text-blue-400" />
            Kerala Pilot
          </span>
          <span className="text-slate-300">
            {t.announcement}
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-400 text-[11px]">
          <span className="hidden md:inline-flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Authorized Dealership Quoting
          </span>
          <button 
            onClick={() => setActiveTab('groups')}
            className="hover:text-white transition-colors underline flex items-center gap-1"
          >
            Explore Active Quorums
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
