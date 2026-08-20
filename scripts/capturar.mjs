/**
 * Captura telas do site rodando localmente.
 *
 *   node scripts/capturar.mjs                  # rotas padrão, desktop + mobile
 *   node scripts/capturar.mjs /corais          # uma rota
 *   node scripts/capturar.mjs / --movimento    # deixa a animação rodar
 *   node scripts/capturar.mjs / --dobra        # só a primeira dobra
 *
 * Usa o Google Chrome já instalado via playwright-core — nenhum navegador é
 * baixado. Emulação de dispositivo de verdade: capturar com `--window-size`
 * no Chrome headless não funciona abaixo de ~500px no macOS, porque o sistema
 * impõe uma largura mínima de janela e a captura sai recortada em vez de
 * reduzida, o que faz um layout correto parecer quebrado.
 *
 * Por padrão as capturas usam `prefers-reduced-motion`, que entrega o estado
 * final e estático — é o que se quer julgar em revisão de design.
 */
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const BASE = process.env.BASE ?? 'http://localhost:4321';
const DESTINO = 'tmp/shots';

const VIEWPORTS = [
  { nome: 'desktop', width: 1440, height: 900, deviceScaleFactor: 1 },
  { nome: 'mobile', width: 390, height: 844, deviceScaleFactor: 2, isMobile: true },
];

const args = process.argv.slice(2);
const comMovimento = args.includes('--movimento');
const soDobra = args.includes('--dobra');
const rotas = args.filter((a) => !a.startsWith('--'));

const ROTAS = rotas.length
  ? rotas
  : ['/', '/corais', '/corais/canarinhos-de-petropolis', '/federacao'];

await mkdir(DESTINO, { recursive: true });

const navegador = await chromium.launch({ channel: 'chrome' });
const problemas = [];

const nomeArquivo = (rota, viewport) => {
  const limpa = rota === '/' ? 'home' : rota.replace(/^\/|\/$/g, '').replace(/\//g, '-');
  return `${DESTINO}/${limpa}--${viewport}${soDobra ? '-dobra' : ''}.png`;
};

for (const { nome, ...viewport } of VIEWPORTS) {
  const contexto = await navegador.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: viewport.deviceScaleFactor,
    isMobile: viewport.isMobile ?? false,
    hasTouch: viewport.isMobile ?? false,
    locale: 'pt-BR',
    reducedMotion: comMovimento ? 'no-preference' : 'reduce',
  });

  const pagina = await contexto.newPage();

  // Erro de console em página estática é sempre defeito — nunca ruído.
  pagina.on('console', (m) => {
    if (m.type() === 'error') problemas.push(`[console] ${m.text().slice(0, 200)}`);
  });
  pagina.on('pageerror', (e) => problemas.push(`[js] ${e.message.slice(0, 200)}`));

  for (const rota of ROTAS) {
    await pagina.goto(BASE + rota, { waitUntil: 'networkidle' });
    await pagina.evaluate(() => document.fonts.ready);

    // Percorrer a página inteira antes de fotografar. Sem isso, as fotos com
    // `loading="lazy"` abaixo da dobra nunca são solicitadas, e a captura sai
    // com retângulos vazios no lugar dos corais — o que parece um site
    // quebrado quando o site está correto.
    if (!soDobra) {
      // Promover toda imagem a `eager` é mais confiável que rolar a página:
      // rolar só enfileira o carregamento, e a captura acontece antes de o
      // navegador terminar. `decode()` só resolve quando o pixel está pronto.
      await pagina.evaluate(async () => {
        for (const img of document.images) img.loading = 'eager';

        await Promise.all(
          [...document.images].map((img) =>
            img
              .decode()
              .catch(() => undefined)
          )
        );
      });

      await pagina.waitForLoadState('networkidle');
    }

    // Com movimento, esperar a sequência do frontispício terminar.
    if (comMovimento) await pagina.waitForTimeout(3200);

    // Transbordo horizontal é invisível numa captura recortada e arruína o
    // site no celular. Melhor detectar por medida que por inspeção visual.
    const transbordo = await pagina.evaluate(() => {
      const d = document.documentElement;
      return d.scrollWidth > d.clientWidth ? d.scrollWidth - d.clientWidth : 0;
    });
    if (transbordo) problemas.push(`[transbordo] ${rota} (${nome}): +${transbordo}px`);

    const saida = nomeArquivo(rota, nome);
    await pagina.screenshot({ path: saida, fullPage: !soDobra });
    console.log(`  ✓ ${saida}`);
  }

  await contexto.close();
}

await navegador.close();

if (problemas.length) {
  console.log('\nProblemas detectados:');
  for (const p of [...new Set(problemas)]) console.log('  ! ' + p);
} else {
  console.log('\nSem erros de console nem transbordo horizontal.');
}
