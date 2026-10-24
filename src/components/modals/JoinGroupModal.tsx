'use client';

import React, { useState } from 'react';
import { BuyerGroup } from '@/types';
import { dataStore } from '@/lib/data-store';
import { formatCurrencyINR } from '@/lib/kerala-tax';
import confetti from 'canvas-confetti';
import { 
  X, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

interface JoinGroupModalProps {
  group: BuyerGroup | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function JoinGroupModal({ group, isOpen, onClose, onSuccess }: JoinGroupModalProps) {
  if (!isOpen || !group) return null;

  const [userName, setUserName] = useState('Rahul Menon');
  const [userPhone, setUserPhone] = useState('+91 98470 44210');
  const [district, setDistrict] = useState(group.district);
  const [targetBudget, setTargetBudget] = useState(2400000);
  const [purchaseTimeline, setPurchaseTimeline] = useState('Within 20 days');
  const [needFinance, setNeedFinance] = useState(true);
  const [needExchange, setNeedExchange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [joinedSuccess, setJoinedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = dataStore.joinGroup(group.id, {
      userName,
      userPhone,
      district,
      selectedVariantId: group.targetVariantId || 'var-default',
      targetBudget,
      preferredPurchaseTimeline: purchaseTimeline,
      needFinance,
      needExchange
    });

    setLoading(false);

    if (result.success) {
      setJoinedSuccess(true);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Fallback if canvas is unavailable
      }
      setTimeout(() => {
        onSuccess();
        onClose();
        setJoinedSuccess(false);
      }, 1800);
    } else {
      setError(result.error || 'Failed to join group');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            <Users className="w-3.5 h-3.5" />
            Join Buyer Quorum
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            {group.carMake} {group.carModel}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Quorum Code: <strong className="font-mono text-slate-800">{group.code}</strong> • {group.district}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {joinedSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Successfully Joined Quorum!</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              You are now member #{group.currentMembers} in this Kerala collective buyer group. Competing dealership quotations will appear in your Quotation Arena.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (Masked)</label>
                <input
                  type="text"
                  required
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Target Budget (₹)</label>
                <input
                  type="number"
                  required
                  value={targetBudget}
                  onChange={(e) => setTargetBudget(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Purchase Timeline</label>
                <select
                  value={purchaseTimeline}
                  onChange={(e) => setPurchaseTimeline(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Immediate">Immediate (Stock Ready)</option>
                  <option value="Within 15 days">Within 15 days</option>
                  <option value="Within 20 days">Within 20 days</option>
                  <option value="Within 30 days">Within 30 days</option>
                </select>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={needFinance}
                  onChange={(e) => setNeedFinance(e.target.checked)}
                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
                <span className="text-slate-700">Need Auto Loan</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs cursor-pointer">
                <input
                  type="checkbox"
                  checked={needExchange}
                  onChange={(e) => setNeedExchange(e.target.checked)}
                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
                <span className="text-slate-700">Old Car Exchange</span>
              </label>
            </div>

            {/* Privacy Guarantee Pill */}
            <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-[11px] text-blue-900 flex items-start gap-2">
              <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>
                <strong>Privacy Guaranteed:</strong> Competing dealerships only see aggregate demand counts. Your exact phone number is masked as +91 98*** **420.
              </span>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2"
            >
              {loading ? 'Joining Quorum...' : 'Confirm Quorum Membership'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
