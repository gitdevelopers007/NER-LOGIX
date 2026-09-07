import { GovernmentSidebar } from '../../components/GovernmentSidebar';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  User, AlertTriangle, Route, Truck, ArrowLeft, RotateCw, Package, Clock
} from 'lucide-react';
import { NerLogixLogo } from '../../components/NerLogixLogo';
import { LogisticsNavigationTabs } from '../../components/logistics/LogisticsNavigationTabs';
import { SimulationDeck } from '../../components/logistics/SimulationDeck';
import { LogisticsMap } from '../../components/logistics/LogisticsMap';
import { logisticsService } from '../../services/logisticsService';
import type { Mission, Vehicle } from '../../types/logistics';

export const MissionDetailPage: React.FC = () => {
  const { missionId } = useParams<{ missionId: string }>();
  const navigate = useNavigate();
  const [mission, setMission] = useState<Mission | undefined>(
    logisticsService.getMission(missionId || 'DEMO-MSN-001')
  );
  const [vehicles, setVehicles] = useState<Vehicle[]>(logisticsService.getVehicles());
  const [selectedVehicle, setSelectedVehicle] = useState('');

  const refreshMission = () => {
    setMission(logisticsService.getMission(missionId || 'DEMO-MSN-001'));
    setVehicles(logisticsService.getVehicles());
  };

  useEffect(() => {
    refreshMission();
    const interval = setInterval(refreshMission, 1500);
    return () => clearInterval(interval);
  }, [missionId]);

  if (!mission) {
    return (
      <div className="min-h-screen bg-[#f8fafc] p-6 flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold text-slate-900 mb-2">Supply Mission Not Found</h2>
        <button
          onClick={() => navigate('/logistics/missions')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
        >
          Return to Missions Registry
        </button>
      </div>
    );
  }

  const assignedVehicle = vehicles.find((v) => v.id === mission.vehicle_id);

  const handleAssignVehicle = () => {
    if (!selectedVehicle) return;
    logisticsService.assignVehicle(mission.id, selectedVehicle);
    refreshMission();
  };

  const handleManualReroute = () => {
    logisticsService.rerouteMission(
      mission.id,
      'Operator initiated corridor diversion due to heavy rainfall & mudslide alert'
    );
    refreshMission();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      {/* HEADER */}
      <header className="bg-[#0b1a30] text-white px-4 lg:px-6 py-2.5 flex items-center justify-between shadow-md z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <NerLogixLogo variant="white"  />
            <span className="font-bold text-lg tracking-wider text-white">NER-LOGIX</span>
          </div>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-xs text-slate-300 font-medium hidden md:inline">
            Mission Telemetry & Dispatch
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-full text-[11px] text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Telemetry Active</span>
          </div>
          <div className="h-4 w-px bg-slate-700" />
          <div className="flex items-center gap-2 text-xs text-slate-200">
            <div className="w-7 h-7 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center text-xs">
              <User className="w-4 h-4" />
            </div>
            <span className="hidden sm:inline font-semibold">Logistics Officer</span>
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <GovernmentSidebar />

        {/* MAIN VIEWPORT */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          {/* BREADCRUMB & TITLE */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <button onClick={() => navigate('/logistics/missions')} className="hover:text-blue-600 flex items-center gap-1 cursor-pointer">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Missions Registry</span>
                </button>
                <span>•</span>
                <span className="font-mono font-bold text-slate-700">{mission.mission_number}</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                <span>{mission.cargo_description}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-blue-100 text-blue-800 border border-blue-200">
                  {mission.status}
                </span>
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                  mission.priority === 'CRITICAL' ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-amber-100 text-amber-800'
                }`}>
                  {mission.priority} PRIORITY
                </span>
              </h1>
            </div>

            <div className="flex items-center gap-2">
              {mission.vehicle_id && (
                <button
                  onClick={() => navigate(`/logistics/vehicles/${mission.vehicle_id}`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-300 cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5 text-slate-600" />
                  <span>Assigned Vehicle: {mission.vehicle_id}</span>
                </button>
              )}

              <button
                onClick={handleManualReroute}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Trigger Corridor Bypass</span>
              </button>
            </div>
          </div>

          <LogisticsNavigationTabs />

          {/* SIMULATION CONTROLS DECK */}
          <SimulationDeck missionId={mission.id} onUpdate={refreshMission} />

          {/* CORRIDOR DIVERSION / REROUTE DIFF BANNER (IF TRIGGERED) */}
          {mission.recent_route_comparison && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 shadow-xs space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-amber-200">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>ACTIVE CORRIDOR DIVERSION (LANDSLIDE BYPASS ACTIVATED)</span>
                </div>
                <span className="text-[11px] text-amber-800 font-medium">
                  Reason: {mission.recent_route_comparison.reason}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Previous Route</div>
                  <div className="font-bold text-slate-700 line-through">
                    {mission.recent_route_comparison.previous_route_name}
                  </div>
                  <div className="text-[11px] text-slate-500">{mission.recent_route_comparison.previous_distance_km} km</div>
                </div>

                <div>
                  <div className="text-[10px] text-blue-700 font-semibold uppercase">New Activated Route</div>
                  <div className="font-bold text-blue-800">
                    {mission.recent_route_comparison.new_route_name}
                  </div>
                  <div className="text-[11px] text-blue-700 font-semibold">{mission.recent_route_comparison.new_distance_km} km</div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Delay Variance</div>
                  <div className="font-bold text-amber-800">
                    +{mission.recent_route_comparison.eta_difference_minutes} minutes
                  </div>
                  <div className="text-[11px] text-slate-500">Buffer calculated</div>
                </div>

                <div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Risk Status</div>
                  <div className="font-bold text-emerald-700">94% Clearance</div>
                  <div className="text-[11px] text-emerald-600">Landslide avoided</div>
                </div>
              </div>
            </div>
          )}

          {/* MAP & DETAILS GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEAFLET GEOSPATIAL MAP */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Route className="w-4 h-4 text-blue-600" />
                  <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                    Live Corridor Map (NH-6 Guwahati-Shillong)
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-600" /> Active Route</span>
                  {mission.previous_route && (
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Disrupted Segment</span>
                  )}
                </div>
              </div>

              <LogisticsMap
                route={mission.active_route}
                previousRoute={mission.previous_route}
                currentLocation={assignedVehicle?.current_location}
                origin={mission.origin}
                destination={mission.destination}
                disruptionPoint={mission.delay_minutes > 0 ? [25.7535, 91.902] : null}
                className="h-96 w-full rounded-xl overflow-hidden border border-slate-200"
              />
            </div>

            {/* SIDE PANEL: CARGO MANIFEST & TIMELINE */}
            <div className="space-y-4">
              {/* Manifest Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Package className="w-4 h-4 text-blue-600" />
                  <span>Cargo Manifest</span>
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Commodity:</span>
                    <span className="font-bold text-slate-800">{mission.cargo_type}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Quantity:</span>
                    <span className="font-bold text-slate-800">{mission.cargo_quantity} {mission.cargo_unit}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Origin Hub:</span>
                    <span className="font-bold text-slate-800 text-right">{mission.origin.name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Destination:</span>
                    <span className="font-bold text-slate-800 text-right">{mission.destination.name}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Assigned Vehicle:</span>
                    <span className="font-mono font-bold text-blue-700">{mission.vehicle_id || 'None'}</span>
                  </div>
                </div>

                {!mission.vehicle_id && (
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <label className="block text-[11px] font-bold text-slate-700">Allocate Fleet Unit</label>
                    <div className="flex gap-2">
                      <select
                        value={selectedVehicle}
                        onChange={(e) => setSelectedVehicle(e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-300 rounded-lg p-1.5 text-xs text-slate-800"
                      >
                        <option value="">Select available vehicle...</option>
                        {vehicles.filter(v => v.status === 'IDLE').map(v => (
                          <option key={v.id} value={v.id}>{v.id} ({v.vehicle_number})</option>
                        ))}
                      </select>
                      <button
                        onClick={handleAssignVehicle}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold cursor-pointer"
                      >
                        Assign
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Timeline Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Mission Operational Log</span>
                </h4>

                <div className="space-y-3 text-xs">
                  {mission.timeline.map((evt) => (
                    <div key={evt.id} className="flex items-start gap-2.5">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-1 shrink-0" />
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-900">{evt.title}</div>
                        <div className="text-slate-500 text-[11px] leading-tight">{evt.description}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
