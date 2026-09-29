import type { HastPluginDefinition, PluginFactoryContext } from 'satteri';
import { decodeEntities, escapeAttr, escapeHtml, parseAttrs, serializeAttrs, stringAttr } from './utils/html-tags.ts';
import { type Lang, langOf, toFilePath } from './utils/paths.ts';

const YOUTUBE_ID = /^(?:https?:)?\/\/(?:www\.|m\.)?(?:youtube(?:-nocookie)?\.com\/embed\/|youtu\.be\/)([\w-]{6,})/i;
const YOUTUBE_ALLOW = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';

// A padding-bottom wrapper div is the old responsive aspect-ratio hack, alone with its iframe
const IFRAME = '<iframe\\b([^>]*)>\\s*</iframe>';
const HACK_WRAPPER = `<div\\b[^>]*\\bstyle\\s*=\\s*(?:"[^"]*padding-bottom[^"]*"|'[^']*padding-bottom[^']*')[^>]*>\\s*${IFRAME}\\s*</div>`;
const EMBED = new RegExp(`${HACK_WRAPPER}|${IFRAME}`, 'gi');

const TITLES: Record<Lang, { video: string; generic: string }> = {
  pt: { video: 'Vídeo do YouTube', generic: 'Conteúdo incorporado' },
  en: { video: 'YouTube video', generic: 'Embedded content' },
};

const FACADE_STYLE = '*{padding:0;margin:0;overflow:hidden}html,body{height:100%}'
  + 'img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}'
  + 'span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 .5em black}';

/** Zero-JS click-to-play: the srcdoc page only holds a thumbnail linking to the real player. */
function youtubeFacade(id: string, title: string): string {
  const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
  const srcdoc = `<style>${FACADE_STYLE}</style>`
    + `<a href="${src}"><img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="${escapeHtml(title)}"><span>▶</span></a>`;
  return `<iframe src="${src}" srcdoc="${escapeHtml(srcdoc)}" loading="lazy" title="${escapeAttr(title)}" `
    + `allow="${YOUTUBE_ALLOW}" allowfullscreen></iframe>`;
}

function genericIframe(source: string, lang: Lang, unwrapped: boolean): string {
  const attrs = parseAttrs(source);
  attrs.set('loading', 'lazy');
  if (!stringAttr(attrs, 'title')?.trim()) attrs.set('title', TITLES[lang].generic);
  if (unwrapped) {
    // Sizing came from the removed wrapper, so leave it to the `.embed` styles
    for (const name of ['style', 'width', 'height']) attrs.delete(name);
  }
  return `<iframe ${serializeAttrs(attrs)}></iframe>`;
}

/** True when `offset` sits inside a `<figure>` that is still open. */
const insideFigure = (html: string, offset: number) => {
  const before = html.slice(0, offset).toLowerCase();
  return before.lastIndexOf('<figure') > before.lastIndexOf('</figure');
};

function transformEmbeds(html: string, lang: Lang): string {
  return html.replace(EMBED, (match: string, ...args: unknown[]) => {
    // Groups: 1 is the wrapped iframe attributes, 2 the bare iframe attributes
    const [wrappedAttrs, bareAttrs, offset] = args as [string | undefined, string | undefined, number];
    const wrapped = wrappedAttrs !== undefined;
    const source = wrappedAttrs ?? bareAttrs ?? '';
    const attrs = parseAttrs(source);
    const id = YOUTUBE_ID.exec(stringAttr(attrs, 'src') ?? '')?.[1];

    if (id) {
      const title = decodeEntities(stringAttr(attrs, 'title')?.trim() || TITLES[lang].video);
      const facade = youtubeFacade(id, title);
      return wrapped || !insideFigure(html, offset)
        ? `<figure class="embed embed-video">${facade}</figure>`
        : facade;
    }

    const iframe = genericIframe(source, lang, wrapped);
    return wrapped ? `<figure class="embed">${iframe}</figure>` : iframe;
  });
}

export default function rehypeEmbeds(factory: PluginFactoryContext): HastPluginDefinition {
  const lang = langOf(toFilePath(factory.fileURL));

  return {
    name: 'embeds',
    // Iframes only reach the tree as raw HTML, markdown has no syntax for them
    raw(node, ctx) {
      if (!/<iframe\b/i.test(node.value)) return;
      ctx.setProperty(node, 'value', transformEmbeds(node.value, lang));
    },
  };
}
