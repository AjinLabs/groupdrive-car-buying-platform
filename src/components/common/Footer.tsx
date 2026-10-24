'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { ShieldCheck, Phone, Mail, MapPin, ExternalLink, ArrowUpRight } from 'lucide-react';

export function Footer() {
  const { t, setActiveTab } = useApp();

  return (
    <footer className="bg-[#0B1220] text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-base shadow">
                GD
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                {t.brandName}
              </span>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {t.tagline}. Kerala&apos;s premier collective car buying arena connecting verified buyers with authorized dealerships for transparent, zero-markup on-road pricing.
            </p>

            <div className="pt-2 flex items-center gap-3 text-slate-300 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                Authorized Dealership Quoting Only
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => setActiveTab('cars')} className="hover:text-white transition-colors">
                  {t.nav.exploreCars}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('groups')} className="hover:text-white transition-colors">
                  {t.nav.buyerGroups}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('quotes')} className="hover:text-white transition-colors">
                  Quotation Arena
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calculator')} className="hover:text-white transition-colors">
                  {t.nav.calculator}
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('heatmap')} className="hover:text-white transition-colors">
                  {t.nav.heatmap}
                </button>
              </li>
            </ul>
          </div>

          {/* Pilot Hubs in Kerala */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">
              Kerala Pilot Hubs
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5 text-slate-400">
                <MapPin className="w-3 h-3 text-blue-400" />
                Ernakulam (Kochi & Vyttila)
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <MapPin className="w-3 h-3 text-blue-400" />
                Thiruvananthapuram (Pattom)
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <MapPin className="w-3 h-3 text-blue-400" />
                Kozhikode (Kannur Road)
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <MapPin className="w-3 h-3 text-blue-400" />
                Thrissur (Mannuthy Bypass)
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <MapPin className="w-3 h-3 text-blue-400" />
                Kottayam & Kannur Hubs
              </li>
            </ul>
          </div>

          {/* Concierge & Dealership Enquiries */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-4">
              Dealership Desk
            </h4>
            <div className="space-y-3">
              <p className="text-slate-400 text-xs">
                Are you an authorized OEM dealership in Kerala seeking institutional group orders?
              </p>
              <a 
                href="mailto:dealers@groupdrive.in" 
                className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium"
              >
                dealers@groupdrive.in
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <div className="pt-2 text-slate-500 text-[11px]">
                Support Helpline: +91 484 398 4400 (Mon-Sat, 9am - 7pm IST)
              </div>
            </div>
          </div>

        </div>

        {/* Regulatory & Consumer Protection Disclaimer */}
        <div className="pt-8 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed space-y-2">
          <p>
            <strong>Regulatory & Consumer Protection Notice:</strong> GROUPDRIVE operates as a technology and collective negotiation facilitation platform. GROUPDRIVE does not sell motor vehicles directly, collect vehicle booking deposits, or levy commission markups on statutory road taxes. All vehicle bookings, invoices, warranty documents, and delivery handovers are executed directly between the verified buyer and the authorized manufacturer dealership.
          </p>
          <p>
            Savings estimates are indicative and derived from competing dealership quotations. Handling / logistics charges reported as non-compliant are flagged in accordance with Kerala Motor Vehicles Rules and Apex Court judgments.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
            <div>
              © 2026 GROUPDRIVE India Technologies Pvt. Ltd. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <span className="hover:text-slate-400 cursor-pointer">Privacy Charter</span>
              <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
              <span className="hover:text-slate-400 cursor-pointer">Kerala MVD Slabs</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
