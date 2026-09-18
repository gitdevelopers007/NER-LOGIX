import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { GovBuildingIcon, FieldOpsIcon, TravelerMapIcon, CheckBadge } from '../components/CardIcons';

export const AccessPortalPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPortalModal, setSelectedPortalModal] = useState<string | null>(null);

  const handlePortalSelect = (portalName: string) => {
    setSelectedPortalModal(portalName);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6f9] text-[#1e293b] antialiased">
      {/* Official Government Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12 flex flex-col justify-between">
        
        {/* Navigation & Breadcrumb */}
        <div>
          {/* Back to Welcome Link */}
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Welcome</span>
          </button>

          {/* Breadcrumb */}
          <div className="text-xs text-slate-400 mt-1 select-none">
            <span className="hover:text-slate-600 cursor-pointer">NER-LOGIX</span>
            <span className="mx-1.5">/</span>
            <span className="text-slate-500 font-medium">Access Portal</span>
          </div>
        </div>

        {/* Page Title & Subtitle */}
        <div className="text-center my-6 md:my-8">
          <h1 className="text-3xl sm:text-[34px] font-bold text-[#0f2547] tracking-tight">
            Select Your Access Portal
          </h1>
          <p className="text-slate-600 text-sm sm:text-[15px] mt-2 max-w-2xl mx-auto font-normal">
            Choose how you want to access the North Eastern Region Logistics &amp; Accessibility Intelligence platform.
          </p>
        </div>

        {/* 3 Portal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-stretch my-2">
          
          {/* CARD 1: Government Command Center */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 p-8 flex flex-col justify-between relative group">
            <div>
              {/* Top Circular Icon */}
              <div className="w-24 h-24 rounded-full bg-[#e0f2fe] flex items-center justify-center mx-auto transition-transform group-hover:scale-105 duration-200">
                <GovBuildingIcon className="w-14 h-14" />
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-xl font-bold text-[#0f2547] text-center mt-6">
                Government Command Center
              </h2>
              <p className="text-[13px] text-slate-500 text-center mt-1 font-normal">
                For government officials and administrators
              </p>

              {/* Description */}
              <p className="text-[13.5px] text-slate-600 text-center mt-4 leading-relaxed font-normal min-h-[64px]">
                Monitor regional connectivity, road accessibility, incidents, logistics operations, weather risks, and AI-generated intelligence.
              </p>

              {/* Features List */}
              <div className="space-y-3 mt-6 mb-8 pl-1">
                <div className="flex items-center gap-3">
                  <CheckBadge colorClass="text-[#2563eb]" />
                  <span className="text-[13.5px] text-slate-700 font-normal">
                    Regional accessibility monitoring
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckBadge colorClass="text-[#2563eb]" />
                  <span className="text-[13.5px] text-slate-700 font-normal">
                    Incident &amp; risk intelligence
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckBadge colorClass="text-[#2563eb]" />
                  <span className="text-[13.5px] text-slate-700 font-normal">
                    Logistics oversight
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckBadge colorClass="text-[#2563eb]" />
                  <span className="text-[13.5px] text-slate-700 font-normal">
                    Analytics &amp; reports
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => navigate('/government-login')}
              className="w-full py-3 px-4 rounded-lg bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer group-hover:shadow-sm"
            >
              <span>Continue as Government User</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* CARD 2: Field Operations */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 p-8 flex flex-col justify-between relative group">
            <div>
              {/* Top Circular Icon */}
              <div className="w-24 h-24 rounded-full bg-[#e0f2fe] flex items-center justify-center mx-auto transition-transform group-hover:scale-105 duration-200">
                <FieldOpsIcon className="w-14 h-14" />
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-xl font-bold text-[#0f2547] text-center mt-6">
                Field Operations
              </h2>
              <p className="text-[13px] text-slate-500 text-center mt-1 font-normal">
                For field officers and ground teams
              </p>

              {/* Description */}
              <p className="text-[13.5px] text-slate-600 text-center mt-4 leading-relaxed font-normal min-h-[64px]">
                Report road conditions, incidents, bridge status, disruptions, photographs, and real-time field observations.
              </p>

              {/* Features List */}
              <div className="space-y-3 mt-6 mb-8 pl-1">
                <div className="flex items-center gap-3">
                  <CheckBadge colorClass="text-[#0284c7]" />
                  <span className="text-[13.5px] text-slate-700 font-normal">
                    Submit field reports
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckBadge colorClass="text-[#0284c7]" />
                  <span className="text-[13.5px] text-slate-700 font-normal">
                    Capture incident locations
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckBadge colorClass="text-[#0284c7]" />
                  <span className="text-[13.5px] text-slate-700 font-normal">
                    Upload photographs
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckBadge colorClass="text-[#0284c7]" />
                  <span className="text-[13.5px] text-slate-700 font-normal">
                    Offline-friendly reporting
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => navigate('/field')}
              className="w-full py-3 px-4 rounded-lg bg-[#0284c7] hover:bg-[#0369a1] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer group-hover:shadow-sm"
            >
              <span>Continue as Field User</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* CARD 3: Traveler & Public Access */}
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 p-8 flex flex-col justify-between relative group">
            <div>
              {/* Top Circular Icon */}
              <div className="w-24 h-24 rounded-full bg-[#e0f2fe] flex items-center justify-center mx-auto transition-transform group-hover:scale-105 duration-200">
                <TravelerMapIcon className="w-14 h-14" />
              </div>

              {/* Title & Subtitle */}
              <h2 className="text-xl font-bold text-[#0f2547] text-center mt-6">
                Traveler &amp; Public Access
              </h2>
              <p className="text-[13px] text-slate-500 text-center mt-1 font-normal">
                For travelers and citizens
              </p>

              {/* Description */}
              <p className="text-[13.5px] text-slate-600 text-center mt-4 leading-relaxed font-normal min-h-[64px]">
                Check road accessibility, weather conditions, disruptions, safer routes, and travel information across the North Eastern Region.
              </p>

              {/* Features List */}
              <div className="space-y-3 mt-6 mb-8 pl-1">
                <div className="flex items-center gap-3">
                  <CheckBadge colorClass="text-[#1d4ed8]" />
                  <span className="text-[13.5px] text-slate-700 font-normal">
                    Check road status
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckBadge colorClass="text-[#1d4ed8]" />
                  <span className="text-[13.5px] text-slate-700 font-normal">
                    View disruptions
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckBadge colorClass="text-[#1d4ed8]" />
                  <span className="text-[13.5px] text-slate-700 font-normal">
                    Weather &amp; risk information
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckBadge colorClass="text-[#1d4ed8]" />
                  <span className="text-[13.5px] text-slate-700 font-normal">
                    Route recommendations
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => handlePortalSelect('Traveler & Public Access')}
              className="w-full py-3 px-4 rounded-lg bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer group-hover:shadow-sm"
            >
              <span>Continue as Traveler</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>

        {/* Security Badge & Info */}
        <div className="mt-8 text-center select-none">
          <div className="inline-flex items-center justify-center gap-1.5 text-slate-800">
            <ShieldCheck className="w-4 h-4 text-[#1e3a8a]" />
            <span className="text-[13px] font-semibold text-[#0f2547]">Secure Government Platform</span>
          </div>
          <p className="text-[12px] text-slate-500 mt-0.5">
            Data access is based on user role and authorization.
          </p>
          <div className="w-full max-w-4xl mx-auto h-[1px] bg-slate-200/80 mt-6"></div>
        </div>

      </main>

      {/* Official Footer */}
      <Footer />

      {/* Portal Selected Interactive Modal */}
      {selectedPortalModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-slate-200 overflow-hidden text-center">
            <div className="bg-[#0f2547] text-white px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-left">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="font-semibold text-base">{selectedPortalModal}</h3>
              </div>
              <button 
                onClick={() => setSelectedPortalModal(null)}
                className="text-slate-300 hover:text-white p-1 rounded-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-slate-800 text-lg">Portal Selected</h4>
              <p className="text-sm text-slate-600 mt-2">
                You selected <strong>{selectedPortalModal}</strong>.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 mt-4 text-xs text-slate-600 text-left leading-relaxed">
                <span className="font-semibold text-slate-800">Ready for Next Page:</span> As instructed, I am waiting for you to share the picture of the next page (e.g. Login or Dashboard) so we can build it pin-to-pin exactly as in the photo!
              </div>
              <button
                onClick={() => setSelectedPortalModal(null)}
                className="mt-6 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Got it, keep on Page 2
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

