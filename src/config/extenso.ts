/**
 * Numerais por extenso, até vinte.
 *
 * Números pequenos em prosa se escrevem por extenso. Sem isso a frase mistura
 * "2" com "duas, três, até seis" e denuncia que o número foi injetado por
 * código — que é justamente o que ele foi. Continua calculado da coleção; só a
 * grafia muda.
 *
 * O gênero importa em português e em espanhol e é a razão de este módulo
 * existir em vez de uma constante solta: "onze cidades" pede *duas*, "doze
 * corais" pede *dois*, e a mesma lista não serve para os dois casos.
 *
 * Acima de vinte devolve o algarismo. Não é limitação a corrigir: numeral por
 * extenso a partir daí atrapalha mais do que ajuda na leitura.
 */
type Genero = 'm' | 'f';

const PT = [
  'zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito',
  'nove', 'dez', 'onze', 'doze', 'treze', 'catorze', 'quinze', 'dezesseis',
  'dezessete', 'dezoito', 'dezenove', 'vinte',
];
const PT_F = [...PT];
PT_F[1] = 'uma';
PT_F[2] = 'duas';

const EN = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
  'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
  'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
];

const ES = [
  'cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho',
  'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis',
  'diecisiete', 'dieciocho', 'diecinueve', 'veinte',
];
const ES_F = [...ES];
ES_F[1] = 'una';

export const porExtenso = (n: number, genero: Genero = 'm') =>
  (genero === 'f' ? PT_F : PT)[n] ?? String(n);

export const porExtensoEn = (n: number) => EN[n] ?? String(n);

export const porExtensoEs = (n: number, genero: Genero = 'm') =>
  (genero === 'f' ? ES_F : ES)[n] ?? String(n);
