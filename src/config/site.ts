/**
 * Identidade institucional em um lugar só.
 *
 * A federação tem duas denominações em uso: a razão social do logo e do
 * estatuto ("Federação Nacional dos Meninos Cantores do Brasil") e a
 * assinatura de comunicação ("Pueri Cantores Brasil"). A decisão registrada no
 * BRIEFING.md é usar a assinatura no site e a razão social no rodapé.
 *
 * Se a diretoria mudar de posição, este arquivo é o único a alterar.
 */
export const site = {
  /** Como a federação se apresenta ao público. */
  assinatura: 'Pueri Cantores Brasil',

  /** Razão social. Rodapé, documentos, dados estruturados. */
  razaoSocial: 'Federação Nacional dos Meninos Cantores do Brasil',

  sigla: 'FNMCB',

  dominio: 'https://puericantores.com.br',

  descricao:
    'Federação que reúne os coros de meninos e meninas do Brasil filiados à Pueri Cantores, ' +
    'federação internacional de pueris cantores reconhecida pela Santa Sé.',

  /**
   * Data do levantamento dos números agregados. Eles vêm da planilha de
   * cadastro, não de auditoria — por isso são publicados arredondados e
   * datados. Ver BRIEFING.md, seção 2.
   */
  levantamento: 'levantamento de 2026',

  contato: {
    email: 'puericantoresbrasil@gmail.com',
    telefone: '(35) 99109-3401',
    sede: 'Rua Santos Dumont, 355, Petrópolis - RJ',
    cep: '25625-090',
    cnpj: '32.002.172/0001-90',
  },
} as const;

/**
 * Prefixa uma rota interna com a base do deploy.
 *
 * Existe porque o site pode ser servido de uma subpasta — hoje o preview da
 * diretoria fica em `/puericantores/` no GitHub Pages. O Astro reescreve os
 * caminhos de imagem e de CSS sozinho, mas NÃO reescreve `href`: sem isto,
 * todo link interno apontaria para a raiz do domínio e daria 404.
 *
 * Quando o domínio próprio entrar, `BASE_URL` volta a ser `/` e nada muda.
 */
export const rota = (caminho: string) =>
  `${import.meta.env.BASE_URL}/${caminho}`.replace(/\/{2,}/g, '/');

/** Rotas da navegação principal, na ordem de exibição. */
export const navegacao = [
  { href: '/federacao', rotulo: 'A federação' },
  { href: '/corais', rotulo: 'Os corais' },
  { href: '/galeria', rotulo: 'Galeria' },
  { href: '/filiacao', rotulo: 'Filiação' },
  { href: '/contato', rotulo: 'Contato' },
] as const;
