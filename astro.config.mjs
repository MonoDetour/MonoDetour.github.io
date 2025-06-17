// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator'
import starlightThemeObsidian from 'starlight-theme-obsidian'
import fs from 'node:fs'

// https://astro.build/config
export default defineConfig({
	site: "https://monodetour.github.io",
	integrations: [
		starlight({
			title: 'MonoDetour',
			expressiveCode: {
				shiki: {
					langs: [async () => JSON.parse(fs.readFileSync('./src/styles/cil-grammar.json', 'utf-8'))],
				},
			},
			head: [
				{
					tag: 'meta', attrs: { property: 'og:image', content: 'https://monodetour.github.io/logo.webp' },
				},
				{
					tag: 'meta', attrs: { property: 'twitter:image', content: 'https://monodetour.github.io/logo.webp' },
				},
				{
					tag: 'meta', attrs: { name: 'twitter:card', content: 'summary' },
				}
			],
			credits: true,
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
				starlightLinksValidator(),
				starlightThemeObsidian({
					debug: false,
					sitemapConfig: {},
					graphConfig: {},
					backlinksConfig: {},
					graph: false,
					backlinks: false
				}),
			],
			sidebar: [
				{
					label: "Getting Started",
					autogenerate: { directory: "getting-started" },
				},
				{
					label: "Hooking",
					autogenerate: { directory: "hooking" },
				},
				{
					label: "ILHooking",
					autogenerate: { directory: "ilhooking" },
				},
			],
		}),
	],
	devToolbar: { enabled: false },
});
