import rss, { type RSSFeedItem } from "@astrojs/rss";
import { getAllContent, sortByDate } from "@lib/util";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
	const rawItems = await getAllContent();
	const items: RSSFeedItem[] = sortByDate(rawItems)
		.map((i) => ({
			title: i.data.title,
			pubDate: i.data.date,
			description: i.data.description,
			link: `/${i.collection}/${i.id}`,
			categories: [i.collection],
		}));

	return rss({
		title: "sébastien dunne fulmer",
		description: "Sébastien's personal website, covering thoughts, games and other projects",
		site: context.site as URL,
		stylesheet: "/pretty-feed-v3.xsl",
		items,
	});
};
