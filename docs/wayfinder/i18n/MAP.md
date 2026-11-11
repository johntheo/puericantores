---
label: wayfinder:map
---

# Site em inglês e espanhol

## Destination

Uma spec com todas as decisões tomadas para o site sair em PT, EN e ES ao mesmo
tempo, com tudo traduzido (inclusive histórico e resumo dos corais). Pronta para
`implement`.

## Notes

- Domínio: site institucional estático (Astro 5, Firebase). Ver `PRODUCT.md`, `CONTEXT.md`.
- Skills: `grilling` + `domain-modeling` em todo ticket HITL; `research` nos AFK.
- Planejar, não fazer. Nada de código fora de protótipo.
- Decidido no traçado (11/11/2026):
  - Escopo: tudo traduzido, incluindo históricos e resumos dos corais.
  - Tradução por IA, publicada sem revisão humana.
  - EN e ES lançam juntos.
  - URLs: PT na raiz, `/en/…` e `/es/…`.
  - Sem redirecionamento automático; seletor visível + `hreflang`.
  - Nomes de corais e da federação não se traduzem. Cargos e nomes de eventos
    sim, com o original entre parênteses na primeira menção.
  - Traduções versionadas no repo, geradas em sessão; o build avisa quando o PT
    mudou e a tradução ficou defasada.
  - Histórico pendente e "em preparação" valem igual nos três idiomas.
  - Tradução faltando faz o build falhar.

## Decisions so far

<!-- uma linha por ticket fechado -->

- [Inventário do que é traduzível](02-inventario-do-traduzivel.md): ~10 mil palavras por idioma; 15 históricos; há frases-molde com número e gênero; e-mails pré-preenchidos viram questão própria.
- [Como o Astro 5 faz i18n neste setup](01-como-o-astro-faz-i18n.md): rotas e sitemap nativos; `hreflang` no head é manual; `rota()` conflita com os helpers; nada nativo falha o build por tradução faltante.
- [Onde e em que formato as traduções moram](03-onde-moram-as-traducoes.md): corais com campos por idioma no JSON (Zod barra faltante); páginas e interface em dicionário TS por idioma; caminhos não traduzidos; `rota(caminho, idioma)` sobre o helper do Astro.
- [Guia de estilo da tradução](04-guia-de-estilo-da-traducao.md): EN americano, ES neutro latino; fiel com contexto, sem fato novo; glossário fixo em `docs/guia-de-traducao.md`.
- [Seletor de idioma](05-seletor-de-idioma.md): siglas `PT · EN · ES` inline no cabeçalho e no menu do celular; leva à mesma página no outro idioma.
- [Como o build detecta tradução defasada ou faltando](06-detectar-traducao-defasada.md): faltante derruba (Zod + `astro check` no build e nos deploys); defasada só avisa via hash em `origem.lock.json`, com instrução para leigo.
- [Em que idioma chegam os e-mails de contato](07-idioma-dos-emails-de-contato.md): no idioma do visitante com `[EN]`/`[ES]` no assunto; site diz que a federação responde em PT/EN/ES; filiação é só para coros do Brasil.
- [Como cada idioma se apresenta a buscadores e redes](08-seo-por-idioma.md): lang/og:locale/canônica por idioma; hreflang + x-default → PT; 404 única trilíngue; og:image única com brasão + assinatura; `trailingSlash: 'never'`.

## Not yet specified

<!-- vazio: SEO graduou para ticket próprio; endereço antigo não precisa de nada (o redirect do Firebase preserva o caminho, então /en/… chega intacto) e deploy foi resolvido no ticket de detecção. -->

## Out of scope

- Outros idiomas além de EN e ES.
- Fluxo de revisão humana das traduções (decidido: IA publica direto).
- Migração para CMS.
