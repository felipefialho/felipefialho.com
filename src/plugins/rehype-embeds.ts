import type { HastPluginDefinition, PluginFactoryContext } from 'satteri';
import { HTML_LANG, type Lang } from '../lib/i18n.ts';
import { type Attrs, TAG_ATTRS, decodeEntities, escapeAttr, escapeHtml, parseAttrs, serializeAttrs, stringAttr } from './utils/html-tags.ts';
import { langOf, toFilePath } from './utils/paths.ts';

const YOUTUBE_ID = /^(?:https?:)?\/\/(?:www\.|m\.)?(?:youtube(?:-nocookie)?\.com\/embed\/|youtu\.be\/)([\w-]{6,})/i;
const CODEPEN_EMBED = /^(?:https?:)?\/\/(?:www\.)?codepen\.io\/[^/]+\/embed\//i;
const YOUTUBE_ALLOW = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';

// A padding-bottom wrapper div is the old responsive aspect-ratio hack, alone with its iframe
const IFRAME = `<iframe\\b${TAG_ATTRS}>\\s*</iframe>`;
const OTHER_ATTRS = '(?:[^>"\']|"[^"]*"|\'[^\']*\')*';
const PADDING_STYLE = '\\bstyle\\s*=\\s*(?:"[^"]*padding-bottom[^"]*"|\'[^\']*padding-bottom[^\']*\')';
const HACK_WRAPPER = `<div\\b${OTHER_ATTRS}?${PADDING_STYLE}${OTHER_ATTRS}>\\s*${IFRAME}\\s*</div>`;
const EMBED = new RegExp(`${HACK_WRAPPER}|${IFRAME}`, 'gi');
const FIGURE_TAG = /<(\/?)figure\b/gi;

const TEXT: Record<Lang, { video: string; generic: string; playVideo: string; loadPen: string; loadGeneric: string }> = {
  pt: {
    video: 'Vídeo do YouTube',
    generic: 'Conteúdo incorporado',
    playVideo: 'Assistir vídeo',
    loadPen: 'Carregar pen no CodePen',
    loadGeneric: 'Carregar conteúdo incorporado',
  },
  en: {
    video: 'YouTube video',
    generic: 'Embedded content',
    playVideo: 'Play video',
    loadPen: 'Load pen on CodePen',
    loadGeneric: 'Load embedded content',
  },
};

const FACADE_STYLE = '*{box-sizing:border-box;margin:0}html,body{height:100%;overflow:hidden;background:#1a1a2e}'
  + 'a{position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;'
  + 'padding:1rem;color:#fff;font:1rem/1.4 system-ui,sans-serif;text-align:center;text-decoration:none}'
  + 'a:focus-visible{outline:3px solid #fff;outline-offset:-6px}'
  + 'svg{flex:none;transition:transform .15s}a:hover svg{transform:scale(1.1)}';

const PLAY_ICON = '<svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">'
  + '<circle cx="36" cy="36" r="34" fill="#fff" fill-opacity=".14" stroke="#fff" stroke-width="2"/>'
  + '<path d="M29 22l22 14-22 14z" fill="#fff"/></svg>';

interface Facade {
  lang: Lang;
  /** Real embed URL, already escaped as an attribute value */
  href: string;
  /** Visible text, plain (not escaped) */
  text: string;
  /** Accessible name, plain (not escaped) */
  label: string;
}

/** Self-contained page: no request leaves until the link is clicked and the iframe navigates to `href`. */
function facadeDocument({ lang, href, text, label }: Facade): string {
  return `<!doctype html><html lang="${HTML_LANG[lang]}"><meta charset="utf-8"><style>${FACADE_STYLE}</style>`
    + `<a href="${href}" aria-label="${escapeAttr(label)}">${PLAY_ICON}<span>${escapeHtml(text)}</span></a></html>`;
}

const withFacade = (attrs: Attrs, facade: Facade) => {
  attrs.set('src', facade.href);
  attrs.set('srcdoc', escapeHtml(facadeDocument(facade)));
  attrs.set('loading', 'lazy');
};

function youtubeIframe(id: string, title: string, lang: Lang): string {
  const attrs = parseAttrs('');
  const href = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
  withFacade(attrs, { lang, href, text: title, label: `${TEXT[lang].playVideo}: ${title}` });
  attrs.set('title', escapeAttr(title));
  attrs.set('allow', YOUTUBE_ALLOW);
  attrs.set('allowfullscreen', true);
  return `<iframe ${serializeAttrs(attrs)}></iframe>`;
}

function genericIframe(source: string, lang: Lang, wrapperRemoved: boolean): string {
  const attrs = parseAttrs(source);
  const src = stringAttr(attrs, 'src');
  const authoredTitle = stringAttr(attrs, 'title')?.trim();
  const isPen = CODEPEN_EMBED.test(src ?? '');
  const label = isPen ? TEXT[lang].loadPen : TEXT[lang].loadGeneric;
  const title = authoredTitle ? decodeEntities(authoredTitle) : undefined;

  attrs.set('loading', 'lazy');
  attrs.set('title', escapeAttr(title ?? TEXT[lang].generic));
  if (src && !attrs.has('srcdoc')) {
    withFacade(attrs, { lang, href: src, text: title ?? label, label: title ? `${label}: ${title}` : label });
  }
  if (wrapperRemoved) {
    // Sizing came from the removed wrapper, so leave it to the `.embed` styles
    for (const name of ['style', 'width', 'height']) attrs.delete(name);
  }
  return `<iframe ${serializeAttrs(attrs)}></iframe>`;
}

/** Offset ranges of every `<figure>` in the html, an unclosed one running to the end. */
function figureRanges(html: string): Array<[number, number]> {
  const ranges: Array<[number, number]> = [];
  const open: number[] = [];
  for (const match of html.matchAll(FIGURE_TAG)) {
    if (!match[1]) {
      open.push(match.index);
      continue;
    }
    const start = open.pop();
    if (start !== undefined) ranges.push([start, match.index]);
  }
  return [...ranges, ...open.map((start): [number, number] => [start, Infinity])];
}

export function transformEmbeds(html: string, lang: Lang): string {
  const figures = figureRanges(html);
  const insideFigure = (offset: number) => figures.some(([start, end]) => offset > start && offset < end);

  return html.replace(EMBED, (_match: string, ...args: unknown[]) => {
    // Groups: 1 is the wrapped iframe attributes, 2 the bare iframe attributes
    const [wrappedAttrs, bareAttrs, offset] = args as [string | undefined, string | undefined, number];
    const wrapperRemoved = wrappedAttrs !== undefined;
    const source = wrappedAttrs ?? bareAttrs ?? '';
    const attrs = parseAttrs(source);
    const src = stringAttr(attrs, 'src') ?? '';
    const id = YOUTUBE_ID.exec(src)?.[1];

    if (id) {
      const title = decodeEntities(stringAttr(attrs, 'title')?.trim() || TEXT[lang].video);
      const iframe = youtubeIframe(id, title, lang);
      return wrapperRemoved || !insideFigure(offset)
        ? `<figure class="embed embed-video">${iframe}</figure>`
        : iframe;
    }

    const iframe = genericIframe(source, lang, wrapperRemoved);
    if (!wrapperRemoved) return iframe;
    return `<figure class="${CODEPEN_EMBED.test(src) ? 'embed embed-codepen' : 'embed'}">${iframe}</figure>`;
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
