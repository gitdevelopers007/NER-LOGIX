import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck, Lock, Network, AlertCircle, Loader2, X, CheckCircle2 } from 'lucide-react';
import { GovernmentLoginHeader } from '../components/GovernmentLoginHeader';
import { authService } from '../services/authService';

export const GovernmentLogin: React.FC = () => {
  const navigate = useNavigate();

  // Form states
  const [officialId, setOfficialId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ officialId?: string; password?: string; general?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  // Forgot password modal state
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [recoveryId, setRecoveryId] = useState('');
  const [recoveryMessage, setRecoveryMessage] = useState<string | null>(null);
  const [recoveryLoading, setRecoveryLoading] = useState(false);

  // Validation function
  const validateForm = () => {
    const newErrors: { officialId?: string; password?: string } = {};

    if (!officialId.trim()) {
      newErrors.officialId = 'Government ID or Official Email is required.';
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

  // Submit Handler
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      const response = await authService.loginGovernment(officialId, password);
      if (response.success) {
        // Successful authentication -> navigate to Page 4: Government Command Center
        navigate('/government-command-center');
      } else {
        setErrors({ general: response.error || 'Authentication failed. Please check your credentials.' });
      }
    } catch {
      setErrors({ general: 'Unable to reach secure authentication service. Please retry.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Quick fill helper for review/testing
  const handleQuickFill = () => {
    setOfficialId('officer.ne@mdoner.gov.in');
    setPassword('SecureGovPass#2026');
    setErrors({});
  };

  // Handle password recovery
  const handleRecoverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recoveryId.trim()) return;

    setRecoveryLoading(true);
    const res = await authService.recoverPassword(recoveryId);
    setRecoveryLoading(false);
    setRecoveryMessage(res.message);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6fa] text-slate-800 relative antialiased select-none font-sans">
      
      {/* Official Government Header */}
      <GovernmentLoginHeader />

      {/* Main Viewport Container */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-14 relative z-10">
        
        {/* Center Login Card */}
        <div className="w-full max-w-[480px] bg-white border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-200/60 p-7 sm:p-9 relative">
          
          {/* Quick Demo Pre-fill Link */}
          <div className="flex justify-end mb-1">
            <button
              type="button"
              onClick={handleQuickFill}
              className="text-[11px] text-blue-600 hover:text-blue-800 transition-colors font-semibold cursor-pointer"
              title="Click to automatically fill valid demo credentials for fast review"
            >
              Prefill Demo Credentials
            </button>
          </div>

          {/* 1. Abstract Logistics Icon */}
          <div className="flex justify-center">
            <div className="w-13 h-13 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-xs">
              <Network className="w-6 h-6" />
            </div>
          </div>

          {/* 2. Heading & 3. Subtitle */}
          <div className="text-center mt-3 mb-6">
            <h1 className="text-2xl font-black tracking-tight text-[#0c2340] uppercase">
              GOVERNMENT PORTAL
            </h1>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
              Regional Logistics Intelligence
            </p>
          </div>

          {/* General Error Banner if authentication fails */}
          {errors.general && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
              <span>{errors.general}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSignIn} className="space-y-4" noValidate>
            
            {/* 4. Government ID Field */}
            <div>
              <label 
                htmlFor="officialId"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
              >
                Government ID / Official Email
              </label>
              <input
                id="officialId"
                type="text"
                value={officialId}
                onChange={(e) => {
                  setOfficialId(e.target.value);
                  if (errors.officialId) setErrors((prev) => ({ ...prev, officialId: undefined }));
                }}
                placeholder="Enter your official ID or email"
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

            {/* 5. Password Field */}
            <div>
              <label 
                htmlFor="password"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5"
              >
                Password
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
                  placeholder="Enter your password"
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
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-[#1a56db] hover:bg-[#1546b8] active:bg-[#0f348c] disabled:opacity-60 text-white font-bold text-xs tracking-wider uppercase rounded-lg flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>AUTHENTICATING CREDENTIALS...</span>
                  </>
                ) : (
                  <span>SIGN IN TO COMMAND CENTER</span>
                )}
              </button>
            </div>

          </form>

          {/* Forgot Password Link */}
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => {
                setRecoveryId(officialId);
                setRecoveryMessage(null);
                setForgotModalOpen(true);
              }}
              className="text-xs text-slate-500 hover:text-blue-600 transition-colors cursor-pointer font-medium hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Thin Divider Line inside card */}
          <div className="w-full h-[1px] bg-slate-200 my-5"></div>

          {/* Security Indicator */}
          <div className="flex items-center justify-center gap-2 text-slate-500 text-xs">
            <Lock className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-medium text-[12px]">Authorized Government Personnel Only</span>
          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="w-full py-5 text-center relative z-10 border-t border-slate-200 bg-white/60">
        <p className="text-xs text-slate-500 font-normal">
          NER-LOGIX • North Eastern Region Logistics &amp; Accessibility Intelligence
        </p>
      </footer>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl max-w-md w-full p-6 text-left relative">
            <button
              onClick={() => setForgotModalOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-3">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-[#0c2340] text-base">Password Recovery</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Enter your official government ID or registered email address. A secure recovery link and verification OTP will be dispatched to your authorized credentials.
            </p>

            {recoveryMessage ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800 flex items-start gap-2 mb-4">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{recoveryMessage}</span>
              </div>
            ) : (
              <form onSubmit={handleRecoverySubmit} className="space-y-3 mb-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Official Government Email / ID
                  </label>
                  <input
                    type="text"
                    value={recoveryId}
                    onChange={(e) => setRecoveryId(e.target.value)}
                    placeholder="e.g. officer@mdoner.gov.in"
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:bg-white"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={recoveryLoading}
                  className="w-full h-10 bg-[#1a56db] hover:bg-[#1546b8] text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  {recoveryLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending Instructions...</span>
                    </>
                  ) : (
                    <span>Send Reset Link &amp; OTP</span>
                  )}
                </button>
              </form>
            )}

            <div className="flex justify-end pt-2 border-t border-slate-200">
              <button
                onClick={() => setForgotModalOpen(false)}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};