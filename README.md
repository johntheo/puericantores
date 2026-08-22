# Site da Federação Nacional dos Meninos Cantores do Brasil

Site institucional e diretório dos corais filiados. Comunica como **Pueri Cantores Brasil**.

Decisões de produto, escopo e política de dados: [`BRIEFING.md`](./BRIEFING.md).

---

## Rodar

```bash
npm install
npm run dev      # http://localhost:4321
```

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor local com recarga automática |
| `npm run build` | Gera o site estático em `dist/` |
| `npm run preview` | Serve o `dist/` para conferir o build |
| `npm run check` | Verifica tipos e templates |
| `npm run shots` | Captura as telas em desktop e celular, e acusa transbordo horizontal e erro de console |

### Publicar

| Comando | Vai para |
|---|---|
| `npm run deploy:preview` | Canal de preview do Firebase, URL temporária que expira em 30 dias |
| `npm run deploy` | `site-fnpcb.web.app` — o endereço oficial |

Projeto Firebase: **`site-fnpcb`**. Requer `firebase login` uma vez.

O build tem três destinos, alternados por `DEPLOY_ALVO`: `firebase` (padrão),
`pages` (o preview no GitHub, que serve de subpasta) e `dominio` (para quando
**puericantores.com.br** for registrado — hoje o domínio não existe).

---

## Onde mexer em cada coisa

| Quero mudar | Arquivo |
|---|---|
| Nome, assinatura, e-mail, menu | `src/config/site.ts` |
| Dados de um coral | `src/content/corais/<slug>.json` |
| Quais campos um coral pode ter | `src/content.config.ts` |
| Cores, fontes, escalas | `src/styles/global.css` |
| Animações | `src/scripts/motion.ts` |
| Brasão | `src/components/Brasao.astro` |

### Adicionar um coral novo

1. Coloque a foto em `src/assets/corais/<slug>.jpg` (máx. 2400px de largura).
2. Crie `src/content/corais/<slug>.json` copiando outro como modelo.
3. `npm run dev` — se faltar campo obrigatório, o erro diz exatamente qual.

O schema em `src/content.config.ts` valida tudo no build. Um coral com dado
faltando quebra o build em vez de ir ao ar quebrado.

---

## O que NÃO entra no site

O schema **não tem campos** para endereço residencial, data de nascimento ou
telefone pessoal. Isso é proposital: a planilha de cadastro da federação contém
esses dados, e publicá-los seria problema de LGPD — inclusive envolvendo
menores. Não adicione esses campos sem ler a seção 3 do `BRIEFING.md`.

Estatutos e atas de eleição são documentos internos e não são nem baixados.
`scripts/fontes-drive.json` marca esses IDs como `BLOQUEADO` e o script de
download os ignora por lista de permissão, não por exclusão.

---

## Scripts de extração

Rodados uma vez para trazer o conteúdo da planilha da federação. Ficam no
repositório para poder repetir quando entrar coral novo.

```bash
node scripts/baixar-fontes.mjs [slug]   # baixa histórico, foto e logo do Drive
node scripts/processar-fotos.mjs        # redimensiona para src/assets/corais/
node scripts/extrair-imagem-de-pdf.mjs <entrada.pdf> <saida.jpg>
```

Os arquivos brutos caem em `tmp/`, que está no `.gitignore`.

---

## Estado atual — Fase 1

**Pronto:** home institucional, diretório dos 12 corais com filtro por estado,
página individual de cada coral, brasão vetorizado, design system, animações.

**Pendente:**

| # | Item |
|---|---|
| 1 | Histórico reescrito de 11 corais (só Petrópolis está pronto) |
| 2 | Conteúdo institucional: `/federacao`, `/filiacao`, `/imprensa`, `/contato` |
| 3 | Ano de fundação da federação |
| 4 | Confirmação de uso de imagem junto aos 12 corais |
| ~~4b~~ | ~~Autorização das fotos de terceiro~~ — **concedida em 22/08/2026**. Falta arquivar o documento e pedir os originais em alta |
| 5 | Menu mobile (entra com as rotas da fase 2) |
| 6 | **Fotos para as galerias** — existe uma foto por coral. Peça de 4 a 6 por coro: a mini galeria aparece sozinha a partir da segunda, sem precisar de código |
| 6b | **Duas fotos impróprias**: a da Psalette de Santo Ivo é um print de story do Instagram, com overlay de música, contador "1/10" e ícone de mudo; a do Coro Carpe Diem é uma foto escura de palco. Pedir substitutas |
| 7 | Serviço de formulário e analítica sem cookies |
| 8 | Logo do Passos: PDF vetorial, precisa de conversão |

As páginas em preparação **dizem que estão em preparação** — nada de texto
inventado ou lorem ipsum na frente da diretoria.

---

## Por que Astro

O conteúdo hoje é JSON versionado. Quando a federação quiser um CMS, troca-se
apenas o `loader` em `src/content.config.ts` — o schema e todos os componentes
que o consomem ficam intactos. Foi o motivo da escolha.
