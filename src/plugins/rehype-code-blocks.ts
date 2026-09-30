import type { ElementContent } from 'hast';
import type { HastPluginDefinition, PluginFactoryContext } from 'satteri';
import type { Lang } from '../lib/i18n.ts';
import { toFilePath } from './utils/paths.ts';

export interface CodeBlockLabels {
  copy: string;
  copied: string;
  failed: string;
}

export interface CodeBlocksOptions {
  labels: Record<Lang, CodeBlockLabels>;
}

const CARD_CLASS = 'code-card';
const PLAIN_LANGUAGES = new Set(['plaintext', 'text', 'txt', 'ansi']);

const isEnglishFile = (file: string | undefined) => !!file && /[/\\](?:posts-en|pages[/\\]en)[/\\]/.test(file);

const text = (value: string): ElementContent => ({ type: 'text', value });

/**
 * Wraps every highlighted block in a card: a header bar with the language and a copy button.
 * The button is wired by a delegated script on the page; without JS it stays inert but harmless.
 */
export default function rehypeCodeBlocks({ labels }: CodeBlocksOptions) {
  return (factory: PluginFactoryContext): HastPluginDefinition => {
    const { copy, copied, failed } = labels[isEnglishFile(toFilePath(factory.fileURL)) ? 'en' : 'pt'];

    return {
      name: 'code-blocks',
      element: {
        filter: ['pre'],
        visit(node, ctx) {
          if (node.properties.dataCard) return;
          const language = String(node.properties.dataLanguage ?? '');
          const label = language && !PLAIN_LANGUAGES.has(language) ? language : 'code';

          ctx.replaceNode(node, {
            type: 'element',
            tagName: 'div',
            properties: { className: [CARD_CLASS] },
            children: [
              {
                type: 'element',
                tagName: 'div',
                properties: { className: ['code-bar'], dataPagefindIgnore: true },
                children: [
                  { type: 'element', tagName: 'span', properties: {}, children: [text(label)] },
                  {
                    type: 'element',
                    tagName: 'button',
                    properties: {
                      type: 'button',
                      className: ['code-copy'],
                      dataCopyCode: '',
                      dataLabel: copy,
                      dataCopied: copied,
                      dataFailed: failed,
                      ariaLive: 'polite',
                    },
                    children: [text(copy)],
                  },
                ],
              },
              { ...node, properties: { ...node.properties, dataCard: true } },
            ],
          });
        },
      },
    };
  };
}
