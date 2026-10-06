import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import satori from 'satori';
import { html } from 'satori-html';
import sharp, { type Sharp } from 'sharp';
import { cached, hashOf } from './disk-cache';
import { formatDay, type Lang } from './i18n';

const WIDTH = 1200;
const HEIGHT = 630;
const PADDING = 64;

// Terminal palette (the dark values of tokens.css, checked by og-palette.test.ts)
export const PALETTE = { bg: '#0f0f0f', ink: '#f1f1f1', muted: '#9a9a9a', faint: '#757575', line: '#2d2d2d', accent: '#a1ecf7' } as const;
const { bg: BG, ink: INK, muted: MUTED, faint: FAINT, line: LINE, accent: ACCENT } = PALETTE;

type PostCard = { kind: 'post'; title: string; meta: string; tags: string[] };
type DefaultCard = { kind: 'default'; title: string };
export type OgInput = PostCard | DefaultCard;

const DEFAULT_TITLE: Record<Lang, string> = {
  pt: 'Front-end, AI e carreira em tech',
  en: 'Front-end, AI and career in tech',
};

const PHOTO = resolve('src/assets/images/felipe-fialho.jpg');
const PHOTO_SIDE = { width: 419, height: HEIGHT }; // 420px column minus its 1px left border

const nodeRequire = createRequire(import.meta.url);
const fontFile = (pkg: string, file: string) => readFile(nodeRequire.resolve(`@fontsource/${pkg}/files/${file}`));

// Loaded once per build; satori needs static (non-variable) woff files
const fonts = Promise.all([
  fontFile('geist', 'geist-latin-600-normal.woff'),
  fontFile('geist-mono', 'geist-mono-latin-400-normal.woff'),
]).then(([sans, mono]) => [
  { name: 'Geist', data: sans, weight: 600 as const, style: 'normal' as const },
  { name: 'Geist Mono', data: mono, weight: 400 as const, style: 'normal' as const },
]);

const escapeHtml = (text: string): string =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Satori cannot draw emoji without an emoji font
const stripEmoji = (text: string): string =>
  text
    .replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/‍|️|⃣/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const TITLE_SIZES = [72, 64, 56, 48];
const CHAR_WIDTH = 0.5; // average glyph width in em for Geist 600 with -0.052em tracking
const TITLE_WIDTH = WIDTH - PADDING * 2;

/** Estimated wrapped line count of a title at a font size, breaking on spaces like the renderer. */
export function countLines(title: string, size: number): number {
  const perLine = Math.floor(TITLE_WIDTH / (size * CHAR_WIDTH));
  let lines = 1;
  let used = 0;
  for (const word of title.split(' ')) {
    const needed = used === 0 ? word.length : used + 1 + word.length;
    if (needed > perLine && used > 0) {
      lines += 1;
      used = word.length;
    } else {
      used = needed;
    }
  }
  return lines;
}

// The two largest sizes stay at 3 lines so the block never crowds the header and the author row
const maxLinesFor = (size: number): number => (size >= 64 ? 3 : 4);

/** Largest size whose estimated wrap fits; the smallest size otherwise. */
export const fitTitleSize = (title: string): number =>
  TITLE_SIZES.find((size) => countLines(title, size) <= maxLinesFor(size)) ?? TITLE_SIZES[TITLE_SIZES.length - 1];

const toDataUri = (buffer: Buffer, type: string): string => `data:${type};base64,${buffer.toString('base64')}`;

// Outline of `ff` in Geist Mono 700 (240px, letter-spacing -0.1em): the mark needs no font
const FF_PATH =
  'M80.2 205L47.8 205L47.8 102.3L15.4 102.3L15.4 76.4L47.8 76.4L47.8 72.8Q47.8 53.3 57 44.0Q66.2 34.6 86.2 34.6L86.2 34.6L128.6 34.6L128.6 60.5L93.6 60.5Q86.6 60.5 83.4 63.8Q80.2 67 80.2 73L80.2 73L80.2 76.4L127.7 76.4L127.7 102.3L80.2 102.3L80.2 205ZM200.2 205L167.8 205L167.8 102.3L135.4 102.3L135.4 76.4L167.8 76.4L167.8 72.8Q167.8 53.3 177 44.0Q186.2 34.6 206.2 34.6L206.2 34.6L248.6 34.6L248.6 60.5L213.6 60.5Q206.6 60.5 203.4 63.8Q200.2 67 200.2 73L200.2 73L200.2 76.4L247.7 76.4L247.7 102.3L200.2 102.3L200.2 205Z';

