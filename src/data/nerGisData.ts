export interface Incident {
  id: string;
  type: string;
  title: string;
  severity: 'High Severity' | 'Moderate' | 'Low' | 'Critical';
  state: string;
  district: string;
  road: string;
  status: 'BLOCKED' | 'RESTRICTED' | 'DELAYED' | 'OPEN';
  reported: string;
  source: string;
  lat: number;
  lng: number;
  photoUrl: string;
  description: string;
}

export interface DistrictStatus {
  state: string;
  status: 'Normal' | 'Watch' | 'Critical';
  issues: string;
  lastUpdated: string;
}

export interface WeatherRisk {
  type: string;
  count: string;
  riskLevel: string;
  color: string;
  icon: string;
}

export interface RecentFieldReport {
  id: string;
  title: string;
  location: string;
  time?: string;
  thumbnail: string;
  status: string;
}

// 8 North Eastern State Capitals & Primary Nodes
export const NER_NODES = [
  { name: 'Itanagar', state: 'Arunachal Pradesh', lat: 27.0844, lng: 93.6053, status: 'Restricted' },
  { name: 'Dispur', state: 'Assam', lat: 26.1445, lng: 91.7362, status: 'Open' },
  { name: 'Shillong', state: 'Meghalaya', lat: 25.5788, lng: 91.8933, status: 'Open' },
  { name: 'Kohima', state: 'Nagaland', lat: 25.6751, lng: 94.1086, status: 'Blocked' },
  { name: 'Imphal', state: 'Manipur', lat: 24.8170, lng: 93.9368, status: 'Blocked' },
  { name: 'Aizawl', state: 'Mizoram', lat: 23.7271, lng: 92.7176, status: 'Restricted' },
  { name: 'Agartala', state: 'Tripura', lat: 23.8315, lng: 91.2868, status: 'Delayed' },
  { name: 'Gangtok', state: 'Sikkim', lat: 27.3389, lng: 88.6065, status: 'Open' },
];

// Active Incidents on the GIS Layer
export const INCIDENTS_DATA: Incident[] = [
  {
    id: 'INC-AS-2025-027',
    type: 'Road Incident',
    title: 'ROAD INCIDENT',
    severity: 'High Severity',
    state: 'Assam',
    district: 'Kamrup / Nagaon Corridor',
    road: 'NH-27, Assam',
    status: 'BLOCKED',
    reported: '12 min ago',
    source: 'Field Report',
    lat: 26.24,
    lng: 92.40,
    photoUrl: 'data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20280%22%20width%3D%22400%22%20height%3D%22280%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22skyGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23334155%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2364748b%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22mountainGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%231e293b%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%230f172a%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22mudGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2378350f%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%2392400e%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23451a03%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22400%22%20height%3D%22280%22%20fill%3D%22url(%23skyGrad)%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%220%2C170%2090%2C60%20190%2C130%20270%2C40%20370%2C120%20400%2C90%20400%2C280%200%2C280%22%20fill%3D%22url(%23mountainGrad)%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%220%2C280%20130%2C160%20250%2C160%20400%2C280%22%20fill%3D%22%231e293b%22%20%2F%3E%0A%20%20%3Cline%20x1%3D%22190%22%20y1%3D%22160%22%20x2%3D%22200%22%20y2%3D%22280%22%20stroke%3D%22%23facc15%22%20stroke-dasharray%3D%2214%2C12%22%20stroke-width%3D%224%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%22210%2C80%20400%2C150%20400%2C280%20180%2C280%22%20fill%3D%22%23292524%22%20%2F%3E%0A%20%20%3Cpath%20d%3D%22M%20220%20120%20Q%20190%20160%20130%20190%20Q%20100%20210%2080%20250%20Q%2070%20280%20270%20280%20Q%20330%20280%20350%20230%20Q%20330%20170%20270%20140%20Z%22%20fill%3D%22url(%23mudGrad)%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22150%22%20cy%3D%22210%22%20rx%3D%2226%22%20ry%3D%2217%22%20fill%3D%22%2357534e%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22190%22%20cy%3D%22240%22%20rx%3D%2234%22%20ry%3D%2222%22%20fill%3D%22%2344403c%22%20stroke%3D%22%231c1917%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22120%22%20cy%3D%22235%22%20rx%3D%2219%22%20ry%3D%2213%22%20fill%3D%22%2378716c%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22230%22%20cy%3D%22215%22%20rx%3D%2225%22%20ry%3D%2216%22%20fill%3D%22%2357534e%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Crect%20x%3D%2212%22%20y%3D%2212%22%20width%3D%22135%22%20height%3D%2224%22%20rx%3D%224%22%20fill%3D%22%23dc2626%22%20opacity%3D%220.92%22%20%2F%3E%0A%20%20%3Ctext%20x%3D%2279%22%20y%3D%2228%22%20fill%3D%22%23ffffff%22%20font-size%3D%2211%22%20font-weight%3D%22bold%22%20font-family%3D%22sans-serif%22%20text-anchor%3D%22middle%22%3EROAD%20HAZARD%3C%2Ftext%3E%0A%3C%2Fsvg%3E%0A',
    description: 'Landslide debris and boulder flow partially blocking the arterial westbound carriage on NH-27. Clearance crew and earthmovers en route.',
  },
  {
    id: 'INC-AR-2025-082',
    type: 'Landslide',
    title: 'Landslide',
    severity: 'High Severity',
    state: 'Arunachal Pradesh',
    district: 'Papum Pare',
    road: 'NH-15',
    status: 'BLOCKED',
    reported: '14 min ago',
    source: 'Field Operations',
    lat: 27.185,
    lng: 93.682,
    photoUrl: 'data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20280%22%20width%3D%22400%22%20height%3D%22280%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22skyGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23334155%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2364748b%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22mountainGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%231e293b%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%230f172a%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22mudGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2378350f%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%2392400e%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23451a03%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22400%22%20height%3D%22280%22%20fill%3D%22url(%23skyGrad)%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%220%2C170%2090%2C60%20190%2C130%20270%2C40%20370%2C120%20400%2C90%20400%2C280%200%2C280%22%20fill%3D%22url(%23mountainGrad)%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%220%2C280%20130%2C160%20250%2C160%20400%2C280%22%20fill%3D%22%231e293b%22%20%2F%3E%0A%20%20%3Cline%20x1%3D%22190%22%20y1%3D%22160%22%20x2%3D%22200%22%20y2%3D%22280%22%20stroke%3D%22%23facc15%22%20stroke-dasharray%3D%2214%2C12%22%20stroke-width%3D%224%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%22210%2C80%20400%2C150%20400%2C280%20180%2C280%22%20fill%3D%22%23292524%22%20%2F%3E%0A%20%20%3Cpath%20d%3D%22M%20220%20120%20Q%20190%20160%20130%20190%20Q%20100%20210%2080%20250%20Q%2070%20280%20270%20280%20Q%20330%20280%20350%20230%20Q%20330%20170%20270%20140%20Z%22%20fill%3D%22url(%23mudGrad)%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22150%22%20cy%3D%22210%22%20rx%3D%2226%22%20ry%3D%2217%22%20fill%3D%22%2357534e%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22190%22%20cy%3D%22240%22%20rx%3D%2234%22%20ry%3D%2222%22%20fill%3D%22%2344403c%22%20stroke%3D%22%231c1917%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22120%22%20cy%3D%22235%22%20rx%3D%2219%22%20ry%3D%2213%22%20fill%3D%22%2378716c%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22230%22%20cy%3D%22215%22%20rx%3D%2225%22%20ry%3D%2216%22%20fill%3D%22%2357534e%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Crect%20x%3D%2212%22%20y%3D%2212%22%20width%3D%22135%22%20height%3D%2224%22%20rx%3D%224%22%20fill%3D%22%23dc2626%22%20opacity%3D%220.92%22%20%2F%3E%0A%20%20%3Ctext%20x%3D%2279%22%20y%3D%2228%22%20fill%3D%22%23ffffff%22%20font-size%3D%2211%22%20font-weight%3D%22bold%22%20font-family%3D%22sans-serif%22%20text-anchor%3D%22middle%22%3EROAD%20HAZARD%3C%2Ftext%3E%0A%3C%2Fsvg%3E%0A',
    description: 'Debris flow and heavy boulder displacement covering 45 meters of roadway on NH-15. BRO Heavy Earth Movers mobilized.',
  },
  {
    id: 'INC-NL-2025-041',
    type: 'Road Damage',
    title: 'Road Surface Subsidence',
    severity: 'High Severity',
    state: 'Nagaland',
    district: 'Kohima',
    road: 'NH-29',
    status: 'BLOCKED',
    reported: '12 min ago',
    source: 'Field Operations',
    lat: 25.75,
    lng: 94.02,
    photoUrl: 'data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20280%22%20width%3D%22400%22%20height%3D%22280%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22skyGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23334155%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2364748b%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22mountainGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%231e293b%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%230f172a%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22mudGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2378350f%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%2392400e%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23451a03%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22400%22%20height%3D%22280%22%20fill%3D%22url(%23skyGrad)%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%220%2C170%2090%2C60%20190%2C130%20270%2C40%20370%2C120%20400%2C90%20400%2C280%200%2C280%22%20fill%3D%22url(%23mountainGrad)%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%220%2C280%20130%2C160%20250%2C160%20400%2C280%22%20fill%3D%22%231e293b%22%20%2F%3E%0A%20%20%3Cline%20x1%3D%22190%22%20y1%3D%22160%22%20x2%3D%22200%22%20y2%3D%22280%22%20stroke%3D%22%23facc15%22%20stroke-dasharray%3D%2214%2C12%22%20stroke-width%3D%224%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%22210%2C80%20400%2C150%20400%2C280%20180%2C280%22%20fill%3D%22%23292524%22%20%2F%3E%0A%20%20%3Cpath%20d%3D%22M%20220%20120%20Q%20190%20160%20130%20190%20Q%20100%20210%2080%20250%20Q%2070%20280%20270%20280%20Q%20330%20280%20350%20230%20Q%20330%20170%20270%20140%20Z%22%20fill%3D%22url(%23mudGrad)%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22150%22%20cy%3D%22210%22%20rx%3D%2226%22%20ry%3D%2217%22%20fill%3D%22%2357534e%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22190%22%20cy%3D%22240%22%20rx%3D%2234%22%20ry%3D%2222%22%20fill%3D%22%2344403c%22%20stroke%3D%22%231c1917%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22120%22%20cy%3D%22235%22%20rx%3D%2219%22%20ry%3D%2213%22%20fill%3D%22%2378716c%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22230%22%20cy%3D%22215%22%20rx%3D%2225%22%20ry%3D%2216%22%20fill%3D%22%2357534e%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Crect%20x%3D%2212%22%20y%3D%2212%22%20width%3D%22135%22%20height%3D%2224%22%20rx%3D%224%22%20fill%3D%22%23dc2626%22%20opacity%3D%220.92%22%20%2F%3E%0A%20%20%3Ctext%20x%3D%2279%22%20y%3D%2228%22%20fill%3D%22%23ffffff%22%20font-size%3D%2211%22%20font-weight%3D%22bold%22%20font-family%3D%22sans-serif%22%20text-anchor%3D%22middle%22%3EROAD%20HAZARD%3C%2Ftext%3E%0A%3C%2Fsvg%3E%0A',
    description: 'Road damage reported on NH-129 (Kohima–Dimapur) due to hillside seepage.',
  },
  {
    id: 'INC-SK-2025-019',
    type: 'Bridge Damage',
    title: 'Bridge Expansion Joint Gap',
    severity: 'Moderate',
    state: 'Sikkim',
    district: 'Mangan',
    road: 'NH-10',
    status: 'RESTRICTED',
    reported: '28 min ago',
    source: 'Field Operations',
    lat: 27.51,
    lng: 88.53,
    photoUrl: 'data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20280%22%20width%3D%22400%22%20height%3D%22280%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22skyGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23334155%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2364748b%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22mountainGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%231e293b%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%230f172a%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22mudGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2378350f%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%2392400e%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23451a03%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22400%22%20height%3D%22280%22%20fill%3D%22url(%23skyGrad)%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%220%2C170%2090%2C60%20190%2C130%20270%2C40%20370%2C120%20400%2C90%20400%2C280%200%2C280%22%20fill%3D%22url(%23mountainGrad)%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%220%2C280%20130%2C160%20250%2C160%20400%2C280%22%20fill%3D%22%231e293b%22%20%2F%3E%0A%20%20%3Cline%20x1%3D%22190%22%20y1%3D%22160%22%20x2%3D%22200%22%20y2%3D%22280%22%20stroke%3D%22%23facc15%22%20stroke-dasharray%3D%2214%2C12%22%20stroke-width%3D%224%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%22210%2C80%20400%2C150%20400%2C280%20180%2C280%22%20fill%3D%22%23292524%22%20%2F%3E%0A%20%20%3Cpath%20d%3D%22M%20220%20120%20Q%20190%20160%20130%20190%20Q%20100%20210%2080%20250%20Q%2070%20280%20270%20280%20Q%20330%20280%20350%20230%20Q%20330%20170%20270%20140%20Z%22%20fill%3D%22url(%23mudGrad)%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22150%22%20cy%3D%22210%22%20rx%3D%2226%22%20ry%3D%2217%22%20fill%3D%22%2357534e%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22190%22%20cy%3D%22240%22%20rx%3D%2234%22%20ry%3D%2222%22%20fill%3D%22%2344403c%22%20stroke%3D%22%231c1917%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22120%22%20cy%3D%22235%22%20rx%3D%2219%22%20ry%3D%2213%22%20fill%3D%22%2378716c%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22230%22%20cy%3D%22215%22%20rx%3D%2225%22%20ry%3D%2216%22%20fill%3D%22%2357534e%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Crect%20x%3D%2212%22%20y%3D%2212%22%20width%3D%22135%22%20height%3D%2224%22%20rx%3D%224%22%20fill%3D%22%23dc2626%22%20opacity%3D%220.92%22%20%2F%3E%0A%20%20%3Ctext%20x%3D%2279%22%20y%3D%2228%22%20fill%3D%22%23ffffff%22%20font-size%3D%2211%22%20font-weight%3D%22bold%22%20font-family%3D%22sans-serif%22%20text-anchor%3D%22middle%22%3EROAD%20HAZARD%3C%2Ftext%3E%0A%3C%2Fsvg%3E%0A',
    description: 'Single-lane restriction for commercial vehicles exceeding 18 tonnes.',
  },
  {
    id: 'INC-ML-2025-063',
    type: 'Heavy Rainfall',
    title: 'Flash Flood Watch',
    severity: 'Moderate',
    state: 'Meghalaya',
    district: 'East Khasi Hills',
    road: 'NH-206',
    status: 'RESTRICTED',
    reported: '42 min ago',
    source: 'IMD Telemetry',
    lat: 25.32,
    lng: 91.75,
    photoUrl: 'data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20280%22%20width%3D%22400%22%20height%3D%22280%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22skyGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23334155%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2364748b%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22mountainGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%231e293b%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%230f172a%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22mudGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2378350f%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%2392400e%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23451a03%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22400%22%20height%3D%22280%22%20fill%3D%22url(%23skyGrad)%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%220%2C170%2090%2C60%20190%2C130%20270%2C40%20370%2C120%20400%2C90%20400%2C280%200%2C280%22%20fill%3D%22url(%23mountainGrad)%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%220%2C280%20130%2C160%20250%2C160%20400%2C280%22%20fill%3D%22%231e293b%22%20%2F%3E%0A%20%20%3Cline%20x1%3D%22190%22%20y1%3D%22160%22%20x2%3D%22200%22%20y2%3D%22280%22%20stroke%3D%22%23facc15%22%20stroke-dasharray%3D%2214%2C12%22%20stroke-width%3D%224%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%22210%2C80%20400%2C150%20400%2C280%20180%2C280%22%20fill%3D%22%23292524%22%20%2F%3E%0A%20%20%3Cpath%20d%3D%22M%20220%20120%20Q%20190%20160%20130%20190%20Q%20100%20210%2080%20250%20Q%2070%20280%20270%20280%20Q%20330%20280%20350%20230%20Q%20330%20170%20270%20140%20Z%22%20fill%3D%22url(%23mudGrad)%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22150%22%20cy%3D%22210%22%20rx%3D%2226%22%20ry%3D%2217%22%20fill%3D%22%2357534e%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22190%22%20cy%3D%22240%22%20rx%3D%2234%22%20ry%3D%2222%22%20fill%3D%22%2344403c%22%20stroke%3D%22%231c1917%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22120%22%20cy%3D%22235%22%20rx%3D%2219%22%20ry%3D%2213%22%20fill%3D%22%2378716c%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22230%22%20cy%3D%22215%22%20rx%3D%2225%22%20ry%3D%2216%22%20fill%3D%22%2357534e%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Crect%20x%3D%2212%22%20y%3D%2212%22%20width%3D%22135%22%20height%3D%2224%22%20rx%3D%224%22%20fill%3D%22%23dc2626%22%20opacity%3D%220.92%22%20%2F%3E%0A%20%20%3Ctext%20x%3D%2279%22%20y%3D%2228%22%20fill%3D%22%23ffffff%22%20font-size%3D%2211%22%20font-weight%3D%22bold%22%20font-family%3D%22sans-serif%22%20text-anchor%3D%22middle%22%3EROAD%20HAZARD%3C%2Ftext%3E%0A%3C%2Fsvg%3E%0A',
    description: 'Intense precipitation recorded in Mawsynram-Cherrapunji belt.',
  },
  {
    id: 'INC-MN-2025-055',
    type: 'Landslide',
    title: 'Multiple Rockfalls',
    severity: 'Critical',
    state: 'Manipur',
    district: 'Tamenglong',
    road: 'NH-37',
    status: 'BLOCKED',
    reported: '1 hour ago',
    source: 'District Administration',
    lat: 24.98,
    lng: 93.48,
    photoUrl: 'data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20280%22%20width%3D%22400%22%20height%3D%22280%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22skyGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23334155%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2364748b%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22mountainGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%231e293b%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%230f172a%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22mudGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2378350f%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%2392400e%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23451a03%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22400%22%20height%3D%22280%22%20fill%3D%22url(%23skyGrad)%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%220%2C170%2090%2C60%20190%2C130%20270%2C40%20370%2C120%20400%2C90%20400%2C280%200%2C280%22%20fill%3D%22url(%23mountainGrad)%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%220%2C280%20130%2C160%20250%2C160%20400%2C280%22%20fill%3D%22%231e293b%22%20%2F%3E%0A%20%20%3Cline%20x1%3D%22190%22%20y1%3D%22160%22%20x2%3D%22200%22%20y2%3D%22280%22%20stroke%3D%22%23facc15%22%20stroke-dasharray%3D%2214%2C12%22%20stroke-width%3D%224%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%22210%2C80%20400%2C150%20400%2C280%20180%2C280%22%20fill%3D%22%23292524%22%20%2F%3E%0A%20%20%3Cpath%20d%3D%22M%20220%20120%20Q%20190%20160%20130%20190%20Q%20100%20210%2080%20250%20Q%2070%20280%20270%20280%20Q%20330%20280%20350%20230%20Q%20330%20170%20270%20140%20Z%22%20fill%3D%22url(%23mudGrad)%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22150%22%20cy%3D%22210%22%20rx%3D%2226%22%20ry%3D%2217%22%20fill%3D%22%2357534e%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22190%22%20cy%3D%22240%22%20rx%3D%2234%22%20ry%3D%2222%22%20fill%3D%22%2344403c%22%20stroke%3D%22%231c1917%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22120%22%20cy%3D%22235%22%20rx%3D%2219%22%20ry%3D%2213%22%20fill%3D%22%2378716c%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22230%22%20cy%3D%22215%22%20rx%3D%2225%22%20ry%3D%2216%22%20fill%3D%22%2357534e%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Crect%20x%3D%2212%22%20y%3D%2212%22%20width%3D%22135%22%20height%3D%2224%22%20rx%3D%224%22%20fill%3D%22%23dc2626%22%20opacity%3D%220.92%22%20%2F%3E%0A%20%20%3Ctext%20x%3D%2279%22%20y%3D%2228%22%20fill%3D%22%23ffffff%22%20font-size%3D%2211%22%20font-weight%3D%22bold%22%20font-family%3D%22sans-serif%22%20text-anchor%3D%22middle%22%3EROAD%20HAZARD%3C%2Ftext%3E%0A%3C%2Fsvg%3E%0A',
    description: '5 road blocks identified along arterial freight corridor.',
  }
];

// District Connectivity Status Rows (Exact from Screenshot Table)
export const DISTRICT_CONNECTIVITY: DistrictStatus[] = [
  { state: 'Assam', status: 'Normal', issues: '2 road blocks, heavy rainfall', lastUpdated: 'Apr 26, 12:45' },
  { state: 'Arunachal Pradesh', status: 'Watch', issues: '5 road blocks, landslide risk', lastUpdated: 'Apr 26, 13:20' },
  { state: 'Manipur', status: 'Critical', issues: '1 road block, heavy rainfall', lastUpdated: 'Apr 26, 13:10' },
  { state: 'Meghalaya', status: 'Normal', issues: '—', lastUpdated: 'Apr 26, 12:55' },
  { state: 'Mizoram', status: 'Watch', issues: '1 road block, heavy rainfall', lastUpdated: 'Apr 26, 13:05' },
  { state: 'Nagaland', status: 'Normal', issues: '—', lastUpdated: 'Apr 26, 12:48' },
  { state: 'Tripura', status: 'Watch', issues: '2 delayed deliveries', lastUpdated: 'Apr 26, 13:15' },
  { state: 'Sikkim', status: 'Normal', issues: '—', lastUpdated: 'Apr 26, 12:40' },
];

// Weather & Risk Widgets (Exact from Screenshot)
export const WEATHER_RISKS: WeatherRisk[] = [
  { type: 'Heavy Rainfall', count: '6 districts', riskLevel: 'Moderate - High', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: 'rain' },
  { type: 'Landslide Risk', count: '4 districts', riskLevel: 'High', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: 'mountain' },
  { type: 'Flood Risk', count: '2 districts', riskLevel: 'Moderate', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: 'flood' },
  { type: 'Temperature', count: '18°C – 32°C', riskLevel: '(NER avg)', color: 'bg-orange-50 text-orange-700 border-orange-200', icon: 'temp' },
];

