import { GovernmentSidebar } from '../../components/GovernmentSidebar';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, User, AlertTriangle, Truck, ChevronDown, 
  Compass, CheckCircle2, Flame, Plus, ArrowRight, Package, Clock
} from 'lucide-react';
import { NerLogixLogo } from '../../components/NerLogixLogo';
import { LogisticsNavigationTabs } from '../../components/logistics/LogisticsNavigationTabs';
import { CreateMissionModal } from '../../components/logistics/CreateMissionModal';
import { logisticsService } from '../../services/logisticsService';
import type { LogisticsOverviewStats, Mission } from '../../types/logistics';

export const LogisticsOverviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<LogisticsOverviewStats>(logisticsService.getOverviewStats());
  const [missions, setMissions] = useState<Mission[]>(logisticsService.getMissions());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const refreshData = () => {
    setStats(logisticsService.getOverviewStats());
    setMissions(logisticsService.getMissions());
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 3000);
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      title: 'Active Missions',
      value: stats.active_missions,
      subtitle: 'Assigned or In-Transit',
      icon: Compass,
      color: 'text-blue-600',
      bg: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'In-Transit Fleet',
      value: stats.in_transit_vehicles,
      subtitle: 'Moving along active corridor',
      icon: Truck,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50 border-emerald-200'
    },
    {
      title: 'Delayed Deliveries',
      value: stats.delayed_deliveries,
      subtitle: 'Disruption or terrain slowdown',
      icon: AlertTriangle,
      color: 'text-rose-600',
      bg: 'bg-rose-50 border-rose-200'
    },
    {
      title: 'Critical Missions',
      value: stats.critical_missions,
      subtitle: 'Emergency medicines & cold chain',
      icon: Flame,
      color: 'text-amber-600',
      bg: 'bg-amber-50 border-amber-200'
    },
    {
      title: 'Completed Today',
      value: stats.completed_today,
      subtitle: 'Safely delivered to hub',
      icon: CheckCircle2,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50 border-indigo-200'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      {/* 1. TOP NAV BAR (DARK NAVY - ESTABLISHED PAST DESIGN) */}
      <header className="bg-[#0b1a30] text-white px-4 lg:px-6 py-2.5 flex items-center justify-between shadow-md z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <NerLogixLogo variant="white"  />
          </div>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-xs text-slate-300 font-medium hidden md:inline">
            North Eastern Region Logistics & Accessibility Intelligence
          </span>
          <span className="text-slate-500 hidden lg:inline">|</span>
          <span className="text-xs font-semibold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800 hidden lg:inline">
            Logistics & Fleet Operations
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-full text-[11px] text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>System Online</span>
          </div>

          <div className="h-4 w-px bg-slate-700 hidden sm:block" />

          <button className="relative text-slate-300 hover:text-white p-1 transition-colors cursor-pointer">
            <Bell className="w-4 h-4" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="h-4 w-px bg-slate-700" />

          <div className="flex items-center gap-2 text-xs text-slate-200">
            <div className="w-7 h-7 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center text-xs shadow-inner">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <div className="font-semibold text-slate-100">Logistics Officer</div>
              <div className="text-[10px] text-slate-400">Fleet Operations</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      </header>

      {/* 2. MAIN BODY: SIDEBAR + CONTENT */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR (LIGHT THEME - ESTABLISHED PAST DESIGN) */}
        <GovernmentSidebar />

        {/* MAIN VIEWPORT */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-6">
          {/* TOP TITLE ROW & SYNC STATUS */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shadow-xs">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg lg:text-xl font-bold text-slate-900 leading-tight">
                  Logistics & Fleet Operations
                </h1>
                <p className="text-xs text-slate-500">
                  Strategic supply chain tracking, essential medical dispatch, and real-time corridor monitoring
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>Sync: <strong className="text-slate-700">Live</strong></span>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-2 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-xs transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Dispatch Mission</span>
              </button>
            </div>
          </div>

          {/* NAVIGATION SUB-TABS */}
          <LogisticsNavigationTabs />

          {/* 5 MACRO STAT CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs space-y-2 hover:shadow-xs transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      {card.title}
                    </span>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${card.bg}`}>
                      <Icon className={`w-4 h-4 ${card.color}`} />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-slate-900">{card.value}</div>
                  <div className="text-[11px] text-slate-500 leading-tight">{card.subtitle}</div>
                </div>
              );
            })}
          </div>

          {/* ACTIVE MISSIONS TABLE */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-sm text-slate-900">Active Supply Movements</h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/logistics/missions')}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>View All Missions ({missions.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Mission #</th>
                    <th className="px-4 py-3">Commodity & Manifest</th>
                    <th className="px-4 py-3">Priority</th>
                    <th className="px-4 py-3">Origin & Destination</th>
                    <th className="px-4 py-3">Assigned Vehicle</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Operational Intelligence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {missions.map((m) => {
                    const isCritical = m.priority === 'CRITICAL';
                    const isDelayed = m.delay_minutes > 0;

                    return (
                      <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3.5 font-bold font-mono text-blue-900">
                          {m.mission_number}
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="font-semibold text-slate-900">{m.cargo_description}</div>
                          <div className="text-[11px] text-slate-500">
                            {m.cargo_quantity} {m.cargo_unit} • {m.cargo_type}
                          </div>
                        </td>

                        <td className="px-4 py-3.5">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                              isCritical
                                ? 'bg-red-100 text-red-700 border border-red-200'
                                : m.priority === 'HIGH'
                                ? 'bg-amber-100 text-amber-700 border border-amber-200'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {m.priority}
                          </span>
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="text-slate-800 font-medium">{m.origin.name}</div>
                          <div className="text-[11px] text-slate-400">→ {m.destination.name}</div>
                        </td>

                        <td className="px-4 py-3.5 font-mono text-slate-700">
                          {m.vehicle_id ? (
                            <span className="bg-slate-100 px-2 py-1 rounded text-slate-800 border border-slate-200">
                              {m.vehicle_id}
                            </span>
                          ) : (
                            <span className="text-slate-400 italic">Unassigned</span>
                          )}
                        </td>

                        <td className="px-4 py-3.5">
                          {isDelayed ? (
                            <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold border border-red-200">
                              <AlertTriangle className="w-3 h-3" />
                              <span>DELAYED (+{m.delay_minutes}m)</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>{m.status}</span>
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-3.5 text-right">
                          <button
                            onClick={() => navigate(`/logistics/missions/${m.id}`)}
                            className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold border border-blue-200 cursor-pointer transition-colors"
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

          {/* CREATE MISSION MODAL */}
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
