-- ==========================================
-- SCRIPT 011: INSERIR TEXTOS DE TODAS AS OUTRAS PÁGINAS DO SITE
-- ==========================================

INSERT INTO public.page_content (page_id, page_name, section_id, section_name, field_key, field_name, field_type, content) VALUES 

-- --------------------------------------------------------
-- PÁGINA: CRÉDITO CONSIGNADO INSS (page_id: inss)
-- --------------------------------------------------------
('inss', 'Página INSS', 'hero', '1. Banner Principal', 'inss_hero_badge', 'Selo do Topo', 'text', 'Para aposentados e pensionistas do INSS'),
('inss', 'Página INSS', 'hero', '1. Banner Principal', 'inss_hero_title', 'Título Principal', 'text', 'Crédito Consignado INSS em Nova Iguaçu com atendimento rápido e seguro.'),
('inss', 'Página INSS', 'hero', '1. Banner Principal', 'inss_hero_desc', 'Descrição Principal', 'textarea', 'Consulte possibilidades de crédito consignado com parcelas descontadas do benefício. A BCred Fácil explica as condições e acompanha você pelo WhatsApp.'),
('inss', 'Página INSS', 'hero', '1. Banner Principal', 'inss_hero_btn1', 'Botão Primário', 'text', 'Consultar possibilidades para INSS'),
('inss', 'Página INSS', 'hero', '1. Banner Principal', 'inss_hero_btn2', 'Botão Secundário', 'text', 'Falar com um consultor'),
('inss', 'Página INSS', 'hero', '1. Banner Principal', 'inss_hero_micro', 'Aviso abaixo dos botões', 'text', 'Simulação sem compromisso • Sujeita à margem e à análise da instituição financeira'),

('inss', 'Página INSS', 'elegibilidade', '2. Elegibilidade', 'inss_elig_title', 'Título da Elegibilidade', 'text', 'Quem pode consultar o Crédito Consignado INSS?'),
('inss', 'Página INSS', 'elegibilidade', '2. Elegibilidade', 'inss_elig_intro', 'Introdução da Elegibilidade', 'textarea', 'A modalidade pode estar disponível para aposentados, pensionistas e outros beneficiários elegíveis, conforme as regras vigentes, a situação do benefício, a margem disponível e a análise da instituição financeira.'),
('inss', 'Página INSS', 'elegibilidade', '2. Elegibilidade', 'inss_elig_warning', 'Aviso da Elegibilidade', 'textarea', 'A disponibilidade não é automática. Cada solicitação depende da situação do benefício, da margem consignável e da instituição financeira responsável.'),
('inss', 'Página INSS', 'elegibilidade', '2. Elegibilidade', 'inss_elig_item1', 'Item 1', 'text', 'Aposentados do INSS'),
('inss', 'Página INSS', 'elegibilidade', '2. Elegibilidade', 'inss_elig_item2', 'Item 2', 'text', 'Pensionistas do INSS'),
('inss', 'Página INSS', 'elegibilidade', '2. Elegibilidade', 'inss_elig_item3', 'Item 3', 'text', 'Beneficiários elegíveis conforme as regras da modalidade'),

('inss', 'Página INSS', 'beneficios', '3. Benefícios', 'inss_ben_title', 'Título dos Benefícios', 'text', 'Por que consultar o Crédito Consignado INSS?'),
('inss', 'Página INSS', 'beneficios', '3. Benefícios', 'inss_ben_subtitle', 'Subtítulo', 'textarea', 'Entenda as características da modalidade antes de decidir.'),

('inss', 'Página INSS', 'como_funciona', '4. Como Funciona', 'inss_hw_title', 'Título do Como Funciona', 'text', 'Como funciona o atendimento?'),
('inss', 'Página INSS', 'como_funciona', '4. Como Funciona', 'inss_hw_subtitle', 'Subtítulo', 'textarea', 'Etapas claras para orientar você do primeiro contato até a conclusão.'),
('inss', 'Página INSS', 'como_funciona', '4. Como Funciona', 'inss_hw_disc', 'Disclaimer', 'textarea', 'A BCred Fácil não garante aprovação, taxa, valor ou prazo de liberação. Agimos como promotora, orientando você durante o processo.'),

