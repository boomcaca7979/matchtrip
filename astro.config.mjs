// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

// @ts-check
const SITE_URL = 'https://matchtrip-blue.vercel.app';

// Sitemap priorities: upcoming events rank highest (0.9), guides 0.8,
// venues/cities 0.7, ended events drop to 0.5, utility pages 0.3.
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
      lastmod: new Date(),
      serialize(item) {
        const path = item.url.replace(SITE_URL, '');
        // Ended event detail pages: lower priority, monthly refresh.
        const isEvent = path.startsWith('/events/') && path.split('/').filter(Boolean).length === 2;
        const isEndedEvent = isEvent && !UPCOMING_EVENTS.includes(path.split('/')[2]);
        if (isEvent) {
          return {
            ...item,
            priority: isEndedEvent ? 0.5 : 0.9,
            changefreq: isEndedEvent ? 'monthly' : 'weekly',
            lastmod: new Date(),
          };
        }
        if (path.startsWith('/guides/')) return { ...item, priority: 0.8, changefreq: 'weekly', lastmod: new Date() };
        if (path.startsWith('/venues/')) return { ...item, priority: 0.7, changefreq: 'monthly', lastmod: new Date() };
        if (path.startsWith('/cities/')) return { ...item, priority: 0.7, changefreq: 'monthly', lastmod: new Date() };
        if (path === '/' || path === '') return { ...item, priority: 1.0, changefreq: 'weekly', lastmod: new Date() };
        if (path.startsWith('/about/') || path === '/about') return { ...item, priority: 0.6, changefreq: 'monthly', lastmod: new Date() };
        return { ...item, priority: 0.3, changefreq: 'yearly', lastmod: new Date() };
      },
    }),
  ],
});
