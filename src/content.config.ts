// import { z, defineCollection } from 'astro:content';
// import { docsLoader } from '@astrojs/starlight/loaders';
// import { docsSchema } from '@astrojs/starlight/schema';

// export const collections = {
// 	docs: defineCollection({
// 		loader: docsLoader(),
// 		schema: docsSchema({
// 			extend: z.object({
// 				description: z.string(),
// 				sidebar: z.object({
// 					order: z.number(),
// 				}),
// 			})
// 		})
// 	}),
// };

import { z, defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { pageThemeObsidianSchema } from 'starlight-theme-obsidian/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: pageThemeObsidianSchema.extend({
				// I don't like having these optional, but it's the easiest with generated API references.
				description: z.string().optional(),
				sidebar: z.object({
					order: z.number().optional(),
				}),
			}),
		})
	})
};
