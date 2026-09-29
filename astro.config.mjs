import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { hastPlugins, mdastPlugins } from './src/plugins/index.ts';

const fontsource = (pkg, file) => `@fontsource-variable/${pkg}/files/${file}`;

export default defineConfig({
  site: 'https://felipefialho.com',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'pt',
    locales: ['pt', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Mona Sans',
      cssVariable: '--font-mona-sans',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            src: [fontsource('mona-sans', 'mona-sans-latin-wdth-normal.woff2')],
            weight: '200 900',
            stretch: '75% 125%',
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Newsreader',
      cssVariable: '--font-newsreader',
      fallbacks: ['serif'],
      options: {
        variants: [
          {
            src: [fontsource('newsreader', 'newsreader-latin-opsz-normal.woff2')],
            weight: '200 800',
            style: 'normal',
          },
          {
            src: [fontsource('newsreader', 'newsreader-latin-opsz-italic.woff2')],
            weight: '200 800',
            style: 'italic',
          },
        ],
      },
    },
  ],
  markdown: {
    processor: satteri({ mdastPlugins, hastPlugins }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
      wrap: false,
    },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'pt', locales: { pt: 'pt-BR', en: 'en' } },
    }),
  ],
});
