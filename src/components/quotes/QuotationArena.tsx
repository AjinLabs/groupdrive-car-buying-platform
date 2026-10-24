'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { DealerQuotation, BuyerGroup } from '@/types';
import { dataStore } from '@/lib/data-store';
import { formatCurrencyINR } from '@/lib/kerala-tax';
import { analyzeQuotationsDeterministically } from '@/lib/ai-intelligence';
import { 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Car, 
  Calendar, 
  Clock, 
  FileText, 
  ArrowRight,
  TrendingDown,
  Building2,
  Award,
  PlusCircle
} from 'lucide-react';

interface QuotationArenaProps {
  onOpenTestDriveModal: (carId: string, carName: string, dealerId: string, dealerName: string) => void;
  onOpenSubmitQuoteModal: (groupId: string) => void;
}

export function QuotationArena({ onOpenTestDriveModal, onOpenSubmitQuoteModal }: QuotationArenaProps) {
  const { 
    t, 
    language, 
    currentRole, 
    selectedGroupIdForQuotes, 
    setSelectedGroupIdForQuotes 
  } = useApp();

  const allGroups = dataStore.getGroups();
  const activeGroupId = selectedGroupIdForQuotes || allGroups[0].id;
  const activeGroup = dataStore.getGroupById(activeGroupId) || allGroups[0];
  const quotes = dataStore.getQuotesByGroupId(activeGroupId);

  const aiAnalysis = analyzeQuotationsDeterministically(quotes);
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'ml'>(language);

  return (
    <div className="py-12 bg-[#F8F9FB] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Group Selector */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Transparent Dealer Bidding Arena
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Quotation Comparison & AI Audit
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Verified authorized dealerships submitting unbundled, itemized on-road offers for collective demand quorums.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Group Picker Dropdown */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">Select Active Quorum:</label>
              <select
                value={activeGroupId}
                onChange={(e) => setSelectedGroupIdForQuotes(e.target.value)}
                className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {allGroups.map(g => (
                  <option key={g.id} value={g.id}>
                    {g.code} — {g.carMake} {g.carModel} ({g.district})
                  </option>
                ))}
              </select>
            </div>

            {/* Dealer submit quotation CTA if in Dealer persona */}
            {(currentRole === 'DEALER_STAFF' || currentRole === 'DEALER_ADMIN' || currentRole === 'PLATFORM_ADMIN') && (
              <button
                onClick={() => onOpenSubmitQuoteModal(activeGroupId)}
                className="mt-4 sm:mt-0 inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5 text-blue-400" />
                Submit Dealership Quotation
              </button>
            )}
          </div>
        </div>

        {/* Selected Group Summary Ribbon */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img 
              src={activeGroup.carImage} 
              alt={activeGroup.carModel} 
              className="w-20 h-14 object-cover rounded-xl border border-slate-100"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-900">
                  {activeGroup.carMake} {activeGroup.carModel}
                </h3>
                <span className="font-mono text-[11px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                  {activeGroup.code}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Target Variant: <strong>{activeGroup.targetVariantName}</strong> • {activeGroup.district} Quorum
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-600">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Verified Quorum</div>
              <div className="font-extrabold text-slate-900 text-sm">{activeGroup.currentMembers} / {activeGroup.targetMembers} Buyers</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Target Delivery</div>
              <div className="font-extrabold text-slate-900 text-sm">{activeGroup.estimatedDeliveryWindow}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold">Dealership Offers</div>
              <div className="font-extrabold text-blue-600 text-sm">{quotes.length} Competing Quotes</div>
            </div>
          </div>
        </div>

        {/* AI Deal Intelligence & Audit Box */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 mb-10 shadow-xl border border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-tight text-white">
                  {t.aiAdvisor.title}
                </h3>
                <p className="text-xs text-slate-400">
                  Independent Deal Auditor • MVD & Supreme Court Compliance Verification
                </p>
              </div>
            </div>

            {/* Language toggle for AI insight */}
            <div className="flex items-center rounded-lg bg-slate-800 p-0.5 text-xs font-semibold self-start sm:self-auto">
              <button
                onClick={() => setActiveLangTab('en')}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeLangTab === 'en' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setActiveLangTab('ml')}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeLangTab === 'ml' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                മലയാളം
              </button>
            </div>
          </div>

          {/* AI Plain-Language Verdict */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 mb-6">
            <p className="text-sm sm:text-base leading-relaxed text-slate-200">
              {activeLangTab === 'en' ? aiAnalysis.summaryEn : aiAnalysis.summaryMl}
            </p>
          </div>

          {/* Identified Flags (e.g. Handling charges, lack of RTI) */}
          {aiAnalysis.identifiedFlags.length > 0 && (
            <div className="space-y-3 mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Transparency & Compliance Observations
              </div>
              {aiAnalysis.identifiedFlags.map((flag, idx) => (
                <div 
                  key={idx}
                  className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/40 text-xs text-amber-200 flex items-start gap-2.5"
                >
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-amber-300 mb-0.5">{flag.dealerName}</div>
                    <div>{activeLangTab === 'en' ? flag.flagEn : flag.flagMl}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recommended Negotiation Questions */}
          <div className="pt-4 border-t border-slate-800">
            <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" />
              Smart Questions for Buyers to Ask Showroom Sales Heads
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(activeLangTab === 'en' ? aiAnalysis.negotiationQuestionsEn : aiAnalysis.negotiationQuestionsMl).map((q, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 text-xs text-slate-300 flex items-start gap-2">
                  <span className="font-bold text-blue-400">0{idx + 1}.</span>
                  <span>{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side-by-Side Quotation Comparison Cards */}
        {quotes.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <FileText className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">No Dealer Quotations Submitted Yet</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-6">
              This quorum is currently gathering buyers. Once it reaches quorum threshold, authorized dealerships in this district will receive quotation requests.
            </p>
            <button
              onClick={() => onOpenSubmitQuoteModal(activeGroupId)}
              className="px-4 py-2.5 bg-blue-600 text-white text-xs font-semibold rounded-xl"
            >
              Submit First Dealership Quote
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Itemized On-Road Quotation Matrix
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {quotes.length} Competing Offers Available
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {quotes.map((quote) => {
                const isBestValue = quote.id === aiAnalysis.bestValueQuoteId;

                return (
                  <div
                    key={quote.id}
                    className={`bg-white rounded-3xl border ${
                      isBestValue 
                        ? 'border-blue-600 shadow-xl ring-2 ring-blue-600/10' 
                        : 'border-slate-200/90 shadow-sm'
                    } overflow-hidden flex flex-col justify-between`}
                  >
                    <div>
                      {/* Top Header */}
                      <div className={`p-5 border-b ${isBestValue ? 'bg-blue-50/70 border-blue-100' : 'bg-slate-50/50 border-slate-100'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            quote.dealerBadge === 'PLATINUM'
                              ? 'bg-purple-100 text-purple-700 border border-purple-200'
                              : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                          }`}>
                            ★ {quote.dealerBadge} Partner
                          </span>

                          {isBestValue && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-extrabold bg-blue-600 text-white px-2.5 py-0.5 rounded-full shadow-sm">
                              <Sparkles className="w-3 h-3" />
                              Best Value Choice
                            </span>
                          )}
                        </div>

                        <h4 className="text-base font-extrabold text-slate-900">
                          {quote.dealerName}
                        </h4>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3 h-3 text-slate-400" />
                          {quote.dealerDistrict}
                        </p>
                      </div>

                      {/* Main Headline Price */}
                      <div className="p-5 border-b border-slate-100">
                        <div className="text-[11px] font-semibold text-slate-400 uppercase">Total On-Road Payable</div>
                        <div className="text-2xl font-black text-slate-900 mt-0.5">
                          {formatCurrencyINR(quote.totalOnRoadPrice)}
                        </div>
                        
                        <div className="mt-2 flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg bg-emerald-50 text-emerald-800 font-semibold border border-emerald-100">
                          <span className="flex items-center gap-1">
                            <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                            Quoted Group Discount:
                          </span>
                          <span>{formatCurrencyINR(quote.groupNegotiationDiscount)}</span>
                        </div>
                      </div>

                      {/* Itemized Line Items Breakdown */}
                      <div className="p-5 space-y-2 text-xs">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                          Itemized Cost Breakdown
                        </div>

                        <div className="flex justify-between text-slate-600">
                          <span>Ex-Showroom Price</span>
                          <span className="font-semibold text-slate-900">{formatCurrencyINR(quote.exShowroom)}</span>
                        </div>

                        <div className="flex justify-between text-slate-600">
                          <span>Kerala Road Tax (MVD)</span>
                          <span className="font-semibold text-slate-900">{formatCurrencyINR(quote.keralaRoadTax)}</span>
                        </div>

                        <div className="flex justify-between text-slate-600">
                          <span>Road Safety Cess + Fastag</span>
                          <span className="font-semibold text-slate-900">{formatCurrencyINR(quote.roadSafetyCess + quote.fastag)}</span>
                        </div>

                        {quote.tcsAmount > 0 && (
                          <div className="flex justify-between text-slate-600">
                            <span>TCS (1% Govt IT Act)</span>
                            <span className="font-semibold text-slate-900">{formatCurrencyINR(quote.tcsAmount)}</span>
                          </div>
                        )}

                        <div className="flex justify-between text-slate-600">
                          <span>Insurance ({quote.insuranceCoverage.length} Add-ons)</span>
                          <span className="font-semibold text-slate-900">{formatCurrencyINR(quote.insuranceAmount)}</span>
                        </div>

                        {/* Logistics/Handling check */}
                        <div className="flex justify-between items-center text-slate-600">
                          <span className="flex items-center gap-1">
                            Handling/Logistics Fee
                            {quote.logisticsHandlingCharge > 0 && (
                              <AlertTriangle className="w-3 h-3 text-amber-500" />
                            )}
                          </span>
                          <span className={`font-semibold ${quote.logisticsHandlingCharge > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                            {quote.logisticsHandlingCharge > 0 
                              ? formatCurrencyINR(quote.logisticsHandlingCharge) 
                              : '₹0 (100% Waived)'}
                          </span>
                        </div>

                        <div className="flex justify-between text-slate-600">
                          <span>Genuine Accessories</span>
                          <span className="font-semibold text-slate-900">
                            {quote.accessoriesAmount === 0 ? 'Included Free' : formatCurrencyINR(quote.accessoriesAmount)}
                          </span>
                        </div>
                      </div>

                      {/* Delivery & Completeness Pill */}
                      <div className="px-5 pb-5">
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-blue-600" />
                              Delivery:
                            </span>
                            <span className="font-bold text-slate-800">{quote.deliveryDays} Days Guaranteed</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500 flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3 text-emerald-600" />
                              Completeness:
                            </span>
                            <span className="font-bold text-emerald-700">{quote.quoteCompletenessScore}% Audited</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action: Book Doorstep Test Drive with this dealer */}
                    <div className="p-5 pt-0">
                      <button
                        onClick={() => onOpenTestDriveModal(activeGroup.carId, `${activeGroup.carMake} ${activeGroup.carModel}`, quote.dealerId, quote.dealerName)}
                        className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-1.5"
                      >
                        <Car className="w-3.5 h-3.5 text-blue-400" />
                        Book Doorstep Test Drive with Dealer
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
