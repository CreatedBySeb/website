import { z, defineCollection } from "astro:content";

const gamesCollection = defineCollection({
    type: "content",
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
    type: "content",
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
	type: "content",
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
