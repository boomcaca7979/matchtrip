/**
 * MatchTrip Affiliate Configuration
 * ===================================
 * 
 * All affiliate partner IDs and program settings live here.
 * To start earning, sign up for each program and fill in your IDs below.
 *
 * Each program has:
 *  - id:        Your unique affiliate/partner ID
 *  - enabled:   Toggle on/off without removing config
 *  - baseUrl:   The partner's base URL (without tracking params)
 *  - param:     The query parameter name the partner uses for affiliate tracking
 *  - extra:     Any additional static query params required by the program
 */

export const AFFILIATE_PROGRAMS = {

  /* ── Hotel Booking ─────────────────────────────────── */
  booking: {
    id: '',            // e.g. '1234567'  — sign up at partner.booking.com
    enabled: true,
    baseUrl: 'https://www.booking.com/searchresults.html',
    param: 'aid',      // Booking.com uses ?aid=<your_id>
    extra: {},
  },

  /* ── Flight Search ─────────────────────────────────── */
  skyscanner: {
    id: '',            // e.g. 'matchtrip-uk'  — sign up at affiliates.skyscanner.net
    enabled: true,
    baseUrl: 'https://www.skyscanner.net/transport/flights',
    param: 'associateid',
    extra: {},
  },

  /* ── Event Tickets (Primary) ──────────────────────── */
  // For official tickets — most major events don't offer affiliate programs,
  // so these are direct links. You earn nothing here but provide user value.
  tickets: {
    id: '',
    enabled: true,
    baseUrl: '',
    param: '',
    extra: {},
  },

  /* ── Event Tickets (Resale Marketplace) ───────────── */
  stubhub: {
    id: '',            // sign up at stubhub.com/affiliate
    enabled: true,
    baseUrl: 'https://www.stubhub.com',
    param: 'pid',
    extra: {},
  },

  viagogo: {
    id: '',            // sign up at viagogo.com/affiliates
    enabled: true,
    baseUrl: 'https://www.viagogo.com',
    param: 'affiliateId',
    extra: {},
  },

  /* ── Tours & Activities ───────────────────────────── */
  viator: {
    id: '',            // sign up at viator.com/affiliate
    enabled: true,
    baseUrl: 'https://www.viator.com/searchResults/all',
    param: 'pid',
    extra: {},
  },
};

/**
 * UTM parameters appended to every outbound link for your own analytics.
 * Set these once; they're appended automatically.
 */
export const UTM_DEFAULTS = {
  utm_source: 'matchtrip',
  utm_medium: 'affiliate',
  // utm_campaign will be set per event, e.g. 'world-cup-2026'
};
