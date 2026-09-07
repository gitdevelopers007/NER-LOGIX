import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, MapPin, AlertTriangle, Home, 
  Truck, BarChart3, Settings, 
  Plus, Search, Share2
} from 'lucide-react';
import { NerLogixLogo } from '../../components/NerLogixLogo';
import { LogisticsNavigationTabs } from '../../components/logistics/LogisticsNavigationTabs';
import { CreateMissionModal } from '../../components/logistics/CreateMissionModal';
import { logisticsService } from '../../services/logisticsService';
import type { Mission } from '../../types/logistics';

export const SupplyMissionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [missions, setMissions] = useState<Mission[]>(logisticsService.getMissions());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const refreshData = () => {
    setMissions(logisticsService.getMissions());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const filteredMissions = missions.filter((m) => {
    if (statusFilter !== 'ALL' && m.status !== statusFilter) return false;
    if (priorityFilter !== 'ALL' && m.priority !== priorityFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        m.mission_number.toLowerCase().includes(q) ||
        m.cargo_description.toLowerCase().includes(q) ||
        m.origin.name.toLowerCase().includes(q) ||
        m.destination.name.toLowerCase().includes(q)
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
            North Eastern Region Logistics & Accessibility Intelligence
          </span>
          <span className="text-slate-500 hidden lg:inline">|</span>
          <span className="text-xs font-semibold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800 hidden lg:inline">
            Supply Missions Registry
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-full text-[11px] text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>System Online</span>
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
        <aside className="w-60 bg-white border-r border-slate-200 flex flex-col justify-between p-3 shrink-0 hidden md:flex">
          <div className="space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Navigation
            </div>
            <button onClick={() => navigate('/government-command-center')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer">
              <Home className="w-4 h-4 text-slate-500" />
              <span>Overview</span>
            </button>
            <button onClick={() => navigate('/incidents')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer">
              <MapPin className="w-4 h-4 text-slate-500" />
              <span>Live Map</span>
            </button>
            <button onClick={() => navigate('/route-intelligence')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer">
              <Share2 className="w-4 h-4 text-slate-500" />
              <span>Route Intelligence</span>
            </button>
            <button onClick={() => navigate('/logistics')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold bg-[#1a56db] text-white shadow-xs cursor-pointer">
              <Truck className="w-4 h-4 text-white" />
              <span>Logistics</span>
            </button>
            <button onClick={() => navigate('/live-map')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer">
              <AlertTriangle className="w-4 h-4 text-slate-500" />
              <span>Incidents</span>
            </button>
            <button onClick={() => navigate('/live-map')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer">
              <BarChart3 className="w-4 h-4 text-slate-500" />
              <span>Analytics</span>
            </button>
            <button onClick={() => navigate('/live-map')} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer">
              <Settings className="w-4 h-4 text-slate-500" />
              <span>Administration</span>
            </button>
          </div>

          <div className="mt-auto p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-center space-y-1">
            <div className="flex justify-center">
              <NerLogixLogo variant="blue"  />
            </div>
            <div className="text-[11px] font-bold text-blue-950">North Eastern Region</div>
            <div className="text-[10px] text-blue-700/80">Stronger Connectivity</div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">Supply Missions Registry</h1>
              <p className="text-xs text-slate-500">Track, allocate vehicles, and monitor essential medicine movements across Northeast India</p>
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Mission</span>
            </button>
          </div>

          <LogisticsNavigationTabs />

          {/* SEARCH & FILTERS CARD */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by mission #, cargo, origin, destination..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="IN_TRANSIT">In-Transit</option>
                  <option value="ASSIGNED">Assigned</option>
                  <option value="PLANNED">Planned</option>
                  <option value="DELIVERED">Delivered</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-medium">Priority:</span>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium"
                >
                  <option value="ALL">All Priorities</option>
                  <option value="CRITICAL">Critical</option>
                  <option value="HIGH">High</option>
                  <option value="NORMAL">Normal</option>
                </select>
              </div>
            </div>
          </div>

          {/* MISSIONS TABLE */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Mission #</th>
                    <th className="px-4 py-3">Cargo Details</th>
                    <th className="px-4 py-3">Priority</th>
                    <th className="px-4 py-3">Origin Hub</th>
                    <th className="px-4 py-3">Destination</th>
                    <th className="px-4 py-3">Assigned Vehicle</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredMissions.map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3.5 font-bold font-mono text-blue-900">{m.mission_number}</td>
                      <td className="px-4 py-3.5">
                        <div className="font-semibold text-slate-900">{m.cargo_description}</div>
                        <div className="text-[11px] text-slate-500">{m.cargo_quantity} {m.cargo_unit}</div>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          m.priority === 'CRITICAL' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {m.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-800">{m.origin.name}</td>
                      <td className="px-4 py-3.5 text-slate-800">{m.destination.name}</td>
                      <td className="px-4 py-3.5 font-mono">{m.vehicle_id || 'Unassigned'}</td>
                      <td className="px-4 py-3.5">
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold text-[10px]">
                          {m.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <button
                          onClick={() => navigate(`/logistics/missions/${m.id}`)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-2xs"
                        >
                          Details →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <CreateMissionModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onCreated={refreshData}
          />
        </main>
      </div>
    </div>
  );
};
