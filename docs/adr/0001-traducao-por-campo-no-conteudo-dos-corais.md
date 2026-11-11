# Tradução por campo no conteúdo dos corais

O conteúdo de cada coral guarda as traduções como campos por idioma no próprio
JSON (`historico: { pt, en, es }`), e não numa pasta por idioma como sugere a
receita de i18n do Astro. Assim os fatos do coral (cidade, ano, fotos) existem
uma vez só, e o schema Zod, exigindo os três idiomas, faz o build falhar quando
falta tradução — requisito do projeto que o Astro não oferece nativamente.
CMSs headless também traduzem por campo, então a troca futura do loader segue
sem tocar componentes.

## Considered Options

- Pasta por idioma com cópia inteira do JSON: fatos triplicados, podem divergir.
- Arquivo de tradução separado juntado por slug: falta de tradução não falha o
  build sem código próprio.
