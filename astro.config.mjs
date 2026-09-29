import { fileURLToPath } from 'node:url';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { hastPlugins, mdastPlugins } from './src/plugins/index.ts';
import { createSitemapSerializer, loadSitemapPosts } from './src/lib/seo.ts';

// Subset and axis-pinned by scripts/subset-fonts.sh
const font = (file) => `./src/assets/fonts/${file}`;

export default defineConfig({
  site: 'https://felipefialho.com',
  trailingSlash: 'ignore',
  // A few KB of CSS per page: inlining beats a render-blocking request
  build: { inlineStylesheets: 'always' },
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
            src: [font('mona-sans.woff2')],
            weight: '400 800',
            stretch: '100% 125%',
            style: 'normal',
          },
        ],
      },
    },
  ],
  markdown: {
    processor: satteri({ mdastPlugins, hastPlugins }),
    shikiConfig: {
      themes: { light: 'github-light-high-contrast', dark: 'github-dark-high-contrast' },
      defaultColor: false,
      wrap: false,
    },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'pt', locales: { pt: 'pt-BR', en: 'en' } },
      serialize: createSitemapSerializer(loadSitemapPosts(fileURLToPath(new URL('.', import.meta.url)))),
    }),
  ],
});
