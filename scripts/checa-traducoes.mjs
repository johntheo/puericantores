/**
 * Avisa quando o português mudou depois da tradução.
 *
 *   node scripts/checa-traducoes.mjs           → confere e avisa (nunca falha)
 *   node scripts/checa-traducoes.mjs --marcar  → grava o registro atual
 *
 * Só a sessão de tradução roda `--marcar`, depois de traduzir. Ninguém edita
 * `src/i18n/origem.lock.json` à mão.
 *
 * Tradução FALTANDO não é com este script: o schema dos corais e o
 * `astro check` já derrubam o build. Aqui é só tradução DEFASADA, que avisa
 * e deixa publicar — uma correção urgente no português não pode ficar presa
 * esperando tradução.
 */
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { pt } from '../src/i18n/pt.ts';
import { textosDeOrigem, comparar, marcar } from './traducoes.mjs';

const RAIZ = new URL('../', import.meta.url);
const REGISTRO = new URL('src/i18n/origem.lock.json', RAIZ);
const PASTA_CORAIS = new URL('src/content/corais/', RAIZ);

const corais = readdirSync(PASTA_CORAIS)
  .filter((f) => f.endsWith('.json'))
  .map((f) => ({ id: f.replace(/\.json$/, ''), data: JSON.parse(readFileSync(new URL(f, PASTA_CORAIS), 'utf8')) }));

const origem = textosDeOrigem({ dicionario: pt, corais });

if (process.argv.includes('--marcar')) {
  writeFileSync(REGISTRO, JSON.stringify(marcar(origem), null, 2) + '\n');
  console.log(`Registro de traduções atualizado: ${origem.size} textos.`);
  process.exit(0);
}

const registro = existsSync(REGISTRO) ? JSON.parse(readFileSync(REGISTRO, 'utf8')) : {};
const { defasadas, semRegistro } = comparar(origem, registro);
const pendentes = [...defasadas, ...semRegistro];

if (pendentes.length === 0) {
  console.log('Traduções em dia.');
} else {
  console.warn(
    [
      '',
      `⚠  ${pendentes.length} texto(s) em português mudaram depois da tradução para inglês e espanhol:`,
      ...pendentes.map((k) => `   - ${k}`),
      '',
      '   O site publica assim mesmo, mas as versões em inglês e espanhol estão desatualizadas.',
      '   Para atualizar: abra o Claude Code neste projeto e peça:',
      '     "atualize as traduções defasadas"',
      '',
    ].join('\n')
  );
}
