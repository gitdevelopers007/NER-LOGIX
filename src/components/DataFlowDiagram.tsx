import React from 'react';
import { 
  CloudRain, Database, Smartphone, Navigation, 
  Map, ShieldAlert, Route, Bell, LayoutDashboard, ArrowDown, ArrowLeft
} from 'lucide-react';

export const DataFlowDiagram: React.FC = () => {
  return (
    <div className="w-full bg-white rounded-lg border border-slate-200 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2.5">
        <div>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            DATA FLOW ARCHITECTURE
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Real-time pipeline ingestion, processing, distribution and dashboard telemetry
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-medium text-emerald-700 font-mono">
            Pipeline Active (4.2k events/sec)
          </span>
        </div>
      </div>

      {/* Responsive Visual Pipeline Diagram */}
      <div className="max-w-3xl mx-auto flex flex-col items-center py-2">
        
        {/* LEVEL 1: WEATHER APIs */}
        <div className="flex flex-col items-center">
          <div className="w-56 bg-blue-50 border-2 border-blue-400 rounded-lg p-2.5 shadow-xs flex items-center justify-center gap-2 text-blue-900 font-bold text-xs tracking-wide">
            <CloudRain className="w-4 h-4 text-blue-600" />
            <span>WEATHER APIs</span>
          </div>
          <div className="h-6 w-0.5 bg-blue-400 flex items-center justify-center">
            <ArrowDown className="w-3.5 h-3.5 text-blue-500 translate-y-2.5" />
          </div>
        </div>

        {/* LEVEL 2: CENTRAL DATA LAYER WITH SIDE INPUTS */}
        <div className="w-full flex items-center justify-center gap-4 my-2">
          {/* Invisible spacer on left for perfect centering */}
          <div className="w-44 hidden md:block" />

          {/* Central Hub */}
          <div className="w-64 bg-slate-900 text-white rounded-xl p-4 shadow-md border-2 border-slate-700 flex flex-col items-center text-center space-y-1 z-10">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
              <Database className="w-4 h-4 text-blue-400" />
              <span>NER-LOGIX</span>
            </div>
            <div className="text-sm font-black tracking-tight text-white">
              DATA LAYER
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Stream Ingestion • Geo Deduplication • Telemetry Engine
            </div>
          </div>

          {/* Right Inputs: FIELD REPORTS & VEHICLE GPS */}
          <div className="flex flex-col gap-2.5 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-slate-400 flex items-center">
                <ArrowLeft className="w-3.5 h-3.5 text-slate-600 -translate-x-1" />
              </div>
              <div className="w-40 bg-emerald-50 border border-emerald-400 rounded-lg px-2.5 py-1.5 shadow-2xs flex items-center gap-2 text-emerald-900 text-[11px] font-bold">
                <Smartphone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>FIELD REPORTS</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-slate-400 flex items-center">
                <ArrowLeft className="w-3.5 h-3.5 text-slate-600 -translate-x-1" />
              </div>
              <div className="w-40 bg-indigo-50 border border-indigo-400 rounded-lg px-2.5 py-1.5 shadow-2xs flex items-center gap-2 text-indigo-900 text-[11px] font-bold">
                <Navigation className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>VEHICLE GPS</span>
              </div>
            </div>
          </div>
        </div>

        {/* CONNECTOR DOWN */}
        <div className="h-6 w-0.5 bg-slate-400 flex items-center justify-center">
          <ArrowDown className="w-3.5 h-3.5 text-slate-600 translate-y-2.5" />
        </div>

        {/* LEVEL 3: FOUR ENGINE MODULES (GIS, RISK, ROUTING, ALERTS) */}
        <div className="w-full max-w-xl">
          <div className="grid grid-cols-4 gap-2.5 my-2">
            <div className="bg-slate-50 border border-slate-300 rounded-lg p-2 text-center flex flex-col items-center justify-center space-y-1 shadow-2xs">
              <Map className="w-4 h-4 text-blue-600" />
              <span className="text-[11px] font-bold text-slate-800">GIS</span>
              <span className="text-[9px] text-slate-500">ISRO Bhuvan</span>
            </div>

            <div className="bg-slate-50 border border-slate-300 rounded-lg p-2 text-center flex flex-col items-center justify-center space-y-1 shadow-2xs">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span className="text-[11px] font-bold text-slate-800">RISK</span>
              <span className="text-[9px] text-slate-500">Hazard Matrix</span>
            </div>

            <div className="bg-slate-50 border border-slate-300 rounded-lg p-2 text-center flex flex-col items-center justify-center space-y-1 shadow-2xs">
              <Route className="w-4 h-4 text-emerald-600" />
              <span className="text-[11px] font-bold text-slate-800">ROUTING</span>
              <span className="text-[9px] text-slate-500">Bypass Engine</span>
            </div>

            <div className="bg-slate-50 border border-slate-300 rounded-lg p-2 text-center flex flex-col items-center justify-center space-y-1 shadow-2xs">
              <Bell className="w-4 h-4 text-red-600" />
              <span className="text-[11px] font-bold text-slate-800">ALERTS</span>
              <span className="text-[9px] text-slate-500">Emergency Push</span>
            </div>
          </div>
        </div>

        {/* CONNECTOR DOWN */}
        <div className="h-6 w-0.5 bg-slate-400 flex items-center justify-center">
          <ArrowDown className="w-3.5 h-3.5 text-slate-600 translate-y-2.5" />
        </div>

        {/* LEVEL 4: GOVERNMENT DASHBOARD */}
        <div className="w-72 bg-[#0b1a30] text-white border border-blue-500 rounded-lg p-3 shadow-md text-center flex items-center justify-center gap-2 font-bold text-xs tracking-wider uppercase mt-1">
          <LayoutDashboard className="w-4 h-4 text-blue-400" />
          <span>GOVERNMENT DASHBOARD</span>
        </div>

      </div>
    </div>
  );
};
