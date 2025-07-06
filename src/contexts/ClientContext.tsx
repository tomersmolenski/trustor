import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface Client {
  id: string;
  name: string;
  industry?: string;
  size?: string;
  description?: string;
  logo_url?: string;
  website?: string;
  address?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  user_role?: string;
}

interface ClientContextType {
  clients: Client[];
  currentClient: Client | null;
  loading: boolean;
  switchClient: (clientId: string) => void;
  createClient: (clientData: Partial<Client>) => Promise<Client>;
  updateClient: (clientId: string, updates: Partial<Client>) => Promise<void>;
  inviteUserToClient: (clientId: string, email: string, role: string) => Promise<void>;
  acceptInvitation: (token: string) => Promise<boolean>;
  refreshClients: () => Promise<void>;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const useClient = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
};

export const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchClients();
    } else {
      setClients([]);
      setCurrentClient(null);
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    // Set current client from localStorage or first available client
    const savedClientId = localStorage.getItem('currentClientId');
    if (savedClientId && clients.length > 0) {
      const savedClient = clients.find(c => c.id === savedClientId);
      if (savedClient) {
        setCurrentClient(savedClient);
      } else {
        setCurrentClient(clients[0]);
        localStorage.setItem('currentClientId', clients[0].id);
      }
    } else if (clients.length > 0) {
      setCurrentClient(clients[0]);
      localStorage.setItem('currentClientId', clients[0].id);
    }
  }, [clients]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('clients')
        .select(`
          *,
          client_users!inner(role)
        `)
        .order('name');

      if (error) throw error;

      const clientsWithRoles = data?.map(client => ({
        ...client,
        user_role: client.client_users[0]?.role
      })) || [];

      setClients(clientsWithRoles);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const switchClient = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    if (client) {
      setCurrentClient(client);
      localStorage.setItem('currentClientId', clientId);
    }
  };

  const createClient = async (clientData: Partial<Client>): Promise<Client> => {
    const { data, error } = await supabase
      .from('clients')
      .insert([{
        ...clientData,
        created_by: user?.id
      }])
      .select()
      .single();

    if (error) throw error;

    await refreshClients();
    return data;
  };

  const updateClient = async (clientId: string, updates: Partial<Client>) => {
    const { error } = await supabase
      .from('clients')
      .update(updates)
      .eq('id', clientId);

    if (error) throw error;

    await refreshClients();
  };

  const inviteUserToClient = async (clientId: string, email: string, role: string) => {
    const { error } = await supabase
      .from('client_invitations')
      .insert([{
        client_id: clientId,
        email,
        role,
        invited_by: user?.id
      }]);

    if (error) throw error;
  };

  const acceptInvitation = async (token: string): Promise<boolean> => {
    const { data, error } = await supabase.rpc('accept_client_invitation', {
      invitation_token: token
    });

    if (error) throw error;

    if (data?.success) {
      await refreshClients();
      return true;
    }
    return false;
  };

  const refreshClients = async () => {
    await fetchClients();
  };

  const value = {
    clients,
    currentClient,
    loading,
    switchClient,
    createClient,
    updateClient,
    inviteUserToClient,
    acceptInvitation,
    refreshClients,
  };

  return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>;
};