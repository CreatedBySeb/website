import { expect, test } from "@playwright/test";

const TITLE = "sébastien dunne fulmer";

test("homepage", async ({ page }) => {
	await page.goto("/");

	await expect(page).toHaveTitle(`about - ${TITLE}`);
	await expect(page.getByRole("heading", { name: TITLE })).toBeVisible();

	// Check the special homepage nav
	const nav = page.getByRole("navigation");
	await expect(nav).toBeVisible();
	await expect(nav.getByRole("link")).toHaveCount(3);

	// Check the footer contents
	const footer = page.locator("footer");
	await expect(footer).toBeVisible();
	await expect(footer.getByRole("link", { name: "RSS Feed" })).toBeVisible();

	// Check the font is set correctly
	const body = page.locator("body");
	await expect(body).toHaveCSS("font-family", /Work Sans/i);

	// Check that all fonts are loading correctly
	await page.evaluate(() => document.fonts.ready);
	const requests = await page.requests();
	const fontRequests = requests.filter((req) => req.url().endsWith(".woff2"));
	const responses = await Promise.all(fontRequests.map((req) => req.response()));
	expect(
		responses.every((res) => res?.ok()),
		"every font request should have loaded",
	).toBeTruthy();

	// Check there are 5 recent items
	const recentItems = page.getByRole("region", { name: "recent items" });
	await expect(recentItems.getByRole("listitem")).toHaveCount(5);

	// Check there are 5 things
	const things = page.getByRole("region", { name: "things i've" });
	await expect(things.getByRole("listitem")).toHaveCount(5);
});
