import { getCollection } from 'astro:content';
import labFile from '../../content/lab/lab.json';

// The content store returns entries by id, so lab.json's array order is the relevance ranking
const rank = new Map(labFile.map((project, index) => [project.id, index]));

export const getLabProjects = async () =>
  (await getCollection('lab')).sort((a, b) => (rank.get(a.id) ?? 0) - (rank.get(b.id) ?? 0));

/** Open source projects shown on the home, in display order. */
export const FEATURED_PROJECT_IDS = ['frontend-brasil', 'frontend-challenges', 'awesome-made-by-brazilians'] as const;

export const getFeaturedProjects = async () => {
  const projects = await getLabProjects();
  return FEATURED_PROJECT_IDS.map((id) => {
    const project = projects.find((entry) => entry.id === id);
    if (!project) throw new Error(`Featured project "${id}" is missing from content/lab/lab.json`);
    return { id, ...project.data };
  });
};
