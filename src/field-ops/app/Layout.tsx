import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { OfflineBanner } from '../components/OfflineBanner';
import { DemoControlModal } from '../components/DemoControlModal';

export const Layout: React.FC = () => {
  const [demoOpen, setDemoOpen] = useState<boolean>(false);

  const userName = localStorage.getItem('demo_user_name') || 'Officer R. Borah';
  const userRole = localStorage.getItem('demo_user_role') || 'FIELD_OFFICER';

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Header
        onOpenDemo={() => setDemoOpen(true)}
        userName={userName}
        userRole={userRole}
      />
      <OfflineBanner />

      <main className="flex-1 max-w-md w-full mx-auto p-3.5 sm:p-4">
        <Outlet />
      </main>

      <BottomNav />

      <DemoControlModal
        isOpen={demoOpen}
        onClose={() => setDemoOpen(false)}
      />
    </div>
  );
};
