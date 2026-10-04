import React, { useState } from 'react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { useSyncQueue } from '../hooks/useSyncQueue';
import { api } from '../services/api';
import {
  X,
  Wifi,
  WifiOff,
  RefreshCw,
  AlertTriangle,
  UserCheck,
  Zap,
  Info,
} from 'lucide-react';

interface DemoControlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAlertTriggered?: () => void;
}

export const DemoControlModal: React.FC<DemoControlModalProps> = ({
  isOpen,
  onClose,
  onAlertTriggered,
}) => {
  const { isOnline, isSimulatedOffline, toggleSimulatedOffline } = useNetworkStatus();
  const { triggerSync, isSyncing, pendingCount } = useSyncQueue();
  const [activeRole, setActiveRole] = useState(
    localStorage.getItem('demo_user_role') || 'FIELD_OFFICER'
  );
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRoleChange = (role: string, id: string) => {
    setActiveRole(role);
    localStorage.setItem('demo_user_role', role);
    localStorage.setItem('demo_user_id', id);
    setStatusMsg(`Switched role to: ${role}`);
    setTimeout(() => window.location.reload(), 600);
  };

  const handleSimulateAlert = async (type: string, severity: string, road: string, district: string, desc: string) => {
    setLoadingAction(type);
    setStatusMsg(null);
    try {
      await api.simulateAlert({
        event_type: type,
        severity: severity,
        road_id: road,
        district_id: district,
        location: `${district} (${road})`,
        description: `[DEMO SIMULATION] ${desc}`,
      });
      setStatusMsg(`Demo alert created: ${type} (${severity})`);
      if (onAlertTriggered) onAlertTriggered();
    } catch (e: any) {
      setStatusMsg(`Error triggering alert: ${e.message}`);
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-end sm:items-center justify-center p-2 sm:p-4">
      <div className="bg-slate-900 text-white rounded-2xl max-w-md w-full p-5 border border-slate-700 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-tight text-white">
                Field Operations &amp; Network Console
              </h3>
              <p className="text-[11px] text-slate-400">
                Network telemetry, local sync &amp; operational role profiles
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Offline / Online Simulation */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            1. Network Condition Simulation
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => toggleSimulatedOffline(true)}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                isSimulatedOffline
                  ? 'bg-amber-600 border-amber-500 text-white shadow-lg'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <WifiOff className="w-4 h-4" />
              <span>Simulate Offline</span>
            </button>

            <button
              onClick={() => toggleSimulatedOffline(false)}
              className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                !isSimulatedOffline
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Wifi className="w-4 h-4" />
              <span>Network Online</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-400 font-mono">
            Status: {isOnline ? 'Online (Real-time sync active)' : 'Offline (Local IndexedDB queue buffer)'}
          </p>
        </div>

        {/* 2. Manual Sync Trigger */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            2. Offline Queue Sync
          </label>
          <button
            onClick={triggerSync}
            disabled={isSyncing || isSimulatedOffline}
            className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>
              {isSyncing
                ? 'Synchronizing Queue...'
                : `Trigger Sync Now (${pendingCount} Pending)`}
            </span>
          </button>
        </div>

        {/* 3. Demo Event Generators */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            3. Corridor Telemetry Triggers
          </label>
          <div className="space-y-1.5">
            <button
              onClick={() =>
                handleSimulateAlert(
                  'LANDSLIDE',
                  'CRITICAL',
                  'NH-27',
                  'Kamrup Metropolitan',
                  'Major mountain slope failure at Sonapur bend. Both lanes obstructed.'
                )
              }
              disabled={loadingAction !== null}
              className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-left text-xs flex items-center justify-between text-slate-200 cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                <span>Sonapur Landslide (NH-27)</span>
              </div>
              <span className="text-[10px] bg-red-900/60 text-red-300 px-1.5 py-0.5 rounded font-mono">
                CRITICAL
              </span>
            </button>

            <button
              onClick={() =>
                handleSimulateAlert(
                  'FLOOD',
                  'HIGH',
                  'NH-715',
                  'Golaghat',
                  'Brahmaputra overflow submerged Kaziranga corridor culvert.'
                )
              }
              disabled={loadingAction !== null}
              className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-left text-xs flex items-center justify-between text-slate-200 cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
                <span>Kaziranga Flood Inundation (NH-715)</span>
              </div>
              <span className="text-[10px] bg-orange-900/60 text-orange-300 px-1.5 py-0.5 rounded font-mono">
                HIGH
              </span>
            </button>

            <button
              onClick={() =>
                handleSimulateAlert(
                  'ROAD_BLOCKED',
                  'HIGH',
                  'NH-6',
                  'Ri-Bhoi',
                  'Container truck breakdown on Nongpoh incline blocking traffic.'
                )
              }
              disabled={loadingAction !== null}
              className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-left text-xs flex items-center justify-between text-slate-200 cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Shillong Corridor Blockage (NH-6)</span>
              </div>
              <span className="text-[10px] bg-amber-900/60 text-amber-300 px-1.5 py-0.5 rounded font-mono">
                HIGH
              </span>
            </button>
          </div>
        </div>

        {/* 4. Switch Active Role (STRICTLY ROLES ONLY, NO NAMES) */}
        <div className="space-y-2 border-t border-slate-800 pt-3">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            4. Active User Role
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleRoleChange('FIELD_OFFICER', 'usr_officer_01')}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                activeRole === 'FIELD_OFFICER'
                  ? 'bg-blue-600/30 border-blue-500 text-white shadow-md ring-1 ring-blue-500'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <div className="font-bold text-xs">Field Officer</div>
              <div className="text-[10px] text-blue-300 mt-0.5">Ground Reporting</div>
            </button>

            <button
              onClick={() => handleRoleChange('GOVERNMENT_OPERATOR', 'usr_operator_01')}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                activeRole === 'GOVERNMENT_OPERATOR'
                  ? 'bg-blue-600/30 border-blue-500 text-white shadow-md ring-1 ring-blue-500'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <div className="font-bold text-xs">Government Operator</div>
              <div className="text-[10px] text-blue-300 mt-0.5">Control Room</div>
            </button>

            <button
              onClick={() => handleRoleChange('LOGISTICS_OPERATOR', 'usr_logistics_01')}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                activeRole === 'LOGISTICS_OPERATOR'
                  ? 'bg-blue-600/30 border-blue-500 text-white shadow-md ring-1 ring-blue-500'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <div className="font-bold text-xs">Logistics Convoy</div>
              <div className="text-[10px] text-blue-300 mt-0.5">Freight &amp; Supply</div>
            </button>

            <button
              onClick={() => handleRoleChange('GOVERNMENT_ADMIN', 'usr_admin_01')}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                activeRole === 'GOVERNMENT_ADMIN'
                  ? 'bg-blue-600/30 border-blue-500 text-white shadow-md ring-1 ring-blue-500'
                  : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <div className="font-bold text-xs">Government Admin</div>
              <div className="text-[10px] text-blue-300 mt-0.5">Executive Ops</div>
            </button>
          </div>
        </div>

        {statusMsg && (
          <div className="bg-slate-800 text-amber-300 p-2 rounded text-xs text-center font-mono border border-slate-700 animate-fade-in">
            {statusMsg}
          </div>
        )}
      </div>
    </div>
  );
};
