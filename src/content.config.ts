import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './content/blog' }),
	schema: () =>
		z.object({
			date: z.coerce.date(),
			title: z.string().max(80),
			description: z.string().max(160),
			image: z
				.object({
					src: z.string().url().optional(),
					alt: z.string().optional(),
				})
				.optional(),
			seo: z
				.object({
					title: z.string().max(80).optional(),
					description: z.string().max(160).optional(),
					image: z
						.object({
							src: z.string().url().optional(),
							alt: z.string().optional(),
						})
						.optional(),
				})
				.optional(),
		}),
});

export const collections = { blog };
