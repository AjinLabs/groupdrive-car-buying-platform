'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Role } from '@/types';
import { 
  ShieldCheck, 
  Car, 
  Users, 
  Calculator, 
  Flame, 
  FileText, 
  Globe, 
  Menu, 
  X, 
  ChevronDown,
  UserCheck,
  Building2,
  SlidersHorizontal,
  PlusCircle,
  LayoutDashboard
} from 'lucide-react';

import { useRouter, usePathname } from 'next/navigation';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { 
    language, 
    setLanguage, 
    t, 
    currentRole, 
    setCurrentRole, 
    activeTab, 
    setActiveTab,
    setIsCreateGroupOpen 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navigateTo = (tab: any, path: string) => {
    setActiveTab(tab);
    router.push(path);
  };

  const isCurrentTab = (tab: string, path: string) => {
    return pathname === path || (pathname === '/' && activeTab === tab);
  };

  const rolesList: { role: Role; label: string; desc: string; icon: any }[] = [
    { role: 'BUYER', label: t.roles.buyer, desc: 'Verified Car Buyer in Kochi', icon: UserCheck },
    { role: 'GROUP_ORGANIZER', label: t.roles.organizer, desc: 'Lead Buyer coordinating Quorum in TVM', icon: Users },
    { role: 'DEALER_STAFF', label: t.roles.dealer, desc: 'Authorized Showroom Sales Head', icon: Building2 },
    { role: 'PLATFORM_ADMIN', label: t.roles.admin, desc: 'Platform Integrity & Verification Desk', icon: ShieldCheck },
  ];

  const currentRoleObj = rolesList.find(r => r.role === currentRole) || rolesList[0];

  return (
    <header className="sticky top-0 z-40 glass-nav transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('home', '/')}>
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-extrabold tracking-tighter text-lg shadow-md border border-slate-700">
              <span className="text-blue-500 mr-0.5">G</span>D
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  {t.brandName}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Pilot
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-tight">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => navigateTo('cars', '/cars')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isCurrentTab('cars', '/cars') ? 'text-blue-600 bg-blue-50/70 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <Car className="w-4 h-4" />
              {t.nav.exploreCars}
            </button>

            <button
              onClick={() => navigateTo('groups', '/groups')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isCurrentTab('groups', '/groups') ? 'text-blue-600 bg-blue-50/70 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <Users className="w-4 h-4" />
              {t.nav.buyerGroups}
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </button>

            <button
              onClick={() => navigateTo('quotes', '/quotes')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isCurrentTab('quotes', '/quotes') ? 'text-blue-600 bg-blue-50/70 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              Quotation Arena
            </button>

            <button
              onClick={() => navigateTo('calculator', '/calculator')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isCurrentTab('calculator', '/calculator') ? 'text-blue-600 bg-blue-50/70 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <Calculator className="w-4 h-4" />
              {t.nav.calculator}
            </button>

            <button
              onClick={() => navigateTo('heatmap', '/heatmap')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isCurrentTab('heatmap', '/heatmap') ? 'text-blue-600 bg-blue-50/70 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <Flame className="w-4 h-4 text-orange-500" />
              {t.nav.heatmap}
            </button>

            <button
              onClick={() => navigateTo('dashboard', '/dashboard')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                isCurrentTab('dashboard', '/dashboard') ? 'text-blue-600 bg-blue-50/70 font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              {t.nav.myDashboard}
            </button>
          </nav>

          {/* Right Action Tools: Language + Role Switcher + CTA */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Language Switcher */}
            <div className="flex items-center rounded-lg border border-slate-200 bg-white/80 p-0.5 text-xs font-semibold">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  language === 'en' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ml')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  language === 'ml' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                മലയാളം
              </button>
            </div>

            {/* Persona / Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:border-slate-300 shadow-sm"
              >
                <currentRoleObj.icon className="w-3.5 h-3.5 text-blue-600" />
                <span className="font-semibold text-slate-900">{currentRoleObj.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white shadow-xl border border-slate-200 py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Switch Active Persona / View
                    </p>
                  </div>
                  {rolesList.map((r) => {
                    const Icon = r.icon;
                    return (
                      <button
                        key={r.role}
                        onClick={() => {
                          setCurrentRole(r.role);
                          setRoleDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left flex items-start gap-2.5 hover:bg-slate-50 transition-colors ${
                          currentRole === r.role ? 'bg-blue-50/60' : ''
                        }`}
                      >
                        <div className={`mt-0.5 p-1.5 rounded-lg ${currentRole === r.role ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className={`text-xs font-semibold ${currentRole === r.role ? 'text-blue-700' : 'text-slate-800'}`}>
                            {r.label}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {r.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Create / Join Group Primary Action */}
            <button
              onClick={() => setIsCreateGroupOpen(true)}
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-black text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5 text-blue-400" />
              {t.nav.joinGroup}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')}
              className="px-2 py-1 rounded border border-slate-200 text-xs font-bold"
            >
              {language === 'en' ? 'മലയാളം' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2">
          <button
            onClick={() => { navigateTo('cars', '/cars'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
          >
            <Car className="w-4 h-4 text-blue-600" />
            {t.nav.exploreCars}
          </button>
          <button
            onClick={() => { navigateTo('groups', '/groups'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
          >
            <Users className="w-4 h-4 text-blue-600" />
            {t.nav.buyerGroups}
          </button>
          <button
            onClick={() => { navigateTo('quotes', '/quotes'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
          >
            <FileText className="w-4 h-4 text-blue-600" />
            Quotation Arena
          </button>
          <button
            onClick={() => { navigateTo('calculator', '/calculator'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
          >
            <Calculator className="w-4 h-4 text-blue-600" />
            {t.nav.calculator}
          </button>
          <button
            onClick={() => { navigateTo('heatmap', '/heatmap'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
          >
            <Flame className="w-4 h-4 text-orange-500" />
            {t.nav.heatmap}
          </button>
          <button
            onClick={() => { navigateTo('dashboard', '/dashboard'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4 text-slate-700" />
            {t.nav.myDashboard}
          </button>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => { setIsCreateGroupOpen(true); setMobileMenuOpen(false); }}
              className="w-full py-2.5 bg-slate-900 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-blue-400" />
              {t.nav.joinGroup}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
