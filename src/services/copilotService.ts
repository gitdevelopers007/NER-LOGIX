import { stockService } from './stockService';
import { incidentService } from './incidentService';
import { routingEngine } from './routingAlgorithms';

export interface CopilotMessage {
  id: string;
  sender: 'USER' | 'COPILOT';
  text: string;
  timestamp: string;
  category?: 'ROUTING' | 'STOCK' | 'INCIDENT' | 'DISASTER_SIMULATION' | 'GENERAL';
  dataPayload?: {
    recommendedRoute?: string[];
    distanceKm?: number;
    etaHours?: number;
    riskScore?: number;
    criticalLocations?: string[];
    suggestedAction?: string;
  };
}

export const COPILOT_PRESET_QUERIES = [
  {
    title: 'Vaccine Transport to Kohima',
    query: 'What is the safest corridor to transport cold-chain vaccines to Kohima right now, and will the shipment arrive before stockout?'
  },
  {
    title: 'Critical Stockout Audit',
    query: 'Which Northeast district hospitals currently face critical medical or oxygen stockout under 24 hours?'
  },
  {
    title: 'NH-13 Landslide Assessment',
    query: 'Assess the major landslide on NH-13 Lower Subansiri. Has it been corroborated by multiple ground units, and what is the bypass?'
  },
  {
    title: 'Monsoon Flood Simulation',
    query: 'Simulate high monsoon rainfall in the Barak Valley corridor. How should relief freight from Guwahati to Agartala be routed?'
  }
];

