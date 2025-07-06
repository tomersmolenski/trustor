/*
  # Multi-Client Support for ComplianceOS

  1. New Tables
    - `clients` - Client/company information that users can manage
    - `client_users` - Junction table for user-client relationships
    - `client_invitations` - Pending invitations to join clients

  2. Security
    - Enable RLS on all new tables
    - Add policies for client access control
    - Users can belong to multiple clients with different roles

  3. Changes
    - Extend existing functionality to be client-scoped
    - Add client switching capabilities
*/

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  industry text,
  size text,
  description text,
  logo_url text,
  website text,
  address text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create client_users junction table for many-to-many relationship
CREATE TABLE IF NOT EXISTS client_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text DEFAULT 'viewer' CHECK (role IN ('owner', 'admin', 'manager', 'auditor', 'viewer')),
  invited_by uuid REFERENCES auth.users(id),
  joined_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(client_id, user_id)
);

-- Create client invitations table
CREATE TABLE IF NOT EXISTS client_invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  email text NOT NULL,
  role text DEFAULT 'viewer' CHECK (role IN ('admin', 'manager', 'auditor', 'viewer')),
  invited_by uuid REFERENCES auth.users(id),
  token text UNIQUE DEFAULT gen_random_uuid()::text,
  expires_at timestamptz DEFAULT (now() + interval '7 days'),
  accepted_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(client_id, email)
);

-- Create client_subscriptions table (separate from user subscriptions)
CREATE TABLE IF NOT EXISTS client_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text NOT NULL CHECK (plan IN ('starter', 'professional', 'enterprise')),
  status text DEFAULT 'trial' CHECK (status IN ('active', 'inactive', 'trial', 'cancelled')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Helper function to get user's accessible client IDs
CREATE OR REPLACE FUNCTION get_user_client_ids()
RETURNS uuid[]
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT ARRAY_AGG(client_id) FROM client_users WHERE user_id = auth.uid();
$$;

-- Helper function to check if user has role in client
CREATE OR REPLACE FUNCTION user_has_client_role(client_uuid uuid, required_role text)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM client_users 
    WHERE user_id = auth.uid() 
    AND client_id = client_uuid 
    AND (
      role = required_role OR
      (required_role = 'viewer' AND role IN ('owner', 'admin', 'manager', 'auditor', 'viewer')) OR
      (required_role = 'auditor' AND role IN ('owner', 'admin', 'manager', 'auditor')) OR
      (required_role = 'manager' AND role IN ('owner', 'admin', 'manager')) OR
      (required_role = 'admin' AND role IN ('owner', 'admin')) OR
      (required_role = 'owner' AND role = 'owner')
    )
  );
$$;

-- Enable Row Level Security
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies for clients table
CREATE POLICY "Users can view clients they belong to"
  ON clients
  FOR SELECT
  TO authenticated
  USING (id = ANY(get_user_client_ids()));

CREATE POLICY "Users can create new clients"
  ON clients
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Client owners and admins can update client info"
  ON clients
  FOR UPDATE
  TO authenticated
  USING (user_has_client_role(id, 'admin'));

CREATE POLICY "Client owners can delete clients"
  ON clients
  FOR DELETE
  TO authenticated
  USING (user_has_client_role(id, 'owner'));

-- Policies for client_users table
CREATE POLICY "Users can view client memberships for their clients"
  ON client_users
  FOR SELECT
  TO authenticated
  USING (client_id = ANY(get_user_client_ids()));

CREATE POLICY "Client owners and admins can manage memberships"
  ON client_users
  FOR ALL
  TO authenticated
  USING (user_has_client_role(client_id, 'admin'));

-- Policies for client_invitations table
CREATE POLICY "Users can view invitations for their clients"
  ON client_invitations
  FOR SELECT
  TO authenticated
  USING (client_id = ANY(get_user_client_ids()) OR email = (SELECT email FROM auth.users WHERE id = auth.uid()));

CREATE POLICY "Client admins can manage invitations"
  ON client_invitations
  FOR ALL
  TO authenticated
  USING (user_has_client_role(client_id, 'admin'));

-- Policies for client_subscriptions table
CREATE POLICY "Users can view subscriptions for their clients"
  ON client_subscriptions
  FOR SELECT
  TO authenticated
  USING (client_id = ANY(get_user_client_ids()));

CREATE POLICY "Client owners and admins can manage subscriptions"
  ON client_subscriptions
  FOR ALL
  TO authenticated
  USING (user_has_client_role(client_id, 'admin'));

-- Function to handle new client creation
CREATE OR REPLACE FUNCTION handle_new_client()
RETURNS trigger AS $$
BEGIN
  -- Add the creator as the owner of the new client
  INSERT INTO client_users (
    client_id,
    user_id,
    role,
    invited_by
  ) VALUES (
    NEW.id,
    NEW.created_by,
    'owner',
    NEW.created_by
  );

  -- Create a trial subscription for the new client
  INSERT INTO client_subscriptions (
    client_id,
    plan,
    status
  ) VALUES (
    NEW.id,
    'starter',
    'trial'
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new client creation
CREATE TRIGGER on_client_created
  AFTER INSERT ON clients
  FOR EACH ROW EXECUTE FUNCTION handle_new_client();

-- Function to accept client invitation
CREATE OR REPLACE FUNCTION accept_client_invitation(invitation_token text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  invitation_record client_invitations%ROWTYPE;
  user_email text;
BEGIN
  -- Get current user's email
  SELECT email INTO user_email FROM auth.users WHERE id = auth.uid();
  
  -- Find and validate invitation
  SELECT * INTO invitation_record 
  FROM client_invitations 
  WHERE token = invitation_token 
    AND email = user_email 
    AND expires_at > now() 
    AND accepted_at IS NULL;
  
  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'message', 'Invalid or expired invitation');
  END IF;
  
  -- Add user to client
  INSERT INTO client_users (client_id, user_id, role, invited_by)
  VALUES (invitation_record.client_id, auth.uid(), invitation_record.role, invitation_record.invited_by)
  ON CONFLICT (client_id, user_id) DO UPDATE SET
    role = invitation_record.role,
    updated_at = now();
  
  -- Mark invitation as accepted
  UPDATE client_invitations 
  SET accepted_at = now() 
  WHERE id = invitation_record.id;
  
  RETURN json_build_object('success', true, 'client_id', invitation_record.client_id);
END;
$$;

-- Add updated_at triggers for new tables
CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_users_updated_at
  BEFORE UPDATE ON client_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_subscriptions_updated_at
  BEFORE UPDATE ON client_subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();