import { pt, type Dicionario } from './pt.ts';
import { en } from './en.ts';
import { es } from './es.ts';
import { dadosIdioma, idiomaDe, type Idioma } from './idiomas.ts';

export const dicionarios: Record<Idioma, Dicionario> = { pt, en, es };

/**
 * Idioma e dicionário da página atual. Uso em qualquer `.astro`:
 *   const { idioma, t } = textos(Astro.currentLocale);
 */
export const textos = (locale: string | undefined) => {
  const idioma = idiomaDe(locale);
  return { idioma, t: dicionarios[idioma] };
};

export const numero = (n: number, idioma: Idioma) => n.toLocaleString(dadosIdioma[idioma].html);

/** Data ISO (`2025-07-31`) por extenso no idioma. UTC para não voltar um dia. */
export const data = (iso: string, idioma: Idioma) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString(dadosIdioma[idioma].html, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
