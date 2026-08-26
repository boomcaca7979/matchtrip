# CTR_OPTIMIZATION_REPORT.md

Audit: 2026-08-26 · Script: `scripts/ctr_audit.py` · 73 pages scanned

## Tier 1 — 商业搜索页面（全部达标 ✅）

| Page | Title (before → after) | Desc | CTR Problem Fixed |
|---|---|---|---|
| 8 重点 Event | ✅ 已在 Phase 5 重写（50-60ch，年份+地点+意图） | 148-160ch | 完成 |
| super-bowl-2027 | "Super Bowl 2027 LA Travel Guide: Tickets, Hotels & SoFi Tips" | 158 | — |
| 6 Venue | ✅ 已在 Phase 5 重写 | 145-158 | — |
| 4 Guide 页 | title/desc 已含 tickets/hotels/budget 意图 | 139-160 | guides hub title 32→55ch（本次修复） |
| 17 City | ❌→✅ 本次全部重写 | ❌→✅ | **17 城模板化 title（37-44ch）+ 泛化 desc（89-96ch）→ 差异化 50-60/140-160** |

### 城市 title 前后对比（重点 6 城）

| City | Before | After |
|---|---|---|
| las-vegas | Las Vegas Sports Travel Guide \| MatchTrip | Las Vegas Sports Travel Guide: F1, Hotels & Nightlife |
| los-angeles | Los Angeles Sports Travel Guide \| MatchTrip | Los Angeles Sports Travel Guide: LA28 & SoFi Stadium |
| singapore | Singapore Sports Travel Guide \| MatchTrip | Singapore Sports Travel Guide: F1 Night Race & Marina Bay |
| new-york | New York Sports Travel Guide \| MatchTrip | New York Sports Travel Guide: US Open, MSG & Hotels |
| madrid | Madrid Sports Travel Guide \| MatchTrip | Madrid Sports Travel Guide: Football, CL Final & Tapas |
| augusta | Augusta Sports Travel Guide \| MatchTrip | Augusta Masters Travel Guide: Tickets, Hotels & Golf Week |

其余 11 城（london/paris/melbourne/budapest/monte-carlo/indianapolis/louisville/miami/limerick/st-andrews/santa-clara）同样差异化，全部含真实赛事/地标。

## Tier 2 — 内容入口页面（本次修复 ✅）

- 8 个 sports 页：新增 metaDescription（130-160ch，含赛事/酒店/票务意图）
- events/nba desc 121→148；events/tennis desc 125→158
- events/2026/2027 desc 190/192→145/139（去泛化句）
- venues hub desc 134→150（含真实场馆名）

## Tier 3 — 辅助页面（保持）

about/contact/privacy/terms/404/首页 — 品牌页短 title 合理，不做关键词堆砌。

## 最终状态

- **Title >60ch: 0 页**（全站 74 页）
- **Desc >160ch: 0 页**
- og:title/og:description 与 title/description **全站同步**（0 mismatch）
- Schema name/headline 与 title **一致**（Event/Article 均验证）
