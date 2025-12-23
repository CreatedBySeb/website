import rss, { type RSSFeedItem } from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection, type CollectionKey } from "astro:content";

const COLLECTIONS: CollectionKey[] = ["games", "projects", "thoughts"];

export const GET: APIRoute = async (context) => {
	const rawItems = await Promise.all(COLLECTIONS.map((c) => getCollection(c)));
	const items: RSSFeedItem[] = rawItems
		.flat() // Combine all items
		.sort((a, b) => {
			return b.data.date.getTime() - a.data.date.getTime();
		}) // Sort from newest to oldest
		.map((i) => ({
			title: i.data.title,
			pubDate: i.data.date,
			description: i.data.description,
			link: `/${i.collection}/${i.id}`,
		})); // Map to feed items using base keys

	return rss({
		title: "sébastien dunne fulmer",
		description: "Sébastien's personal website, covering thoughts, games and other projects",
		site: context.site as URL,
		stylesheet: "/pretty-feed-v3.xsl",
		items,
	});
};
