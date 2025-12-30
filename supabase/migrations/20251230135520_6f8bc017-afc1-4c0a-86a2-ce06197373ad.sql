-- Fix contact_submissions security: allow public INSERT but block all SELECT
-- The current INSERT policy is RESTRICTIVE which is incorrect - it should be PERMISSIVE

-- Drop the existing restrictive INSERT policy
DROP POLICY IF EXISTS "Anyone can submit contact form " ON public.contact_submissions;

-- Create a PERMISSIVE INSERT policy for public submissions
CREATE POLICY "Allow public contact form submissions"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- No SELECT, UPDATE, or DELETE policies are created intentionally.
-- This means only service_role (edge functions/backend) can read the data.
-- Public users cannot query or view any contact submissions.