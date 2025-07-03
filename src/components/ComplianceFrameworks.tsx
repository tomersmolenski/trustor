import React, { useState } from 'react';
import { 
  Shield, 
  ChevronRight, 
  CheckCircle, 
  Clock,
  FileText,
  Users,
  AlertTriangle,
  ArrowRight,
  Target,
  TrendingUp,
  Calendar,
  Zap,
  Activity,
  Database
} from 'lucide-react';

const ComplianceFrameworks: React.FC = () => {
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);

  const frameworks = [
    {
      id: 'soc2',
      name: 'SOC 2 Type II',
      description: 'Service Organization Control 2 - Security, Availability, Processing Integrity',
      progress: 89,
      totalControls: 67,
      implementedControls: 60,
      status: 'Audit Ready',
      nextAudit: '2024-06-15',
      color: 'bg-emerald-500',
      gradient: 'from-emerald-500 to-emerald-600',
      automatedControls: 45,
      riskScore: 'Low',
      domains: [
        { name: 'Security', progress: 95, controls: 25, automated: 20 },
        { name: 'Availability', progress: 88, controls: 12, automated: 10 },
        { name: 'Processing Integrity', progress: 85, controls: 8, automated: 6 },
        { name: 'Confidentiality', progress: 90, controls: 10, automated: 7 },
        { name: 'Privacy', progress: 82, controls: 12, automated: 2 }
      ]
    },
    {
      id: 'iso27001',
      name: 'ISO 27001',
      description: 'Information Security Management System',
      progress: 76,
      totalControls: 114,
      implementedControls: 87,
      status: 'In Progress',
      nextAudit: '2024-08-20',
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600',
      automatedControls: 65,
      riskScore: 'Medium',
      domains: [
        { name: 'Information Security Policies', progress: 100, controls: 2, automated: 1 },
        { name: 'Organization of Information Security', progress: 95, controls: 7, automated: 4 },
        { name: 'Human Resource Security', progress: 85, controls: 6, automated: 2 },
        { name: 'Asset Management', progress: 80, controls: 10, automated: 8 },
        { name: 'Access Control', progress: 75, controls: 14, automated: 12 },
        { name: 'Cryptography', progress: 90, controls: 2, automated: 2 }
      ]
    },
    {
      id: 'gdpr',
      name: 'GDPR',
      description: 'General Data Protection Regulation',
      progress: 94,
      totalControls: 35,
      implementedControls: 33,
      status: 'Compliant',
      nextAudit: '2024-05-20',
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600',
      automatedControls: 28,
      riskScore: 'Low',
      domains: [
        { name: 'Lawfulness of Processing', progress: 100, controls: 3, automated: 3 },
        { name: 'Data Subject Rights', progress: 95, controls: 8, automated: 6 },
        { name: 'Data Protection by Design', progress: 90, controls: 4, automated: 4 },
        { name: 'Data Breach Management', progress: 85, controls: 6, automated: 5 },
        { name: 'Privacy Impact Assessment', progress: 100, controls: 5, automated: 3 },
        { name: 'Data Transfer', progress: 95, controls: 9, automated: 7 }
      ]
    },
    {
      id: 'hipaa',
      name: 'HIPAA',
      description: 'Health Insurance Portability and Accountability Act',
      progress: 67,
      totalControls: 42,
      implementedControls: 28,
      status: 'Needs Attention',
      nextAudit: '2024-07-10',
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-orange-600',
      automatedControls: 18,
      riskScore: 'High',
      domains: [
        { name: 'Administrative Safeguards', progress: 75, controls: 8, automated: 3 },
        { name: 'Physical Safeguards', progress: 60, controls: 4, automated: 2 },
        { name: 'Technical Safeguards', progress: 70, controls: 6, automated: 5 },
        { name: 'Privacy Rule', progress: 65, controls: 12, automated: 4 },
        { name: 'Security Rule', progress: 68, controls: 8, automated: 3 },
        { name: 'Breach Notification', progress: 80, controls: 4, automated: 1 }
      ]
    }
  ];

  const selectedFrameworkData = frameworks.find(f => f.id === selectedFramework);

  return (
    <div className="p-8 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Compliance Hub</h1>
        <p className="text-slate-600 dark:text-slate-400">Manage and track your compliance across multiple frameworks with automated monitoring</p>
      </div>

      {!selectedFramework ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {frameworks.map((framework) => (
            <div key={framework.id} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`bg-gradient-to-br ${framework.gradient} p-4 rounded-xl`}>
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{framework.name}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{framework.description}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  framework.status === 'Compliant' || framework.status === 'Audit Ready'
                    ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300'
                    : framework.status === 'In Progress'
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'
                    : 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300'
                }`}>
                  {framework.status}
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Overall Progress</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">{framework.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                  <div 
                    className={`${framework.color} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${framework.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                  </div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{framework.implementedControls}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Implemented</p>
                </div>
                <div className="text-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Zap className="h-5 w-5 text-blue-500" />
                  </div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{framework.automatedControls}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Automated</p>
                </div>
                <div className="text-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Target className="h-5 w-5 text-purple-500" />
                  </div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{framework.totalControls}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Total Controls</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">Next audit: {framework.nextAudit}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className={`h-4 w-4 ${
                      framework.riskScore === 'Low' ? 'text-emerald-500' :
                      framework.riskScore === 'Medium' ? 'text-yellow-500' : 'text-red-500'
                    }`} />
                    <span className="text-sm text-slate-600 dark:text-slate-400">Risk: {framework.riskScore}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedFramework(framework.id)}
                className="w-full bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-300 py-3 px-4 rounded-lg hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-600 dark:hover:to-slate-500 transition-all duration-200 flex items-center justify-center space-x-2 group"
              >
                <span>View Details & Controls</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedFramework(null)}
            className="mb-6 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center space-x-2 group"
          >
            <ChevronRight className="h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Frameworks</span>
          </button>

          {selectedFrameworkData && (
            <div>
              {/* Framework Header */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-6">
                    <div className={`bg-gradient-to-br ${selectedFrameworkData.gradient} p-6 rounded-xl`}>
                      <Shield className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{selectedFrameworkData.name}</h2>
                      <p className="text-slate-600 dark:text-slate-400 text-lg">{selectedFrameworkData.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedFrameworkData.status === 'Compliant' || selectedFrameworkData.status === 'Audit Ready'
                            ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300'
                            : selectedFrameworkData.status === 'In Progress'
                            ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300'
                            : 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300'
                        }`}>
                          {selectedFrameworkData.status}
                        </span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">Next audit: {selectedFrameworkData.nextAudit}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-slate-900 dark:text-white">{selectedFrameworkData.progress}%</p>
                    <p className="text-slate-500 dark:text-slate-400">Complete</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedFrameworkData.implementedControls}</p>
                    <p className="text-slate-600 dark:text-slate-400">Implemented Controls</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                    <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedFrameworkData.automatedControls}</p>
                    <p className="text-slate-600 dark:text-slate-400">Automated Controls</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                    <Clock className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedFrameworkData.totalControls - selectedFrameworkData.implementedControls}</p>
                    <p className="text-slate-600 dark:text-slate-400">Remaining Controls</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800">
                    <AlertTriangle className={`h-8 w-8 mx-auto mb-2 ${
                      selectedFrameworkData.riskScore === 'Low' ? 'text-emerald-600 dark:text-emerald-400' :
                      selectedFrameworkData.riskScore === 'Medium' ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
                    }`} />
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{selectedFrameworkData.riskScore}</p>
                    <p className="text-slate-600 dark:text-slate-400">Risk Score</p>
                  </div>
                </div>
              </div>

              {/* Control Domains */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">Control Domains</h3>
                <div className="space-y-4">
                  {selectedFrameworkData.domains.map((domain, index) => (
                    <div key={index} className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-slate-900 dark:text-white text-lg">{domain.name}</h4>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Activity className="h-4 w-4 text-blue-500" />
                            <span className="text-sm text-slate-600 dark:text-slate-400">{domain.automated} automated</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Database className="h-4 w-4 text-purple-500" />
                            <span className="text-sm text-slate-600 dark:text-slate-400">{domain.controls} controls</span>
                          </div>
                          <span className="text-lg font-bold text-slate-900 dark:text-white">{domain.progress}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 mb-4">
                        <div 
                          className={`${selectedFrameworkData.color} h-3 rounded-full transition-all duration-500`}
                          style={{ width: `${domain.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {domain.progress === 100 && <CheckCircle className="h-5 w-5 text-emerald-500" />}
                          {domain.progress < 80 && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {Math.round(domain.controls * domain.progress / 100)} of {domain.controls} implemented
                          </span>
                        </div>
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm flex items-center space-x-1 group">
                          <span>View Controls</span>
                          <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ComplianceFrameworks;