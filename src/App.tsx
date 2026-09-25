import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import { AccessPortalPage } from './pages/AccessPortalPage';
import { GovernmentLogin } from './pages/GovernmentLogin';
import { GovernmentOverview } from './pages/GovernmentOverview';
import { GovernmentCommandCenter } from './pages/GovernmentCommandCenter';
import { RouteIntelligencePage } from './pages/RouteIntelligencePage';
import { IncidentsPage } from './pages/IncidentsPage';
import { AlertsPage } from './pages/AlertsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { DataIntegrationPage } from './pages/DataIntegrationPage';
import { AdminPage } from './pages/AdminPage';
import { LogisticsOverviewPage } from './pages/logistics/LogisticsOverviewPage';
import { SupplyMissionsPage } from './pages/logistics/SupplyMissionsPage';
import { MissionDetailPage } from './pages/logistics/MissionDetailPage';
import { FleetVehiclesPage } from './pages/logistics/FleetVehiclesPage';
import { VehicleDetailPage } from './pages/logistics/VehicleDetailPage';
import { StockDepletionPage } from './pages/logistics/StockDepletionPage';
import { LanguageProvider } from './field-ops/features/language/LanguageContext';
import { Layout as FieldLayout } from './field-ops/app/Layout';
import { FieldHome } from './field-ops/pages/FieldHome';
import { ReportIncident } from './field-ops/pages/ReportIncident';
import { MyReports } from './field-ops/pages/MyReports';
import { ReportDetails } from './field-ops/pages/ReportDetails';
import { SyncQueue } from './field-ops/pages/SyncQueue';
import { FieldAlerts } from './field-ops/pages/FieldAlerts';

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
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/data-integration" element={<DataIntegrationPage />} />
        <Route path="/data-sources" element={<Navigate to="/data-integration" replace />} />
        <Route path="/admin" element={<AdminPage />} />
        
        {/* Logistics & Fleet Module */}
        <Route path="/logistics" element={<LogisticsOverviewPage />} />
        <Route path="/logistics/missions" element={<SupplyMissionsPage />} />
        <Route path="/logistics/missions/:missionId" element={<MissionDetailPage />} />
        <Route path="/logistics/vehicles" element={<FleetVehiclesPage />} />
        <Route path="/logistics/vehicles/:vehicleId" element={<VehicleDetailPage />} />
        <Route path="/logistics/stock" element={<StockDepletionPage />} />

        {/* Field Operations Mobile-First Module */}
        <Route
          path="/field"
          element={
            <LanguageProvider>
              <FieldLayout />
            </LanguageProvider>
          }
        >
          <Route index element={<FieldHome />} />
          <Route path="report" element={<ReportIncident />} />
          <Route path="reports" element={<MyReports />} />
          <Route path="reports/:id" element={<ReportDetails />} />
          <Route path="sync" element={<SyncQueue />} />
          <Route path="alerts" element={<FieldAlerts />} />
        </Route>
        <Route path="/field-operations" element={<Navigate to="/field" replace />} />
        <Route path="/field-operations/*" element={<Navigate to="/field" replace />} />

        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/access-portal" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
