/**
 * Gera docs/revisao-historicos.md a partir dos JSONs da coleção.
 *
 * O texto sai da fonte de verdade em vez de ser transcrito à mão: assim o
 * documento que circula entre os corais é sempre igual ao que está no ar.
 * Rode de novo depois de qualquer edição de histórico.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

// Relativo ao próprio arquivo, e não ao diretório de onde se chamou o script:
// assim `node scripts/gerar-revisao-historicos.mjs` funciona de qualquer lugar.
const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const CORAIS = join(RAIZ, 'src/content/corais');
const SAIDA = join(RAIZ, 'docs/revisao-historicos.md');

/** Extensão do documento que cada coral anexou ao cadastro. */
const fontes = {
  'arautos-do-grande-rei': 'historico.pdf',
  'canarinhos-de-campo-largo': 'historico.pdf',
  'canarinhos-de-itabirito': 'historico.pdf',
  'coral-das-meninas-dos-canarinhos-de-petropolis': 'historico.pdf',
  'coral-dom-silverio': 'historico.docx',
  'coro-carpe-diem': 'historico.docx',
  'coro-regina-angelorum': 'historico.docx (arquivo Pages)',
  'meninos-cantores-de-novo-hamburgo': 'historico.docx',
  'pequenos-cantores-de-cassia': 'historico.pdf',
  'pequenos-cantores-de-passos': 'historico.pdf',
  'psalette-de-santo-ivo': 'historico.docx',
};

/** Perguntas abertas por coral. Vazio quer dizer: nada a decidir, só revisar. */
const perguntas = {
  'arautos-do-grande-rei': [
    'O documento cita **Karize Rizoto** como regente auxiliar, e o texto publicado a menciona. Ela deve constar também na lista "Quem conduz"? O cadastro traz apenas Giseli Linhares e Daniela Zanella Abido.',
  ],
  'canarinhos-de-campo-largo': [
    'O documento afirma que o congresso de Roma, em 2023, foi "a primeira participação de um coral pueri do Brasil" num congresso internacional. **A afirmação foi omitida**: os históricos de Cássia e do Carpe Diem registram participação brasileira no congresso do Rio, em 2017, e os Canarinhos de Petrópolis já haviam cantado no Vaticano. Confirmar se a intenção era dizer "primeira participação **deste coral**".',
  ],
  'canarinhos-de-itabirito': [],
  'coral-das-meninas-dos-canarinhos-de-petropolis': [
    'O documento diz **48 meninas**; o cadastro enviado à federação diz **45** (25 sopranos e 20 contraltos). O número foi retirado do histórico para não haver duas contagens na mesma página — mas o resumo do card ainda usa 45. Qual vale?',
  ],
  'coral-dom-silverio': [
    'O documento afirma que João Lucas Rodrigues é o **único fundador da federação ainda em vida**. A frase foi omitida: é o tipo de afirmação que precisa de data para não envelhecer errada. Publicamos? Em que termos?',
  ],
  'coro-carpe-diem': [
    'O documento traz o endereço `corocarpediem.com.br`. **O domínio não resolve** (verificado em 22/08/2026) e por isso não foi publicado. Existe endereço novo?',
    'O papel timbrado traz dois e-mails: `psezerino@bol.com.br`, que é pessoal e **não será publicado** por decisão de LGPD, e `imcarti@bol.com.br`, institucional. Publicamos o institucional?',
    'A fotografia atual do coro é escura, tirada de palco. Pedimos uma substituta.',
  ],
  'coro-regina-angelorum': [
    'O documento é assinado por **Junior Rafael Gonçalves**, que não consta do cadastro. Qual é o cargo dele? Deve entrar em "Quem conduz"?',
  ],
  'meninos-cantores-de-novo-hamburgo': [],
  'pequenos-cantores-de-cassia': [
    'O Instagram **@pequenoscantoresdecassia** foi publicado a partir do rodapé do próprio papel timbrado do Centro Musical Heitor Combat. Confirmar que é o perfil oficial do coral.',
  ],
  'pequenos-cantores-de-passos': [
    'O documento se contradiz sobre a regência: na primeira página diz **Rubens Assis**, no resumo da segunda diz **Messias Faleiros**. O cadastro diz Messias Faleiros, e foi esse o publicado. Confere?',
    'O papel timbrado traz **@coralpequenoscantores**; o cadastro traz **instagram.com/pequenoscantorespassos**. São perfis diferentes? Qual publicamos?',
  ],
  'psalette-de-santo-ivo': [
    'A fotografia atual é uma captura de story do Instagram, com sobreposição de música, contador "1/10" e ícone de mudo. Precisa de substituta.',
  ],
};

