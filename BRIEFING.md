# Briefing — Site da Federação Nacional dos Meninos Cantores do Brasil

Documento fechado em 19/08/2026 após sessão de grilling.
Fonte primária dos dados: [planilha de cadastro dos corais](https://docs.google.com/spreadsheets/d/12RG2R7Zs382CDu9tr0YiHP9lmPMk6qLX5lkquU4aSMo/edit?gid=571415245).

---

## 1. Definição

Cartão de visitas institucional da federação, com diretório dos corais filiados.
Público: geral, com seções dedicadas a corais interessados em filiação e a imprensa/patrocinadores.
Sem área logada, sem portal do associado.

**Nome:** razão social é *Federação Nacional dos Meninos Cantores do Brasil* (FNMCB) — usada no rodapé e em documentos.
Comunicação no site assina como **Pueri Cantores Brasil**.
A string do nome fica isolada em `src/config/site.ts` para troca trivial se a diretoria mudar de posição.

---

## 2. Escopo

```
/                  Home institucional
/federacao         Quem somos, história, missão, Pueri Cantores no mundo, diretoria
/corais            Diretório: grid de cards + filtro por estado
/corais/[slug]     Página de cada coral (12)
/filiacao          Requisitos e formulário de interesse
/imprensa          Press kit: números, logos, fotos, contato
/contato           Formulário + contatos institucionais
/galeria           Fotos e vídeos
```

### Home

| # | Seção | Conteúdo |
|---|---|---|
| 1 | Hero | Logo grande, nome completo, uma linha, fundo papel. Sobriedade institucional. |
| 2 | O que é | 2 parágrafos + link para /federacao |
| 3 | Números | 12 corais · mais de 700 cantores · 5 estados · desde 19__ |
| 4 | Os corais | 6 cards em destaque + link para /corais |
| 5 | No mundo | Pueri Cantores como federação pontifícia |
| 6 | Chamadas | Filiar-se · Imprensa e apoio |
| 7 | Rodapé | Contato institucional · redes · razão social |

Números publicados **arredondados e datados** ("mais de 700 cantores, levantamento de 2026"). Não são dado auditado — foram somados da planilha.

### Página do coral

`Hero → História → Equipe → Contato → Galeria → próximo coral`

Ficha técnica (ensaios, faixa etária, naipes) e vínculo eclesial (paróquia, diocese, bispo, pároco) **ficam fora desta versão**. Os campos são normalizados e persistidos mesmo assim, para ligar depois sem retrabalho.

---

## 3. Dados pessoais (LGPD)

A planilha é um formulário de cadastro interno. Publicar seu conteúdo integralmente exporia dado pessoal sensível, inclusive de menores.

**Publica**
- Nome do coral, cidade/UF, data de fundação, data de entrada na federação
- História reescrita, foto oficial, logo/brasão
- Nome e cargo de regente, presidente, pianista, preparador vocal
- Redes sociais e site do coral
- E-mail/telefone institucional

**Não publica**
- Endereço residencial de qualquer pessoa
- Data de nascimento de qualquer pessoa
- Telefone pessoal (celular de regente, presidente, pianista)
- E-mail pessoal de quem preencheu o formulário
- Estatuto e ata de eleição — documentos internos, **não serão sequer baixados**
- Situação CMDCA individual por coral

**Imagem de menores:** as fotos enviadas serão usadas (grupo, nunca individual, nenhuma criança nominada), mas a federação deve enviar confirmação por escrito a cada coral autorizando o uso no site oficial.

---

## 4. Stack

| Camada | Escolha | Razão |
|---|---|---|
| Framework | Astro + TypeScript | Content Layer com schema Zod: trocar o loader de JSON local para CMS depois não toca em componente algum |
| Conteúdo | JSON/MDX versionado no repo | 12 corais que mudam pouco; caminho de migração para CMS headless já desenhado |
| Animação | GSAP (gratuito desde 2025, inclui SplitText e ScrollTrigger) | Movimento contido e editorial |
| Imagens | `astro:assets`, AVIF/WebP responsivos | Processadas no build, servidas estáticas. Drive nunca é linkado em produção |
| Hospedagem | Firebase Hosting (plano Spark) | Estático; sem Cloud Functions, sem exigência de Blaze |
| Deploy | GitHub Actions → Firebase, com canais de preview | |
| Formulários | Web3Forms ou Formspree | Mensagem cai direto no e-mail da federação. Sem backend, sem custo |
| Métricas | Cloudflare Web Analytics | Sem cookies, logo sem banner de consentimento |
| Fontes | Auto-hospedadas via Fontsource | Sem chamada ao Google Fonts |

Idioma: **PT-BR apenas**, com strings externalizadas e roteamento i18n configurado sem prefixo. Adicionar inglês depois é tradução, não refatoração.

Acessibilidade: WCAG 2.2 AA, navegação por teclado, `prefers-reduced-motion` respeitado em todas as animações.

---

## 5. Direção visual

**Editorial sacro.** Papel, tinta, um acento vinho. Fotografia P&B monumental. Grid assimétrico, muito respiro. Referência: programa de concerto.

```
papel   #FAF8F4
tinta   #14110E
acento  vermelho do escudo, convertido de CMYK para RGB
```

Verde e amarelo aparecem exclusivamente dentro do logo.

**Tipografia:** Instrument Serif nos títulos (alto contraste, escalas grandes) + Inter Tight em texto, rótulos e números.

**Logo:** os arquivos em `~/Downloads/LOGOS` são PNG raster em CMYK com bisel e degradê. Serão **vetorizados em SVG**, mantendo forma e cores, removendo brilho e bisel. Nenhuma alteração de marca.

**Movimento:** SplitText revelando títulos por linha, parallax lento nas fotos, contadores animados, uma seção com pin na home, transições de página suaves. Sem ScrollSmoother global, sem scroll horizontal.

**Responsividade é premissa, não etapa.** Desktop e mobile validados em paralelo, nunca como adaptação posterior.

---

## 6. Extração de conteúdo

Por coral, baixar do Drive:
- **Histórico** (PDF) — confirmado: é documento anexado, não texto na célula
- **Foto oficial** do coro principal
- **Logo/brasão** quando existir

Os 12 históricos serão **reescritos num padrão editorial comum**, 150–250 palavras, preservando todo fato verificável. Um coral fundado em 2023 e um de 1942 recebem a mesma dignidade de apresentação. Cada coral revisa o seu antes de publicar.

Enriquecimento permitido: **apenas busca das redes sociais faltantes** (só 3 dos 12 preencheram o campo). Perfis confirmados como oficiais antes de publicar. Nenhum fato novo inventado.

Conteúdo institucional da federação: pesquisa em fontes públicas + documentos que você fornecer + marcadores explícitos de pendência onde faltar.

---

## 7. Corais filiados

| Coral | Cidade | UF | Fundação | Filiação |
|---|---|---|---|---|
| Canarinhos de Petrópolis | Petrópolis | RJ | 1942 | 1967 (fundador) |
| Coral Dom Silvério | Sete Lagoas | MG | 1963 | 1968 |
| Pequenos Cantores de Cássia | Cássia | MG | 1972 | 1972 |
| Arautos do Grande Rei | Xaxim | SC | 1972 | 1979 |
| Canarinhos de Itabirito | Itabirito | MG | 1973 | 1976 |
| Coro Carpe Diem | Itajaí | SC | 1986 | 1992 |
| Coral das Meninas dos Canarinhos | Petrópolis | RJ | 1988 | 2025 |
| Canarinhos de Campo Largo | Campo Largo | PR | 1989 | 1994 |
| Meninos Cantores de Novo Hamburgo | Novo Hamburgo | RS | 2005 | 2005 |
| Pequenos Cantores de Passos | Passos | MG | 2012 | 2017 |
| Psalette de Santo Ivo | Florianópolis | SC | 2019 | 2025 |
| Coro Regina Angelorum | Ponta Grossa | PR | 2023 | 2026 |

Agregados: ~520 cantores nos coros principais, ~226 nos preparatórios. 8 dos 12 mantêm coro preparatório.

---

## 8. Entrega

**Fase 1 — protótipo.** Projeto Astro real com home institucional completa e a página de um coral (Petrópolis), dados e foto reais, GSAP funcionando. Publicado em canal de preview do Firebase, URL privada, para a diretoria abrir no celular. Nada é descartado: aprovado, vira o site.

**Fase 2 — site completo.** Extração dos 12 corais, demais rotas, domínio público.

Manutenção: você no início, alguém da federação depois. Logo, o projeto inclui documentação em português escrita para leigo, schema Zod validando conteúdo, e o caminho de migração para CMS headless desenhado e testado.

---

## 9. Pendências suas

| # | Item | Bloqueia |
|---|---|---|
| 1 | Documentos institucionais da federação (estatuto, histórico, diretoria atual) | Conteúdo de /federacao |
| 2 | Ano de fundação da FNMCB | Número na home. Planilha sugere que já existia em 1967 |
| 3 | Domínio — `.org.br` exige CNPJ. A federação tem? | Publicação pública |
| 4 | Confirmação de uso de imagem junto aos 12 corais | Publicação pública das fotos |
| 5 | Decisão da diretoria sobre a assinatura "Pueri Cantores Brasil" | Nada — string isolada em config |
| 6 | E-mail institucional para receber os formulários | Fase 2 |
| 7 | Contatos institucionais para o rodapé | Fase 2 |
