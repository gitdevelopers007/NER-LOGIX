import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  MapPin, AlertTriangle, CloudRain, PhoneCall, 
  FileText, Shield, ArrowUpRight, Phone, ExternalLink,
  Radio, Compass, HeartHandshake
} from 'lucide-react';

interface TravelerNavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: {
    text: string;
    color: string;
  };
}

export const TravelerSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: TravelerNavItem[] = [
    {
      name: 'Safe Corridor Explorer',
      path: '/traveler',
      icon: MapPin,
      badge: { text: '8 States', color: 'bg-emerald-500 text-white' }
    },
    {
      name: 'Road Disruption Bulletins',
      path: '/traveler/bulletins',
      icon: AlertTriangle,
      badge: { text: 'Live', color: 'bg-red-500 text-white animate-pulse' }
    },
    {
      name: 'Mountain Weather & Radar',
      path: '/traveler/weather',
      icon: CloudRain,
      badge: { text: 'IMD', color: 'bg-blue-500 text-white' }
    },
    {
      name: 'Highway Lifeline Directory',
      path: '/traveler/lifelines',
      icon: PhoneCall,
      badge: { text: '24/7', color: 'bg-slate-600 text-white' }
    },
    {
      name: 'Offline Journey Pass & SMS',
      path: '/traveler/offline-pass',
      icon: FileText,
      badge: { text: '2G', color: 'bg-amber-600 text-white' }
    }
  ];

  const isItemActive = (path: string) => {
    if (path === '/traveler') {
      return location.pathname === '/traveler' || location.pathname === '/traveler/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between p-3 shrink-0 hidden md:flex select-none">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          Traveler &amp; Transporter Advisory
        </div>

        {navItems.map((item) => {
          const active = isItemActive(item.path);
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-colors text-left cursor-pointer ${
                active
                  ? 'bg-[#1a56db] text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 font-medium'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-1">
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-slate-500'}`} />
                <span className="leading-tight text-left">{item.name}</span>
              </div>

              {item.badge && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ml-1.5 ${item.badge.color}`}>
                  {item.badge.text}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Section: Emergency Hotline Bar & Portal Links */}
      <div className="space-y-2 pt-3 border-t border-slate-100">
        {/* National Highway SOS Card */}
        <div className="bg-red-50 border border-red-200/80 p-2.5 rounded-xl space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-800 flex items-center gap-1">
              <Phone className="w-3 h-3 text-red-600" />
              Emergency SOS Line
            </span>
            <span className="text-[10px] font-extrabold bg-red-600 text-white px-1.5 py-0.2 rounded font-mono">
              24×7
            </span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-900 pt-0.5">
            <a href="tel:112" className="hover:text-red-600 transition-colors">
              112 (Disaster)
            </a>
            <span className="text-slate-300">|</span>
            <a href="tel:1070" className="hover:text-red-600 transition-colors">
              1070 (SDMA)
            </a>
          </div>
        </div>

        {/* Link back to Command Center & Field App */}
        <div className="space-y-1 pt-1">
          <button
            onClick={() => navigate('/government-command-center')}
            className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 p-2 rounded-lg text-left flex items-center justify-between text-xs text-slate-700 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-blue-700" />
              <span className="font-semibold text-[11px]">Command Center</span>
            </div>
            <ArrowUpRight className="w-3 h-3 text-slate-400" />
          </button>

          <button
            onClick={() => navigate('/field')}
            className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 p-2 rounded-lg text-left flex items-center justify-between text-xs text-slate-700 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-emerald-700" />
              <span className="font-semibold text-[11px]">Field Operations PWA</span>
            </div>
            <ArrowUpRight className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      </div>
    </aside>
  );
};
