import React, { useState } from 'react';
import { 
  X, Check, AlertCircle, Activity,
  Radio, MapPin, Send, CheckCircle2
} from 'lucide-react';

interface JuryDemoDataButtonProps {
  className?: string;
}

export const JuryDemoDataButton: React.FC<JuryDemoDataButtonProps> = ({ className = '' }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [highway, setHighway] = useState('NH-27 (Silchar - Lumding Corridor)');
  const [errorType, setErrorType] = useState('Unrecorded Road Block / Landslide');
  const [notes, setNotes] = useState('');
  const [ticketId, setTicketId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generated = `ERR-NER-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generated);
    setTimeout(() => {
      setTicketId(null);
      setModalOpen(false);
      setNotes('');
    }, 3200);
  };

  return (
    <>
      {/* Floating Bottom-Right Button Dock (Clean White Institutional Style) */}
      <div className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 ${className}`}>
        {/* Quick Report Error Button */}
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold tracking-tight shadow-md transition-all duration-200 border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 cursor-pointer select-none hover:scale-105 active:scale-95"
          title="Open Telemetry Health Chart & Report Field/Telemetry Error"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>

          <span className="flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[#0f2547]">Telemetry Health</span>
          </span>

          <span className="text-slate-300">|</span>

          <span className="flex items-center gap-1 text-amber-700 font-semibold text-[11px]">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Report Error</span>
          </span>
        </button>
      </div>

      {/* Telemetry Health & Incident Discrepancy Modal (Clean White Institutional UI) */}
      {modalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white text-slate-800 rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-bold">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0f2547] leading-tight">
                    MDoNER Telemetry Health &amp; Discrepancy Reporter
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Continuous 24/7 satellite &amp; ground telemetry health diagnostics and field error reporting.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              {/* Telemetry Nodes Live Matrix */}
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
                  Active Live Telemetry Feeds (100% Operational)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                    <div className="text-[10px] text-slate-500 font-medium">ISRO / NESAC</div>
                    <div className="font-bold text-slate-900 mt-0.5">NERDRR GIS</div>
                    <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 28ms Latency
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                    <div className="text-[10px] text-slate-500 font-medium">IMD Doppler</div>
                    <div className="font-bold text-slate-900 mt-0.5">18 Radars</div>
                    <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Sync Nominal
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                    <div className="text-[10px] text-slate-500 font-medium">Seismology</div>
                    <div className="font-bold text-slate-900 mt-0.5">Zone V NCS</div>
                    <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active Stream
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl">
                    <div className="text-[10px] text-slate-500 font-medium">BRO Ground Mesh</div>
                    <div className="font-bold text-slate-900 mt-0.5">14 Patrols</div>
                    <div className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 2G Optimized
                    </div>
                  </div>
                </div>
              </div>

              {/* Stream Telemetry Performance Chart */}
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-slate-800">Telemetry Stream Packet Stability &amp; Latency</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono font-bold">
                    99.98% Uptime
                  </span>
                </div>

                <div className="h-16 w-full flex items-end pt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 50" preserveAspectRatio="none">
                    <line x1="0" y1="15" x2="500" y2="15" stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" />
                    <line x1="0" y1="35" x2="500" y2="35" stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" />
                    <polyline
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2"
                      points="0,32 30,30 60,34 90,28 120,30 150,22 180,24 210,18 240,20 270,19 300,16 330,18 360,15 390,16 420,14 450,15 480,14 500,14"
                    />
                  </svg>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-1">
                  <span>-60 min</span>
                  <span>-30 min</span>
                  <span>-15 min</span>
                  <span className="text-blue-700 font-bold">Live Stream (0 packet drops)</span>
                </div>
              </div>

              {/* Report Telemetry / Field Error Form */}
              <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-4 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-slate-900 font-bold">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Report Road Telemetry Discrepancy or Field Sensor Error</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Notify the State Disaster Authority and BRO Field Detachment when real-time ground passability differs from satellite predictions.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Target Highway / Corridor</label>
                    <select
                      value={highway}
                      onChange={(e) => setHighway(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:ring-1.5 focus:ring-blue-600"
                    >
                      <option value="NH-27 (Silchar - Lumding Corridor)">NH-27 (Silchar - Lumding Corridor)</option>
                      <option value="NH-15 (Arunachal Border Highway)">NH-15 (Arunachal Border Highway)</option>
                      <option value="NH-29 (Dimapur - Kohima Corridor)">NH-29 (Dimapur - Kohima Corridor)</option>
                      <option value="NH-10 (Siliguri - Gangtok Lifeline)">NH-10 (Siliguri - Gangtok Lifeline)</option>
                      <option value="NH-6 (East-West Arterial Meghalaya)">NH-6 (East-West Arterial Meghalaya)</option>
                      <option value="NH-13 (Trans-Arunachal Highway)">NH-13 (Trans-Arunachal Highway)</option>
                      <option value="Other Regional State Highway">Other Regional State Highway</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Discrepancy Category</label>
                    <select
                      value={errorType}
                      onChange={(e) => setErrorType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-none focus:ring-1.5 focus:ring-blue-600"
                    >
                      <option value="Unrecorded Road Block / Landslide">Unrecorded Road Block / Landslide</option>
                      <option value="Cleared Road Still Showing Blocked">Cleared Road Still Showing Blocked</option>
                      <option value="Weather Radar Inundation Mismatch">Weather Radar Inundation Mismatch</option>
                      <option value="Bridge Load Limit / Axle Restriction Error">Bridge Load Limit / Axle Restriction Error</option>
                      <option value="GPS Telemetry Drift (>50m)">GPS Telemetry Drift (&gt;50m)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">Observation Notes / Kilometer Marker</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mudslide occurred at KM 48 near Zubza bend, lane currently restricted..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1.5 focus:ring-blue-600"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="text-[10.5px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>Auto-tagged with current GIS operator session</span>
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Telemetry Notice</span>
                  </button>
                </div>

                {ticketId && (
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Notice logged successfully! Official Reference Ticket: <strong>{ticketId}</strong> forwarded to MDoNER &amp; BRO Operations.
                    </span>
                  </div>
                )}
              </form>
            </div>

            {/* Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
              <span className="font-mono">Central Telemetry Grid v2.4</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> 100% Real-Time Live Feeds Active
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
