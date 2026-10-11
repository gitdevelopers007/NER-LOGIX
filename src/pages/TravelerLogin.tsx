import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, EyeOff, Lock, Truck, ShieldAlert, 
  MapPin, Loader2, ArrowRight, CheckCircle2, 
  Compass, Radio, HeartPulse, User, Zap, AlertTriangle
} from 'lucide-react';
import { GovernmentLoginHeader } from '../components/GovernmentLoginHeader';

export interface TravelerPersona {
  id: string;
  code: string;
  title: string;
  defaultId: string;
  defaultPass: string;
  badge: string;
  badgeColor: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  unlockedFeatures: string[];
}

export const TRAVELER_PERSONAS: TravelerPersona[] = [
  {
    id: 'persona_freight',
    code: 'COMMERCIAL_FREIGHT',
    title: 'Commercial Freight & Truck Carrier',
    defaultId: 'AS-01-TRUCK-8892',
    defaultPass: 'Freight#2026',
    badge: 'LOGISTICS CARRIER',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    icon: Truck,
    description: 'Heavy vehicle freight movement, bridge axle tonnage limits & commercial bypass detours.',
    unlockedFeatures: [
      'Gross Vehicle Weight (GVW) Bridge Tolerances',
      'Heavy Axle Slope & Turning Radius Alerts',
      'Highway Diesel Outposts & Truck Rest Bays'
    ]
  },
  {
    id: 'persona_medical',
    code: 'EMERGENCY_MEDICAL',
    title: 'Emergency Medical & Relief Convoy',
    defaultId: 'EMERGENCY-AMB-108',
    defaultPass: 'MedPass#2026',
    badge: 'PRIORITY RELIEF',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    icon: HeartPulse,
    description: 'Hospital cold-chain, oxygen cylinder transport & rapid trauma hospital corridors.',
    unlockedFeatures: [
      'Priority Green Corridor Mountain Pass Access',
      'Trauma Care & Blood Bank Route Corridors',
      'Direct Broadcast to State Police Traffic Desks'
    ]
  },
  {
    id: 'persona_citizen',
    code: 'CITIZEN_COMMUTER',
    title: 'Citizen, Commuter & Tourist',
    defaultId: 'CITIZEN-NER-GUEST',
    defaultPass: 'Public#2026',
    badge: 'PUBLIC CITIZEN',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    icon: Compass,
    description: 'Mountain highway passability, live IMD radar warnings, landslide bulletins & offline passes.',
    unlockedFeatures: [
      'Real-Time Road Closure & Landslide Bulletins',
      'Live IMD Weather Radar & Flood Warnings',
      'Downloadable Offline Mountain Journey Pass'
    ]
  }
];

