// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel(),
  site: 'https://matchtrip-blue.vercel.app',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
