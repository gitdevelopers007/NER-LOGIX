import React from 'react';
import { Outlet } from 'react-router-dom';
import { TravelerHeader } from './TravelerHeader';
import { TravelerSidebar } from './TravelerSidebar';

export const TravelerLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans select-none">
      {/* 1. Official Dark Header */}
      <TravelerHeader />

      {/* 2. Main Body with Left Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation */}
        <TravelerSidebar />

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-[#f4f6fa]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
