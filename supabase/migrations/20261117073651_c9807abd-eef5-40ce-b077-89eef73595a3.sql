CREATE POLICY "Block direct newsletter subscriber writes"
ON public.newsletter_subscribers
FOR INSERT
TO anon, authenticated
WITH CHECK (false);