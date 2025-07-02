import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: 'admin' | 'manager' | 'auditor' | 'viewer';
          organization_id: string | null;
          subscription_status: 'active' | 'inactive' | 'trial' | 'cancelled';
          subscription_plan: 'starter' | 'professional' | 'enterprise' | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'admin' | 'manager' | 'auditor' | 'viewer';
          organization_id?: string | null;
          subscription_status?: 'active' | 'inactive' | 'trial' | 'cancelled';
          subscription_plan?: 'starter' | 'professional' | 'enterprise' | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'admin' | 'manager' | 'auditor' | 'viewer';
          organization_id?: string | null;
          subscription_status?: 'active' | 'inactive' | 'trial' | 'cancelled';
          subscription_plan?: 'starter' | 'professional' | 'enterprise' | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      organizations: {
        Row: {
          id: string;
          name: string;
          industry: string | null;
          size: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          industry?: string | null;
          size?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          industry?: string | null;
          size?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          organization_id: string;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          plan: 'starter' | 'professional' | 'enterprise';
          status: 'active' | 'inactive' | 'trial' | 'cancelled';
          current_period_start: string | null;
          current_period_end: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          plan: 'starter' | 'professional' | 'enterprise';
          status?: 'active' | 'inactive' | 'trial' | 'cancelled';
          current_period_start?: string | null;
          current_period_end?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          plan?: 'starter' | 'professional' | 'enterprise';
          status?: 'active' | 'inactive' | 'trial' | 'cancelled';
          current_period_start?: string | null;
          current_period_end?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};