// The 44px `ff_` tile of the card header, drawn at the board's 20px glyph scale
const MARK = toDataUri(
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44"><rect x=".5" y=".5" width="43" height="43" rx="9.5" fill="none" stroke="${LINE}"/><path transform="translate(7 12) scale(.0833)" fill="${INK}" d="${FF_PATH}"/><rect x="27.5" y="26.7" width="8" height="2.5" rx=".5" fill="${ACCENT}"/></svg>`,
  ),
  'image/svg+xml',
);

const grayscale = (input: Sharp, contrast: number): Sharp =>
  input.grayscale().linear(contrast, 255 * (0.5 - 0.5 * contrast));

// Satori has no blend modes or filters: tint the photo here (grayscale, cyan multiply, left fade, scanlines)
async function photoSide(): Promise<string> {
  const { width, height } = PHOTO_SIDE;
  const cover = Math.round(HEIGHT); // the 800px square scaled to the column height, cropped at object-position 40%
  const left = Math.round((cover - width) * 0.4);
  const base = await grayscale(sharp(PHOTO).resize(cover, cover).extract({ left, top: 0, width, height }), 1.15)
    .png()
    .toBuffer();
  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><defs><linearGradient id="f" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="${BG}"/><stop offset=".3" stop-color="${BG}" stop-opacity="0"/></linearGradient><pattern id="s" width="3" height="3" patternUnits="userSpaceOnUse"><rect y="2" width="3" height="1" fill="${BG}" fill-opacity=".22"/></pattern></defs><rect width="${width}" height="${height}" fill="url(#f)"/><rect width="${width}" height="${height}" fill="url(#s)"/></svg>`;
  const tinted = await sharp(base)
    .composite([
      { input: { create: { width, height, channels: 3, background: ACCENT } }, blend: 'multiply' },
      { input: Buffer.from(overlay) },
    ])
    .png()
    .toBuffer();
  return toDataUri(tinted, 'image/png');
}

async function avatar(): Promise<string> {
  const buffer = await grayscale(sharp(PHOTO).resize(136, 136), 1.1).png().toBuffer();
  return toDataUri(buffer, 'image/png');
}

// Both images are constant across cards; compute once per build
const photoPromise = photoSide();
const avatarPromise = avatar();

const header = (path: string, aside: string): string => `
  <div style="display:flex;justify-content:space-between;align-items:center;font-family:'Geist Mono';font-size:22px;color:${MUTED}">
    <div style="display:flex;align-items:center;gap:12px"><img src="${MARK}" style="width:44px;height:44px" /><div style="display:flex;color:${INK}"><span style="color:${ACCENT}">~/</span>felipefialho${path ? `<span style="color:${FAINT}">${path}</span>` : ''}</div></div>
    ${aside}
  </div>`;

const title = (text: string, size: number): string =>
  `<div style="display:block;font-size:${size}px;line-height:${size <= 56 ? 1.08 : 1.02};font-weight:600;letter-spacing:-0.052em">${escapeHtml(text)}</div>`;

// Satori cannot mix text and inline spans in one block, so the headline is a wrapping row of words with the accent cursor on the last one
const cursorTitle = (text: string, size: number): string => {
  const words = text.split(' ').map((word) => escapeHtml(word));
  const last = words.pop();
  const items = [...words.map((word) => `<div style="display:flex">${word}</div>`), `<div style="display:flex">${last}<span style="color:${ACCENT}">_</span></div>`];
  return `<div style="display:flex;flex-wrap:wrap;column-gap:${size * 0.21}px;font-size:${size}px;line-height:1;font-weight:600;letter-spacing:-0.052em">${items.join('')}</div>`;
};

async function defaultMarkup(text: string): Promise<string> {
  return `
    <div style="display:flex;width:${WIDTH}px;height:${HEIGHT}px;background:${BG};color:${INK};font-family:'Geist'">
      <div style="display:flex;flex-direction:column;flex:1;padding:${PADDING}px;gap:28px">
        <div style="display:flex;align-items:center;gap:12px;font-family:'Geist Mono';font-size:24px"><img src="${MARK}" style="width:44px;height:44px" /><div style="display:flex"><span style="color:${ACCENT}">~/</span>felipefialho</div></div>
        ${cursorTitle(text, 76)}
        <div style="display:flex;justify-content:space-between;margin-top:auto;font-family:'Geist Mono';font-size:22px;color:${MUTED}"><div style="display:flex">Felipe Fialho · Staff Engineer</div><div style="display:flex;color:${ACCENT}">felipefialho.com</div></div>
      </div>
      <div style="display:flex;width:420px;height:${HEIGHT}px;border-left:1px solid ${LINE}"><img src="${await photoPromise}" style="width:${PHOTO_SIDE.width}px;height:${PHOTO_SIDE.height}px" /></div>
    </div>`;
}

async function postMarkup({ title: text, meta, tags }: PostCard): Promise<string> {
  const size = fitTitleSize(text);
  const tagLine = tags.map((tag) => `#${escapeHtml(tag)}`).join(' ');
  return `
    <div style="display:flex;flex-direction:column;width:${WIDTH}px;height:${HEIGHT}px;padding:${PADDING}px;gap:28px;background:${BG};color:${INK};font-family:'Geist'">
      <div style="display:flex;position:absolute;left:0;top:0;width:${WIDTH}px;height:6px;background:${ACCENT}"></div>
      ${header('/blog', `<div style="display:flex">${escapeHtml(meta)}</div>`)}
      <div style="display:flex;margin-top:24px">${title(text, size)}</div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:auto">
        <div style="display:flex;align-items:center;gap:16px">
          <img src="${await avatarPromise}" style="width:68px;height:68px;border-radius:50%;border:2px solid ${LINE}" />
          <div style="display:flex;flex-direction:column;gap:4px"><div style="display:flex;font-size:24px;font-weight:600">Felipe Fialho</div><div style="display:flex;font-family:'Geist Mono';font-size:18px;color:${MUTED}">felipefialho.com</div></div>
        </div>
        <div style="display:flex;font-family:'Geist Mono';font-size:20px;color:${ACCENT}">${tagLine}</div>
      </div>
    </div>`;
}

const CACHE_DIR = resolve('node_modules/.cache/og');

// Any change to the template, the pinned dependencies or the photo invalidates every card
const sourceHash = Promise.all([
  readFile(resolve('src/lib/og.ts')),
  readFile(resolve('pnpm-lock.yaml')).catch(() => Buffer.alloc(0)),
  readFile(PHOTO),
]).then((sources) => hashOf(...sources));

/** Renders a card, reusing the JPEG of an identical earlier build (rendering is about 160ms per card). */
export async function renderOgImage(input: OgInput): Promise<Buffer> {
  return cached(CACHE_DIR, hashOf(await sourceHash, JSON.stringify(input)), () => renderOgImageUncached(input));
}

async function renderOgImageUncached(input: OgInput): Promise<Buffer> {
  const markup = html(
    input.kind === 'post'
      ? await postMarkup({ ...input, title: stripEmoji(input.title), meta: stripEmoji(input.meta) })
      : await defaultMarkup(stripEmoji(input.title)),
  );

  // satori-html returns a hast-like VNode that satori accepts at runtime but types as its own element shape
  const svg = await satori(markup as Parameters<typeof satori>[0], {
    width: WIDTH,
    height: HEIGHT,
    fonts: await fonts,
  });

  return sharp(Buffer.from(svg)).flatten({ background: BG }).jpeg({ quality: 80, mozjpeg: true, chromaSubsampling: '4:4:4' }).toBuffer();
}

/** Static paths for every post card of a language plus the site card. */
export type OgPath = { params: { slug: string }; props: { input: OgInput } };

export async function getOgPaths(lang: Lang): Promise<OgPath[]> {
  // Loaded lazily: `astro:content` only exists inside Astro, which keeps the pure helpers above unit-testable
  const [{ render }, { getPosts }] = await Promise.all([import('astro:content'), import('./posts')]);
  const posts = await getPosts(lang);
  const cards = await Promise.all(
    posts.map(async (post) => {
      // Same source as the post page, so the card and the page always agree on the minutes
      const { remarkPluginFrontmatter } = await render(post);
      const minutes = Number(remarkPluginFrontmatter.minutesRead ?? 1);
      return {
        params: { slug: post.id },
        props: {
          input: {
            kind: 'post' as const,
            title: post.data.title,
            meta: `${formatDay(post.data.date, lang)} · ${minutes} min`,
            tags: post.data.tags.slice(0, 3),
          } satisfies OgInput,
        },
      };
    }),
  );
  return [...cards, { params: { slug: 'default' }, props: { input: { kind: 'default' as const, title: DEFAULT_TITLE[lang] } satisfies OgInput } }];
}

export const ogResponse = async (input: OgInput): Promise<Response> =>
  new Response(new Uint8Array(await renderOgImage(input)), { headers: { 'Content-Type': 'image/jpeg' } });
