import { GovernmentSidebar } from '../../components/GovernmentSidebar';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, Search
} from 'lucide-react';
import { NerLogixLogo } from '../../components/NerLogixLogo';
import { LogisticsNavigationTabs } from '../../components/logistics/LogisticsNavigationTabs';
import { DataHonestyBadge } from '../../components/logistics/DataHonestyBadge';
import { logisticsService } from '../../services/logisticsService';
import type { Vehicle } from '../../types/logistics';

export const FleetVehiclesPage: React.FC = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<Vehicle[]>(logisticsService.getVehicles());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    const refresh = () => setVehicles(logisticsService.getVehicles());
    refresh();
    const interval = setInterval(refresh, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredVehicles = vehicles.filter((v) => {
    if (statusFilter !== 'ALL' && v.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        v.id.toLowerCase().includes(q) ||
        v.vehicle_number.toLowerCase().includes(q) ||
        v.vehicle_type.toLowerCase().includes(q) ||
        (v.current_mission_id && v.current_mission_id.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      {/* TOP HEADER */}
      <header className="bg-[#0b1a30] text-white px-4 lg:px-6 py-2.5 flex items-center justify-between shadow-md z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <NerLogixLogo variant="white"  />
            <span className="font-bold text-lg tracking-wider text-white">NER-LOGIX</span>
          </div>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-xs text-slate-300 font-medium hidden md:inline">
            Fleet Vehicles Registry & Telemetry
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
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">Fleet Vehicles Registry</h1>
              <p className="text-xs text-slate-500">Real-time status, velocity, and telemetry feeds for authorized logistics fleet units</p>
            </div>
          </div>

          <LogisticsNavigationTabs />

          {/* SEARCH & FILTERS */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by ID, registration #, vehicle type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium"
              >
                <option value="ALL">All Statuses</option>
                <option value="IN_TRANSIT">In-Transit</option>
                <option value="ASSIGNED">Assigned</option>
                <option value="IDLE">Idle</option>
                <option value="DELIVERED">Delivered</option>
              </select>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Vehicle ID</th>
                    <th className="px-4 py-3">Reg Number</th>
                    <th className="px-4 py-3">Vehicle Type</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Cargo Manifest &amp; Resupply Target</th>
                    <th className="px-4 py-3">Current Mission</th>
                    <th className="px-4 py-3">Speed &amp; Heading</th>
                    <th className="px-4 py-3">Data Source</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredVehicles.map((v) => {
                    const isInTransit = v.status === 'IN_TRANSIT';

                    return (
                      <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3.5 font-bold font-mono text-blue-900">{v.id}</td>
                        <td className="px-4 py-3.5 font-bold text-slate-800">{v.vehicle_number}</td>
                        <td className="px-4 py-3.5">
                          <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-semibold text-slate-700">
                            {v.vehicle_type}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isInTransit
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : v.status === 'IDLE'
                              ? 'bg-slate-100 text-slate-700'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {v.status}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          {v.cargo_item ? (
                            <div className="space-y-0.5">
                              <div className="font-semibold text-slate-800 text-[11.5px]">
                                {v.cargo_item} ({v.cargo_quantity} {v.cargo_unit})
                              </div>
                              <div className="text-[10.5px] text-slate-500 flex items-center gap-1.5">
                                <span className="text-blue-600 font-medium">Target:</span>
                                <span>{v.destination_hub}</span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-slate-400 italic text-[11px]">No Cargo Manifest</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 font-mono">
                          {v.current_mission_id ? (
                            <button
                              onClick={() => navigate(`/logistics/missions/${v.current_mission_id}`)}
                              className="text-blue-600 hover:underline font-semibold"
                            >
                              {v.current_mission_id}
                            </button>
                          ) : (
                            <span className="text-slate-400 italic">Unassigned</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 font-mono text-slate-700">
                          {v.speed} km/h • {v.heading}°
                        </td>
                        <td className="px-4 py-3.5">
                          <DataHonestyBadge source={v.location_source} />
                        </td>
                        <td className="px-4 py-3.5 text-right">
                          <button
                            onClick={() => navigate(`/logistics/vehicles/${v.id}`)}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-2xs"
                          >
                            Live Telemetry →
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
