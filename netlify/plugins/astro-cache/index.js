// Persists Astro's content layer store, image cache and the rendered OG cards between deploys
const CACHE_PATHS = ['node_modules/.astro', 'node_modules/.cache/og'];

export const onPreBuild = async ({ utils }) => {
  const restored = await utils.cache.restore(CACHE_PATHS);
  console.log(restored ? 'Restored the Astro and OG caches' : 'No Astro or OG cache to restore');
};

export const onPostBuild = async ({ utils }) => {
  const saved = await utils.cache.save(CACHE_PATHS);
  console.log(saved ? 'Saved the Astro and OG caches' : 'Nothing to save in the Astro and OG caches');
};
