import React, { useState } from 'react';
import {
  AlertTriangle,
  Clock,
  ShieldCheck,
  Filter,
  Search,
  ExternalLink,
  MapPin,
  CheckCircle2,
  Wrench,
  Radio,
  Truck
} from 'lucide-react';

interface Bulletin {
  id: string;
  highway: string;
  section: string;
  state: string;
  severity: 'CRITICAL' | 'WARNING' | 'CLEARANCE' | 'ADVISORY';
  status: 'BLOCKED' | 'RESTRICTED' | 'RESTORED' | 'CAUTION';
  headline: string;
  description: string;
  issuedAt: string;
  authority: string;
  detourRoute?: string;
  heavyVehicleImpact: string;
  earthmoversDeployed: number;
  estClearance: string;
  verifiedBy: string;
}

const BULLETINS_DATA: Bulletin[] = [
  {
    id: 'BLT-2026-0891',
    highway: 'NH-6 (East-West Arterial)',
    section: 'Sonapur Tunnel & Kleriat Cut (KM 138-142)',
    state: 'Meghalaya',
    severity: 'CRITICAL',
    status: 'BLOCKED',
    headline: 'Major Hillside Debris Slide near Sonapur — Multi-axle Freight Suspended',
    description: 'Continuous torrential rainfall triggered a 45-meter mud & boulder slide 300m north of Sonapur Tunnel. Slurry runoff active across both carriageways. 3 BRO earthmovers (Project Pushpak) actively cutting safety berms.',
    issuedAt: '12 mins ago (Live Telemetry)',
    authority: 'BRO Project Pushpak & Meghalaya SDMA',
    detourRoute: 'NH-27 East Bypass via SH-12 (+42 mins, +28 km — light vehicles only)',
    heavyVehicleImpact: 'STRICTLY PROHIBITED (Axle limit exceeded on secondary culvert)',
    earthmoversDeployed: 3,
    estClearance: '18:30 IST (Subject to rainfall)',
    verifiedBy: 'ISRO MOSDAC & Ground Patrol GP-04'
  },
  {
    id: 'BLT-2026-0888',
    highway: 'NH-13 (Trans-Arunachal Highway)',
    section: 'Nechiphu Tunnel Pass (KM 88)',
    state: 'Arunachal Pradesh',
    severity: 'WARNING',
    status: 'RESTRICTED',
    headline: 'Single-Lane Escort Convoy Active — Dense Mountain Fog & Slump',
    description: 'Minor embankment subsidence detected on downhill shoulder. ITBP and BRO escorting essential logistics vehicles in batches of 15. Visibility below 30 meters.',
    issuedAt: '45 mins ago',
    authority: 'Border Roads Task Force (BRTF-44)',
    detourRoute: 'No viable bypass. Expect 20-30 min queue turnaround.',
    heavyVehicleImpact: 'Permitted with convoy escort (Max 24 MT GVW)',
    earthmoversDeployed: 1,
    estClearance: 'Controlled 24/7 Operations',
    verifiedBy: 'BRO Field Post Nechiphu'
  },
  {
    id: 'BLT-2026-0885',
    highway: 'NH-10 (Siliguri - Gangtok)',
    section: 'Seti Jhora Valley (KM 32)',
    state: 'Sikkim',
    severity: 'CRITICAL',
    status: 'BLOCKED',
    headline: 'Teesta River Flash Flow Culvert Scouring — Road Closed for Heavy Cargo',
    description: 'Teesta river surge caused toe-erosion along embankment wall. Small passenger vehicles permitted via Melli-Manpur diversion. All 16+ wheeler heavy transport halted at Sevoke checkpost.',
    issuedAt: '1 hr 15 mins ago',
    authority: 'Sikkim SDMA & BRO Swastik',
    detourRoute: 'Dooars - Lava - Damdim route (+65 km)',
    heavyVehicleImpact: 'DIVERTED to Damdim corridor',
    earthmoversDeployed: 4,
    estClearance: 'Tomorrow 08:00 IST',
    verifiedBy: 'Sikkim Police Wireless'
  },
  {
    id: 'BLT-2026-0880',
    highway: 'NH-27 (Silchar - Lumding)',
    section: 'Jatinga Lamp Slope (KM 74)',
    state: 'Assam',
    severity: 'CLEARANCE',
    status: 'RESTORED',
    headline: 'Debris Clearance Complete — Both Lanes Open for Essential Supplies',
    description: 'Boulder cleared from twin carriage sections. Geotechnical mesh holds intact. Freight movement resumed under normal speed limits (40 km/h hill zone).',
    issuedAt: '2 hrs ago',
    authority: 'NHIDCL Assam Regional Office',
    heavyVehicleImpact: 'UNRESTRICTED (All legal axle configurations)',
    earthmoversDeployed: 2,
    estClearance: 'RESOLVED / CLEAR',
    verifiedBy: 'NHIDCL Quick Response Team'
  },
  {
    id: 'BLT-2026-0876',
    highway: 'NH-29 (Dimapur - Kohima)',
    section: 'Phesama Ridge Bend (KM 52)',
    state: 'Nagaland',
    severity: 'ADVISORY',
    status: 'CAUTION',
    headline: 'Geotechnical Soil Monitoring Active — Monsoon Wet Rut Warning',
    description: 'Slight seepage along rock fissure near Phesama. Sensory crack-gauges nominal. Commercial drivers advised to reduce speeds and maintain minimum 50m headways.',
    issuedAt: '4 hrs ago',
    authority: 'Nagaland NSDMA & Kohima Traffic Police',
    heavyVehicleImpact: 'Permitted (Normal loads)',
    earthmoversDeployed: 0,
    estClearance: 'MONITORING ONLY',
    verifiedBy: 'NSDMA Sensor Grid'
  }
];

