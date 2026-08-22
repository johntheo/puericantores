// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/* Três destinos, alternados pela variável DEPLOY_ALVO.
   Só o GitHub Pages serve de uma subpasta — daí `base`, e daí o helper
   `rota()` em src/config/site.ts, sem o qual todo link interno apontaria para
   a raiz do domínio e daria 404. Firebase e domínio próprio servem na raiz.

   O `site` correto importa além da estética: ele gera as URLs canônicas e o
   sitemap. Apontar para um domínio que ainda não existe faria o Google seguir
   endereço morto. */
const ALVO = process.env.DEPLOY_ALVO ?? 'firebase';

const DESTINOS = {
  pages: { site: 'https://johntheo.github.io', base: '/puericantores' },
  firebase: { site: 'https://puericantores.web.app', base: undefined },
  dominio: { site: 'https://puericantores.com.br', base: undefined },
};

const { site: SITE, base: BASE } = DESTINOS[ALVO] ?? DESTINOS.firebase;

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
