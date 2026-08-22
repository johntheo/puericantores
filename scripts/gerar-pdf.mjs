/**
 * Gera os PDFs dos documentos em `docs/`, para enviar à federação.
 *
 *   node scripts/gerar-pdf.mjs                    # todos
 *   node scripts/gerar-pdf.mjs o-que-falta        # um só
 *   node scripts/gerar-pdf.mjs o-que-falta --png  # e uma imagem para conferir
 *
 * Markdown não se envia para uma diretoria de voluntários: o que chega é um
 * PDF que abre em qualquer celular. Por isso este script existe em vez de a
 * conversão ser manual — depois de qualquer correção nos documentos, é uma
 * linha para refazer os anexos.
 *
 * Usa o Chrome já instalado, via playwright-core, e as fontes do próprio site.
 * O PDF sai com a mesma tipografia das páginas: um documento que parece ter
 * saído do mesmo lugar que o site.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join, basename, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

/**
 * Markdown para HTML, sem dependência instalada.
 *
 * O conversor entra por `npx` na hora de rodar, em vez de morar no
 * package.json: o site não usa markdown em lugar nenhum, e carregar uma
 * dependência permanente por causa de um script de documento seria pagar caro
 * por pouco. O npx guarda em cache, então só a primeira execução baixa algo.
 *
 * Vai por stdin, e não por argumento, porque os documentos passam de 20 mil
 * caracteres e a linha de comando tem limite.
 */
const paraHtml = (markdown) =>
  execFileSync('npx', ['--yes', 'marked@18', '--gfm'], {
    input: markdown,
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  });

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = join(RAIZ, 'docs');
const FONTES = join(RAIZ, 'node_modules/@fontsource');

/** Documentos que vão à federação. O de WhatsApp é de uso interno. */
const PADRAO = ['o-que-falta', 'revisao-historicos'];

/** Subtítulo impresso sob o título, na capa de cada documento. */
const SUBTITULOS = {
  'o-que-falta': 'Federação Nacional dos Meninos Cantores do Brasil',
  'revisao-historicos': 'Para envio a cada coral filiado',
  'mensagem-whatsapp': 'Uso interno',
};

/**
 * Fonte embutida como data URI.
 *
 * O Chrome recusa `file://` dentro de uma página carregada por `setContent`,
 * que roda em `about:blank` e não tem origem — a fonte simplesmente não
 * chegaria e o PDF sairia com a serifa do sistema. Em base64 não há requisição
 * nenhuma para ser bloqueada.
 */
const embutir = (familia, arquivo) => {
  const caminho = join(FONTES, familia, 'files', arquivo);
  return `data:font/woff2;base64,${readFileSync(caminho).toString('base64')}`;
};

const FACES = [
  ['Instrument Serif', 400, 'normal', embutir('instrument-serif', 'instrument-serif-latin-400-normal.woff2')],
  ['Instrument Serif', 400, 'italic', embutir('instrument-serif', 'instrument-serif-latin-400-italic.woff2')],
  ['Inter Tight', 400, 'normal', embutir('inter-tight', 'inter-tight-latin-400-normal.woff2')],
  ['Inter Tight', 500, 'normal', embutir('inter-tight', 'inter-tight-latin-500-normal.woff2')],
  ['Inter Tight', 600, 'normal', embutir('inter-tight', 'inter-tight-latin-600-normal.woff2')],
]
  .map(
    ([familia, peso, estilo, uri]) => `@font-face{font-family:'${familia}';font-weight:${peso};
      font-style:${estilo};font-display:block;src:url(${uri}) format('woff2')}`
  )
  .join('\n');

/* O brasão vai na capa. Lido do arquivo que a imprensa também baixa, para não
   haver duas versões do desenho circulando. */
const brasao = `data:image/svg+xml;base64,${readFileSync(join(RAIZ, 'public/brasao.svg')).toString('base64')}`;

