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
| `npm run build` | Confere tipos e traduções e gera o site estático em `dist/` |
| `npm run preview` | Serve o `dist/` para conferir o build |
| `npm run check` | Verifica tipos e templates |
| `npm run traducoes:checar` | Lista textos em português que mudaram depois da tradução (o build já roda isto) |
| `npm run traducoes:marcar` | Registra as traduções como em dia. Só depois de traduzir |
| `npm test` | Testes do verificador de traduções |
| `npm run shots` | Captura as telas em desktop e celular, e acusa transbordo horizontal e erro de console |

### Publicar

| Comando | Vai para |
|---|---|
| `npm run deploy:preview` | Canal de preview do Firebase, URL temporária que expira em 30 dias |
| `npm run deploy` | `puericantores.web.app` — o endereço em uso |

Projeto Firebase: **`site-fnpcb`**. Requer `firebase login` uma vez.

### Os dois sites do projeto

O projeto hospeda **dois** sites, mapeados por apelido em `.firebaserc`:

| Apelido | Site | O que serve |
|---|---|---|
| `principal` | `puericantores.web.app` | O site |
| `antigo` | `site-fnpcb.web.app` | Redirecionamento 301 para o principal, preservando o caminho |

`site-fnpcb.web.app` foi o primeiro endereço publicado e a diretoria já o tem
no WhatsApp. Ele não serve arquivo nenhum — só encaminha, para que não exista
uma cópia velha do site viva num endereço que alguém pode abrir.

Cuidado ao mexer nos `redirects`: a captura do Firebase é `:nome*`, **não**
`:splat` (isso é Netlify, e faz a regra não casar com nada). E `:caminho*` não
casa com a raiz nua — ela precisa de regra própria.

O build tem três destinos, alternados por `DEPLOY_ALVO`: `firebase` (padrão),
`pages` (o preview no GitHub, que serve de subpasta) e `dominio` (para quando
**puericantores.com.br** for registrado — em 22/08/2026 o nome estava livre no
Registro.br, ainda não registrado).

---

## Onde mexer em cada coisa

| Quero mudar | Arquivo |
|---|---|
| Nome, assinatura, e-mail, menu | `src/config/site.ts` |
| Congressos, fatos da Pueri Cantores, assuntos de e-mail | `src/config/federacao.ts` |
| Dados de um coral | `src/content/corais/<slug>.json` |
| Quais campos um coral pode ter | `src/content.config.ts` |
| Cores, fontes, escalas | `src/styles/global.css` |
| Animações | `src/scripts/motion.ts` |
| Brasão na tela | `src/components/Brasao.astro` |
| Brasão para download | `public/brasao.svg` |

Os dois brasões são o mesmo desenho em dois lugares: o componente serve às
páginas, o arquivo em `public/` é o que a imprensa baixa. Alterou um, altere o
outro.

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
node scripts/gerar-revisao-historicos.mjs  # refaz docs/revisao-historicos.md
node scripts/gerar-pdf.mjs [nome] [--png]  # gera os PDFs de docs/
```

Os arquivos brutos caem em `tmp/`, que está no `.gitignore`.

`gerar-revisao-historicos.mjs` monta o documento que vai aos corais lendo os
próprios JSONs, para que o texto revisado seja sempre igual ao publicado.
Rode-o de novo depois de qualquer correção de histórico. As perguntas em aberto
por coral ficam dentro do script — é lá que se acrescenta ou se risca uma.

`gerar-pdf.mjs` converte os documentos de `docs/` em PDF, usando o Chrome e as
fontes do próprio site — markdown não se envia para uma diretoria de
voluntários. Depois de editar qualquer documento, rode de novo para refazer os
anexos; `--png` guarda também uma imagem em `tmp/shots/` para conferir o
resultado sem abrir leitor de PDF.

O conversor de markdown entra por `npx` na hora de rodar e **não** está no
`package.json`: o site não usa markdown em lugar nenhum, e uma dependência
permanente por causa de um script de documento sairia cara demais pelo que
entrega. A primeira execução baixa; as seguintes usam o cache do npx.

Os PDFs gerados estão no `.gitignore`. São derivados dos `.md`, que são a
fonte de verdade — versionar os dois deixaria os arquivos divergirem.

### Os documentos em `docs/`

| Arquivo | Para quem |
|---|---|
| `o-que-falta.md` | Diretoria — o que falta, por quem resolve, incluindo a explicação do domínio |
| `revisao-historicos.md` | Cada coral — o texto publicado e as perguntas em aberto |
| `mensagem-whatsapp.md` | Uso interno — mensagens prontas para enviar |

Os dois primeiros viram PDF. O de WhatsApp não, porque não é para enviar como
anexo.

---

## Estado atual — Fase 2

**Pronto:** as sete rotas do escopo existem com conteúdo real. Home
institucional, diretório dos 12 corais com filtro por estado, página individual
de cada coral com histórico escrito, galeria, `/federacao`, `/filiacao`,
`/imprensa` e `/contato`. Menu mobile, brasão vetorizado, design system,
animações.

**Pendente:**

| # | Item |
|---|---|
| 1 | **Revisão dos históricos pelos corais** — os 12 textos estão no ar; `docs/revisao-historicos.md` é o documento a circular, com 12 perguntas em aberto |
| 2 | Documentos institucionais da diretoria: estatuto, histórico da FNMCB, ata de eleição. Destravam a fundação da federação, a lista completa de congressos, os requisitos de filiação e a seção de diretoria |
| 3 | CNPJ, endereço da sede e redes sociais da federação |
| 4 | Confirmação de uso de imagem junto aos 12 corais |
| ~~4b~~ | ~~Autorização das fotos de terceiro~~ — **concedida em 22/08/2026**. Falta arquivar o documento e pedir os originais em alta |
| 5 | **Fotos para as galerias** — existe uma foto por coral. Peça de 4 a 6 por coro: a mini galeria aparece sozinha a partir da segunda, sem precisar de código |
| 5b | **Duas fotos impróprias**: a da Psalette de Santo Ivo é um print de story do Instagram, com overlay de música, contador "1/10" e ícone de mudo; a do Coro Carpe Diem é uma foto escura de palco. Pedir substitutas |
| 6 | Analítica sem cookies (Cloudflare Web Analytics) |
| 7 | Logo do Passos: PDF vetorial, precisa de conversão |
| 8 | Manual da marca e brasão em PNG de alta resolução, para `/imprensa` |

Onde falta documento, a página **diz que falta**, diz o que falta e diz quem
destrava. Nada de texto inventado ou lorem
ipsum na frente da diretoria.

### Formulários

Não há. `/contato` e `/filiacao` usam `mailto:` com assunto e roteiro
pré-preenchidos, definidos em `src/config/federacao.ts`. Um serviço de
formulário exigiria conta de terceiro, chave em variável de ambiente e um
endpoint recebendo dado de menor de idade; o `mailto` entrega no mesmo lugar
sem nada disso. Se a federação quiser mudar depois, o ponto de troca é um só.

---

## Por que Astro

O conteúdo hoje é JSON versionado. Quando a federação quiser um CMS, troca-se
apenas o `loader` em `src/content.config.ts` — o schema e todos os componentes
que o consomem ficam intactos. Foi o motivo da escolha.
