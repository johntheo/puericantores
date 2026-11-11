---
type: research
status: closed
assignee: claude
blocked_by: []
---

# Como o Astro 5 faz i18n neste setup

## Question

O que o Astro 5 oferece nativamente para: rotas com prefixo só nos idiomas não
padrão, helpers de URL por idioma, `hreflang`, sitemap com alternates
(`@astrojs/sitemap` i18n), e conteúdo traduzido em content collections? O que
falha quando a tradução falta (dá para quebrar o build)? Algum conflito com
`base` (GitHub Pages) e com `rota()` em `src/config/site.ts`?

Achados: branch `research/astro-i18n`, arquivo `docs/research/astro-i18n.md`.

## Resolução

Achados completos: commit `041e396`, branch `research/astro-i18n`,
`docs/research/astro-i18n.md` (Astro 5.18.2, @astrojs/sitemap 3.7.3).

- Rotas `/en/`, `/es/` com PT na raiz: nativo; config atual já serve. Páginas
  EN/ES precisam existir em `src/pages/en/` e `src/pages/es/`.
- `getRelativeLocaleUrl` já aplica `base` → **envolver em `rota()` duplica o
  base**; e adiciona barra final, `rota()` não. Precisa escolher um só helper.
- `hreflang` no `<head>`: **não é nativo**; loop manual com `getAbsoluteLocaleUrl`.
- Sitemap: `i18n` nativo, mas repete a lista de idiomas (não lê o config).
- Content collections: convenção documentada é pasta por idioma.
- **Nenhuma opção faz tradução faltante falhar o build**; sem fallback vira 404
  silencioso. Caminhos: `throw` em `getStaticPaths` (inferido, não testado) ou
  script de checagem antes do `astro build`.
