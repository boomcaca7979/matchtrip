// Generates src/data/lastmod-map.json — per-route lastmod dates derived from
// real git history (latest commit touching each route's source files).
// Run after content edits: node scripts/gen-sitemap-lastmod.mjs
import { execSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { eventsData } from '../src/data/events.js';
import { venuesData } from '../src/data/venues.js';

const gitDate = (file) => {
  try {
    return execSync(`git log -1 --format=%cI -- "${file}"`, { encoding: 'utf8' }).trim() || null;
  } catch {
    return null;
  }
};

// lastmod of a route = latest git commit across the files that produce it
const latest = (files) => {
  const dates = files.map(gitDate).filter(Boolean).sort();
  return dates[dates.length - 1] || null;
};

const map = {};

// Event detail pages: data + template
for (const id of Object.keys(eventsData)) {
  map[`/events/${id}/`] = latest(['src/data/events.js', 'src/pages/events/[id].astro']);
}

// Year pages
for (const y of ['2026', '2027', '2028']) {
  map[`/events/${y}/`] = latest(['src/data/events.js', 'src/pages/events/[year].astro']);
}

// Event hubs
map['/events/'] = latest(['src/data/events.js', 'src/pages/events/index.astro']);
for (const cat of ['football', 'f1', 'nba', 'tennis']) {
  map[`/events/${cat}/`] = latest(['src/data/events.js', `src/pages/events/${cat}/index.astro`]);
}

// Venues
for (const slug of Object.keys(venuesData)) {
  map[`/venues/${slug}/`] = latest(['src/data/venues.js', 'src/pages/venues/[slug].astro']);
}
map['/venues/'] = latest(['src/data/venues.js', 'src/pages/venues/index.astro']);

// Cities (slugs derived from eventsData, mirroring /cities/[slug].astro)
const citySlugs = new Set(
  Object.values(eventsData)
    .map((e) => e.location?.city?.toLowerCase().replace(/\s+/g, '-'))
    .filter(Boolean)
);
for (const slug of citySlugs) {
  map[`/cities/${slug}/`] = latest(['src/data/cities.js', 'src/data/events.js', 'src/pages/cities/[slug].astro']);
}

// Guides
map['/guides/'] = latest(['src/pages/guides/index.astro', 'src/data/events.js']);
for (const g of ['best-sports-cities', 'sports-event-travel', 'sports-travel-budget', 'sports-travel-planning']) {
  map[`/guides/${g}/`] = latest([`src/pages/guides/${g}/index.astro`]);
}

// Sports category pages
for (const s of ['football', 'motorsport', 'tennis', 'golf', 'basketball', 'american-football', 'horse-racing', 'multi-sport']) {
  map[`/sports/${s}/`] = latest(['src/pages/sports/[category].astro', 'src/data/events.js']);
}

// Static pages
map['/'] = latest(['src/pages/index.astro', 'src/data/events.js']);
for (const p of ['about', 'contact', 'privacy', 'terms']) {
  map[`/${p}/`] = latest([`src/pages/${p}.astro`]);
}
map['/editorial-policy/'] = latest(['src/pages/editorial-policy.astro']);

mkdirSync('src/data', { recursive: true });
writeFileSync('src/data/lastmod-map.json', JSON.stringify(map, null, 2) + '\n');

const missing = Object.entries(map).filter(([, v]) => !v).map(([k]) => k);
console.log(`lastmod-map.json: ${Object.keys(map).length} routes`);
if (missing.length) console.log('routes without git history (not yet committed):', missing.join(', '));
