import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6f9] text-[#1e293b] antialiased">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-12 flex flex-col items-center justify-center text-center">
        
        {/* Subtle Government Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold mb-6">
          <ShieldCheck className="w-4 h-4 text-blue-700" />
          <span>Government of India • Ministry of Development of North Eastern Region</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0f2547] tracking-tight max-w-3xl leading-tight">
          North Eastern Region Logistics &amp; Accessibility Intelligence
        </h1>

        <p className="text-base sm:text-lg text-slate-600 mt-4 max-w-2xl">
          Unified real-time logistics coordination, highway accessibility tracking, incident intelligence, and AI-enabled route optimization across all eight North Eastern States.
        </p>

        {/* Action Button: Enter Platform -> navigates to Page 2 */}
        <div className="mt-8">
          <button
            onClick={() => navigate('/access-portal')}
            className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-base rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <span>Enter Platform</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* 8 NE States Strip */}
        <div className="mt-12 pt-8 border-t border-slate-200 w-full">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Covering all 8 North Eastern States
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              'Arunachal Pradesh',
              'Assam',
              'Manipur',
              'Meghalaya',
              'Mizoram',
              'Nagaland',
              'Sikkim',
              'Tripura',
            ].map((state) => (
              <span
                key={state}
                className="px-3 py-1 rounded-md bg-white border border-slate-200 text-xs text-slate-700 font-medium shadow-xs"
              >
                {state}
              </span>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};
