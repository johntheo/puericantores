# Wayfinder — rastreador local

Cada mapa é uma pasta. `MAP.md` é o mapa; `NN-slug.md` são os tickets (filhos).

Frontmatter de ticket:

- `type`: research | prototype | grilling | task
- `status`: open | closed
- `assignee`: vazio = livre; preenchido = reivindicado
- `blocked_by`: lista de ids (`NN`). Desbloqueado quando todos estão `closed`.

Fronteira = `status: open`, `assignee` vazio, todos os `blocked_by` fechados.
Resolução: seção `## Resolução` no fim do ticket, `status: closed`, e uma linha em
"Decisões até aqui" no `MAP.md`.
