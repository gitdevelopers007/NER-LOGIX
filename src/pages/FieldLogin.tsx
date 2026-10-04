import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, EyeOff, Lock, Radio, AlertCircle, 
  Loader2, ExternalLink, ArrowRight, Truck, MapPin, 
  Shield, Zap
} from 'lucide-react';
import { GovernmentLoginHeader } from '../components/GovernmentLoginHeader';

interface FieldRoleProfile {
  id: string;
  title: string;
  name: string;
  roleCode: string;
  email: string;
  defaultPass: string;
  unit: string;
  sector: string;
  clearance: string;
  badgeColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

const FIELD_ROLES: FieldRoleProfile[] = [
  {
    id: 'patrol',
    title: 'Highway Patrol Officer',
    name: 'Officer T. Ronya',
    roleCode: 'FIELD_OFFICER',
    email: 'officer.ronya@mdoner.gov.in',
    defaultPass: 'FieldPatrol#2026',
    unit: 'East Kameng Highway Patrol Unit 4',
    sector: 'NH-13 Pasighat-Mariyang Corridor (Arunachal)',
    clearance: 'Level 2 - Mountain Border Clearance',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    icon: Radio
  },
  {
    id: 'bro',
    title: 'BRO Quick Reaction Unit',
    name: 'Maj. S. Banerjee',
    roleCode: 'BRO_COMMANDER',
    email: 'bro.vartak@bro.nic.in',
    defaultPass: 'BroVartak#2026',
    unit: '753 Border Roads Task Force / Project Vartak',
    sector: 'BCT Axis, Sela Pass & Tawang Lifeline',
    clearance: 'Military Highway Engineering Cleared',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    icon: Shield
  },
  {
    id: 'sdma',
    title: 'SDMA Field Disaster Surveyor',
    name: 'P. Hazarika',
    roleCode: 'SDMA_SURVEYOR',
    email: 'surveyor.dima@sdma.gov.in',
    defaultPass: 'SdmaAssam#2026',
    unit: 'Dima Hasao Disaster Rapid Assessment Squad',
    sector: 'NH-27 Lumding-Haflong Ridge & Barak Lifeline',
    clearance: 'Rapid Damage Assessment Level 3',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    icon: MapPin
  },
  {
    id: 'convoy',
    title: 'Critical Logistics Fleet Escort',
    name: 'R. Sangma',
    roleCode: 'CONVOY_LEAD',
    email: 'convoy.fci@mdoner.gov.in',
    defaultPass: 'ConvoyFleet#2026',
    unit: 'FCI Essential Supplies Heavy Transport Detachment',
    sector: 'Guwahati-Shillong-Silchar Mountain Lifeline',
    clearance: 'Hazardous Terrain Fleet Operator',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    icon: Truck
  }
];

export const FieldLogin: React.FC = () => {
  const navigate = useNavigate();

  // Selected role profile
  const [selectedRole, setSelectedRole] = useState<FieldRoleProfile>(FIELD_ROLES[0]);
  const [officialId, setOfficialId] = useState(FIELD_ROLES[0].email);
  const [password, setPassword] = useState(FIELD_ROLES[0].defaultPass);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ officialId?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Switch role handler
  const handleSelectRole = (role: FieldRoleProfile) => {
    setSelectedRole(role);
    setOfficialId(role.email);
    setPassword(role.defaultPass);
    setErrors({});
  };

  // Validation
  const validateForm = () => {
    const newErrors: { officialId?: string; password?: string } = {};

    if (!officialId.trim()) {
      newErrors.officialId = 'Field Officer ID or registered email is required.';
    } else if (officialId.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(officialId)) {
      newErrors.officialId = 'Please enter a valid official email address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Submit
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    setTimeout(() => {
      // Store session state in localStorage for Field Layout & Incident Reporting
      localStorage.setItem('demo_user_name', selectedRole.name);
      localStorage.setItem('demo_user_role', selectedRole.roleCode);
      localStorage.setItem('demo_user_email', officialId);
      localStorage.setItem('demo_user_unit', selectedRole.unit);
      localStorage.setItem('demo_user_sector', selectedRole.sector);
      localStorage.setItem('demo_user_clearance', selectedRole.clearance);
      localStorage.setItem('field_auth_token', `ft_${Date.now()}`);

      setIsLoading(false);
      // Navigate to internal field app
      navigate('/field');
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6fa] text-slate-800 relative antialiased select-none font-sans">
      
      {/* Official Government Header */}
      <GovernmentLoginHeader portalTitle="FIELD OPERATIONS PORTAL" backTo="/access-portal" />

      {/* Main Container */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12 relative z-10">
        
        {/* Direct Launcher Card */}
        <div className="w-full max-w-[560px] bg-gradient-to-r from-blue-900 to-[#0c2340] text-white rounded-2xl p-4 sm:p-5 mb-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 border border-blue-800">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-blue-600/40 border border-blue-400/30 flex items-center justify-center text-blue-200 shrink-0">
              <Zap className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black tracking-wide uppercase">Direct Standalone App</span>
                <span className="text-[10px] bg-emerald-500/30 text-emerald-300 font-mono px-1.5 py-0.2 rounded border border-emerald-400/40">
                  LIVE PWA
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Launch the dedicated, offline-first Field Operation App directly in a separate window.
              </p>
            </div>
          </div>

          <a
            href="https://ner-logix-field-operation-app.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto shrink-0 px-4 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-colors cursor-pointer"
          >
            <span>Open Standalone App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Center Login Card */}
        <div className="w-full max-w-[560px] bg-white border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-200/60 p-6 sm:p-8 relative">
          
          {/* Top Icon & Heading */}
          <div className="flex justify-center">
            <div className="w-13 h-13 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-xs">
              <Radio className="w-6 h-6" />
            </div>
          </div>

          <div className="text-center mt-3 mb-6">
            <h1 className="text-2xl font-black tracking-tight text-[#0c2340] uppercase">
              FIELD OPERATIONS LOGIN
            </h1>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Offline-First Incident Logging &amp; Ground Telemetry
            </p>
          </div>

          {/* Quick Role Selection Tabs */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                Select Field Role Profile:
              </span>
              <span className="text-[10.5px] text-blue-600 font-semibold">
                Click to switch persona
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {FIELD_ROLES.map((role) => {
                const isSelected = selectedRole.id === role.id;
                const RoleIcon = role.icon;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => handleSelectRole(role)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/60 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      <RoleIcon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-slate-900 leading-tight truncate">
                        {role.title}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">
                        {role.name}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Role Operational Details Pill */}
            <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800">{selectedRole.unit}</span>
                <span className={`text-[9.5px] px-2 py-0.5 rounded font-bold border ${selectedRole.badgeColor}`}>
                  {selectedRole.roleCode}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Assigned: {selectedRole.sector}
              </div>
            </div>
          </div>

          {/* General Error Banner */}
          {errors.general && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
              <span>{errors.general}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSignIn} className="space-y-4" noValidate>
            
            {/* Field ID / Email */}
            <div>
              <label 
                htmlFor="officialId"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
              >
                Operator ID / Official Email
              </label>
              <input
                id="officialId"
                type="text"
                value={officialId}
                onChange={(e) => {
                  setOfficialId(e.target.value);
                  if (errors.officialId) setErrors((prev) => ({ ...prev, officialId: undefined }));
                }}
                placeholder="Enter operator ID"
                disabled={isLoading}
                className={`w-full h-11 px-3.5 bg-slate-50 border rounded-lg text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                  errors.officialId
                    ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'border-slate-300 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                }`}
              />
              {errors.officialId && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.officialId}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label 
                htmlFor="password"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
              >
                Operational Access Key / Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                  placeholder="Enter password"
                  disabled={isLoading}
                  className={`w-full h-11 pl-3.5 pr-11 bg-slate-50 border rounded-lg text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all ${
                    errors.password
                      ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                      : 'border-slate-300 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="pt-2 space-y-2.5">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-[#1a56db] hover:bg-[#1546b8] active:bg-[#0f348c] disabled:opacity-60 text-white font-bold text-xs tracking-wider uppercase rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>AUTHENTICATING GROUND UNIT...</span>
                  </>
                ) : (
                  <>
                    <span>SIGN IN AS {selectedRole.title.toUpperCase()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate('/field/report')}
                className="w-full h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Jump Directly to Incident Reporting Kit</span>
              </button>
            </div>

          </form>

          {/* Navigation Links */}
          <div className="flex items-center justify-between text-xs mt-5 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => navigate('/government-login')}
              className="text-slate-500 hover:text-blue-600 transition-colors font-medium cursor-pointer"
            >
              Switch to Government Login →
            </button>
            <button
              type="button"
              onClick={() => navigate('/access-portal')}
              className="text-slate-500 hover:text-blue-600 transition-colors font-medium cursor-pointer"
            >
              Portal Selection
            </button>
          </div>

          {/* Security & Offline Indicator */}
          <div className="flex items-center justify-center gap-2 text-slate-500 text-xs mt-4">
            <Lock className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-medium text-[11.5px]">
              Offline IndexedDB Sync &amp; 2G Adaptive Compression Enabled
            </span>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center relative z-10 border-t border-slate-200 bg-white/60">
        <p className="text-xs text-slate-500 font-normal">
          NER-LOGIX • North Eastern Region Field Operations &amp; Disaster Accessibility Intelligence
        </p>
      </footer>

    </div>
  );
};
