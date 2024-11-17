export const dateFormatter = new Intl.DateTimeFormat(undefined, { day: "numeric", month: "long", weekday: "long", year: "numeric" });

export function slugify(string: string): string {
	return string
		.toLowerCase()
		.replace(".", "-")
		.replace("#", "sharp"); // For C#
}
