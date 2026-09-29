import type { HastPluginDefinition } from 'satteri';
import { parseAttrs, serializeAttrs, stringAttr } from './utils/html-tags.ts';

const SITE_HOSTS = new Set(['felipefialho.com', 'www.felipefialho.com']);
const ABSOLUTE = /^(?:https?:)?\/\//i;
const ANCHOR_TAG = /<a\b([^>]*)>/gi;

const isExternal = (href: unknown): href is string => {
  if (typeof href !== 'string' || !ABSOLUTE.test(href)) return false;
  try {
    return !SITE_HOSTS.has(new URL(href, 'https://felipefialho.com').hostname);
  } catch {
    return false;
  }
};

export default function rehypeExternalLinks(): HastPluginDefinition {
  return {
    name: 'external-links',
    element: {
      filter: ['a'],
      visit(node, ctx) {
        if (!isExternal(node.properties.href)) return;
        ctx.setProperty(node, 'target', '_blank');
        ctx.setProperty(node, 'rel', ['noopener', 'noreferrer']);
      },
    },
    // Links inside HTML blocks stay raw strings in the hast tree
    raw(node, ctx) {
      if (!/<a\b/i.test(node.value)) return;
      const value = node.value.replace(ANCHOR_TAG, (tag: string, source: string) => {
        const attrs = parseAttrs(source);
        if (!isExternal(stringAttr(attrs, 'href'))) return tag;
        attrs.set('target', '_blank');
        attrs.set('rel', 'noopener noreferrer');
        return `<a ${serializeAttrs(attrs)}>`;
      });
      if (value !== node.value) ctx.setProperty(node, 'value', value);
    },
  };
}
