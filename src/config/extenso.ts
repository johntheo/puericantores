/**
 * Numerais por extenso, até vinte.
 *
 * Números pequenos em prosa se escrevem por extenso. Sem isso a frase mistura
 * "2" com "duas, três, até seis" e denuncia que o número foi injetado por
 * código — que é justamente o que ele foi. Continua calculado da coleção; só a
 * grafia muda.
 *
 * O gênero importa em português e é a razão de este módulo existir em vez de
 * uma constante solta: "onze cidades" pede *duas*, "doze corais" pede *dois*, e
 * a mesma lista não serve para os dois casos.
 *
 * Acima de vinte devolve o algarismo. Não é limitação a corrigir: numeral por
 * extenso a partir daí atrapalha mais do que ajuda na leitura.
 */
const MASCULINO = [
  'zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito',
  'nove', 'dez', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezesseis',
  'dezessete', 'dezoito', 'dezenove', 'vinte',
];

const FEMININO = [...MASCULINO];
FEMININO[1] = 'uma';
FEMININO[2] = 'duas';

export const porExtenso = (n: number, genero: 'm' | 'f' = 'm') =>
  (genero === 'f' ? FEMININO : MASCULINO)[n] ?? String(n);
