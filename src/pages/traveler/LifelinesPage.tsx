import React, { useState } from 'react';
import {
  PhoneCall,
  HeartPulse,
  Fuel,
  Shield,
  Truck,
  Wrench,
  MapPin,
  Clock,
  Search,
  ExternalLink,
  Navigation,
  CheckCircle2,
  AlertCircle
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
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0b1a30] via-[#0f284e] to-[#0b1a30] p-6 rounded-xl border border-blue-900/60 shadow-lg text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 uppercase tracking-wider flex items-center gap-1.5">
                <HeartPulse className="w-3.5 h-3.5 text-emerald-400" />
                24/7 Verified Lifeline Network
              </span>
              <span className="text-xs text-blue-300">BRO · NHIDCL · State Health Mission</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Highway Emergency Lifelines Directory</h1>
            <p className="text-sm text-slate-300 mt-1">
              Direct hotlines and telemetry for trauma hospitals, 24/7 winter diesel reserves, heavy mountain cranes, and BRO emergency shelters.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-rose-950/40 border border-rose-900/60 p-3 rounded-lg text-rose-200">
            <PhoneCall className="w-6 h-6 text-rose-400 animate-bounce flex-shrink-0" />
            <div>
              <div className="text-[11px] text-rose-300 font-bold uppercase">All-India Emergency SOS</div>
              <div className="text-xl font-black text-white tracking-wider">112 / 1070</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="bg-[#0f172a] p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search highway, facility, hospital..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setActiveCategory('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeCategory === 'ALL'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            All Lifelines ({LIFELINES.length})
          </button>
          <button
            onClick={() => setActiveCategory('TRAUMA')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeCategory === 'TRAUMA'
                ? 'bg-rose-600 text-white'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
            Trauma Units
          </button>
          <button
            onClick={() => setActiveCategory('DIESEL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeCategory === 'DIESEL'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Fuel className="w-3.5 h-3.5 text-amber-400" />
            Diesel Depots
          </button>
          <button
            onClick={() => setActiveCategory('RECOVERY')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeCategory === 'RECOVERY'
                ? 'bg-cyan-600 text-white'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-cyan-400" />
            Crane & Recovery
          </button>
          <button
            onClick={() => setActiveCategory('SHELTER')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeCategory === 'SHELTER'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            BRO Shelters
          </button>
        </div>
      </div>

      {/* Grid of Lifeline Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => {
          return (
            <div
              key={item.id}
              className="bg-[#0f172a] rounded-xl border border-slate-800 hover:border-blue-700/60 transition-all p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase flex items-center gap-1 ${
                      item.category === 'TRAUMA'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : item.category === 'DIESEL'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : item.category === 'RECOVERY'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    }`}
                  >
                    {item.category === 'TRAUMA' && <HeartPulse className="w-3 h-3" />}
                    {item.category === 'DIESEL' && <Fuel className="w-3 h-3" />}
                    {item.category === 'RECOVERY' && <Wrench className="w-3 h-3" />}
                    {item.category === 'SHELTER' && <Shield className="w-3 h-3" />}
                    {item.category}
                  </span>
                  <span className="text-xs font-mono font-semibold text-blue-400 bg-blue-950/40 px-2 py-0.5 rounded border border-blue-900/40">
                    {item.highway}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-white text-base leading-snug">{item.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                    <span>{item.location} ({item.state})</span>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 space-y-1.5 text-xs">
                  <div className="text-slate-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span className="font-medium">{item.hours}</span>
                  </div>
                  <div className="text-amber-300/90 font-mono text-[11px] font-semibold">
                    ⚡ {item.capacityOrStatus}
                  </div>
                </div>

                {/* Facilities Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.facilities.map((fac, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      {fac}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <a
                  href={`tel:${item.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-sm"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  {item.phone}
                </a>

                {item.verified24h && (
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified
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
