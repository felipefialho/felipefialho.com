import { getCollection } from 'astro:content';
import labFile from '../../content/lab/lab.json';

// The content store returns entries by id, so lab.json's array order is the relevance ranking
const rank = new Map(labFile.map((project, index) => [project.id, index]));

export const getLabProjects = async () =>
  (await getCollection('lab')).sort((a, b) => (rank.get(a.id) ?? 0) - (rank.get(b.id) ?? 0));
