import type { HastPluginDefinition } from 'satteri';
import { type Attrs, parseAttrs, serializeAttrs, stringAttr } from './utils/html-tags.ts';
import { publicImageSize, type Size } from './utils/image-size.ts';

const IMG_TAG = /<img\b([^>]*?)\/?>/gi;
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
