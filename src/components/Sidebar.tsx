import React from 'react';
import { 
  LayoutDashboard, 
  Shield, 
  FileText, 
  BarChart3, 
  Calendar, 
  Settings,
  Zap,
  Activity,
  Database,
  CheckCircle2,
  Users,
  CreditCard,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { profile, signOut } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'frameworks', label: 'Compliance Hub', icon: Shield },
    { id: 'monitoring', label: 'Automated Monitoring', icon: Activity },
    { id: 'evidence', label: 'Evidence Collection', icon: Database },
    { id: 'documents', label: 'Policy Center', icon: FileText },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'audits', label: 'Audit Management', icon: Calendar },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'billing', label: 'Billing & Plans', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="w-72 bg-white border-r border-slate-200 flex flex-col">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">ComplianceOS</h1>
            <p className="text-slate-500 text-sm">Automated Security & Compliance</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 py-4">
        <div className="px-4 mb-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Compliance Score</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-green-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
              <span className="text-sm font-bold text-green-800">87%</span>
            </div>
          </div>
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600 font-medium'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="p-6 border-t border-slate-200 space-y-4">
        {/* User Profile */}
        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {profile?.full_name?.charAt(0) || profile?.email?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">
              {profile?.full_name || 'User'}
            </p>
            <p className="text-xs text-slate-500 truncate">{profile?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>

        {/* Upgrade CTA */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-4 text-white">
          <div className="flex items-center space-x-2 mb-3">
            <Zap className="h-5 w-5 text-yellow-400" />
            <h3 className="font-semibold text-sm">Upgrade to Pro</h3>
          </div>
          <p className="text-slate-300 text-xs mb-3">Unlock advanced automation and unlimited frameworks</p>
          <button 
            onClick={() => setActiveTab('billing')}
            className="w-full bg-white text-slate-900 text-sm py-2 rounded-lg hover:bg-slate-100 transition-colors font-medium"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;