('inss', 'Página INSS', 'margem', '5. Margem Consignável', 'inss_margem_title', 'Título', 'text', 'O que é margem consignável?'),
('inss', 'Página INSS', 'margem', '5. Margem Consignável', 'inss_margem_desc', 'Descrição', 'textarea', 'A margem consignável é a parte do benefício que pode ser comprometida com parcelas de operações consignadas. A disponibilidade varia conforme os contratos existentes, as regras vigentes e a situação de cada benefício.'),
('inss', 'Página INSS', 'margem', '5. Margem Consignável', 'inss_margem_box_desc', 'Caixa de Aviso', 'textarea', 'Não sabe se possui margem disponível? Fale com a equipe e receba uma orientação inicial sobre como consultar sua situação.'),
('inss', 'Página INSS', 'margem', '5. Margem Consignável', 'inss_margem_btn', 'Texto do Botão', 'text', 'Consultar minha margem →'),

('inss', 'Página INSS', 'seguranca', '6. Segurança', 'inss_sec_title', 'Título da Segurança', 'text', 'Cuidado com seus dados durante a contratação'),
('inss', 'Página INSS', 'seguranca', '6. Segurança', 'inss_sec_note', 'Aviso final da Segurança', 'textarea', 'A rapidez do atendimento nunca deve substituir os cuidados de segurança. Em caso de dúvida sobre um contato, acesse nossa página de segurança.'),

('inss', 'Página INSS', 'simulador', '7. Simulador', 'inss_sim_title', 'Título do Simulador', 'text', 'Consulte suas possibilidades para INSS'),
('inss', 'Página INSS', 'simulador', '7. Simulador', 'inss_sim_desc', 'Descrição', 'textarea', 'Preencha e nossa equipe entra em contato para orientar você sobre as opções disponíveis para o seu perfil e margem.'),

('inss', 'Página INSS', 'faq', '8. Dúvidas da Página', 'inss_faq_title', 'Título do FAQ', 'text', 'Dúvidas frequentes sobre Crédito Consignado INSS'),
('inss', 'Página INSS', 'faq', '8. Dúvidas da Página', 'inss_faq_subtitle', 'Subtítulo', 'textarea', 'Respostas diretas para as principais dúvidas sobre a modalidade.'),

-- --------------------------------------------------------
-- PÁGINA: ANTECIPAÇÃO FGTS (page_id: fgts)
-- --------------------------------------------------------
('fgts', 'Página FGTS', 'hero', '1. Banner Principal', 'fgts_hero_badge', 'Selo do Topo', 'text', 'Para quem aderiu ao Saque-Aniversário'),
('fgts', 'Página FGTS', 'hero', '1. Banner Principal', 'fgts_hero_title', 'Título Principal', 'text', 'Antecipação do Saque-Aniversário FGTS com atendimento rápido pelo WhatsApp.'),
('fgts', 'Página FGTS', 'hero', '1. Banner Principal', 'fgts_hero_desc', 'Descrição Principal', 'textarea', 'Entenda como funciona a antecipação de valores futuros do Saque-Aniversário e consulte as condições disponíveis para o seu perfil.'),
('fgts', 'Página FGTS', 'hero', '1. Banner Principal', 'fgts_hero_btn1', 'Botão Primário', 'text', 'Consultar possibilidades com FGTS'),
('fgts', 'Página FGTS', 'hero', '1. Banner Principal', 'fgts_hero_btn2', 'Botão Secundário', 'text', 'Entender a modalidade'),
('fgts', 'Página FGTS', 'hero', '1. Banner Principal', 'fgts_hero_micro', 'Aviso abaixo dos botões', 'text', 'A contratação depende de saldo disponível, regras vigentes e análise da instituição responsável.'),

