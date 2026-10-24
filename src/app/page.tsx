'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { AnnouncementBar } from '@/components/common/AnnouncementBar';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Hero } from '@/components/landing/Hero';
import { LiveGroupsSection } from '@/components/landing/LiveGroupsSection';
import { CarCatalogSection } from '@/components/cars/CarCatalogSection';
import { QuotationArena } from '@/components/quotes/QuotationArena';
import { TrueOnRoadCalculator } from '@/components/calculator/TrueOnRoadCalculator';
import { KeralaDemandHeatmap } from '@/components/landing/KeralaDemandHeatmap';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { DashboardView } from '@/components/dashboards/DashboardView';

import { JoinGroupModal } from '@/components/modals/JoinGroupModal';
import { CreateGroupModal } from '@/components/modals/CreateGroupModal';
import { CarDetailModal } from '@/components/modals/CarDetailModal';
import { TestDriveModal } from '@/components/modals/TestDriveModal';
import { SubmitQuoteModal } from '@/components/modals/SubmitQuoteModal';

import { BuyerGroup, Car } from '@/types';
import { dataStore } from '@/lib/data-store';

export default function HomePage() {
  const { 
    activeTab, 
    setActiveTab, 
    selectedGroupIdForQuotes, 
    setSelectedGroupIdForQuotes,
    isCreateGroupOpen,
    setIsCreateGroupOpen,
    isTestDriveOpen,
    setIsTestDriveOpen,
    testDriveCarDetails,
    setTestDriveCarDetails
  } = useApp();

  // Modal states
  const [selectedGroupForJoin, setSelectedGroupForJoin] = useState<BuyerGroup | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const [selectedCarForDetail, setSelectedCarForDetail] = useState<Car | null>(null);
  const [isCarDetailOpen, setIsCarDetailOpen] = useState(false);

  const [isSubmitQuoteModalOpen, setIsSubmitQuoteModalOpen] = useState(false);
  const [quoteTargetGroupId, setQuoteTargetGroupId] = useState<string>('grp-creta-kochi-01');

  // Trigger handlers
  const handleOpenJoinModal = (group: BuyerGroup) => {
    setSelectedGroupForJoin(group);
    setIsJoinModalOpen(true);
  };

  const handleSelectCarForBreakdown = (car: Car) => {
    setSelectedCarForDetail(car);
    setIsCarDetailOpen(true);
  };

  const handleJoinGroupForCar = (car: Car) => {
    // Find active group for this car or open create
    const existingGroup = dataStore.getGroups().find(g => g.carId === car.id);
    if (existingGroup) {
      setSelectedGroupForJoin(existingGroup);
      setIsJoinModalOpen(true);
    } else {
      setIsCreateGroupOpen(true);
    }
  };

  const handleOpenTestDriveModal = (carId: string, carName: string, dealerId: string, dealerName: string) => {
    setTestDriveCarDetails({ carId, carName, dealerId, dealerName });
    setIsTestDriveOpen(true);
  };

  const handleOpenSubmitQuoteModal = (groupId: string) => {
    setQuoteTargetGroupId(groupId);
    setIsSubmitQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB] selection:bg-blue-600 selection:text-white">
      {/* Announcement Bar */}
      <AnnouncementBar />

      {/* Main Header Navigation */}
      <Header />

      {/* Main Content Area based on Tab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero />
            <LiveGroupsSection 
              onSelectGroupForQuotes={(id) => {
                setSelectedGroupIdForQuotes(id);
                setActiveTab('quotes');
              }}
              onOpenJoinModal={handleOpenJoinModal}
            />
            <CarCatalogSection 
              onSelectCarForBreakdown={handleSelectCarForBreakdown}
              onJoinGroupForCar={handleJoinGroupForCar}
            />
            <HowItWorks />
            <KeralaDemandHeatmap />
          </>
        )}

        {activeTab === 'cars' && (
          <CarCatalogSection 
            onSelectCarForBreakdown={handleSelectCarForBreakdown}
            onJoinGroupForCar={handleJoinGroupForCar}
          />
        )}

        {activeTab === 'groups' && (
          <LiveGroupsSection 
            onSelectGroupForQuotes={(id) => {
              setSelectedGroupIdForQuotes(id);
              setActiveTab('quotes');
            }}
            onOpenJoinModal={handleOpenJoinModal}
          />
        )}

        {activeTab === 'quotes' && (
          <QuotationArena 
            onOpenTestDriveModal={handleOpenTestDriveModal}
            onOpenSubmitQuoteModal={handleOpenSubmitQuoteModal}
          />
        )}

        {activeTab === 'calculator' && (
          <TrueOnRoadCalculator />
        )}

        {activeTab === 'heatmap' && (
          <KeralaDemandHeatmap />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView 
            onOpenTestDriveModal={handleOpenTestDriveModal}
            onOpenSubmitQuoteModal={handleOpenSubmitQuoteModal}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <JoinGroupModal 
        group={selectedGroupForJoin}
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onSuccess={() => {}}
      />

      <CreateGroupModal 
        isOpen={isCreateGroupOpen}
        onClose={() => setIsCreateGroupOpen(false)}
        onSuccess={() => {
          setActiveTab('groups');
        }}
      />

      <CarDetailModal 
        car={selectedCarForDetail}
        isOpen={isCarDetailOpen}
        onClose={() => setIsCarDetailOpen(false)}
        onJoinQuorum={handleJoinGroupForCar}
      />

      <TestDriveModal 
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
        details={testDriveCarDetails}
      />

      <SubmitQuoteModal 
        isOpen={isSubmitQuoteModalOpen}
        onClose={() => setIsSubmitQuoteModalOpen(false)}
        groupId={quoteTargetGroupId}
        onSuccess={() => {
          setSelectedGroupIdForQuotes(quoteTargetGroupId);
          setActiveTab('quotes');
        }}
      />
    </div>
  );
}
