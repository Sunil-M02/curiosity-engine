-- Add SELECT policy to allow public reading of published posts
CREATE POLICY "Allow public to read published posts"
ON public."Post"
FOR SELECT
TO anon, authenticated
USING (published = true);