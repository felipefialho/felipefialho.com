import type { HastPluginList, MdastPluginList } from 'satteri';
import { IN_ARTICLE_SLOT } from '../lib/ad-config.ts';
import { t } from '../lib/i18n.ts';
import rehypeEmbeds from './rehype-embeds.ts';
import rehypeExternalLinks from './rehype-external-links.ts';
import rehypeHeadings from './rehype-headings.ts';
import rehypeImageAttrs from './rehype-image-attrs.ts';
import rehypeInArticleAd from './rehype-in-article-ad.ts';
import remarkLegacyImages from './remark-legacy-images.ts';
import remarkReadingTime from './remark-reading-time.ts';

// Image paths are rewritten before Astro collects local images
export const mdastPlugins: MdastPluginList = [remarkLegacyImages, remarkReadingTime];

export const hastPlugins: HastPluginList = [
  rehypeEmbeds,
  rehypeImageAttrs,
  rehypeHeadings,
  rehypeExternalLinks,
  rehypeInArticleAd({ slot: IN_ARTICLE_SLOT, labels: { pt: t('pt').ad, en: t('en').ad } }),
];
