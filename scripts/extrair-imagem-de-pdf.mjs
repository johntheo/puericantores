/**
 * Alguns corais anexaram a foto (ou o logo) como PDF em vez de imagem.
 * Quando o PDF é só um invólucro em volta de um JPEG — o caso comum de
 * "imprimir para PDF" ou de scanner —, o JPEG está lá dentro em bytes crus e
 * pode ser recortado pelos marcadores SOI (FFD8FF) e EOI (FFD9).
 *
 *   node scripts/extrair-imagem-de-pdf.mjs <entrada.pdf> <saida.jpg>
 *
 * Se o PDF for vetorial ou usar outra compressão, isso não funciona e o
 * arquivo precisa ser pedido ao coral em formato de imagem.
 */
import { readFile, writeFile } from 'node:fs/promises';

const [entrada, saida] = process.argv.slice(2);
if (!entrada || !saida) {
  console.error('uso: node scripts/extrair-imagem-de-pdf.mjs <entrada.pdf> <saida.jpg>');
  process.exit(1);
}

const pdf = await readFile(entrada);

const candidatos = [];
let cursor = 0;

while (cursor < pdf.length - 3) {
  const inicio = pdf.indexOf(Buffer.from([0xff, 0xd8, 0xff]), cursor);
  if (inicio === -1) break;

  const fim = pdf.indexOf(Buffer.from([0xff, 0xd9]), inicio + 3);
  if (fim === -1) break;

  candidatos.push(pdf.subarray(inicio, fim + 2));
  cursor = fim + 2;
}

if (candidatos.length === 0) {
  console.error(`✗ nenhum JPEG embutido em ${entrada} — provavelmente é vetorial ou usa outra compressão`);
  process.exit(2);
}

// Um PDF pode conter miniaturas além da imagem principal; a maior é a que interessa.
const maior = candidatos.reduce((a, b) => (b.length > a.length ? b : a));

await writeFile(saida, maior);
console.log(
  `✓ ${saida} — ${(maior.length / 1024 / 1024).toFixed(1)} MB` +
    (candidatos.length > 1 ? ` (maior de ${candidatos.length} imagens encontradas)` : '')
);
