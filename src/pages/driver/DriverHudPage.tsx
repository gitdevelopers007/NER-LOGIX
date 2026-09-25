import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Truck, AlertTriangle, ShieldAlert, ArrowLeft,
  Navigation, PhoneCall, Radio, CheckCircle2, RotateCw
} from 'lucide-react';
import { NerLogixLogo } from '../../components/NerLogixLogo';

export const DriverHudPage: React.FC = () => {
  const navigate = useNavigate();

  // Driving Telemetry Simulation
  const [speed, setSpeed] = useState(44);
  const [heading] = useState(142);
  const [distanceRemaining, setDistanceRemaining] = useState(128);
  const [hasHazardAhead, setHasHazardAhead] = useState(true);
  const [detourActive, setDetourActive] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [sosSent, setSosSent] = useState(false);
  const [toastNotice, setToastNotice] = useState<string | null>(null);

  // Speedometer fluctuation simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.min(65, Math.max(30, prev + delta));
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleApplyDetour = () => {
    setDetourActive(true);
    setHasHazardAhead(false);
    setDistanceRemaining(142); // 14 km bypass addition
    setToastNotice('Dynamic Detour Accepted! Recalculated via Foothills Bypass. Choke point avoided.');
    setTimeout(() => setToastNotice(null), 5000);
  };

  const handleTriggerSOS = () => {
    setSosSent(true);
    setTimeout(() => {
      setSosModalOpen(false);
      setSosSent(false);
      setToastNotice('🚨 SOS Distress Packet broadcasted to NER-LOGIX Command Center & Nearest Highway Patrol.');
      setTimeout(() => setToastNotice(null), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      
      {/* 1. TOP TACTICAL HUD BAR */}
      <header className="bg-[#091322] border-b border-cyan-900/40 px-4 lg:px-6 py-2.5 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/logistics')}
            className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-slate-800"
            title="Return to Command Center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <NerLogixLogo variant="white" />
            <span className="font-bold text-sm tracking-wider text-cyan-400">NER-LOGIX</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              VEHICLE: AS-01-DM-1001 (NER-001)
            </span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
              IN-TRANSIT
            </span>
          </div>
        </div>

        {/* SOS DISTRESS TRIGGER */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-cyan-300">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>GNSS Fix: ±2.4m</span>
          </div>

          <button
            onClick={() => setSosModalOpen(true)}
            className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(225,29,72,0.4)] animate-pulse cursor-pointer border border-rose-400"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>EMERGENCY SOS</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN HUD SCREEN */}
      <main className="flex-1 p-4 lg:p-6 max-w-7xl mx-auto w-full space-y-4">
        
        {/* TOAST ALERT */}
        {toastNotice && (
          <div className="bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 px-4 py-3 rounded-xl flex items-center gap-2 text-xs font-semibold shadow-lg animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastNotice}</span>
          </div>
        )}

        {/* ACTIVE HAZARD WARNING BANNER */}
        {hasHazardAhead && (
          <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-amber-950 border-2 border-rose-500/80 rounded-2xl p-4 shadow-[0_0_30px_rgba(225,29,72,0.25)] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white shrink-0 animate-bounce">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider text-rose-300 bg-rose-900/80 px-2 py-0.5 rounded border border-rose-700">
                      CRITICAL HAZARD DETECTED 18 KM AHEAD
                    </span>
                    <span className="text-[10px] text-slate-300 font-mono">BRO Alert Broadcast</span>
                  </div>
                  <h2 className="text-sm lg:text-base font-bold text-white">
                    Active Slope Failure on NH-13 sector 4 (Lower Subansiri KM-142)
                  </h2>
                  <p className="text-xs text-rose-200">
                    500 tons of boulder debris across both lanes. Approaching freight will be trapped for an estimated <strong>+8h 30m</strong> if route is not diverted.
                  </p>
                </div>
              </div>

              {/* 1-TAP DETOUR RECALCULATION BUTTON */}
              <button
                onClick={handleApplyDetour}
                className="px-5 py-3 bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer shrink-0 border border-white/20"
              >
                <RotateCw className="w-4 h-4 animate-spin" />
                <span>1-Tap Safe Detour (Bypass Slide)</span>
              </button>
            </div>
          </div>
        )}

        {/* DETOUR CONFIRMED STATE */}
        {detourActive && (
          <div className="bg-emerald-950/80 border border-emerald-500/60 rounded-xl p-3.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div>
                <span className="font-bold text-white">Safe Alternate Corridor Active:</span>
                <span className="text-emerald-300 ml-1.5 font-mono">Diverted via Tezpur-Itanagar Foothills Bypass (100% Passable)</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-700">
              SAVED +8h 30m DELAY
            </span>
          </div>
        )}

        {/* 3. TACTICAL SPEEDOMETER & TELEMETRY GAUGES */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* SPEEDOMETER & HEADING (5 cols) */}
          <div className="md:col-span-5 bg-[#091322] border border-cyan-900/30 rounded-2xl p-5 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-3 left-4 text-[10px] font-bold text-cyan-400 uppercase tracking-widest font-mono">
              TACTICAL SPEEDOMETER
            </div>

            {/* Circular Digital Readout */}
            <div className="my-3 relative flex flex-col items-center justify-center w-44 h-44 rounded-full border-4 border-cyan-500/20 bg-gradient-to-b from-[#0e1e36] to-[#060e1a] shadow-[0_0_30px_rgba(6,182,212,0.15)]">
              <span className="text-5xl font-black text-white font-mono tracking-tight">{speed}</span>
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">KM / H</span>
              <div className="text-[10px] text-slate-400 font-mono mt-1">Avg 48 km/h</div>
            </div>

            {/* Sub-gauges */}
            <div className="grid grid-cols-3 gap-2 w-full pt-2 border-t border-slate-800 text-center font-mono">
              <div className="p-2 bg-slate-900/60 rounded-lg border border-slate-800">
                <span className="text-[9px] text-slate-400 block">HEADING</span>
                <strong className="text-xs text-white">{heading}° SE</strong>
              </div>
              <div className="p-2 bg-slate-900/60 rounded-lg border border-slate-800">
                <span className="text-[9px] text-slate-400 block">ELEVATION</span>
                <strong className="text-xs text-cyan-300">1,420 m</strong>
              </div>
              <div className="p-2 bg-slate-900/60 rounded-lg border border-slate-800">
                <span className="text-[9px] text-slate-400 block">SLOPE</span>
                <strong className="text-xs text-emerald-400">8.2% Grad</strong>
              </div>
            </div>
          </div>

          {/* TRIP PROGRESS & CONSIGNMENT MANIFEST (7 cols) */}
          <div className="md:col-span-7 bg-[#091322] border border-cyan-900/30 rounded-2xl p-5 space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest font-mono">
                  ACTIVE CONSIGNMENT MANIFEST
                </span>
                <h3 className="text-sm font-bold text-white mt-0.5">Waybill: CN-2026-MED-107</h3>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded">
                COLD CHAIN VERIFIED
              </span>
            </div>

            {/* Consignment Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2.5 bg-slate-900/70 rounded-xl border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block font-medium">Cargo Category</span>
                <strong className="text-slate-100">Medicines &amp; Vaccines</strong>
              </div>
              <div className="p-2.5 bg-slate-900/70 rounded-xl border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block font-medium">Payload Quantity</span>
                <strong className="text-slate-100">500 Essential Kits</strong>
              </div>
              <div className="p-2.5 bg-slate-900/70 rounded-xl border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block font-medium">Target Hospital</span>
                <strong className="text-cyan-300">Itanagar Civil Hospital</strong>
              </div>
            </div>

            {/* Distance & Dynamic ETA Countdown */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-gradient-to-r from-blue-950/60 to-cyan-950/60 p-3.5 rounded-xl border border-cyan-800/40">
                <span className="text-[10px] font-mono text-cyan-300 uppercase block">Remaining Distance</span>
                <div className="text-2xl font-black text-white font-mono mt-0.5">{distanceRemaining} km</div>
                <span className="text-[10px] text-slate-400 font-mono">Next waypoint in 24 km</span>
              </div>

              <div className="bg-gradient-to-r from-blue-950/60 to-cyan-950/60 p-3.5 rounded-xl border border-cyan-800/40">
                <span className="text-[10px] font-mono text-cyan-300 uppercase block">Dynamic Arrival ETA</span>
                <div className="text-2xl font-black text-emerald-400 font-mono mt-0.5">3h 20m</div>
                <span className="text-[10px] text-slate-400 font-mono">Arrival ~ 00:45 AM IST</span>
              </div>
            </div>

            {/* Waypoint Breadcrumb */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                CORRIDOR WAYPOINTS
              </span>
              <div className="flex items-center gap-2 text-xs font-mono flex-wrap">
                <span className="text-slate-400">Guwahati Depot (Departed)</span>
                <span className="text-slate-600">→</span>
                <span className="text-cyan-400 font-bold">Tezpur Bypass (Current)</span>
                <span className="text-slate-600">→</span>
                <span className="text-slate-400">Banderdewa Gate</span>
                <span className="text-slate-600">→</span>
                <span className="text-slate-400">Itanagar Hub</span>
              </div>
            </div>

          </div>

        </div>

        {/* 4. DRIVER QUICK ACTIONS & INCIDENT REPORTING */}
        <div className="bg-[#091322] border border-cyan-900/30 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-cyan-400" />
              <span>Driver Quick Roadside Hazard Reporting</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Instant GPS Tagged</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              onClick={() => {
                setToastNotice('Landslide tagged at current GPS fix! Uploaded to Command Center.');
                setTimeout(() => setToastNotice(null), 4000);
              }}
              className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
              <span>Report Landslide</span>
            </button>

            <button
              onClick={() => {
                setToastNotice('Fallen Tree / Roadblock tagged at current GPS fix!');
                setTimeout(() => setToastNotice(null), 4000);
              }}
              className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>Report Fallen Tree</span>
            </button>

            <button
              onClick={() => {
                setToastNotice('Road Inundation / Flooding tagged at current GPS fix!');
                setTimeout(() => setToastNotice(null), 4000);
              }}
              className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-blue-400" />
              <span>Report Waterlogging</span>
            </button>

            <button
              onClick={() => navigate('/field')}
              className="py-2.5 px-3 bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 rounded-xl text-xs font-bold text-cyan-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Field App Mode</span>
            </button>
          </div>
        </div>

      </main>

      {/* 5. EMERGENCY SOS MODAL */}
      {sosModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0b1626] border-2 border-rose-500 rounded-2xl max-w-md w-full p-6 text-white space-y-4 shadow-2xl animate-scale-in">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-rose-600 flex items-center justify-center text-white shrink-0 animate-pulse">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white">CONFIRM EMERGENCY SOS</h3>
                <p className="text-xs text-rose-300">Broadcast immediate distress signal with live GPS coordinates.</p>
              </div>
            </div>

            <div className="bg-rose-950/60 p-3 rounded-xl border border-rose-800/80 text-xs space-y-1 font-mono">
              <div className="flex justify-between">
                <span>VEHICLE:</span>
                <strong className="text-white">AS-01-DM-1001</strong>
              </div>
              <div className="flex justify-between">
                <span>GPS FIX:</span>
                <strong className="text-white">26.6500° N, 92.8000° E</strong>
              </div>
              <div className="flex justify-between">
                <span>CARGO:</span>
                <strong className="text-white">Medicines (Cold Chain)</strong>
              </div>
            </div>

            {/* Helpline quick buttons */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="tel:1070"
                className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl font-bold flex items-center justify-center gap-1.5 border border-slate-700 text-center"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>NER Disaster: 1070</span>
              </a>
              <a
                href="tel:112"
                className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl font-bold flex items-center justify-center gap-1.5 border border-slate-700 text-center"
              >
                <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
                <span>Police SOS: 112</span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setSosModalOpen(false)}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleTriggerSOS}
                disabled={sosSent}
                className="py-2.5 px-4 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-black uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                {sosSent ? (
                  <span>TRANSMITTING...</span>
                ) : (
                  <span>BROADCAST SOS</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
