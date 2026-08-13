# Configuração do Google Search Console — BCred Fácil

## O que é o Google Search Console?

O Google Search Console (GSC) é uma ferramenta gratuita do Google que permite monitorar e manter a presença do site nos resultados de busca. Sem ele, é impossível saber quais páginas estão indexadas, quais palavras-chave geram cliques e se há erros de rastreamento.

---

## Passo 1: Adicionar a Propriedade

1. Acesse [https://search.google.com/search-console](https://search.google.com/search-console)
2. Faça login com o Gmail vinculado ao Google Ads/Analytics da empresa.
3. Clique em **"Adicionar propriedade"**.
4. **Escolha o tipo Domínio** (não "Prefixo de URL"), pois cobre automaticamente www, http e https.
5. Digite o domínio: `bcredfacil.com.br` (sem www, sem https).

---

## Passo 2: Verificar Propriedade via DNS (Recomendado)

1. O GSC mostrará um registro TXT para adicionar no DNS do domínio.
2. Acesse o painel de controle do seu provedor de domínio (ex: RegistroBR, Godaddy, Cloudflare).
3. Adicione o registro TXT fornecido pelo GSC na zona de DNS.
4. Aguarde de 15 minutos a 48 horas.
5. Clique em "Verificar" no GSC.

> Alternativas: Verificação por arquivo HTML (menos robusta) ou meta tag (`<head>`).

---

## Passo 3: Enviar o Sitemap

1. No GSC, acesse **Sitemaps** no menu lateral.
2. No campo de URL, insira: `sitemap.xml`
3. Clique em **"Enviar"**.
4. O GSC irá processar e exibir quantas URLs foram encontradas e quantas foram indexadas.

> O sitemap do projeto é gerado automaticamente em `/sitemap.xml` pelo Next.js.

---

## Passo 4: Solicitar Indexação das Páginas Principais

Após a publicação, use a ferramenta **"Inspeção de URL"** para cada página principal:

- `/`
- `/credito-consignado-inss`
- `/credito-do-trabalhador-clt`
- `/portabilidade-consignado`
- `/seguranca`
- `/sobre`
- `/duvidas`
- `/contato`

Para cada URL:
1. Cole a URL no campo de inspeção.
2. Clique em **"Solicitar indexação"**.
3. Aguarde a confirmação.

---

## Passo 5: Verificar a Cobertura

Após alguns dias, verifique:
- **"Índice > Páginas"**: Quantas páginas estão indexadas, excluídas, com erros ou redirecionadas.
- Páginas com `noindex` (LPs e obrigado) devem aparecer como "Excluídas pelo usuário" — isso é o comportamento esperado.

---

## Passo 6: Acompanhamento Mensal

| O que acompanhar | Onde encontrar no GSC |
|---|---|
| Consultas de pesquisa | Desempenho > Consultas |
| Páginas que mais recebem cliques | Desempenho > Páginas |
| Impressões e CTR | Desempenho > Datas |
| Core Web Vitals | Experiência > Core Web Vitals |
| Links externos recebidos | Links > Links externos |
| Erros de rastreamento | Cobertura > Erros |
| Páginas excluídas indevidamente | Cobertura > Excluídas |

---

## ⚠️ Pendências

- [ ] Domínio próprio conectado (necessário para verificação via DNS)
- [ ] Acesso ao painel do provedor de domínio
- [ ] Conta Gmail da empresa com acesso ao GSC
- [ ] Confirmação de qual domínio usar: `bcredfacil.com.br` ou `www.bcredfacil.com.br`

> **Dica:** Defina uma única versão canônica (sem www ou com www) e configure redirecionamento permanente (301) da outra versão. O site já usa canonical por página para facilitar isso.
