/*
  # Initial Database Schema for ComplianceOS

  1. New Tables
    - `profiles` - User profiles with roles and subscription info
    - `organizations` - Organization/company information
    - `subscriptions` - Subscription and billing information

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure access based on user roles and organization membership

  3. Functions
    - Automatic profile creation on user signup
    - Organization assignment logic
    - Helper functions to prevent RLS recursion
*/

-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  industry text,
  size text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  role text DEFAULT 'viewer' CHECK (role IN ('admin', 'manager', 'auditor', 'viewer')),
  organization_id uuid REFERENCES organizations(id),
  subscription_status text DEFAULT 'trial' CHECK (subscription_status IN ('active', 'inactive', 'trial', 'cancelled')),
  subscription_plan text CHECK (subscription_plan IN ('starter', 'professional', 'enterprise')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text NOT NULL CHECK (plan IN ('starter', 'professional', 'enterprise')),
  status text DEFAULT 'trial' CHECK (status IN ('active', 'inactive', 'trial', 'cancelled')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Helper function to get user's organization ID (bypasses RLS)
CREATE OR REPLACE FUNCTION get_user_organization_id()
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT organization_id FROM profiles WHERE id = auth.uid();
$$;

-- Helper function to get user's role (bypasses RLS)
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS text
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$;

-- Enable Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for organizations
CREATE POLICY "Users can view their organization"
  ON organizations
  FOR SELECT
  TO authenticated
  USING (id = get_user_organization_id());

CREATE POLICY "Admins can update their organization"
  ON organizations
  FOR UPDATE
  TO authenticated
  USING (id = get_user_organization_id() AND get_user_role() = 'admin');

-- Create policies for profiles
CREATE POLICY "Users can view profiles in their organization"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (organization_id = get_user_organization_id());

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Admins can update profiles in their organization"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (organization_id = get_user_organization_id() AND get_user_role() = 'admin');

CREATE POLICY "Admins can insert profiles in their organization"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (organization_id = get_user_organization_id() AND get_user_role() = 'admin');

-- Create policies for subscriptions
CREATE POLICY "Users can view their organization's subscription"
  ON subscriptions
  FOR SELECT
  TO authenticated
  USING (organization_id = get_user_organization_id());

CREATE POLICY "Admins can manage their organization's subscription"
  ON subscriptions
  FOR ALL
  TO authenticated
  USING (organization_id = get_user_organization_id() AND get_user_role() = 'admin');

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
DECLARE
  default_org_id uuid;
BEGIN
  -- Create a default organization for the user if they don't have one
  INSERT INTO organizations (name)
  VALUES (COALESCE(NEW.raw_user_meta_data->>'company_name', 'My Organization'))
  RETURNING id INTO default_org_id;

  -- Insert the user profile
  INSERT INTO profiles (
    id,
    email,
    full_name,
    organization_id,
    role,
    subscription_status
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    default_org_id,
    'admin', -- First user in organization becomes admin
    'trial'
  );

  -- Create a trial subscription for the organization
  INSERT INTO subscriptions (
    organization_id,
    plan,
    status
  ) VALUES (
    default_org_id,
    'starter',
    'trial'
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_organizations_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();