('fgts', 'Página FGTS', 'elegibilidade', '2. Elegibilidade', 'fgts_elig_title', 'Título da Elegibilidade', 'text', 'Como funciona a antecipação do Saque-Aniversário?'),
('fgts', 'Página FGTS', 'elegibilidade', '2. Elegibilidade', 'fgts_elig_intro', 'Introdução da Elegibilidade', 'textarea', 'A modalidade permite antecipar valores futuros referentes às parcelas anuais do Saque-Aniversário do FGTS.'),
('fgts', 'Página FGTS', 'elegibilidade', '2. Elegibilidade', 'fgts_elig_warning', 'Aviso da Elegibilidade', 'textarea', 'Não há garantia de aprovação automática. A consulta e liberação dependem estritamente das regras do produto, do saldo vinculado e da instituição financeira.'),
('fgts', 'Página FGTS', 'elegibilidade', '2. Elegibilidade', 'fgts_elig_item1', 'Item 1', 'text', 'É necessário ter saldo disponível no FGTS'),
('fgts', 'Página FGTS', 'elegibilidade', '2. Elegibilidade', 'fgts_elig_item2', 'Item 2', 'text', 'É preciso ter optado pela modalidade Saque-Aniversário'),
('fgts', 'Página FGTS', 'elegibilidade', '2. Elegibilidade', 'fgts_elig_item3', 'Item 3', 'text', 'A operação depende de aprovação e disponibilidade nas instituições financeiras parceiras'),

('fgts', 'Página FGTS', 'como_funciona', '3. Como Funciona', 'fgts_hw_title', 'Título do Como Funciona', 'text', 'Quais são as etapas do atendimento?'),
('fgts', 'Página FGTS', 'como_funciona', '3. Como Funciona', 'fgts_hw_subtitle', 'Subtítulo', 'textarea', 'Acompanhamento rápido para orientar sobre as possibilidades e regras vigentes.'),
('fgts', 'Página FGTS', 'como_funciona', '3. Como Funciona', 'fgts_hw_disc', 'Disclaimer', 'textarea', 'A BCred Fácil não tem acesso ao aplicativo do FGTS e não solicita a sua senha pessoal. O processo de autorização ocorre nos sistemas da instituição oficial.'),

('fgts', 'Página FGTS', 'comparacao', '4. Diferença CLT/FGTS', 'fgts_diff_title', 'Título do Comparativo', 'text', 'FGTS e Crédito do Trabalhador são a mesma coisa?'),
('fgts', 'Página FGTS', 'comparacao', '4. Diferença CLT/FGTS', 'fgts_diff_desc', 'Descrição', 'textarea', 'Apesar de ambos os serviços envolverem trabalhadores formais, tratam-se de produtos completamente distintos.'),

('fgts', 'Página FGTS', 'seguranca', '5. Segurança', 'fgts_sec_title', 'Título da Segurança', 'text', 'Segurança e proteção de dados no Saque-Aniversário'),
('fgts', 'Página FGTS', 'seguranca', '5. Segurança', 'fgts_sec_note', 'Aviso final da Segurança', 'textarea', 'Proteja suas informações pessoais. Em caso de dúvidas sobre propostas, entre em contato imediatamente com nossos canais oficiais.'),

('fgts', 'Página FGTS', 'simulador', '6. Simulador', 'fgts_sim_title', 'Título do Simulador', 'text', 'Consulte suas possibilidades de antecipação do FGTS'),
('fgts', 'Página FGTS', 'simulador', '6. Simulador', 'fgts_sim_desc', 'Descrição', 'textarea', 'Informe os dados básicos para receber uma assessoria completa e entender se possui saldo disponível para antecipar.'),

