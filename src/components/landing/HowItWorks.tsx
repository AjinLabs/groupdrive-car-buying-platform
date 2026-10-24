'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Car, 
  Users, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  ChevronDown, 
  AlertCircle,
  Award
} from 'lucide-react';

export function HowItWorks() {
  const { t, setActiveTab } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const steps = [
    {
      num: '01',
      title: t.steps.step1Title,
      desc: t.steps.step1Desc,
      icon: Car,
    },
    {
      num: '02',
      title: t.steps.step2Title,
      desc: t.steps.step2Desc,
      icon: Users,
    },
    {
      num: '03',
      title: t.steps.step3Title,
      desc: t.steps.step3Desc,
      icon: FileText,
    },
    {
      num: '04',
      title: t.steps.step4Title,
      desc: t.steps.step4Desc,
      icon: CheckCircle2,
    },
  ];

  const faqs = [
    {
      q: 'Is joining a buyer group an obligation to purchase?',
      a: 'No. Joining a buyer group carries zero purchase obligation and zero advance fees. You remain 100% free to decline any dealership quote or withdraw before committing directly with the showroom.'
    },
    {
      q: 'Does GROUPDRIVE collect my car payment or booking fee?',
      a: 'Never. GROUPDRIVE never collects car purchase money, down-payments, or booking deposits. When you choose a quote, all payments, invoicing, and vehicle registration are executed directly with the authorized OEM dealership showroom.'
    },
    {
      q: 'How does collective demand negotiation work in Kerala?',
      a: 'Automobile dealerships receive monthly institutional volume targets from manufacturers (like Hyundai, Tata, Toyota). By aggregating 10 to 15 verified buyers interested in the same car in the same district, sales directors can release tier-1 volume margins and genuine accessory waivers that are unavailable to lone walk-in customers.'
    },
    {
      q: 'What are unauthorized dealer handling / logistics charges?',
      a: 'Dealerships frequently add ₹10,000 to ₹35,000 as "handling", "depot", or "secondary transit" charges. The Supreme Court of India and Kerala Motor Vehicles Department (MVD) rules have established that ex-showroom pricing includes all manufacturer-to-dealer transit expenses. Our AI Deal Intelligence flags and verifies that competing dealers waive these improper charges.'
    },
    {
      q: 'Is my personal phone number shared with competing dealers?',
      a: 'No. Your phone number and email remain masked (+91 98*** **420) during group quorum bidding. Only when you explicitly accept a dealership quotation or schedule a test drive are your contact details shared with that specific dealer.'
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-2">
            The Collective Buying Paradigm
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            How GROUPDRIVE Transforms Car Buying
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            A transparent 4-stage process replacing opaque one-on-one showroom bargaining with competitive group quotations.
          </p>
        </div>

        {/* 4 Step Cards (Luxeon Auto Editorial Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div 
                key={idx}
                className="bg-[#F8F9FB] rounded-3xl p-6 sm:p-7 border border-slate-200/80 luxury-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-black text-slate-300">
                      {s.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 shadow-sm">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight mb-2">
                    {s.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center text-[11px] font-semibold text-blue-600">
                  <span>Stage {s.num} Verified</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust & Transparency Feature Ribbon */}
        <div className="bg-[#0B1220] rounded-3xl p-8 sm:p-12 text-white mb-20">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block mb-2">
              Buyer Protection & Integrity
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Strict Verification & Privacy Safeguards
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Every dealer quotation is legally bound to statutory Kerala MVD road tax slabs with zero hidden intermediary fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <div className="font-bold text-sm text-white">Direct Showroom Billing</div>
              <div className="text-xs text-slate-400 leading-relaxed">
                Invoices and RC books are issued directly by verified OEMs. You never transfer car purchase funds to GROUPDRIVE.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <Lock className="w-6 h-6 text-blue-400" />
              <div className="font-bold text-sm text-white">Zero Showroom Spam</div>
              <div className="text-xs text-slate-400 leading-relaxed">
                Your private phone number is completely masked during dealer bidding. Only the selected dealer receives your contact.
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <AlertCircle className="w-6 h-6 text-amber-400" />
              <div className="font-bold text-sm text-white">Prohibited Charge Auditing</div>
              <div className="text-xs text-slate-400 leading-relaxed">
                Our algorithm audits quotations against Kerala Transport Department rules to flag unlawful handling fees.
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-black text-slate-900 text-center tracking-tight mb-8">
            Frequently Asked Questions
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-[#F8F9FB] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-200/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
