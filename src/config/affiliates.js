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
    id: '',            // ⏳ Awin 审核中
    enabled: true,
    baseUrl: 'https://www.booking.com/searchresults.html',
    param: 'aid',      // Booking.com uses ?aid=<your_id>
    extra: {},
  },

  /* ── Flight Search ─────────────────────────────────── */
  skyscanner: {
    id: '',            // ⏸️ 暂停 — Impact 页面问题
    enabled: false,
    baseUrl: 'https://www.skyscanner.net/transport/flights',
    param: 'associateid',
    extra: {},
  },

  /* ── Event Tickets (Primary) ──────────────────────── */
  tickets: {
    id: '',
    enabled: true,
    baseUrl: '',
    param: '',
    extra: {},
  },

  /* ── Event Tickets (Resale) ───────────────────────── */
  stubhub: {
    id: '',            // ⏸️ 暂停 — Partnerize 登录问题
    enabled: false,
    baseUrl: 'https://www.stubhub.com',
    param: 'pid',
    extra: {},
  },

  viagogo: {
    id: '',            // ⏸️ 暂停 — Partnerize 登录问题
    enabled: false,
    baseUrl: 'https://www.viagogo.com',
    param: 'affiliateId',
    extra: {},
  },

  /* ── Tours & Activities ───────────────────────────── */
  viator: {
    id: 'P00304149',   // ✅ 已激活
    enabled: true,
    baseUrl: 'https://www.viator.com/searchResults/all',
    param: 'pid',
    extra: { mcid: '42829' },
  },
};

/**
 * UTM parameters appended to every outbound link for your own analytics.
 * Set these once; they're appended automatically.
 */
export const UTM_DEFAULTS = {
  utm_source: 'matchtrip',
  utm_medium: 'affiliate',
  utm_campaign: '',
};
