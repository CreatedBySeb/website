import { test, expect } from "@playwright/test";

const TITLE = "sébastien dunne fulmer";

test("homepage", async ({ page }) => {
	await page.goto("/");

	await expect(page).toHaveTitle(`about - ${TITLE}`);
	await expect(page.getByRole("heading", { name: TITLE })).toBeVisible();

	const nav = page.getByRole("navigation");
	await expect(nav).toBeVisible();
	await expect(nav.getByRole("link")).toHaveCount(3);

	const footer = page.locator("footer");
	await expect(footer).toBeVisible();
	await expect(footer.getByRole("link", { name: "RSS Feed" })).toBeVisible();

	const body = page.locator("body");
	await expect(body).toHaveCSS("font-family", /Work Sans/i);

	// Wait for all fonts to load, then assert that every request for a font succeeded
	await page.evaluate(() => document.fonts.ready);
	const requests = await page.requests();
	const fontRequests = requests.filter((req) => req.url().endsWith(".woff2"));
	const responses = await Promise.all(fontRequests.map((req) => req.response()));
	expect(responses.every((res) => res?.ok())).toBeTruthy();
});
