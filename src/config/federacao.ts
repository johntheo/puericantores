import type { Dicionario } from '~/i18n/pt';

/**
 * Fatos institucionais, com procedência.
 *
 * Regra do projeto: nada aqui pode ser lembrança nem paráfrase de senso comum.
 * Cada item traz a fonte no comentário. O que não tem fonte não entra — vira
 * pendência marcada na página, que é o comportamento correto para um site
 * institucional que a diretoria vai assinar.
 *
 * Quando novos documentos da federação chegarem, é este arquivo que cresce;
 * as páginas não mudam.
 */

/* ------------------------------------------------------------------ */
/* A federação internacional                                           */
/* ------------------------------------------------------------------ */

/**
 * Fonte: puericantores.org, seção de história, consultada em agosto de 2026.
 * Os números de abrangência são os que a própria federação internacional
 * publica — por isso aparecem arredondados e atribuídos, nunca como dado nosso.
 */
export const internacional = {
  fundador: 'Fernand Maillet',
  /** 11/11/1944, data do concerto em Paris que a federação toma como fundação. */
  fundacao: 1944,
  /** Ano em que a Secretaria de Estado da Santa Sé chancelou o estatuto. */
  estatutoChancelado: 1965,
  paises: 35,
  cantores: 40000,
  site: 'https://www.puericantores.org',
} as const;

/* ------------------------------------------------------------------ */
/* Diretoria                                                          */
/* ------------------------------------------------------------------ */

/** Fonte: Ata da Assembleia Geral Ordinária de 26 de julho de 2025. */
export const diretoria = {
  /** Datas ISO; cada idioma as escreve por extenso. */
  mandato: { inicio: '2025-07-31', fim: '2028-07-31' },
  executiva: [
    { cargo: 'Presidente', nome: 'Messias Donizete Faleiros' },
    { cargo: 'Vice-presidente', nome: 'Eric Vinícius de Aguiar Lana' },
    { cargo: 'Secretário', nome: 'Djeison Engelke Borges' },
    { cargo: 'Vice-secretária', nome: 'Giseli Linhares' },
    { cargo: 'Tesoureiro', nome: 'Felipe Terra do Carmo' },
    { cargo: 'Vice-tesoureiro', nome: 'Filipe Nolasco Pedrosa' },
  ],
  conselhoFiscal: {
    titulares: [
      'Otávio Luiz Ribeiro Bretas',
      'Amauri Artimos da Matta',
      'Marco Aurélio Lischt dos Santos',
    ],
    suplentes: ['Paulo Sezerino', 'Diego Pedrosa Frizero', 'Damiana Zago'],
  },
} as const;

/* ------------------------------------------------------------------ */
/* Congressos                                                          */
/* ------------------------------------------------------------------ */

interface Congresso {
  /** Numeral da edição, como o próprio evento se identifica. */
  edicao: string;
  ano: number;
  /** Cidade brasileira, como está; lugar estrangeiro é traduzido pelo dicionário. */
  local: string;
  /** Uma linha de contexto, quando há fato a acrescentar. Chave do dicionário. */
  nota?: keyof Dicionario['federacao']['notas'];
  /** Ainda não aconteceu: a página trata como anúncio, não como histórico. */
  futuro?: boolean;
}

/**
 * Congressos nacionais.
 *
 * Fonte: relação "Congressos Federação Pueri Cantores Brasil", enviada pela
 * federação em novembro de 2026.
 *
 * Os numerais XVI a XVIII vêm dos históricos dos corais (Campo Largo e Cássia).
 * As edições anteriores ficam sem numeral: a relação oficial não os traz, e
 * numeral deduzido por contagem é o tipo de erro que ninguém revisaria depois.
 *
 * Em 2017 a relação lista o Rio de Janeiro, mas era o XLI Congresso
 * Internacional, que já aparece na coluna própria. Fica fora daqui para não
 * contar duas vezes.
 *
 * 2027 e 2028 ficam de fora até a federação definir as sedes.
 */
const nacional = (ano: number, local: string): Congresso => ({ edicao: '', ano, local });

export const congressosNacionais: Congresso[] = [
  nacional(1968, 'Petrópolis, Rio de Janeiro'),
  nacional(1974, 'Juiz de Fora, Minas Gerais'),
  nacional(1977, 'Belo Horizonte, Minas Gerais'),
  nacional(1980, 'Divinópolis, Minas Gerais'),
  nacional(1983, 'Juiz de Fora, Minas Gerais'),
  nacional(1986, 'Xaxim, Santa Catarina'),
  nacional(1989, 'Novo Hamburgo, Rio Grande do Sul'),
  nacional(1992, 'Petrópolis, Rio de Janeiro'),
  nacional(1995, 'Sete Lagoas, Minas Gerais'),
  nacional(1998, 'Itajaí, Santa Catarina'),
  nacional(2001, 'Belo Horizonte, Santa Luzia e Itabirito, Minas Gerais'),
  nacional(2004, 'Novo Hamburgo, Rio Grande do Sul'),
  nacional(2007, 'Petrópolis, Rio de Janeiro'),
  nacional(2010, 'Xaxim, Santa Catarina'),
  nacional(2013, 'Sete Lagoas, Minas Gerais'),
  { edicao: 'XVI', ano: 2019, local: 'Campo Largo, Paraná' },
  { edicao: '', ano: 2020, local: 'Online', nota: 'virtual' },
  {
    edicao: 'XVII',
    ano: 2022,
    local: 'Passos e Cássia, Minas Gerais',
    nota: 'fotosGaleria',
  },
  { edicao: 'XVIII', ano: 2025, local: 'Santa Luzia, Minas Gerais' },
];

