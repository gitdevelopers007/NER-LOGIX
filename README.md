# NER-LOGIX: North Eastern Region Logistics & Accessibility Intelligence

> **Autonomous Geospatial Logistics & Disaster Resilience Platform for Northeast India**  
> Developed for the Ministry of Development of North Eastern Region (MDoNER), State Disaster Management Authorities (SDMA), and strategic logistics operators.

---

## 🏔️ Overview

**NER-LOGIX** is a mission-critical logistics intelligence and accessibility management platform purpose-built for the unique geographic, climatic, and infrastructural challenges of Northeast India (Assam, Arunachal Pradesh, Meghalaya, Manipur, Mizoram, Nagaland, Tripura, and Sikkim).

The system integrates real-time geospatial data, satellite imagery, Doppler radar weather telemetry, and predictive risk modeling to ensure continuous supply chain continuity, disaster response readiness, and safe route planning across vulnerable mountainous terrains.

---

## 📱 Page-by-Page Feature Tour

### **Page 1: Welcome & Mission Overview (`/`)**
- High-impact national portal landing page.
- Strategic mission statement and regional connectivity statistics.
- Key modules overview: *Route Optimization*, *Disaster Resilience*, *Real-time Telemetry*, and *Multi-Agency Coordination*.
- Quick navigation to authenticated portals.

### **Page 2: Select Your Access Portal (`/access-portal`)**
- Secure multi-stakeholder gateway with role-based routing:
  1. **Government Command Center**: MDoNER, State Chief Secretaries, SDMA officials.
  2. **Logistics Fleet Operators**: Strategic transport fleets, medical supply convoys, civil supplies.
  3. **Relief & Emergency Responders**: NDRF, SDRF, Indian Army / Assam Rifles disaster response units.
- 256-bit encryption compliance and official identity verification notices.

### **Page 3: Government Portal Login (`/government-login`)**
- Authentic Government of India portal styling featuring the State Emblem of India and National Informatics Centre (NIC) aesthetics.
- **Dual Authentication Modes**:
  - *Officer ID & Password*: Pre-configured for emergency access (`OFF-NER-2024` / `Secure@NER2024`).
  - *Digital Identity (e-Pramaan / MeriPehchan)*: OTP-based mobile identity verification.
- Dynamic interactive Security Captcha validation.
- Backed by an active Express + JSON auth backend server on `http://localhost:3001`.

### **Page 4: Government Command Center Overview (`/government-command-center`)**
- High-level executive dashboard for senior government leadership.
- **8-State Readiness Matrix**: Live accessibility indices, active alerts, and open corridors across all 8 Northeastern states.
- Macro metrics: Network Accessibility (82.4%), Vulnerable Corridors, Active Disruption Alerts, and In-Transit Strategic Convoys.
- Quick-launch banner into the operational Live Map.

### **Page 5: Live Accessibility Map (`/live-map`)**
- Interactive operational GIS command viewport built on Leaflet:
  - **Base Maps**: OpenStreetMap (OSM) standard vector, ISRO/NRSC Bhuvan satellite imagery, OpenTopoMap terrain contours.
  - **Live Weather**: Doppler Radar cloud and precipitation layer overlay.
  - **13 Interactive Layers**: National Highways (NH-15, NH-27, NH-29, etc.), Border Roads (BRO), bridges, landslides, flood zones, relief camps, fuel depots.
  - **Interactive Incident Inspection**: Real-time road block cards with damage assessment, detours, repair timelines, and local SVG field photos.
  - **Northeast District Connectivity Matrix**: District-level status with rapid search and filtering.

### **Page 6: AI Route Intelligence (`/route-intelligence`)**
- Dynamic multi-criteria routing engine for high-priority civilian and military convoys:
  - **Mission Input Strip**: Origin (e.g., Guwahati), Destination (e.g., Itanagar), Mission Type (Essential Supplies, Medical, Fuel), Priority, and Departure schedule.
  - **Multi-Route GIS Map**:
    - *Route 1 (Primary - NH-15)*: Highlighted hazard zone across active mudslide near Banderdewa.
    - *Route 2 (Alternative 1 - Recommended)*: Emerald green bypass via Tezpur avoiding vulnerable choke points.
    - *Route 3 (Alternative 2 - Southern Corridor)*: Valley detour route.
  - **AI Route Risk Assessment**: 4 real-time risk parameters (Landslide Risk, Flood/Rainfall, Road Damage, Congestion) with confidence scoring.
  - **6 Assessment Data Feeds**: GIS Road Network, IMD Doppler Weather, Field Incident Reports, NHAI Road Sensors, State Traffic, and Geospatial ML Models.

---

## 🌐 100% Free & Open-Source Geospatial Data Pipeline

NER-LOGIX runs entirely without expensive proprietary API licenses, utilizing verified open data sources:

| Layer / Telemetry | Primary Provider | Integration Status |
| :--- | :--- | :--- |
| **Base Roads & Boundaries** | OpenStreetMap / CartoDB | Live Vector Tile Rendering |
| **Satellite Imagery** | ISRO Bhuvan / Esri World Imagery | Live Satellite WMS/Tiles |
| **Topography & Elevation** | OpenTopoMap / SRTM | Live Hypsometric Contours |
| **Doppler Weather Radar** | IMD Radar / Open-Meteo Flood Models | Real-time Precipitation Overlays |
| **Earthquake & Seismic** | USGS Global Earthquake Hazards | Live GeoJSON Telemetry |
| **Routing Corridors** | OSRM / OpenRouteService Engine | Polyline Traversal Calculations |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or later
- **npm**: v9.0.0 or later

### Installation & Run

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/gitdevelopers007/NER-LOGIX.git
   cd NER-LOGIX
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   # In terminal 1: Start frontend
   npm run dev

   # In terminal 2: Start auth backend (optional, handles authentication requests)
   node server/server.js
   ```

4. **Access the Application**:
   - Web Application: `http://localhost:5173`
   - Express Backend: `http://localhost:3001`

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 + TypeScript + Vite
- **Styling & Design System**: Tailwind CSS v4 + Lucide React Icons
- **Mapping & Geospatial**: Leaflet v1.9.4 + Custom SVG overlays & GeoJSON parsers
- **Backend & Auth**: Node.js + Express + JSON DB
- **Routing**: React Router DOM v7

---

## 🏛️ Governance & Compliance

Built in compliance with the **National Data Sharing and Accessibility Policy (NDSAP)** and **Open Geospatial Consortium (OGC)** open standards for disaster resilience in Northeast India.