const CSS = `
${FACES}

/* Margens do papel. O rodapé com o número da página é desenhado pelo Chrome,
   fora desta caixa — daí a margem inferior mais generosa. */
@page { size: A4; margin: 20mm 18mm 22mm; }

* { box-sizing: border-box; }

body {
  font-family: 'Inter Tight', system-ui, sans-serif;
  font-size: 10.5pt;
  line-height: 1.55;
  color: #14110E;
  margin: 0;
}

/* Capa: o brasão, o título e o subtítulo, e então o documento começa na
   mesma página. Página de rosto separada desperdiçaria folha num documento
   que a diretoria vai ler no celular. */
.capa { border-bottom: 1px solid #E0D9CD; padding-bottom: 14mm; margin-bottom: 10mm; }
.capa img { width: 26mm; display: block; margin-bottom: 7mm; }

h1 {
  font-family: 'Instrument Serif', Georgia, serif;
  font-weight: 400; font-size: 26pt; line-height: 1.05;
  letter-spacing: -0.02em; margin: 0;
}

.capa p { color: #55504A; font-size: 10pt; margin: 4mm 0 0; }

h2 {
  font-family: 'Instrument Serif', Georgia, serif;
  font-weight: 400; font-size: 17pt; line-height: 1.1; letter-spacing: -0.02em;
  margin: 11mm 0 4mm; padding-top: 4mm; border-top: 1px solid #E0D9CD;
  break-after: avoid; break-inside: avoid;
}

h3 {
  font-family: 'Inter Tight', sans-serif;
  font-weight: 600; font-size: 10.5pt; letter-spacing: 0.01em;
  margin: 7mm 0 2.5mm; break-after: avoid;
}

p { margin: 0 0 3.5mm; orphans: 3; widows: 3; }

/* Um filete vermelho à esquerda transforma a citação em destaque de leitura.
   É onde ficam as analogias que explicam domínio a quem não é técnico. */
blockquote {
  margin: 5mm 0; padding: 3.5mm 0 3.5mm 6mm;
  border-left: 2px solid #ED1C24; background: #F7F4EE;
  color: #55504A;
}
blockquote p:last-child { margin-bottom: 0; }

ul, ol { margin: 0 0 4mm; padding-left: 5.5mm; }
li { margin-bottom: 1.8mm; }

table {
  width: 100%; border-collapse: collapse; margin: 4mm 0 6mm;
  font-size: 9pt; break-inside: auto;
}
th {
  text-align: left; font-weight: 600; padding: 2.5mm 3mm 2.5mm 0;
  border-bottom: 1px solid #14110E; vertical-align: bottom;
}
td {
  padding: 2.5mm 3mm 2.5mm 0; border-bottom: 1px solid #E0D9CD;
  vertical-align: top;
}
tr { break-inside: avoid; }
th:last-child, td:last-child { padding-right: 0; }

/* Só a primeira coluna das tabelas de item ("1.1", "2.3") precisa ser estreita
   e não quebrar; sem isto o Chrome dá a ela um terço da largura. */
td:first-child { white-space: nowrap; }
td:first-child:has(strong) { white-space: normal; }

code {
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  font-size: 0.88em; background: #F2EEE7; padding: 0.4mm 1.2mm;
  border-radius: 1px; word-break: break-word;
}

a { color: #A31219; text-decoration: none; word-break: break-word; }

strong { font-weight: 600; }

hr { border: 0; border-top: 1px solid #E0D9CD; margin: 9mm 0; }
/* O separador imediatamente antes de um h2 duplicaria o filete do próprio h2. */
hr + h2 { border-top: 0; padding-top: 0; margin-top: 0; }
/* Mesmo caso logo abaixo da capa, que já fecha com a sua própria borda. */
.capa + h2 { border-top: 0; padding-top: 0; margin-top: 0; }

/* Âncoras do índice do documento de revisão. */
h2[id] { break-before: page; }
h2[id]:first-of-type { break-before: auto; }
`;

const RODAPE = `
<div style="width:100%;font-family:sans-serif;font-size:7pt;color:#706961;
  padding:0 18mm;display:flex;justify-content:space-between;">
  <span>Pueri Cantores Brasil · puericantores.web.app</span>
  <span class="pageNumber"></span>
</div>`;

const comoPng = process.argv.includes('--png');
const pedidos = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const alvos = pedidos.length
  ? pedidos.map((p) => basename(p, '.md'))
  : PADRAO.filter((nome) => readdirSync(DOCS).includes(`${nome}.md`));

if (alvos.length === 0) {
  console.error('Nenhum documento encontrado em docs/.');
  process.exit(1);
}

const navegador = await chromium.launch({ channel: 'chrome' });
const pagina = await navegador.newPage();

for (const nome of alvos) {
  const md = readFileSync(join(DOCS, `${nome}.md`), 'utf8');

  /* A primeira linha é o `# título` e as seguintes, até a régua, são o
     cabeçalho do documento. Viram a capa; o resto vira corpo. Assim o título
     não aparece duas vezes. */
  const linhas = md.split('\n');
  const titulo = (linhas[0] ?? '').replace(/^#\s*/, '').trim();
  const inicio = linhas.findIndex((l, i) => i > 0 && l.trim() === '---');
  const corpo = linhas.slice(inicio + 1).join('\n');

  const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
    <title>${titulo}</title><style>${CSS}</style></head><body>
    <header class="capa">
      <img src="${brasao}" alt="">
      <h1>${titulo}</h1>
      <p>${SUBTITULOS[nome] ?? ''}</p>
    </header>
    ${paraHtml(corpo)}
    </body></html>`;

  await pagina.setContent(html, { waitUntil: 'load' });
  await pagina.evaluate(() => document.fonts.ready);

  /* `--png` guarda uma imagem do documento inteiro em `tmp/shots/`. Serve para
     conferir tipografia, tabelas e citações sem depender de leitor de PDF —
     e é como se revisa o resultado depois de mexer no CSS acima. */
  if (comoPng) {
    await pagina.setViewportSize({ width: 794, height: 1200 });
    const imagem = join(RAIZ, 'tmp/shots', `pdf-${nome}.png`);
    await pagina.screenshot({ path: imagem, fullPage: true });
    console.log(`  ✓ ${relative(process.cwd(), imagem)}`);
  }

  const saida = join(DOCS, `${nome}.pdf`);
  await pagina.pdf({
    path: saida,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: RODAPE,
    margin: { top: '20mm', bottom: '22mm', left: '18mm', right: '18mm' },
  });

  console.log(`  ✓ ${relative(process.cwd(), saida)}`);
}

await navegador.close();
