import React, { useState } from 'react';
import { 
  Database, 
  Download, 
  Upload, 
  FileText, 
  Image,
  Video,
  Archive,
  Search,
  Filter,
  Calendar,
  Tag,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Share,
  Trash2,
  Plus
} from 'lucide-react';

const EvidenceCollection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedFramework, setSelectedFramework] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const evidenceItems = [
    {
      id: 1,
      name: 'AWS Security Groups Configuration',
      type: 'json',
      framework: 'SOC 2',
      category: 'Infrastructure',
      size: '2.4 KB',
      lastUpdated: '2 minutes ago',
      status: 'current',
      automated: true,
      description: 'Automated collection of security group rules and configurations',
      tags: ['aws', 'security-groups', 'infrastructure'],
      control: 'CC6.1 - Logical Access Controls'
    },
    {
      id: 2,
      name: 'Employee Access Review Report',
      type: 'pdf',
      framework: 'ISO 27001',
      category: 'Access Control',
      size: '1.2 MB',
      lastUpdated: '1 hour ago',
      status: 'current',
      automated: false,
      description: 'Quarterly review of user access permissions and role assignments',
      tags: ['access-control', 'user-management', 'quarterly'],
      control: 'A.9.2.5 - Review of user access rights'
    },
    {
      id: 3,
      name: 'Data Encryption Status Report',
      type: 'json',
      framework: 'GDPR',
      category: 'Data Protection',
      size: '856 B',
      lastUpdated: '5 minutes ago',
      status: 'current',
      automated: true,
      description: 'Real-time status of data encryption at rest and in transit',
      tags: ['encryption', 'data-protection', 'gdpr'],
      control: 'Article 32 - Security of processing'
    },
    {
      id: 4,
      name: 'Vulnerability Scan Results',
      type: 'json',
      framework: 'SOC 2',
      category: 'Security Assessment',
      size: '45.2 KB',
      lastUpdated: '2 hours ago',
      status: 'current',
      automated: true,
      description: 'Automated vulnerability assessment of infrastructure components',
      tags: ['vulnerability', 'security-scan', 'assessment'],
      control: 'CC7.1 - System Monitoring'
    },
    {
      id: 5,
      name: 'Backup Verification Log',
      type: 'log',
      framework: 'ISO 27001',
      category: 'Business Continuity',
      size: '12.8 KB',
      lastUpdated: '30 minutes ago',
      status: 'warning',
      automated: true,
      description: 'Automated backup integrity verification and restoration testing',
      tags: ['backup', 'business-continuity', 'verification'],
      control: 'A.12.3.1 - Information backup'
    },
    {
      id: 6,
      name: 'Privacy Impact Assessment',
      type: 'pdf',
      framework: 'GDPR',
      category: 'Privacy',
      size: '3.7 MB',
      lastUpdated: '1 day ago',
      status: 'current',
      automated: false,
      description: 'Comprehensive privacy impact assessment for new data processing activities',
      tags: ['privacy', 'pia', 'data-processing'],
      control: 'Article 35 - Data protection impact assessment'
    },
    {
      id: 7,
      name: 'Incident Response Procedures',
      type: 'pdf',
      framework: 'HIPAA',
      category: 'Incident Management',
      size: '2.1 MB',
      lastUpdated: '3 days ago',
      status: 'current',
      automated: false,
      description: 'Updated incident response procedures and contact information',
      tags: ['incident-response', 'procedures', 'hipaa'],
      control: '164.308(a)(6) - Security incident procedures'
    },
    {
      id: 8,
      name: 'Network Security Monitoring',
      type: 'json',
      framework: 'SOC 2',
      category: 'Network Security',
      size: '8.9 KB',
      lastUpdated: '15 minutes ago',
      status: 'current',
      automated: true,
      description: 'Continuous monitoring of network traffic and security events',
      tags: ['network', 'monitoring', 'security-events'],
      control: 'CC6.7 - Network Security'
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="h-5 w-5 text-red-500" />;
      case 'json': return <Database className="h-5 w-5 text-blue-500" />;
      case 'log': return <Archive className="h-5 w-5 text-green-500" />;
      case 'image': return <Image className="h-5 w-5 text-purple-500" />;
      case 'video': return <Video className="h-5 w-5 text-orange-500" />;
      default: return <FileText className="h-5 w-5 text-slate-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'current': return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'outdated': return <Clock className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current': return 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'warning': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'outdated': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800';
      default: return 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-600';
    }
  };

  const filteredEvidence = evidenceItems.filter(item => {
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'automated' && item.automated) ||
      (selectedFilter === 'manual' && !item.automated) ||
      (selectedFilter === 'current' && item.status === 'current') ||
      (selectedFilter === 'warning' && item.status === 'warning');
    
    const matchesFramework = selectedFramework === 'all' || item.framework === selectedFramework;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesFramework && matchesSearch;
  });

  const stats = {
    total: evidenceItems.length,
    automated: evidenceItems.filter(item => item.automated).length,
    current: evidenceItems.filter(item => item.status === 'current').length,
    warnings: evidenceItems.filter(item => item.status === 'warning').length
  };

  return (
    <div className="p-8 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Evidence Collection</h1>
            <p className="text-slate-600 dark:text-slate-400">Automated and manual evidence collection for compliance frameworks</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2">
              <Upload className="h-4 w-4" />
              <span>Upload Evidence</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Collect Evidence</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl">
              <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{stats.total}</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Total Evidence Items</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-xl">
              <Database className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">Auto</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{stats.automated}</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Automated Collection</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-xl">
              <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{stats.current}</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Current Evidence</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-xl">
              <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{stats.warnings}</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Needs Attention</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="h-5 w-5 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search evidence..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            >
              <option value="all">All Evidence</option>
              <option value="automated">Automated Only</option>
              <option value="manual">Manual Only</option>
              <option value="current">Current</option>
              <option value="warning">Needs Attention</option>
            </select>

            <select
              value={selectedFramework}
              onChange={(e) => setSelectedFramework(e.target.value)}
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            >
              <option value="all">All Frameworks</option>
              <option value="SOC 2">SOC 2</option>
              <option value="ISO 27001">ISO 27001</option>
              <option value="GDPR">GDPR</option>
              <option value="HIPAA">HIPAA</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm">
              Export All
            </button>
            <button className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm flex items-center space-x-1">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Evidence Items */}
      <div className="space-y-4">
        {filteredEvidence.map((item) => (
          <div key={item.id} className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getFileIcon(item.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                      <span className="ml-1">{item.status}</span>
                    </span>
                    {item.automated && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300">
                        Automated
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 mb-3">{item.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-slate-500 dark:text-slate-400 mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Updated: {item.lastUpdated}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Archive className="h-4 w-4" />
                      <span>Size: {item.size}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4" />
                      <span>Framework: {item.framework}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Control:</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">{item.control}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Tag className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                    <div className="flex flex-wrap gap-1">
                      {item.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                  <Eye className="h-4 w-4" />
                </button>
                <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                  <Share className="h-4 w-4" />
                </button>
                <button className="p-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvidence.length === 0 && (
        <div className="text-center py-12">
          <Database className="h-12 w-12 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No evidence found</h3>
          <p className="text-slate-600 dark:text-slate-400">Try adjusting your search criteria or upload new evidence.</p>
        </div>
      )}
    </div>
  );
};

export default EvidenceCollection;