'use client';

import React from 'react';
import { AnnouncementBar } from '@/components/common/AnnouncementBar';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { TrueOnRoadCalculator } from '@/components/calculator/TrueOnRoadCalculator';
import { CreateGroupModal } from '@/components/modals/CreateGroupModal';
import { useApp } from '@/context/AppContext';

export default function CalculatorPage() {
  const { isCreateGroupOpen, setIsCreateGroupOpen } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB]">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <TrueOnRoadCalculator />
      </main>
      <Footer />

      <CreateGroupModal 
        isOpen={isCreateGroupOpen}
        onClose={() => setIsCreateGroupOpen(false)}
        onSuccess={() => {}}
      />
    </div>
  );
}
