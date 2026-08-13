# Plano de Conteúdo Editorial — BCred Fácil

> Conteúdos educativos aumentam a autoridade da marca, geram tráfego orgânico qualificado e ajudam a responder as dúvidas do público antes de um primeiro contato.
> 
> **Regra fundamental:** Nenhum artigo deve ser publicado incompleto ou sem fonte verificada.

---

## Estrutura Sugerida

Rota de conteúdos: `/conteudos/[slug]`

Cada conteúdo deve conter:
- Título claro (H1)
- Data de publicação e atualização
- Identificação editorial: "Conteúdo revisado pela equipe BCred Fácil"
- Fontes oficiais ao final
- CTA para modalidade relacionada
- Aviso: "As regras podem mudar — consulte nossa equipe para informações atualizadas."

---

## Prioridade Alta — Publicar Primeiro

### 1. O que é Crédito Consignado INSS?

| Campo | Valor |
|---|---|
| Slug | `/conteudos/o-que-e-credito-consignado-inss` |
| Palavra-chave | o que é crédito consignado INSS |
| Intenção | Informacional |
| Página relacionada | `/credito-consignado-inss` |
| CTA | "Consultar possibilidades para INSS" |
| Fonte sugerida | INSS — meu.inss.gov.br |
| Revisão | Semestral |

---

### 2. O que é Margem Consignável?

| Campo | Valor |
|---|---|
| Slug | `/conteudos/o-que-e-margem-consignavel` |
| Palavra-chave | o que é margem consignável |
| Intenção | Informacional |
| Página relacionada | `/credito-consignado-inss` |
| CTA | "Verificar margem com nossa equipe" |
| Fonte sugerida | Banco Central, INSS |
| Revisão | Semestral |

---

### 3. Como Identificar Golpe de Crédito Consignado?

| Campo | Valor |
|---|---|
| Slug | `/conteudos/como-identificar-golpe-consignado` |
| Palavra-chave | golpe crédito consignado |
| Intenção | Informacional + Segurança |
| Página relacionada | `/seguranca` |
| CTA | "Confirmar canal oficial da BCred" |
| Fonte sugerida | Banco Central, SENACON |
| Revisão | Trimestral |

---

### 4. Como Consultar Contratos no Meu INSS?

| Campo | Valor |
|---|---|
| Slug | `/conteudos/como-consultar-extrato-consignado-meu-inss` |
| Palavra-chave | extrato empréstimos Meu INSS |
| Intenção | Informacional Prático |
| Página relacionada | `/credito-consignado-inss` |
| CTA | "Falar com nossa equipe" |
| Fonte sugerida | meu.inss.gov.br |
| Revisão | Semestral |

---

## Prioridade Média — Segunda Fase

### 5. O que é CET e Por que é Importante?

| Campo | Valor |
|---|---|
| Slug | `/conteudos/o-que-e-cet-credito-consignado` |
| Palavra-chave | o que é CET no consignado |
| Intenção | Informacional |
| Página relacionada | `/portabilidade-consignado` |
| CTA | "Analisar meu contrato atual" |
| Fonte sugerida | Banco Central |
| Revisão | Semestral |

---

### 6. Como Funciona a Portabilidade de Consignado?

| Campo | Valor |
|---|---|
| Slug | `/conteudos/como-funciona-portabilidade-consignado` |
| Palavra-chave | como funciona portabilidade de consignado |
| Intenção | Informacional + Comparação |
| Página relacionada | `/portabilidade-consignado` |
| CTA | "Analisar meu contrato atual" |
| Fonte sugerida | Banco Central |
| Revisão | Semestral |

---

### 7. Portabilidade e Refinanciamento São a Mesma Coisa?

| Campo | Valor |
|---|---|
| Slug | `/conteudos/portabilidade-vs-refinanciamento` |
| Palavra-chave | portabilidade vs refinanciamento consignado |
| Intenção | Comparação |
| Página relacionada | `/portabilidade-consignado` |
| CTA | "Consultar com nossa equipe" |
| Fonte sugerida | Banco Central |
| Revisão | Semestral |

---

### 8. O que é o Crédito do Trabalhador CLT?

| Campo | Valor |
|---|---|
| Slug | `/conteudos/o-que-e-credito-do-trabalhador-clt` |
| Palavra-chave | o que é Crédito do Trabalhador |
| Intenção | Informacional |
| Página relacionada | `/credito-do-trabalhador-clt` |
| CTA | "Consultar possibilidades para CLT" |
| Fonte sugerida | Ministério do Trabalho |
| Revisão | Trimestral (regras em evolução) |

---

### 9. Como Comparar Duas Propostas de Crédito?

| Campo | Valor |
|---|---|
| Slug | `/conteudos/como-comparar-propostas-credito` |
| Palavra-chave | como comparar proposta de crédito consignado |
| Intenção | Informacional Prático |
| Página relacionada | `/portabilidade-consignado` |
| CTA | "Receber orientação pelo WhatsApp" |
| Fonte sugerida | Banco Central |
| Revisão | Semestral |

---

## Regras Editoriais

1. **Não publicar incompleto.** O artigo deve estar pronto antes de entrar no ar.
2. **Não inventar datas de atualização.** Usar a data real da última revisão do conteúdo.
3. **Não incluir no sitemap** artigos com `draft: true` ou sem conteúdo final.
4. **Separar claramente** o conteúdo educativo da oferta comercial.
5. **Citar fontes oficiais** com link externo usando `rel="noopener noreferrer"`.
6. **Não copiar textos de terceiros.** Resumir com linguagem própria.
7. **Revisar periodicamente** — regras financeiras mudam.

---

## Implementação Técnica

- A rota `/conteudos/[slug]` ainda **não está criada**. Será implementada em uma próxima etapa.
- Cada artigo terá metadata própria (title, description, canonical).
- Os artigos **serão adicionados ao sitemap** apenas quando publicados e completos.
- Estrutura de dados `Article` (JSON-LD) será adicionada a cada conteúdo.
