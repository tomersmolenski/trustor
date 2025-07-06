import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ClientProvider } from './contexts/ClientContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginForm from './components/Auth/LoginForm';
import SignUpForm from './components/Auth/SignUpForm';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ComplianceFrameworks from './components/ComplianceFrameworks';
import DocumentGenerator from './components/DocumentGenerator';
import Reports from './components/Reports';
import AuditReminders from './components/AuditReminders';
import Settings from './components/Settings';
import AutomatedMonitoring from './components/AutomatedMonitoring';
import EvidenceCollection from './components/EvidenceCollection';
import UserManagement from './components/UserManagement';
import Billing from './components/Billing';
import ClientManagement from './components/ClientManagement';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return authMode === 'login' ? (
      <LoginForm onToggleMode={() => setAuthMode('signup')} />
    ) : (
      <SignUpForm onToggleMode={() => setAuthMode('login')} />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'frameworks':
        return <ComplianceFrameworks />;
      case 'monitoring':
        return <AutomatedMonitoring />;
      case 'evidence':
        return <EvidenceCollection />;
      case 'documents':
        return <DocumentGenerator />;
      case 'reports':
        return <Reports />;
      case 'audits':
        return <AuditReminders />;
      case 'users':
        return <UserManagement />;
      case 'clients':
        return <ClientManagement />;
      case 'billing':
        return <Billing />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-hidden">
        <main className="h-full overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ClientProvider>
          <AppContent />
        </ClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;