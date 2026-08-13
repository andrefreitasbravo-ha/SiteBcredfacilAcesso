-- ==========================================
-- SCRIPT 010: ADICIONAR CONDIÇÕES DA OPERAÇÃO (DISCLAIMER)
-- ==========================================

INSERT INTO public.page_content (page_id, page_name, section_id, section_name, field_key, field_name, field_type, content) VALUES 
('home', 'Página Inicial', 'condicoes_operacao', '14. Condições da Operação', 'disclaimer', 'Texto do Disclaimer', 'textarea', 'Taxas, valores, prazos e parcelas variam conforme modalidade, perfil, margem disponível e condições da instituição financeira responsável. A simulação não representa garantia de aprovação ou contratação.')
ON CONFLICT (page_id, section_id, field_key) DO NOTHING;
