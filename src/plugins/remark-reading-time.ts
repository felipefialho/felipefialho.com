import readingTime from 'reading-time';
import type { MdastPluginDefinition } from 'satteri';

interface AstroData {
  astro?: { frontmatter: Record<string, unknown> };
}

// Exposed to pages through `remarkPluginFrontmatter` from `render()`
export default function remarkReadingTime(): MdastPluginDefinition {
  return {
    name: 'reading-time',
    after(root, ctx) {
      const astro = (ctx.data as AstroData).astro;
      if (!astro) return;
      const { minutes } = readingTime(ctx.textContent(root, { includeHtml: false }));
      astro.frontmatter.minutesRead = Math.max(1, Math.ceil(minutes));
    },
  };
}
