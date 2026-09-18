import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from '../features/language/LanguageContext';
import { Layout } from './Layout';
import { FieldHome } from '../pages/FieldHome';
import { ReportIncident } from '../pages/ReportIncident';
import { MyReports } from '../pages/MyReports';
import { ReportDetails } from '../pages/ReportDetails';
import { SyncQueue } from '../pages/SyncQueue';
import { FieldAlerts } from '../pages/FieldAlerts';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/field" replace />} />
            <Route path="field" element={<FieldHome />} />
            <Route path="field/report" element={<ReportIncident />} />
            <Route path="field/reports" element={<MyReports />} />
            <Route path="field/reports/:id" element={<ReportDetails />} />
            <Route path="field/sync" element={<SyncQueue />} />
            <Route path="field/alerts" element={<FieldAlerts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
