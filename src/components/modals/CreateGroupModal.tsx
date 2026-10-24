'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { dataStore } from '@/lib/data-store';
import { formatCurrencyINR } from '@/lib/kerala-tax';
import { X, PlusCircle, Sparkles, MapPin, Car, ShieldCheck } from 'lucide-react';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateGroupModal({ isOpen, onClose, onSuccess }: CreateGroupModalProps) {
  if (!isOpen) return null;

  const cars = dataStore.getCars();
  const [carId, setCarId] = useState(cars[0].id);
  const selectedCar = cars.find(c => c.id === carId) || cars[0];

  const [variantId, setVariantId] = useState(selectedCar.variants[0].id);
  const [district, setDistrict] = useState('Ernakulam (Kochi)');
  const [targetMembers, setTargetMembers] = useState(10);
  const [creatorName, setCreatorName] = useState('Rahul Menon');
  const [creatorPhone, setCreatorPhone] = useState('+91 98470 12345');
  const [targetBudget, setTargetBudget] = useState(selectedCar.startingPrice + 300000);
  const [purchaseTimeline, setPurchaseTimeline] = useState('Within 30 days');
  const [dealershipRadiusKm, setDealershipRadiusKm] = useState(50);
  const [loading, setLoading] = useState(false);

  const districts = [
    'Ernakulam (Kochi)',
    'Thiruvananthapuram',
    'Kozhikode',
    'Thrissur',
    'Kottayam',
    'Kannur',
    'Malappuram',
    'Kollam',
    'Palakkad',
    'Alappuzha'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    dataStore.createGroup({
      carId,
      variantId,
      district,
      dealershipRadiusKm,
      targetMembers,
      creatorName,
      creatorPhone,
      targetBudget,
      purchaseTimeline
    });

    setLoading(false);
    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative overflow-hidden">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            <PlusCircle className="w-3.5 h-3.5" />
            Start New Buyer Quorum
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            Initiate Collective Demand
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Create an active group in your Kerala district. Authorized dealerships in your radius will be invited to quote.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Select Car Model</label>
            <select
              value={carId}
              onChange={(e) => {
                setCarId(e.target.value);
                const c = cars.find(car => car.id === e.target.value);
                if (c) {
                  setVariantId(c.variants[0].id);
                  setTargetBudget(c.startingPrice + 300000);
                }
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {cars.map(c => (
                <option key={c.id} value={c.id}>
                  {c.make} {c.model} (Starts {formatCurrencyINR(c.startingPrice, true)})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Variant</label>
            <select
              value={variantId}
              onChange={(e) => setVariantId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {selectedCar.variants.map(v => (
                <option key={v.id} value={v.id}>
                  {v.name} ({formatCurrencyINR(v.exShowroomPrice)})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Kerala District</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {districts.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Quorum Target Buyers</label>
              <select
                value={targetMembers}
                onChange={(e) => setTargetMembers(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5 Buyers (Micro Quorum)</option>
                <option value={10}>10 Buyers (Recommended Standard)</option>
                <option value={15}>15 Buyers (Institutional Tier)</option>
                <option value={20}>20 Buyers (Max Tier Volume)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name (Organizer)</label>
              <input
                type="text"
                required
                value={creatorName}
                onChange={(e) => setCreatorName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Your Phone (Masked to Dealers)</label>
              <input
                type="text"
                required
                value={creatorPhone}
                onChange={(e) => setCreatorPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Creating Quorum...' : 'Launch Quorum in Kerala'}
          </button>
        </form>

      </div>
    </div>
  );
}