('fgts', 'Página FGTS', 'faq', '7. Dúvidas da Página', 'fgts_faq_title', 'Título do FAQ', 'text', 'Dúvidas sobre a antecipação do Saque-Aniversário FGTS'),
('fgts', 'Página FGTS', 'faq', '7. Dúvidas da Página', 'fgts_faq_subtitle', 'Subtítulo', 'textarea', 'Informações regulatórias e respostas para as principais dúvidas de trabalhadores.'),

-- --------------------------------------------------------
-- PÁGINA: CRÉDITO DO TRABALHADOR CLT (page_id: clt)
-- --------------------------------------------------------
('clt', 'Página CLT', 'hero', '1. Banner Principal', 'clt_hero_badge', 'Selo do Topo', 'text', 'Para quem trabalha com carteira assinada'),
('clt', 'Página CLT', 'hero', '1. Banner Principal', 'clt_hero_title', 'Título Principal', 'text', 'Crédito do Trabalhador em Nova Iguaçu com orientação rápida e sem enrolação.'),
('clt', 'Página CLT', 'hero', '1. Banner Principal', 'clt_hero_desc', 'Descrição Principal', 'textarea', 'Entenda as possibilidades de crédito com desconto in folha para trabalhadores elegíveis. A BCred Fácil explica cada etapa e acompanha você pelo WhatsApp.'),
('clt', 'Página CLT', 'hero', '1. Banner Principal', 'clt_hero_btn1', 'Botão Primário', 'text', 'Consultar possibilidades para CLT'),
('clt', 'Página CLT', 'hero', '1. Banner Principal', 'clt_hero_btn2', 'Botão Secundário', 'text', 'Entender como funciona'),
('clt', 'Página CLT', 'hero', '1. Banner Principal', 'clt_hero_micro', 'Aviso abaixo dos botões', 'text', 'A disponibilidade e as condições dependem do vínculo, do perfil e da instituição responsável.'),

('clt', 'Página CLT', 'elegibilidade', '2. Elegibilidade', 'clt_elig_title', 'Título da Elegibilidade', 'text', 'Quem pode consultar o Crédito do Trabalhador?'),
('clt', 'Página CLT', 'elegibilidade', '2. Elegibilidade', 'clt_elig_intro', 'Introdução da Elegibilidade', 'textarea', 'A modalidade é destinada a trabalhadores elegíveis com vínculo formal, conforme as regras vigentes e as condições das instituições financeiras habilitadas.'),
('clt', 'Página CLT', 'elegibilidade', '2. Elegibilidade', 'clt_elig_warning', 'Aviso da Elegibilidade', 'textarea', 'O vínculo de emprego não garante aprovação. A solicitação depende das regras vigentes, da margem disponível, do perfil e da análise da instituição financeira responsável.'),
('clt', 'Página CLT', 'elegibilidade', '2. Elegibilidade', 'clt_elig_item1', 'Item 1', 'text', 'Empregados com carteira assinada (CLT)'),
('clt', 'Página CLT', 'elegibilidade', '2. Elegibilidade', 'clt_elig_item2', 'Item 2', 'text', 'Trabalhadores domésticos elegíveis'),
('clt', 'Página CLT', 'elegibilidade', '2. Elegibilidade', 'clt_elig_item3', 'Item 3', 'text', 'Trabalhadores rurais elegíveis'),
('clt', 'Página CLT', 'elegibilidade', '2. Elegibilidade', 'clt_elig_item4', 'Item 4', 'text', 'Empregados de microempreendedores individuais, quando aplicável'),
('clt', 'Página CLT', 'elegibilidade', '2. Elegibilidade', 'clt_elig_item5', 'Item 5', 'text', 'Outros públicos previstos pelas regras da modalidade'),

('clt', 'Página CLT', 'como_funciona', '3. Como Funciona', 'clt_hw_title', 'Título do Como Funciona', 'text', 'Como funciona o Crédito do Trabalhador?'),
('clt', 'Página CLT', 'como_funciona', '3. Como Funciona', 'clt_hw_subtitle', 'Subtítulo', 'textarea', 'Parcelas descontadas em folha para trabalhadores elegíveis. Veja as etapas.'),
('clt', 'Página CLT', 'como_funciona', '3. Como Funciona', 'clt_hw_disc', 'Disclaimer', 'textarea', 'A BCred Fácil não garante aprovação, taxa, valor ou prazo. A empresa empregadora não aprova o crédito diretamente — a decisão é da instituição financeira.'),

