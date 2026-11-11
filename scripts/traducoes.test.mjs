import { test } from 'node:test';
import assert from 'node:assert/strict';
import { textosDeOrigem, comparar, marcar } from './traducoes.mjs';

const dicionario = {
  menu: { corais: 'Os corais' },
  inicio: {
    titulo: ['Cantar é', 'formar gente.'],
    apoio: ({ cidades }) => `Em ${cidades} cidades`,
  },
};

const corais = [
  { id: 'anjos', data: { historicoPendente: false, historico: { pt: 'História.' }, resumo: { pt: 'Resumo.' } } },
  { id: 'puer', data: { historicoPendente: true, historico: { pt: 'Em breve.' }, resumo: { pt: 'Curto.' } } },
];

test('coleta cada texto PT por chave, incluindo listas, funções e corais', () => {
  const origem = textosDeOrigem({ dicionario, corais });

  assert.equal(origem.get('dicionario.menu.corais'), 'Os corais');
  assert.equal(origem.get('dicionario.inicio.titulo.1'), 'formar gente.');
  assert.match(origem.get('dicionario.inicio.apoio'), /Em \$\{cidades\} cidades/);
  assert.equal(origem.get('corais.anjos.historico'), 'História.');
  assert.equal(origem.get('corais.anjos.resumo'), 'Resumo.');
});

test('histórico pendente não entra: não é traduzido', () => {
  const origem = textosDeOrigem({ dicionario, corais });

  assert.equal(origem.has('corais.puer.historico'), false);
  assert.equal(origem.get('corais.puer.resumo'), 'Curto.');
});

test('registro recém-marcado não acusa nada', () => {
  const origem = textosDeOrigem({ dicionario, corais });

  assert.deepEqual(comparar(origem, marcar(origem)), { defasadas: [], semRegistro: [] });
});

test('PT alterado depois da marcação vira defasada', () => {
  const registro = marcar(textosDeOrigem({ dicionario, corais }));
  const mudado = structuredClone(corais);
  mudado[0].data.historico.pt = 'História revista.';

  const resultado = comparar(textosDeOrigem({ dicionario, corais: mudado }), registro);

  assert.deepEqual(resultado.defasadas, ['corais.anjos.historico']);
});

test('texto novo, nunca marcado, aparece como sem registro', () => {
  const registro = marcar(textosDeOrigem({ dicionario, corais }));
  const novo = { ...dicionario, rodape: { aviso: 'Novo.' } };

  const resultado = comparar(textosDeOrigem({ dicionario: novo, corais }), registro);

  assert.deepEqual(resultado.semRegistro, ['dicionario.rodape.aviso']);
});
