import type { Element, ElementContent } from 'hast';
import type { HastPluginDefinition } from 'satteri';

const isBlank = (node: ElementContent) => node.type === 'text' && node.value.trim() === '';
const isDash = (node: ElementContent) => node.type === 'text' && /^[\s—–-]*$/.test(node.value);

/** A paragraph that is only emphasized text, optionally led by a dash: `— *someone, 2014*`. */
const isCitation = (node: ElementContent): node is Element => {
  if (node.type !== 'element' || node.tagName !== 'p') return false;
  const content = node.children.filter((child) => !isBlank(child));
  const emphasis = content.filter((child) => child.type === 'element' && child.tagName === 'em');
  return emphasis.length === 1 && content.every((child) => child === emphasis[0] || isDash(child));
};

/** Marks the closing citation line of a quote (styled apart from the quote itself). */
export default function rehypeBlockquoteCite(): HastPluginDefinition {
  return {
    name: 'blockquote-cite',
    element: {
      filter: ['blockquote'],
      visit(node, ctx) {
        const blocks = node.children.filter((child) => child.type === 'element');
        const last = blocks.at(-1);
        if (blocks.length < 2 || !last || !isCitation(last)) return;
        ctx.setProperty(last, 'className', ['cite']);
      },
    },
  };
}
