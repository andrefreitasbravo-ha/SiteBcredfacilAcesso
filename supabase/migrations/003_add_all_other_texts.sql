-- ==========================================
-- SCRIPT 003: INSERIR O RESTANTE DOS TEXTOS DA HOME E GLOBAIS
-- ==========================================
-- Rode este script no "SQL Editor" do Supabase.

INSERT INTO public.page_content (page_id, page_name, section_id, section_name, field_key, field_name, field_type, content) VALUES 

-- --------------------------------------------------------
-- HOME PAGE: Vantagens
-- --------------------------------------------------------
('home', 'Página Inicial', 'vantagens', '3. Vantagens do Crédito', 'title', 'Título da Seção', 'text', 'Vantagens do Crédito Consignado INSS'),
('home', 'Página Inicial', 'vantagens', '3. Vantagens do Crédito', 'subtitle', 'Subtítulo', 'textarea', 'Entenda por que essa modalidade é uma das opções mais buscadas por beneficiários da Previdência Social.'),
('home', 'Página Inicial', 'vantagens', '3. Vantagens do Crédito', 'card1_title', 'Card 1: Título', 'text', 'Desconto direto na folha'),
('home', 'Página Inicial', 'vantagens', '3. Vantagens do Crédito', 'card1_desc', 'Card 1: Descrição', 'textarea', 'O valor das parcelas é descontado diretamente do seu benefício do INSS, sem preocupações com boletos.'),
('home', 'Página Inicial', 'vantagens', '3. Vantagens do Crédito', 'card2_title', 'Card 2: Título', 'text', 'Taxas mais vantajosas'),
('home', 'Página Inicial', 'vantagens', '3. Vantagens do Crédito', 'card2_desc', 'Card 2: Descrição', 'textarea', 'Taxas de juros variam conforme a instituição financeira, o perfil do cliente e as condições da operação. Consulte as condições disponíveis para você.'),
('home', 'Página Inicial', 'vantagens', '3. Vantagens do Crédito', 'card3_title', 'Card 3: Título', 'text', 'Prazos flexíveis'),
('home', 'Página Inicial', 'vantagens', '3. Vantagens do Crédito', 'card3_desc', 'Card 3: Descrição', 'textarea', 'Algumas instituições podem oferecer carência para o início do pagamento, conforme as condições da operação. Consulte as condições disponíveis para o seu perfil.'),
('home', 'Página Inicial', 'vantagens', '3. Vantagens do Crédito', 'card4_title', 'Card 4: Título', 'text', 'Contratação sem burocracia'),
('home', 'Página Inicial', 'vantagens', '3. Vantagens do Crédito', 'card4_desc', 'Card 4: Descrição', 'textarea', 'Contrate sem sair de casa, com segurança e praticidade pelo site ou WhatsApp da BCred Fácil.'),

-- --------------------------------------------------------
-- HOME PAGE: Quem pode solicitar
-- --------------------------------------------------------
('home', 'Página Inicial', 'elegibilidade', '4. Quem Pode Solicitar', 'title', 'Título', 'text', 'Quem pode solicitar o Crédito Consignado?'),
('home', 'Página Inicial', 'elegibilidade', '4. Quem Pode Solicitar', 'desc', 'Descrição', 'textarea', 'A modalidade pode estar disponível para aposentados, pensionistas e trabalhadores com carteira assinada, conforme as regras vigentes, a margem disponível e a análise da instituição financeira responsável.'),
('home', 'Página Inicial', 'elegibilidade', '4. Quem Pode Solicitar', 'item1', 'Item 1', 'text', 'Aposentados do INSS'),
('home', 'Página Inicial', 'elegibilidade', '4. Quem Pode Solicitar', 'item2', 'Item 2', 'text', 'Pensionistas do INSS'),
('home', 'Página Inicial', 'elegibilidade', '4. Quem Pode Solicitar', 'item3', 'Item 3', 'text', 'Trabalhadores com carteira assinada (CLT)'),
('home', 'Página Inicial', 'elegibilidade', '4. Quem Pode Solicitar', 'aviso', 'Caixa de Aviso', 'textarea', 'Aviso: A disponibilidade depende da situação do benefício, da margem consignável e da aprovação da instituição responsável.'),

-- --------------------------------------------------------
-- HOME PAGE: Como Funciona
-- --------------------------------------------------------
('home', 'Página Inicial', 'como_funciona', '5. Passo a Passo', 'title', 'Título', 'text', 'Como funciona a solicitação?'),
('home', 'Página Inicial', 'como_funciona', '5. Passo a Passo', 'desc', 'Descrição', 'textarea', 'Etapas claras para orientar você do primeiro contato até o encerramento do seu pedido.'),
('home', 'Página Inicial', 'como_funciona', '5. Passo a Passo', 'passo1_title', 'Passo 1: Título', 'text', 'Escolha seu perfil'),
('home', 'Página Inicial', 'como_funciona', '5. Passo a Passo', 'passo1_desc', 'Passo 1: Descrição', 'textarea', 'Informe se você é aposentado, pensionista ou trabalhador com carteira assinada.'),
('home', 'Página Inicial', 'como_funciona', '5. Passo a Passo', 'passo2_title', 'Passo 2: Título', 'text', 'Inicie a simulação'),
('home', 'Página Inicial', 'como_funciona', '5. Passo a Passo', 'passo2_desc', 'Passo 2: Descrição', 'textarea', 'Fale com a equipe da BCred Fácil pelo WhatsApp.'),
('home', 'Página Inicial', 'como_funciona', '5. Passo a Passo', 'passo3_title', 'Passo 3: Título', 'text', 'Envie as informações'),
('home', 'Página Inicial', 'como_funciona', '5. Passo a Passo', 'passo3_desc', 'Passo 3: Descrição', 'textarea', 'Compartilhe apenas os dados necessários para a análise inicial.'),
('home', 'Página Inicial', 'como_funciona', '5. Passo a Passo', 'passo4_title', 'Passo 4: Título', 'text', 'Confira as possibilidades'),
('home', 'Página Inicial', 'como_funciona', '5. Passo a Passo', 'passo4_desc', 'Passo 4: Descrição', 'textarea', 'Um consultor explica as opções que podem estar disponíveis para o seu perfil.'),
('home', 'Página Inicial', 'como_funciona', '5. Passo a Passo', 'passo5_title', 'Passo 5: Título', 'text', 'Analise as condições'),
('home', 'Página Inicial', 'como_funciona', '5. Passo a Passo', 'passo5_desc', 'Passo 5: Descrição', 'textarea', 'Confira instituição responsável, parcelas, taxas, prazos e Custo Efetivo Total.'),
('home', 'Página Inicial', 'como_funciona', '5. Passo a Passo', 'passo6_title', 'Passo 6: Título', 'text', 'Confirme a contratação'),
('home', 'Página Inicial', 'como_funciona', '5. Passo a Passo', 'passo6_desc', 'Passo 6: Descrição', 'textarea', 'Caso concorde com as condições, siga o procedimento indicado pela instituição financeira.'),

-- --------------------------------------------------------
-- PÁGINA SOBRE NÓS
-- --------------------------------------------------------
('sobre', 'Página Sobre Nós', 'header', '1. Cabeçalho', 'title', 'Título', 'text', 'Conheça a BCred Fácil'),
('sobre', 'Página Sobre Nós', 'header', '1. Cabeçalho', 'subtitle', 'Subtítulo', 'textarea', 'Nossa missão é descomplicar o seu acesso ao crédito, com transparência e segurança em todas as etapas.'),
('sobre', 'Página Sobre Nós', 'historia', '2. Nossa História', 'content', 'Texto da História', 'textarea', 'Atuamos como Correspondente no País, em parceria com instituições financeiras contratantes, observando a regulamentação aplicável ao serviço. Somos especialistas em crédito consignado e prezamos pelo atendimento humanizado.'),

-- --------------------------------------------------------
-- TEXTOS GLOBAIS (Rodapé e Topo)
-- --------------------------------------------------------
('global', 'Textos Globais', 'header_top', 'Barra Superior (Topo)', 'texto', 'Texto de Atendimento', 'text', 'ATENDIMENTO EM ATÉ 10 MINUTOS'),
('global', 'Textos Globais', 'footer', 'Rodapé', 'desc', 'Descrição da Empresa', 'textarea', 'Somos Correspondentes Bancários autorizados, oferecendo as melhores soluções financeiras com segurança e agilidade.'),
('global', 'Textos Globais', 'footer', 'Rodapé', 'aviso', 'Aviso Legal (Letras Miúdas)', 'textarea', 'A BCRED CORRESPONDENTE FINANCEIRO LTDA não é uma instituição financeira e não realiza operações de crédito diretamente. Atuamos como correspondente bancário para facilitar o processo junto às instituições parceiras. Não cobramos valores antecipados para aprovar ou depositar empréstimos.')

ON CONFLICT (page_id, section_id, field_key) DO NOTHING;
