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

  /* ── Hotel provider selector ─────────────────────── */
  // 选择当前激活的酒店 affiliate provider。
  // 可选值: 'klook' | 'kkday' | 'booking'
  // - 'klook':  优先 Klook，若 promoId 未填则回退 KKday，再回退 fallback
  // - 'kkday':  优先 KKday，若 promoId 未填则回退 Klook，再回退 fallback
  // - 'booking': 走原 Booking.com Travelpayouts redirect（p=4114，需 Travelpayouts 后台权限）
  hotelProvider: 'klook',

  /* ── Hotel Booking (via Travelpayouts redirect) ───── */
  // ⏸️ 当前 Travelpayouts Booking.com program 无权限，tp.media/r 点击 Forbidden。
  // 保留配置以便权限恢复后只需把 hotelProvider 改回 'booking' 即可启用。
  booking: {
    id: '738032',      // ✅ Travelpayouts marker
    enabled: true,
    baseUrl: 'https://tp.media/r',
    param: 'marker',   // Travelpayouts uses ?marker=<your_id>
    extra: { p: '4114' }, // p=4114 = Booking.com program ID on Travelpayouts
    // Travelpayouts redirect mode: wraps a target booking.com URL into tp.media/r?...&u=<encoded>
    redirectMode: true,
    targetBaseUrl: 'https://www.booking.com/searchresults.html',
  },

  /* ── Klook (via Travelpayouts redirect) ───────────── */
  // Klook 在 Travelpayouts 的 program。复用同一 marker 738032。
  // promoId 留空时自动走 fallback（KKday 或 Google Hotels）。
  // 拿到 promoId 后填入即可启用，无需改代码。
  klook: {
    id: '738032',          // Travelpayouts marker (复用)
    enabled: true,
    promoId: '',           // ⏸️ 待填: Klook 在 Travelpayouts 的 program ID (p 参数)
    baseUrl: 'https://tp.media/r',
    param: 'marker',
    extra: {},             // p 在运行时从 promoId 注入
    redirectMode: true,
    targetBaseUrl: 'https://www.klook.com/search/',
    targetSearchParam: 'query',  // Klook 搜索 URL 的 query 参数名
  },

  /* ── KKday (via Travelpayouts redirect, fallback) ── */
  // Klook 不可用时的回退 provider。同样复用 marker 738032。
  kkday: {
    id: '738032',          // Travelpayouts marker (复用)
    enabled: true,
    promoId: '',           // ⏸️ 待填: KKday 在 Travelpayouts 的 program ID (p 参数)
    baseUrl: 'https://tp.media/r',
    param: 'marker',
    extra: {},
    redirectMode: true,
    targetBaseUrl: 'https://www.kkday.com/en/search/',
    targetSearchParam: 'keyword',  // KKday 搜索 URL 的 query 参数名
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