const arquivos = Object.keys(fontes).sort();

const linhas = [
  '# Históricos para revisão dos corais',
  '',
  'Os 12 históricos foram reescritos num registro editorial comum, entre 150 e 250',
  'palavras, a partir dos documentos que cada coral anexou ao cadastro da federação.',
  'Nenhum fato novo foi acrescentado: o que não estava no documento de origem não',
  'está no texto.',
  '',
  '**Cada coral precisa revisar o seu antes que o site seja considerado final.**',
  'Os textos já estão no ar — corrigir depois é editar um arquivo, não refazer a',
  'página. Envie este documento ao regente ou à presidência de cada coro.',
  '',
  'Onde há **pergunta**, houve conflito entre o documento e o cadastro, ou uma',
  'afirmação que preferimos não publicar sem confirmação. Essas são as que',
  'realmente precisam de resposta.',
  '',
  'Gerado a partir de `src/content/corais/*.json`. Para atualizar depois de',
  'qualquer edição, regenere em vez de editar este arquivo à mão.',
  '',
  '---',
  '',
  '## Índice',
  '',
];

for (const slug of arquivos) {
  const dados = JSON.parse(readFileSync(join(CORAIS, `${slug}.json`), 'utf8'));
  const nome = dados.nomeCurto ?? dados.nome;
  const n = perguntas[slug]?.length ?? 0;
  const marca = n > 0 ? ` — **${n} ${n === 1 ? 'pergunta' : 'perguntas'}**` : '';
  linhas.push(`- [${nome}](#${slug})${marca}`);
}

linhas.push('', '---', '');

for (const slug of arquivos) {
  const dados = JSON.parse(readFileSync(join(CORAIS, `${slug}.json`), 'utf8'));
  const nome = dados.nomeCurto ?? dados.nome;
  const palavras = dados.historico.split(/\s+/).length;

  linhas.push(
    `<h2 id="${slug}">${dados.nome}</h2>`,
    '',
    `${dados.cidade} · ${dados.uf} · fundado em ${dados.fundacao} · filiado em ${dados.filiacao}`,
    '',
    `Fonte: \`tmp/fontes/${slug}/${fontes[slug]}\` · ${palavras} palavras · `,
    `publicado em \`/corais/${slug}\``,
    '',
    '### Texto publicado',
    ''
  );

  for (const paragrafo of dados.historico.split('\n\n')) {
    linhas.push(`> ${paragrafo}`, '>');
  }
  linhas.pop();

  const abertas = perguntas[slug] ?? [];
  linhas.push('', '### A confirmar', '');

  if (abertas.length === 0) {
    linhas.push('Nada em aberto. Basta o coral confirmar que o texto está correto.');
  } else {
    for (const pergunta of abertas) linhas.push(`- ${pergunta}`);
  }

  linhas.push('', '---', '');
}

linhas.push(
  '## Canarinhos de Petrópolis',
  '',
  'O histórico de Petrópolis foi escrito na fase 1 e não faz parte desta rodada.',
  'Ainda assim, cabe a mesma confirmação do coral antes do lançamento público.',
  ''
);

const diretorio = join(RAIZ, 'docs');
if (!existsSync(diretorio)) mkdirSync(diretorio, { recursive: true });

writeFileSync(SAIDA, linhas.join('\n'), 'utf8');

const totalPerguntas = Object.values(perguntas).flat().length;
console.log(relative(process.cwd(), SAIDA));
console.log(`${arquivos.length} corais · ${totalPerguntas} perguntas em aberto`);