export const BulletinsPage: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const states = ['ALL', 'Assam', 'Meghalaya', 'Arunachal Pradesh', 'Sikkim', 'Nagaland', 'Mizoram', 'Tripura'];

  const filtered = BULLETINS_DATA.filter((b) => {
    const matchesState = selectedState === 'ALL' || b.state === selectedState;
    const matchesStatus = selectedStatus === 'ALL' || b.status === selectedStatus;
    const matchesSearch =
      b.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.highway.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.section.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesState && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-5">
      {/* 1. Header Banner - Clean Light Institutional Design */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-amber-600 animate-pulse" />
              Live Emergency Dispatches
            </span>
            <span className="text-xs text-slate-500">BRO · NHIDCL · SDMA Joint Telemetry</span>
          </div>
          <h1 className="text-xl font-bold text-[#0f2547] tracking-tight uppercase">
            North East Road Disruption Bulletins
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time verified highway closures, landslide clearance countdowns, and heavy-freight bypass advisories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-center min-w-[120px]">
            <div className="text-[10px] uppercase font-bold text-slate-400">Active Incidents</div>
            <div className="text-lg font-black text-amber-600 mt-0.5">3 Critical</div>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-center min-w-[120px]">
            <div className="text-[10px] uppercase font-bold text-slate-400">Restored (24h)</div>
            <div className="text-lg font-black text-emerald-600 mt-0.5">9 Corridors</div>
          </div>
        </div>
      </div>

      {/* 2. Filter Toolbar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search highway, section, hazard..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1.5 focus:ring-blue-600"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs text-slate-600 font-semibold">State:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-white border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1.5 focus:ring-blue-600 cursor-pointer"
            >
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 font-semibold">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1.5 focus:ring-blue-600 cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="BLOCKED">Blocked</option>
              <option value="RESTRICTED">Restricted</option>
              <option value="CAUTION">Caution</option>
              <option value="RESTORED">Restored</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Bulletins List */}
      <div className="space-y-3.5">
        {filtered.map((b) => {
          const isBlocked = b.status === 'BLOCKED';
          const isRestricted = b.status === 'RESTRICTED';
          const isRestored = b.status === 'RESTORED';

          return (
            <div
              key={b.id}
              className={`p-4.5 rounded-xl border bg-white shadow-2xs transition-all hover:shadow-xs ${
                isBlocked
                  ? 'border-red-200 hover:border-red-300'
                  : isRestricted
                  ? 'border-amber-200 hover:border-amber-300'
                  : isRestored
                  ? 'border-emerald-200 hover:border-emerald-300'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Header inside Card */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-xs font-bold tracking-wide flex items-center gap-1.5 ${
                      isBlocked
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : isRestricted
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : isRestored
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {isBlocked && <AlertTriangle className="w-3.5 h-3.5" />}
                    {isRestored && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {b.status}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#0f2547] font-bold text-sm">{b.highway}</span>
                    <span className="text-xs text-slate-500 font-medium">[{b.state}]</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    {b.issuedAt}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span>ID: {b.id}</span>
                </div>
              </div>

              {/* Title & Body */}
              <div className="mt-3">
                <h3 className="text-base font-bold text-slate-900 tracking-tight">{b.headline}</h3>
                <div className="flex items-center gap-1.5 text-xs text-amber-700 font-medium mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Section: {b.section}</span>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{b.description}</p>
              </div>

              {/* Technical Telemetry Strip */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div className="text-slate-500 flex items-center gap-1.5 font-medium">
                    <Truck className="w-3.5 h-3.5 text-amber-600" />
                    Heavy Cargo (GVW):
                  </div>
                  <div className="font-bold text-slate-800 mt-1 truncate">{b.heavyVehicleImpact}</div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div className="text-slate-500 flex items-center gap-1.5 font-medium">
                    <Wrench className="w-3.5 h-3.5 text-blue-600" />
                    BRO Machinery:
                  </div>
                  <div className="font-bold text-slate-800 mt-1">
                    {b.earthmoversDeployed > 0 ? `${b.earthmoversDeployed} Earthmovers On-Site` : 'Patrol Standby'}
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div className="text-slate-500 flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    Est. Clearance:
                  </div>
                  <div className="font-bold text-slate-800 mt-1">{b.estClearance}</div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <div className="text-slate-500 flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verification Source:
                  </div>
                  <div className="font-bold text-emerald-700 mt-1 truncate">{b.verifiedBy}</div>
                </div>
              </div>

              {/* Detour Alert */}
              {b.detourRoute && (
                <div className="mt-3 bg-blue-50/70 border border-blue-200 rounded-lg p-2.5 flex items-start gap-2 text-xs text-blue-900">
                  <ExternalLink className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-blue-950">Recommended Diversion: </strong>
                    {b.detourRoute}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default BulletinsPage;
