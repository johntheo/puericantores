---
type: grilling
status: closed
assignee: claude
blocked_by: []
---

# Como cada idioma se apresenta a buscadores e redes

## Question

Para as páginas EN/ES: `<html lang>` e `og:locale` por idioma (hoje fixos em
`Base.astro`); título e descrição de cada página traduzidos pelo dicionário;
`hreflang` manual no `<head>` (não é nativo; ver pesquisa) incluindo
`x-default`; `i18n` no `sitemap()` repetindo a lista de idiomas; e página 404
— hoje não existe nenhuma: criar uma, e por idioma? Também: a imagem de
compartilhamento (og:image) muda por idioma?

## Resolução

Decidido em 11/11/2026, com o John.

- **Metadados por página e idioma:** `<html lang>` (`pt-BR`/`en`/`es`),
  `og:locale` (`pt_BR`/`en_US`/`es_LA`), título e descrição do dicionário,
  canônica autorreferente (cada idioma aponta para si, não para o PT).
- **`hreflang`** manual no `<head>` com as três versões + `x-default` → PT.
  Sitemap com `i18n` (mesmos três idiomas).
- **404:** uma só, `src/pages/404.astro`, com a mensagem curta em PT, EN e ES
  empilhadas e link para a home de cada idioma. Sem regras extras no Firebase.
- **Imagem de compartilhamento (`og:image`):** uma só para os três idiomas — o
  brasão com a assinatura "Pueri Cantores Brasil", como no cabeçalho. Nome
  próprio, então não varia por idioma. Hoje o site não tem nenhuma.
- **Barra final:** `trailingSlash: 'never'` no Astro, para casar com
  `trailingSlash: false` do Firebase; sem isso, `getRelativeLocaleUrl` gera
  `/en/…/` e cada link passa por um redirect.
