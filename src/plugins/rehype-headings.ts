import type { ElementContent } from 'hast';
import type { HastPluginDefinition } from 'satteri';

// Same rules as github-slugger (used by rehype-slug): lowercase, drop punctuation, spaces become hyphens
const slugify = (text: string) =>
  text.toLowerCase().replace(/[^\p{L}\p{M}\p{N}\p{Pc}\- ]/gu, '').replaceAll(' ', '-');

const WRAPPED_DEPTHS = new Set(['h2', 'h3']);

const hasLink = (nodes: ElementContent[]): boolean =>
  nodes.some((node) => node.type === 'element' && (node.tagName === 'a' || hasLink(node.children)));

/** Gives every heading a unique id and wraps the content of h2/h3 in a link to it. */
export default function rehypeHeadings(): HastPluginDefinition {
  const used = new Map<string, number>();

  const uniqueSlug = (text: string) => {
    const base = slugify(text) || 'section';
    const count = used.get(base);
    used.set(base, (count ?? 0) + 1);
    return count === undefined ? base : `${base}-${count}`;
  };

  return {
    name: 'headings',
    element: {
      filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      visit(node, ctx) {
        const id = uniqueSlug(ctx.textContent(node));
        if (!WRAPPED_DEPTHS.has(node.tagName) || hasLink(node.children)) {
          ctx.setProperty(node, 'id', id);
          return;
        }
        ctx.replaceNode(node, {
          ...node,
          properties: { ...node.properties, id },
          children: [{ type: 'element', tagName: 'a', properties: { href: `#${id}` }, children: node.children }],
        });
      },
    },
  };
}
