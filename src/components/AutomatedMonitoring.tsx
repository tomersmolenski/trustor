import React, { useState } from 'react';
import { 
  Activity, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Zap,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Clock,
  Shield,
  Database,
  Cloud,
  Users,
  Lock,
  Eye,
  Filter
} from 'lucide-react';

const AutomatedMonitoring: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const monitoringCategories = [
    { id: 'all', name: 'All Checks', icon: Activity, count: 47 },
    { id: 'infrastructure', name: 'Infrastructure', icon: Cloud, count: 12 },
    { id: 'access', name: 'Access Control', icon: Lock, count: 15 },
    { id: 'data', name: 'Data Protection', icon: Database, count: 8 },
    { id: 'security', name: 'Security Policies', icon: Shield, count: 12 }
  ];

  const automatedChecks = [
    {
      id: 1,
      name: 'AWS Security Groups Configuration',
      category: 'infrastructure',
      status: 'passing',
      lastCheck: '2 minutes ago',
      frequency: 'Every 5 minutes',
      description: 'Monitors security group rules for compliance violations',
      framework: 'SOC 2',
      severity: 'high',
      automated: true,
      evidence: 'security-groups-config.json'
    },
    {
      id: 2,
      name: 'Employee Access Review',
      category: 'access',
      status: 'passing',
      lastCheck: '1 hour ago',
      frequency: 'Daily',
      description: 'Validates user access permissions and role assignments',
      framework: 'ISO 27001',
      severity: 'critical',
      automated: true,
      evidence: 'access-review-report.pdf'
    },
    {
      id: 3,
      name: 'Data Encryption at Rest',
      category: 'data',
      status: 'passing',
      lastCheck: '5 minutes ago',
      frequency: 'Every 10 minutes',
      description: 'Verifies encryption status of stored data',
      framework: 'GDPR',
      severity: 'critical',
      automated: true,
      evidence: 'encryption-status.json'
    },
    {
      id: 4,
      name: 'Password Policy Compliance',
      category: 'security',
      status: 'failing',
      lastCheck: '10 minutes ago',
      frequency: 'Every 30 minutes',
      description: 'Checks password strength requirements across systems',
      framework: 'HIPAA',
      severity: 'medium',
      automated: true,
      evidence: 'password-audit.csv'
    },
    {
      id: 5,
      name: 'Multi-Factor Authentication',
      category: 'access',
      status: 'passing',
      lastCheck: '3 minutes ago',
      frequency: 'Every 15 minutes',
      description: 'Monitors MFA enforcement across all user accounts',
      framework: 'SOC 2',
      severity: 'high',
      automated: true,
      evidence: 'mfa-status.json'
    },
    {
      id: 6,
      name: 'Backup Verification',
      category: 'data',
      status: 'warning',
      lastCheck: '30 minutes ago',
      frequency: 'Every 6 hours',
      description: 'Validates backup integrity and restoration capabilities',
      framework: 'ISO 27001',
      severity: 'high',
      automated: true,
      evidence: 'backup-verification.log'
    },
    {
      id: 7,
      name: 'Vulnerability Scanning',
      category: 'security',
      status: 'passing',
      lastCheck: '2 hours ago',
      frequency: 'Daily',
      description: 'Automated security vulnerability assessment',
      framework: 'SOC 2',
      severity: 'critical',
      automated: true,
      evidence: 'vuln-scan-results.json'
    },
    {
      id: 8,
      name: 'Log Monitoring & Retention',
      category: 'infrastructure',
      status: 'passing',
      lastCheck: '1 minute ago',
      frequency: 'Continuous',
      description: 'Monitors log collection and retention policies',
      framework: 'GDPR',
      severity: 'medium',
      automated: true,
      evidence: 'log-retention-report.json'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passing': return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case 'failing': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default: return <Clock className="h-5 w-5 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passing': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'failing': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const filteredChecks = automatedChecks.filter(check => {
    const matchesCategory = selectedCategory === 'all' || check.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || check.status === selectedStatus;
    return matchesCategory && matchesStatus;
  });

  const statusCounts = {
    passing: automatedChecks.filter(c => c.status === 'passing').length,
    failing: automatedChecks.filter(c => c.status === 'failing').length,
    warning: automatedChecks.filter(c => c.status === 'warning').length
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Automated Monitoring</h1>
            <p className="text-slate-600">Real-time compliance monitoring and automated evidence collection</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Configure</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Play className="h-4 w-4" />
              <span>Run All Checks</span>
            </button>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-emerald-50 p-3 rounded-xl">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-emerald-600 font-medium">Live</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">{statusCounts.passing}</h3>
          <p className="text-slate-600 text-sm">Passing Checks</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-50 p-3 rounded-xl">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <RefreshCw className="h-4 w-4 text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">{statusCounts.failing}</h3>
          <p className="text-slate-600 text-sm">Failing Checks</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-50 p-3 rounded-xl">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <Clock className="h-4 w-4 text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">{statusCounts.warning}</h3>
          <p className="text-slate-600 text-sm">Warnings</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-50 p-3 rounded-xl">
              <Zap className="h-6 w-6 text-blue-600" />
            </div>
            <Activity className="h-4 w-4 text-slate-400" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-1">47</h3>
          <p className="text-slate-600 text-sm">Total Automated</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Filter by:</span>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              {monitoringCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.count})
                </option>
              ))}
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Status</option>
              <option value="passing">Passing</option>
              <option value="failing">Failing</option>
              <option value="warning">Warning</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button className="bg-slate-100 text-slate-700 px-3 py-2 rounded-lg hover:bg-slate-200 transition-colors text-sm">
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Monitoring Checks */}
      <div className="space-y-4">
        {filteredChecks.map((check) => (
          <div key={check.id} className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(check.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">{check.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(check.status)}`}>
                      {check.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(check.severity)}`}>
                      {check.severity}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-3">{check.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-slate-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Last check: {check.lastCheck}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RefreshCw className="h-4 w-4" />
                      <span>Frequency: {check.frequency}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Shield className="h-4 w-4" />
                      <span>Framework: {check.framework}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
                  <Settings className="h-4 w-4" />
                </button>
                <button className="p-2 text-blue-600 hover:text-blue-800 transition-colors">
                  <Play className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="border-t border-slate-200 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-slate-600">Automated Evidence Collection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Database className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-slate-600">{check.evidence}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Evidence
                  </button>
                  <button className="text-slate-600 hover:text-slate-800 text-sm">
                    Configure
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutomatedMonitoring;