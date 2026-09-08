import React, { useState, useEffect } from 'react';
import { liveGovtService, type DataMode, type LiveSummary } from '../services/liveGovtService';
import { Satellite, Sparkles, ChevronDown, Check } from 'lucide-react';

export const LiveTelemetryToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [mode, setMode] = useState<DataMode>(liveGovtService.getMode());
  const [summary, setSummary] = useState<LiveSummary | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsub = liveGovtService.onModeChange((newMode) => {
      setMode(newMode);
    });

    liveGovtService.getSummary().then((s) => setSummary(s));

    return () => unsub();
  }, []);

  const handleToggle = (newMode: DataMode) => {
    if (newMode === mode) return;
    liveGovtService.setMode(newMode);
    setMenuOpen(false);
  };

  const isLive = mode === 'LIVE';

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 border cursor-pointer select-none ${
          isLive
            ? 'bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-300 border-emerald-600/70 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
            : 'bg-indigo-950/80 hover:bg-indigo-900/90 text-indigo-300 border-indigo-600/70 shadow-[0_0_12px_rgba(99,102,241,0.2)]'
        }`}
        title="Toggle between Live Government Feeds and Demo Simulation"
      >
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isLive ? 'bg-emerald-400' : 'bg-indigo-400'
            }`}
          ></span>
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isLive ? 'bg-emerald-400' : 'bg-indigo-400'
            }`}
          ></span>
        </span>

        {isLive ? (
          <span className="flex items-center gap-1.5">
            <Satellite className="w-3.5 h-3.5 text-emerald-400" />
            <span>LIVE ISRO / NESAC</span>
          </span>
        ) : (
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>SIMULATION SCENARIO</span>
          </span>
        )}

        <ChevronDown className="w-3 h-3 opacity-60 ml-0.5" />
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 rounded-xl bg-[#0e1e36] text-white border border-slate-700 shadow-2xl z-50 p-3 text-left animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-700/80">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Telemetry Feed Engine
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                NERDRR v2.4
              </span>
            </div>

            {/* Mode Selectors */}
            <div className="space-y-2 pt-2.5">
              {/* Live Govt Option */}
              <button
                onClick={() => handleToggle('LIVE')}
                className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-start justify-between cursor-pointer ${
                  isLive
                    ? 'bg-emerald-950/60 border-emerald-600/80 text-white'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                    <Satellite className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Live Government Feeds (Default)</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug mt-1">
                    Real-time data from <strong>NERDRR (NESAC / ISRO)</strong> &amp; <strong>National Centre for Seismology</strong>.
                  </p>
                  {summary?.metrics && (
                    <div className="grid grid-cols-3 gap-1 mt-2 text-[10px] font-mono text-slate-300 bg-slate-950/60 p-1.5 rounded">
                      <div>
                        <span className="text-slate-500 block">Quakes</span>
                        <span className="text-emerald-400 font-bold">{summary.metrics.activeEarthquakes} active</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Landslide</span>
                        <span className="text-amber-400 font-bold">{summary.metrics.activeLandslideStates} states</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">MOSDAC</span>
                        <span className="text-blue-400 font-bold">{summary.metrics.heavyRainAlertPoints} rain pts</span>
                      </div>
                    </div>
                  )}
                </div>
                {isLive && <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
              </button>

              {/* Simulation Mode Option */}
              <button
                onClick={() => handleToggle('SIMULATION')}
                className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-start justify-between cursor-pointer ${
                  !isLive
                    ? 'bg-indigo-950/60 border-indigo-600/80 text-white'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Presentation Simulation Mode</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug mt-1">
                    Full high-density operational test scenario for demos, presentations, and offline testing.
                  </p>
                </div>
                {!isLive && <Check className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />}
              </button>
            </div>

            {/* Footer telemetry notice */}
            <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Govt Node: nerdrr.gov.in</span>
              <span className="text-emerald-400">Status: 200 OK</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
