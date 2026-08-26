// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import lastmodMap from './src/data/lastmod-map.json';

// @ts-check
const SITE_URL = 'https://matchtrip-blue.vercel.app';

// Sitemap priorities: upcoming events 0.9/weekly, event+guide hubs 0.8,
// venues/cities/sports 0.7, ended events 0.4, utility pages 0.3.
// Upcoming event slugs mirror src/data/events.js (status === 'upcoming').
const UPCOMING_EVENTS = [
  'super-bowl-2027',
  'champions-league-final-2027',
  'f1-las-vegas-grand-prix-2026',
  'f1-las-vegas-grand-prix-2027',
  'masters-golf-2027',
  'ryder-cup-2027',
  'wimbledon-2027',
  'f1-monaco-grand-prix-2027',
  'the-open-2027',
  'f1-singapore-grand-prix',
  'us-open-tennis',
  'olympics-2028',
  'kentucky-derby-2027',
  'indy-500-2027',
  'australian-open-2027',
  'french-open-2027',
  'f1-miami-grand-prix-2027',
];

// Route-level lastmod dates from real git history (scripts/gen-sitemap-lastmod.mjs).
// Falls back to null — Astro omits <lastmod> rather than faking a date.
const gitLastmod = (path) => lastmodMap[path] || null;

// https://astro.build/config
export default defineConfig({
  output: 'static',
  adapter: vercel(),
  site: SITE_URL,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      serialize(item) {
        const path = item.url.replace(SITE_URL, '') || '/';
        const lastmod = gitLastmod(path);
        const withMod = lastmod ? { ...item, lastmod: new Date(lastmod) } : item;

        // Event detail pages (hubs — category and year pages — are excluded)
        const segments = path.split('/').filter(Boolean);
        const isEventDetail =
          segments[0] === 'events' &&
          segments.length === 2 &&
          !['2026', '2027', '2028', 'football', 'f1', 'nba', 'tennis'].includes(segments[1]);
        if (isEventDetail) {
          const isEnded = !UPCOMING_EVENTS.includes(segments[1]);
          return {
            ...withMod,
            priority: isEnded ? 0.4 : 0.9,
            changefreq: isEnded ? 'monthly' : 'weekly',
          };
        }

        // Event hubs: /events/, category and year pages
        if (segments[0] === 'events') return { ...withMod, priority: 0.8, changefreq: 'weekly' };

        if (segments[0] === 'guides') return { ...withMod, priority: 0.8, changefreq: 'weekly' };
        if (segments[0] === 'venues') return { ...withMod, priority: 0.7, changefreq: 'monthly' };
        if (segments[0] === 'cities') return { ...withMod, priority: 0.7, changefreq: 'monthly' };
        if (segments[0] === 'sports') return { ...withMod, priority: 0.7, changefreq: 'weekly' };
        if (path === '/') return { ...withMod, priority: 1.0, changefreq: 'weekly' };
        if (segments[0] === 'about' || segments[0] === 'editorial-policy')
          return { ...withMod, priority: 0.6, changefreq: 'monthly' };
        return { ...withMod, priority: 0.3, changefreq: 'yearly' };
      },
    }),
  ],
});
