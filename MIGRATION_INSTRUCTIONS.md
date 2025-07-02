# Database Migration Instructions

The application is failing because the database tables haven't been created yet. You need to manually apply the migration to your Supabase project.

## Steps to Fix:

1. **Open Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Copy and Execute the Migration**
   - Copy the entire contents of `supabase/migrations/20250702111837_tender_temple.sql`
   - Paste it into the SQL editor
   - Click "Run" to execute the migration

4. **Verify Tables Were Created**
   - Go to "Table Editor" in the left sidebar
   - You should see the following tables:
     - `organizations`
     - `profiles` 
     - `subscriptions`

5. **Test the Application**
   - Return to your application
   - Try signing up or logging in
   - The profile errors should be resolved

## What This Migration Creates:

- **Organizations table**: Stores company/organization information
- **Profiles table**: Stores user profile data linked to auth.users
- **Subscriptions table**: Manages billing and subscription information
- **Row Level Security**: Ensures users can only access their own organization's data
- **Triggers**: Automatically creates profiles and organizations when users sign up

## Alternative Method (if you have Supabase CLI):

If you have the Supabase CLI installed locally, you can run:
```bash
supabase db push
```

This will apply all pending migrations to your remote database.