/**
 * Converte as fotos brutas do Drive em assets versionáveis.
 *
 * As originais chegam entre 1 e 18 MB (uma delas 5760x3840). Commitar isso é
 * insustentável, e o astro:assets já gera AVIF/WebP responsivos no build a
 * partir de um master razoável. 2400px de largura cobre hero em tela 2x.
 *
 *   node scripts/processar-fotos.mjs
 */
import { mkdir, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const ORIGEM = 'tmp/fontes';
const DESTINO = 'src/assets/corais';
const LARGURA_MAX = 2400;

await mkdir(DESTINO, { recursive: true });

const slugs = (await readdir(ORIGEM, { withFileTypes: true }))
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

let total = 0;

// foto.jpg vira <slug>.jpg (principal); foto2.jpg vira <slug>-2.jpg (galeria).
const VARIANTES = [['foto.jpg', ''], ['foto2.jpg', '-2']];

for (const slug of slugs) {
  for (const [arquivo, sufixo] of VARIANTES) {
    const entrada = join(ORIGEM, slug, arquivo);

    try {
      await stat(entrada);
    } catch {
      if (!sufixo) console.error(`  ✗ ${slug}: sem foto.jpg`);
      continue;
    }

    const saida = join(DESTINO, `${slug}${sufixo}.jpg`);
    const meta = await sharp(entrada).metadata();

    await sharp(entrada)
      .rotate() // respeita o EXIF de orientação antes de redimensionar
      .resize({ width: LARGURA_MAX, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(saida);

    const depois = await stat(saida);
    console.log(
      `  ✓ ${slug}${sufixo}  ${meta.width}x${meta.height} → ${Math.min(meta.width ?? 0, LARGURA_MAX)}px  ${(depois.size / 1024).toFixed(0)} KB`
    );
    total++;
  }
}

console.log(`\n${total} fotos processadas em ${DESTINO}/`);
