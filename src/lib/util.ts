import { getCollection, getEntries, type CollectionEntry, type ReferenceDataEntry } from "astro:content";

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

export type ContentCollections = "games" | "projects" | "thoughts";

export type LinkedData = Record<string, unknown>;

/** A Structured Data Person, used for author attribution on the site */
export const AUTHOR_PERSON: LinkedData = { "@type": "Person", name: "Sébastien Dunne Fulmer", url: "https://www.sebastienfulmer.com/" };

export const COLLECTIONS: ContentCollections[] = ["games", "projects", "thoughts"];

export const dateFormatter = new Intl.DateTimeFormat(undefined, { day: "numeric", month: "long", weekday: "long", year: "numeric" });

/**
 * Fetches all actual content (i.e. not tags) from the main content collections
 * @param filter An optional filter function passed to getCollection, must handle all types
 * @returns An array of content items
 */
export async function getAllContent(filter?: (item: CollectionEntry<ContentCollections>) => boolean): Promise<CollectionEntry<ContentCollections>[]> {
	return (await Promise.all(
		COLLECTIONS.map((c) => getCollection(c, filter))
	)).flat();
}

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
