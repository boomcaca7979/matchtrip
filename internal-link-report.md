# Internal Link Report

Audit: 2026-08-26 · Script: `scripts/link_audit.py` · Build: 74 pages

## Rules

- Event: ≥1 venue, ≥2 cities, ≥2 guides
- Venue: ≥3 events, ≥1 city, ≥2 guides
- City: ≥3 events, ≥2 venues, ≥2 guides

## Results

| Layer | Pages | Below target |
|---|---|---|
| Event | 24 | **0** |
| City | 17 | **0** |
| Venue | 6 | **0** |
| **Broken links** | all | **0** |

## Structural changes made

1. Event pages: new "Plan Your Trip" section (3 guide cards: planning /
   budget / best-sports-cities) — guides 1 → 3 per event page.
2. Event pages: Key Venues card falls back to same-city venue → /venues/
   hub; Host Cities card adds "More sports cities" (same continent first).
3. City pages: "Plan Your {city}" now lists up to 3 real upcoming events;
   added "More Events to Explore" (same-continent) and "Venue Guides"
   (local → same continent) blocks.
4. Venue pages: Related Events rebuilt — same-city real events, upcoming
   first, de-duplicated, always rendered (fixes wembley empty list bug).
