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
});
