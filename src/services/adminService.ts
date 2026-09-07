export interface GovernmentUser {
  id: string;
  name: string;
  role: string;
  district: string;
  state: string;
  status: 'Active' | 'Inactive';
  lastActive: string;
  email: string;
  accessLevel: 'SUPER_ADMIN' | 'REGIONAL_ADMIN' | 'DISTRICT_ADMIN' | 'OPERATIONS' | 'LOGISTICS' | 'FIELD';
}

export interface RoleAccessItem {
  id: string;
  role: string;
  access: string;
  assignedUsersCount: number;
}

export interface AlertRuleItem {
  id: string;
  name: string;
  enabled: boolean;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  channels: string[];
  cooldownMins: number;
}

export interface AuditLogItem {
  id: string;
  time: string;
  user: string;
  role: string;
  action: string;
  status: 'Completed' | 'Pending' | 'Flagged';
  details: string;
}

export interface SystemComponentStatus {
  component: string;
  status: 'OPERATIONAL' | 'DEGRADED' | 'MAINTENANCE';
  latency: string;
  notes: string;
}

const INITIAL_USERS: GovernmentUser[] = [
  { id: 'USR-001', name: 'District Officer (Lower Subansiri)', role: 'District Admin', district: 'Lower Subansiri', state: 'Arunachal Pradesh', status: 'Active', lastActive: '2 min ago', email: 'officer.subansiri@arunachal.gov.in', accessLevel: 'DISTRICT_ADMIN' },
  { id: 'USR-002', name: 'Control Room Officer (Shillong)', role: 'Operations', district: 'East Khasi Hills', state: 'Meghalaya', status: 'Active', lastActive: '5 min ago', email: 'control.room@nec.gov.in', accessLevel: 'OPERATIONS' },
  { id: 'USR-003', name: 'Logistics Officer (Guwahati)', role: 'Logistics', district: 'Kamrup Metro', state: 'Assam', status: 'Active', lastActive: '12 min ago', email: 'logistics.hub@assam.gov.in', accessLevel: 'LOGISTICS' },
  { id: 'USR-004', name: 'Field Coordinator (Potin)', role: 'Field Manager', district: 'Lower Subansiri', state: 'Arunachal Pradesh', status: 'Active', lastActive: '18 min ago', email: 'field.unit4@nec-logix.in', accessLevel: 'FIELD' },
  { id: 'USR-005', name: 'State Relief Commissioner', role: 'Regional Admin', district: 'State Headquarters', state: 'Assam', status: 'Active', lastActive: '32 min ago', email: 'relief.comm@assam.gov.in', accessLevel: 'REGIONAL_ADMIN' },
  { id: 'USR-006', name: 'BRO Task Force Liaison', role: 'Infrastructure Liaison', district: 'Tezpur Base', state: 'Assam', status: 'Active', lastActive: '1 hour ago', email: 'liaison.vartak@bro.nic.in', accessLevel: 'OPERATIONS' },
];

const ROLE_ACCESS_MATRIX: RoleAccessItem[] = [
  { id: 'ROL-1', role: 'Super Administrator', access: 'Full platform administration', assignedUsersCount: 3 },
  { id: 'ROL-2', role: 'Regional Administrator', access: 'Regional monitoring & management', assignedUsersCount: 8 },
  { id: 'ROL-3', role: 'District Officer', access: 'District incidents & connectivity', assignedUsersCount: 32 },
  { id: 'ROL-4', role: 'Logistics Officer', access: 'Vehicles, routes & deliveries', assignedUsersCount: 14 },
  { id: 'ROL-5', role: 'Field Coordinator', access: 'Field reports & verification', assignedUsersCount: 45 },
  { id: 'ROL-6', role: 'Viewer', access: 'Read-only dashboards', assignedUsersCount: 120 },
];

