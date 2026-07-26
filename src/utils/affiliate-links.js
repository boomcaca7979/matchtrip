/**
 * Affiliate Link Utilities
 * ========================
 *
 * Builds tracked outbound URLs from your affiliate config.
 * Each helper returns a full URL string ready for <a href>.
 *
 * Usage in templates:
 *   import { buildHotelLink, buildFlightLink, buildTicketLink } from '../utils/affiliate-links';
 *   <a href={buildHotelLink({ city: 'Milan', campaign: 'winter-olympics-2026' })}>Find Hotels</a>
 */

import { AFFILIATE_PROGRAMS, UTM_DEFAULTS } from '../config/affiliates';

// ── Internal helpers ──────────────────────────────────

function isEnabled(program) {
  const p = AFFILIATE_PROGRAMS[program];
  return !!(p && p.enabled);
}

/**
 * Safe fallback URLs used when an affiliate program is disabled or missing ID.
 * These are non-monetized but functional, avoiding dead '#' links and naked
 * affiliate links that would leak traffic without commission.
 */
function fallbackHotels(city) {
  const q = city ? `hotels in ${city}` : 'hotels';
  return `https://www.google.com/travel/hotels?q=${encodeURIComponent(q)}`;
}
function fallbackFlights(to) {
  const q = to ? `flights to ${to}` : 'flights';
  return `https://www.google.com/travel/flights?q=${encodeURIComponent(q)}`;
}
function fallbackTickets(slug) {
  const q = slug ? slug.replace(/-/g, ' ') : 'event tickets';
  return `https://www.google.com/search?q=${encodeURIComponent(q + ' tickets')}`;
}
function fallbackActivities(query) {
  const q = query ? `${query} tours` : 'tours and activities';
  return `https://www.google.com/search?q=${encodeURIComponent(q)}`;
}

/**
 * Append affiliate ID + UTM params to a URL.
 */
function trackedUrl(program, basePath, searchParams = {}, campaign = '') {
  const p = AFFILIATE_PROGRAMS[program];
  if (!p) return basePath;

  const url = new URL(basePath || p.baseUrl);

  // Affiliate tracking param
  if (p.id && p.param) {
    url.searchParams.set(p.param, p.id);
  }

  // Static extra params from config
  if (p.extra) {
    for (const [k, v] of Object.entries(p.extra)) {
      url.searchParams.set(k, v);
    }
  }

  // Per-link search params (e.g. city, checkin, checkout)
  for (const [k, v] of Object.entries(searchParams)) {
    if (v) url.searchParams.set(k, v);
  }

 // UTM params (only if affiliate ID is set — don't pollute direct links)
 if (p.id) {
   for (const [k, v] of Object.entries(UTM_DEFAULTS)) {
      if (v) url.searchParams.set(k, v);
   }
   if (campaign) {
      url.searchParams.set('utm_campaign', campaign);
    }
  }

  return url.toString();
}

// ── Public API ────────────────────────────────────────

/**
 * Build a hotel booking link.
 * @param {{ city: string, checkin?: string, checkout?: string, campaign?: string }} opts
 */
export function buildHotelLink({ city = '', checkin = '', checkout = '', campaign = '' } = {}) {
  // If program disabled, use fallback (no dead '#' link).
  if (!isEnabled('booking')) return fallbackHotels(city);
  // If affiliate ID is missing, do NOT generate naked booking.com URL
  // (that would leak traffic without commission). Use fallback instead.
  if (!AFFILIATE_PROGRAMS.booking.id) return fallbackHotels(city);

  return trackedUrl('booking', AFFILIATE_PROGRAMS.booking.baseUrl, {
    ss: city,             // Booking.com search query
    checkin,
    checkout,
  }, campaign);
}

/**
 * Build a flight search link.
 * @param {{ from?: string, to?: string, campaign?: string }} opts
 */
export function buildFlightLink({ from = '', to = '', campaign = '' } = {}) {
  // If program disabled or ID missing, use fallback (no dead '#' link).
  if (!isEnabled('skyscanner') || !AFFILIATE_PROGRAMS.skyscanner.id) {
    return fallbackFlights(to);
  }

  // Skyscanner URL format: /transport/flights/{from}/{to}/
  const path = (from && to)
    ? `${AFFILIATE_PROGRAMS.skyscanner.baseUrl}/${from}/${to}/`
    : AFFILIATE_PROGRAMS.skyscanner.baseUrl;

  return trackedUrl('skyscanner', path, {}, campaign);
}

/**
 * Build an event ticket link (resale marketplace).
 * @param {{ slug: string, campaign?: string }} opts
 */
export function buildTicketLink({ url = '', slug = '', campaign = '' } = {}) {
  // If there's a direct official URL (FIFA, UEFA, etc.), use it as-is.
  // StubHub/Viagogo can be offered as secondary options.
  if (url) return url;
  // If StubHub disabled or ID missing, use fallback (no dead '#' link).
  if (!isEnabled('stubhub') || !AFFILIATE_PROGRAMS.stubhub.id) {
    return fallbackTickets(slug);
  }
  return trackedUrl('stubhub', `${AFFILIATE_PROGRAMS.stubhub.baseUrl}/e/${slug}`, {}, campaign);
}

/**
 * Build a tours & activities link.
 * @param {{ query: string, campaign?: string }} opts
 */
export function buildActivityLink({ query = '', campaign = '' } = {}) {
  // If program disabled or ID missing, use fallback (no dead '#' link).
  if (!isEnabled('viator') || !AFFILIATE_PROGRAMS.viator.id) {
    return fallbackActivities(query);
  }
  return trackedUrl('viator', AFFILIATE_PROGRAMS.viator.baseUrl, { text: query }, campaign);
}

/**
 * Get the affiliate program status for admin/debug purposes.
 */
export function getAffiliateStatus() {
  return Object.entries(AFFILIATE_PROGRAMS).map(([key, p]) => ({
    program: key,
    enabled: p.enabled,
    hasId: !!p.id,
  }));
}
