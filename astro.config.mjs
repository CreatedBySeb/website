import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
	site: "https://www.sebastienfulmer.com",
	integrations: [expressiveCode(), icon(), mdx(), sitemap()],

	fonts: [
		{
			provider: fontProviders.google(),
			name: "Work Sans",
			cssVariable: "--font-work-sans",
		},
	],

	redirects: {
		"/techs/[...slug]": "/tags/[...slug]",
		"/techs/csharp": "/tags/c-sharp",
	},
});
