-- ==========================================
-- SCRIPT 004: CORRIGIR TEXTOS EXATOS DO HERO
-- ==========================================
-- Rode este script no "SQL Editor" do Supabase.

-- Apagar os textos antigos do Hero que estavam errados
DELETE FROM public.page_content WHERE section_id = 'hero' AND page_id = 'home';

-- Inserir os textos EXATAMENTE como estão no site, com chaves específicas
INSERT INTO public.page_content (page_id, page_name, section_id, section_name, field_key, field_name, field_type, content) VALUES 
('home', 'Página Inicial', 'hero', '1. Banner Principal', 'hero_tagline', 'Tagline (Texto pequeno acima do título)', 'text', 'ATENDIMENTO RÁPIDO, HUMANO E SEGURO'),
('home', 'Página Inicial', 'hero', '1. Banner Principal', 'hero_title', 'Título Principal (Headline)', 'text', 'Crédito consignado em Nova Iguaçu com atendimento rápido e sem enrolação.'),
('home', 'Página Inicial', 'hero', '1. Banner Principal', 'hero_desc', 'Descrição (Abaixo do título)', 'textarea', 'Consulte possibilidades para aposentados, pensionistas do INSS e trabalhadores com carteira assinada. A BCred Fácil explica cada etapa e acompanha você pelo WhatsApp.'),
('home', 'Página Inicial', 'hero', '1. Banner Principal', 'hero_btn1', 'Botão Principal (Laranja)', 'text', 'Ver minhas possibilidades'),
('home', 'Página Inicial', 'hero', '1. Banner Principal', 'hero_btn2', 'Botão Secundário (Transparente)', 'text', 'Falar com um consultor'),
('home', 'Página Inicial', 'hero', '1. Banner Principal', 'hero_aviso', 'Aviso (Letras miúdas abaixo dos botões)', 'text', 'Simulação sem compromisso • Sujeita à análise da instituição financeira responsável'),
('home', 'Página Inicial', 'hero', '1. Banner Principal', 'hero_card_tag', 'Card Lateral: Tagline', 'text', 'ATENDIMENTO HUMANO'),
('home', 'Página Inicial', 'hero', '1. Banner Principal', 'hero_card_title', 'Card Lateral: Título', 'text', 'Orientação rápida pelo WhatsApp.'),
('home', 'Página Inicial', 'hero', '1. Banner Principal', 'hero_card_desc', 'Card Lateral: Descrição', 'textarea', 'Fale com nossa equipe e entenda cada etapa com clareza.');