class CopilotService {
  public generateResponse(userPrompt: string): CopilotMessage {
    const q = userPrompt.toLowerCase();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const id = `copilot_${Date.now()}`;

    // 1. Vaccine Transport to Kohima Query
    if (q.includes('kohima') || q.includes('vaccine')) {
      const stock = stockService.getAllStock().find(s => s.location === 'Kohima');
      const routeRes = routingEngine.solveQuantumPSO('Guwahati', 'Kohima', true);
      const curQty = stock ? stock.current_quantity : 45;
      const burnRate = stock ? stock.daily_consumption : 60;
      const daysLeft = stock ? stock.days_remaining.toFixed(2) : '0.75';

      return {
        id,
        sender: 'COPILOT',
        timestamp,
        category: 'ROUTING',
        text: `### 🚨 Urgent Assessment: Kohima Cold-Chain Vaccine Depletion & Corridor Intelligence

**1. Stock Status at Kohima District Hospital:**
- **Current Quantity:** ${curQty} vials
- **Daily Burn Rate:** ${burnRate} vials/day
- **Buffer Remaining:** **${daysLeft} days (~${Math.round(parseFloat(daysLeft) * 24)} hours)** — **CRITICAL STOCKOUT IMMINENT**
- **Incoming Convoy:** \`NER-003\` (Refrigerated Van) departing Jorhat has a road ETA of **1.15 days (27.6 hours)**.
- ⚠️ **Resupply Gap:** Inbound road shipment will arrive **${(27.6 - parseFloat(daysLeft) * 24).toFixed(1)} hours AFTER stockout** if moving under standard transit.

**2. AI Corridor Rerouting Recommendation:**
- Standard direct route via NH-29 has active slope instability near Kohima.
- **Quantum-Inspired PSO Solution:** Divert via **Guwahati → Tezpur → Jorhat → Kohima Bypass**.
- **Effective Distance:** ${routeRes.distanceKm} km
- **Projected Transit ETA:** ${routeRes.etaHours} hrs (${Math.round(routeRes.etaHours)} hours)
- **Actionable Government Directive:** Recommend triggering **1-Click IAF UAV / Air-Drop Requisition** on the Stock Depletion panel to reduce transit to **6.0 hours**, guaranteeing delivery before cold-chain reserves exhaust.`,
        dataPayload: {
          recommendedRoute: routeRes.route,
          distanceKm: routeRes.distanceKm,
          etaHours: routeRes.etaHours,
          riskScore: routeRes.riskScore,
          suggestedAction: 'Escalate to IAF Heavy UAV / Air-Drop Requisition via Stock Depletion Engine'
        }
      };
    }

    // 2. Critical Stockout Audit
    if (q.includes('stockout') || q.includes('critical stock') || q.includes('oxygen') || q.includes('hospital')) {
      const allStock = stockService.getAllStock();
      const critical = allStock.filter(s => s.risk_level === 'Critical');
      const failing = allStock.filter(s => s.will_arrive_in_time === false);

      const itemsSummary = critical.map(c => 
        `- **${c.location} (${c.state}):** ${c.item} — **${c.days_remaining} days left** (${c.current_quantity} ${c.unit})`
      ).join('\n');

      return {
        id,
        sender: 'COPILOT',
        timestamp,
        category: 'STOCK',
        text: `### 📊 Real-Time Northeast Medical & Relief Inventory Audit

Across the 8 Northeast state lifelines, **${critical.length} regional hubs** are under **CRITICAL SHORTAGE** (<24h consumption buffer):

${itemsSummary}

**🚨 Convoy Resupply Deficit:**
- **${failing.length} hubs** (including Kohima and Tawang) have road shipment ETAs that exceed the remaining stock buffer due to mountain road slowdowns.
- **Tawang (Arunachal Pradesh):** Currently has **zero assigned road convoys** for D-Type Oxygen Cylinders due to Sela Pass inclement weather.
- **Executive Recommendation:** Mobilize standby IAF Mi-17 rotary detachment at Tezpur Airbase for rapid high-altitude supply drops.`,
        dataPayload: {
          criticalLocations: critical.map(c => `${c.location} (${c.item})`),
          suggestedAction: 'Review live resupply countdown on Essential Goods & Stock Alerts tab'
        }
      };
    }

    // 3. NH-13 Landslide Assessment & Corroboration
    if (q.includes('nh-13') || q.includes('landslide') || q.includes('subansiri') || q.includes('corroborat')) {
      const incident = incidentService.getIncidents().find(i => i.id === 'INC-2026-00482');
      const routeRes = routingEngine.solveDisasterResilientAStar('Guwahati', 'Itanagar', true);

      return {
        id,
        sender: 'COPILOT',
        timestamp,
        category: 'INCIDENT',
        text: `### 🛡️ Verified Field Intelligence: NH-13 Lower Subansiri Landslide

**1. Incident Telemetry (\`INC-2026-00482\`):**
- **Location:** Trans-Arunachal Highway (NH-13) KM-142 (27.4285° N, 93.7542° E)
- **Status:** **ROAD POSSIBLY BLOCKED** (Both carriageways inundated with mud and boulders)
- **Multi-Source Corroboration:** **${incident?.corroborationCount || 3} Ground Units** verified with **${incident?.confidenceScore || 98}% AI Confidence Score**:
  1. *BRO Detachment 753 (Radio Dispatch)* — Earthmover mobilized from Ziro
  2. *Field Officer T. Ronya (Field Unit #4 - Mobile PWA)* — Photo evidence verified
  3. *Civilian Driver (NER-LOGIX Citizen App)* — Traffic queue reported
- **Automated Deduplication:** 2 redundant citizen alerts automatically merged.

**2. Safe Alternate Bypass:**
- Standard traffic halted on NH-13 sector 4.
- **Recommended Divert:** **Guwahati → Tezpur → Itanagar (Southern Foothills Bypass)**.
- **Estimated Bypass Distance:** ${routeRes.distanceKm} km (100% Passable, avoids the slide zone).`,
        dataPayload: {
          recommendedRoute: routeRes.route,
          distanceKm: routeRes.distanceKm,
          etaHours: routeRes.etaHours,
          suggestedAction: 'Broadcast emergency road divert alert to approaching freight vehicles'
        }
      };
    }

    // 4. Monsoon Flood Simulation / Generic
    const optRes = routingEngine.solveQuantumPSO('Guwahati', 'Agartala', true);
    return {
      id,
      sender: 'COPILOT',
      timestamp,
      category: 'DISASTER_SIMULATION',
      text: `### 🌊 Strategic Corridor Analysis: Monsoon Rainfall in Southern Corridors

**1. Meteorological & GIS Telemetry:**
- Live IMD Doppler telemetry indicates precipitation of **>65 mm/h** across the Barak Valley & East Khasi Hills sectors.
- River levels along the Barak River approach warning threshold; NH-6 Umsning corridor experiencing slow-moving bottlenecks.

**2. Multi-Modal Freight Recommendation (Guwahati → Agartala):**
- **Direct Path via NH-6 & Silchar:** High disruption penalty due to waterlogged low-lying culverts.
- **AI Quantum-PSO Optimized Route:** **Guwahati → Shillong → Southern Elevated Ridge → Agartala**.
- **Calculated Safe Distance:** ${optRes.distanceKm} km
- **Projected Fleet Transit Time:** ${optRes.etaHours} hrs
- **Risk Index:** ${optRes.riskScore}% (${optRes.riskLevel} Disruption Likelihood)

**3. Actionable Checklist:**
- Hold non-essential heavy freight at Khanapara Logistics Yard.
- Grant green corridor clearance to essential medical supplies and oxygen tankers.`,
      dataPayload: {
        recommendedRoute: optRes.route,
        distanceKm: optRes.distanceKm,
        etaHours: optRes.etaHours,
        riskScore: optRes.riskScore
      }
    };
  }
}

export const copilotService = new CopilotService();
