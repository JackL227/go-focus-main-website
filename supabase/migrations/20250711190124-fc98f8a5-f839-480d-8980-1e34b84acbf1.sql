
-- Step 1: Fix Critical Role Escalation Vulnerability
-- Drop the existing policy that allows users to update their role
DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;

-- Create a new policy that allows users to update only non-sensitive fields
CREATE POLICY "Users can update their own profile (non-sensitive fields)" 
ON public.user_profiles 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (
  auth.uid() = id AND
  -- Prevent role changes by regular users
  role = (SELECT role FROM public.user_profiles WHERE id = auth.uid())
);

-- Create a security definer function for admin-only role updates
CREATE OR REPLACE FUNCTION public.update_user_role(
  target_user_id UUID,
  new_role user_role
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_user_role user_role;
BEGIN
  -- Check if the current user is an admin
  SELECT role INTO current_user_role 
  FROM public.user_profiles 
  WHERE id = auth.uid();
  
  IF current_user_role != 'admin' THEN
    RAISE EXCEPTION 'Only admins can update user roles';
  END IF;
  
  -- Update the role
  UPDATE public.user_profiles 
  SET role = new_role, updated_at = now()
  WHERE id = target_user_id;
  
  RETURN TRUE;
END;
$$;

-- Step 2: Secure Agent Metrics Table
-- Enable RLS on agent_metrics table
ALTER TABLE public.agent_metrics ENABLE ROW LEVEL SECURITY;

-- Create policy allowing only admins to view agent metrics
CREATE POLICY "Only admins can view agent metrics"
ON public.agent_metrics
FOR SELECT
USING (
  (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'admin'
);

-- Create policy allowing only admins to insert agent metrics
CREATE POLICY "Only admins can insert agent metrics"
ON public.agent_metrics
FOR INSERT
WITH CHECK (
  (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'admin'
);

-- Create policy allowing only admins to update agent metrics
CREATE POLICY "Only admins can update agent metrics"
ON public.agent_metrics
FOR UPDATE
USING (
  (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'admin'
);

-- Create policy allowing only admins to delete agent metrics
CREATE POLICY "Only admins can delete agent metrics"
ON public.agent_metrics
FOR DELETE
USING (
  (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'admin'
);

-- Step 3: Tighten matts_docs Access
-- Drop the overly permissive policy on matts_docs
DROP POLICY IF EXISTS "Enable all for authenticated users" ON public.matts_docs;

-- Create admin-only policy for matts_docs
CREATE POLICY "Only admins can access matts_docs"
ON public.matts_docs
FOR ALL
USING (
  (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'admin'
)
WITH CHECK (
  (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'admin'
);

-- Step 4: Add audit logging for role changes
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id TEXT,
  old_values JSONB,
  new_values JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on audit logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Only admins can view audit logs"
ON public.audit_logs
FOR SELECT
USING (
  (SELECT role FROM public.user_profiles WHERE id = auth.uid()) = 'admin'
);

-- Create trigger function for audit logging
CREATE OR REPLACE FUNCTION public.audit_user_profile_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Log role changes specifically
  IF OLD.role IS DISTINCT FROM NEW.role THEN
    INSERT INTO public.audit_logs (
      user_id,
      action,
      table_name,
      record_id,
      old_values,
      new_values
    ) VALUES (
      auth.uid(),
      'UPDATE',
      'user_profiles',
      NEW.id::TEXT,
      jsonb_build_object('role', OLD.role),
      jsonb_build_object('role', NEW.role)
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for user profile changes
CREATE TRIGGER audit_user_profile_trigger
  AFTER UPDATE ON public.user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_user_profile_changes();
