import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori from 'satori';
import { html } from 'satori-html';
import sharp from 'sharp';
import { formatDate, type Lang } from './i18n';
import { getPosts } from './posts';

const WIDTH = 1200;
const HEIGHT = 630;
const PADDING = 72;
const MAX_LINES = 4;

const INK = '#1A1A2E';
const MUTED = '#5B5B6B';
const LINK = '#0000EE';
const PAPER = '#FDFDFC';

type OgInput = { title: string; meta: string };

const DEFAULT_CARD: Record<Lang, { title: string; meta: string }> = {
  pt: { title: 'Escrevendo sobre front-end desde 2013', meta: 'Blog, Lab e anotações' },
  en: { title: 'Writing about front-end since 2013', meta: 'Blog, Lab and notes' },
};

const nodeRequire = createRequire(import.meta.url);
const fontFile = (pkg: string, file: string) => readFile(nodeRequire.resolve(`@fontsource/${pkg}/files/${file}`));

// Loaded once per build; satori needs static (non-variable) woff files
const fonts = Promise.all([
  fontFile('mona-sans', 'mona-sans-latin-800-normal.woff'),
  fontFile('mona-sans', 'mona-sans-latin-500-normal.woff'),
  fontFile('mona-sans', 'mona-sans-latin-400-normal.woff'),
]).then(([bold, medium, regular]) => [
  { name: 'Mona Sans', data: bold, weight: 800 as const, style: 'normal' as const },
  { name: 'Mona Sans', data: medium, weight: 500 as const, style: 'normal' as const },
  { name: 'Mona Sans', data: regular, weight: 400 as const, style: 'normal' as const },
]);

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Satori cannot draw emoji without an emoji font
const stripEmoji = (text: string) =>
  text
    .replace(/\p{Extended_Pictographic}/gu, '')
    .replace(/\u200D|\uFE0F|\u20E3/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const TITLE_SIZES = [76, 68, 60, 54, 50];
const CHAR_WIDTH = 0.58; // average glyph width in em for Mona Sans 800 with tight tracking
const TITLE_WIDTH = WIDTH - PADDING * 2;

function countLines(title: string, size: number) {
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

// Large sizes stay at 3 lines so the block never crowds the header and footer
const maxLinesFor = (size: number) => (size > 60 ? MAX_LINES - 1 : MAX_LINES);

/** Largest size whose estimated wrap fits; the smallest size otherwise. */
const fitTitleSize = (title: string) =>
  TITLE_SIZES.find((size) => countLines(title, size) <= maxLinesFor(size)) ?? TITLE_SIZES[TITLE_SIZES.length - 1];

export async function renderOgImage({ title, meta }: OgInput): Promise<Buffer> {
  const cleanTitle = stripEmoji(title);
  const size = fitTitleSize(cleanTitle);

  const markup = html(`
    <div style="display:flex;flex-direction:column;justify-content:space-between;width:${WIDTH}px;height:${HEIGHT}px;padding:${PADDING}px;background:${PAPER};color:${INK};font-family:'Mona Sans'">
      <div style="display:flex;font-size:30px;font-weight:800;letter-spacing:-0.02em">felipe fialho</div>
      <div style="display:flex;flex-direction:column;flex:1;justify-content:center;min-height:0">
        <div style="display:flex;font-size:${size}px;font-weight:800;line-height:1.05;letter-spacing:-0.02em;line-clamp:${MAX_LINES}">${escapeHtml(cleanTitle)}</div>
        <div style="display:flex;width:160px;height:6px;margin-top:28px;background:${LINK}"></div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:flex-end;color:${MUTED}">
        <div style="display:flex;font-family:'Mona Sans';font-size:32px;font-weight:400">${escapeHtml(stripEmoji(meta))}</div>
        <div style="display:flex;font-size:28px;font-weight:500">felipefialho.com</div>
      </div>
    </div>
  `);

  const svg = await satori(markup as Parameters<typeof satori>[0], {
    width: WIDTH,
    height: HEIGHT,
    fonts: await fonts,
  });

  return sharp(Buffer.from(svg)).flatten({ background: PAPER }).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
}

/** Static paths for every post card of a language plus the site card. */
export async function getOgPaths(lang: Lang) {
  const posts = await getPosts(lang);
  return [
    ...posts.map((post) => ({
      params: { slug: post.id },
      props: { title: post.data.title, meta: formatDate(post.data.date, lang) },
    })),
    { params: { slug: 'default' }, props: DEFAULT_CARD[lang] },
  ];
}

export const ogResponse = async (input: OgInput) =>
  new Response(new Uint8Array(await renderOgImage(input)), { headers: { 'Content-Type': 'image/jpeg' } });
