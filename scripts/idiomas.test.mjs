import { test } from 'node:test';
import assert from 'node:assert/strict';
import { caminhoSemIdioma } from '../src/i18n/idiomas.ts';

// O seletor de idioma e o hreflang recolocam outro prefixo neste caminho.
test('tira o prefixo de idioma e a base do deploy', () => {
  assert.equal(caminhoSemIdioma('/', '/'), '/');
  assert.equal(caminhoSemIdioma('/corais/x', '/'), '/corais/x');
  assert.equal(caminhoSemIdioma('/en', '/'), '/');
  assert.equal(caminhoSemIdioma('/es/corais/x', '/'), '/corais/x');
  assert.equal(caminhoSemIdioma('/puericantores/en/federacao', '/puericantores'), '/federacao');
});

test('não confunde caminho que só começa com as letras do idioma', () => {
  assert.equal(caminhoSemIdioma('/entrada', '/'), '/entrada');
  assert.equal(caminhoSemIdioma('/escola/en', '/'), '/escola/en');
});
