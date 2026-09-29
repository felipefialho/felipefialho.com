import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { HTML_LANG, localePath, type Lang } from './i18n';
import { getPosts, postPath } from './posts';

const COPY = {
  pt: { title: 'Felipe Fialho', description: 'Front-end, CSS, carreira e AI, desde 2013.' },
  en: { title: 'Felipe Fialho (English)', description: 'Front-end, CSS, career and AI.' },
};

export async function feedResponse(lang: Lang, context: APIContext) {
  const posts = await getPosts(lang);
  return rss({
    title: COPY[lang].title,
    description: COPY[lang].description,
    site: new URL(localePath(lang, '/'), context.site).href,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postPath(lang, post.id),
      categories: post.data.tags,
    })),
    customData: `<language>${HTML_LANG[lang]}</language>`,
  });
}
