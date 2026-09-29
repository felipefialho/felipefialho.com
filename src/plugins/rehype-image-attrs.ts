import type { HastPluginDefinition } from 'satteri';
import { TAG_ATTRS, parseAttrs, serializeAttrs, stringAttr } from './utils/html-tags.ts';
import { publicImageSize, type Size } from './utils/image-size.ts';

const IMG_TAG = new RegExp(`<img\\b${TAG_ATTRS}\\/?>`, 'gi');

// Netlify Image CDN serves AVIF/WebP at the requested width; legacy files stay untouched in the repo
const USE_IMAGE_CDN = process.env.NETLIFY === 'true';
const CDN_FORMATS = /\.(png|jpe?g|webp)$/i;
const CDN_WIDTHS = [400, 700, 1000, 1400];
const NARROW_WIDTH = 700;
const SIZES = '(min-width: 48rem) 44rem, 100vw';

const cdnUrl = (src: string, width: number) => `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}`;

/** src/srcset/sizes pointing at the image CDN, never upscaling past the intrinsic width. */
function responsiveSources(src: string, size: Size) {
  if (!USE_IMAGE_CDN || !CDN_FORMATS.test(src)) return null;
  const widths = CDN_WIDTHS.filter((width) => width < size.width);
  const candidates = [...widths, Math.min(size.width, 1600)];
  return {
    src: cdnUrl(src, Math.min(size.width, 1000)),
    srcset: candidates.map((width) => `${cdnUrl(src, width)} ${width}w`).join(', '),
    sizes: SIZES,
  };
}

const isNumeric = (value: unknown) => /^\d+$/.test(String(value));
const isBlank = (value: unknown) => value == null || value === '' || value === true;

/** Fills the missing dimension(s) from the intrinsic size, keeping the ratio when one is authored. */
function completeSize(size: Size, width: unknown, height: unknown): Partial<Size> {
  const hasWidth = !isBlank(width);
  const hasHeight = !isBlank(height);
  if (hasWidth && hasHeight) return {};
  if (hasWidth) return isNumeric(width) ? { height: Math.round((Number(width) * size.height) / size.width) } : {};
  if (hasHeight) return isNumeric(height) ? { width: Math.round((Number(height) * size.width) / size.height) } : {};
  return size;
}

interface ImageProps {
  src?: unknown;
  width?: unknown;
  height?: unknown;
  loading?: unknown;
}

/** Attributes to add or replace on an image; both the hast element and the raw html paths apply it. */
export function imagePatch({ src, width, height, loading }: ImageProps): Record<string, string> {
  const patch: Record<string, string> = { decoding: 'async' };
  // An authored `loading` (eager for above-the-fold images) wins
  if (isBlank(loading)) patch.loading = 'lazy';
  if (typeof src !== 'string' || !src.startsWith('/assets/')) return patch;

  const size = publicImageSize(src);
  if (!size) return patch;
  const missing = completeSize(size, width, height);
  if (missing.width) patch.width = String(missing.width);
  if (missing.height) patch.height = String(missing.height);

  const sources = responsiveSources(src, size);
  if (sources) {
    Object.assign(patch, sources);
    // A small authored width never needs the full-column candidate
    if (isNumeric(width) && Number(width) < NARROW_WIDTH) patch.sizes = `${width}px`;
  }
  return patch;
}

export default function rehypeImageAttrs(): HastPluginDefinition {
  return {
    name: 'image-attrs',
    element: {
      filter: ['img'],
      visit(node, ctx) {
        const patch = imagePatch(node.properties);
        for (const [name, value] of Object.entries(patch)) ctx.setProperty(node, name, value);
      },
    },
    // Images inside HTML blocks stay raw strings in the hast tree
    raw(node, ctx) {
      if (!/<img\b/i.test(node.value)) return;
      const value = node.value.replace(IMG_TAG, (_, source: string) => {
        const attrs = parseAttrs(source);
        const patch = imagePatch({
          src: stringAttr(attrs, 'src'),
          width: attrs.get('width'),
          height: attrs.get('height'),
          loading: attrs.get('loading'),
        });
        for (const [name, value] of Object.entries(patch)) attrs.set(name, value);
        return `<img ${serializeAttrs(attrs)}>`;
      });
      ctx.setProperty(node, 'value', value);
    },
  };
}
