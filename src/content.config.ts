import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    loader: docsLoader({
      // Preserve underscores in slugs so /maps/ze_best_korea works correctly.
      // Leading-underscore files (e.g. _map-template.md) remain ignored by
      // the loader regardless of this override.
      generateId: ({ entry }) => entry.replace(/\.mdx?$/, '').toLowerCase(),
    }),
    schema: docsSchema(),
  }),
};
