import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Shield, HelpCircle, LogIn, 
  AlertTriangle, HardHat, BookOpen
} from 'lucide-react';
import { NerLogixLogo } from '../components/NerLogixLogo';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f8fc] text-[#0c2340] font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* ───────────────────────────────────────────────────────────── */}
      {/* 1. TOP NAVBAR (Exact match to screenshot) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <header className="w-full bg-[#0c2340] text-white px-4 sm:px-8 py-2.5 shadow-md sticky top-0 z-50">
        <div className="max-w-[1360px] mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Mountain Logo + NER-LOGIX + Subtitle */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => navigate('/')}>
            <NerLogixLogo variant="white" className="h-7 w-auto" />
            
            {/* Divider line */}
            <div className="h-7 w-[1px] bg-slate-500/60 hidden sm:block mx-0.5"></div>
            
            {/* Subtitle */}
            <div className="hidden sm:flex flex-col text-[11px] leading-[1.2] text-slate-300 font-normal">
              <span>North Eastern Region Logistics &amp;</span>
              <span>Accessibility Intelligence</span>
            </div>
          </div>

          {/* Right: System Online + Help + Enter Platform Button */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs text-slate-200">
            
            {/* System Online Status */}
            <div className="flex items-center gap-2 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block shadow-[0_0_8px_#34d399]"></span>
              <span className="hidden sm:inline text-slate-300">System Online</span>
            </div>

            {/* Help Button */}
            <button 
              onClick={() => alert('NER-LOGIX Help & Documentation: Contact operational control at support.ner@gov.in')}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline font-medium">Help</span>
            </button>

            {/* Enter Platform Button (Exact outlined button from screenshot) */}
            <button
              onClick={() => navigate('/access-portal')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-400/50 hover:border-white text-white text-xs font-semibold hover:bg-white/10 transition-all cursor-pointer shadow-xs"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Enter Platform</span>
              <span className="text-[13px] leading-none">→</span>
            </button>

          </div>

        </div>
      </header>


      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2. HERO SECTION (Exact layout & copy from screenshot) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-8 pt-8 sm:pt-12 pb-8 flex flex-col justify-between">
        
        {/* Top Split Area: Left Copy + Right 3D Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column (5 of 12) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Tag with horizontal line */}
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-extrabold tracking-[0.18em] uppercase text-[#1a56db]">
                SMART LOGISTICS PLATFORM
              </span>
              <div className="h-[2px] w-10 bg-[#1a56db]"></div>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#0c2340] tracking-tight leading-[1.12]">
              North Eastern Region Logistics &amp;<br />
              Accessibility Intelligence
            </h1>

            {/* Blue Sub-headline */}
            <div className="text-xl sm:text-2xl font-bold text-[#1a56db] tracking-tight">
              Smarter Access. Safer Routes. Stronger Connectivity.
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-600 max-w-lg leading-relaxed pt-1">
              Government-grade logistics and accessibility intelligence for India's North Eastern Region.
            </p>

            {/* Action Buttons (Exact two buttons from screenshot) */}
            <div className="pt-3 flex flex-wrap items-center gap-3.5">
              
              {/* Button 1: Solid Blue ENTER PLATFORM */}
              <button
                onClick={() => navigate('/access-portal')}
                className="px-6 py-3.5 bg-[#0066d6] hover:bg-[#0055b8] active:bg-[#00479e] text-white font-bold text-xs tracking-wider uppercase rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>ENTER PLATFORM</span>
                <span className="text-sm">→</span>
              </button>

              {/* Button 2: White with Blue Outline EXPLORE REGION */}
              <button
                onClick={() => navigate('/live-map')}
                className="px-6 py-3.5 bg-white hover:bg-blue-50/60 active:bg-blue-100/60 border border-[#1a56db] text-[#1a56db] font-bold text-xs tracking-wider uppercase rounded-lg transition-all flex items-center gap-2.5 cursor-pointer shadow-xs"
              >
                <BookOpen className="w-4 h-4 text-[#1a56db]" />
                <span>EXPLORE REGION</span>
              </button>

            </div>

          </div>

          {/* Right Column: 3D Relief Terrain Map of Northeast India (7 of 12) */}
          <div className="lg:col-span-7 flex items-center justify-center relative">
            <div className="relative w-full max-w-[680px] drop-shadow-xl transition-transform hover:scale-[1.01] duration-300 select-none">
              <img 
                src="/northeast-3d-map.png" 
                alt="North Eastern Region 3D GIS Accessibility Map" 
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          </div>

        </div>


        {/* ───────────────────────────────────────────────────────────── */}
        {/* 3. FOUR FEATURE CARDS (Exact match to screenshot) */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 pt-4">
          
          {/* CARD 1: Regional Connectivity */}
          <div 
            onClick={() => navigate('/route-intelligence')}
            className="bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Blue Circular Icon: Highway */}
              <div className="w-11 h-11 rounded-full bg-blue-50 text-[#1a56db] flex items-center justify-center shrink-0 border border-blue-100">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M4 19L8 5H16L20 19" />
                  <line x1="12" y1="8" x2="12" y2="11" strokeDasharray="2 2" />
                  <line x1="12" y1="14" x2="12" y2="17" strokeDasharray="2 2" />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="text-[13.5px] font-bold text-[#0c2340] group-hover:text-[#1a56db] transition-colors truncate">
                  Regional Connectivity
                </h3>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5 line-clamp-2">
                  Monitor road networks, bridges and critical corridors.
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#1a56db] shrink-0 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* CARD 2: Live Accessibility */}
          <div 
            onClick={() => navigate('/live-map')}
            className="bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Green Circular Icon: Shield */}
              <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[13.5px] font-bold text-[#0c2340] group-hover:text-emerald-600 transition-colors truncate">
                  Live Accessibility
                </h3>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5 line-clamp-2">
                  Real-time road status, disruptions and accessibility levels.
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#1a56db] shrink-0 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* CARD 3: Risk Intelligence */}
          <div 
            onClick={() => navigate('/alerts')}
            className="bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Amber Circular Icon: Warning */}
              <div className="w-11 h-11 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[13.5px] font-bold text-[#0c2340] group-hover:text-amber-600 transition-colors truncate">
                  Risk Intelligence
                </h3>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5 line-clamp-2">
                  Weather, landslide, flood and incident risk analysis.
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#1a56db] shrink-0 group-hover:translate-x-1 transition-transform" />
          </div>

          {/* CARD 4: Field Operations */}
          <div 
            onClick={() => navigate('/incidents')}
            className="bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Blue Circular Icon: Hardhat */}
              <div className="w-11 h-11 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
                <HardHat className="w-5 h-5 text-sky-600" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[13.5px] font-bold text-[#0c2340] group-hover:text-sky-600 transition-colors truncate">
                  Field Operations
                </h3>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5 line-clamp-2">
                  Ground reports, incident updates and field intelligence.
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-[#1a56db] shrink-0 group-hover:translate-x-1 transition-transform" />
          </div>

        </div>


        {/* ───────────────────────────────────────────────────────────── */}
        {/* 4. FOOTER (Exact match to screenshot) */}
        {/* ───────────────────────────────────────────────────────────── */}
        <footer className="mt-10 pt-6 pb-2 text-center space-y-3">
          
          {/* Shield + Secure Government Platform */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0c2340]">
              <Shield className="w-3.5 h-3.5 text-[#1a56db]" />
              <span>Secure Government Platform</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Data access is based on user role and authorization.
            </p>
          </div>

          {/* Divider */}
          <div className="h-[1px] w-full max-w-3xl mx-auto bg-slate-200"></div>

          {/* Copyright */}
          <div className="text-[11px] text-slate-500">
            © NER-LOGIX • North Eastern Region Logistics &amp; Accessibility Intelligence
          </div>

        </footer>

      </main>

    </div>
  );
};
