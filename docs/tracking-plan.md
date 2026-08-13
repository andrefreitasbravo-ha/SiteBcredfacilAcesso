# Plano de Rastreamento (Tracking Plan) — BCred Fácil

## Estrutura

Este plano define todos os eventos que devem ser monitorados no site. Todos os eventos são enviados pelo `dataLayer` e coletados pelo **Google Tag Manager (GTM)**, que então encaminha para GA4, Google Ads e Meta Pixel conforme configurado.

---

## Variáveis de Ambiente Necessárias

| Variável | Exemplo | Plataforma |
|---|---|---|
| `NEXT_PUBLIC_GTM_ID` | `GTM-XXXXXXX` | Google Tag Manager |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Google Analytics 4 |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | `AW-XXXXXXXXX` | Google Ads |
| `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL` | `xXxXxxxxxx` | Google Ads (Conversão) |
| `NEXT_PUBLIC_META_PIXEL_ID` | `XXXXXXXXXXXXXXXX` | Meta (Facebook/Instagram) |

---

## Eventos do DataLayer

### Visualizações de Página

| Evento | Gatilho | Página | Tipo | Parâmetros |
|---|---|---|---|---|
| `landing_view` | Carregamento da LP | `/simule/*` | Secundário | `product`, `page_path` |
| `thank_you_view` | Carregamento da /obrigado | `/obrigado` | Secundário | `product`, `lead_id` |

---

### Interações com Formulários

| Evento | Gatilho | Tipo | Parâmetros |
|---|---|---|---|
| `form_view` | Formulário entra no viewport | Secundário | `product`, `location` |
| `form_start` | Primeiro campo preenchido | Secundário | `product`, `location`, `page_path` |
| `form_error` | Validação falhou | Diagnóstico | `product`, `error_type`, `page_path` |
| `form_submit` | Clique em "Enviar" | Secundário | `product`, `location`, `page_path` |
| `generate_lead` | Lead salvo com sucesso no servidor | **Conversão Principal** | `product`, `event_id`, `location`, `page_path` |

> **Importante:** O evento `generate_lead` só é disparado **após confirmação do servidor** (Server Action). Nunca antes.

---

### Interações com CTAs

| Evento | Gatilho | Tipo | Parâmetros |
|---|---|---|---|
| `click_whatsapp` | Clique em botão/link do WhatsApp | Conversão | `product`, `location`, `page_path` |
| `click_phone` | Clique em número de telefone | Secundário | `page_path` |

---

### Conteúdo e Engajamento

| Evento | Gatilho | Tipo | Parâmetros |
|---|---|---|---|
| `faq_open` | Accordion aberto no FAQ | Engajamento | `faq_question_id`, `product` |
| `view_security` | Seção de segurança visualizada | Engajamento | `page_path` |
| `view_institutions` | Seção de instituições visualizada | Engajamento | `page_path` |
| `select_profile` | Perfil selecionado na LP | Engajamento | `product`, `profile_answer` |

---

## Configuração no GTM

### Sequência Recomendada

1. **Criar conta e container GTM** no [tagmanager.google.com](https://tagmanager.google.com).
2. Inserir o **ID do GTM** na variável `NEXT_PUBLIC_GTM_ID` do projeto.
3. Criar uma **Tag GA4** (tipo: configuração GA4) para rastrear page_views automaticamente.
4. Criar **Triggers de Evento Personalizado** para cada `event` listado acima.
5. Criar **Tags** para Google Ads e Meta Pixel usando os triggers correspondentes.

### Tag de Conversão Principal (Google Ads)

- **Trigger:** Evento personalizado — `generate_lead`
- **Tag:** Google Ads Conversion
- **Conversion ID:** `NEXT_PUBLIC_GOOGLE_ADS_ID`
- **Conversion Label:** `NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL`
- **Deduplicação:** Usar `event_id` como Order ID para evitar duplicatas

### Tag de Lead (Meta Pixel)

- **Trigger:** Evento personalizado — `generate_lead`
- **Tag:** Meta Pixel — Evento Padrão `Lead`
- **Event ID:** Usar `event_id` para deduplicação via Meta Conversions API (futura)

---

## Regras de Privacidade

- **Nenhum dado pessoal** (nome, telefone, e-mail, CPF) deve ser enviado ao dataLayer.
- O `event_id` é o UUID gerado pelo banco, não um dado pessoal.
- O consentimento via **CookieBanner** deve ser registrado antes de ativar qualquer tag de tracking.
- No GTM, criar **bloqueio de tags** quando o consentimento não for concedido.

---

## Atribuição via UTMs

Os parâmetros capturados e armazenados no banco:

| Parâmetro | Exemplo |
|---|---|
| `utm_source` | `google` / `meta` / `whatsapp` |
| `utm_medium` | `cpc` / `organic` / `social` |
| `utm_campaign` | `consignado-inss-nova-iguacu` |
| `utm_content` | `banner-hero-azul` |
| `utm_term` | `credito consignado inss` |
| `gclid` | *(gerado pelo Google Ads)* |
| `fbclid` | *(gerado pelo Meta Ads)* |

---

## Pendências

- [ ] GTM ID fornecido pelo cliente
- [ ] GA4 Measurement ID configurado
- [ ] Google Ads ID e Conversion Label
- [ ] Meta Pixel ID
- [ ] Configuração de Consent Mode no GTM
