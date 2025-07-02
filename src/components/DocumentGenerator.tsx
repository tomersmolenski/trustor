import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle,
  Edit
} from 'lucide-react';

const DocumentGenerator: React.FC = () => {
  const [selectedFramework, setSelectedFramework] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const templates = [
    {
      id: 1,
      name: 'Information Security Policy',
      framework: 'ISO 27001',
      category: 'Policy',
      description: 'Comprehensive information security policy covering all organizational aspects',
      lastUpdated: '2024-03-15',
      status: 'Generated',
      downloads: 45
    },
    {
      id: 2,
      name: 'Data Processing Agreement',
      framework: 'GDPR',
      category: 'Agreement',
      description: 'Standard DPA template for data processing activities',
      lastUpdated: '2024-03-12',
      status: 'Draft',
      downloads: 23
    },
    {
      id: 3,
      name: 'Risk Assessment Template',
      framework: 'ISO 27001',
      category: 'Assessment',
      description: 'Comprehensive risk assessment methodology and templates',
      lastUpdated: '2024-03-10',
      status: 'Generated',
      downloads: 67
    },
    {
      id: 4,
      name: 'Privacy Notice',
      framework: 'GDPR',
      category: 'Notice',
      description: 'Customer-facing privacy notice template',
      lastUpdated: '2024-03-08',
      status: 'Generated',
      downloads: 89
    },
    {
      id: 5,
      name: 'Business Associate Agreement',
      framework: 'HIPAA',
      category: 'Agreement',
      description: 'BAA template for healthcare data processing',
      lastUpdated: '2024-03-05',
      status: 'Generated',
      downloads: 34
    },
    {
      id: 6,
      name: 'Security Controls Matrix',
      framework: 'SOC 2',
      category: 'Matrix',
      description: 'Comprehensive controls mapping for SOC 2 compliance',
      lastUpdated: '2024-03-03',
      status: 'In Progress',
      downloads: 12
    }
  ];

  const frameworks = ['All', 'ISO 27001', 'GDPR', 'HIPAA', 'SOC 2'];
  const categories = ['All', 'Policy', 'Agreement', 'Assessment', 'Notice', 'Matrix'];

  const filteredTemplates = templates.filter(template => {
    const matchesFramework = selectedFramework === 'all' || template.framework === selectedFramework;
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFramework && matchesCategory && matchesSearch;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Document Generator</h1>
        <p className="text-slate-600">Generate and manage compliance documents from templates</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="h-5 w-5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedFramework}
            onChange={(e) => setSelectedFramework(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {frameworks.map(framework => (
              <option key={framework} value={framework.toLowerCase()}>{framework}</option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category.toLowerCase()}>{category}</option>
            ))}
          </select>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Template</span>
          </button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{template.name}</h3>
                  <p className="text-sm text-slate-600">{template.framework}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                template.status === 'Generated' 
                  ? 'bg-green-100 text-green-800'
                  : template.status === 'Draft'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {template.status}
              </span>
            </div>

            <p className="text-slate-600 text-sm mb-4">{template.description}</p>

            <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{template.lastUpdated}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Download className="h-4 w-4" />
                <span>{template.downloads} downloads</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-sm">
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </button>
              <button className="flex-1 bg-slate-100 text-slate-700 py-2 px-3 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center space-x-2 text-sm">
                <Edit className="h-4 w-4" />
                <span>Customize</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No templates found</h3>
          <p className="text-slate-600">Try adjusting your search criteria or create a new template.</p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all text-left">
            <FileText className="h-6 w-6 mb-2" />
            <h3 className="font-semibold">Policy Generator</h3>
            <p className="text-sm text-blue-100">Create comprehensive policies</p>
          </button>
          <button className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg hover:from-green-600 hover:to-green-700 transition-all text-left">
            <CheckCircle className="h-6 w-6 mb-2" />
            <h3 className="font-semibold">Procedure Builder</h3>
            <p className="text-sm text-green-100">Build step-by-step procedures</p>
          </button>
          <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all text-left">
            <Download className="h-6 w-6 mb-2" />
            <h3 className="font-semibold">Bulk Export</h3>
            <p className="text-sm text-purple-100">Export multiple documents</p>
          </button>
          <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all text-left">
            <Edit className="h-6 w-6 mb-2" />
            <h3 className="font-semibold">Custom Template</h3>
            <p className="text-sm text-orange-100">Create from scratch</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentGenerator;