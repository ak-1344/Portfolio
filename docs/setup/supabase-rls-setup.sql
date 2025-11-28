-- ============================================
-- SUPABASE RLS POLICIES FOR CONTACT MESSAGES
-- ============================================
-- Run this SQL in your Supabase SQL Editor to enable public form submissions

-- First, ensure RLS is enabled on the table
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any (to avoid conflicts)
DROP POLICY IF EXISTS "Allow public insert on contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "Allow public to submit messages" ON contact_messages;
DROP POLICY IF EXISTS "Public can insert messages" ON contact_messages;

-- Create the INSERT policy for anonymous/public users
-- This allows anyone to submit a contact form
CREATE POLICY "Allow public insert on contact_messages"
ON contact_messages
FOR INSERT
TO public
WITH CHECK (true);

-- Optional: If you want to allow users to read their own messages (not recommended for contact forms)
-- CREATE POLICY "Users can read own messages"
-- ON contact_messages
-- FOR SELECT
-- TO public
-- USING (email = current_setting('request.jwt.claims')::json->>'email');

-- Verify the policy was created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'contact_messages';
