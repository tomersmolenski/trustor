import React, { useState, useEffect } from 'react';
import { 
  Building, 
  Plus, 
  Search, 
  Users,
  Settings,
  Mail,
  Crown,
  Shield,
  Eye,
  UserCheck,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';
import { useClient } from '../contexts/ClientContext';
import { supabase } from '../lib/supabase';

interface ClientUser {
  id: string;
  user_id: string;
  role: string;
  joined_at: string;
  user_email: string;
  user_name: string;
}

interface ClientInvitation {
  id: string;
  email: string;
  role: string;
  invited_by: string;
  expires_at: string;
  created_at: string;
}

const ClientManagement: React.FC = () => {
  const { clients, currentClient, updateClient, inviteUserToClient } = useClient();
  const [activeTab, setActiveTab] = useState('overview');
  const [clientUsers, setClientUsers] = useState<ClientUser[]>([]);
  const [clientInvitations, setClientInvitations] = useState<ClientInvitation[]>([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('viewer');
  const [loading, setLoading] = useState(false);

  const [editData, setEditData] = useState({
    name: '',
    industry: '',
    size: '',
    description: '',
    website: '',
    address: ''
  });

  useEffect(() => {
    if (currentClient) {
      fetchClientUsers();
      fetchClientInvitations();
      setEditData({
        name: currentClient.name || '',
        industry: currentClient.industry || '',
        size: currentClient.size || '',
        description: currentClient.description || '',
        website: currentClient.website || '',
        address: currentClient.address || ''
      });
    }
  }, [currentClient]);

  const fetchClientUsers = async () => {
    if (!currentClient) return;

    try {
      const { data, error } = await supabase
        .from('client_users')
        .select(`
          *,
          user:auth.users(email, raw_user_meta_data)
        `)
        .eq('client_id', currentClient.id)
        .order('joined_at', { ascending: false });

      if (error) throw error;

      const usersWithDetails = data?.map(item => ({
        id: item.id,
        user_id: item.user_id,
        role: item.role,
        joined_at: item.joined_at,
        user_email: item.user?.email || '',
        user_name: item.user?.raw_user_meta_data?.full_name || item.user?.email?.split('@')[0] || ''
      })) || [];

      setClientUsers(usersWithDetails);
    } catch (error) {
      console.error('Error fetching client users:', error);
    }
  };

  const fetchClientInvitations = async () => {
    if (!currentClient) return;

    try {
      const { data, error } = await supabase
        .from('client_invitations')
        .select('*')
        .eq('client_id', currentClient.id)
        .is('accepted_at', null)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClientInvitations(data || []);
    } catch (error) {
      console.error('Error fetching client invitations:', error);
    }
  };

  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentClient) return;

    setLoading(true);
    try {
      await inviteUserToClient(currentClient.id, inviteEmail, inviteRole);
      setShowInviteModal(false);
      setInviteEmail('');
      setInviteRole('viewer');
      fetchClientInvitations();
    } catch (error) {
      console.error('Error inviting user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentClient) return;

    setLoading(true);
    try {
      await updateClient(currentClient.id, editData);
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating client:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('client_users')
        .update({ role: newRole })
        .eq('user_id', userId)
        .eq('client_id', currentClient?.id);

      if (error) throw error;
      fetchClientUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return <Crown className="h-4 w-4 text-purple-600 dark:text-purple-400" />;
      case 'admin': return <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />;
      case 'manager': return <UserCheck className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case 'auditor': return <Search className="h-4 w-4 text-orange-600 dark:text-orange-400" />;
      default: return <Eye className="h-4 w-4 text-slate-600 dark:text-slate-400" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300';
      case 'admin': return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300';
      case 'manager': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300';
      case 'auditor': return 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300';
      default: return 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300';
    }
  };

  if (!currentClient) {
    return (
      <div className="p-8 bg-slate-50 dark:bg-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Building className="h-12 w-12 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No Client Selected</h3>
          <p className="text-slate-600 dark:text-slate-400">Please select a client to manage.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Client Management</h1>
            <p className="text-slate-600 dark:text-slate-400">Manage {currentClient.name} settings and team members</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowEditModal(true)}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>Edit Client</span>
            </button>
            <button
              onClick={() => setShowInviteModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Invite User</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 mb-6">
        <div className="flex border-b border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'overview'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'users'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Team Members ({clientUsers.length})
          </button>
          <button
            onClick={() => setActiveTab('invitations')}
            className={`px-6 py-3 font-medium text-sm ${
              activeTab === 'invitations'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Pending Invitations ({clientInvitations.length})
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white mb-2">Client Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-slate-500 dark:text-slate-400">Name:</span>
                      <p className="font-medium text-slate-900 dark:text-white">{currentClient.name}</p>
                    </div>
                    {currentClient.industry && (
                      <div>
                        <span className="text-sm text-slate-500 dark:text-slate-400">Industry:</span>
                        <p className="font-medium text-slate-900 dark:text-white">{currentClient.industry}</p>
                      </div>
                    )}
                    {currentClient.size && (
                      <div>
                        <span className="text-sm text-slate-500 dark:text-slate-400">Size:</span>
                        <p className="font-medium text-slate-900 dark:text-white">{currentClient.size}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white mb-2">Team Statistics</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-slate-500 dark:text-slate-400">Total Members:</span>
                      <p className="font-medium text-slate-900 dark:text-white">{clientUsers.length}</p>
                    </div>
                    <div>
                      <span className="text-sm text-slate-500 dark:text-slate-400">Pending Invitations:</span>
                      <p className="font-medium text-slate-900 dark:text-white">{clientInvitations.length}</p>
                    </div>
                  </div>
                </div>
              </div>
              {currentClient.description && (
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white mb-2">Description</h3>
                  <p className="text-slate-600 dark:text-slate-400">{currentClient.description}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-4">
              {clientUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {user.user_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-white">{user.user_name}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{user.user_email}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-500">
                        Joined {new Date(user.joined_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(user.role)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </div>
                    {currentClient.user_role === 'owner' && user.role !== 'owner' && (
                      <select
                        value={user.role}
                        onChange={(e) => updateUserRole(user.user_id, e.target.value)}
                        className="text-xs border border-slate-300 dark:border-slate-600 rounded px-2 py-1 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      >
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="auditor">Auditor</option>
                        <option value="viewer">Viewer</option>
                      </select>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'invitations' && (
            <div className="space-y-4">
              {clientInvitations.length === 0 ? (
                <div className="text-center py-8">
                  <Mail className="h-12 w-12 text-slate-400 dark:text-slate-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No Pending Invitations</h3>
                  <p className="text-slate-600 dark:text-slate-400">All invitations have been accepted or expired.</p>
                </div>
              ) : (
                clientInvitations.map((invitation) => (
                  <div key={invitation.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center">
                        <Mail className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900 dark:text-white">{invitation.email}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Invited {new Date(invitation.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                          Expires {new Date(invitation.expires_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(invitation.role)}`}>
                        {invitation.role}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300">
                        Pending
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Invite User Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Invite Team Member</h2>
            
            <form onSubmit={handleInviteUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="user@company.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="viewer">Viewer</option>
                  <option value="auditor">Auditor</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Invite'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Client Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Edit Client Information</h2>
            
            <form onSubmit={handleUpdateClient} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Industry
                  </label>
                  <select
                    value={editData.industry}
                    onChange={(e) => setEditData({ ...editData, industry: e.target.value })}
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
                    value={editData.size}
                    onChange={(e) => setEditData({ ...editData, size: e.target.value })}
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
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={editData.website}
                  onChange={(e) => setEditData({ ...editData, website: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Address
                </label>
                <textarea
                  value={editData.address}
                  onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  rows={2}
                  placeholder="Company address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  rows={3}
                  placeholder="Brief description of the client"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;