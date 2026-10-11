import React, { useState } from 'react';
import {
  PhoneCall,
  HeartPulse,
  Fuel,
  Shield,
  Wrench,
  MapPin,
  Clock,
  Search,
  CheckCircle2
} from 'lucide-react';

interface LifelineItem {
  id: string;
  name: string;
  category: 'TRAUMA' | 'DIESEL' | 'RECOVERY' | 'SHELTER';
  highway: string;
  location: string;
  state: string;
  phone: string;
  hours: string;
  capacityOrStatus: string;
  facilities: string[];
  verified24h: boolean;
}

const LIFELINES: LifelineItem[] = [
  {
    id: 'LIFE-001',
    name: 'District Civil Hospital & Trauma Stabilization Unit',
    category: 'TRAUMA',
    highway: 'NH-6',
    location: 'Jowai Bypass (KM 64)',
    state: 'Meghalaya',
    phone: '+91 3652 220220',
    hours: '24/7 Emergency Casualty',
    capacityOrStatus: 'Oxygen Bank 94% · 4 ICU Trauma Bays Active',
    facilities: ['Level-2 Trauma', 'Cold Chain Storage', 'Blood Bank', '4x4 Ambulance'],
    verified24h: true
  },
  {
    id: 'LIFE-002',
    name: 'BRO Project Pushpak Heavy Crane & Recovery Base',
    category: 'RECOVERY',
    highway: 'NH-6',
    location: 'Near Sonapur Tunnel South Portal (KM 141)',
    state: 'Meghalaya',
    phone: '+91 364 2590112',
    hours: '24/7 Rapid Incident Unit',
    capacityOrStatus: '50-Ton Hydraulic Winch & Earthmover On Standby',
    facilities: ['Multi-Axle Recovery', 'Boulder Breakers', 'Emergency Bulldozer'],
    verified24h: true
  },
  {
    id: 'LIFE-003',
    name: 'Indian Oil High-Altitude 24h Fuelling Depot',
    category: 'DIESEL',
    highway: 'NH-13',
    location: 'Bhalukpong Valley Checkpoint (KM 18)',
    state: 'Arunachal Pradesh',
    phone: '+91 3782 234105',
    hours: '24/7 Commercial Logistics Fleet',
    capacityOrStatus: 'High-Speed Diesel 42,000L In Stock',
    facilities: ['Low-Temperature Winter Diesel', 'AdBlue / DEF Tanks', 'Driver Rest Area'],
    verified24h: true
  },
  {
    id: 'LIFE-004',
    name: 'BRO Transit Accommodation & Relief Shelter',
    category: 'SHELTER',
    highway: 'NH-13',
    location: 'Baisakhi Military Camp / Sela Approach (KM 112)',
    state: 'Arunachal Pradesh',
    phone: '+91 3778 222119',
    hours: 'Open during highway closures',
    capacityOrStatus: '60 Cots Available · Emergency Food Rations',
    facilities: ['Heated Barracks', 'Hot Food & Clean Water', 'First Aid Station'],
    verified24h: true
  },
  {
    id: 'LIFE-005',
    name: 'Silchar Medical College & Hospital (SMCH)',
    category: 'TRAUMA',
    highway: 'NH-27 / NH-37',
    location: 'Ghungoor, Silchar (KM 0)',
    state: 'Assam',
    phone: '+91 3842 240707',
    hours: '24/7 Tertiary Referral Hospital',
    capacityOrStatus: 'Full Trauma Surgery Suite · CT/MRI Live',
    facilities: ['Tertiary Care', 'Advanced ICU', 'Burn & Crush Unit', 'Air Ambulance Pad'],
    verified24h: true
  },
  {
    id: 'LIFE-006',
    name: 'NHIDCL Express Tow & Winch Service Center',
    category: 'RECOVERY',
    highway: 'NH-27',
    location: 'Haflong Hill Cut (KM 62)',
    state: 'Assam',
    phone: '+91 3673 236200',
    hours: '24/7 Operations',
    capacityOrStatus: '2 Heavy Flatbeds + 30-Ton Boom Recovery',
    facilities: ['Flatbed Hauling', 'Axle Repair Depot', 'Pneumatic Jack Rig'],
    verified24h: true
  },
  {
    id: 'LIFE-007',
    name: 'Bharat Petroleum 24/7 Smart Fleet Point',
    category: 'DIESEL',
    highway: 'NH-10',
    location: 'Rangpo Border Tollway (KM 48)',
    state: 'Sikkim',
    phone: '+91 3592 240899',
    hours: '24/7 Live Fuelling',
    capacityOrStatus: 'Diesel 28,000L · Petrol 15,000L',
    facilities: ['Fleet Card Accepted', 'Tyre Pressure Nitrogen', 'Clean Sanitation'],
    verified24h: true
  }
];

