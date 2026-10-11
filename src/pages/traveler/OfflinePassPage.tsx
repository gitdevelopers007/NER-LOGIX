import React, { useState } from 'react';
import {
  FileCheck,
  QrCode,
  Download,
  Share2,
  Printer,
  Smartphone,
  ShieldCheck,
  AlertCircle,
  Truck,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Calendar,
  Lock
} from 'lucide-react';

export const OfflinePassPage: React.FC = () => {
  const [driverName, setDriverName] = useState('Bikash Gogoi');
  const [vehicleNumber, setVehicleNumber] = useState('AS-01-EC-9418');
  const [vehicleType, setVehicleType] = useState('Heavy Commercial Truck (16-Wheeler Multi-Axle)');
  const [corridor, setCorridor] = useState('NH-27 / NH-6 (Guwahati to Silchar)');
  const [contactNumber, setContactNumber] = useState('+91 94350 12345');
  const [gvwTonnage, setGvwTonnage] = useState('24.5 MT');
  
  const [smsSent, setSmsSent] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const passId = `NER-PASS-2026-${Math.floor(100000 + Math.random() * 900000)}`;
  const validUntil = '14-Oct-2026 23:59 IST (72 Hours)';

  const handleSendSms = (e: React.FormEvent) => {
    e.preventDefault();
    setSmsSent(true);
    setTimeout(() => setSmsSent(false), 5000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyPass = () => {
    const text = `[GOVT OF INDIA / MDoNER / NER-LOGIX]\nOFFICIAL DIGITAL MOUNTAIN CORRIDOR PASS\nPass ID: ${passId}\nDriver: ${driverName}\nVehicle: ${vehicleNumber} (${vehicleType})\nCorridor: ${corridor}\nGVW: ${gvwTonnage}\nValidity: ${validUntil}\nEmergency SOS: 112 / 1070\nAnti-Rumor Verified: YES`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0b1a30] via-[#0f284e] to-[#0b1a30] p-6 rounded-xl border border-blue-900/60 shadow-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40 uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-blue-400" />
                Zero-Connectivity Offline Verification
              </span>
              <span className="text-xs text-slate-300">GIGW 3.0 & IT Act 2000 Compliant</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Digital Route Pass & 2G SMS Dispatch</h1>
            <p className="text-sm text-slate-300 mt-1">
              Generate cryptographic QR route safety passes and push encrypted low-bandwidth SMS summaries for offline mountain transit in cellular dead zones.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-sm transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print Pass
            </button>
            <button
              onClick={handleCopyPass}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              {isCopied ? 'Copied to Clipboard!' : 'Share Pass Text'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Details customization */}
        <div className="lg:col-span-5 bg-[#0f172a] p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-base font-semibold text-white">Journey & Vehicle Manifest</h2>
            <p className="text-xs text-slate-400 mt-0.5">Customize fields before generating or dispatching</p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Driver / Carrier Representative Name</label>
              <input
                type="text"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Registered Vehicle Registration No.</label>
              <input
                type="text"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500 uppercase"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Corridor & Routing Plan</label>
              <input
                type="text"
                value={corridor}
                onChange={(e) => setCorridor(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Gross Weight (GVW)</label>
                <input
                  type="text"
                  value={gvwTonnage}
                  onChange={(e) => setGvwTonnage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Registered Mobile</label>
                <input
                  type="text"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* 2G SMS Dispatch Trigger Box */}
          <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold text-xs">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <span>Low-Bandwidth 2G SMS Dispatch (Fallback)</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              When heading into zero-reception valleys (e.g. Sela or Haflong gorges), send this 140-character emergency route pass string directly to your feature phone.
            </p>

            <form onSubmit={handleSendSms} className="space-y-2">
              <button
                type="submit"
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                Dispatch Emergency SMS to {contactNumber}
              </button>

              {smsSent && (
                <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>SMS Dispatched! Checksum: <strong>0x9FC2B</strong> delivered via BSNL/Airtel 2G Gateway.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right Preview: Official Government Digital Route Pass Card */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#ffffff] text-slate-900 rounded-xl p-6 shadow-2xl border-4 border-blue-950 relative overflow-hidden">
            {/* Watermark effect */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
              <span className="text-8xl font-black text-slate-900 transform -rotate-45">NER-LOGIX</span>
            </div>

            {/* Official Header */}
            <div className="flex items-start justify-between border-b-2 border-slate-300 pb-4">
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  GOVERNMENT OF INDIA · MINISTRY OF DEVELOPMENT OF NORTH EASTERN REGION
                </div>
                <h3 className="text-xl font-black tracking-tight text-[#0b1a30] mt-0.5">
                  OFFICIAL MOUNTAIN HIGHWAY TRANSIT PASS
                </h3>
                <div className="text-xs font-semibold text-blue-900 mt-0.5">
                  NER-LOGIX Unified Arterial Road Telemetry System
                </div>
              </div>

              {/* Status Badge */}
              <div className="text-right">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-extrabold text-xs border border-emerald-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  AUTHENTICATED
                </span>
                <div className="text-[10px] font-mono text-slate-500 mt-1">{passId}</div>
              </div>
            </div>

            {/* Pass Body Content */}
            <div className="grid grid-cols-3 gap-4 mt-5">
              <div className="col-span-2 space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 font-medium">Assigned Driver / Convoy Lead:</span>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{driverName}</div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-500 font-medium">Vehicle Plate:</span>
                    <div className="text-sm font-black font-mono text-slate-900">{vehicleNumber}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Gross Weight:</span>
                    <div className="text-sm font-black font-mono text-blue-900">{gvwTonnage}</div>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 font-medium">Authorized Corridor:</span>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">{corridor}</div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
                  <div>
                    <span className="text-slate-500 font-medium">Validity Window:</span>
                    <div className="text-[11px] font-semibold text-slate-800">{validUntil}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Emergency Hotlines:</span>
                    <div className="text-[11px] font-bold text-rose-700">112 / 1070 / BRO 1033</div>
                  </div>
                </div>
              </div>

              {/* QR Code Representation */}
              <div className="col-span-1 flex flex-col items-center justify-center p-3 bg-slate-50 border border-slate-300 rounded-lg text-center">
                <div className="w-28 h-28 bg-white border-2 border-slate-900 rounded p-1 flex items-center justify-center shadow-inner">
                  {/* SVG QR Code Simulation */}
                  <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="0" y="0" width="30" height="30" />
                    <rect x="5" y="5" width="20" height="20" fill="white" />
                    <rect x="10" y="10" width="10" height="10" />

                    <rect x="70" y="0" width="30" height="30" />
                    <rect x="75" y="5" width="20" height="20" fill="white" />
                    <rect x="80" y="10" width="10" height="10" />

                    <rect x="0" y="70" width="30" height="30" />
                    <rect x="5" y="75" width="20" height="20" fill="white" />
                    <rect x="10" y="80" width="10" height="10" />

                    <rect x="35" y="10" width="8" height="8" />
                    <rect x="50" y="10" width="12" height="8" />
                    <rect x="40" y="35" width="20" height="12" />
                    <rect x="70" y="45" width="12" height="18" />
                    <rect x="25" y="50" width="10" height="15" />
                    <rect x="45" y="70" width="15" height="10" />
                    <rect x="75" y="75" width="15" height="15" />
                  </svg>
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-2 font-semibold">
                  CRYPT-VERIFIED
                </div>
                <div className="text-[9px] text-slate-400 mt-0.5">
                  Scan offline at any BRO / Police Checkpost
                </div>
              </div>
            </div>

            {/* Legal Notice Footer */}
            <div className="mt-5 pt-3 border-t border-slate-300 flex items-center justify-between text-[10px] text-slate-600">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-slate-500" />
                Valid without active internet connectivity on ground inspection.
              </span>
              <span className="font-mono text-slate-400">SHA256: e83b...40f1</span>
            </div>
          </div>

          {/* Guidance Alert */}
          <div className="bg-blue-950/30 border border-blue-900/50 rounded-xl p-4 text-xs text-blue-200 space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-blue-400" />
              Inspector Instruction for Checkposts (BRO / Assam Rifles / State Police):
            </div>
            <p className="text-slate-300 leading-relaxed">
              Scan QR code using the NER-LOGIX Field App in offline mode. The public key stored in local IndexedDB will cryptographically verify driver authenticity, cargo clearance, and bridge axle limits without requiring a central database query.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OfflinePassPage;
