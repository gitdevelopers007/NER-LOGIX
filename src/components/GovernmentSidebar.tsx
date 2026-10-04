import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, MapPin, Share2, Truck, AlertTriangle, 
  Bell, BarChart3, Database, Settings, Bot,
  Radio, ExternalLink 
} from 'lucide-react';
import { incidentService } from '../services/incidentService';

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
  const [stats, setStats] = useState(incidentService.getStats());

  useEffect(() => {
    const unsubscribe = incidentService.subscribe(() => {
      setStats(incidentService.getStats());
    });
    return unsubscribe;
  }, []);

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
      name: 'AI Logistics Copilot',
      path: '/copilot',
      icon: Bot,
      badge: { count: 'AI' }
    },
    {
      name: 'Logistics & Vehicles',
      path: '/logistics',
      icon: Truck,
      matchPrefix: true
    },
    {
      name: 'Field Operations & Incidents',
      path: '/incidents',
      icon: AlertTriangle,
      badge: { count: stats.pendingVerification }
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
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-3 shrink-0 hidden md:flex select-none">
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
              <div className="flex items-center gap-2.5 min-w-0 pr-1">
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-slate-500'}`} />
                <span className="leading-tight text-left">{item.name}</span>
              </div>

              {/* Dynamic Badges */}
              {item.badge ? (
                <span
                  className={`text-[10px] font-bold flex items-center justify-center shrink-0 ml-2 transition-all ${
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

      {/* Field App Launcher & Regional Branding */}
      <div className="space-y-2 pt-2 border-t border-slate-100">
        <a
          href="https://ner-logix-field-operation-app.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-blue-50/80 hover:bg-blue-100/90 border border-blue-200/80 p-2 rounded-lg text-left flex items-center justify-between transition-colors group cursor-pointer block"
          title="Open Standalone Field App in a new window"
        >
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <div className="min-w-0">
              <div className="text-[10.5px] font-bold text-blue-900 leading-tight">Field App (PWA)</div>
              <div className="text-[9px] text-blue-600 leading-tight">Direct Standalone App</div>
            </div>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-blue-500 group-hover:text-blue-700 shrink-0" />
        </a>

        <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg text-center space-y-0.5">
          <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
            North Eastern Council
          </div>
          <div className="text-[9px] text-slate-500">
            8 States • Central Command Node
          </div>
        </div>
      </div>
    </aside>
  );
};