export const LifelinesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const filtered = LIFELINES.filter((item) => {
    const matchesCat = activeCategory === 'ALL' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.highway.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.location.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.state.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-5">
      {/* 1. Header Banner - Clean Institutional Light Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wider flex items-center gap-1.5">
              <HeartPulse className="w-3.5 h-3.5 text-emerald-600" />
              24/7 Verified Lifeline Network
            </span>
            <span className="text-xs text-slate-500">BRO · NHIDCL · State Health Mission</span>
          </div>
          <h1 className="text-xl font-bold text-[#0f2547] tracking-tight uppercase">
            Highway Emergency Lifelines Directory
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Direct hotlines and telemetry for trauma hospitals, 24/7 winter diesel reserves, heavy mountain cranes, and BRO emergency shelters.
          </p>
        </div>

        {/* SOS Hotline Card */}
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 p-3 rounded-xl">
          <PhoneCall className="w-5 h-5 text-red-600 shrink-0" />
          <div>
            <div className="text-[10px] text-red-700 font-bold uppercase tracking-wider">All-India Emergency SOS</div>
            <div className="text-lg font-black text-slate-900 tracking-wider">112 / 1070</div>
          </div>
        </div>
      </div>

      {/* 2. Filter Toolbar */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search highway, facility, hospital..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1.5 focus:ring-blue-600"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 flex-wrap">
          <button
            onClick={() => setActiveCategory('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeCategory === 'ALL'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            All Lifelines ({LIFELINES.length})
          </button>
          <button
            onClick={() => setActiveCategory('TRAUMA')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'TRAUMA'
                ? 'bg-white text-red-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5 text-red-600" />
            Trauma Units
          </button>
          <button
            onClick={() => setActiveCategory('DIESEL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'DIESEL'
                ? 'bg-white text-amber-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Fuel className="w-3.5 h-3.5 text-amber-600" />
            Diesel Depots
          </button>
          <button
            onClick={() => setActiveCategory('RECOVERY')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'RECOVERY'
                ? 'bg-white text-blue-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-blue-600" />
            Recovery
          </button>
          <button
            onClick={() => setActiveCategory('SHELTER')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeCategory === 'SHELTER'
                ? 'bg-white text-emerald-700 shadow-xs border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            BRO Shelters
          </button>
        </div>
      </div>

      {/* 3. Grid of Lifeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => {
          return (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs transition-all p-4.5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase flex items-center gap-1 ${
                      item.category === 'TRAUMA'
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : item.category === 'DIESEL'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : item.category === 'RECOVERY'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}
                  >
                    {item.category === 'TRAUMA' && <HeartPulse className="w-3 h-3" />}
                    {item.category === 'DIESEL' && <Fuel className="w-3 h-3" />}
                    {item.category === 'RECOVERY' && <Wrench className="w-3 h-3" />}
                    {item.category === 'SHELTER' && <Shield className="w-3 h-3" />}
                    {item.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {item.highway}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-[#0f2547] text-sm leading-snug">{item.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{item.location} ({item.state})</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 space-y-1 text-xs">
                  <div className="text-slate-600 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span className="font-medium">{item.hours}</span>
                  </div>
                  <div className="text-amber-800 font-mono text-[11px] font-bold">
                    ⚡ {item.capacityOrStatus}
                  </div>
                </div>

                {/* Facilities Tags */}
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {item.facilities.map((fac, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 border border-slate-200 font-medium"
                    >
                      {fac}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`tel:${item.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-2xs"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  {item.phone}
                </a>

                {item.verified24h && (
                  <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified 24/7
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default LifelinesPage;
