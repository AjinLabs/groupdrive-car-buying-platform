'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { AnnouncementBar } from '@/components/common/AnnouncementBar';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { CarCatalogSection } from '@/components/cars/CarCatalogSection';
import { CarDetailModal } from '@/components/modals/CarDetailModal';
import { JoinGroupModal } from '@/components/modals/JoinGroupModal';
import { CreateGroupModal } from '@/components/modals/CreateGroupModal';
import { Car, BuyerGroup } from '@/types';
import { dataStore } from '@/lib/data-store';

export default function CarsPage() {
  const { isCreateGroupOpen, setIsCreateGroupOpen } = useApp();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<BuyerGroup | null>(null);
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  const handleSelectCarForBreakdown = (car: Car) => {
    setSelectedCar(car);
    setIsDetailOpen(true);
  };

  const handleJoinGroupForCar = (car: Car) => {
    const existing = dataStore.getGroups().find(g => g.carId === car.id);
    if (existing) {
      setSelectedGroup(existing);
      setIsJoinOpen(true);
    } else {
      setIsCreateGroupOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB]">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <CarCatalogSection 
          onSelectCarForBreakdown={handleSelectCarForBreakdown}
          onJoinGroupForCar={handleJoinGroupForCar}
        />
      </main>
      <Footer />

      <CarDetailModal 
        car={selectedCar}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onJoinQuorum={handleJoinGroupForCar}
      />

      <JoinGroupModal 
        group={selectedGroup}
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
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
