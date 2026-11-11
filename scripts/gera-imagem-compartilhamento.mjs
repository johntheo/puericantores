/**
 * Gera `public/og.png`, a imagem que aparece ao compartilhar o site em redes e
 * mensageiros: o brasão com a assinatura, como no cabeçalho. Uma só para os
 * três idiomas — é nome próprio, não muda com a língua.
 *
 * Rode de novo só se o brasão ou a assinatura mudarem:
 *   node scripts/gera-imagem-compartilhamento.mjs
 */
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright-core';

const raiz = new URL('../', import.meta.url);
const brasao = readFileSync(new URL('public/brasao.svg', raiz), 'utf8');
const fonte = readFileSync(
  new URL('node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2', raiz)
).toString('base64');

const html = `<!doctype html><html><head><style>
  @font-face { font-family: 'Instrument Serif'; src: url(data:font/woff2;base64,${fonte}) format('woff2'); }
  html, body { margin: 0; width: 1200px; height: 630px; background: #faf8f4; }
  body { display: flex; align-items: center; justify-content: center; gap: 56px; }
  svg { width: 300px; height: auto; }
  p { margin: 0; font: 400 104px/1 'Instrument Serif', serif; letter-spacing: -0.01em; color: #14110e; }
</style></head><body>${brasao}<p>Pueri Cantores<br>Brasil</p></body></html>`;

const navegador = await chromium.launch({ channel: 'chrome' });
const pagina = await navegador.newPage({ viewport: { width: 1200, height: 630 } });
await pagina.setContent(html);
await pagina.evaluate(() => document.fonts.ready);
await pagina.screenshot({ path: new URL('public/og.png', raiz).pathname });
await navegador.close();
console.log('public/og.png gerado.');
