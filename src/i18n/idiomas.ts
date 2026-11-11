/**
 * Os três idiomas do site.
 *
 * `Idioma` é a chave curta usada no conteúdo (`historico.pt`) e no dicionário.
 * `locale` é o código que o Astro conhece (`astro.config.mjs`). Os dois não
 * coincidem só no português: o Astro foi configurado com `pt-br`.
 */
export const idiomas = ['pt', 'en', 'es'] as const;
export type Idioma = (typeof idiomas)[number];

export const dadosIdioma = {
  pt: { locale: 'pt-br', html: 'pt-BR', og: 'pt_BR', sigla: 'PT', nome: 'Português', prefixo: undefined },
  en: { locale: 'en', html: 'en', og: 'en_US', sigla: 'EN', nome: 'English', prefixo: 'en' },
  es: { locale: 'es', html: 'es', og: 'es_LA', sigla: 'ES', nome: 'Español', prefixo: 'es' },
} as const satisfies Record<
  Idioma,
  { locale: string; html: string; og: string; sigla: string; nome: string; prefixo: string | undefined }
>;

/** Idioma da página a partir de `Astro.currentLocale`. */
export const idiomaDe = (locale: string | undefined): Idioma =>
  idiomas.find((i) => dadosIdioma[i].locale === locale) ?? 'pt';

/**
 * `getStaticPaths` de toda página: o mesmo arquivo gera `/x`, `/en/x` e `/es/x`
 * a partir do parâmetro opcional `[...idioma]`.
 */
export const caminhosIdioma = () =>
  idiomas.map((i) => ({ params: { idioma: dadosIdioma[i].prefixo } }));

/**
 * Caminho da página sem a base do deploy e sem o prefixo de idioma:
 * `/puericantores/en/corais/x` → `/corais/x`. Trocar de idioma é recolocar
 * outro prefixo nele (os caminhos não se traduzem).
 */
const prefixos = idiomas.flatMap((i) => dadosIdioma[i].prefixo ?? []);
const comPrefixo = new RegExp(`^/(${prefixos.join('|')})(?=/|$)`);

export const caminhoSemIdioma = (pathname: string, base: string) => {
  const semBase = base !== '/' && pathname.startsWith(base) ? pathname.slice(base.replace(/\/$/, '').length) : pathname;
  return semBase.replace(comPrefixo, '') || '/';
};

/**
 * Caminho da página atual, sem base e sem idioma, para trocar de idioma.
 * A 404 é a exceção: existe uma só, fora de `[...idioma]`, então "a mesma
 * página no outro idioma" é a home daquele idioma.
 */
export const paginaAtual = (astro: { url: URL; routePattern: string }) =>
  astro.routePattern === '/404' ? '/' : caminhoSemIdioma(astro.url.pathname, import.meta.env.BASE_URL);