('clt', 'Página CLT', 'comparacao', '4. Diferença CLT/FGTS', 'clt_diff_title', 'Título do Comparativo', 'text', 'Crédito do Trabalhador é a mesma coisa que antecipação do FGTS?'),
('clt', 'Página CLT', 'comparacao', '4. Diferença CLT/FGTS', 'clt_diff_desc', 'Descrição', 'textarea', 'Não. São modalidades distintas com regras, dinâmicas e condições diferentes.'),

('clt', 'Página CLT', 'seguranca', '5. Segurança', 'clt_sec_title', 'Título da Segurança', 'text', 'Segurança na sua contratação com carteira assinada'),
('clt', 'Página CLT', 'seguranca', '5. Segurança', 'clt_sec_note', 'Aviso final da Segurança', 'textarea', 'Mantenha seus dados seguros. Nunca pague nenhuma taxa antecipada e confirme sempre o canal oficial da BCred.'),

('clt', 'Página CLT', 'simulador', '6. Simulador', 'clt_sim_title', 'Título do Simulador', 'text', 'Consulte o Crédito do Trabalhador'),
('clt', 'Página CLT', 'simulador', '6. Simulador', 'clt_sim_desc', 'Descrição', 'textarea', 'Envie as informações básicas e nossa equipe entrará em contato para orientar você sobre as possibilidades de contratação.'),

('clt', 'Página CLT', 'faq', '7. Dúvidas da Página', 'clt_faq_title', 'Título do FAQ', 'text', 'Dúvidas sobre o Crédito do Trabalhador CLT'),
('clt', 'Página CLT', 'faq', '7. Dúvidas da Página', 'clt_faq_subtitle', 'Subtítulo', 'textarea', 'Informações regulatórias e respostas para dúvidas sobre o Crédito do Trabalhador.'),

-- --------------------------------------------------------
-- PÁGINA: PORTABILIDADE (page_id: portabilidade)
-- --------------------------------------------------------
('portabilidade', 'Página Portabilidade', 'hero', '1. Banner Principal', 'port_hero_badge', 'Selo do Topo', 'text', 'Traga seu contrato para melhores condições'),
('portabilidade', 'Página Portabilidade', 'hero', '1. Banner Principal', 'port_hero_title', 'Título Principal', 'text', 'Portabilidade de crédito com atendimento rápido e humano.'),
('portabilidade', 'Página Portabilidade', 'hero', '1. Banner Principal', 'port_hero_desc', 'Descrição Principal', 'textarea', 'Consulte a possibilidade de transferir sua dívida e reduzir suas taxas de juros. A BCred Fácil ajuda você em cada etapa pelo WhatsApp.'),
('portabilidade', 'Página Portabilidade', 'hero', '1. Banner Principal', 'port_hero_btn1', 'Botão Primário', 'text', 'Consultar possibilidade de portabilidade'),
('portabilidade', 'Página Portabilidade', 'hero', '1. Banner Principal', 'port_hero_btn2', 'Botão Secundário', 'text', 'Falar com consultor'),
('portabilidade', 'Página Portabilidade', 'hero', '1. Banner Principal', 'port_hero_micro', 'Aviso abaixo dos botões', 'text', 'A portabilidade depende do saldo devedor atual, regras regulatórias e análise do banco receptor.'),

