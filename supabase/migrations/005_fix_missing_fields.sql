-- ==========================================
-- SCRIPT 005: ADICIONAR TAGLINES E BOTÕES FALTANTES
-- ==========================================
-- Rode este script no "SQL Editor" do Supabase.

INSERT INTO public.page_content (page_id, page_name, section_id, section_name, field_key, field_name, field_type, content) VALUES 

-- VANTAGENS
('home', 'Página Inicial', 'vantagens', '3. Vantagens do Crédito', 'tagline', 'Tagline (Texto Laranja Acima)', 'text', 'Benefícios Exclusivos'),
('home', 'Página Inicial', 'vantagens', '3. Vantagens do Crédito', 'button', 'Texto do Botão', 'text', 'Simular pelo WhatsApp'),

-- QUEM PODE SOLICITAR
('home', 'Página Inicial', 'elegibilidade', '4. Quem Pode Solicitar', 'tagline', 'Tagline (Texto Laranja Acima)', 'text', 'Elegibilidade'),
('home', 'Página Inicial', 'elegibilidade', '4. Quem Pode Solicitar', 'button', 'Texto do Botão', 'text', 'Consultar minha possibilidade'),

-- COMO FUNCIONA
('home', 'Página Inicial', 'como_funciona', '5. Passo a Passo', 'tagline', 'Tagline (Texto Laranja Acima)', 'text', 'Passo a Passo'),
('home', 'Página Inicial', 'como_funciona', '5. Passo a Passo', 'button', 'Texto do Botão', 'text', 'Começar minha simulação com a BCred Fácil.')

ON CONFLICT (page_id, section_id, field_key) DO UPDATE SET content = EXCLUDED.content;
