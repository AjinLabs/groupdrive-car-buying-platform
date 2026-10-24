'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Role } from '@/types';
import { SupportedLanguage, translations } from '@/lib/i18n';

interface AppContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: typeof translations['en'];
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  activeTab: 'home' | 'cars' | 'groups' | 'calculator' | 'quotes' | 'heatmap' | 'dashboard';
  setActiveTab: (tab: 'home' | 'cars' | 'groups' | 'calculator' | 'quotes' | 'heatmap' | 'dashboard') => void;
  selectedGroupIdForQuotes: string | null;
  setSelectedGroupIdForQuotes: (id: string | null) => void;
  selectedCarForModal: string | null;
  setSelectedCarForModal: (id: string | null) => void;
  isCreateGroupOpen: boolean;
  setIsCreateGroupOpen: (open: boolean) => void;
  isTestDriveOpen: boolean;
  setIsTestDriveOpen: (open: boolean) => void;
  testDriveCarDetails: { carId: string; carName: string; dealerId: string; dealerName: string } | null;
  setTestDriveCarDetails: (details: { carId: string; carName: string; dealerId: string; dealerName: string } | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [currentRole, setCurrentRole] = useState<Role>('BUYER');
  const [activeTab, setActiveTab] = useState<'home' | 'cars' | 'groups' | 'calculator' | 'quotes' | 'heatmap' | 'dashboard'>('home');
  const [selectedGroupIdForQuotes, setSelectedGroupIdForQuotes] = useState<string | null>('grp-creta-kochi-01');
  const [selectedCarForModal, setSelectedCarForModal] = useState<string | null>(null);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [testDriveCarDetails, setTestDriveCarDetails] = useState<{ carId: string; carName: string; dealerId: string; dealerName: string } | null>(null);

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentRole,
        setCurrentRole,
        activeTab,
        setActiveTab,
        selectedGroupIdForQuotes,
        setSelectedGroupIdForQuotes,
        selectedCarForModal,
        setSelectedCarForModal,
        isCreateGroupOpen,
        setIsCreateGroupOpen,
        isTestDriveOpen,
        setIsTestDriveOpen,
        testDriveCarDetails,
        setTestDriveCarDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
