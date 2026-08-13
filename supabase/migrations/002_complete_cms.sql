-- ==========================================
-- SCRIPT 002: EXPANSÃO DO CMS (TODOS OS TEXTOS E FAQ)
-- ==========================================
-- Rode este script no "SQL Editor" do Supabase.

-- 1. Recriar a tabela page_content com mais colunas para organizar a UI
DROP TABLE IF EXISTS public.page_content CASCADE;

CREATE TABLE public.page_content (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    page_id text NOT NULL,        -- ex: 'home', 'global'
    page_name text NOT NULL,      -- ex: 'Página Inicial', 'Textos Globais'
    section_id text NOT NULL,     -- ex: 'hero', 'header'
    section_name text NOT NULL,   -- ex: '1. Banner Principal', 'Cabeçalho'
    field_key text NOT NULL,      -- ex: 'title', 'subtitle', 'button_text'
    field_name text NOT NULL,     -- ex: 'Título Grande', 'Texto do Botão'
    field_type text NOT NULL DEFAULT 'text', -- 'text' ou 'textarea'
    content text,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    UNIQUE(page_id, section_id, field_key)
);

ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Leitura pública textos" ON public.page_content FOR SELECT USING (true);
CREATE POLICY "Admin altera textos" ON public.page_content FOR ALL USING (auth.role() = 'authenticated');

-- Inserir alguns blocos vitais para a Home Page
INSERT INTO public.page_content (page_id, page_name, section_id, section_name, field_key, field_name, field_type, content) VALUES 
('home', 'Página Inicial', 'hero', '1. Banner de Topo', 'title', 'Título Principal', 'text', 'Crédito Consignado Seguro e Rápido'),
('home', 'Página Inicial', 'hero', '1. Banner de Topo', 'subtitle', 'Subtítulo', 'textarea', 'Simule agora seu crédito com as melhores condições. Atendimento 100% humanizado e transparente.'),
('home', 'Página Inicial', 'hero', '1. Banner de Topo', 'button', 'Texto do Botão Primário', 'text', 'Simular Meu Crédito Agora'),
('home', 'Página Inicial', 'about', '2. Sobre o Empréstimo', 'title', 'Título da Seção', 'text', 'O que é Empréstimo Consignado?'),
('home', 'Página Inicial', 'about', '2. Sobre o Empréstimo', 'content', 'Texto Explicativo', 'textarea', 'O Empréstimo Consignado é um crédito voltado para aposentados, pensionistas e trabalhadores com carteira assinada, com desconto direto na folha de pagamento. O crédito consignado pode apresentar taxas geralmente menores do que algumas modalidades de crédito pessoal, dependendo da instituição e das condições da operação.');


-- 2. Tabela Separada para o FAQ (Dúvidas Frequentes)
CREATE TABLE IF NOT EXISTS public.faqs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    category text NOT NULL DEFAULT 'Geral', -- ex: 'Perguntas Gerais', 'INSS'
    question text NOT NULL,
    answer text NOT NULL,
    order_index integer DEFAULT 0,
    is_active boolean DEFAULT true,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Leitura pública faq" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Admin altera faq" ON public.faqs FOR ALL USING (auth.role() = 'authenticated');

-- Inserir FAQs iniciais baseadas no site atual
INSERT INTO public.faqs (category, question, answer, order_index) VALUES
('Perguntas Gerais', 'A BCred Fácil é um banco?', 'Não, não somos uma instituição financeira. Atuamos como correspondente bancário prestando atendimento e encaminhamento de propostas.', 1),
('Perguntas Gerais', 'A simulação garante a aprovação?', 'Não. A simulação apresenta condições estimadas. A contratação efetiva está sujeita à análise da instituição financeira.', 2),
('Perguntas Gerais', 'Existe algum pagamento antecipado?', 'Absolutamente NÃO! Nós nunca solicitamos depósitos, transferências, taxas de aval ou pagamentos antecipados para liberação de empréstimos.', 3),
('INSS', 'Quem pode solicitar crédito consignado INSS?', 'Aposentados e pensionistas permanentes do INSS que possuam margem consignável disponível no benefício.', 1),
('INSS', 'O que é margem consignável?', 'É a porcentagem máxima do seu benefício mensal que pode ser comprometida com o pagamento das parcelas de empréstimo.', 2);
