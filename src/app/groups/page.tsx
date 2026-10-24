'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { AnnouncementBar } from '@/components/common/AnnouncementBar';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { LiveGroupsSection } from '@/components/landing/LiveGroupsSection';
import { JoinGroupModal } from '@/components/modals/JoinGroupModal';
import { CreateGroupModal } from '@/components/modals/CreateGroupModal';
import { BuyerGroup } from '@/types';
import { useRouter } from 'next/navigation';

export default function GroupsPage() {
  const router = useRouter();
  const { setSelectedGroupIdForQuotes, isCreateGroupOpen, setIsCreateGroupOpen } = useApp();
  const [selectedGroup, setSelectedGroup] = useState<BuyerGroup | null>(null);
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FB]">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <LiveGroupsSection 
          onSelectGroupForQuotes={(id) => {
            setSelectedGroupIdForQuotes(id);
            router.push('/quotes');
          }}
          onOpenJoinModal={(g) => {
            setSelectedGroup(g);
            setIsJoinOpen(true);
          }}
        />
      </main>
      <Footer />

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
