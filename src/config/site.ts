import { getRelativeLocaleUrl } from 'astro:i18n';
import { dadosIdioma, type Idioma } from '~/i18n/idiomas';

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

  contato: {
    email: 'puericantoresbrasil@gmail.com',
    telefone: '(35) 99109-3401',
    sede: 'Rua Santos Dumont, 355, Petrópolis - RJ',
    cep: '25625-090',
    cnpj: '32.002.172/0001-90',
  },
} as const;

/**
 * Link interno, no idioma pedido.
 *
 * Único helper de link do site. Por dentro usa o do Astro, que já cuida da
 * base do deploy (o preview no GitHub Pages fica em `/puericantores/`) e do
 * prefixo do idioma. Nunca envolva `getRelativeLocaleUrl` em outra função que
 * também some a base: o prefixo sairia duplicado.
 */
export const rota = (caminho: string, idioma: Idioma = 'pt') =>
  getRelativeLocaleUrl(dadosIdioma[idioma].locale, caminho.replace(/^\/+/, ''))
    // Para a raiz do idioma o Astro devolve `/en/` mesmo com `trailingSlash:
    // 'never'`; o Firebase (`trailingSlash: false`) redirecionaria.
    .replace(/(.)\/$/, '$1');

/** Rotas da navegação principal, na ordem de exibição. O rótulo vem do dicionário. */
export const navegacao = [
  { href: '/federacao', chave: 'federacao' },
  { href: '/corais', chave: 'corais' },
  { href: '/galeria', chave: 'galeria' },
  { href: '/filiacao', chave: 'filiacao' },
  { href: '/contato', chave: 'contato' },
] as const;
