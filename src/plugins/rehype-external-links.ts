import type { HastPluginDefinition } from 'satteri';
import { TAG_ATTRS, parseAttrs, serializeAttrs, stringAttr } from './utils/html-tags.ts';

const SITE_HOSTS = new Set(['felipefialho.com', 'www.felipefialho.com']);
const ABSOLUTE = /^(?:https?:)?\/\//i;
const ANCHOR_TAG = new RegExp(`<a\\b${TAG_ATTRS}>`, 'gi');

const isExternal = (href: unknown): href is string => {
  if (typeof href !== 'string' || !ABSOLUTE.test(href)) return false;
  try {
    return !SITE_HOSTS.has(new URL(href, 'https://felipefialho.com').hostname);
  } catch {
    return false;
  }
};

/** Keeps the authored rel tokens and adds `noopener`; the referrer stays so linked sites can see where traffic comes from. */
const mergeRel = (rel: string | string[] | undefined): string[] => {
  const tokens = typeof rel === 'string' ? rel.split(/\s+/) : (rel ?? []);
  return [...new Set([...tokens.filter(Boolean), 'noopener'])];
};

export default function rehypeExternalLinks(): HastPluginDefinition {
  return {
    name: 'external-links',
    element: {
      filter: ['a'],
      visit(node, ctx) {
        if (!isExternal(node.properties.href)) return;
        const { target, rel } = node.properties;
        if (!target) ctx.setProperty(node, 'target', '_blank');
        ctx.setProperty(node, 'rel', mergeRel(rel as string | string[] | undefined));
      },
    },
    // Links inside HTML blocks stay raw strings in the hast tree
    raw(node, ctx) {
      if (!/<a\b/i.test(node.value)) return;
      const value = node.value.replace(ANCHOR_TAG, (tag: string, source: string) => {
        const attrs = parseAttrs(source);
        if (!isExternal(stringAttr(attrs, 'href'))) return tag;
        if (!stringAttr(attrs, 'target')) attrs.set('target', '_blank');
        attrs.set('rel', mergeRel(stringAttr(attrs, 'rel')).join(' '));
        return `<a ${serializeAttrs(attrs)}>`;
      });
      if (value !== node.value) ctx.setProperty(node, 'value', value);
    },
  };
}