('portabilidade', 'Página Portabilidade', 'elegibilidade', '2. Elegibilidade', 'port_elig_title', 'Título da Elegibilidade', 'text', 'Quem pode solicitar a Portabilidade?'),
('portabilidade', 'Página Portabilidade', 'elegibilidade', '2. Elegibilidade', 'port_elig_intro', 'Introdução da Elegibilidade', 'textarea', 'A portabilidade é voltada para beneficiários do INSS e outros públicos elegíveis que já possuam empréstimos consignados ativos e queiram transferi-los.'),
('portabilidade', 'Página Portabilidade', 'elegibilidade', '2. Elegibilidade', 'port_elig_warning', 'Aviso da Elegibilidade', 'textarea', 'A transferência não é automática e depende da aceitação da instituição financeira de destino, dos limites regulamentados e do saldo devedor.'),
('portabilidade', 'Página Portabilidade', 'elegibilidade', '2. Elegibilidade', 'port_elig_item1', 'Item 1', 'text', 'Possuir empréstimos consignados ativos em outras instituições'),
('portabilidade', 'Página Portabilidade', 'elegibilidade', '2. Elegibilidade', 'port_elig_item2', 'Item 2', 'text', 'Estar dentro das regras regulatórias de taxas e prazos para portabilidade'),

('portabilidade', 'Página Portabilidade', 'como_funciona', '3. Como Funciona', 'port_hw_title', 'Título do Como Funciona', 'text', 'Como funciona a transferência do contrato?'),
('portabilidade', 'Página Portabilidade', 'como_funciona', '3. Como Funciona', 'port_hw_subtitle', 'Subtítulo', 'textarea', 'Etapas para trazer seu contrato para melhores condições com acompanhamento próximo.'),
('portabilidade', 'Página Portabilidade', 'como_funciona', '3. Como Funciona', 'port_hw_disc', 'Disclaimer', 'textarea', 'A BCred não realiza a portabilidade diretamente. Orientamos você e enviamos sua intenção para as instituições financeiras parceiras credenciadas.'),

('portabilidade', 'Página Portabilidade', 'seguranca', '4. Segurança', 'port_sec_title', 'Título da Segurança', 'text', 'Segurança durante a portabilidade de crédito'),
('portabilidade', 'Página Portabilidade', 'seguranca', '4. Segurança', 'port_sec_note', 'Aviso final da Segurança', 'textarea', 'Atenção com links suspeitos. Nosso atendimento oficial acontece somente pelo número de WhatsApp verificado.'),

('portabilidade', 'Página Portabilidade', 'simulador', '5. Simulador', 'port_sim_title', 'Título do Simulador', 'text', 'Consulte a portabilidade do seu empréstimo'),
('portabilidade', 'Página Portabilidade', 'simulador', '5. Simulador', 'port_sim_desc', 'Descrição', 'textarea', 'Preencha os dados e ajudamos você a analisar se a portabilidade trará taxas mais vantajosas para o seu contrato.'),

('portabilidade', 'Página Portabilidade', 'faq', '6. Dúvidas da Página', 'port_faq_title', 'Título do FAQ', 'text', 'Dúvidas frequentes sobre Portabilidade'),
('portabilidade', 'Página Portabilidade', 'faq', '6. Dúvidas da Página', 'port_faq_subtitle', 'Subtítulo', 'textarea', 'Respostas para dúvidas comuns sobre custos, prazos e andamento de portabilidade.'),

-- --------------------------------------------------------
-- PÁGINA: SOBRE NÓS (page_id: sobre)
-- --------------------------------------------------------
('sobre', 'Página Sobre Nós', 'header', '1. Cabeçalho', 'sobre_title', 'Título', 'text', 'Sobre a BCred Fácil'),
('sobre', 'Página Sobre Nós', 'header', '1. Cabeçalho', 'sobre_subtitle', 'Subtítulo', 'text', 'Compromisso local com o seu planejamento financeiro.'),

