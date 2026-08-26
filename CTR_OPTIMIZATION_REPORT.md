# CTR_OPTIMIZATION_REPORT.md

Audit: 2026-08-26 · Script: `scripts/ctr_audit.py` · 73 pages scanned · final full-build verification

## Tier 1 — 商业搜索页面（全部达标 ✅）

| Page | Title (before → after) | Desc | CTR Problem Fixed |
|---|---|---|---|
| 8 重点 Event | ✅ 已在 Phase 5 重写（50-60ch，年份+地点+意图） | 148-160ch | 完成 |
| super-bowl-2027 | "Super Bowl 2027 LA Travel Guide: Tickets, Hotels & SoFi Tips" | 158 | — |
| 6 Venue | ✅ 已在 Phase 5 重写 | 145-158 | — |
| 4 Guide 页 | title/desc 已含 tickets/hotels/budget 意图 | 148-158 | guides hub title 32→53ch |
| 17 City | ❌→✅ 全部重写 | ❌→✅ | 17 城模板化 title（37-44ch）+ 泛化 desc（89-96ch）→ 差异化 50-60/140-160 |

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

- 8 个 sports 页：新增差异化 seoTitle（50-60ch，含真实赛事+Tickets/Hotels）+ metaDescription（130-160ch）
  - 如 Motorsport 46ch 模板 → "Motorsport Travel Guide: F1 & Indy 500 Tickets, Hotels"（54ch）
- events/tennis、events/f1、venues hub、guides/best-sports-cities：去掉 "\| MatchTrip" 后缀，改意图标题
- events/2026/2027/2028 年度页：新 YEAR_META（title 含 World Cup/Super Bowl/CL Final/Olympics，desc 141-158ch）
- events/nba desc 121→148；events/tennis desc 125→158；venues hub desc 134→150

## Tier 3 — 辅助页面（保持）

about/contact/privacy/terms/404/首页 — 品牌页短 title/desc 合理，不做关键词堆砌。

## 最终状态（dist 全量 73 页程序化验证）

- **Title >60ch: 0 页**
- **Desc >160ch: 0 页**（Tier 3 品牌页 intentionally <140）
- **"\| MatchTrip" 模板 title: 0 页**
- **og:title/og:description 与 title/description：0 mismatch**
- **Schema name/headline 与 title：0 mismatch**（修复 50 处：17 City CollectionPage、24 Event Article headline、6 events hub CollectionPage、3 guides）
- **canonical: 73/73 存在**
- Build: 74 pages, 0 error, 0 warning
- Phase 6 抽检（10 Event + 5 Venue + 5 Guide）：20/20 PASS
