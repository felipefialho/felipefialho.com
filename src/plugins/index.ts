import type { HastPluginList, MdastPluginList } from 'satteri';
import { IN_ARTICLE_SLOT } from '../lib/ad-config.ts';
import { t } from '../lib/i18n.ts';
import rehypeBlockquoteCite from './rehype-blockquote-cite.ts';
import rehypeCodeBlocks from './rehype-code-blocks.ts';
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
  rehypeCodeBlocks({
    labels: {
      pt: { copy: t('pt').copyCode, copied: t('pt').copyCodeDone, failed: t('pt').copyCodeFailed },
      en: { copy: t('en').copyCode, copied: t('en').copyCodeDone, failed: t('en').copyCodeFailed },
    },
  }),
  rehypeBlockquoteCite,
  rehypeEmbeds,
  rehypeImageAttrs,
  rehypeHeadings,
  rehypeExternalLinks,
  rehypeInArticleAd({ slot: IN_ARTICLE_SLOT, labels: { pt: t('pt').ad, en: t('en').ad } }),
];
