import type { HastNode, HastPluginDefinition, PluginFactoryContext } from 'satteri';
import { isPostFile, langOf, toFilePath } from './utils/paths.ts';

export interface InArticleAdOptions {
  slot: string;
  labels: { pt: string; en: string };
}

const MIN_H2_FOR_HEADING_SLOT = 3;
const MIN_BLOCKS_FOR_FALLBACK = 8;
const FALLBACK_POSITION = 0.4;

// Code, media, tables and raw HTML demos must never sit next to an ad
const NO_NEIGHBOR = new Set(['pre', 'figure', 'table', 'iframe', 'video']);
const HEADINGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

type Block = Extract<HastNode, { type: 'element' | 'raw' | 'comment' }>;

const tagOf = (block: Block) => (block.type === 'element' ? block.tagName : undefined);
const isHeading = (block: Block) => HEADINGS.has(tagOf(block) ?? '');
const isDemo = (block: Block) => block.type === 'raw' || NO_NEIGHBOR.has(tagOf(block) ?? '');

/** An ad fits between two blocks that are not demos, and never right after a heading. */
const isBoundaryOk = (blocks: Block[], index: number) => {
  const prev = blocks[index - 1];
  const next = blocks[index];
  return !!prev && !!next && !isDemo(prev) && !isDemo(next) && !isHeading(prev);
};

export function pickIndex(blocks: Block[]): number | undefined {
  const h2s = blocks.flatMap((block, index) => (tagOf(block) === 'h2' ? [index] : []));
  if (h2s.length >= MIN_H2_FOR_HEADING_SLOT) {
    for (let index = h2s[1]; index < blocks.length; index++) {
      if (isBoundaryOk(blocks, index)) return index;
    }
    return undefined;
  }

  if (blocks.length < MIN_BLOCKS_FOR_FALLBACK) return undefined;
  const target = Math.round(blocks.length * FALLBACK_POSITION);
  for (let index = target; index < blocks.length; index++) {
    if (isBoundaryOk(blocks, index)) return index;
  }
  for (let index = target - 1; index > 0; index--) {
    if (isBoundaryOk(blocks, index)) return index;
  }
  return undefined;
}

/** Inserts a single empty in-article ad slot at the root of a post. */
export default function rehypeInArticleAd({ slot, labels }: InArticleAdOptions) {
  return (factory: PluginFactoryContext): HastPluginDefinition | null => {
    const file = toFilePath(factory.fileURL);
    if (!isPostFile(file)) return null;
    const label = labels[langOf(file)];

    return {
      name: 'in-article-ad',
      after(root, ctx) {
        const blocks = root.children.filter(
          (child): child is Block => child.type === 'element' || child.type === 'raw',
        );
        const index = pickIndex(blocks);
        if (index === undefined) return;

        ctx.insertBefore(blocks[index], {
          type: 'element',
          tagName: 'aside',
          properties: {
            className: ['ad', 'ad-in-article'],
            dataAdSlot: slot,
            dataAdFormat: 'fluid',
            dataAdLayout: 'in-article',
            ariaLabel: label,
            dataPagefindIgnore: true,
          },
          children: [],
        });
      },
    };
  };
}
