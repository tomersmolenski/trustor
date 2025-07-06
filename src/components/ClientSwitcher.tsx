import React, { useState } from 'react';
import { 
  Building, 
  ChevronDown, 
  Plus, 
  Check,
  Settings,
  Users
} from 'lucide-react';
import { useClient } from '../contexts/ClientContext';

const ClientSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { clients, currentClient, switchClient, createClient, loading } = useClient();

  const [newClientData, setNewClientData] = useState({
    name: '',
    industry: '',
    size: '',
    description: ''
  });

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const client = await createClient(newClientData);
      switchClient(client.id);
      setShowCreateModal(false);
      setNewClientData({ name: '', industry: '', size: '', description: '' });
    } catch (error) {
      console.error('Error creating client:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-2 p-2 bg-slate-100 dark:bg-slate-700 rounded-lg animate-pulse">
        <div className="w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded-lg"></div>
        <div className="w-32 h-4 bg-slate-300 dark:bg-slate-600 rounded"></div>
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-3 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Building className="h-4 w-4 text-white" />
            </div>
            <div className="text-left">
              <p className="font-medium text-slate-900 dark:text-white text-sm">
                {currentClient?.name || 'Select Client'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {clients.length} client{clients.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <ChevronDown className={`h-4 w-4 text-slate-500 dark:text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
            <div className="p-2">
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide px-2 py-1">
                Your Clients
              </div>
              {clients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => {
                    switchClient(client.id);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                      <Building className="h-3 w-3 text-white" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-slate-900 dark:text-white text-sm">{client.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{client.user_role}</p>
                    </div>
                  </div>
                  {currentClient?.id === client.id && (
                    <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  )}
                </button>
              ))}
              
              <div className="border-t border-slate-200 dark:border-slate-700 mt-2 pt-2">
                <button
                  onClick={() => {
                    setShowCreateModal(true);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors text-blue-600 dark:text-blue-400"
                >
                  <Plus className="h-4 w-4" />
                  <span className="text-sm font-medium">Create New Client</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Client Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Create New Client</h2>
            
            <form onSubmit={handleCreateClient} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  value={newClientData.name}
                  onChange={(e) => setNewClientData({ ...newClientData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="Enter client name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Industry
                </label>
                <select
                  value={newClientData.industry}
                  onChange={(e) => setNewClientData({ ...newClientData, industry: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="">Select industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Financial Services">Financial Services</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Retail">Retail</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Company Size
                </label>
                <select
                  value={newClientData.size}
                  onChange={(e) => setNewClientData({ ...newClientData, size: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="">Select size</option>
                  <option value="1-10 employees">1-10 employees</option>
                  <option value="11-50 employees">11-50 employees</option>
                  <option value="51-200 employees">51-200 employees</option>
                  <option value="201-1000 employees">201-1000 employees</option>
                  <option value="1000+ employees">1000+ employees</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newClientData.description}
                  onChange={(e) => setNewClientData({ ...newClientData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  rows={3}
                  placeholder="Brief description of the client"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientSwitcher;