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
				description: z.string(),
				sidebar: z.object({
					order: z.number(),
				}),
			}),
		})
	})
};
