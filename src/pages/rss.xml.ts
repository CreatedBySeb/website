import rss, { type RSSFeedItem } from "@astrojs/rss";
import { COLLECTIONS, sortByDate } from "@lib/util";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async (context) => {
	const rawItems = await Promise.all(COLLECTIONS.map((c) => getCollection(c)));
	const items: RSSFeedItem[] = sortByDate(rawItems.flat())
		.map((i) => ({
			title: i.data.title,
			pubDate: i.data.date,
			description: i.data.description,
			link: `/${i.collection}/${i.id}`,
		}));

	return rss({
		title: "sébastien dunne fulmer",
		description: "Sébastien's personal website, covering thoughts, games and other projects",
		site: context.site as URL,
		stylesheet: "/pretty-feed-v3.xsl",
		items,
	});
};
