import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'database.json');

function readDb() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}

function writeDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

export const DEMO_USERS = {
  'usr_officer_01': {
    id: 'usr_officer_01',
    name: 'R. Borah (Field Officer)',
    role: 'FIELD_OFFICER',
    organization_id: 'org_ner_disaster_mgmt',
    assigned_district: 'Kamrup Metropolitan',
    assigned_state: 'Assam'
  },
  'usr_operator_01': {
    id: 'usr_operator_01',
    name: 'State Emergency Control (Operator)',
    role: 'GOVERNMENT_OPERATOR',
    organization_id: 'org_ner_disaster_mgmt',
    assigned_district: 'Kamrup Metropolitan',
    assigned_state: 'Assam'
  },
  'usr_admin_01': {
    id: 'usr_admin_01',
    name: 'Central Disruption Command (Admin)',
    role: 'GOVERNMENT_ADMIN',
    organization_id: 'org_ner_command',
    assigned_district: 'All NE States',
    assigned_state: 'All'
  },
  'usr_logistics_01': {
    id: 'usr_logistics_01',
    name: 'Brahmaputra Freight Logistics (Operator)',
    role: 'LOGISTICS_OPERATOR',
    organization_id: 'org_ner_freight',
    assigned_district: 'Guwahati-Shillong Corridor',
    assigned_state: 'Assam / Meghalaya'
  }
};

let activeAlerts = [
  {
    id: 'alt_live_01',
    type: 'ROAD_BLOCKED',
    severity: 'CRITICAL',
    title: 'CRITICAL: Landslide Closure on NH-13 Corridor',
    message: 'Massive debris displacement blocking both lanes near Potin. Border Roads Task Force en route.',
    location: 'Papum Pare, Arunachal Pradesh',
    latitude: 27.185,
    longitude: 93.682,
    road_id: 'NH-13',
    district_id: 'Papum Pare',
    target_role: 'FIELD_OFFICER',
    status: 'UNREAD',
    is_demo: false,
    created_at: new Date(Date.now() - 25 * 60 * 1000).toISOString()
  },
  {
    id: 'alt_live_02',
    type: 'FLOOD_WARNING',
    severity: 'HIGH',
    title: 'HIGH: Flash Flood Inundation on NH-27',
    message: 'Water level overflow near Roha bridge approaches. Heavy vehicle movement restricted.',
    location: 'Nagaon District, Assam',
    latitude: 26.35,
    longitude: 92.68,
    road_id: 'NH-27',
    district_id: 'Nagaon',
    target_role: 'FIELD_OFFICER',
    status: 'UNREAD',
    is_demo: false,
    created_at: new Date(Date.now() - 42 * 60 * 1000).toISOString()
  },
  {
    id: 'alt_live_03',
    type: 'HEAVY_RAIN_WARNING',
    severity: 'MEDIUM',
    title: 'ADVISORY: Cloudburst & Dense Fog Advisory',
    message: 'Precipitation exceeding 45mm/hr in East Khasi Hills. Reduced visibility on Shillong Bypass.',
    location: 'East Khasi Hills, Meghalaya',
    latitude: 25.57,
    longitude: 91.88,
    road_id: 'NH-6',
    district_id: 'East Khasi Hills',
    target_role: 'FIELD_OFFICER',
    status: 'READ',
    is_demo: false,
    created_at: new Date(Date.now() - 90 * 60 * 1000).toISOString()
  }
];

export function getUser(userId) {
  return DEMO_USERS[userId] || DEMO_USERS['usr_officer_01'];
}

export function listUsers() {
  return Object.values(DEMO_USERS);
}

