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
  FileText,
  Calendar,
  Eye,
  Truck,
  Car
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
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Title & Official Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#0b1a30] via-[#0f284e] to-[#0b1a30] p-6 rounded-xl border border-blue-900/60 shadow-lg text-white">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-amber-400 animate-pulse" />
              Live Emergency Dispatches
            </span>
            <span className="text-xs text-blue-300">BRO · NHIDCL · SDMA Joint Telemetry</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">North East Road Disruption Bulletins</h1>
          <p className="text-sm text-slate-300 mt-1">
            Real-time verified highway closures, landslide clearance countdowns, and heavy-freight bypass advisories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900/80 border border-blue-900/80 rounded-lg p-3 text-center min-w-[120px]">
            <div className="text-xs text-slate-400 font-medium">Active Incidents</div>
            <div className="text-2xl font-bold text-amber-400 mt-0.5">3 Critical</div>
          </div>
          <div className="bg-slate-900/80 border border-blue-900/80 rounded-lg p-3 text-center min-w-[120px]">
            <div className="text-xs text-slate-400 font-medium">Restored (24h)</div>
            <div className="text-2xl font-bold text-emerald-400 mt-0.5">9 Corridors</div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#0f172a] p-4 rounded-xl border border-slate-800 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search highway, section, hazard..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-300 font-medium">State:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-500"
            >
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-300 font-medium">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-blue-500"
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

      {/* Bulletins List */}
      <div className="space-y-4">
        {filtered.map((b) => {
          const isBlocked = b.status === 'BLOCKED';
          const isRestricted = b.status === 'RESTRICTED';
          const isRestored = b.status === 'RESTORED';

          return (
            <div
              key={b.id}
              className={`p-5 rounded-xl border transition-all ${
                isBlocked
                  ? 'bg-[#131b2e] border-rose-900/60 hover:border-rose-700'
                  : isRestricted
                  ? 'bg-[#131b2e] border-amber-900/60 hover:border-amber-700'
                  : isRestored
                  ? 'bg-[#131b2e] border-emerald-900/60 hover:border-emerald-700'
                  : 'bg-[#131b2e] border-blue-900/60 hover:border-blue-700'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wide flex items-center gap-1.5 ${
                      isBlocked
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : isRestricted
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : isRestored
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                    }`}
                  >
                    {isBlocked && <AlertTriangle className="w-3.5 h-3.5" />}
                    {isRestored && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {b.status}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-base">{b.highway}</span>
                    <span className="text-xs text-slate-400 font-mono">[{b.state}]</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    {b.issuedAt}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span>ID: {b.id}</span>
                </div>
              </div>

              <div className="mt-3">
                <h3 className="text-base font-semibold text-white tracking-tight">{b.headline}</h3>
                <div className="flex items-center gap-1.5 text-xs text-amber-400/90 mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Section: {b.section}</span>
                </div>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">{b.description}</p>
              </div>

              {/* Technical Telemetry Strip */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-900/70 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-400 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-amber-400" />
                    Heavy Cargo (GVW):
                  </div>
                  <div className="font-semibold text-slate-200 mt-1 truncate">{b.heavyVehicleImpact}</div>
                </div>

                <div className="bg-slate-900/70 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-400 flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-cyan-400" />
                    BRO Machinery:
                  </div>
                  <div className="font-semibold text-cyan-300 mt-1">
                    {b.earthmoversDeployed > 0 ? `${b.earthmoversDeployed} Earthmovers On-Site` : 'Patrol Standby'}
                  </div>
                </div>

                <div className="bg-slate-900/70 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    Est. Clearance:
                  </div>
                  <div className="font-semibold text-blue-300 mt-1">{b.estClearance}</div>
                </div>

                <div className="bg-slate-900/70 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Verification Source:
                  </div>
                  <div className="font-semibold text-emerald-300 mt-1 truncate">{b.verifiedBy}</div>
                </div>
              </div>

              {b.detourRoute && (
                <div className="mt-3 bg-blue-950/40 border border-blue-900/50 rounded-lg p-2.5 flex items-start gap-2 text-xs text-blue-200">
                  <ExternalLink className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">Recommended Diversion: </span>
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
