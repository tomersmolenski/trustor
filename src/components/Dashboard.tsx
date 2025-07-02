import React from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Shield,
  FileText,
  Calendar,
  Users,
  Zap,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Play
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Overall Compliance',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: Shield,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      title: 'Active Controls',
      value: '342',
      change: '+23',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Evidence Collected',
      value: '1,247',
      change: '+156',
      trend: 'up',
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      title: 'Risk Score',
      value: '2.3',
      change: '-0.4',
      trend: 'down',
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    }
  ];

  const recentActivity = [
    { 
      action: 'AWS security group automatically updated', 
      time: '5 minutes ago', 
      type: 'automated',
      status: 'success'
    },
    { 
      action: 'Employee access review completed', 
      time: '2 hours ago', 
      type: 'manual',
      status: 'success'
    },
    { 
      action: 'SOC 2 evidence collection in progress', 
      time: '4 hours ago', 
      type: 'automated',
      status: 'pending'
    },
    { 
      action: 'GDPR data mapping updated', 
      time: '1 day ago', 
      type: 'manual',
      status: 'success'
    }
  ];

  const complianceFrameworks = [
    { 
      name: 'SOC 2 Type II', 
      progress: 89, 
      status: 'Audit Ready', 
      color: 'bg-emerald-500',
      nextMilestone: 'Final review',
      daysLeft: 12
    },
    { 
      name: 'ISO 27001', 
      progress: 76, 
      status: 'In Progress', 
      color: 'bg-blue-500',
      nextMilestone: 'Risk assessment',
      daysLeft: 28
    },
    { 
      name: 'GDPR', 
      progress: 94, 
      status: 'Compliant', 
      color: 'bg-green-500',
      nextMilestone: 'Annual review',
      daysLeft: 45
    },
    { 
      name: 'HIPAA', 
      progress: 67, 
      status: 'Needs Attention', 
      color: 'bg-orange-500',
      nextMilestone: 'Security training',
      daysLeft: 7
    }
  ];

  const automatedChecks = [
    { name: 'AWS Security Groups', status: 'passing', lastCheck: '2 min ago' },
    { name: 'Employee Access Reviews', status: 'passing', lastCheck: '1 hour ago' },
    { name: 'Encryption at Rest', status: 'passing', lastCheck: '5 min ago' },
    { name: 'Password Policies', status: 'failing', lastCheck: '10 min ago' },
    { name: 'Multi-Factor Authentication', status: 'passing', lastCheck: '3 min ago' }
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Compliance Dashboard</h1>
            <p className="text-slate-600">Real-time monitoring of your security and compliance posture</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>View All</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Play className="h-4 w-4" />
              <span>Run Assessment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;
          return (
            <div key={index} className={`bg-white rounded-xl p-6 border ${stat.borderColor} hover:shadow-lg transition-all duration-200`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-xl`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className={`flex items-center space-x-1 ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
                  <TrendIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">{stat.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
              <p className="text-slate-600 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Compliance Frameworks */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Compliance Frameworks</h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {complianceFrameworks.map((framework, index) => (
              <div key={index} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${framework.color}`}></div>
                    <span className="font-medium text-slate-900">{framework.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      framework.status === 'Compliant' || framework.status === 'Audit Ready'
                        ? 'bg-emerald-100 text-emerald-800'
                        : framework.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {framework.status}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-slate-900">{framework.progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
                  <div 
                    className={`${framework.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${framework.progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Next: {framework.nextMilestone}</span>
                  <span className="text-slate-500">{framework.daysLeft} days left</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Automated Monitoring */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Live Monitoring</h2>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-emerald-600 font-medium">Live</span>
            </div>
          </div>
          <div className="space-y-3">
            {automatedChecks.map((check, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    check.status === 'passing' ? 'bg-emerald-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-sm font-medium text-slate-900">{check.name}</span>
                </div>
                <span className="text-xs text-slate-500">{check.lastCheck}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-slate-100 text-slate-700 py-2 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium">
            View All Checks
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  {activity.type === 'automated' ? (
                    <Zap className="h-4 w-4 text-blue-500" />
                  ) : (
                    <Users className="h-4 w-4 text-purple-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-xs text-slate-500">{activity.time}</p>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      activity.status === 'success' 
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3">
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all text-left group">
              <div className="flex items-center justify-between">
                <div>
                  <FileText className="h-6 w-6 mb-2" />
                  <h3 className="font-semibold">Generate Policy</h3>
                  <p className="text-sm text-blue-100">Create compliance documents</p>
                </div>
                <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
            <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white p-4 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all text-left group">
              <div className="flex items-center justify-between">
                <div>
                  <Activity className="h-6 w-6 mb-2" />
                  <h3 className="font-semibold">Run Security Scan</h3>
                  <p className="text-sm text-emerald-100">Automated vulnerability check</p>
                </div>
                <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
            <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all text-left group">
              <div className="flex items-center justify-between">
                <div>
                  <Calendar className="h-6 w-6 mb-2" />
                  <h3 className="font-semibold">Schedule Audit</h3>
                  <p className="text-sm text-purple-100">Plan compliance review</p>
                </div>
                <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;