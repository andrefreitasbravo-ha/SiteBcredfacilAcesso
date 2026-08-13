-- ==========================================
-- SCRIPT DE CRIAÇÃO DO BANCO DE DADOS (CMS)
-- ==========================================
-- Rode este script no "SQL Editor" do seu painel Supabase.

-- 1. Tabela de Configurações Gerais (substitui o company.ts)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL DEFAULT 'BCRED FACIL',
    razao_social text,
    cnpj text,
    address text,
    city text,
    state text,
    zip_code text,
    phone text,
    whatsapp text,
    email text,
    working_hours text,
    instagram text,
    logo_url text,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Inserir o registro único inicial se a tabela estiver vazia
INSERT INTO public.site_settings (name, razao_social, cnpj, address, city, state, zip_code, phone, whatsapp, email, working_hours, instagram)
SELECT 'BCRED FACIL', 'BCRED CORRESPONDENTE FINANCEIRO LTDA', '65.100.714/0001-17', 'R. Gov. Portela, 1200 - Centro, Nova Iguaçu - RJ, 26221-030', 'Nova Iguaçu', 'RJ', '26221-030', '(21) 3927-0911', '552139270911', 'bcred@bcred.net', 'Segunda a Sexta, das 8h às 18h', 'https://www.instagram.com/bcredfacil?igsh=MW04ZGV5cW5hOWM2eQ=='
WHERE NOT EXISTS (SELECT 1 FROM public.site_settings);


-- 2. Tabela de Textos das Páginas
CREATE TABLE IF NOT EXISTS public.page_content (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    page_id text NOT NULL, -- Ex: 'home', 'sobre'
    section_id text NOT NULL, -- Ex: 'hero', 'faq'
    title text,
    content text,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    UNIQUE(page_id, section_id)
);

-- Textos Iniciais da Home Page
INSERT INTO public.page_content (page_id, section_id, title, content)
VALUES 
    ('home', 'hero', 'Crédito Consignado Seguro e Rápido', 'Simule agora seu crédito com as melhores condições. Atendimento 100% humanizado e transparente.'),
    ('home', 'o_que_e', 'O que é Empréstimo Consignado?', 'O Empréstimo Consignado é um crédito voltado para aposentados, pensionistas e trabalhadores com carteira assinada, com desconto direto na folha de pagamento.')
ON CONFLICT (page_id, section_id) DO NOTHING;


-- 3. Habilitar o RLS (Row Level Security) nas tabelas
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;


-- 4. Criar Políticas de Acesso
-- Permitir leitura pública para todo mundo (para o site conseguir puxar os dados)
CREATE POLICY "Leitura pública permitida" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Leitura pública permitida" ON public.page_content FOR SELECT USING (true);

-- Permitir alteração APENAS para usuários autenticados (Admin)
CREATE POLICY "Apenas admin pode alterar configurações" ON public.site_settings 
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Apenas admin pode alterar textos" ON public.page_content 
    FOR ALL USING (auth.role() = 'authenticated');
