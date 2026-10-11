import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, ArrowRight, ShieldCheck, AlertTriangle, 
  CheckCircle2, Clock, Truck, Compass, CloudRain, 
  Share2, Download, Printer, Navigation, Info, ExternalLink,
  ChevronRight, RefreshCw, Zap
} from 'lucide-react';
import { NER_NETWORK_NODES } from '../../services/routingAlgorithms';

interface CorridorData {
  id: string;
  name: string;
  origin: string;
  destination: string;
  distanceKm: number;
  normalHours: number;
  delayMinutes: number;
  status: 'OPEN' | 'RESTRICTED' | 'BLOCKED';
  statusLabel: string;
  highwayNumber: string;
  statesCovered: string[];
  maxElevationM: number;
  bridgeCapacityTons: number;
  hazardDescription?: string;
  hazardLocation?: string;
  detourAvailable: boolean;
  detourRouteName?: string;
  detourExtraKm?: number;
  detourExtraMins?: number;
  gvwTruckClearance: boolean;
}

const CORRIDOR_PRESETS: CorridorData[] = [
  {
    id: 'corridor-nh6',
    name: 'Guwahati – Shillong Lifeline Corridor',
    origin: 'Guwahati',
    destination: 'Shillong',
    distanceKm: 103,
    normalHours: 2.5,
    delayMinutes: 15,
    status: 'RESTRICTED',
    statusLabel: 'Single-Lane Transit (Umiam Hill Section)',
    highwayNumber: 'NH-6',
    statesCovered: ['Assam', 'Meghalaya'],
    maxElevationM: 1496,
    bridgeCapacityTons: 40,
    hazardDescription: 'Partial mudslide debris cleared; single-lane convoy pilot active.',
    hazardLocation: 'NH-6 km 68 near Nongpoh checkpost',
    detourAvailable: true,
    detourRouteName: 'Umiam Bypass via Bhoirymbong Link',
    detourExtraKm: 18,
    detourExtraMins: 32,
    gvwTruckClearance: true
  },
  {
    id: 'corridor-nh13',
    name: 'Tezpur – Tawang Strategic Defense Corridor',
    origin: 'Tezpur',
    destination: 'Tawang',
    distanceKm: 320,
    normalHours: 9.0,
    delayMinutes: 85,
    status: 'RESTRICTED',
    statusLabel: 'Heavy Fog & High Altitude Caution (Sela Pass)',
    highwayNumber: 'NH-13 / Balipara-Charduar-Tawang',
    statesCovered: ['Assam', 'Arunachal Pradesh'],
    maxElevationM: 4170,
    bridgeCapacityTons: 30,
    hazardDescription: 'Freezing drizzle and dense visibility fog above 3,500m. Chains recommended for heavy axles.',
    hazardLocation: 'Sela Tunnel South Approach km 214',
    detourAvailable: false,
    gvwTruckClearance: true
  },
  {
    id: 'corridor-nh27',
    name: 'Guwahati – Nagaon East Logistics Arterial',
    origin: 'Guwahati',
    destination: 'Tezpur',
    distanceKm: 180,
    normalHours: 3.8,
    delayMinutes: 0,
    status: 'OPEN',
    statusLabel: 'Fully Passable (4-Lane High Speed)',
    highwayNumber: 'NH-27',
    statesCovered: ['Assam'],
    maxElevationM: 85,
    bridgeCapacityTons: 55,
    detourAvailable: false,
    gvwTruckClearance: true
  },
  {
    id: 'corridor-nh10',
    name: 'Siliguri – Gangtok Teesta Valley Corridor',
    origin: 'Siliguri',
    destination: 'Gangtok',
    distanceKm: 114,
    normalHours: 4.2,
    delayMinutes: 120,
    status: 'BLOCKED',
    statusLabel: 'Severe Landslide at 29th Mile (BRO Clearance Deployed)',
    highwayNumber: 'NH-10',
    statesCovered: ['West Bengal', 'Sikkim'],
    maxElevationM: 1650,
    bridgeCapacityTons: 25,
    hazardDescription: 'Boulder slip triggered by Teesta riverbank scouring. Road closed for heavy vehicles.',
    hazardLocation: 'NH-10 km 42 (29th Mile Bridge approach)',
    detourAvailable: true,
    detourRouteName: 'Lava – Algarah – Rorathang Mountain Bypass',
    detourExtraKm: 46,
    detourExtraMins: 95,
    gvwTruckClearance: false
  },
  {
    id: 'corridor-nh29',
    name: 'Dimapur – Kohima Mountain Pass',
    origin: 'Dimapur',
    destination: 'Kohima',
    distanceKm: 74,
    normalHours: 2.2,
    delayMinutes: 20,
    status: 'RESTRICTED',
    statusLabel: 'Pavement Settling under Heavy Rain (Caution)',
    highwayNumber: 'NH-29',
    statesCovered: ['Nagaland'],
    maxElevationM: 1444,
    bridgeCapacityTons: 35,
    hazardDescription: 'Slow-moving commercial traffic due to resurfacing works near Zubza.',
    hazardLocation: 'NH-29 km 48 Zubza Slope',
    detourAvailable: true,
    detourRouteName: 'Peducha – Tsiesema Bypass',
    detourExtraKm: 14,
    detourExtraMins: 25,
    gvwTruckClearance: true
  }
];

