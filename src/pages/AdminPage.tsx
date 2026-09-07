import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, User, MapPin, AlertTriangle, Home, 
  Truck, BarChart3, Database, Settings, ChevronDown, 
  Search, Plus, CheckCircle2, Share2, 
  X, Users, Shield, Sliders, History, Lock
} from 'lucide-react';
import { NerLogixLogo } from '../components/NerLogixLogo';
import { adminService } from '../services/adminService';
import type { 
  GovernmentUser, 
  AlertRuleItem 
} from '../services/adminService';

export const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  // State
  const [users, setUsers] = useState<GovernmentUser[]>(adminService.getUsers());
  const [roles] = useState(adminService.getRoles());
  const [alertRules, setAlertRules] = useState<AlertRuleItem[]>(adminService.getAlertRules());
  const [auditLog] = useState(adminService.getAuditLog());
  const [systemStatus] = useState(adminService.getSystemStatus());

  // Search & Filter
  const [searchUser, setSearchUser] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [districtFilter, setDistrictFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals & Feedback
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [showFullAuditModal, setShowFullAuditModal] = useState(false);
  const [activeMenuSection, setActiveMenuSection] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New User Form State
  const [newUser, setNewUser] = useState({
    name: '',
    role: 'District Admin',
    district: 'Lower Subansiri',
    state: 'Arunachal Pradesh',
    status: 'Active' as const,
    email: '',
    accessLevel: 'DISTRICT_ADMIN' as const
  });

  const handleToggleRule = (id: string) => {
    const updated = adminService.toggleAlertRule(id);
    setAlertRules([...updated]);
    const rule = updated.find(r => r.id === id);
    setToastMessage(`Rule "${rule?.name}" is now ${rule?.enabled ? 'ENABLED' : 'DISABLED'}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;

    const created = adminService.addUser(newUser);
    setUsers([...adminService.getUsers()]);
    setShowAddUserModal(false);
    setNewUser({
      name: '',
      role: 'District Admin',
      district: 'Lower Subansiri',
      state: 'Arunachal Pradesh',
      status: 'Active',
      email: '',
      accessLevel: 'DISTRICT_ADMIN'
    });
    setToastMessage(`Government User "${created.name}" created with role "${created.role}".`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const filteredUsers = users.filter((u) => {
    if (roleFilter !== 'ALL' && u.role !== roleFilter) return false;
    if (districtFilter !== 'ALL' && u.district !== districtFilter) return false;
    if (statusFilter !== 'ALL' && u.status !== statusFilter) return false;
    if (searchUser) {
      const q = searchUser.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q) ||
        u.district.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getPriorityBadge = (p: string) => {
    switch (p) {
      case 'CRITICAL':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'HIGH':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'MEDIUM':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      default:
        return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans">
      {/* 1. TOP HEADER (DARK NAVY - ESTABLISHED GOVERNMENT DESIGN) */}
      <header className="bg-[#0b1a30] text-white px-4 lg:px-6 py-2.5 flex items-center justify-between shadow-md z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <NerLogixLogo variant="white" />
            <span className="font-bold text-lg tracking-wider text-white">NER-LOGIX</span>
          </div>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-xs text-slate-300 font-medium hidden md:inline">
            North Eastern Region Logistics &amp; Accessibility Intelligence Platform
          </span>
          <span className="text-slate-500 hidden lg:inline">|</span>
          <span className="text-xs font-semibold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800 hidden lg:inline">
            Administration &amp; System Settings
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-full text-[11px] text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Admin Gateway Operational</span>
          </div>

          <div className="h-4 w-px bg-slate-700 hidden sm:block" />

          <button 
            onClick={() => navigate('/alerts')}
            className="relative text-slate-300 hover:text-white p-1 transition-colors cursor-pointer"
            title="View Alerts"
          >
            <Bell className="w-4 h-4 text-amber-400" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping" />
          </button>

          <div className="h-4 w-px bg-slate-700" />

          <div className="flex items-center gap-2.5 pl-1 cursor-pointer group">
            <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-800 font-semibold text-xs border border-white/20">
              <User className="w-4 h-4 text-slate-700" />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-[11.5px] font-bold text-white leading-tight">Admin Officer</span>
              <span className="text-[9.5px] text-slate-400 leading-tight">Government Command Center</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
          </div>
        </div>
      </header>

      {/* 2. BODY CONTAINER: SIDEBAR + MAIN */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR (LIGHT THEME - ESTABLISHED GOVERNMENT DESIGN) */}
        <aside className="w-60 bg-white border-r border-slate-200 flex flex-col justify-between p-3 shrink-0 hidden md:flex">
          <div className="space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Navigation
            </div>

            <button
              onClick={() => navigate('/government-command-center')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <Home className="w-4 h-4 text-slate-500" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => navigate('/live-map')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-slate-500" />
              <span>Live Accessibility Map</span>
            </button>

            <button
              onClick={() => navigate('/route-intelligence')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-slate-500" />
              <span>Route Intelligence</span>
            </button>

            <button
              onClick={() => navigate('/logistics')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <Truck className="w-4 h-4 text-slate-500" />
              <span>Logistics &amp; Vehicles</span>
            </button>

            <button
              onClick={() => navigate('/incidents')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-slate-500" />
                <span>Incidents &amp; Field Reports</span>
              </div>
              <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                8
              </span>
            </button>

            <button
              onClick={() => navigate('/alerts')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-slate-500" />
                <span>Alerts &amp; Emergency Response</span>
              </div>
              <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                6
              </span>
            </button>

            <button
              onClick={() => navigate('/analytics')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-slate-500" />
              <span>Analytics &amp; Planning</span>
            </button>

            <button
              onClick={() => navigate('/data-integration')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors text-left cursor-pointer"
            >
              <Database className="w-4 h-4 text-slate-500" />
              <span>Data &amp; Integration</span>
            </button>

            {/* ADMINISTRATION -> ACTIVE BLUE */}
            <button
              onClick={() => navigate('/admin')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold bg-[#1a56db] text-white shadow-xs text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4 text-white" />
                <span>Administration</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </button>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-center space-y-1">
            <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
              Security Level 4
            </div>
            <div className="text-[9.5px] text-slate-500">
              Government Administrative Clearance
            </div>
          </div>
        </aside>

        {/* 3. MAIN WORKSPACE CONTAINER */}
        <main className="flex-1 overflow-y-auto flex flex-col p-4 md:p-6 space-y-6">
          
          {/* TOAST ALERT BANNER */}
          {toastMessage && (
            <div className="bg-emerald-600 text-white text-xs px-4 py-2.5 rounded-lg shadow-md flex items-center justify-between animate-fadeIn transition-all">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-200" />
                <span className="font-semibold">{toastMessage}</span>
              </div>
              <button onClick={() => setToastMessage(null)} className="text-emerald-200 hover:text-white ml-3 cursor-pointer">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* PAGE HEADER */}
          <div className="pb-2 border-b border-slate-200">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-600" />
              Administration &amp; System Settings
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage users, permissions, notifications, system configuration and audit activity.
            </p>
          </div>

          {/* 4. ADMINISTRATION MENU (6 QUICK CARDS) */}
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { id: 'USERS', title: 'USER MANAGEMENT', desc: 'Manage government officers & accounts', icon: Users },
              { id: 'ROLES', title: 'ROLES & PERMISSIONS', desc: 'Access control and operational roles', icon: Shield },
              { id: 'NOTIF', title: 'NOTIFICATIONS', desc: 'Alert channels and escalation rules', icon: Bell },
              { id: 'CONFIG', title: 'SYSTEM CONFIGURATION', desc: 'Platform settings and thresholds', icon: Sliders },
              { id: 'AUDIT', title: 'AUDIT LOG', desc: 'User actions and system activity', icon: History },
              { id: 'SEC', title: 'SECURITY & ACCESS', desc: 'Sessions, security and authentication', icon: Lock },
            ].map((m) => {
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setActiveMenuSection(m.title);
                    setToastMessage(`Switched focus to ${m.title}`);
                    setTimeout(() => setToastMessage(null), 2500);
                  }}
                  className={`rounded-lg border p-3 shadow-xs hover:border-blue-400 hover:shadow-sm transition-all text-left group cursor-pointer flex flex-col justify-between ${activeMenuSection === m.title ? 'bg-blue-50/70 border-blue-500 ring-1 ring-blue-500' : 'bg-white border-slate-200'}`}
                >
                  <div>
                    <div className="w-7 h-7 rounded-md bg-slate-100 text-blue-600 flex items-center justify-center mb-2 group-hover:bg-blue-50 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {m.title}
                    </div>
                    <p className="text-[10.5px] text-slate-500 mt-1 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] font-semibold text-blue-600 flex items-center justify-between">
                    <span>Manage</span>
                    <span>→</span>
                  </div>
                </button>
              );
            })}
          </section>

          {/* 5. USER MANAGEMENT */}
          <section className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-3.5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  USER MANAGEMENT
                </h3>
                <p className="text-[11px] text-slate-500">
                  Government Users &amp; Authorized Personnel
                </p>
              </div>

              <button
                onClick={() => setShowAddUserModal(true)}
                className="bg-[#1a56db] hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>[ + Add User ]</span>
              </button>
            </div>

            {/* Filter Bar */}
            <div className="p-3 bg-slate-50/70 border-b border-slate-200 flex flex-wrap items-center gap-2.5">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchUser}
                  onChange={(e) => setSearchUser(e.target.value)}
                  className="bg-white border border-slate-200 rounded-md pl-8 pr-2.5 py-1 text-xs text-slate-700 placeholder-slate-400 focus:outline-hidden focus:border-blue-400 w-44"
                />
              </div>

              <div className="relative">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 text-xs font-medium text-slate-700 py-1 pl-2.5 pr-6 rounded-md shadow-2xs hover:border-slate-300 cursor-pointer"
                >
                  <option value="ALL">Role ▼</option>
                  <option value="District Admin">District Admin</option>
                  <option value="Operations">Operations</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Field Manager">Field Manager</option>
                  <option value="Regional Admin">Regional Admin</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-2 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={districtFilter}
                  onChange={(e) => setDistrictFilter(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 text-xs font-medium text-slate-700 py-1 pl-2.5 pr-6 rounded-md shadow-2xs hover:border-slate-300 cursor-pointer"
                >
                  <option value="ALL">District ▼</option>
                  <option value="Lower Subansiri">Lower Subansiri</option>
                  <option value="East Khasi Hills">East Khasi Hills</option>
                  <option value="Kamrup Metro">Kamrup Metro</option>
                  <option value="State Headquarters">State Headquarters</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-2 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 text-xs font-medium text-slate-700 py-1 pl-2.5 pr-6 rounded-md shadow-2xs hover:border-slate-300 cursor-pointer"
                >
                  <option value="ALL">Status ▼</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-2 pointer-events-none" />
              </div>

              <span className="text-[11px] text-slate-500 ml-auto font-mono">
                {filteredUsers.length} accounts found
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[10.5px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    <th className="py-2.5 px-4">NAME</th>
                    <th className="py-2.5 px-4">ROLE</th>
                    <th className="py-2.5 px-4">STATUS</th>
                    <th className="py-2.5 px-4">LAST ACTIVE</th>
                    <th className="py-2.5 px-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-slate-900">
                        {u.name}
                        <div className="text-[10px] text-slate-400 font-mono">{u.email}</div>
                      </td>
                      <td className="py-2.5 px-4 text-slate-700 font-medium">
                        {u.role}
                      </td>
                      <td className="py-2.5 px-4">
                        <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                          ● Active
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-slate-500 font-mono text-[11px]">
                        {u.lastActive}
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <button
                          onClick={() => {
                            setToastMessage(`Editing permissions for ${u.name}`);
                            setTimeout(() => setToastMessage(null), 2500);
                          }}
                          className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                        >
                          Edit →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 6. ROLE & ACCESS CONTROL */}
          <section className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-3.5 border-b border-slate-200">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                ROLE &amp; ACCESS CONTROL
              </h3>
              <p className="text-[11px] text-slate-500">
                Departmental role permissions and security clearance thresholds
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[10.5px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    <th className="py-2.5 px-4">ROLE</th>
                    <th className="py-2.5 px-4">ACCESS</th>
                    <th className="py-2.5 px-4 text-right">ASSIGNED</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {roles.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-4 font-bold text-slate-900">
                        {r.role}
                      </td>
                      <td className="py-2.5 px-4 text-slate-700">
                        {r.access}
                      </td>
                      <td className="py-2.5 px-4 text-right text-slate-500 font-mono text-[11px]">
                        {r.assignedUsersCount} users
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 7. ALERT CONFIGURATION */}
          <section className="bg-white rounded-lg border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  ALERT CONFIGURATION
                </h3>
                <p className="text-[11px] text-slate-500">
                  Automated risk engine triggering criteria, channels and alert escalation
                </p>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Alert Rules
              </span>
            </div>

            <div className="space-y-2.5">
              {alertRules.map((rule) => (
                <div
                  key={rule.id}
                  className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleToggleRule(rule.id)}
                      className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                        rule.enabled ? 'bg-emerald-600' : 'bg-slate-300'
                      }`}
                      title="Click to toggle"
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                          rule.enabled ? 'left-4.5' : 'left-1'
                        }`}
                      />
                    </button>
                    <div>
                      <span className="font-bold text-xs text-slate-900">{rule.name}</span>
                      <div className="text-[10.5px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span>Channels: {rule.channels.join(', ')}</span>
                        <span>•</span>
                        <span>Cooldown: {rule.cooldownMins}m</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <span className="text-slate-600 text-xs font-medium">
                      {rule.enabled ? (
                        <span className="text-emerald-700 font-bold">● Enabled</span>
                      ) : (
                        <span className="text-slate-400 font-medium">○ Disabled</span>
                      )}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getPriorityBadge(rule.priority)}`}>
                      Priority: {rule.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowRuleModal(true)}
                className="bg-[#1a56db] hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition-colors cursor-pointer"
              >
                [ Configure Alert Rules ]
              </button>
            </div>
          </section>

          {/* 8. AUDIT ACTIVITY */}
          <section className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-3.5 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  AUDIT ACTIVITY
                </h3>
                <p className="text-[11px] text-slate-500">
                  Immutable event log of operational and administrative actions
                </p>
              </div>
              <button
                onClick={() => setShowFullAuditModal(true)}
                className="text-xs text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
              >
                [ View Full Audit Log ]
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-[10.5px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                    <th className="py-2.5 px-4">TIME</th>
                    <th className="py-2.5 px-4">USER</th>
                    <th className="py-2.5 px-4">ACTION</th>
                    <th className="py-2.5 px-4 text-right">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {auditLog.slice(0, 4).map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-4 font-mono text-slate-500 text-xs font-medium">
                        {a.time}
                      </td>
                      <td className="py-2.5 px-4 font-bold text-slate-900">
                        {a.user}
                      </td>
                      <td className="py-2.5 px-4 text-slate-700">
                        {a.action}
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                          ✓ Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 9. SYSTEM STATUS (4 CARDS) */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            {systemStatus.map((s) => (
              <div
                key={s.component}
                className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {s.component}
                </span>
                <div className="my-2">
                  <div className="text-sm font-black text-emerald-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    ● OPERATIONAL
                  </div>
                  <div className="text-[10.5px] text-slate-400 font-mono mt-0.5">
                    Latency: {s.latency}
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  {s.notes}
                </div>
              </div>
            ))}
          </section>

          {/* 10. FOOTER */}
          <footer className="mt-auto pt-4 pb-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
            <div>
              <span className="font-bold text-slate-700">NER-LOGIX</span>
              <span className="text-slate-400"> — Government Command Center</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-mono text-slate-600">
                Last Configuration Update: <strong>20:40 IST</strong>
              </span>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>System Status: <strong>Operational</strong></span>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* MODAL: ADD USER */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="bg-[#0b1a30] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold">Add Government Officer Account</h3>
              </div>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="text-slate-300 hover:text-white p-1 rounded cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Official Name &amp; Designation</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tsering Dorjee, ADC"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Official NIC / Gov Email</label>
                <input
                  type="email"
                  required
                  placeholder="officer.name@nic.in"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800"
                  >
                    <option value="District Admin">District Admin</option>
                    <option value="Operations">Operations</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Field Manager">Field Manager</option>
                    <option value="Regional Admin">Regional Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Assigned State</label>
                  <select
                    value={newUser.state}
                    onChange={(e) => setNewUser({ ...newUser, state: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs text-slate-800"
                  >
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Sikkim">Sikkim</option>
                  </select>
                </div>
              </div>

              <div className="p-2.5 bg-blue-50 text-blue-900 rounded-lg text-[11px] flex items-center gap-2 border border-blue-200">
                <Shield className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Account will require 2FA login via government email or SMS OTP.</span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-[#1a56db] hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  Create Officer Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: FULL AUDIT LOG */}
      {showFullAuditModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 max-h-[85vh] flex flex-col">
            <div className="bg-[#0b1a30] text-white p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold">Comprehensive Security &amp; Audit Log</h3>
              </div>
              <button
                onClick={() => setShowFullAuditModal(false)}
                className="text-slate-300 hover:text-white p-1 rounded cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-2 flex-1 text-xs">
              {auditLog.map((item) => (
                <div key={item.id} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{item.user} ({item.role})</span>
                    <span className="font-mono text-slate-500 text-[11px]">{item.time} IST</span>
                  </div>
                  <div className="text-slate-700 font-medium">{item.action}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{item.details}</div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
              <button
                onClick={() => setShowFullAuditModal(false)}
                className="px-4 py-1.5 rounded-lg bg-[#1a56db] text-white text-xs font-semibold hover:bg-blue-700 cursor-pointer"
              >
                Close Log
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ALERT RULES CONFIGURATION */}
      {showRuleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="bg-[#0b1a30] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold">Configure Alert Rules Engine</h3>
              </div>
              <button
                onClick={() => setShowRuleModal(false)}
                className="text-slate-300 hover:text-white p-1 rounded cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 space-y-3 text-xs text-slate-700">
              <p className="text-slate-600 leading-relaxed">
                Configure regional hazard alert trigger thresholds, notification channels, and cooldown intervals across all 8 North Eastern states.
              </p>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Emergency Siren Broadcast:</span>
                  <span className="text-emerald-700 font-bold">Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>SMS Gateway Priority:</span>
                  <span className="text-blue-700 font-bold">High (Tier-1 Telco)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>IMD Doppler Rainfall Threshold:</span>
                  <span className="font-mono font-bold text-slate-800">&gt; 65 mm/hr</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Landslide Slope Angle Critical:</span>
                  <span className="font-mono font-bold text-slate-800">&gt; 35° incline</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => {
                  setShowRuleModal(false);
                  setToastMessage('Alert engine rules verified and committed to persistent configuration.');
                  setTimeout(() => setToastMessage(null), 3500);
                }}
                className="px-4 py-1.5 rounded-lg bg-[#1a56db] text-white text-xs font-semibold hover:bg-blue-700 cursor-pointer"
              >
                Save &amp; Deploy Rules
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
