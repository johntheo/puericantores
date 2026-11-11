---
type: grilling
status: closed
assignee: claude
blocked_by: [03]
---

# Como o build detecta tradução defasada ou faltando

## Question

Qual o mecanismo concreto para (1) falhar o build quando falta tradução e
(2) avisar quando o PT mudou depois da tradução? Ex.: hash do texto de origem
gravado junto da tradução; comparação por git; checagem no schema Zod. Aviso
ou falha no caso (2)?

Contexto (de "Onde e em que formato as traduções moram"): faltante em coral já
falha via Zod. Faltante no dicionário só aparece em `astro check`, que hoje não
roda antes de `astro build` — decidir se passa a rodar.

## Resolução

Decidido em 11/11/2026, com o John.

**Faltante → build falha.**
- Corais: Zod (campos por idioma obrigatórios; ver "Onde e em que formato as
  traduções moram").
- Dicionário: `astro check` (EN/ES tipados contra PT).
- `npm run build` vira `astro check && node scripts/checa-traducoes.mjs && astro build`.
  `deploy` e `deploy:preview` passam a chamar `npm run build`, não `astro build`
  direto — hoje pulariam as checagens.
- O `throw` em `getStaticPaths` da pesquisa fica desnecessário.

**Defasada → só aviso, build passa.**
- `src/i18n/origem.lock.json` guarda o hash de cada texto PT (campos de coral e
  chaves do dicionário; funções pelo texto-fonte) no momento da tradução.
- `scripts/checa-traducoes.mjs` compara com o PT atual e lista o que mudou.
  Histórico pendente não tem tradução nem hash.
- Só a sessão de tradução escreve o registro, via `npm run traducoes:marcar`.
  Ninguém edita à mão.
- O aviso traz a instrução literal para leigo: "abra o Claude Code neste projeto
  e peça: atualize as traduções defasadas". A sessão lê
  `docs/guia-de-traducao.md`, traduz e marca.
