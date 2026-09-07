import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import { AccessPortalPage } from './pages/AccessPortalPage';
import { GovernmentLogin } from './pages/GovernmentLogin';
import { GovernmentOverview } from './pages/GovernmentOverview';
import { GovernmentCommandCenter } from './pages/GovernmentCommandCenter';
import { RouteIntelligencePage } from './pages/RouteIntelligencePage';
import { IncidentsPage } from './pages/IncidentsPage';
import { LogisticsOverviewPage } from './pages/logistics/LogisticsOverviewPage';
import { SupplyMissionsPage } from './pages/logistics/SupplyMissionsPage';
import { MissionDetailPage } from './pages/logistics/MissionDetailPage';
import { FleetVehiclesPage } from './pages/logistics/FleetVehiclesPage';
import { VehicleDetailPage } from './pages/logistics/VehicleDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/access-portal" element={<AccessPortalPage />} />
        <Route path="/government-login" element={<GovernmentLogin />} />
        <Route path="/government-command-center" element={<GovernmentOverview />} />
        <Route path="/live-map" element={<GovernmentCommandCenter />} />
        <Route path="/route-intelligence" element={<RouteIntelligencePage />} />
        <Route path="/incidents" element={<IncidentsPage />} />
        
        {/* Logistics & Fleet Module */}
        <Route path="/logistics" element={<LogisticsOverviewPage />} />
        <Route path="/logistics/missions" element={<SupplyMissionsPage />} />
        <Route path="/logistics/missions/:missionId" element={<MissionDetailPage />} />
        <Route path="/logistics/vehicles" element={<FleetVehiclesPage />} />
        <Route path="/logistics/vehicles/:vehicleId" element={<VehicleDetailPage />} />

        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/access-portal" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
