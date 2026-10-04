import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../features/language/LanguageContext';
import { useSyncQueue } from '../hooks/useSyncQueue';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { formatRelativeTime, formatCoordinates } from '../utils/formatters';
import {
  RefreshCw,
  Wifi,
  WifiOff,
  Clock,
  CheckCircle2,
  AlertOctagon,
  ArrowLeft,
  ShieldCheck,
  Layers,
  Info,
} from 'lucide-react';

export const SyncQueue: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { items, pendingCount, isSyncing, lastSyncedAt, triggerSync } = useSyncQueue();
  const { isOnline, isSimulatedOffline, toggleSimulatedOffline } = useNetworkStatus();

  return (
    <div className="space-y-4 pb-24">
      {/* Top Title Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-1 text-xs font-bold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('btn_back')}</span>
        </button>
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
            isOnline ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
          }`}
        >
          {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
          <span>{isOnline ? 'Network Ready' : 'Offline Mode'}</span>
        </span>
      </div>

      {/* Sync Status Header Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">{t('sync_title')}</h2>
            <p className="text-xs text-slate-500">
              Reliable low-network queue with idempotency protection
            </p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-gov-900 font-mono">
              {pendingCount}
            </span>
            <span className="text-[10px] text-slate-400 block uppercase font-bold">
              Pending
            </span>
          </div>
        </div>

        {/* Sync Now Button */}
        <button
          onClick={triggerSync}
          disabled={isSyncing || !isOnline || pendingCount === 0}
          className="w-full py-3.5 px-4 rounded-xl bg-gov-900 hover:bg-gov-800 active:bg-slate-900 disabled:opacity-50 text-white font-extrabold text-xs flex items-center justify-center space-x-2 shadow-md border border-gov-700 touch-target transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>
            {isSyncing
              ? 'Synchronizing Queue...'
              : !isOnline
              ? 'Cannot Sync: Device Offline'
              : pendingCount === 0
              ? 'All Reports Synced'
              : `${t('sync_btn_now')} (${pendingCount})`}
          </span>
        </button>

        {/* Network & Info banner */}
        <div className="text-[11px] text-slate-500 flex items-start space-x-2 pt-1 border-t border-slate-100">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <span>{t('sync_auto_note')}</span>
        </div>
      </div>

      {/* Queue Items List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Queued Reports ({items.length})
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            Last: {formatRelativeTime(lastSyncedAt)}
          </span>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 shadow-sm space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <h4 className="text-sm font-bold text-slate-800">{t('sync_empty')}</h4>
            <p className="text-xs text-slate-500">
              Any reports created during signal loss will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => {
              const isItemSyncing = item.status === 'SYNCING';
              const isItemFailed = item.status === 'FAILED';
              const isItemSynced = item.status === 'SYNCED';

              return (
                <div
                  key={item.queue_id}
                  className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900">
                        {t(`type_${item.payload.type}`, item.payload.type.replace('_', ' '))}
                      </span>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        {formatCoordinates(item.payload.latitude, item.payload.longitude)}
                      </div>
                    </div>

                    <div>
                      {isItemSynced ? (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          SYNCED
                        </span>
                      ) : isItemSyncing ? (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-300 flex items-center gap-1 animate-pulse">
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          SYNCING
                        </span>
                      ) : isItemFailed ? (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                          <AlertOctagon className="w-3 h-3" />
                          RETRYING
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          QUEUED
                        </span>
                      )}
                    </div>
                  </div>

                  {item.payload.description && (
                    <p className="text-xs text-slate-600 line-clamp-1 bg-slate-50 p-1.5 rounded border border-slate-100">
                      {item.payload.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono border-t border-slate-100 pt-1.5">
                    <span>UUID: {item.client_generated_id.slice(0, 18)}...</span>
                    <span>Queued: {formatRelativeTime(item.created_at)}</span>
                  </div>

                  {item.error_message && (
                    <div className="text-[10px] text-rose-700 bg-rose-50 p-1.5 rounded font-mono">
                      Error: {item.error_message}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
