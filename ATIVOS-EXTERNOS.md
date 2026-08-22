# Ativos de terceiros

Registro de todo material neste repositório que **não pertence à federação**.
Mantido separado do `BRIEFING.md` para que a checagem antes de publicar seja
mecânica: material sem autorização nesta lista impede o lançamento.

---

## ✅ AUTORIZADO — 22 de agosto de 2026

As **10 fotografias da Província Franciscana** — a do herói e as 9 do XVII
Congresso Nacional — foram autorizadas. Confirmação repassada por Johnatan
Théo Sierpinski de Souza em 22/08/2026.

O `noindex` foi removido e o site publicado no Firebase da federação.

**Duas providências que continuam abertas:**

1. **Arquivar a autorização por escrito.** Este arquivo registra que ela
   existe, não substitui o documento. A federação deve guardar o e-mail ou
   termo, com data e signatário, junto ao acervo institucional.
2. **Pedir os originais de câmera.** Os arquivos publicados têm 1280px de
   largura; o herói em tela cheia fica levemente esticado em monitor grande.
   Um original de 4000px resolve. Ao recebê-los, reprocesse com
   `node scripts/processar-fotos.mjs` e regenere o herói.

---

## Histórico — o que estava bloqueado antes

### `src/assets/hero-home.jpg`

| | |
|---|---|
| **O que é** | Assembleia de coralistas vista de cima, durante o XVII Congresso Nacional Pueri Cantores |
| **Evento** | Passos (MG), outubro de 2022 |
| **Fonte** | franciscanos.org.br — Província Franciscana da Imaculada Conceição do Brasil |
| **URL** | https://franciscanos.org.br/noticias/wp-content/uploads/2022/10/congresso_1610_4.jpg |
| **Autor** | Não creditado na matéria |
| **Licença** | Nenhuma. Todos os direitos reservados |
| **Situação** | ⚠️ **Sem autorização.** Uso restrito ao protótipo local |

**Como resolver:** a Província Franciscana é a instituição mantenedora dos
Canarinhos de Petrópolis, e o regente deles, Marco Aurélio Lischt, é o
presidente da federação. Pedir autorização e os arquivos originais é
conversa de casa. Peça os **originais de câmera**: o arquivo publicado tem
1280×705, abaixo do ideal para tela cheia — um original de 4000px ou mais
resolve licença e nitidez de uma vez.

### `src/assets/congresso/passos-2022-*.jpg` — 9 arquivos

Mesma origem, mesmo evento, mesma situação de direitos da foto do hero: são
as nove fotografias publicadas pela Província Franciscana na cobertura do XVII
Congresso Nacional. Usadas na seção **Congressos** da página `/galeria`.

Uma única autorização cobre estas nove e a do hero — é o mesmo pedido, ao
mesmo interlocutor. Sem autorização, apague a pasta `src/assets/congresso/` e
a seção some sozinha da galeria, sem quebrar o build:

```bash
rm -rf src/assets/congresso
```

---

**Enquanto não houver autorização**, substitua o hero por
`src/assets/hero-itabirito.jpg` (material da própria federação, 2800×1867):

```bash
cp src/assets/hero-itabirito.jpg src/assets/hero-home.jpg
```

E ajuste o crédito e o `alt` no hero de `src/pages/index.astro`.

---

## 🟢 Disponível, material da federação

### `src/assets/hero-itabirito.jpg`

Coral Canarinhos de Itabirito diante da capela, em Itabirito (MG). Veio do
Drive da própria federação, anexado ao cadastro do coral. 2800×1867.
Sujeito apenas à confirmação de uso de imagem junto ao coral, igual às demais
fotos do site (pendência 4 do `BRIEFING.md`).

---

## Avaliadas e descartadas

Registrado para ninguém refazer a pesquisa.

| Candidata | Por que não |
|---|---|
| Procissão das nações, 44º Congresso Internacional, Roma — foto de Christian Klenk, em puericantores.org, 5472×3648 | Resolução ótima e mensagem imbatível: um coralista carregando a bandeira do Brasil. Mas o valor da imagem está na **cor** da bandeira, e em preto e branco vira multidão anônima. Só entraria abrindo exceção cromática no hero. Direitos de terceiro |
| Festival Pueri Cantores München 2025 — Wikimedia Commons, CC BY-SA 4.0, 4032×3024 | **Licença livre**, mas é a plateia vista de costas num festival de rua, céu cinza e telão. Não parece música sacra |
| Chorfestival Köln 2004 — Wikimedia Commons, CC BY-SA 3.0, 1600×1200 | **Licença livre**, mas praça com cadeiras de plástico, baixa resolução e cara de 2004 |
| XVIII Congresso Nacional, Santa Luzia (MG), 2025 — site da prefeitura | Servidor bloqueia download (HTTP 403) e o maior arquivo seria 750×422 |
| XV Congresso Regional Sudeste, Juiz de Fora, 2018 — Tribuna de Minas | Crédito "Divulgação", e mostra um coral só, não o congresso |
| Assembleia de mãos erguidas, Passos 2022 (`congresso_1610_1.jpg`) | Boa e emotiva, mas um celular e uma mão atravessam o primeiro plano |

**Vídeo:** não foi localizado nenhum material em vídeo utilizável. A missa de
Ano-Novo com o Papa Francisco no 44º Congresso foi gravada, mas os direitos
são do Vaticano e não há arquivo baixável. Fundo em vídeo depende de a
federação filmar ou obter cessão.
