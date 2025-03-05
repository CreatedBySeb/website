import { glob } from "astro/loaders";
import { z, defineCollection } from "astro:content";

const gamesCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/games" }),
    schema: () => z.object({
        name: z.string(),
        link: z.string().optional(),
        jam: z.object({
			name: z.string(),
			link: z.string(),
		}).optional(),
        tagline: z.string(),
        tech: z.string().array(),
		date: z.date(),
    }),
});

const projectsCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
    schema: () => z.object({
        name: z.string(),
        link: z.object({
			name: z.string(),
			url: z.string(),
		}).optional(),
        tagline: z.string(),
        tech: z.string().array(),
        date: z.date(),
    }),
});

const thoughtsCollection = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/thoughts" }),
	schema: () => z.object({
		title: z.string(),
		date: z.date(),
	}),
})

export const collections = {
    games: gamesCollection,
    projects: projectsCollection,
	thoughts: thoughtsCollection,
};
