import type { ElementContent } from 'hast';
import type { HastPluginDefinition } from 'satteri';

// Same rules as github-slugger (used by rehype-slug): lowercase, drop punctuation, spaces become hyphens
export const slugify = (text: string) =>
  text.toLowerCase().replace(/[^\p{L}\p{M}\p{N}\p{Pc}\- ]/gu, '').replaceAll(' ', '-');

// Ids owned by the page chrome, a heading must never take them
const RESERVED_IDS = [
  'content', 'search', 'search-ui', 'search-status', 'consent', 'latest', 'lab', 'support-title', 'related-title', 'toc',
];

const WRAPPED_DEPTHS = new Set(['h2', 'h3']);

const hasLink = (nodes: ElementContent[]): boolean =>
  nodes.some((node) => node.type === 'element' && (node.tagName === 'a' || hasLink(node.children)));

/**
 * Gives every heading a unique id and wraps the content of h2/h3 in a link to it.
 * A `# heading` in the body becomes h2: the page title is the only h1.
 */
export default function rehypeHeadings(): HastPluginDefinition {
  const used = new Set(RESERVED_IDS);

  const uniqueSlug = (text: string) => {
    const base = slugify(text) || 'section';
    let id = base;
    for (let suffix = 1; used.has(id); suffix++) id = `${base}-${suffix}`;
    used.add(id);
    return id;
  };

  return {
    name: 'headings',
    element: {
      filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      visit(node, ctx) {
        const id = uniqueSlug(ctx.textContent(node));
        const tagName = node.tagName === 'h1' ? 'h2' : node.tagName;
        if (!WRAPPED_DEPTHS.has(tagName) || hasLink(node.children)) {
          if (tagName === node.tagName) ctx.setProperty(node, 'id', id);
          else ctx.replaceNode(node, { ...node, tagName, properties: { ...node.properties, id } });
          return;
        }
        ctx.replaceNode(node, {
          ...node,
          tagName,
          properties: { ...node.properties, id },
          children: [{ type: 'element', tagName: 'a', properties: { href: `#${id}` }, children: node.children }],
        });
      },
    },
  };
}
