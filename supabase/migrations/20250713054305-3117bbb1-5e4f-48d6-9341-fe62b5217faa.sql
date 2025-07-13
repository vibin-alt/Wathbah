-- Create admin user in auth.users table (this will trigger the profile creation)
-- Note: You'll need to manually create this user in Supabase Auth dashboard
-- Or use this SQL if run as superuser in SQL editor:

-- First create admin user in auth.users (if not exists)
-- This would typically be done through Supabase Auth dashboard
-- For now, let's create the admin role mapping assuming the user exists

-- Insert admin role for a user (you'll need to replace with actual user ID after creating the user)
-- The user should be created with email: administrator@wathbah.com and password: wathbah

-- Create default admin role (assuming user will be created with a specific ID)
-- This is a placeholder - the actual user_id will be set when the admin user is created
INSERT INTO public.user_roles (user_id, role) 
SELECT auth.uid(), 'admin'::app_role 
WHERE NOT EXISTS (
  SELECT 1 FROM public.user_roles 
  WHERE user_id = auth.uid() AND role = 'admin'
);

-- Note: The admin user needs to be created through Supabase Auth dashboard first
-- Email: administrator@wathbah.com
-- Password: wathbah