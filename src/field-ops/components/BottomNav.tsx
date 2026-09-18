import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../features/language/LanguageContext';
import { useSyncQueue } from '../hooks/useSyncQueue';
import { useAlerts } from '../hooks/useAlerts';
import { Home, PlusCircle, FileText, Bell, RefreshCw } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { t } = useLanguage();
  const { pendingCount } = useSyncQueue();
  const { alerts } = useAlerts();

  const unreadAlertsCount = alerts.filter((a) => a.status === 'UNREAD').length;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around py-1.5 px-2">
        <NavLink
          to="/field"
          end
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[11px] font-medium transition-colors ${
              isActive ? 'text-blue-700 font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`
          }
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>{t('nav_home')}</span>
        </NavLink>

        <NavLink
          to="/field/report"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[11px] font-medium transition-colors ${
              isActive ? 'text-blue-700 font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`
          }
        >
          <div className="bg-blue-600 text-white rounded-full p-1 -mt-3 shadow-md border-2 border-white">
            <PlusCircle className="w-5 h-5" />
          </div>
          <span className="mt-0.5">{t('nav_report')}</span>
        </NavLink>

        <NavLink
          to="/field/reports"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[11px] font-medium transition-colors ${
              isActive ? 'text-blue-700 font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`
          }
        >
          <FileText className="w-5 h-5 mb-0.5" />
          <span>{t('nav_my_reports')}</span>
        </NavLink>

        <NavLink
          to="/field/alerts"
          className={({ isActive }) =>
            `relative flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[11px] font-medium transition-colors ${
              isActive ? 'text-blue-700 font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`
          }
        >
          <Bell className="w-5 h-5 mb-0.5" />
          <span>{t('nav_alerts')}</span>
          {unreadAlertsCount > 0 && (
            <span className="absolute top-0.5 right-2 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
              {unreadAlertsCount > 9 ? '9+' : unreadAlertsCount}
            </span>
          )}
        </NavLink>

        <NavLink
          to="/field/sync"
          className={({ isActive }) =>
            `relative flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[11px] font-medium transition-colors ${
              isActive ? 'text-blue-700 font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`
          }
        >
          <RefreshCw className="w-5 h-5 mb-0.5" />
          <span>{t('nav_sync')}</span>
          {pendingCount > 0 && (
            <span className="absolute top-0.5 right-2 px-1.5 py-0.2 bg-amber-500 text-slate-900 text-[10px] font-extrabold rounded-full ring-2 ring-white">
              {pendingCount}
            </span>
          )}
        </NavLink>
      </div>
    </nav>
  );
};