// Recent Updates (Field Reports)
export const RECENT_UPDATES: RecentFieldReport[] = [
  {
    id: 'RPT-1',
    title: 'Road damage reported on NH-129 (Kohima–Dimapur)',
    location: 'Kohima, Nagaland • 12 min ago',
    thumbnail: 'data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20280%22%20width%3D%22400%22%20height%3D%22280%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22skyGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23334155%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2364748b%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22mountainGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%231e293b%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%230f172a%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22mudGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2378350f%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%2392400e%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23451a03%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22400%22%20height%3D%22280%22%20fill%3D%22url(%23skyGrad)%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%220%2C170%2090%2C60%20190%2C130%20270%2C40%20370%2C120%20400%2C90%20400%2C280%200%2C280%22%20fill%3D%22url(%23mountainGrad)%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%220%2C280%20130%2C160%20250%2C160%20400%2C280%22%20fill%3D%22%231e293b%22%20%2F%3E%0A%20%20%3Cline%20x1%3D%22190%22%20y1%3D%22160%22%20x2%3D%22200%22%20y2%3D%22280%22%20stroke%3D%22%23facc15%22%20stroke-dasharray%3D%2214%2C12%22%20stroke-width%3D%224%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%22210%2C80%20400%2C150%20400%2C280%20180%2C280%22%20fill%3D%22%23292524%22%20%2F%3E%0A%20%20%3Cpath%20d%3D%22M%20220%20120%20Q%20190%20160%20130%20190%20Q%20100%20210%2080%20250%20Q%2070%20280%20270%20280%20Q%20330%20280%20350%20230%20Q%20330%20170%20270%20140%20Z%22%20fill%3D%22url(%23mudGrad)%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22150%22%20cy%3D%22210%22%20rx%3D%2226%22%20ry%3D%2217%22%20fill%3D%22%2357534e%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22190%22%20cy%3D%22240%22%20rx%3D%2234%22%20ry%3D%2222%22%20fill%3D%22%2344403c%22%20stroke%3D%22%231c1917%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22120%22%20cy%3D%22235%22%20rx%3D%2219%22%20ry%3D%2213%22%20fill%3D%22%2378716c%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22230%22%20cy%3D%22215%22%20rx%3D%2225%22%20ry%3D%2216%22%20fill%3D%22%2357534e%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Crect%20x%3D%2212%22%20y%3D%2212%22%20width%3D%22135%22%20height%3D%2224%22%20rx%3D%224%22%20fill%3D%22%23dc2626%22%20opacity%3D%220.92%22%20%2F%3E%0A%20%20%3Ctext%20x%3D%2279%22%20y%3D%2228%22%20fill%3D%22%23ffffff%22%20font-size%3D%2211%22%20font-weight%3D%22bold%22%20font-family%3D%22sans-serif%22%20text-anchor%3D%22middle%22%3EROAD%20HAZARD%3C%2Ftext%3E%0A%3C%2Fsvg%3E%0A',
    status: 'Critical',
  },
  {
    id: 'RPT-2',
    title: 'Bridge condition update – Sikkim',
    location: 'Mangan, Sikkim • 28 min ago',
    thumbnail: 'data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20280%22%20width%3D%22400%22%20height%3D%22280%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22skyGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23334155%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2364748b%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22mountainGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%231e293b%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%230f172a%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22mudGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2378350f%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%2392400e%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23451a03%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22400%22%20height%3D%22280%22%20fill%3D%22url(%23skyGrad)%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%220%2C170%2090%2C60%20190%2C130%20270%2C40%20370%2C120%20400%2C90%20400%2C280%200%2C280%22%20fill%3D%22url(%23mountainGrad)%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%220%2C280%20130%2C160%20250%2C160%20400%2C280%22%20fill%3D%22%231e293b%22%20%2F%3E%0A%20%20%3Cline%20x1%3D%22190%22%20y1%3D%22160%22%20x2%3D%22200%22%20y2%3D%22280%22%20stroke%3D%22%23facc15%22%20stroke-dasharray%3D%2214%2C12%22%20stroke-width%3D%224%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%22210%2C80%20400%2C150%20400%2C280%20180%2C280%22%20fill%3D%22%23292524%22%20%2F%3E%0A%20%20%3Cpath%20d%3D%22M%20220%20120%20Q%20190%20160%20130%20190%20Q%20100%20210%2080%20250%20Q%2070%20280%20270%20280%20Q%20330%20280%20350%20230%20Q%20330%20170%20270%20140%20Z%22%20fill%3D%22url(%23mudGrad)%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22150%22%20cy%3D%22210%22%20rx%3D%2226%22%20ry%3D%2217%22%20fill%3D%22%2357534e%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22190%22%20cy%3D%22240%22%20rx%3D%2234%22%20ry%3D%2222%22%20fill%3D%22%2344403c%22%20stroke%3D%22%231c1917%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22120%22%20cy%3D%22235%22%20rx%3D%2219%22%20ry%3D%2213%22%20fill%3D%22%2378716c%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22230%22%20cy%3D%22215%22%20rx%3D%2225%22%20ry%3D%2216%22%20fill%3D%22%2357534e%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Crect%20x%3D%2212%22%20y%3D%2212%22%20width%3D%22135%22%20height%3D%2224%22%20rx%3D%224%22%20fill%3D%22%23dc2626%22%20opacity%3D%220.92%22%20%2F%3E%0A%20%20%3Ctext%20x%3D%2279%22%20y%3D%2228%22%20fill%3D%22%23ffffff%22%20font-size%3D%2211%22%20font-weight%3D%22bold%22%20font-family%3D%22sans-serif%22%20text-anchor%3D%22middle%22%3EROAD%20HAZARD%3C%2Ftext%3E%0A%3C%2Fsvg%3E%0A',
    status: 'Restricted',
  },
  {
    id: 'RPT-3',
    title: 'Heavy rainfall alert – Meghalaya',
    location: 'East Khasi Hills, Meghalaya • 42 min ago',
    thumbnail: 'data:image/svg+xml;charset=utf-8,%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20400%20280%22%20width%3D%22400%22%20height%3D%22280%22%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22skyGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%23334155%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%2364748b%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22mountainGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%231e293b%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%230f172a%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%20%20%3ClinearGradient%20id%3D%22mudGrad%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%220%25%22%20stop-color%3D%22%2378350f%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%2250%25%22%20stop-color%3D%22%2392400e%22%20%2F%3E%0A%20%20%20%20%20%20%3Cstop%20offset%3D%22100%25%22%20stop-color%3D%22%23451a03%22%20%2F%3E%0A%20%20%20%20%3C%2FlinearGradient%3E%0A%20%20%3C%2Fdefs%3E%0A%20%20%3Crect%20width%3D%22400%22%20height%3D%22280%22%20fill%3D%22url(%23skyGrad)%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%220%2C170%2090%2C60%20190%2C130%20270%2C40%20370%2C120%20400%2C90%20400%2C280%200%2C280%22%20fill%3D%22url(%23mountainGrad)%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%220%2C280%20130%2C160%20250%2C160%20400%2C280%22%20fill%3D%22%231e293b%22%20%2F%3E%0A%20%20%3Cline%20x1%3D%22190%22%20y1%3D%22160%22%20x2%3D%22200%22%20y2%3D%22280%22%20stroke%3D%22%23facc15%22%20stroke-dasharray%3D%2214%2C12%22%20stroke-width%3D%224%22%20%2F%3E%0A%20%20%3Cpolygon%20points%3D%22210%2C80%20400%2C150%20400%2C280%20180%2C280%22%20fill%3D%22%23292524%22%20%2F%3E%0A%20%20%3Cpath%20d%3D%22M%20220%20120%20Q%20190%20160%20130%20190%20Q%20100%20210%2080%20250%20Q%2070%20280%20270%20280%20Q%20330%20280%20350%20230%20Q%20330%20170%20270%20140%20Z%22%20fill%3D%22url(%23mudGrad)%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22150%22%20cy%3D%22210%22%20rx%3D%2226%22%20ry%3D%2217%22%20fill%3D%22%2357534e%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22190%22%20cy%3D%22240%22%20rx%3D%2234%22%20ry%3D%2222%22%20fill%3D%22%2344403c%22%20stroke%3D%22%231c1917%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22120%22%20cy%3D%22235%22%20rx%3D%2219%22%20ry%3D%2213%22%20fill%3D%22%2378716c%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Cellipse%20cx%3D%22230%22%20cy%3D%22215%22%20rx%3D%2225%22%20ry%3D%2216%22%20fill%3D%22%2357534e%22%20stroke%3D%22%23292524%22%20stroke-width%3D%222%22%20%2F%3E%0A%20%20%3Crect%20x%3D%2212%22%20y%3D%2212%22%20width%3D%22135%22%20height%3D%2224%22%20rx%3D%224%22%20fill%3D%22%23dc2626%22%20opacity%3D%220.92%22%20%2F%3E%0A%20%20%3Ctext%20x%3D%2279%22%20y%3D%2228%22%20fill%3D%22%23ffffff%22%20font-size%3D%2211%22%20font-weight%3D%22bold%22%20font-family%3D%22sans-serif%22%20text-anchor%3D%22middle%22%3EROAD%20HAZARD%3C%2Ftext%3E%0A%3C%2Fsvg%3E%0A',
    status: 'Watch',
  },
];
