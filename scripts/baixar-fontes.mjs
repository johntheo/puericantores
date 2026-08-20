/**
 * Baixa do Google Drive os arquivos de origem dos corais.
 *
 * Baixa APENAS histórico, foto e logo. Estatutos e atas de eleição são
 * documentos internos da federação e não entram no repositório em hipótese
 * alguma — ver BRIEFING.md, seção 3.
 *
 *   node scripts/baixar-fontes.mjs [slug-do-coral]
 *
 * Os arquivos caem em tmp/fontes/ que está no .gitignore: são material bruto,
 * não conteúdo publicável. As fotos tratadas vão para src/assets/ depois.
 */
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const PERMITIDO = new Set(['historico', 'foto', 'logo']);
const DESTINO = 'tmp/fontes';

const fontes = JSON.parse(await readFile('scripts/fontes-drive.json', 'utf8'));
const filtro = process.argv[2];

/** O endpoint uc?export=download serve o binário direto para arquivos com link público. */
const urlDownload = (id) =>
  `https://drive.google.com/uc?export=download&id=${encodeURIComponent(id)}`;

/** Descobre a extensão pelos bytes iniciais — o Drive não devolve nome de arquivo confiável. */
function extensao(buffer) {
  const b = new Uint8Array(buffer.slice(0, 12));
  if (b[0] === 0x25 && b[1] === 0x50 && b[2] === 0x44 && b[3] === 0x46) return 'pdf';
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'jpg';
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return 'png';
  if (b[0] === 0x50 && b[1] === 0x4b) return 'docx';
  if (b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46) return 'gif';
  return 'bin';
}

let baixados = 0;
let pulados = 0;

for (const [slug, arquivos] of Object.entries(fontes.corais)) {
  if (filtro && slug !== filtro) continue;

  await mkdir(join(DESTINO, slug), { recursive: true });

  for (const [tipo, id] of Object.entries(arquivos)) {
    if (!PERMITIDO.has(tipo)) {
      pulados++;
      continue;
    }
    if (!id || id === 'BLOQUEADO') continue;

    const resposta = await fetch(urlDownload(id), { redirect: 'follow' });
    if (!resposta.ok) {
      console.error(`  ✗ ${slug}/${tipo}: HTTP ${resposta.status}`);
      continue;
    }

    const buffer = await resposta.arrayBuffer();
    const ext = extensao(buffer);

    // Página de aviso do Drive ("arquivo grande demais para verificar vírus")
    // volta como HTML em vez do binário. Melhor falhar alto que salvar lixo.
    if (ext === 'bin' && buffer.byteLength < 100_000) {
      console.error(`  ✗ ${slug}/${tipo}: resposta não é um arquivo (${buffer.byteLength} bytes)`);
      continue;
    }

    const caminho = join(DESTINO, slug, `${tipo}.${ext}`);
    await writeFile(caminho, Buffer.from(buffer));
    console.log(`  ✓ ${caminho}  ${(buffer.byteLength / 1024 / 1024).toFixed(1)} MB`);
    baixados++;
  }
}

console.log(`\n${baixados} arquivos baixados. ${pulados} ignorados por não estarem na lista permitida.`);
