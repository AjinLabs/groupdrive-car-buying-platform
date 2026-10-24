'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { dataStore } from '@/lib/data-store';
import { formatCurrencyINR } from '@/lib/kerala-tax';
import { 
  Users, 
  Car, 
  FileText, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  TrendingUp, 
  Building2, 
  PlusCircle,
  Eye,
  Settings
} from 'lucide-react';

interface DashboardViewProps {
  onOpenTestDriveModal: (carId: string, carName: string, dealerId: string, dealerName: string) => void;
  onOpenSubmitQuoteModal: (groupId: string) => void;
}

export function DashboardView({ onOpenTestDriveModal, onOpenSubmitQuoteModal }: DashboardViewProps) {
  const { currentRole, setActiveTab, setSelectedGroupIdForQuotes, setIsCreateGroupOpen } = useApp();
  
  const groups = dataStore.getGroups();
  const quotations = dataStore.getQuotations();
  const testDrives = dataStore.getTestDrives();
  const stats = dataStore.getPlatformStats();
  const dealerships = dataStore.getDealerships();

  // Test drive status update state for dealer
  const [localTestDrives, setLocalTestDrives] = useState(testDrives);

  const handleUpdateTestDriveStatus = (id: string, newStatus: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED') => {
    dataStore.updateTestDriveStatus(id, newStatus);
    setLocalTestDrives([...dataStore.getTestDrives()]);
  };

  return (
    <div className="py-12 bg-[#F8F9FB] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                Persona: {currentRole}
              </span>
              <span className="text-xs text-slate-500">
                Kerala Automotive Quorum
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {currentRole === 'BUYER' && 'Buyer Workspace — Rahul Menon'}
              {currentRole === 'GROUP_ORGANIZER' && 'Quorum Organizer — Ananya Nair'}
              {currentRole === 'DEALER_STAFF' && 'Authorized Dealership Portal — Popular Hyundai'}
              {currentRole === 'PLATFORM_ADMIN' && 'Platform Administration — GroupDrive HQ'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {currentRole === 'DEALER_STAFF' ? (
              <button
                onClick={() => onOpenSubmitQuoteModal(groups[0].id)}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Submit New Quorum Quote
              </button>
            ) : (
              <button
                onClick={() => setIsCreateGroupOpen(true)}
                className="px-4 py-2.5 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5 text-blue-400" />
                Create New Quorum
              </button>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* BUYER VIEW */}
        {/* ------------------------------------------------------------------ */}
        {currentRole === 'BUYER' && (
          <div className="space-y-8">
            
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-medium">My Joined Groups</div>
                <div className="text-2xl font-black text-slate-900 mt-1">1 Active</div>
                <div className="text-[11px] text-blue-600 mt-1 font-semibold">Hyundai Creta (Kochi)</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-medium">Dealer Quotes In</div>
                <div className="text-2xl font-black text-emerald-600 mt-1">3 Offers</div>
                <div className="text-[11px] text-slate-400 mt-1">Starting from ₹24.62 Lakh</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-medium">Upcoming Test Drives</div>
                <div className="text-2xl font-black text-blue-600 mt-1">1 Scheduled</div>
                <div className="text-[11px] text-slate-500 mt-1">Popular Hyundai Doorstep</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-medium">Estimated Quorum Benefit</div>
                <div className="text-2xl font-black text-slate-900 mt-1">₹98,500</div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">vs Walk-in Single Buyer</div>
              </div>
            </div>

            {/* My Active Quorum Card */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Active Membership</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                    GD-KL-CRETA-01 — Hyundai Creta SX(O) Turbo
                  </h3>
                  <p className="text-xs text-slate-500">Joined April 10, 2026 • Target Delivery: Within 20 days</p>
                </div>

                <button
                  onClick={() => {
                    setSelectedGroupIdForQuotes('grp-creta-kochi-01');
                    setActiveTab('quotes');
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Compare 3 Received Dealer Quotes
                </button>
              </div>

              {/* Quorum Progress visual */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">14 of 15 Verified Buyers Joined (93% Quorum Target Reached)</span>
                  <span className="text-emerald-600">Dealership Bidding Open</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full" style={{ width: '93%' }} />
                </div>
              </div>

              {/* Scheduled Test Drive Pill */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Doorstep Test Drive Confirmed with Popular Hyundai</div>
                    <div className="text-[11px] text-slate-500">April 26, 2026 • 11:00 AM • Panampilly Nagar, Kochi</div>
                  </div>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                  Confirmed
                </span>
              </div>
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* GROUP ORGANIZER VIEW */}
        {/* ------------------------------------------------------------------ */}
        {currentRole === 'GROUP_ORGANIZER' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Lead Organizer Workspace</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                    GD-KL-NEXONEV-04 — Tata Nexon.ev Long Range Quorum
                  </h3>
                  <p className="text-xs text-slate-500">Thiruvananthapuram District • 8 of 10 Verified Buyers</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold">
                  Gathering Buyers (2 slots remaining)
                </span>
              </div>

              {/* Roster of members with privacy protection */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Verified Quorum Members (Contact Privacy Masked)
                </h4>

                <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
                  {[
                    { name: 'Ananya Nair (Organizer)', phone: '+91 98950 *****', variant: 'Empowered Plus 45 kWh', budget: '₹19 Lakh', timeline: 'Within 30 days' },
                    { name: 'Siddharth V.', phone: '+91 94470 *****', variant: 'Empowered Plus 45 kWh', budget: '₹19.5 Lakh', timeline: 'Within 15 days' },
                    { name: 'Priya Rajan', phone: '+91 97441 *****', variant: 'Fearless Plus 45 kWh', budget: '₹18 Lakh', timeline: 'Within 30 days' },
                    { name: 'Manoj Kumar', phone: '+91 98460 *****', variant: 'Empowered Plus 45 kWh', budget: '₹19 Lakh', timeline: 'Immediate' },
                  ].map((m, idx) => (
                    <div key={idx} className="p-3.5 bg-white flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-900">{m.name}</div>
                        <div className="text-[11px] text-slate-400">{m.phone} • {m.variant}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-slate-800">{m.budget}</div>
                        <div className="text-[10px] text-slate-400">{m.timeline}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* DEALER VIEW */}
        {/* ------------------------------------------------------------------ */}
        {currentRole === 'DEALER_STAFF' && (
          <div className="space-y-8">
            
            {/* Dealer Status Header */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900">Popular Hyundai Kochi</h3>
                    <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded border border-purple-200">
                      ★ Platinum Verified Dealer
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">GSTIN: 32AABCP1234D1Z5 • Authorized Hyundai Sales Head</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="text-center p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Total Quotes</div>
                  <div className="text-base font-extrabold text-slate-900">142</div>
                </div>
                <div className="text-center p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Closed Deals</div>
                  <div className="text-base font-extrabold text-emerald-600">38 Quorums</div>
                </div>
              </div>
            </div>

            {/* Test Drive Requests Coordinator */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Car className="w-4 h-4 text-blue-600" />
                Incoming Test Drive Requests
              </h3>

              <div className="space-y-3">
                {localTestDrives.map((td) => (
                  <div key={td.id} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{td.userName}</span>
                        <span className="text-xs text-slate-500">({td.userPhone})</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                          {td.preferredLocation}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Vehicle: <strong>{td.carName}</strong> • {td.preferredDate} ({td.preferredTimeSlot})
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Address: {td.address}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        td.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {td.status}
                      </span>

                      {td.status === 'REQUESTED' && (
                        <button
                          onClick={() => handleUpdateTestDriveStatus(td.id, 'CONFIRMED')}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold"
                        >
                          Confirm Slot
                        </button>
                      )}

                      {td.status === 'CONFIRMED' && (
                        <button
                          onClick={() => handleUpdateTestDriveStatus(td.id, 'COMPLETED')}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white rounded-lg text-xs font-semibold"
                        >
                          Mark Completed
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* PLATFORM ADMIN VIEW */}
        {/* ------------------------------------------------------------------ */}
        {currentRole === 'PLATFORM_ADMIN' && (
          <div className="space-y-8">
            {/* High Level Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-medium">Total Quoted Volume</div>
                <div className="text-2xl font-black text-slate-900 mt-1">₹{stats.totalQuotedVolumeCr} Crores</div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">Across 14 Kerala Districts</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-medium">Verified Active Buyers</div>
                <div className="text-2xl font-black text-blue-600 mt-1">{stats.activeBuyers}</div>
                <div className="text-[11px] text-slate-400 mt-1">Zero advance fee collected</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-medium">Authorized Dealerships</div>
                <div className="text-2xl font-black text-slate-900 mt-1">{dealerships.length} Showrooms</div>
                <div className="text-[11px] text-purple-600 font-semibold mt-1">100% License Audited</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs text-slate-500 font-medium">Prohibited Charges Flagged</div>
                <div className="text-2xl font-black text-amber-600 mt-1">1 Quote</div>
                <div className="text-[11px] text-amber-700 font-medium mt-1">Pothens (Handling fee detected)</div>
              </div>
            </div>

            {/* Dealership Verification Table */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Participating OEM Dealership Network
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="p-3">Dealership Name</th>
                      <th className="p-3">Brand</th>
                      <th className="p-3">Kerala District</th>
                      <th className="p-3">GSTIN</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Submitted Quotes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {dealerships.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-50/60">
                        <td className="p-3 font-bold text-slate-900">{d.name}</td>
                        <td className="p-3 font-semibold text-blue-600">{d.brand}</td>
                        <td className="p-3 text-slate-600">{d.district}</td>
                        <td className="p-3 font-mono text-slate-500">{d.verification.gstin}</td>
                        <td className="p-3">
                          <span className="font-bold text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            ★ {d.verification.verificationBadge}
                          </span>
                        </td>
                        <td className="p-3 font-bold text-slate-900">{d.totalQuotesSubmitted} Quotes</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
