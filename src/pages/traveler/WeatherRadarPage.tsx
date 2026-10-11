import React, { useState } from 'react';
import {
  CloudRain,
  Wind,
  Droplets,
  Eye,
  AlertTriangle,
  Compass,
  Zap,
  TrendingUp,
  MapPin,
  ShieldAlert,
  Info,
  Layers,
  Thermometer
} from 'lucide-react';

interface MountainPassWeather {
  passName: string;
  highway: string;
  state: string;
  elevation: string;
  temp: string;
  rainfall24h: string;
  fogVisibility: string;
  landslideRisk: 'HIGH' | 'MODERATE' | 'LOW';
  advisory: string;
  windGust: string;
}

const PASS_DATA: MountainPassWeather[] = [
  {
    passName: 'Sela Pass',
    highway: 'NH-13 (Balipara-Tawang)',
    state: 'Arunachal Pradesh',
    elevation: '13,700 ft (4,170 m)',
    temp: '4°C',
    rainfall24h: '38 mm',
    fogVisibility: '< 20 meters (Dense)',
    landslideRisk: 'HIGH',
    advisory: 'Severe mountain fog & surface black slush. Snow chains advised for single-axle.',
    windGust: '48 km/h'
  },
  {
    passName: 'Nechiphu Pass',
    highway: 'NH-13',
    state: 'Arunachal Pradesh',
    elevation: '5,690 ft (1,735 m)',
    temp: '14°C',
    rainfall24h: '62 mm',
    fogVisibility: '80 meters',
    landslideRisk: 'HIGH',
    advisory: 'Hillside water seepage high. Slow speeds strictly enforced by BRTF.',
    windGust: '24 km/h'
  },
  {
    passName: 'Nathu La Corridor',
    highway: 'Jawaharlal Nehru Road / NH-10',
    state: 'Sikkim',
    elevation: '14,140 ft (4,310 m)',
    temp: '2°C',
    rainfall24h: '19 mm',
    fogVisibility: '120 meters',
    landslideRisk: 'MODERATE',
    advisory: 'Sub-zero nighttime freeze expected. Light vehicles permitted with caution.',
    windGust: '55 km/h'
  },
  {
    passName: 'Cherrapunji - Shella Ridge',
    highway: 'SH-5',
    state: 'Meghalaya',
    elevation: '4,869 ft (1,484 m)',
    temp: '18°C',
    rainfall24h: '184 mm (Extreme)',
    fogVisibility: '15 meters',
    landslideRisk: 'HIGH',
    advisory: 'Torrential monsoon downpour. Heavy water logging across valleys.',
    windGust: '32 km/h'
  },
  {
    passName: 'Pfutsero Hill Pass',
    highway: 'NH-29 Extension',
    state: 'Nagaland',
    elevation: '6,998 ft (2,133 m)',
    temp: '13°C',
    rainfall24h: '28 mm',
    fogVisibility: '300 meters',
    landslideRisk: 'LOW',
    advisory: 'Surface damp. Regular truck movement without restrictions.',
    windGust: '18 km/h'
  }
];

