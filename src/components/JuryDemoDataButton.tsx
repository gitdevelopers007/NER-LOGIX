import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Satellite, X, Check, ArrowRight, 
  Info, Sliders
} from 'lucide-react';
import { liveGovtService, type DataMode } from '../services/liveGovtService';

interface JuryDemoDataButtonProps {
  className?: string;
}

export const JuryDemoDataButton: React.FC<JuryDemoDataButtonProps> = ({ className = '' }) => {
  const [mode, setMode] = useState<DataMode>(liveGovtService.getMode());
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const unsub = liveGovtService.onModeChange((newMode) => {
      setMode(newMode);
    });
    return () => unsub();
  }, []);

  const handleSetMode = (newMode: DataMode) => {
    liveGovtService.setMode(newMode);
    setToastMessage(
      newMode === 'SIMULATION'
        ? '🧪 Switched to Demo Scenario: Curated Disaster & Convoy Matrix active!'
        : '🛰️ Switched to Live Mode: Real-time ISRO, IMD & Seismology Feeds active!'
    );
    setTimeout(() => setToastMessage(null), 3500);
  };

  const isDemo = mode === 'SIMULATION';

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-[9999] max-w-md bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <span className="text-xl">{isDemo ? '🧪' : '🛰️'}</span>
          <div className="text-xs font-medium leading-tight">{toastMessage}</div>
          <button 
            onClick={() => setToastMessage(null)}
            className="ml-auto text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Floating Bottom-Right Button Dock */}
      <div className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 ${className}`}>
        {/* Quick Mode Switcher Pill */}
        <button
          onClick={() => handleSetMode(isDemo ? 'LIVE' : 'SIMULATION')}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full text-xs font-bold tracking-tight shadow-xl transition-all duration-200 border cursor-pointer select-none backdrop-blur-md hover:scale-105 active:scale-95 ${
            isDemo
              ? 'bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white border-amber-300/80 ring-4 ring-amber-500/20 shadow-amber-900/30'
              : 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white border-emerald-300/80 ring-4 ring-emerald-500/20 shadow-emerald-900/30'
          }`}
          title="Click to toggle Demo Data vs Live Government Feeds"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDemo ? 'bg-amber-300' : 'bg-emerald-300'}`}></span>
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isDemo ? 'bg-amber-300' : 'bg-emerald-400'}`}></span>
          </span>

          <span className="flex items-center gap-1.5">
            {isDemo ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                <span>🧪 DEMO DATA ACTIVE</span>
              </>
            ) : (
              <>
                <Satellite className="w-3.5 h-3.5 text-emerald-200" />
                <span>🛰️ LIVE ISRO / IMD</span>
              </>
            )}
          </span>

          <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-mono font-normal">
            Toggle
          </span>
        </button>

        {/* Dedicated "Jury Info" Button */}
        <button
          onClick={() => setModalOpen(true)}
          className="w-10 h-10 rounded-full bg-[#0b1a30] hover:bg-[#132847] text-white border-2 border-slate-700 shadow-xl flex items-center justify-center transition-all cursor-pointer hover:scale-105"
          title="Open Jury Evaluation: Live vs Demo Data Breakdown"
        >
          <Info className="w-5 h-5 text-cyan-400" />
        </button>
      </div>

      {/* Jury Evaluation & Demo Data Center Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#0e1e36] text-white border border-slate-700 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#081324] sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">
                      Hackathon Jury Evaluation — Data Engine Center
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full">
                      NER-LOGIX
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Transparent breakdown of Real Live APIs vs Simulated Prototype Stress Scenarios
                  </p>
                </div>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-sm">
              
              {/* Mode Selection Cards */}
              <div>
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                  Select System Operating Mode for Demonstration:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Demo Simulation Option */}
                  <div
                    onClick={() => handleSetMode('SIMULATION')}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer select-none flex flex-col justify-between ${
                      isDemo
                        ? 'bg-indigo-950/60 border-indigo-500 shadow-[0_0_16px_rgba(99,102,241,0.25)] ring-2 ring-indigo-500/40'
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                          <Sparkles className="w-4 h-4" />
                          <span>🧪 Demo Simulation Mode</span>
                        </div>
                        {isDemo && (
                          <span className="text-[10px] font-bold bg-indigo-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Check className="w-3 h-3" /> ACTIVE
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        Curated high-stress emergency matrix: <strong>Dima Hasao landslide on NH-27</strong>, 36 convoy telemetry, 5 critical incidents, and alternate bypass calculations.
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-indigo-300 font-semibold">
                      <span>Best for Hackathon Jury Demo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Live Govt Feeds Option */}
                  <div
                    onClick={() => handleSetMode('LIVE')}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer select-none flex flex-col justify-between ${
                      !isDemo
                        ? 'bg-emerald-950/60 border-emerald-500 shadow-[0_0_16px_rgba(16,185,129,0.25)] ring-2 ring-emerald-500/40'
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                          <Satellite className="w-4 h-4" />
                          <span>🛰️ Live Government Feeds</span>
                        </div>
                        {!isDemo && (
                          <span className="text-[10px] font-bold bg-emerald-500 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Check className="w-3 h-3" /> ACTIVE
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        Direct connection to <strong>IMD Doppler Radar, Open-Meteo precipitation</strong>, and <strong>NCS/USGS earthquake telemetry</strong> across the 8 NER states.
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-emerald-300 font-semibold">
                      <span>Real-world Public APIs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Comprehensive Live vs Demo Breakdown Table */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Jury Transparency Table: Live vs Simulated Architecture
                  </div>
                  <span className="text-[11px] text-slate-400">
                    What we built vs production path
                  </span>
                </div>

                <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900/60">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-800/80 text-slate-300 font-semibold border-b border-slate-700">
                        <th className="p-2.5">Feature Component</th>
                        <th className="p-2.5">In This Hackathon Prototype</th>
                        <th className="p-2.5">Production Integration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-200">
                      <tr>
                        <td className="p-2.5 font-medium flex items-center gap-1.5">
                          <span>🌧️ Doppler Rainfall Radar</span>
                        </td>
                        <td className="p-2.5 text-emerald-400 font-semibold">
                          🟢 100% Real Live API (IMD &amp; Open-Meteo)
                        </td>
                        <td className="p-2.5 text-slate-400">IMD AWS Doppler Network</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium flex items-center gap-1.5">
                          <span>🌐 Earthquake Seismology</span>
                        </td>
                        <td className="p-2.5 text-emerald-400 font-semibold">
                          🟢 100% Real Live Feeds (NCS / USGS)
                        </td>
                        <td className="p-2.5 text-slate-400">National Centre for Seismology</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium flex items-center gap-1.5">
                          <span>🛰️ Satellite GIS Basemap</span>
                        </td>
                        <td className="p-2.5 text-emerald-400 font-semibold">
                          🟢 100% Real Imagery (Esri World Tiles)
                        </td>
                        <td className="p-2.5 text-slate-400">ISRO Bhuvan / Esri ArcGIS</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium flex items-center gap-1.5">
                          <span>🛣️ Highway Corridors (NH-27/10)</span>
                        </td>
                        <td className="p-2.5 text-emerald-400 font-semibold">
                          🟢 100% Real NER Highway Geometries
                        </td>
                        <td className="p-2.5 text-slate-400">MoRTH Bhoomi Rashi GIS</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium flex items-center gap-1.5">
                          <span>📱 Field Ops Mobile PWA</span>
                        </td>
                        <td className="p-2.5 text-emerald-400 font-semibold">
                          🟢 100% Functional Offline IndexedDB
                        </td>
                        <td className="p-2.5 text-slate-400">State Disaster Management Staff</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium flex items-center gap-1.5">
                          <span>🚚 Fleet Convoys (36 Vehicles)</span>
                        </td>
                        <td className="p-2.5 text-amber-400 font-semibold">
                          🧪 High-Fidelity Simulation
                        </td>
                        <td className="p-2.5 text-slate-400">AIS-140 GPS Vehicle Transponders</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium flex items-center gap-1.5">
                          <span>⚠️ Active Road Hazards (Landslides)</span>
                        </td>
                        <td className="p-2.5 text-amber-400 font-semibold">
                          🧪 Curated Emergency Stress Matrix
                        </td>
                        <td className="p-2.5 text-slate-400">BRO / PWD / NDMA Sensor Triggers</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium flex items-center gap-1.5">
                          <span>🌉 14 Bridges Axle Limits</span>
                        </td>
                        <td className="p-2.5 text-amber-400 font-semibold">
                          🧪 Structural Threshold Matrix
                        </td>
                        <td className="p-2.5 text-slate-400">IoT Strain Gauges &amp; WIM Sensors</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Explanatory Box for the Jury */}
              <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2 font-bold text-white">
                  <Info className="w-4 h-4 text-blue-400" />
                  <span>Key Talking Point for the Jury Presentation:</span>
                </div>
                <p className="leading-relaxed">
                  &ldquo;We deliberately implemented a dual architecture: <strong>live real-world APIs</strong> for satellite imagery, Doppler rainfall, and earthquakes, combined with a <strong>curated emergency disaster matrix</strong> (like the Dima Hasao landslide on NH-27) so the jury can experience our AI dynamic alternate rerouting algorithm in action without waiting for an actual natural disaster to strike.&rdquo;
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-slate-800 bg-[#081324] flex items-center justify-between">
              <div className="text-[11px] text-slate-400">
                Current Mode: <strong className={isDemo ? 'text-amber-400' : 'text-emerald-400'}>{isDemo ? '🧪 Demo Simulation' : '🛰️ Live ISRO/IMD'}</strong>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-colors cursor-pointer"
              >
                Close &amp; Continue
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
