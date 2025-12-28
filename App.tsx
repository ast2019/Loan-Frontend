import React from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import TermsPage from './pages/TermsPage';
import LoginMobilePage from './pages/LoginMobilePage';
import LoginOtpPage from './pages/LoginOtpPage';
import DashboardPage from './pages/DashboardPage';
import NewLoanRequestPage from './pages/NewLoanRequestPage';
import LoanRequestDetailPage from './pages/LoanRequestDetailPage';
import { authApi } from './services/apiClient';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = authApi.isAuthenticated();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout isAuthenticated={false} />}>
          <Route path="/" element={<TermsPage />} />
          <Route path="/auth/login" element={<LoginMobilePage />} />
          <Route path="/auth/otp" element={<LoginOtpPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<Layout isAuthenticated={true} />}>
          <Route 
            path="/app" 
            element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} 
          />
          <Route 
            path="/app/new-request" 
            element={<ProtectedRoute><NewLoanRequestPage /></ProtectedRoute>} 
          />
          <Route 
            path="/app/request" 
            element={<ProtectedRoute><LoanRequestDetailPage /></ProtectedRoute>} 
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;