export const TravelerLogin: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPersona, setSelectedPersona] = useState<TravelerPersona>(TRAVELER_PERSONAS[0]);
  const [accessId, setAccessId] = useState<string>(TRAVELER_PERSONAS[0].defaultId);
  const [password, setPassword] = useState<string>(TRAVELER_PERSONAS[0].defaultPass);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [demoLoading, setDemoLoading] = useState<boolean>(false);

  const handleSelectPersona = (persona: TravelerPersona) => {
    setSelectedPersona(persona);
    setAccessId(persona.defaultId);
    setPassword(persona.defaultPass);
  };

  const handleLogin = (personaToUse?: TravelerPersona) => {
    const active = personaToUse || selectedPersona;
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('traveler_user_role', active.code);
      localStorage.setItem('traveler_user_name', active.title);
      localStorage.setItem('traveler_user_id', active.defaultId);
      localStorage.setItem('traveler_auth_token', `pub_token_${Date.now()}`);
      navigate('/traveler');
    }, 400);
  };

  const handle1ClickDemo = () => {
    setDemoLoading(true);
    setTimeout(() => {
      localStorage.setItem('traveler_user_role', selectedPersona.code);
      localStorage.setItem('traveler_user_name', selectedPersona.title);
      localStorage.setItem('traveler_user_id', selectedPersona.defaultId);
      localStorage.setItem('traveler_auth_token', `demo_token_${Date.now()}`);
      navigate('/traveler');
    }, 350);
  };

  const handleGuestAccess = () => {
    localStorage.setItem('traveler_user_role', 'CITIZEN_COMMUTER');
    localStorage.setItem('traveler_user_name', 'Guest Traveler');
    localStorage.setItem('traveler_user_id', 'GUEST-USER');
    navigate('/traveler');
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col font-sans select-none">
      {/* Official Top Bar */}
      <GovernmentLoginHeader 
        portalTitle="PUBLIC TRAVELER & LOGISTICS ADVISORY" 
        backTo="/access-portal"
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-center">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold border border-blue-200 mb-3">
            <Radio className="w-3.5 h-3.5 text-blue-700 animate-pulse" />
            <span>SIH 2026 • PUBLIC LOGISTICS & DISASTER ADVISORY DESK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0b1a30] tracking-tight">
            North Eastern Region Highway Advisory Portal
          </h1>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Real-time highway passability, mountain pass landslide alerts, and verified bypass detours across the 8 North Eastern states.
          </p>
        </div>

        {/* 2-Column Interface: Left = Role Cards, Right = Form & Guest Pass */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Select Persona Profile (7 cols) */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Step 1: Select Traveler / Transporter Profile
              </span>
              <span className="text-xs text-blue-700 font-semibold">
                Click card to pre-fill credentials
              </span>
            </div>

            {TRAVELER_PERSONAS.map((persona) => {
              const Icon = persona.icon;
              const isSelected = selectedPersona.id === persona.id;

              return (
                <div
                  key={persona.id}
                  onClick={() => handleSelectPersona(persona)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-500/20'
                      : 'bg-white/80 hover:bg-white border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`p-2.5 rounded-lg shrink-0 ${
                        isSelected ? 'bg-[#0b1a30] text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-slate-900 leading-snug">
                            {persona.title}
                          </h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${persona.badgeColor}`}>
                            {persona.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {persona.description}
                        </p>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Feature Pills */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {persona.unlockedFeatures.map((feat, idx) => (
                      <span 
                        key={idx}
                        className="text-[11px] font-medium bg-slate-50 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Public Utility Notice */}
            <div className="bg-blue-50/80 border border-blue-200/80 rounded-xl p-3.5 text-xs text-blue-900 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong>Government Accessibility Mandate:</strong> No registration required for emergency road status. Public travelers can use <strong>Instant Guest Access</strong> below.
              </div>
            </div>
          </div>

          {/* Right Column: Authentication Card & Guest Access (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Active Selection
              </span>
              <div className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                {React.createElement(selectedPersona.icon, { className: 'w-5 h-5 text-blue-700 shrink-0' })}
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">{selectedPersona.title}</div>
                  <div className="text-[11px] text-slate-500 font-mono truncate">{selectedPersona.defaultId}</div>
                </div>
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Transporter / Vehicle / Access ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={accessId}
                    onChange={(e) => setAccessId(e.target.value)}
                    required
                    className="w-full text-xs font-mono font-medium py-2.5 px-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Vehicle No or Mobile No"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Access Key / PIN
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full text-xs font-mono font-medium py-2.5 px-3 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Security PIN"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#0b1a30] hover:bg-[#071223] active:bg-black text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Transporter Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Actions Separator */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-2 text-[10px] uppercase font-bold text-slate-400 absolute">
                Fast Evaluator Access
              </span>
            </div>

            {/* 1-Click Demo Login */}
            <button
              type="button"
              onClick={handle1ClickDemo}
              disabled={demoLoading}
              className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>
                {demoLoading ? 'Logging In...' : `1-Click Evaluator Login (${selectedPersona.badge})`}
              </span>
            </button>

            {/* Guest / Public Citizen Mode Button */}
            <button
              type="button"
              onClick={handleGuestAccess}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 border border-slate-300 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>Continue as Guest Traveler (No Login)</span>
            </button>

            {/* Emergency Hotline Info */}
            <div className="pt-2 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-500">
                National Highway Emergency Dispatch: <strong className="text-red-600 font-mono">112 / 1070</strong>
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};
