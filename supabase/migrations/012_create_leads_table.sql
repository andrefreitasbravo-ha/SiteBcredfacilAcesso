-- ==============================================================================
-- Migration: Criação da Tabela de Leads e Políticas de Acesso
-- ==============================================================================

CREATE TABLE IF NOT EXISTS public.leads (
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
  consent BOOLEAN NOT NULL DEFAULT true,
  consent_version TEXT NOT NULL DEFAULT 'v1.0',
  consent_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'new', -- 'new', 'contacted', 'in_progress', 'converted', 'lost'
  user_agent TEXT
);

-- Índices para otimização de busca
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.leads (phone);

-- Ativar Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Usuários autenticados no painel admin têm acesso total para leitura, atualização e exclusão
DROP POLICY IF EXISTS "Allow authenticated users full access" ON public.leads;
CREATE POLICY "Allow authenticated users full access" 
  ON public.leads 
  FOR ALL 
  TO authenticated 
  USING (true) 
  WITH CHECK (true);

-- Backend (service_role) tem acesso total nativo por padrão.
