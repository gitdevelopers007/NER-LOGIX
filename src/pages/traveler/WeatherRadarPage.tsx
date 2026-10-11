import React, { useState } from 'react';
import {
  CloudRain,
  Compass,
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
    <div className="space-y-5">
      {/* 1. Top Banner - Clean Institutional Light Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200 uppercase tracking-wider flex items-center gap-1.5">
              <CloudRain className="w-3.5 h-3.5 text-blue-600" />
              ISRO MOSDAC · IMD Agartala/Guwahati Radar
            </span>
            <span className="text-xs text-slate-500">Live Doppler Composite</span>
          </div>
          <h1 className="text-xl font-bold text-[#0f2547] tracking-tight uppercase">
            Mountain Weather &amp; Flash Flood Risk Radar
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Topographic precipitation models, high-altitude pass visibility, and 48-hour flash flood vulnerability telemetry.
          </p>
        </div>

        {/* Layer Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setRadarLayer('precipitation')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              radarLayer === 'precipitation'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            Rainfall Doppler
          </button>
          <button
            onClick={() => setRadarLayer('clouds')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              radarLayer === 'clouds'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            Cloud Moisture
          </button>
          <button
            onClick={() => setRadarLayer('satellite')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              radarLayer === 'satellite'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            Terrain Fog
          </button>
        </div>
      </div>

      {/* 2. Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: High Altitude Radar Simulation */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 text-[#0f2547] font-bold text-sm">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>North Eastern Synoptic Doppler Stream (92.5°E - 96.5°E)</span>
            </div>
            <span className="text-xs text-slate-500 font-mono">Radar sweep: 60s cadence</span>
          </div>

          {/* Interactive Radar Visual Canvas (Light Map Grid) */}
          <div className="relative h-80 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center">
            {/* Topographic Grid Lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-70"></div>

            {/* Sweep radar animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 rounded-full border border-blue-400/30 animate-ping opacity-25"></div>
              <div className="w-48 h-48 rounded-full border border-blue-500/20"></div>
              <div className="w-24 h-24 rounded-full border border-blue-600/30"></div>
            </div>

            {/* High Rain Zones (Precipitation overlays) */}
            <div className="absolute top-12 left-16 bg-white/95 border border-red-200 shadow-xs rounded-full px-3 py-1 text-xs text-red-700 font-bold backdrop-blur-sm animate-pulse">
              ⛈ Meghalaya Slopes (184mm - Flash Flood Alert)
            </div>
            <div className="absolute top-28 right-20 bg-white/95 border border-amber-200 shadow-xs rounded-full px-3 py-1 text-xs text-amber-700 font-bold backdrop-blur-sm">
              🌧 Kameng Pass (62mm - Mud Slump Watch)
            </div>
            <div className="absolute bottom-16 left-28 bg-white/95 border border-emerald-200 shadow-xs rounded-full px-3 py-1 text-xs text-emerald-700 font-bold backdrop-blur-sm">
              ⛅ Brahmaputra Valley (12mm - Normal)
            </div>

            <div className="absolute bottom-3 left-3 right-3 bg-white/95 border border-slate-200 p-2.5 rounded-lg flex items-center justify-between text-xs shadow-2xs">
              <div className="flex items-center gap-4 text-slate-700 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Normal (&lt;25mm)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Heavy (25-70mm)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Torrential (&gt;70mm)
                </span>
              </div>
              <span className="text-blue-700 font-mono font-semibold">Updated: 2 mins ago</span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <div className="text-[10px] uppercase font-bold text-slate-400">Mean Mountain Temp</div>
              <div className="text-base font-bold text-[#0f2547] mt-0.5">9.8°C</div>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <div className="text-[10px] uppercase font-bold text-slate-400">Max Wind Gust</div>
              <div className="text-base font-bold text-blue-700 mt-0.5">55 km/h (Sikkim)</div>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <div className="text-[10px] uppercase font-bold text-slate-400">Flood Threat Index</div>
              <div className="text-base font-bold text-amber-600 mt-0.5">Level 3 (Amber)</div>
            </div>
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <div className="text-[10px] uppercase font-bold text-slate-400">Cloudburst Probability</div>
              <div className="text-base font-bold text-red-600 mt-0.5">18% (Khasi Hills)</div>
            </div>
          </div>
        </div>

        {/* Right Col: Mountain Pass Weather Matrix */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-2xs">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-[#0f2547]">Strategic High-Altitude Passes</h2>
            <p className="text-xs text-slate-500 mt-0.5">Click to inspect micro-climate &amp; passability</p>
          </div>

          <div className="space-y-2 max-h-[440px] overflow-y-auto pr-1">
            {PASS_DATA.map((p) => {
              const isSelected = selectedPass.passName === p.passName;
              const isHigh = p.landslideRisk === 'HIGH';

              return (
                <div
                  key={p.passName}
                  onClick={() => setSelectedPass(p)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-400 shadow-2xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900 text-xs">{p.passName}</div>
                      <div className="text-[11px] text-slate-500">{p.highway} · {p.state}</div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        isHigh
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {p.landslideRisk} RISK
                    </span>
                  </div>

                  <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <div>
                      <span className="text-slate-400">Temp:</span> <strong className="text-slate-800 font-mono ml-0.5">{p.temp}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Rain:</span> <strong className="text-blue-700 font-mono ml-0.5">{p.rainfall24h}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400">Alt:</span> <strong className="text-slate-800 font-mono ml-0.5">{p.elevation.split(' ')[0]}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Pass Drilldown card */}
          <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
            <div className="font-bold text-[#0f2547] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              Route Advisory for {selectedPass.passName}:
            </div>
            <p className="text-slate-700 leading-relaxed font-normal">{selectedPass.advisory}</p>
            <div className="flex items-center justify-between text-slate-500 pt-2 border-t border-slate-200 text-[11px]">
              <span>Fog Visibility: <strong className="text-slate-900">{selectedPass.fogVisibility}</strong></span>
              <span>Wind Gust: <strong className="text-slate-900">{selectedPass.windGust}</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WeatherRadarPage;
