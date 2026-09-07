import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import { AccessPortalPage } from './pages/AccessPortalPage';
import { GovernmentLogin } from './pages/GovernmentLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/access-portal" element={<AccessPortalPage />} />
        <Route path="/government-login" element={<GovernmentLogin />} />
        <Route path="*" element={<Navigate to="/access-portal" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
