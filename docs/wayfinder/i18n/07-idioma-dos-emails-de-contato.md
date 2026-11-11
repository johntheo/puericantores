---
type: grilling
status: closed
assignee: claude
blocked_by: []
---

# Em que idioma chegam os e-mails de contato

## Question

Os botões de contato abrem um e-mail pré-preenchido (`assuntos` em
`src/config/federacao.ts`: filiação, imprensa, fotos). Na versão EN/ES, o
assunto e os campos vêm traduzidos, ficam em português, ou bilíngues? Quem na
federação lê e responde mensagens em inglês/espanhol? O site deve dizer em que
idiomas a federação responde?

## Resolução

Decidido em 11/11/2026, com o John.

- **E-mail pré-preenchido no idioma do visitante**, com etiqueta de idioma no
  assunto: `[EN] Membership inquiry`, `[ES] Interés en afiliación`. PT sem
  etiqueta. `assuntos` de `federacao.ts` passa a ser por idioma (dicionário).
- **A federação responde em português, inglês e espanhol** (fato confirmado
  pelo John). Dito na página de contato e junto aos botões de e-mail, nos três
  idiomas.
- **Só coros do Brasil se filiam** (fato confirmado pelo John). A página de
  filiação diz, nos três idiomas: coros de outros países procuram a federação
  do seu país ou a Pueri Cantores internacional, com link para
  puericantores.org. Texto original, não tradução — escrito em PT e traduzido
  como o resto.

Assumido sem discutir: as duas frases novas aparecem nos três idiomas (não só
EN/ES), para o dicionário seguir com as mesmas chaves em todos.
