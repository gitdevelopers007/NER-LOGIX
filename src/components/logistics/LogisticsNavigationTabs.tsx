import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BarChart3, Package, Truck, Flame } from 'lucide-react';

export const LogisticsNavigationTabs: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isOverview = location.pathname === '/logistics';
  const isMissions = location.pathname.startsWith('/logistics/missions');
  const isVehicles = location.pathname.startsWith('/logistics/vehicles');

  return (
    <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 w-fit">
      <button
        onClick={() => navigate('/logistics')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
          isOverview
            ? 'bg-white text-[#1a56db] shadow-xs border border-slate-200/80'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
        }`}
      >
        <BarChart3 className="w-3.5 h-3.5" />
        <span>Logistics Overview</span>
      </button>

      <button
        onClick={() => navigate('/logistics/missions')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
          isMissions
            ? 'bg-white text-[#1a56db] shadow-xs border border-slate-200/80'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
        }`}
      >
        <Package className="w-3.5 h-3.5" />
        <span>Supply Missions</span>
        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-700 font-bold">
          3
        </span>
      </button>

      <button
        onClick={() => navigate('/logistics/vehicles')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
          isVehicles
            ? 'bg-white text-[#1a56db] shadow-xs border border-slate-200/80'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
        }`}
      >
        <Truck className="w-3.5 h-3.5" />
        <span>Fleet Registry & Tracking</span>
        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-700 font-bold">
          5
        </span>
      </button>

      <button
        onClick={() => navigate('/logistics/stock')}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
          location.pathname.startsWith('/logistics/stock')
            ? 'bg-white text-[#1a56db] shadow-xs border border-slate-200/80'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
        }`}
      >
        <Flame className="w-3.5 h-3.5 text-rose-500" />
        <span>Essential Goods &amp; Stock Alerts</span>
        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700 font-bold animate-pulse">
          2
        </span>
      </button>

      <div className="h-5 w-[1px] bg-slate-300 mx-1 hidden lg:block" />

      <button
        onClick={() => navigate('/copilot')}
        className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer text-indigo-700 hover:bg-indigo-100/70"
        title="Open AI Logistics Copilot"
      >
        <span className="text-[11px] font-black bg-indigo-600 text-white px-1.5 py-0.5 rounded">AI</span>
        <span>Copilot</span>
      </button>
    </div>
  );
};