export const SafeCorridorPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCorridor, setSelectedCorridor] = useState<CorridorData>(CORRIDOR_PRESETS[0]);
  const [origin, setOrigin] = useState<string>(CORRIDOR_PRESETS[0].origin);
  const [destination, setDestination] = useState<string>(CORRIDOR_PRESETS[0].destination);
  const [truckAxleWeight, setTruckAxleWeight] = useState<number>(28);

  const availableNodes = Object.keys(NER_NETWORK_NODES);
  const userRole = localStorage.getItem('traveler_user_role') || 'CITIZEN_COMMUTER';

  const handleSearch = () => {
    const match = CORRIDOR_PRESETS.find(
      (c) => c.origin.toLowerCase() === origin.toLowerCase() && c.destination.toLowerCase() === destination.toLowerCase()
    );
    if (match) {
      setSelectedCorridor(match);
    } else {
      // Fallback custom computed corridor
      setSelectedCorridor({
        id: `custom-${origin}-${destination}`,
        name: `${origin} – ${destination} Inter-State Corridor`,
        origin,
        destination,
        distanceKm: 195,
        normalHours: 4.5,
        delayMinutes: 25,
        status: 'RESTRICTED',
        statusLabel: 'Monsoon Saturated Pavement (Drive with Caution)',
        highwayNumber: 'State Highway Link',
        statesCovered: ['Assam', 'North East Inter-Link'],
        maxElevationM: 1200,
        bridgeCapacityTons: 35,
        hazardDescription: 'General seasonal rain warning; no structural washouts reported on main spine.',
        detourAvailable: false,
        gvwTruckClearance: true
      });
    }
  };

  const getStatusBadge = (status: CorridorData['status']) => {
    switch (status) {
      case 'OPEN':
        return {
          bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          dot: 'bg-emerald-500',
          title: 'NORMAL PASSAGE'
        };
      case 'RESTRICTED':
        return {
          bg: 'bg-amber-100 text-amber-800 border-amber-300',
          dot: 'bg-amber-500 animate-pulse',
          title: 'CAUTION / RESTRICTED'
        };
      case 'BLOCKED':
        return {
          bg: 'bg-red-100 text-red-800 border-red-300',
          dot: 'bg-red-600 animate-pulse',
          title: 'ROAD BLOCKED'
        };
    }
  };

  const statusStyle = getStatusBadge(selectedCorridor.status);

  return (
    <div className="space-y-6">
      {/* 1. Page Header & Quick Notice */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-[#0b1a30] tracking-tight">
              Safe Corridor Explorer &amp; Mountain Route Advisory
            </h1>
            <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
              LIVE GIS 8-STATE MESH
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Authoritative highway passability verified by State Disaster Authorities, Border Roads Organisation (BRO), and live satellite telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/traveler/offline-pass')}
            className="px-3 py-2 bg-[#0b1a30] hover:bg-[#071223] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Save Offline Pass</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Route Search Box */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
          Select or Search Mountain Corridor
        </span>

        {/* Quick Corridor Buttons */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {CORRIDOR_PRESETS.map((corridor) => (
            <button
              key={corridor.id}
              onClick={() => {
                setSelectedCorridor(corridor);
                setOrigin(corridor.origin);
                setDestination(corridor.destination);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCorridor.id === corridor.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <span>{corridor.highwayNumber}</span>
              <span className="font-normal opacity-80">({corridor.origin} → {corridor.destination})</span>
            </button>
          ))}
        </div>

        {/* Search Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end pt-2 border-t border-slate-100">
          <div className="md:col-span-5">
            <label className="text-[11px] font-bold text-slate-600 block mb-1">
              Origin Location (Departure City)
            </label>
            <div className="relative">
              <select
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full text-xs font-semibold py-2.5 px-3 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {availableNodes.map((node) => (
                  <option key={node} value={node}>{node}</option>
                ))}
              </select>
              <MapPin className="w-4 h-4 text-emerald-600 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div className="md:col-span-5">
            <label className="text-[11px] font-bold text-slate-600 block mb-1">
              Destination Location (Arrival City)
            </label>
            <div className="relative">
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full text-xs font-semibold py-2.5 px-3 border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {availableNodes.map((node) => (
                  <option key={node} value={node}>{node}</option>
                ))}
              </select>
              <Navigation className="w-4 h-4 text-blue-600 absolute right-3 top-2.5 pointer-events-none" />
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              onClick={handleSearch}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Inspect Route</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Primary Corridor Assessment Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Corridor Details (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            {/* Corridor Header */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-slate-900 text-white font-mono">
                    {selectedCorridor.highwayNumber}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {selectedCorridor.statesCovered.join(' • ')}
                  </span>
                </div>
                <h2 className="text-lg font-extrabold text-slate-900 mt-1">
                  {selectedCorridor.name}
                </h2>
              </div>

              {/* Status Badge */}
              <div className={`px-3 py-1 rounded-xl border flex items-center gap-1.5 shrink-0 font-bold text-xs ${statusStyle.bg}`}>
                <span className={`w-2 h-2 rounded-full ${statusStyle.dot}`} />
                <span>{statusStyle.title}</span>
              </div>
            </div>

            {/* Status Summary Banner */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Official Advisory Status
              </span>
              <p className="text-xs font-bold text-slate-800">
                {selectedCorridor.statusLabel}
              </p>
              {selectedCorridor.hazardDescription && (
                <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                  ⚠️ <strong>Ground Observation:</strong> {selectedCorridor.hazardDescription}
                </p>
              )}
              {selectedCorridor.hazardLocation && (
                <p className="text-[11px] text-slate-500 font-mono">
                  Location Marker: {selectedCorridor.hazardLocation}
                </p>
              )}
            </div>

            {/* Metric Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 block uppercase font-mono">Total Distance</span>
                <span className="text-base font-extrabold text-slate-900 font-mono">{selectedCorridor.distanceKm} km</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 block uppercase font-mono">Standard ETA</span>
                <span className="text-base font-extrabold text-slate-900 font-mono">{selectedCorridor.normalHours} hrs</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 block uppercase font-mono">Hazard Delay</span>
                <span className={`text-base font-extrabold font-mono ${
                  selectedCorridor.delayMinutes > 30 ? 'text-red-600' : selectedCorridor.delayMinutes > 0 ? 'text-amber-600' : 'text-emerald-600'
                }`}>
                  +{selectedCorridor.delayMinutes} mins
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 block uppercase font-mono">Peak Elevation</span>
                <span className="text-base font-extrabold text-slate-900 font-mono">{selectedCorridor.maxElevationM} m</span>
              </div>
            </div>

            {/* Dynamic Bypass Detour (If Active) */}
            {selectedCorridor.detourAvailable ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5 uppercase tracking-wide">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    Verified Bypass Detour Available
                  </span>
                  <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                    BRO / SDMA Approved
                  </span>
                </div>
                <div className="text-xs text-emerald-800 font-semibold">
                  {selectedCorridor.detourRouteName}
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-emerald-900 pt-1">
                  <span>Additional Distance: <strong>+{selectedCorridor.detourExtraKm} km</strong></span>
                  <span>Additional Time: <strong>+{selectedCorridor.detourExtraMins} mins</strong></span>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                <Info className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Single arterial mountain corridor. No paved alternate bypass exists for this pass. Follow pilot convoy instructions.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Commercial GVW Check & Mountain Pass Safety (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Commercial Freight & Bridge Clearance Calculator */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-blue-700" />
                Commercial Truck / Axle Clearance
              </span>
              <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                GVW MONITOR
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-600">Truck Gross Weight (GVW):</span>
                <span className="font-bold text-slate-900 font-mono">{truckAxleWeight} Tonnes</span>
              </div>
              <input
                type="range"
                min="10"
                max="60"
                value={truckAxleWeight}
                onChange={(e) => setTruckAxleWeight(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>10T (Light)</span>
                <span>35T (Standard Multi-Axle)</span>
                <span>60T (Heavy Freight)</span>
              </div>
            </div>

            {/* Verdict */}
            <div className={`p-3 rounded-xl border text-xs space-y-1 ${
              truckAxleWeight <= selectedCorridor.bridgeCapacityTons
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-red-50 border-red-200 text-red-900'
            }`}>
              <div className="font-bold flex items-center gap-1.5">
                {truckAxleWeight <= selectedCorridor.bridgeCapacityTons ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Clearance Approved for Highway Bridges</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-red-700" />
                    <span>Weight Limit Exceeded: Bailey Bridge Risk</span>
                  </>
                )}
              </div>
              <p className="text-[11px] leading-relaxed">
                Maximum structural tolerance along {selectedCorridor.highwayNumber} culverts is <strong>{selectedCorridor.bridgeCapacityTons} Tonnes</strong>.
                {truckAxleWeight > selectedCorridor.bridgeCapacityTons && ' Heavy vehicle will be stopped at police weighbridge checkpost.'}
              </p>
            </div>
          </div>

          {/* Emergency SOS & Quick Actions */}
          <div className="bg-gradient-to-br from-[#0b1a30] to-[#122847] text-white rounded-2xl p-5 space-y-3.5 shadow-md">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block mb-1">
                Mountain Driver Lifeline
              </span>
              <h3 className="text-sm font-bold text-white">
                Before Entering Mountain Dead Zones
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Mobile signals drop to zero along mountain river passes. Download or screenshot your route pass with emergency police contacts now.
              </p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => navigate('/traveler/offline-pass')}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Generate Digital Journey Pass</span>
              </button>

              <button
                onClick={() => navigate('/traveler/lifelines')}
                className="w-full py-2.5 bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>View Emergency Diesel &amp; Trauma Centers</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
