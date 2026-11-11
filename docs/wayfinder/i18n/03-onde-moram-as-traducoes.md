---
type: grilling
status: closed
assignee: claude
blocked_by: [01]
---

# Onde e em que formato as traduções moram

## Question

Para cada tipo do inventário (interface, textos institucionais, conteúdo de
coral), onde fica a tradução e em que formato? Ex.: um JSON por coral por idioma
vs. campos por idioma no mesmo JSON; dicionário TS vs. JSON para a interface;
páginas institucionais duplicadas vs. um template com textos externos. Deve
preservar a promessa do schema (troca de loader por CMS sem tocar componentes).

Inclui: frases-molde com número interpolado e concordância de gênero
(`porExtenso`), `alt`/`aria-label` montados com o nome do coral, e formatação
de números por idioma. Insumo: Inventário do que é traduzível (02).

Insumo: Como o Astro 5 faz i18n neste setup (01). Decidir também qual helper de
link sobrevive (`rota()` vs `getRelativeLocaleUrl`) — os dois juntos duplicam o base.

## Resolução

Decidido em 11/11/2026, com o John.

| Tipo | Onde mora | Formato |
| --- | --- | --- |
| Conteúdo de coral | No próprio JSON do coral | Campos por idioma: `historico: { pt, en, es }`, `resumo: { pt, en, es }`. Fatos (cidade, ano, fotos) uma vez só. |
| Textos institucionais + interface | Um dicionário TS por idioma (`pt.ts`, `en.ts`, `es.ts`), por página/componente | String fixa, ou função quando há número interpolado (`apoio({ cidades, maisAntigo })`); cada idioma resolve concordância e "por extenso". `en`/`es` tipados contra `pt`. |
| Enums (cargos de coral e da diretoria) | Valor segue em PT no dado | Rótulo vem do dicionário na exibição. |
| `federacao.ts` | Dados ficam | `mandato` vira duas datas, formatadas por idioma. Locais de congresso não se traduzem. `assuntos` → ticket dos e-mails de contato. |

Regras do schema:

- `resumo`: obrigatório nos três idiomas.
- `historico.en/es`: obrigatórios **só** quando `historicoPendente` é falso.
- Zod falha o build quando falta tradução de coral — sem código novo.

Rotas e links:

- Uma página = um arquivo, com idioma como rest param opcional
  (`src/pages/[...idioma]/federacao.astro`). Validar cedo que funciona antes de
  `corais/[slug]`; se não, cair para wrapper fino por idioma.
- Caminhos **não** se traduzem: `/en/corais/anjos-de-deus`, `/es/filiacao`.
- `rota(caminho, idioma)` segue como único helper de link, implementado sobre
  `getRelativeLocaleUrl` (nunca envolvendo-o).

Assumido sem discutir (revisar se doer): frases com link ou ênfase no meio são
quebradas em partes no dicionário, em vez de guardar HTML na string.

ADR: `docs/adr/0001-traducao-por-campo-no-conteudo-dos-corais.md`.
