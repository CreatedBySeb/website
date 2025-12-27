import { getEntries, type CollectionEntry, type ReferenceDataEntry } from "astro:content";

interface DatedItem {
	data: {
		date: Date;
	};
}

interface TaggedItem {
	data: {
		tags?: ReferenceDataEntry<"tags", string>[] | undefined;
	};
}

export type LinkedData = Record<string, unknown>;

export const COLLECTIONS = ["games", "projects", "thoughts"] as const;

export const dateFormatter = new Intl.DateTimeFormat(undefined, { day: "numeric", month: "long", weekday: "long", year: "numeric" });

/**
 * Generates a set of Structured Data Breadcrumbs from an array of items
 * @param items An array of name, link pairs to build the breadcrumbs from
 * @returns A JSON-LD object representing the breadcrumb, ready to be serialised
 */
export function getBreadcrumbs(items: [string, URL | string | undefined][]): LinkedData {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": items.map(([name, link], i) => ({
			"@type": "ListItem",
			"position": i + 1,
			"name": name,
			"item": link?.toString(),
		})),
	}
}

/**
 * Gets the tag entries for all of the tags referenced by a content item
 * @param item A content item which has an optional tags property which is an array of references
 * @returns A Promise of an array of tag entries, or an empty array if there are no tags
 */
export async function getTags(item: TaggedItem): Promise<CollectionEntry<"tags">[]> {
	if (!item.data.tags) return [];
	return await getEntries(item.data.tags);
}

/**
 * Sorts content items by their date
 * @param items An array of content items which have a date property
 * @returns The content items sorted by date in descending order (most recent to least recent)
 */
export function sortByDate<T extends DatedItem>(items: T[]): T[] {
	return items.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function toISODate(date: Date): string {
	return date.toISOString().split("T", 1).shift() as string;
}
