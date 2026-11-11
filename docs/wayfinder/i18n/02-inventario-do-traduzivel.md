---
type: task
status: closed
assignee: claude
blocked_by: []
---

# Inventário do que é traduzível

## Question

Onde mora hoje todo texto em português visível ao público? Páginas `.astro`,
componentes, `src/config/*`, JSONs dos corais, `alt`, `<title>`/meta, enums do
schema (cargos), datas e números, `extenso.ts`. Saída: lista por arquivo com
tipo (interface, institucional, conteúdo de coral, formatação) e volume
aproximado. Sem decidir formato — só o mapa do terreno.

## Resolução

Feito em 11/11/2026. Volume total estimado: **~10 mil palavras por idioma**.

| Tipo | Onde | Volume aprox. |
| --- | --- | --- |
| Conteúdo de coral | `src/content/corais/*.json`: `historico` (150–245 pal.) e `resumo` (~18 pal.) | 17 corais, 2 pendentes → 15 a traduzir, ~3.300 pal. |
| Conteúdo de coral (enum) | `equipe[].cargo` no schema (`Regente`, `Presidente`…) | 5 valores |
| Institucional | Prosa inline nas páginas `index`, `federacao`, `filiacao`, `imprensa`, `galeria`, `contato`, `corais/*` | ~4.000 pal. (contagem inclui ruído de código) |
| Institucional (dados) | `src/config/federacao.ts`: cargos da diretoria, `mandato` (data por extenso), locais de congressos (nomes de cidade — não traduzir), `assuntos` (assunto/corpo dos e-mails pré-preenchidos) | ~150 pal. |
| Institucional (dados) | `src/config/site.ts`: `descricao`, `levantamento`, `navegacao[].rotulo` | ~40 pal. |
| Interface | Componentes: `Cabecalho`, `MenuMobile`, `Rodape`, `Lightbox`, `CarrosselCorais`, `CardCoral`, `MiniGaleria`, `EmPreparacao`, `Pendencia` | dezenas de rótulos curtos |
| Interface (acessibilidade) | `alt` e `aria-label` montados com template literal a partir do nome do coral (6 lugares) | frases-molde |
| Meta | `Base.astro`: `<html lang="pt-BR">`, `og:locale pt_BR`, `titulo`/`descricao` por página | 1 por página |
| Formatação | `toLocaleString('pt-BR')` em `federacao.astro` e `scripts/motion.ts`; `localeCompare(…,'pt-BR')` em `contato.astro` | 3 lugares |
| Formatação | `porExtenso` (gênero gramatical) em frases de `index.astro:97` e `filiacao.astro:137` | 2 frases com número interpolado |

Fatos para os próximos tickets:

- Razão social e assinatura ficam em `site.ts`; são **Nome próprio** (não traduzir).
- Há frases com números interpolados e concordância de gênero: o formato da
  tradução precisa suportar frase-molde com variável, não só string fixa.
- Os e-mails pré-preenchidos (`assuntos`) chegam à federação — traduzir muda o
  idioma do que ela recebe. Virou ticket próprio.
