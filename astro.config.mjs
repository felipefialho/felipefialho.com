import { fileURLToPath } from 'node:url';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { hastPlugins, mdastPlugins } from './src/plugins/index.ts';
import { createSitemapSerializer, loadSitemapPosts } from './src/lib/seo.ts';

// Latin variable files copied by scripts/subset-fonts.sh
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
      name: 'Geist',
      cssVariable: '--font-sans',
      fallbacks: ['system-ui', 'sans-serif'],
      options: {
        variants: [{ src: [font('geist.woff2')], weight: '300 800', style: 'normal' }],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Geist Mono',
      cssVariable: '--font-mono',
      fallbacks: ['ui-monospace', 'monospace'],
      options: {
        variants: [{ src: [font('geist-mono.woff2')], weight: '400 600', style: 'normal' }],
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
