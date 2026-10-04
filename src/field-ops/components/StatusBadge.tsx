import React from 'react';
import { IncidentStatus, IncidentSeverity } from '../types/incident';
import { AlertSeverity } from '../types/alert';
import { useLanguage } from '../features/language/LanguageContext';
import {
  CheckCircle2,
  Clock,
  RefreshCw,
  AlertTriangle,
  XCircle,
  ShieldCheck,
  Radio,
} from 'lucide-react';

export const StatusBadge: React.FC<{ status: IncidentStatus }> = ({ status }) => {
  const { t } = useLanguage();

  switch (status) {
    case 'QUEUED':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
          <Clock className="w-3 h-3 text-amber-700" />
          {t('status_QUEUED')}
        </span>
      );
    case 'SYNCING':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-900 border border-blue-300 animate-pulse">
          <RefreshCw className="w-3 h-3 text-blue-700 animate-spin" />
          {t('status_SYNCING')}
        </span>
      );
    case 'SUBMITTED':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-900 border border-sky-300">
          <Radio className="w-3 h-3 text-sky-700" />
          {t('status_SUBMITTED')}
        </span>
      );
    case 'VERIFIED':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-300">
          <ShieldCheck className="w-3 h-3 text-emerald-700" />
          {t('status_VERIFIED')}
        </span>
      );
    case 'REJECTED':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-900 border border-rose-300">
          <XCircle className="w-3 h-3 text-rose-700" />
          {t('status_REJECTED')}
        </span>
      );
    case 'RESOLVED':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-300">
          <CheckCircle2 className="w-3 h-3 text-slate-600" />
          {t('status_RESOLVED')}
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">
          {status}
        </span>
      );
  }
};

export const SeverityBadge: React.FC<{ severity: IncidentSeverity | AlertSeverity }> = ({
  severity,
}) => {
  const { t } = useLanguage();

  switch (severity) {
    case 'CRITICAL':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-600 text-white tracking-wide uppercase">
          {t('sev_critical')}
        </span>
      );
    case 'HIGH':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-orange-600 text-white tracking-wide uppercase">
          {t('sev_high')}
        </span>
      );
    case 'MEDIUM':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-amber-500 text-slate-900 tracking-wide uppercase">
          {t('sev_medium')}
        </span>
      );
    case 'LOW':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-emerald-600 text-white tracking-wide uppercase">
          {t('sev_low')}
        </span>
      );
    default:
      return <span className="text-xs">{severity}</span>;
  }
};
