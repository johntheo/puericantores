---
type: prototype
status: closed
assignee: claude
blocked_by: []
---

# Seletor de idioma

## Question

Como o seletor aparece e se comporta no cabeçalho e no menu mobile? Rótulos
(PT/EN/ES, nomes por extenso, bandeiras não), posição, e para onde leva quando
a página atual existe no outro idioma (mesma página) — ou não existe.

Contexto: caminhos não se traduzem, então "mesma página em outro idioma" é só
trocar o prefixo `/en/`, `/es/` ou nenhum.

Protótipo: branch `prototype/seletor-idioma` (3 variantes em `?variant=A|B|C`).

## Resolução

Decidido em 11/11/2026, com o John: **variante A** (protótipo em
`prototype/seletor-idioma`, commit `0aced27`).

- Siglas `PT · EN · ES`, sempre visíveis; atual marcado com o mesmo sublinhado
  de acento da navegação e `aria-current`.
- Desktop: à direita da navegação principal. Celular: no painel do menu, abaixo
  dos links, acima do e-mail.
- Cada sigla tem `title`/nome completo no próprio idioma, `lang` e `hreflang`.
- Sem bandeiras. Sem dropdown. Sem faixa no topo.
- Destino: mesma página, trocando só o prefixo (`/`, `/en/`, `/es/`). Página
  ausente não existe como caso: o build falha antes.

Pendente para a implementação: testar com leitor de tela e teclado.
