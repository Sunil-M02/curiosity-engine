-- Add SELECT policy for contact_submissions so only admin users can read their own rows
-- Since there is no user_roles or admin system in this app, the safest approach is to restrict SELECT to authenticated users reading their own submissions
-- The edge function already stores submissions with an email; we match by email field to the authenticated user's email

CREATE POLICY "Users can view their own contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (
  auth.email() = email
);

-- Note: Admin access is not implemented yet; this restricts reading to the submitter themselves.