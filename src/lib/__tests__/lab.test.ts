import { describe, expect, it, vi } from 'vitest';
import labFile from '../../../content/lab/lab.json';

vi.mock('astro:content', () => ({
  // The real store returns entries unordered, so reverse them to prove lab.json drives the order
  getCollection: async () => [...labFile].reverse().map((project) => ({ id: project.id, data: project })),
}));

const { FEATURED_PROJECT_IDS, getFeaturedProjects, getLabProjects } = await import('../lab.ts');

describe('getLabProjects', () => {
  it('orders projects like lab.json', async () => {
    const ids = (await getLabProjects()).map((project) => project.id);
    expect(ids).toEqual(labFile.map((project) => project.id));
  });
});

describe('getFeaturedProjects', () => {
  it('resolves every featured id in display order', async () => {
    const featured = await getFeaturedProjects();
    expect(featured.map((project) => project.id)).toEqual([...FEATURED_PROJECT_IDS]);
  });
});