/**
 * Congressos internacionais com participação brasileira documentada.
 *
 *   XLI  Rio de Janeiro 2017 · históricos de Cássia, Campo Largo e Carpe Diem
 *   XLIV Roma 2023           · histórico dos Canarinhos de Campo Largo
 *        Munique 2025        · histórico dos Arautos do Grande Rei
 *
 * Munique entra sem numeral porque o documento de origem não o traz, e um
 * numeral deduzido por contagem é exatamente o tipo de erro que ninguém
 * revisaria depois.
 */
export const congressosInternacionais: Congresso[] = [
  {
    edicao: 'XLI',
    ano: 2017,
    local: 'Rio de Janeiro',
    nota: 'unicoNoBrasil',
  },
  { edicao: 'XLIV', ano: 2023, local: 'Roma, Itália' },
  { edicao: '', ano: 2025, local: 'Munique, Alemanha' },
  { edicao: '', ano: 2027, local: 'Espanha', nota: 'previstoJulho' },
];

/**
 * Fonte: relação enviada pela federação em novembro de 2026. A data de 2026
 * vem da Ata da Assembleia Geral Ordinária de 26 de julho de 2025.
 */
const regional = (ano: number, local: string): Congresso => ({ edicao: '', ano, local });

export const congressosRegionais: Congresso[] = [
  regional(1987, 'Belo Horizonte, Minas Gerais'),
  regional(1993, 'Xaxim, Santa Catarina'),
  regional(1994, 'Cássia, Minas Gerais'),
  regional(1994, 'Porto Alegre, Rio Grande do Sul'),
  regional(1996, 'Santa Luzia, Minas Gerais'),
  regional(1996, 'Itajaí, Santa Catarina'),
  regional(1997, 'Novo Hamburgo, Rio Grande do Sul'),
  regional(1999, 'Campo Largo, Paraná'),
  regional(2000, 'Campinas, São Paulo'),
  regional(2000, 'Xaxim, Santa Catarina'),
  regional(2002, 'Itajaí, Santa Catarina'),
  regional(2003, 'Olímpia, São Paulo'),
  regional(2003, 'Juiz de Fora, Minas Gerais'),
  regional(2006, 'Campinas, São Paulo'),
  regional(2009, 'Campo Largo, Paraná'),
  regional(2011, 'Nova Erechim, Santa Catarina'),
  regional(2012, 'Cássia, Minas Gerais'),
  regional(2014, 'Campo Largo, Paraná'),
  regional(2015, 'Petrópolis, Rio de Janeiro'),
  regional(2016, 'Itajaí, Santa Catarina'),
  regional(2018, 'Juiz de Fora, Minas Gerais'),
  regional(2023, 'Sete Lagoas, Minas Gerais'),
  regional(2024, 'Campo Largo, Paraná'),
  { edicao: '', ano: 2026, local: 'Pratápolis, Minas Gerais', nota: 'pratapolis' },
];

/** Fonte: Ata da Assembleia Geral Ordinária de 26 de julho de 2025. */
export const congressosFuturos: Congresso[] = [
  {
    edicao: '',
    ano: 2026,
    local: 'São Miguelito, Panamá',
    nota: 'latinoAmericano',
    futuro: true,
  },
];

/* ------------------------------------------------------------------ */
/* Assuntos de contato                                                 */
/* ------------------------------------------------------------------ */

/**
 * Os formulários de /contato e /filiacao são `mailto:` com assunto pronto.
 *
 * Decisão deliberada: um serviço de formulário exige conta de terceiro, chave
 * em variável de ambiente e um endpoint que recebe dado de menor de idade.
 * Enquanto a federação não tiver o e-mail institucional definitivo, o `mailto`
 * entrega a mensagem no mesmo lugar sem intermediário e sem cadastro.
 *
 * O corpo pré-preenchido é o que faz isso funcionar de verdade: sem ele, o
 * remetente encara uma janela em branco e a federação recebe uma linha só.
 * Assunto e roteiro vêm do dicionário (`emails`), no idioma do visitante; em
 * EN e ES o assunto traz `[EN]`/`[ES]` para a federação separar na caixa.
 *
 * Monta o `mailto:` com tudo já codificado.
 */
export const escrever = (email: string, { assunto, campos }: Dicionario['emails']['geral']) => {
  const corpo = campos.join('\n');
  const parametros = new URLSearchParams({ subject: assunto });
  if (corpo) parametros.set('body', corpo);

  // URLSearchParams codifica espaço como "+", que clientes de e-mail exibem
  // literalmente na linha de assunto. Só %20 é entendido por todos.
  return `mailto:${email}?${parametros.toString().replace(/\+/g, '%20')}`;
};
