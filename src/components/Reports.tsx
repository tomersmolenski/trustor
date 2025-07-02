import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Filter,
  Calendar,
  PieChart,
  Activity,
  Target,
  AlertTriangle
} from 'lucide-react';

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedFramework, setSelectedFramework] = useState('all');

  const complianceMetrics = [
    { framework: 'ISO 27001', score: 87, change: '+5%', trend: 'up' },
    { framework: 'GDPR', score: 94, change: '+2%', trend: 'up' },
    { framework: 'HIPAA', score: 78, change: '-1%', trend: 'down' },
    { framework: 'SOC 2', score: 65, change: '+12%', trend: 'up' }
  ];

  const riskMetrics = [
    { level: 'Critical', count: 3, color: 'bg-red-500' },
    { level: 'High', count: 8, color: 'bg-orange-500' },
    { level: 'Medium', count: 15, color: 'bg-yellow-500' },
    { level: 'Low', count: 24, color: 'bg-green-500' }
  ];

  const auditHistory = [
    { framework: 'GDPR', date: '2024-02-15', result: 'Passed', score: 94 },
    { framework: 'ISO 27001', date: '2024-01-20', result: 'Passed', score: 89 },
    { framework: 'HIPAA', date: '2023-12-10', result: 'Minor Issues', score: 82 },
    { framework: 'SOC 2', date: '2023-11-05', result: 'In Progress', score: 65 }
  ];

  const documentStats = [
    { type: 'Policies', count: 45, updated: 12 },
    { type: 'Procedures', count: 78, updated: 23 },
    { type: 'Assessments', count: 34, updated: 8 },
    { type: 'Reports', count: 156, updated: 45 }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Reports & Analytics</h1>
        <p className="text-slate-600">Comprehensive insights into your compliance posture</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="1year">Last year</option>
            </select>
            
            <select
              value={selectedFramework}
              onChange={(e) => setSelectedFramework(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Frameworks</option>
              <option value="iso27001">ISO 27001</option>
              <option value="gdpr">GDPR</option>
              <option value="hipaa">HIPAA</option>
              <option value="soc2">SOC 2</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
            <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Compliance Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Compliance Scores</h2>
          <div className="space-y-4">
            {complianceMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-slate-900">{metric.framework}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-2xl font-bold text-slate-900">{metric.score}%</span>
                    <span className={`text-sm font-medium flex items-center space-x-1 ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      <TrendingUp className={`h-4 w-4 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                      <span>{metric.change}</span>
                    </span>
                  </div>
                </div>
                <div className="w-16 h-16">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeDasharray={`${metric.score}, 100`}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Risk Distribution</h2>
          <div className="space-y-4">
            {riskMetrics.map((risk, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${risk.color}`}></div>
                  <span className="font-medium text-slate-900">{risk.level} Risk</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-slate-900">{risk.count}</span>
                  <span className="text-sm text-slate-500">items</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span className="font-medium text-red-800">3 Critical risks require immediate attention</span>
            </div>
          </div>
        </div>
      </div>

      {/* Document Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Document Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            {documentStats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-slate-50 rounded-lg">
                <p className="text-2xl font-bold text-slate-900">{stat.count}</p>
                <p className="text-slate-600 text-sm">{stat.type}</p>
                <p className="text-xs text-green-600 mt-1">+{stat.updated} this month</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Recent Audit History</h2>
          <div className="space-y-3">
            {auditHistory.map((audit, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-slate-900">{audit.framework}</h3>
                  <p className="text-sm text-slate-600">{audit.date}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    audit.result === 'Passed' 
                      ? 'bg-green-100 text-green-800'
                      : audit.result === 'Minor Issues'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {audit.result}
                  </span>
                  <p className="text-sm text-slate-600 mt-1">{audit.score}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Report Actions */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Generate Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all text-left">
            <BarChart3 className="h-6 w-6 mb-2" />
            <h3 className="font-semibold">Compliance Summary</h3>
            <p className="text-sm text-blue-100">Overall compliance status</p>
          </button>
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all text-left">
            <Target className="h-6 w-6 mb-2" />
            <h3 className="font-semibold">Gap Analysis</h3>
            <p className="text-sm text-green-100">Identify compliance gaps</p>
          </button>
          <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all text-left">
            <Activity className="h-6 w-6 mb-2" />
            <h3 className="font-semibold">Risk Assessment</h3>
            <p className="text-sm text-purple-100">Detailed risk analysis</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;