import type { HastPluginDefinition } from 'satteri';
import { type Attrs, parseAttrs, serializeAttrs, stringAttr } from './utils/html-tags.ts';
import { publicImageSize, type Size } from './utils/image-size.ts';

const IMG_TAG = /<img\b([^>]*?)\/?>/gi;

// Netlify Image CDN serves AVIF/WebP at the requested width; legacy files stay untouched in the repo
const USE_IMAGE_CDN = process.env.NETLIFY === 'true';
const CDN_FORMATS = /\.(png|jpe?g|webp)$/i;
const CDN_WIDTHS = [400, 700, 1000, 1400];
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

/** Fills the missing dimension(s) from the intrinsic size, keeping the ratio when one is authored. */
function completeSize(size: Size, width: unknown, height: unknown): Partial<Size> {
  const hasWidth = width != null && width !== '';
  const hasHeight = height != null && height !== '';
  if (hasWidth && hasHeight) return {};
  if (hasWidth) return isNumeric(width) ? { height: Math.round((Number(width) * size.height) / size.width) } : {};
  if (hasHeight) return isNumeric(height) ? { width: Math.round((Number(height) * size.width) / size.height) } : {};
  return size;
}

function enhanceAttrs(attrs: Attrs): void {
  const src = stringAttr(attrs, 'src');
  if (src?.startsWith('/assets/')) {
    const size = publicImageSize(src);
    if (size) {
      const missing = completeSize(size, attrs.get('width'), attrs.get('height'));
      if (missing.width) attrs.set('width', String(missing.width));
      if (missing.height) attrs.set('height', String(missing.height));
      const sources = responsiveSources(src, size);
      if (sources) for (const [key, value] of Object.entries(sources)) attrs.set(key, value);
    }
  }
  attrs.set('loading', 'lazy');
  attrs.set('decoding', 'async');
}

export default function rehypeImageAttrs(): HastPluginDefinition {
  return {
    name: 'image-attrs',
    element: {
      filter: ['img'],
      visit(node, ctx) {
        const { src, width, height } = node.properties;
        if (typeof src === 'string' && src.startsWith('/assets/')) {
          const size = publicImageSize(src);
          if (size) {
            const missing = completeSize(size, width, height);
            if (missing.width) ctx.setProperty(node, 'width', missing.width);
            if (missing.height) ctx.setProperty(node, 'height', missing.height);
            const sources = responsiveSources(src, size);
            if (sources) for (const [key, value] of Object.entries(sources)) ctx.setProperty(node, key, value);
          }
        }
        ctx.setProperty(node, 'loading', 'lazy');
        ctx.setProperty(node, 'decoding', 'async');
      },
    },
    // Images inside HTML blocks stay raw strings in the hast tree
    raw(node, ctx) {
      if (!/<img\b/i.test(node.value)) return;
      const value = node.value.replace(IMG_TAG, (_, source: string) => {
        const attrs = parseAttrs(source);
        enhanceAttrs(attrs);
        return `<img ${serializeAttrs(attrs)}>`;
      });
      ctx.setProperty(node, 'value', value);
    },
  };
}
