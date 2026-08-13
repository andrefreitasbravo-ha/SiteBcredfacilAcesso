-- Create leads table
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  product TEXT NOT NULL,
  profile_answer TEXT,
  source_page TEXT,
  landing_page TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  gclid TEXT,
  fbclid TEXT,
  consent BOOLEAN NOT NULL,
  consent_version TEXT NOT NULL,
  consent_at TIMESTAMPTZ NOT NULL,
  status TEXT DEFAULT 'new',
  user_agent TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Deny all public access to the leads table
-- Since we are only using the Service Role Key on the backend, 
-- we don't need to add any policies for public/anon users.
-- The Service Role Key naturally bypasses RLS, so our Next.js backend can insert.

CREATE POLICY "Deny all public select" ON leads FOR SELECT USING (false);
CREATE POLICY "Deny all public insert" ON leads FOR INSERT WITH CHECK (false);
CREATE POLICY "Deny all public update" ON leads FOR UPDATE USING (false);
CREATE POLICY "Deny all public delete" ON leads FOR DELETE USING (false);