const INITIAL_ALERT_RULES: AlertRuleItem[] = [
  { id: 'RUL-01', name: 'Blocked Road', enabled: true, priority: 'CRITICAL', channels: ['Dashboard', 'SMS', 'Siren Alert'], cooldownMins: 5 },
  { id: 'RUL-02', name: 'Inaccessible Region', enabled: true, priority: 'HIGH', channels: ['Dashboard', 'SMS'], cooldownMins: 15 },
  { id: 'RUL-03', name: 'Vehicle Route Deviation', enabled: true, priority: 'HIGH', channels: ['Fleet Radio', 'Dispatch Push'], cooldownMins: 10 },
  { id: 'RUL-04', name: 'Delivery Delay', enabled: true, priority: 'MEDIUM', channels: ['Dashboard', 'Logistics Email'], cooldownMins: 30 },
  { id: 'RUL-05', name: 'Heavy Rainfall Risk', enabled: true, priority: 'HIGH', channels: ['IMD Feed', 'SMS'], cooldownMins: 60 },
  { id: 'RUL-06', name: 'Landslide Risk', enabled: true, priority: 'CRITICAL', channels: ['Disaster Siren', 'Emergency Broadcast'], cooldownMins: 5 },
];

const AUDIT_LOG: AuditLogItem[] = [
  { id: 'AUD-901', time: '20:39', user: 'District Officer', role: 'District Admin', action: 'Incident verified', status: 'Completed', details: 'Verified Landslide on NH-13 Lower Subansiri (INC-2026-00482)' },
  { id: 'AUD-902', time: '20:36', user: 'Logistics Officer', role: 'Logistics', action: 'Route viewed', status: 'Completed', details: 'Assessed bypass route via Tezpur northern bypass' },
  { id: 'AUD-903', time: '20:31', user: 'Control Room', role: 'Operations', action: 'Alert acknowledged', status: 'Completed', details: 'Acknowledged ALT-2026-0089 critical warning' },
  { id: 'AUD-904', time: '20:25', user: 'Administrator', role: 'Super Admin', action: 'User permission updated', status: 'Completed', details: 'Promoted Field Unit 4 to Senior Verifier' },
  { id: 'AUD-905', time: '20:12', user: 'Field Coordinator', role: 'Field Manager', action: 'Photo evidence submitted', status: 'Completed', details: 'Uploaded 2 geocoded hazard images from mobile client' },
  { id: 'AUD-906', time: '19:58', user: 'System Engine', role: 'Automated Service', action: 'Telemetry sync completed', status: 'Completed', details: 'Bhuvan Geoportal & IMD radar data synced' },
];

const SYSTEM_STATUS: SystemComponentStatus[] = [
  { component: 'AUTHENTICATION', status: 'OPERATIONAL', latency: '24 ms', notes: 'JWT Session Manager Active' },
  { component: 'DATABASE', status: 'OPERATIONAL', latency: '18 ms', notes: 'PostgreSQL Pool: 48/100 active' },
  { component: 'GIS SERVICES', status: 'OPERATIONAL', latency: '121 ms', notes: 'ISRO Bhuvan & OSM tile server connected' },
  { component: 'ALERT ENGINE', status: 'OPERATIONAL', latency: '109 ms', notes: 'Queue depth: 0 • Real-time broker online' },
];

export class AdminService {
  getUsers(): GovernmentUser[] {
    return INITIAL_USERS;
  }

  getRoles(): RoleAccessItem[] {
    return ROLE_ACCESS_MATRIX;
  }

  getAlertRules(): AlertRuleItem[] {
    return INITIAL_ALERT_RULES;
  }

  toggleAlertRule(id: string): AlertRuleItem[] {
    const found = INITIAL_ALERT_RULES.find((r) => r.id === id);
    if (found) {
      found.enabled = !found.enabled;
    }
    return [...INITIAL_ALERT_RULES];
  }

  getAuditLog(): AuditLogItem[] {
    return AUDIT_LOG;
  }

  getSystemStatus(): SystemComponentStatus[] {
    return SYSTEM_STATUS;
  }

  addUser(user: Omit<GovernmentUser, 'id' | 'lastActive'>): GovernmentUser {
    const newUser: GovernmentUser = {
      ...user,
      id: `USR-${String(INITIAL_USERS.length + 1).padStart(3, '0')}`,
      lastActive: 'Just now'
    };
    INITIAL_USERS.unshift(newUser);
    return newUser;
  }
}

export const adminService = new AdminService();
