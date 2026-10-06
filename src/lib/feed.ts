import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { HTML_LANG, localePath, t, type Lang } from './i18n';
import { getPosts, postPath } from './posts';

export async function feedResponse(lang: Lang, context: APIContext): Promise<Response> {
  const posts = await getPosts(lang);
  return rss({
    title: t(lang).feedTitle,
    description: t(lang).feedDescription,
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
