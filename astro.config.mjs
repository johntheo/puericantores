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
  /* Igual ao `trailingSlash: false` do firebase.json. Sem isto os helpers de
     URL do Astro geram `/en/corais/` e todo link passa por um redirect. */
  trailingSlash: 'never',

  integrations: [
    sitemap({
      // O sitemap não lê o bloco `i18n` abaixo: a lista se repete aqui.
      i18n: { defaultLocale: 'pt-br', locales: { 'pt-br': 'pt-BR', en: 'en', es: 'es' } },
    }),
  ],

  // Português na raiz, inglês e espanhol com prefixo. Ver docs/wayfinder/i18n.
  i18n: {
    defaultLocale: 'pt-br',
    locales: ['pt-br', 'en', 'es'],
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