function mapDbToFieldIncident(dbInc) {
  return {
    id: dbInc.id,
    client_generated_id: dbInc.id,
    reported_by: dbInc.source || 'Officer R. Borah',
    type: (dbInc.type || 'ROAD_BLOCKED').toUpperCase().replace(/\s+/g, '_'),
    severity: (dbInc.severity || 'HIGH').toUpperCase().includes('CRIT') ? 'CRITICAL' : 
              (dbInc.severity || 'HIGH').toUpperCase().includes('HIGH') ? 'HIGH' :
              (dbInc.severity || 'HIGH').toUpperCase().includes('MOD') ? 'MEDIUM' : 'LOW',
    latitude: dbInc.lat || 26.15,
    longitude: dbInc.lng || 91.75,
    location_accuracy: 8,
    district_id: dbInc.district || 'Kamrup Metropolitan',
    road_id: dbInc.road || 'NH-27',
    description: dbInc.description || 'Field inspection report',
    nearby_landmark: dbInc.state || 'Assam',
    estimated_obstruction_length: '35m',
    vehicle_accessibility: dbInc.status === 'BLOCKED' ? 'NONE' : 'LIGHT_VEHICLES_ONLY',
    status: dbInc.status === 'VERIFIED' ? 'VERIFIED' : (dbInc.status === 'REJECTED' ? 'REJECTED' : 'SUBMITTED'),
    source: 'FIELD_REPORT',
    reported_at: dbInc.reportedAt || new Date().toISOString(),
    photos: dbInc.photoUrl ? [{
      id: `ph_${dbInc.id}`,
      incident_id: dbInc.id,
      photo_url: dbInc.photoUrl,
      mime_type: 'image/jpeg',
      file_size: 150000,
      created_at: new Date().toISOString()
    }] : [],
    is_demo: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
}

export function listIncidents(query = {}) {
  const db = readDb();
  let list = db.incidents.map(mapDbToFieldIncident);

  if (query.district_id) {
    list = list.filter(i => (i.district_id || '').toLowerCase().includes(query.district_id.toLowerCase()));
  }
  if (query.status) {
    list = list.filter(i => i.status.toLowerCase() === query.status.toLowerCase());
  }
  if (query.severity) {
    list = list.filter(i => i.severity.toLowerCase() === query.severity.toLowerCase());
  }
  if (query.type) {
    list = list.filter(i => i.type.toLowerCase() === query.type.toLowerCase());
  }

  const limit = parseInt(query.limit || 50, 10);
  const offset = parseInt(query.offset || 0, 10);

  return {
    total: list.length,
    items: list.slice(offset, offset + limit),
    limit,
    offset
  };
}

export function getIncidentById(id) {
  const db = readDb();
  const found = db.incidents.find(i => i.id === id);
  if (!found) return null;
  return mapDbToFieldIncident(found);
}

export function createFieldIncident(payload, user) {
  const db = readDb();
  const id = payload.client_generated_id || `INC-NE-${Date.now().toString().slice(-4)}`;

  const dbRecord = {
    id,
    type: (payload.type || 'LANDSLIDE').replace(/_/g, ' '),
    title: (payload.type || 'Field Report').replace(/_/g, ' '),
    severity: (payload.severity || 'HIGH').toUpperCase() === 'CRITICAL' ? 'Critical Hazard' : 
              (payload.severity || 'HIGH').toUpperCase() === 'HIGH' ? 'High Severity' : 'Moderate',
    state: payload.district_id && payload.district_id.includes('Arunachal') ? 'Arunachal Pradesh' :
           payload.district_id && payload.district_id.includes('Meghalaya') ? 'Meghalaya' : 'Assam',
    district: payload.district_id || 'Kamrup Metropolitan',
    road: payload.road_id || 'NH-27',
    status: 'BLOCKED',
    reported: 'Just now',
    reportedAt: payload.reported_at || new Date().toISOString(),
    source: `${user?.name || 'Field Officer'} (Mobile App)`,
    lat: payload.latitude,
    lng: payload.longitude,
    photoUrl: payload.photo_data?.base64_data || payload.photoUrl || (payload.photo_base64 ? `data:image/jpeg;base64,${payload.photo_base64}` : 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=400&q=80'),
    description: payload.description || 'Ground observation report submitted from mobile field unit.'
  };

  const existingIdx = db.incidents.findIndex(i => i.id === id);
  if (existingIdx >= 0) {
    db.incidents[existingIdx] = dbRecord;
  } else {
    db.incidents.unshift(dbRecord);
  }

  writeDb(db);

  if (payload.severity === 'CRITICAL' || payload.severity === 'HIGH') {
    const newAlert = {
      id: `alt_${Date.now()}`,
      type: payload.type === 'LANDSLIDE' ? 'LANDSLIDE_WARNING' : 
            payload.type === 'FLOOD' ? 'FLOOD_WARNING' : 'ROAD_BLOCKED',
      severity: payload.severity,
      title: `${payload.severity}: ${payload.type.replace(/_/g, ' ')} on ${payload.road_id || 'Highway Corridor'}`,
      message: payload.description || 'Road blockage confirmed by ground officer. Traffic diversion recommended.',
      location: `${payload.district_id || 'Assam'}`,
      latitude: payload.latitude,
      longitude: payload.longitude,
      road_id: payload.road_id,
      district_id: payload.district_id,
      incident_id: id,
      target_role: 'FIELD_OFFICER',
      status: 'UNREAD',
      is_demo: false,
      created_at: new Date().toISOString()
    };
    activeAlerts.unshift(newAlert);
  }

  return mapDbToFieldIncident(dbRecord);
}

export function syncBatch(reports = [], user) {
  let synced = 0;
  let duplicates = 0;
  const results = [];

  for (const rep of reports) {
    try {
      const inc = createFieldIncident(rep, user);
      synced++;
      results.push({ client_id: rep.client_generated_id, status: 'SYNCED', id: inc.id });
    } catch (e) {
      duplicates++;
      results.push({ client_id: rep.client_generated_id, status: 'ERROR', message: e.message });
    }
  }

  return {
    synced_count: synced,
    duplicate_count: duplicates,
    failed_count: 0,
    results
  };
}

export function getAlerts(query = {}) {
  let list = [...activeAlerts];
  if (query.severity) {
    list = list.filter(a => a.severity.toLowerCase() === query.severity.toLowerCase());
  }
  if (query.status) {
    list = list.filter(a => a.status.toLowerCase() === query.status.toLowerCase());
  }

  return {
    total: list.length,
    items: list,
    limit: 50,
    offset: 0
  };
}

export function acknowledgeAlert(alertId) {
  const alert = activeAlerts.find(a => a.id === alertId);
  if (alert) {
    alert.status = 'ACKNOWLEDGED';
    return alert;
  }
  return null;
}
