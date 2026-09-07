import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import { AccessPortalPage } from './pages/AccessPortalPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/access-portal" element={<AccessPortalPage />} />
        <Route path="*" element={<Navigate to="/access-portal" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
