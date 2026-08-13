-- ==========================================
-- SCRIPT 008: ADICIONAR TEXTOS DE MARGEM E SEGURANÇA
-- ==========================================
-- Rode este script no "SQL Editor" do seu painel Supabase.

INSERT INTO public.page_content (page_id, page_name, section_id, section_name, field_key, field_name, field_type, content) VALUES 

-- --------------------------------------------------------
-- HOME PAGE: Margem Consignável
-- --------------------------------------------------------
('home', 'Página Inicial', 'margem_consignavel', '4.5. Margem Consignável', 'margem_tagline', 'Tagline (Texto laranja pequeno)', 'text', 'Educação Financeira'),
('home', 'Página Inicial', 'margem_consignavel', '4.5. Margem Consignável', 'margem_title', 'Título da Seção', 'text', 'O que é margem consignável?'),
('home', 'Página Inicial', 'margem_consignavel', '4.5. Margem Consignável', 'margem_desc', 'Descrição Principal', 'textarea', 'A margem consignável representa a parte do benefício que pode ser comprometida com parcelas de operações consignadas. A disponibilidade precisa ser consultada de acordo com as regras vigentes e a situação de cada benefício.'),
('home', 'Página Inicial', 'margem_consignavel', '4.5. Margem Consignável', 'margem_box_title', 'Título da Caixa de Alerta', 'text', 'Não sabe se possui margem disponível?'),
('home', 'Página Inicial', 'margem_consignavel', '4.5. Margem Consignável', 'margem_box_desc', 'Descrição da Caixa de Alerta', 'textarea', 'Fale com a nossa equipe para receber uma orientação inicial rápida sobre como consultar sua margem de forma simples e segura.'),
('home', 'Página Inicial', 'margem_consignavel', '4.5. Margem Consignável', 'margem_btn', 'Texto do Botão (Falar com Consultor)', 'text', 'Falar com Consultor'),
('home', 'Página Inicial', 'margem_consignavel', '4.5. Margem Consignável', 'margem_side_tagline', 'Texto do Selo Lateral (Proteção Garantida)', 'text', 'PROTEÇÃO GARANTIDA'),
('home', 'Página Inicial', 'margem_consignavel', '4.5. Margem Consignável', 'margem_side_desc', 'Texto abaixo do Selo Lateral', 'textarea', 'Trabalhamos estritamente dentro da margem estipulada por lei para garantir sua saúde financeira e estabilidade.'),

-- --------------------------------------------------------
-- HOME PAGE: Segurança contra Golpes
-- --------------------------------------------------------
('home', 'Página Inicial', 'seguranca_golpes', '5.5. Segurança contra Golpes', 'seguranca_tagline', 'Tagline (Selo superior)', 'text', 'PROTEÇÃO GARANTIDA'),
('home', 'Página Inicial', 'seguranca_golpes', '5.5. Segurança contra Golpes', 'seguranca_title', 'Título da Seção', 'text', 'Sua segurança vem antes de qualquer contratação.'),
('home', 'Página Inicial', 'seguranca_golpes', '5.5. Segurança contra Golpes', 'seguranca_desc', 'Descrição da Seção', 'textarea', 'O mercado de crédito exige atenção. Para proteger você de golpes e fraudes, siga sempre estas regras básicas de segurança:'),
('home', 'Página Inicial', 'seguranca_golpes', '5.5. Segurança contra Golpes', 'seguranca_rule1', 'Regra 1 (Não informe senhas...)', 'text', 'Não informe senhas bancárias sob nenhuma hipótese;'),
('home', 'Página Inicial', 'seguranca_golpes', '5.5. Segurança contra Golpes', 'seguranca_rule2', 'Regra 2 (Não informe senha do Gov.br...)', 'text', 'Não informe senha do Gov.br ou do sistema Meu INSS;'),
('home', 'Página Inicial', 'seguranca_golpes', '5.5. Segurança contra Golpes', 'seguranca_rule3', 'Regra 3 (Nunca compartilhe códigos...)', 'text', 'Nunca compartilhe códigos que receber por SMS;'),
('home', 'Página Inicial', 'seguranca_golpes', '5.5. Segurança contra Golpes', 'seguranca_rule4', 'Regra 4 (Nunca faça depósitos...)', 'text', 'Nunca faça depósitos antecipados para liberar crédito;'),
('home', 'Página Inicial', 'seguranca_golpes', '5.5. Segurança contra Golpes', 'seguranca_rule5', 'Regra 5 (Confira sempre...)', 'text', 'Confira sempre o número oficial de atendimento;'),
('home', 'Página Inicial', 'seguranca_golpes', '5.5. Segurança contra Golpes', 'seguranca_rule6', 'Regra 6 (Leia com atenção...)', 'text', 'Leia com atenção todos os termos antes de assinar.'),
('home', 'Página Inicial', 'seguranca_golpes', '5.5. Segurança contra Golpes', 'seguranca_btn', 'Texto do Botão (Conheça nossos canais...)', 'text', 'Conheça nossos canais oficiais')

ON CONFLICT (page_id, section_id, field_key) DO NOTHING;
