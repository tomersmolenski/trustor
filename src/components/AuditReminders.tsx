import React, { useState } from 'react';
import { 
  Calendar, 
  Bell, 
  Plus, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Filter,
  Search
} from 'lucide-react';

const AuditReminders: React.FC = () => {
  const [selectedView, setSelectedView] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');

  const upcomingAudits = [
    {
      id: 1,
      title: 'ISO 27001 Annual Audit',
      framework: 'ISO 27001',
      date: '2024-06-15',
      time: '09:00 AM',
      auditor: 'CertifySecure Ltd.',
      priority: 'High',
      status: 'Scheduled',
      daysUntil: 45,
      preparationTasks: [
        'Update risk assessment documentation',
        'Review access control policies',
        'Prepare evidence files'
      ]
    },
    {
      id: 2,
      title: 'GDPR Compliance Review',
      framework: 'GDPR',
      date: '2024-05-20',
      time: '02:00 PM',
      auditor: 'Privacy Partners',
      priority: 'Medium',
      status: 'Scheduled',
      daysUntil: 20,
      preparationTasks: [
        'Review data processing activities',
        'Update privacy notices',
        'Test data breach procedures'
      ]
    },
    {
      id: 3,
      title: 'HIPAA Security Assessment',
      framework: 'HIPAA',
      date: '2024-07-10',
      time: '10:00 AM',
      auditor: 'HealthSec Auditors',
      priority: 'High',
      status: 'Preparing',
      daysUntil: 70,
      preparationTasks: [
        'Conduct risk analysis',
        'Review workforce training records',
        'Update business associate agreements'
      ]
    },
    {
      id: 4,
      title: 'SOC 2 Type II Examination',
      framework: 'SOC 2',
      date: '2024-08-30',
      time: '09:00 AM',
      auditor: 'Trust Assurance Group',
      priority: 'Critical',
      status: 'Planning',
      daysUntil: 120,
      preparationTasks: [
        'Implement security controls',
        'Document control procedures',
        'Conduct readiness assessment'
      ]
    }
  ];

  const pastAudits = [
    {
      id: 5,
      title: 'GDPR Annual Review',
      framework: 'GDPR',
      date: '2024-02-15',
      auditor: 'Privacy Partners',
      result: 'Passed',
      score: 94,
      findings: 2
    },
    {
      id: 6,
      title: 'ISO 27001 Surveillance Audit',
      framework: 'ISO 27001',
      date: '2024-01-20',
      auditor: 'CertifySecure Ltd.',
      result: 'Passed',
      score: 89,
      findings: 3
    }
  ];

  const reminders = [
    {
      id: 1,
      title: 'ISO 27001 Audit Preparation',
      message: 'Start preparing documentation for upcoming audit',
      date: '2024-05-01',
      priority: 'High',
      type: 'preparation'
    },
    {
      id: 2,
      title: 'GDPR Training Reminder',
      message: 'Schedule quarterly privacy training for staff',
      date: '2024-04-15',
      priority: 'Medium',
      type: 'training'
    },
    {
      id: 3,
      title: 'Policy Review Due',
      message: 'Annual review of information security policies',
      date: '2024-04-30',
      priority: 'Medium',
      type: 'review'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300';
      case 'high': return 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300';
      default: return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300';
      case 'preparing': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300';
      case 'planning': return 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="p-8 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Audit & Reminders</h1>
        <p className="text-slate-600 dark:text-slate-400">Stay on top of your compliance obligations and audit schedules</p>
      </div>

      {/* View Tabs */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 mb-6">
        <div className="flex border-b border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setSelectedView('upcoming')}
            className={`px-6 py-3 font-medium text-sm ${
              selectedView === 'upcoming'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Upcoming Audits
          </button>
          <button
            onClick={() => setSelectedView('reminders')}
            className={`px-6 py-3 font-medium text-sm ${
              selectedView === 'reminders'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Reminders
          </button>
          <button
            onClick={() => setSelectedView('history')}
            className={`px-6 py-3 font-medium text-sm ${
              selectedView === 'history'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Audit History
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="h-5 w-5 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search audits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Schedule Audit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content based on selected view */}
      {selectedView === 'upcoming' && (
        <div className="space-y-6">
          {upcomingAudits.map((audit) => (
            <div key={audit.id} className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{audit.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{audit.framework} • {audit.auditor}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1 text-slate-600 dark:text-slate-400">
                        <Calendar className="h-4 w-4" />
                        <span>{audit.date} at {audit.time}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-slate-600 dark:text-slate-400">
                        <Clock className="h-4 w-4" />
                        <span>{audit.daysUntil} days until</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(audit.priority)}`}>
                    {audit.priority}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(audit.status)}`}>
                    {audit.status}
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <h4 className="font-medium text-slate-900 dark:text-white mb-3">Preparation Tasks</h4>
                <div className="space-y-2">
                  {audit.preparationTasks.map((task, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-4 h-4 border-2 border-slate-300 dark:border-slate-600 rounded"></div>
                      <span className="text-slate-700 dark:text-slate-300">{task}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button className="px-4 py-2 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  View Details
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Start Preparation
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedView === 'reminders' && (
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div key={reminder.id} className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded-lg">
                  <Bell className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white">{reminder.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{reminder.message}</p>
                  <p className="text-slate-500 dark:text-slate-500 text-xs mt-1">Due: {reminder.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(reminder.priority)}`}>
                  {reminder.priority}
                </span>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm">
                  Mark Complete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedView === 'history' && (
        <div className="space-y-4">
          {pastAudits.map((audit) => (
            <div key={audit.id} className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-white">{audit.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{audit.framework} • {audit.auditor}</p>
                    <p className="text-slate-500 dark:text-slate-500 text-xs">{audit.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      audit.result === 'Passed' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300'
                    }`}>
                      {audit.result}
                    </span>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">{audit.score}%</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-500 text-xs">{audit.findings} findings</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuditReminders;