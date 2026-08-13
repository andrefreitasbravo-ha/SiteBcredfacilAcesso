# Checklist de Lançamento — BCred Fácil

> Este documento deve ser revisado antes de qualquer publicação em produção.
> Itens separados por categoria: ✅ Concluído, ⏳ Pendente Técnico, 👤 Pendente do Cliente, 🔑 Pendente de Credenciais.

---

## Domínio e Infraestrutura

| Item | Status | Observação |
|---|---|---|
| Domínio próprio registrado | 👤 | bcredfacil.com.br (verificar com cliente) |
| HTTPS ativo | ⏳ | Automático na Vercel após domínio |
| Domínio conectado ao projeto Vercel | ⏳ | Configurar via Vercel Dashboard |
| Redirecionamento www → sem www (ou vice-versa) | ⏳ | Configurar na Vercel |
| Redirecionamento HTTP → HTTPS | ⏳ | Automático na Vercel |
| `NEXT_PUBLIC_SITE_URL` configurada no Vercel | ⏳ | Ex: `https://bcredfacil.com.br` |

---

## SEO Técnico

| Item | Status | Observação |
|---|---|---|
| `metadataBase` configurado | ✅ | Via `NEXT_PUBLIC_SITE_URL` |
| Title template único | ✅ | `%s \| BCred Fácil` |
| Descriptions únicas por página | ✅ | Todas as páginas principais |
| Canonical por página | ✅ | Implementado nas páginas indexáveis |
| Sitemap dinâmico | ✅ | `/sitemap.xml` gerado pelo Next.js |
| Robots.txt | ✅ | `/robots.txt` gerado dinamicamente |
| LPs com `noindex` | ✅ | `/simule/*` |
| Página `/obrigado` com `noindex, nofollow` | ✅ | Configurado no layout |
| Página 404 personalizada | ✅ | `/not-found.tsx` criado |
| Nenhuma URL com parâmetros no sitemap | ✅ | Sitemap limpo |

---

## Dados Estruturados

| Item | Status | Observação |
|---|---|---|
| `Organization` JSON-LD | ✅ | Injetado no layout |
| `BreadcrumbList` nas páginas de produto | ✅ | Via componente `Breadcrumb` |
| Nenhum `aggregateRating` sem fonte real | ✅ | Não implementado |

---

## Tracking e Analytics

| Item | Status | Observação |
|---|---|---|
| GTM instalado | ⏳ | Aguardando GTM ID do cliente |
| GA4 configurado | ⏳ | Aguardando Measurement ID |
| Google Ads configurado | ⏳ | Aguardando AW ID e Conversion Label |
| Meta Pixel configurado | ⏳ | Aguardando Pixel ID |
| Evento `generate_lead` testado | ⏳ | Testar após conectar GTM |
| Nenhum dado pessoal no dataLayer | ✅ | Verificado no código |
| UTMs capturados no formulário | ✅ | Via `extractUtms` |
| Consentimento LGPD implementado | ✅ | CookieBanner funcional |

---

## Banco de Dados (Supabase)

| Item | Status | Observação |
|---|---|---|
| Conta Supabase criada | 👤 | Criar em supabase.com |
| Projeto criado no Supabase | 👤 | Região: South America (sa-east-1) |
| Tabela `leads` criada | 🔑 | SQL em `supabase/migrations/20240801_create_leads.sql` |
| RLS habilitado | 🔑 | Já incluso na migration SQL |
| `SUPABASE_URL` configurado no Vercel | 🔑 | Requer credenciais |
| `SUPABASE_SERVICE_ROLE_KEY` configurado | 🔑 | Nunca expor no front-end |
| Formulário testado end-to-end | ⏳ | Após Supabase configurado |

---

## Formulários e Conversão

| Item | Status | Observação |
|---|---|---|
| Validação no cliente | ✅ | Via estados React |
| Validação no servidor (Zod) | ✅ | Via Server Action |
| Honeypot anti-spam | ✅ | Campo invisível no formulário |
| Deduplicação de leads | ✅ | Verificação nos últimos 5 minutos |
| Redireciona para `/obrigado` após sucesso | ✅ | Implementado |
| WhatsApp funcional na `/obrigado` | ⏳ | Verificar número `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| LGPD consent armazenado | ✅ | Salvo no banco com versão e timestamp |

---

## Dados da Empresa

| Item | Status | Observação |
|---|---|---|
| Razão Social | ✅ | `BCred Financeiro Ltda` (confirmar com cliente) |
| CNPJ | 👤 | Pendente — não publicar sem confirmação |
| Telefone de atendimento | 👤 | Pendente |
| WhatsApp oficial | 👤 | Configurar em `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| Endereço confirmado | 👤 | Verificar com cliente se é público |
| Horário de atendimento | ✅ | Segunda a Sexta, 8h às 18h |
| E-mail de contato | ✅ | `bcred@bcred.net` (confirmar) |
| Instagram | 👤 | Confirmar handle |

---

## Páginas e Conteúdo

| Item | Status | Observação |
|---|---|---|
| Home (`/`) | ✅ | Revisada na Parte 3 |
| INSS (`/credito-consignado-inss`) | ✅ | Revisada na Parte 4 |
| CLT (`/credito-do-trabalhador-clt`) | ✅ | Revisada na Parte 4 |
| Portabilidade (`/portabilidade-consignado`) | ✅ | Revisada na Parte 4 |
| Segurança (`/seguranca`) | ✅ | Com metadata |
| Sobre (`/sobre`) | ✅ | Com metadata |
| Dúvidas (`/duvidas`) | ✅ | Refatorado com metadata |
| Contato (`/contato`) | ✅ | Refatorado com metadata |
| Política de Privacidade | ✅ | Existente |
| Política de Cookies | ✅ | Existente |
| Termos de Uso | ✅ | Existente |
| LP INSS (`/simule/credito-consignado-inss`) | ✅ | Parte 5 |
| LP CLT (`/simule/credito-do-trabalhador`) | ✅ | Parte 5 |
| LP Portabilidade (`/simule/portabilidade`) | ✅ | Parte 5 |
| Obrigado (`/obrigado`) | ✅ | Parte 5 |
| FGTS (`/antecipacao-saque-aniversario-fgts`) | 👤 | Publicar apenas se confirmado pelo cliente |

---

## Performance e Qualidade

| Item | Status | Observação |
|---|---|---|
| `npm run build` sem erros | ⏳ | Executar após configurar credenciais |
| Favicon configurado | ✅ | `fiveicon.png` |
| Fontes via `next/font` | ✅ | Poppins |
| Imagens com `next/image` | ✅ | Verificado nas páginas |
| Open Graph configurado por página | ✅ | Implementado |

---

## Documentação Entregue

| Documento | Status |
|---|---|
| `docs/seo-keywords.md` | ✅ |
| `docs/search-console-setup.md` | ✅ |
| `docs/tracking-plan.md` | ✅ |
| `docs/content-plan.md` | ✅ |
| `docs/ads-compliance-checklist.md` | ✅ |
| `docs/launch-checklist.md` | ✅ |
| `supabase/migrations/20240801_create_leads.sql` | ✅ |
| `.env.example` | ✅ |

---

## Itens que Dependem do Cliente para Publicação

1. **Domínio próprio** — confirmar o domínio e acesso ao painel DNS
2. **CNPJ** — necessário para exibir nas páginas e dados estruturados
3. **WhatsApp oficial** — número ativo para os botões e formulários
4. **Telefone de contato** (opcional mas recomendado)
5. **Endereço completo confirmado** — para o Google Meu Negócio e JSON-LD
6. **Confirmação das modalidades** — especialmente se a BCred oferece Antecipação FGTS
7. **Fotos reais** — para a página Sobre e Google Meu Negócio
8. **Acesso ao Search Console** — para verificar e enviar sitemap
9. **Acesso ao Google Meu Negócio** — para consistência com os dados do site

---

## Credenciais a Fornecer (Configurar no Vercel Environment Variables)

| Variável | Fornecida por |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Cliente (domínio) |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Google Ads |
| `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` | Google Ads |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Business Suite |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Cliente |
| `SUPABASE_URL` | Supabase |
| `SUPABASE_ANON_KEY` | Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase |
