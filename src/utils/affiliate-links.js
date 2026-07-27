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
 * Build a Travelpayouts redirect URL for any hotel/experience provider.
 * Common shape: tp.media/r?marker=xxx&p={promoId}&u=<encoded target URL>&utm_*=...
 * Used by Klook / KKday / Booking providers.
 * @param {object} p        Program config (klook | kkday | booking)
 * @param {string} city
 * @param {string} checkin
 * @param {string} checkout
 * @param {string} campaign
 */
function buildTravelpayoutsRedirect(p, { city = '', checkin = '', checkout = '', campaign = '' } = {}) {
  if (!p || !p.id || !p.enabled) return null;

  // promoId required for Klook/KKday (Booking uses extra.p instead)
  const promoId = p.promoId || (p.extra && p.extra.p) || '';
  if (!promoId) return null;

  // Build target URL (klook.com / kkday.com / booking.com search page)
  const targetUrl = new URL(p.targetBaseUrl);

  // Provider-specific search param (klook: query, kkday: keyword, booking: ss)
  const searchParam = p.targetSearchParam || 'ss';
  if (city) targetUrl.searchParams.set(searchParam, city);

  // Booking.com supports checkin/checkout; Klook/KKday don't but we pass them
  // for future compatibility (they'll be ignored by the target site).
  if (checkin) targetUrl.searchParams.set('checkin', checkin);
  if (checkout) targetUrl.searchParams.set('checkout', checkout);

  // Wrap into tp.media/r redirect
  const redirectUrl = new URL(p.baseUrl);
  redirectUrl.searchParams.set(p.param, p.id);
  redirectUrl.searchParams.set('p', promoId);
  redirectUrl.searchParams.set('u', targetUrl.toString());

  // UTM params
  for (const [k, v] of Object.entries(UTM_DEFAULTS)) {
    if (v) redirectUrl.searchParams.set(k, v);
  }
  if (campaign) redirectUrl.searchParams.set('utm_campaign', campaign);

  return redirectUrl.toString();
}

/**
 * Build a hotel booking link.
 * Dispatches based on AFFILIATE_PROGRAMS.hotelProvider:
 *  - 'klook':  优先 Klook, promoId 未填则回退 KKday, 再回退 fallback
 *  - 'kkday':  优先 KKday, promoId 未填则回退 Klook, 再回退 fallback
 *  - 'booking': 走原 Booking.com Travelpayouts redirect (p=4114)
 * @param {{ city: string, checkin?: string, checkout?: string, campaign?: string }} opts
 */
export function buildHotelLink({ city = '', checkin = '', checkout = '', campaign = '' } = {}) {
  const provider = AFFILIATE_PROGRAMS.hotelProvider || 'booking';

  if (provider === 'klook') {
    // Try Klook first
    const klookUrl = buildTravelpayoutsRedirect(AFFILIATE_PROGRAMS.klook, { city, checkin, checkout, campaign });
    if (klookUrl) return klookUrl;
    // Fallback to KKday
    const kkdayUrl = buildTravelpayoutsRedirect(AFFILIATE_PROGRAMS.kkday, { city, checkin, checkout, campaign });
    if (kkdayUrl) return kkdayUrl;
    // Final fallback: Google Hotels (no commission, functional)
    return fallbackHotels(city);
  }

  if (provider === 'kkday') {
    // Try KKday first
    const kkdayUrl = buildTravelpayoutsRedirect(AFFILIATE_PROGRAMS.kkday, { city, checkin, checkout, campaign });
    if (kkdayUrl) return kkdayUrl;
    // Fallback to Klook
    const klookUrl = buildTravelpayoutsRedirect(AFFILIATE_PROGRAMS.klook, { city, checkin, checkout, campaign });
    if (klookUrl) return klookUrl;
    return fallbackHotels(city);
  }

  // Legacy / default: Booking.com via Travelpayouts redirect (p=4114)
  // Preserved so re-enabling Booking only requires setting hotelProvider='booking'.
  if (!isEnabled('booking')) return fallbackHotels(city);
  const p = AFFILIATE_PROGRAMS.booking;
  if (!p.id) return fallbackHotels(city);

  // Booking redirect mode
  if (p.redirectMode && p.targetBaseUrl) {
    const url = buildTravelpayoutsRedirect(p, { city, checkin, checkout, campaign });
    if (url) return url;
  }

  // Standard mode (Awin / Booking.com direct): booking.com?aid=xxx&ss=city
  return trackedUrl('booking', p.baseUrl, {
    ss: city,
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
 * @param {{ url: string, slug: string, campaign?: string }} opts
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
 * Build an official ticket link (direct, no affiliate commission).
 * Returns the official URL as-is, or a fallback search if no URL is provided.
 * @param {{ url: string, slug?: string }} opts
 */
export function buildOfficialTicketLink({ url = '', slug = '' } = {}) {
  if (url) return url;
  // Fallback to a search query if no official URL is available.
  return fallbackTickets(slug);
}

/**
 * Build resale ticket links across all enabled resale programs.
 * Returns an array of { provider, label, url } for each available resale channel.
 * Programs without affiliate ID or disabled are skipped (no dead links).
 * @param {{ slug: string, campaign?: string, resaleTickets?: Array }} opts
 */
export function buildResaleTicketLinks({ slug = '', campaign = '', resaleTickets = [] } = {}) {
  const results = [];

  // Build from explicit resaleTickets config if provided (new data structure)
  if (Array.isArray(resaleTickets) && resaleTickets.length > 0) {
    for (const rt of resaleTickets) {
      if (!rt || !rt.enabled || !rt.slug) continue;
      const program = rt.provider;
      const p = AFFILIATE_PROGRAMS[program];
      if (!p || !p.id || !p.enabled) continue;
      const tracked = trackedUrl(
        program,
        `${p.baseUrl}/e/${rt.slug}`,
        {},
        campaign
      );
      results.push({
        provider: program,
        label: program === 'stubhub' ? 'StubHub' : (program === 'viagogo' ? 'Viagogo' : program),
        url: tracked,
      });
    }
    return results;
  }

  // Legacy fallback: use the slug param against stubhub + viagogo
  if (!slug) return results;

  // StubHub
  if (isEnabled('stubhub') && AFFILIATE_PROGRAMS.stubhub.id) {
    results.push({
      provider: 'stubhub',
      label: 'StubHub',
      url: trackedUrl('stubhub', `${AFFILIATE_PROGRAMS.stubhub.baseUrl}/e/${slug}`, {}, campaign),
    });
  }

  // Viagogo
  if (isEnabled('viagogo') && AFFILIATE_PROGRAMS.viagogo.id) {
    results.push({
      provider: 'viagogo',
      label: 'Viagogo',
      url: trackedUrl('viagogo', `${AFFILIATE_PROGRAMS.viagogo.baseUrl}/e/${slug}`, {}, campaign),
    });
  }

  return results;
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