export const WeatherRadarPage: React.FC = () => {
  const [selectedPass, setSelectedPass] = useState<MountainPassWeather>(PASS_DATA[0]);
  const [radarLayer, setRadarLayer] = useState<'precipitation' | 'clouds' | 'satellite'>('precipitation');

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0b1a30] via-[#0f284e] to-[#0b1a30] p-6 rounded-xl border border-blue-900/60 shadow-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase tracking-wider flex items-center gap-1.5">
                <CloudRain className="w-3 h-3 text-cyan-400" />
                ISRO MOSDAC · IMD Agartala/Guwahati Radar
              </span>
              <span className="text-xs text-slate-300">Live Doppler Composite</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Mountain Weather & Flash Flood Risk Radar</h1>
            <p className="text-sm text-slate-300 mt-1">
              Topographic precipitation models, high-altitude pass visibility, and 48-hour flash flood vulnerability telemetry.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 p-2 rounded-lg border border-slate-700">
            <button
              onClick={() => setRadarLayer('precipitation')}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                radarLayer === 'precipitation'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Rainfall Doppler
            </button>
            <button
              onClick={() => setRadarLayer('clouds')}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                radarLayer === 'clouds'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Cloud Moisture
            </button>
            <button
              onClick={() => setRadarLayer('satellite')}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                radarLayer === 'satellite'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Terrain Fog
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Visual Doppler Mock & Real-time Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: High Altitude Radar Map View */}
        <div className="lg:col-span-2 bg-[#0f172a] rounded-xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-white font-semibold text-sm">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>North Eastern Synoptic Doppler Stream (92.5°E - 96.5°E)</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">Radar sweep: 60s cadence</span>
          </div>

          {/* Interactive Radar Visual Canvas */}
          <div className="relative h-80 rounded-lg overflow-hidden border border-slate-800 bg-[#091122] flex items-center justify-center">
            {/* Topographic Grid Lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

            {/* Sweep radar animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 rounded-full border border-cyan-500/20 animate-ping opacity-25"></div>
              <div className="w-48 h-48 rounded-full border border-blue-500/30"></div>
              <div className="w-24 h-24 rounded-full border border-blue-400/40"></div>
            </div>

            {/* High Rain Zones (Precipitation overlays) */}
            <div className="absolute top-12 left-20 bg-rose-500/20 border border-rose-500/50 rounded-full px-3 py-1 text-[11px] text-rose-300 font-semibold backdrop-blur-sm animate-pulse">
              ⛈ Meghalaya Slopes (184mm - Flash Flood Alert)
            </div>
            <div className="absolute top-28 right-24 bg-amber-500/20 border border-amber-500/50 rounded-full px-3 py-1 text-[11px] text-amber-300 font-semibold backdrop-blur-sm">
              🌧 Kameng Pass (62mm - Mud Slump Watch)
            </div>
            <div className="absolute bottom-16 left-32 bg-emerald-500/20 border border-emerald-500/50 rounded-full px-3 py-1 text-[11px] text-emerald-300 font-semibold backdrop-blur-sm">
              ⛅ Brahmaputra Valley (12mm - Normal)
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 border border-slate-800 p-3 rounded-lg flex items-center justify-between text-xs">
              <div className="flex items-center gap-4 text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Normal (&lt;25mm)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Heavy (25-70mm)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Torrential (&gt;70mm)
                </span>
              </div>
              <span className="text-blue-400 font-mono">Updated: 2 mins ago</span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-400">Mean Mountain Temp</div>
              <div className="text-lg font-bold text-white mt-1">9.8°C</div>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-400">Max Wind Gust</div>
              <div className="text-lg font-bold text-cyan-400 mt-1">55 km/h (Sikkim)</div>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-400">Flood Threat Index</div>
              <div className="text-lg font-bold text-amber-400 mt-1">Level 3 (Amber)</div>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-400">Cloudburst Probability</div>
              <div className="text-lg font-bold text-rose-400 mt-1">18% (Khasi Hills)</div>
            </div>
          </div>
        </div>

        {/* Right Col: Mountain Pass Weather Matrix */}
        <div className="bg-[#0f172a] rounded-xl border border-slate-800 p-5 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <h2 className="text-base font-semibold text-white">Strategic High-Altitude Passes</h2>
            <p className="text-xs text-slate-400 mt-0.5">Click to inspect micro-climate & passability</p>
          </div>

          <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
            {PASS_DATA.map((p) => {
              const isSelected = selectedPass.passName === p.passName;
              const isHigh = p.landslideRisk === 'HIGH';

              return (
                <div
                  key={p.passName}
                  onClick={() => setSelectedPass(p)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-950/50 border-blue-600 shadow-md'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-white text-sm">{p.passName}</div>
                      <div className="text-xs text-slate-400">{p.highway} · {p.state}</div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isHigh
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {p.landslideRisk} RISK
                    </span>
                  </div>

                  <div className="mt-2 grid grid-cols-3 gap-2 text-[11px] text-slate-300 pt-2 border-t border-slate-800/80">
                    <div>
                      <span className="text-slate-400">Temp:</span> <span className="font-semibold">{p.temp}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Rain:</span> <span className="font-semibold text-cyan-400">{p.rainfall24h}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Alt:</span> <span className="font-semibold">{p.elevation.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Pass Drilldown card */}
          <div className="mt-4 p-4 rounded-lg bg-blue-950/30 border border-blue-900/60 space-y-2 text-xs">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              Route Advisory for {selectedPass.passName}:
            </div>
            <p className="text-slate-200 leading-relaxed">{selectedPass.advisory}</p>
            <div className="flex items-center justify-between text-slate-400 pt-2 border-t border-blue-900/40 text-[11px]">
              <span>Fog Visibility: <strong className="text-white">{selectedPass.fogVisibility}</strong></span>
              <span>Wind Gust: <strong className="text-white">{selectedPass.windGust}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WeatherRadarPage;
