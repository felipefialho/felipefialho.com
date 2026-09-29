import { existsSync } from 'node:fs';
import path from 'node:path';
import type { MdastPluginDefinition, PluginFactoryContext } from 'satteri';
import { TAG_ATTRS } from './utils/html-tags.ts';
import { POST_ASSETS_DIR, PUBLIC_DIR, toFilePath } from './utils/paths.ts';

const NOT_LOCAL = /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i;
const IMG_TAG = new RegExp(`<img\\b${TAG_ATTRS}>`, 'gi');
const SRC_ATTR = /(\ssrc\s*=\s*)(?:"([^"]*)"|'([^']*)')/i;

const decode = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

/** Maps a legacy image reference to `/assets/posts/<name>`, or undefined when it should stay untouched. */
export function rewriteSrc(src: string, markdownFile: string | undefined): string | undefined {
  if (!src || NOT_LOCAL.test(src)) return undefined;

  const cleanPath = decode(src.split(/[?#]/)[0]);
  if (cleanPath.startsWith('/assets/posts/')) return undefined;

  const resolved = cleanPath.startsWith('/')
    ? path.join(PUBLIC_DIR, cleanPath)
    : markdownFile && path.resolve(path.dirname(markdownFile), cleanPath);
  if (resolved && existsSync(resolved)) return undefined;

  const name = path.posix.basename(cleanPath);
  if (!name || !existsSync(path.join(POST_ASSETS_DIR, name))) return undefined;
  return `/assets/posts/${encodeURI(name)}`;
}

export default function remarkLegacyImages(factory: PluginFactoryContext): MdastPluginDefinition {
  const markdownFile = toFilePath(factory.fileURL);

  return {
    name: 'legacy-images',
    image(node, ctx) {
      const next = rewriteSrc(node.url, markdownFile);
      if (next) ctx.setProperty(node, 'url', next);
    },
    html(node, ctx) {
      const value = node.value.replace(IMG_TAG, (tag) =>
        tag.replace(SRC_ATTR, (match, prefix: string, double?: string, single?: string) => {
          const next = rewriteSrc(double ?? single ?? '', markdownFile);
          return next ? `${prefix}"${next}"` : match;
        }),
      );
      if (value !== node.value) ctx.setProperty(node, 'value', value);
    },
  };
}
