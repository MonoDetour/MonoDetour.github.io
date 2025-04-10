// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightObsidianTheme from 'starlight-theme-obsidian'

// https://astro.build/config
export default defineConfig({
	site: "https://monodetour.github.io",
    integrations: [
        starlight({
            title: 'MonoDetour',
            credits: true,
            logo: {
				src: './public/favicon.svg',
			},
			social: {
				github: "https://github.com/MonoDetour/MonoDetour",
			},
			editLink: {
				baseUrl: "https://github.com/MonoDetour/MonoDetour.github.io/edit/main/"
			},
			customCss: [
                './src/styles/global.css'
            ],
            plugins: [
				starlightObsidianTheme(),
            ],
            sidebar: [
				{
					label: "Getting Started",
					autogenerate: { directory: "getting-started" },
				},
				{
					label: "Usage Examples",
					autogenerate: { directory: "usage-examples" },
				},
			],
        }),
    ],
    devToolbar: { enabled: false },
});
