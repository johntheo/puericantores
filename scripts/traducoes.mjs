/**
 * Lógica do registro de traduções: o que é texto de origem e o que mudou.
 *
 * Cada texto em português que tem tradução ganha uma impressão digital no
 * momento em que foi traduzido (`src/i18n/origem.lock.json`). Se o português
 * muda depois, a impressão não bate e a tradução está defasada.
 *
 * Funções puras; quem lê arquivos e imprime é `checa-traducoes.mjs`.
 */
import { createHash } from 'node:crypto';

export const impressao = (texto) => createHash('sha1').update(texto).digest('hex').slice(0, 12);

/** Percorre o dicionário PT: strings, listas e funções (pelo texto-fonte). */
const percorrer = (valor, chave, saida) => {
  if (typeof valor === 'string') saida.set(chave, valor);
  else if (typeof valor === 'function') saida.set(chave, valor.toString());
  else if (valor && typeof valor === 'object')
    for (const [k, v] of Object.entries(valor)) percorrer(v, `${chave}.${k}`, saida);
};

/**
 * Todo texto PT que tem tradução, por chave estável.
 * @param {{ dicionario: object, corais: { id: string, data: any }[] }} fontes
 * @returns {Map<string, string>}
 */
export const textosDeOrigem = ({ dicionario, corais }) => {
  const saida = new Map();
  percorrer(dicionario, 'dicionario', saida);

  for (const { id, data } of corais) {
    // Histórico pendente não é traduzido, então não tem o que comparar.
    if (!data.historicoPendente) saida.set(`corais.${id}.historico`, data.historico.pt);
    saida.set(`corais.${id}.resumo`, data.resumo.pt);
  }
  return saida;
};

/** Registro novo: impressão de cada texto de origem atual. */
export const marcar = (origem) =>
  Object.fromEntries([...origem].sort(([a], [b]) => a.localeCompare(b)).map(([k, t]) => [k, impressao(t)]));

/** O que mudou desde a última marcação. */
export const comparar = (origem, registro) => {
  const defasadas = [];
  const semRegistro = [];
  for (const [chave, texto] of origem) {
    if (!(chave in registro)) semRegistro.push(chave);
    else if (registro[chave] !== impressao(texto)) defasadas.push(chave);
  }
  return { defasadas, semRegistro };
};
