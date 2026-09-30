import { getCollection } from 'astro:content';
import labFile from '../../content/lab/lab.json';

// The content store returns entries by id, so lab.json's array order is the relevance ranking
const rank = new Map(labFile.map((project, index) => [project.id, index]));

export const getLabProjects = async () =>
  (await getCollection('lab')).sort((a, b) => (rank.get(a.id) ?? 0) - (rank.get(b.id) ?? 0));

/** Open source featured on the home, each with its proof of use. Stars are approximate; the org sums its repos. */
export const FEATURED_PROJECTS = [
  { id: 'frontend-brasil', proof: { pt: '21 mil estrelas', en: '21k stars' } },
  { id: 'frontend-challenges', proof: { pt: '15 mil estrelas', en: '15k stars' } },
  { id: 'css-components', proof: { pt: '2014, refeito em 2026', en: '2014, rebuilt in 2026' } },
  { id: 'piano', proof: { pt: '2013, refeito em 2026', en: '2013, rebuilt in 2026' } },
] as const;

export const getFeaturedProjects = async () => {
  const projects = await getLabProjects();
  return FEATURED_PROJECTS.map(({ id, proof }) => {
    const project = projects.find((entry) => entry.id === id);
    if (!project) throw new Error(`Featured project "${id}" is missing from content/lab/lab.json`);
    return { ...project.data, proof };
  });
};
