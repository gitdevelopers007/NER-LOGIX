import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, MapPin, Share2, Truck, AlertTriangle, 
  Bell, BarChart3, Database, Settings 
} from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: {
    count: number | string;
  };
  matchPrefix?: boolean;
}

export const GovernmentSidebar: React.FC<{ activeOverride?: string }> = ({ activeOverride }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = activeOverride || location.pathname;

  const navItems: NavItem[] = [
    {
      name: 'Overview',
      path: '/government-command-center',
      icon: Home
    },
    {
      name: 'Live Accessibility Map',
      path: '/live-map',
      icon: MapPin
    },
    {
      name: 'Route Intelligence',
      path: '/route-intelligence',
      icon: Share2
    },
    {
      name: 'Logistics & Vehicles',
      path: '/logistics',
      icon: Truck,
      matchPrefix: true
    },
    {
      name: 'Incidents & Field Reports',
      path: '/incidents',
      icon: AlertTriangle,
      badge: { count: 8 }
    },
    {
      name: 'Alerts & Emergency Response',
      path: '/alerts',
      icon: Bell,
      badge: { count: 6 }
    },
    {
      name: 'Analytics & Planning',
      path: '/analytics',
      icon: BarChart3
    },
    {
      name: 'Data & Integration',
      path: '/data-integration',
      icon: Database
    },
    {
      name: 'Administration',
      path: '/admin',
      icon: Settings
    }
  ];

  const isItemActive = (item: NavItem) => {
    if (item.matchPrefix) {
      return currentPath.startsWith(item.path);
    }
    return currentPath === item.path;
  };

  return (
    <aside className="w-60 bg-white border-r border-slate-200 flex flex-col justify-between p-3 shrink-0 hidden md:flex select-none">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Navigation
        </div>

        {navItems.map((item) => {
          const active = isItemActive(item);
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors text-left cursor-pointer ${
                active
                  ? 'bg-[#1a56db] text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-slate-500'}`} />
                <span className="truncate">{item.name}</span>
              </div>

              {/* Dynamic Badges */}
              {item.badge ? (
                <span
                  className={`text-[10px] font-bold flex items-center justify-center transition-all ${
                    active
                      ? 'w-5 h-5 rounded-full bg-white text-[#1a56db]'
                      : 'w-5 h-5 rounded-full bg-red-500 text-white'
                  }`}
                >
                  {item.badge.count}
                </span>
              ) : active ? (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Regional Branding Card (Consistent across all pages) */}
      <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-center space-y-1">
        <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
          North Eastern Council
        </div>
        <div className="text-[9.5px] text-slate-500">
          8 States • Central Command Node
        </div>
      </div>
    </aside>
  );
};
