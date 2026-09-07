import { GovernmentSidebar } from '../../components/GovernmentSidebar';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  User, MapPin, Route, ArrowLeft, Gauge, Compass as CompassIcon, Radio
} from 'lucide-react';
import { NerLogixLogo } from '../../components/NerLogixLogo';
import { LogisticsNavigationTabs } from '../../components/logistics/LogisticsNavigationTabs';
import { DataHonestyBadge } from '../../components/logistics/DataHonestyBadge';
import { LogisticsMap } from '../../components/logistics/LogisticsMap';
import { logisticsService } from '../../services/logisticsService';
import type { Vehicle, TelemetryPoint } from '../../types/logistics';

export const VehicleDetailPage: React.FC = () => {
  const { vehicleId } = useParams<{ vehicleId: string }>();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(
    logisticsService.getVehicle(vehicleId || 'DEMO-VH-001')
  );
  const [history, setHistory] = useState<TelemetryPoint[]>([]);

  useEffect(() => {
    const refresh = () => {
      const v = logisticsService.getVehicle(vehicleId || 'DEMO-VH-001');
      setVehicle(v);
      if (v) {
        setHistory(logisticsService.getVehicleLocations(v.id, 15));
      }
    };
    refresh();
    const interval = setInterval(refresh, 2000);
    return () => clearInterval(interval);
  }, [vehicleId]);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-[#f8fafc] p-6 flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold text-slate-900 mb-2">Vehicle Not Found</h2>
        <button
          onClick={() => navigate('/logistics/vehicles')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
        >
          Return to Fleet Registry
        </button>
      </div>
    );
  }

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
            Unit Telemetry: {vehicle.vehicle_number}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-full text-[11px] text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>GPS Tracking Active</span>
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

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          {/* BREADCRUMB & TITLE */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <button onClick={() => navigate('/logistics/vehicles')} className="hover:text-blue-600 flex items-center gap-1 cursor-pointer">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Fleet Registry</span>
                </button>
                <span>•</span>
                <span className="font-mono font-bold text-slate-700">{vehicle.id}</span>
              </div>
              <h1 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                <span>{vehicle.vehicle_number}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-blue-100 text-blue-800 border border-blue-200">
                  {vehicle.status}
                </span>
                <DataHonestyBadge source={vehicle.location_source} />
              </h1>
            </div>

            {vehicle.current_mission_id && (
              <button
                onClick={() => navigate(`/logistics/missions/${vehicle.current_mission_id}`)}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
              >
                <Route className="w-4 h-4" />
                <span>View Assigned Mission ({vehicle.current_mission_id})</span>
              </button>
            )}
          </div>

          <LogisticsNavigationTabs />

          {/* TELEMETRY METRIC GAUGES */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Velocity</span>
                <Gauge className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 font-mono">{vehicle.speed} km/h</div>
              <div className="text-[11px] text-slate-500">Real-time ground speed</div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Compass Heading</span>
                <CompassIcon className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 font-mono">{vehicle.heading}°</div>
              <div className="text-[11px] text-slate-500">Directional bearing</div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Latitude</span>
                <MapPin className="w-4 h-4 text-red-600" />
              </div>
              <div className="text-lg font-black text-slate-900 font-mono">
                {vehicle.current_location?.latitude.toFixed(4) || '26.1584'}° N
              </div>
              <div className="text-[11px] text-slate-500">Geospatial coordinate</div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-xs">
                <span>Longitude</span>
                <MapPin className="w-4 h-4 text-red-600" />
              </div>
              <div className="text-lg font-black text-slate-900 font-mono">
                {vehicle.current_location?.longitude.toFixed(4) || '91.7705'}° E
              </div>
              <div className="text-[11px] text-slate-500">Geospatial coordinate</div>
            </div>
          </div>

          {/* MAP & TELEMETRY HISTORY */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                  Live Unit Position & Breadcrumbs
                </h3>
                <span className="text-[11px] text-slate-500 font-mono">
                  Last Updated: {new Date(vehicle.last_updated).toLocaleTimeString()}
                </span>
              </div>

              <LogisticsMap
                currentLocation={vehicle.current_location}
                className="h-96 w-full rounded-xl overflow-hidden border border-slate-200"
              />
            </div>

            {/* TELEMETRY LOGS */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Radio className="w-4 h-4 text-blue-600" />
                <span>Recent Telemetry Pings</span>
              </h4>

              <div className="space-y-2 text-xs overflow-y-auto max-h-84">
                {history.map((pt) => (
                  <div key={pt.id} className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between font-mono text-[11px]">
                    <div>
                      <div className="text-slate-800 font-semibold">{pt.latitude.toFixed(4)}, {pt.longitude.toFixed(4)}</div>
                      <div className="text-[10px] text-slate-400">
                        {new Date(pt.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-700">{pt.speed} km/h</div>
                      <div className="text-[10px] text-slate-500">{pt.heading}°</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
