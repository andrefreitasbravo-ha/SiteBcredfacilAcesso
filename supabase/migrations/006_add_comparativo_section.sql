-- ==========================================
-- SCRIPT 006: ADICIONAR SEÇÃO COMPARATIVO
-- ==========================================
-- Rode este script no "SQL Editor" do Supabase.

INSERT INTO public.page_content (page_id, page_name, section_id, section_name, field_key, field_name, field_type, content) VALUES 

-- SEÇÃO 6. COMPARATIVO
('home', 'Página Inicial', 'comparativo', '6. Comparativo', 'tagline', 'Tagline', 'text', 'ORIENTAÇÃO CONSCIENTE'),
('home', 'Página Inicial', 'comparativo', '6. Comparativo', 'title', 'Título', 'text', 'Entenda as diferenças antes de contratar'),
('home', 'Página Inicial', 'comparativo', '6. Comparativo', 'subtitle', 'Subtítulo', 'textarea', 'Compare como funcionam as modalidades e escolha com mais clareza.'),

('home', 'Página Inicial', 'comparativo', '6. Comparativo', 'comp_card1_title', 'Card 1: Título', 'text', 'Crédito Consignado'),
('home', 'Página Inicial', 'comparativo', '6. Comparativo', 'comp_card1_tag', 'Card 1: Tagline', 'text', 'DESCONTO EM FOLHA'),
('home', 'Página Inicial', 'comparativo', '6. Comparativo', 'comp_card1_taxas', 'Card 1: Taxas', 'text', 'Geralmente mais baixas'),
('home', 'Página Inicial', 'comparativo', '6. Comparativo', 'comp_card1_pagamento', 'Card 1: Pagamento', 'text', 'Desconto direto no benefício ou salário'),
('home', 'Página Inicial', 'comparativo', '6. Comparativo', 'comp_card1_margem', 'Card 1: Margem', 'text', 'Precisa estar disponível'),
('home', 'Página Inicial', 'comparativo', '6. Comparativo', 'comp_card1_analise', 'Card 1: Análise', 'text', 'Considera perfil, margem e regras da instituição'),
('home', 'Página Inicial', 'comparativo', '6. Comparativo', 'comp_card1_btn', 'Card 1: Botão', 'text', 'Ver minhas possibilidades'),

('home', 'Página Inicial', 'comparativo', '6. Comparativo', 'comp_card2_title', 'Card 2: Título', 'text', 'Empréstimo Pessoal'),
('home', 'Página Inicial', 'comparativo', '6. Comparativo', 'comp_card2_taxas', 'Card 2: Taxas', 'text', 'Podem ser mais elevadas'),
('home', 'Página Inicial', 'comparativo', '6. Comparativo', 'comp_card2_pagamento', 'Card 2: Pagamento', 'text', 'Boleto, débito ou conta bancária'),
('home', 'Página Inicial', 'comparativo', '6. Comparativo', 'comp_card2_margem', 'Card 2: Margem', 'text', 'Não utiliza margem consignável'),
('home', 'Página Inicial', 'comparativo', '6. Comparativo', 'comp_card2_analise', 'Card 2: Análise', 'text', 'Pode considerar renda e histórico de crédito')

ON CONFLICT (page_id, section_id, field_key) DO UPDATE SET content = EXCLUDED.content;
