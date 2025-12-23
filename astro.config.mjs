import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: "https://www.sebastienfulmer.com",
	integrations: [icon(), sitemap()],
	redirects: {
		"/techs/[...slug]": "/tags/[...slug]",
		"/techs/csharp": "/tags/c-sharp",
	}
});
