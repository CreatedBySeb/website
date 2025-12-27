import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

const tagsCollection = defineCollection({
	loader: glob({ pattern: "**/*.toml", base: "./src/content/tags" }),
	schema: () => z.object({
		name: z.string(),
	}),
});

const baseSchema = z.object({
	title: z.string(),
	description: z.string(),
	date: z.date(),
	tags: z.array(reference("tags")).optional(),
});

const gamesCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/games" }),
    schema: () => baseSchema.extend({
        link: z.string().optional(),
        jam: z.object({
			name: z.string(),
			link: z.string(),
		}).optional(),
    }),
});

const projectsCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
    schema: () => baseSchema.extend({
        link: z.object({
			name: z.string(),
			url: z.string(),
		}).optional(),
    }),
});

const thoughtsCollection = defineCollection({
	loader: glob({ pattern: "**/*.mdx", base: "./src/content/thoughts" }),
	schema: () => baseSchema.extend({}),
})

export const collections = {
    games: gamesCollection,
    projects: projectsCollection,
	tags: tagsCollection,
	thoughts: thoughtsCollection,
};