('sobre', 'Página Sobre Nós', 'historia', '2. Nossa História', 'sobre_hist_title', 'Título da Seção', 'text', 'Atendimento próximo para decisões mais conscientes.'),
('sobre', 'Página Sobre Nós', 'historia', '2. Nossa História', 'sobre_hist_p1', 'Parágrafo 1', 'textarea', 'A BCred Fácil atua no mercado de correspondência bancária com a missão de aproximar os clientes das melhores soluções de crédito disponíveis em Nova Iguaçu/RJ.'),
('sobre', 'Página Sobre Nós', 'historia', '2. Nossa História', 'sobre_hist_p2', 'Parágrafo 2', 'textarea', 'Não somos um banco e não realizamos operações de crédito diretamente. Nosso papel é assessorar você, aposentado, pensionista do INSS ou trabalhador registrado CLT, para encontrar taxas e condições adequadas junto às instituições financeiras parceiras oficiais.'),

('sobre', 'Página Sobre Nós', 'valores', '3. Nossos Valores', 'sobre_val1_title', 'Valor 1: Título', 'text', 'Transparência'),
('sobre', 'Página Sobre Nós', 'valores', '3. Nossos Valores', 'sobre_val1_desc', 'Valor 1: Descrição', 'textarea', 'Explicamos detalhadamente todos os custos, taxas e prazos de cada proposta de empréstimo.'),
('sobre', 'Página Sobre Nós', 'valores', '3. Nossos Valores', 'sobre_val2_title', 'Valor 2: Título', 'text', 'Assessoria Próxima'),
('sobre', 'Página Sobre Nós', 'valores', '3. Nossos Valores', 'sobre_val2_desc', 'Valor 2: Descrição', 'textarea', 'Tratamos cada cliente de forma individualizada, entendendo seu perfil de renda e despesas.'),
('sobre', 'Página Sobre Nós', 'valores', '3. Nossos Valores', 'sobre_val3_title', 'Valor 3: Título', 'text', 'Segurança Regulada'),
('sobre', 'Página Sobre Nós', 'valores', '3. Nossos Valores', 'sobre_val3_desc', 'Valor 3: Descrição', 'textarea', 'Atuamos como Correspondente no País, em parceria com instituições financeiras contratantes, observando a regulamentação aplicável ao serviço.'),

('sobre', 'Página Sobre Nós', 'localizacao', '4. Localização', 'sobre_loc_title', 'Título da Localização', 'text', 'Onde Estamos Localizados'),
('sobre', 'Página Sobre Nós', 'localizacao', '4. Localização', 'sobre_loc_desc', 'Descrição da Localização', 'textarea', 'Nossa sede fica em Nova Iguaçu/RJ, no endereço:'),
('sobre', 'Página Sobre Nós', 'localizacao', '4. Localização', 'sobre_loc_note', 'Nota Adicional', 'textarea', '* Se preferir, agende um horário para tomar um café conosco e realizar sua simulação de crédito presencialmente.'),

-- --------------------------------------------------------
-- PÁGINA: DÚVIDAS FREQUENTES (page_id: duvidas)
-- --------------------------------------------------------
('duvidas', 'Página Dúvidas', 'header', '1. Cabeçalho', 'faq_page_title', 'Título', 'text', 'Perguntas Frequentes'),
('duvidas', 'Página Dúvidas', 'header', '1. Cabeçalho', 'faq_page_subtitle', 'Subtítulo', 'text', 'Esclarecemos as principais dúvidas regulatórias e procedimentais para orientar sua decisão.'),
('duvidas', 'Página Dúvidas', 'contato', '2. Seção de Contato', 'faq_page_contact_title', 'Título de Contato', 'text', 'Ainda tem dúvidas?'),
('duvidas', 'Página Dúvidas', 'contato', '2. Seção de Contato', 'faq_page_contact_desc', 'Descrição de Contato', 'textarea', 'Nossa equipe de consultoria está disponível para orientar você com clareza pelo WhatsApp.'),
('duvidas', 'Página Dúvidas', 'contato', '2. Seção de Contato', 'faq_page_contact_btn', 'Texto do Botão de Contato', 'text', 'Falar com nossa equipe')

ON CONFLICT (page_id, section_id, field_key) DO NOTHING;
