-- ==========================================
-- SCRIPT 009: CORRIGIR ORDEM E ADICIONAR SEÇÕES RESTANTES
-- ==========================================

-- 1. Atualizar nomes das seções anteriores para seguir a ordem numérica correta
UPDATE public.page_content SET section_name = '7. Margem Consignável' WHERE section_id = 'margem_consignavel';
UPDATE public.page_content SET section_name = '8. Segurança contra Golpes' WHERE section_id = 'seguranca_golpes';

-- 2. Inserir as seções restantes da home page
INSERT INTO public.page_content (page_id, page_name, section_id, section_name, field_key, field_name, field_type, content) VALUES 

-- SEÇÃO 9. Formulário de Simulação
('home', 'Página Inicial', 'simulador', '9. Formulário de Simulação', 'simulador_title', 'Título', 'text', 'Simule Agora Sem Compromisso'),
('home', 'Página Inicial', 'simulador', '9. Formulário de Simulação', 'simulador_desc', 'Descrição', 'textarea', 'Ao preencher o formulário, nosso time de consultoria local entrará em contato em horário comercial para analisar as opções mais adequadas ao seu perfil.'),

-- SEÇÃO 10. Quem Somos
('home', 'Página Inicial', 'quem_somos', '10. Quem Somos', 'somos_left_badge', 'Selo Lateral', 'text', 'Correspondente no País'),
('home', 'Página Inicial', 'quem_somos', '10. Quem Somos', 'somos_left_note', 'Nota Lateral', 'textarea', 'Atuamos como correspondente no País, nos termos da regulamentação aplicável, prestando atendimento e encaminhamento de propostas conforme as instituições financeiras contratantes.'),
('home', 'Página Inicial', 'quem_somos', '10. Quem Somos', 'somos_left_title', 'Título Lateral', 'text', 'Atendimento próximo para decisões mais conscientes.'),
('home', 'Página Inicial', 'quem_somos', '10. Quem Somos', 'somos_left_desc', 'Descrição Lateral', 'textarea', 'A BCred Fácil nasceu com o compromisso de simplificar o acesso a opções de crédito de forma legal, prestando uma assessoria consultiva clara e transparente em cada fase do seu atendimento.'),
('home', 'Página Inicial', 'quem_somos', '10. Quem Somos', 'somos_left_footer', 'Rodapé Lateral', 'text', 'Confiança gerada com atendimento presencial de qualidade e suporte telefônico contínuo.'),
('home', 'Página Inicial', 'quem_somos', '10. Quem Somos', 'somos_right_title', 'Título Principal', 'text', 'Quem Somos'),
('home', 'Página Inicial', 'quem_somos', '10. Quem Somos', 'somos_right_desc', 'Descrição Principal', 'textarea', 'Diferente de sistemas robotizados, acreditamos que decisões financeiras importantes requerem contato humano, escuta atenta e paciência para esclarecer taxas, regras e prazos contratuais.'),
('home', 'Página Inicial', 'quem_somos', '10. Quem Somos', 'somos_right_item1', 'Item 1', 'textarea', 'Atuamos como Correspondente no País, em parceria com instituições financeiras contratantes, observando a regulamentação aplicável ao serviço.'),
('home', 'Página Inicial', 'quem_somos', '10. Quem Somos', 'somos_right_item2', 'Item 2', 'textarea', 'Transparência total sobre o Custo Efetivo Total (CET) e demais condições da operação financeira.'),
('home', 'Página Inicial', 'quem_somos', '10. Quem Somos', 'somos_right_item3', 'Item 3', 'textarea', 'Análise dedicada das margens de empréstimo.'),
('home', 'Página Inicial', 'quem_somos', '10. Quem Somos', 'somos_right_btn', 'Texto do Link', 'text', 'Conhecer a BCred Fácil →'),

-- SEÇÃO 11. Atendimento Local
('home', 'Página Inicial', 'atendimento_local', '11. Atendimento Local', 'local_title', 'Título (Usa cidade)', 'text', 'Atendimento em Nova Iguaçu e região'),
('home', 'Página Inicial', 'atendimento_local', '11. Atendimento Local', 'local_desc', 'Descrição', 'textarea', 'Quer fazer uma visita ou prefere falar por telefone? Estamos prontos para receber você em nossa unidade central ou prestar atendimento completo sem que você precise sair de casa.'),
('home', 'Página Inicial', 'atendimento_local', '11. Atendimento Local', 'local_btn', 'Texto do Botão (WhatsApp)', 'text', 'Falar pelo WhatsApp'),

-- SEÇÃO 12. Chamada para Ação Final
('home', 'Página Inicial', 'cta_final', '12. Chamada para Ação Final', 'ctafinal_title', 'Título', 'text', 'Quer entender quais possibilidades estão disponíveis para você?'),
('home', 'Página Inicial', 'cta_final', '12. Chamada para Ação Final', 'ctafinal_desc', 'Descrição', 'textarea', 'Fale com a equipe da BCred Fácil e receba uma análise inicial rápida, clara e sem compromisso.'),
('home', 'Página Inicial', 'cta_final', '12. Chamada para Ação Final', 'ctafinal_btn', 'Texto do Botão', 'text', 'Falar com um consultor'),
('home', 'Página Inicial', 'cta_final', '12. Chamada para Ação Final', 'ctafinal_note', 'Aviso (Letras miúdas)', 'text', 'A contratação depende da análise e das condições da instituição financeira responsável.'),

-- SEÇÃO 13. Dúvidas Frequentes
('home', 'Página Inicial', 'faq_accordion', '13. Dúvidas Frequentes', 'faq_title', 'Título', 'text', 'Dúvidas Frequentes'),
('home', 'Página Inicial', 'faq_accordion', '13. Dúvidas Frequentes', 'faq_desc', 'Descrição', 'textarea', 'Esclarecemos as principais dúvidas regulatórias e procedimentais.'),
('home', 'Página Inicial', 'faq_accordion', '13. Dúvidas Frequentes', 'faq_btn', 'Texto do Link', 'text', 'Ver todas as dúvidas frequentes →')

ON CONFLICT (page_id, section_id, field_key) DO NOTHING;
