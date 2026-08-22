/**
 * Fatos institucionais, com procedência.
 *
 * Regra do projeto: nada aqui pode ser lembrança nem paráfrase de senso comum.
 * Cada item traz a fonte no comentário. O que não tem fonte não entra — vira
 * pendência marcada na página, que é o comportamento correto para um site
 * institucional que a diretoria vai assinar.
 *
 * Quando os documentos da federação chegarem (estatuto, histórico, ata da
 * diretoria), é este arquivo que cresce; as páginas não mudam.
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
  paises: 43,
  coros: 1000,
  cantores: 40000,
  site: 'https://www.puericantores.org',
} as const;

/* ------------------------------------------------------------------ */
/* Congressos                                                          */
/* ------------------------------------------------------------------ */

interface Congresso {
  /** Numeral da edição, como o próprio evento se identifica. */
  edicao: string;
  ano: number;
  local: string;
  /** Uma linha de contexto, quando há fato a acrescentar. */
  nota?: string;
  /** Ainda não aconteceu: a página trata como anúncio, não como histórico. */
  futuro?: boolean;
}

/**
 * Congressos nacionais.
 *
 * Reconstruídos a partir dos históricos que os próprios corais anexaram ao
 * cadastro — fonte primária, não pesquisa de internet:
 *
 *   XVI   Campo Largo 2019    · histórico dos Canarinhos de Campo Largo
 *   XVII  Passos/Cássia 2022  · idem, e é o congresso das fotos da galeria
 *   XVIII Santa Luzia 2025    · registrado em ATIVOS-EXTERNOS.md
 *   XIX   Cássia 2028         · histórico dos Pequenos Cantores de Cássia
 *
 * A lista começa em 2019 porque é daí para cá que há registro documental em
 * mãos. As edições anteriores existem — os corais citam congressos desde os
 * anos 1960 — e entram quando a diretoria enviar a relação oficial.
 */
export const congressosNacionais: Congresso[] = [
  { edicao: 'XVI', ano: 2019, local: 'Campo Largo, Paraná' },
  {
    edicao: 'XVII',
    ano: 2022,
    local: 'Passos e Cássia, Minas Gerais',
    nota: 'As fotografias da galeria são desta edição.',
  },
  { edicao: 'XVIII', ano: 2025, local: 'Santa Luzia, Minas Gerais' },
  {
    edicao: 'XIX',
    ano: 2028,
    local: 'Cássia, Minas Gerais',
    nota: 'Anunciado para julho, com os Pequenos Cantores de Cássia como anfitriões.',
    futuro: true,
  },
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
    nota: 'O único congresso internacional dos Pueri Cantores realizado no Brasil.',
  },
  { edicao: 'XLIV', ano: 2023, local: 'Roma, Itália' },
  { edicao: '', ano: 2025, local: 'Munique, Alemanha' },
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
 */
export const assuntos = {
  filiacao: {
    assunto: 'Interesse em filiação',
    corpo: [
      'Nome do coral:',
      'Cidade e estado:',
      'Ano de fundação:',
      'Instituição mantenedora (paróquia, escola, associação):',
      'Número de cantores e faixa etária:',
      'Nome do regente:',
      'Nome e cargo de quem responde:',
      'Telefone ou e-mail para retorno:',
      '',
      'Conte um pouco sobre o coro:',
    ].join('\n'),
  },
  imprensa: {
    assunto: 'Imprensa',
    corpo: [
      'Veículo:',
      'Pauta:',
      'Prazo:',
      'Material necessário (fotos, entrevista, dados):',
      '',
      'Mensagem:',
    ].join('\n'),
  },
  fotos: {
    assunto: 'Envio de fotografias',
    corpo: [
      'Coral:',
      'Ocasião e data das fotos:',
      'Autoria da fotografia:',
      '',
      'Mensagem:',
    ].join('\n'),
  },
  geral: {
    assunto: 'Contato pelo site',
    corpo: '',
  },
} as const;

/** Monta o `mailto:` de um assunto, com tudo já codificado. */
export const escrever = (
  email: string,
  chave: keyof typeof assuntos
) => {
  const { assunto, corpo } = assuntos[chave];
  const parametros = new URLSearchParams({ subject: assunto });
  if (corpo) parametros.set('body', corpo);

  // URLSearchParams codifica espaço como "+", que clientes de e-mail exibem
  // literalmente na linha de assunto. Só %20 é entendido por todos.
  return `mailto:${email}?${parametros.toString().replace(/\+/g, '%20')}`;
};
