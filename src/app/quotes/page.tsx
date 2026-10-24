'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { AnnouncementBar } from '@/components/common/AnnouncementBar';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { QuotationArena } from '@/components/quotes/QuotationArena';
import { TestDriveModal } from '@/components/modals/TestDriveModal';
import { SubmitQuoteModal } from '@/components/modals/SubmitQuoteModal';

export default function QuotesPage() {
  const { testDriveCarDetails, setTestDriveCarDetails, isTestDriveOpen, setIsTestDriveOpen } = useApp();
  const [isSubmitQuoteModalOpen, setIsSubmitQuoteModalOpen] = useState(false);
  const [quoteTargetGroupId, setQuoteTargetGroupId] = useState('grp-creta-kochi-01');

  const handleOpenTestDriveModal = (carId: string, carName: string, dealerId: string, dealerName: string) => {
    setTestDriveCarDetails({ carId, carName, dealerId, dealerName });
    setIsTestDriveOpen(true);
  };

  const handleOpenSubmitQuoteModal = (groupId: string) => {
    setQuoteTargetGroupId(groupId);
    setIsSubmitQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB]">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <QuotationArena 
          onOpenTestDriveModal={handleOpenTestDriveModal}
          onOpenSubmitQuoteModal={handleOpenSubmitQuoteModal}
        />
      </main>
      <Footer />

      <TestDriveModal 
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
        details={testDriveCarDetails}
      />

      <SubmitQuoteModal 
        isOpen={isSubmitQuoteModalOpen}
        onClose={() => setIsSubmitQuoteModalOpen(false)}
        groupId={quoteTargetGroupId}
        onSuccess={() => {}}
      />
    </div>
  );
}
