# NER-LOGIX: North Eastern Region Logistics & Accessibility Intelligence

> **Autonomous Geospatial Logistics & Disaster Resilience Platform for Northeast India**  
> Developed for the Ministry of Development of North Eastern Region (MDoNER), State Disaster Management Authorities (SDMA), and strategic logistics operators.  
> **Smart India Hackathon (SIH)**

---

## 👥 Project Team: UNI MIND

| Role | Member Name | Key Contributions & Modules Handled |
| :--- | :--- | :--- |
| **Team Leader** | **Sai Ganesh** | • System Architecture & End-to-End Project Orchestration<br>• Full-Stack Integration across Government Command Center, Field Ops, and Traveler Portals<br>• Client-Side 2G Adaptive Photo Compression Engine (Canvas downscaling 3.5MB → 38KB)<br>• 100% Offline-First IndexedDB Architecture & Background Sync Engine<br>• Dynamic Alternative Bypass Routing & Bridge Tonnage/GVW Clearance Logic<br>• Multi-source incident corroboration & Anti-Rumor verification engine<br>• SIH submission compliance, UI/UX Gov-Navy institutional design system (GIGW 3.0 / WCAG AA) |
| **Team Member** | *[Collaborator Name]* | *[To be updated by teammate via Git contribution / pull request]* |
| **Team Member** | *[Collaborator Name]* | *[To be updated by teammate via Git contribution / pull request]* |
| **Team Member** | *[Collaborator Name]* | *[To be updated by teammate via Git contribution / pull request]* |
| **Team Member** | *[Collaborator Name]* | *[To be updated by teammate via Git contribution / pull request]* |
| **Team Member** | *[Collaborator Name]* | *[To be updated by teammate via Git contribution / pull request]* |

> *Note for Team Members:* Teammates can fork/clone the repository, update their respective rows in the table with their name and contributions, commit, and push so their GitHub profiles appear in the repository contributors and collaborator activity list.

---

## 🏔️ Overview

**NER-LOGIX** is a mission-critical logistics intelligence and accessibility management platform purpose-built for the unique geographic, climatic, and infrastructural challenges of Northeast India (Assam, Arunachal Pradesh, Meghalaya, Manipur, Mizoram, Nagaland, Tripura, and Sikkim).

The system integrates real-time geospatial data, satellite imagery, Doppler radar weather telemetry, and predictive risk modeling to ensure continuous supply chain continuity, disaster response readiness, and safe route planning across vulnerable mountainous terrains.

---

## 🏛️ System Architecture: Three Connected Modules

### **A. Government Command Center (For Officials & Engineers)**
- Full-screen GIS dashboard with live visibility over road conditions (`OPEN`, `RESTRICTED`, `BLOCKED`).
- **Action-Reaction SLA Telemetry Engine** tracking response times across 5 live milestones: *Reported → Acknowledged → Dispatched → Verified → Cleared* with <15 min target response.
- **8-State Readiness Matrix** across Assam, Arunachal Pradesh, Meghalaya, Manipur, Mizoram, Nagaland, Tripura, and Sikkim.
- **AI Route Intelligence & Bypass Optimization** calculating dynamic delays (+km, +mins) and bridge GVW capacity.

### **B. Field Operator Mobile App (For Ground Patrols & BRO)**
- Lightweight Progressive Web App (PWA) with **100% Offline-First Architecture (IndexedDB)**.
- **Client-Side 2G Adaptive Photo Compression**: Downscales 3.5 MB field images to ~38 KB in <400ms (98.9% bandwidth saving) for instant transmission over weak 2G cellular connections.
- Offline incident documentation with automatic GPS capture and background synchronization upon cellular reconnect.
- Multi-lingual field support (English, Assamese, Bengali, Hindi).

### **C. Traveler & Public Logistics Portal (For Citizens & Commercial Transporters)**
- **Safe Corridor Explorer (`/traveler`)**: Live passability status for vital arteries (NH-6, NH-13, NH-27, NH-10, NH-29) with interactive Gross Vehicle Weight (GVW) bridge tonnage calculator.
- **Road Disruption Bulletins (`/traveler/bulletins`)**: Live emergency bulletins from BRO, NHIDCL, and SDMAs with earthmover deployment status and clearance countdowns.
- **Mountain Weather & Doppler Radar (`/traveler/weather`)**: ISRO MOSDAC & IMD Doppler radar stream, flash flood threat index, and high-altitude pass visibility.
- **Highway Lifelines Directory (`/traveler/lifelines`)**: 24/7 verified trauma hospitals, high-altitude winter diesel depots, and BRO emergency shelters.
- **Digital Route Pass & 2G SMS Dispatch (`/traveler/offline-pass`)**: Cryptographic QR mountain transit pass with low-bandwidth 140-char SMS fallback string for zero-connectivity dead zones.

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
  2. **Field Operations Portal**: Ground road patrols, BRO task force units, local police.
  3. **Traveler & Public Access**: Commercial freight operators, emergency medical convoys, citizens & tourists.
- 256-bit encryption compliance and official identity verification notices.

### **Page 3: Government Portal Login (`/government-login`)**
- Authentic Government of India portal styling featuring the State Emblem of India and National Informatics Centre (NIC) aesthetics.
- **Dual Authentication Modes**:
  - *Officer ID & Password*: Pre-configured for emergency access (`OFF-NER-2024` / `Secure@NER2024`).
  - *Digital Identity (e-Pramaan / MeriPehchan)*: OTP-based mobile identity verification.
- Dynamic interactive Security Captcha validation.

### **Page 4: Government Command Center Overview (`/government-command-center`)**
- High-level executive dashboard for senior government leadership.
- **8-State Readiness Matrix**: Live accessibility indices, active alerts, and open corridors across all 8 Northeastern states.
- Macro metrics: Network Accessibility (82.4%), Vulnerable Corridors, Active Disruption Alerts, and In-Transit Strategic Convoys.
- Quick-launch banner into the operational Live Map.

### **Page 5: Live Accessibility Map (`/live-map`)**
- Interactive operational GIS command viewport:
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

### **Page 7: Fleet & Logistics Missions (`/logistics`)**
- Emergency supply convoy tracking, truck payload capacities, oxygen & cold-chain stock depletion forecasts, and live depot telemetry.

### **Page 8: Field Operations PWA (`/field`)**
- Ground reporting interface with offline IndexedDB storage, automated GPS lock, and camera compression.

### **Page 9: Traveler & Public Portal (`/traveler`)**
- Commercial freight clearance, road bulletins, radar weather models, 24/7 lifeline hotlines, and offline SMS transit passes.

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

## 🛠️ Technology Stack

- **Frontend**: React 18 / 19, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **Mapping & GIS**: Leaflet, MapLibre GL, GeoJSON, ISRO Bhuvan Tiles, OpenStreetMap
- **State & Offline Storage**: IndexedDB (Local offline buffer), Service Workers, LocalStorage
- **Backend & Auth**: Node.js, Express, REST APIs, WebSockets for live telemetry
- **Compliance & Standards**: GIGW 3.0, WCAG 2.1 AA, NDSAP Open Standards

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
   # Terminal 1: Start frontend
   npm run dev

   # Terminal 2: Start backend server (optional)
   node server/server.js
   ```

4. **Production Build**:
   ```bash
   npm run build
   ```

---

## 🏛️ Governance & Compliance

Built in compliance with the **National Data Sharing and Accessibility Policy (NDSAP)**, **Guidelines for Indian Government Websites (GIGW 3.0)**, and **Open Geospatial Consortium (OGC)** open standards for disaster resilience in Northeast India.
