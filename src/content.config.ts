import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

const baseSchema = z.object({
	title: z.string(),
	description: z.string(),
	date: z.date(),
});

const gamesCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/games" }),
    schema: () => baseSchema.extend({
        link: z.string().optional(),
        jam: z.object({
			name: z.string(),
			link: z.string(),
		}).optional(),
        tech: z.string().array(),
    }),
});

const projectsCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
    schema: () => baseSchema.extend({
        link: z.object({
			name: z.string(),
			url: z.string(),
		}).optional(),
        tech: z.string().array(),
    }),
});

const thoughtsCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/thoughts" }),
	schema: () => baseSchema.extend({}),
})

export const collections = {
    games: gamesCollection,
    projects: projectsCollection,
	thoughts: thoughtsCollection,
};
