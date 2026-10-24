'use client';

import React from 'react';
import { AnnouncementBar } from '@/components/common/AnnouncementBar';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { DashboardView } from '@/components/dashboards/DashboardView';
import { TestDriveModal } from '@/components/modals/TestDriveModal';
import { SubmitQuoteModal } from '@/components/modals/SubmitQuoteModal';
import { CreateGroupModal } from '@/components/modals/CreateGroupModal';
import { useApp } from '@/context/AppContext';

export default function DashboardPage() {
  const { 
    testDriveCarDetails, 
    setTestDriveCarDetails, 
    isTestDriveOpen, 
    setIsTestDriveOpen,
    isCreateGroupOpen,
    setIsCreateGroupOpen 
  } = useApp();

  const [isSubmitQuoteModalOpen, setIsSubmitQuoteModalOpen] = React.useState(false);
  const [quoteTargetGroupId, setQuoteTargetGroupId] = React.useState('grp-creta-kochi-01');

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
        <DashboardView 
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

      <CreateGroupModal 
        isOpen={isCreateGroupOpen}
        onClose={() => setIsCreateGroupOpen(false)}
        onSuccess={() => {}}
      />
    </div>
  );
}
