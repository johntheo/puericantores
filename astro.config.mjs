// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/* Dois destinos.
   O definitivo é o domínio próprio, servido na raiz. O provisório é o preview
   da diretoria no GitHub Pages, que serve de uma subpasta — daí `base`, e daí
   o helper `rota()` em src/config/site.ts, sem o qual todo link interno
   apontaria para a raiz do domínio e daria 404.
   Alternar entre os dois é só a variável DEPLOY_ALVO. */
const ehPages = process.env.DEPLOY_ALVO === 'pages';

const SITE = ehPages ? 'https://johntheo.github.io' : 'https://puericantores.com.br';
const BASE = ehPages ? '/puericantores' : undefined;

export default defineConfig({
  site: SITE,
  base: BASE,
  integrations: [sitemap()],

  // i18n configurado sem prefixo: adicionar 'en' depois é tradução, não refatoração.
  i18n: {
    defaultLocale: 'pt-br',
    locales: ['pt-br'],
    routing: { prefixDefaultLocale: false },
  },

  image: {
    /* Sem `layout`/`responsiveStyles`: o Astro injetaria `height: auto` nas
       imagens, o que vence as classes de altura e quebrou o herói da página
       de coral no celular — a foto virava uma faixa no topo com preto abaixo.
       O enquadramento aqui é sempre definido por classe (aspect + object-cover),
       então a injeção só atrapalha. */
    layout: 'none',
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
