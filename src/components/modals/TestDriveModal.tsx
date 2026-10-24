'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { dataStore } from '@/lib/data-store';
import { X, Car, Calendar, MapPin, CheckCircle2, Clock } from 'lucide-react';

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: {
    carId: string;
    carName: string;
    dealerId: string;
    dealerName: string;
  } | null;
}

export function TestDriveModal({ isOpen, onClose, details }: TestDriveModalProps) {
  if (!isOpen || !details) return null;

  const [userName, setUserName] = useState('Rahul Menon');
  const [userPhone, setUserPhone] = useState('+91 98470 12345');
  const [preferredDate, setPreferredDate] = useState('2026-04-28');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('11:00 AM - 12:30 PM');
  const [preferredLocation, setPreferredLocation] = useState<'DOORSTEP' | 'DEALERSHIP'>('DOORSTEP');
  const [address, setAddress] = useState('Flat 4B, Skyline Imperial, Panampilly Nagar, Kochi');
  const [notes, setNotes] = useState('Please bring the automatic transmission variant for trial.');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dataStore.createTestDriveRequest({
      userId: 'user-rahul-menon',
      userName,
      userPhone,
      carId: details.carId,
      dealerId: details.dealerId,
      preferredDate,
      preferredTimeSlot,
      preferredLocation,
      address,
      notes
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
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

        {/* Title */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
            <Car className="w-3.5 h-3.5" />
            Schedule Test Drive
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            {details.carName}
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Showroom: <strong>{details.dealerName}</strong>
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Test Drive Requested!</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              The institutional sales lead at {details.dealerName} has received your trial schedule. They will bring the vehicle to your doorstep on {preferredDate}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  required
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Date</label>
                <input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Time Slot</label>
                <select
                  value={preferredTimeSlot}
                  onChange={(e) => setPreferredTimeSlot(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900"
                >
                  <option value="09:30 AM - 11:00 AM">09:30 AM - 11:00 AM</option>
                  <option value="11:00 AM - 12:30 PM">11:00 AM - 12:30 PM</option>
                  <option value="02:30 PM - 04:00 PM">02:30 PM - 04:00 PM</option>
                  <option value="04:30 PM - 06:00 PM">04:30 PM - 06:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Trial Location</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPreferredLocation('DOORSTEP')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    preferredLocation === 'DOORSTEP' 
                      ? 'bg-blue-50 border-blue-600 text-blue-700' 
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  🚗 Doorstep (Home / Office)
                </button>
                <button
                  type="button"
                  onClick={() => setPreferredLocation('DEALERSHIP')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    preferredLocation === 'DEALERSHIP' 
                      ? 'bg-blue-50 border-blue-600 text-blue-700' 
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  🏢 Dealership Showroom
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Address in Kerala</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Specific Instructions / Notes</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Bring color sample, automatic gear test..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-900"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-semibold shadow-md transition-all"
            >
              Confirm Doorstep Booking
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
