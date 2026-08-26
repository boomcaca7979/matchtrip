# SITEMAP_AUTHORITY_REPORT.md

Audit: 2026-08-26 · `astro.config.mjs` + `scripts/gen-sitemap-lastmod.mjs` + `src/data/lastmod-map.json`

## 修复前问题

- 所有 URL 的 `<lastmod>` 均为构建时间 `new Date()`（禁止项：伪造新鲜度）
- Ended Event priority 0.5（规范要求 0.4）
- Event Hub（/events/、/events/football/ 等）落入默认 0.3
- changefreq 与 priority 不成体系

## 修复后结构（74 URL 全覆盖）

| 层级 | priority | changefreq | 数量 | lastmod 来源 |
|---|---|---|---|---|
| 首页 | 1.0 | weekly | 1 | index.astro + events.js git 时间 |
| Upcoming Event | **0.9** | weekly | 17 | events.js + [id].astro git 时间 |
| Event Hub（/events/、4 分类、3 年度页） | **0.8** | weekly | 8 | 各自 astro + events.js |
| Guide | **0.8** | weekly | 4 | 各 guide astro git 时间 |
| Venue | **0.7** | monthly | 7 | venues.js + [slug].astro |
| City | **0.7** | monthly | 17 | cities.js + events.js + [slug].astro |
| Sports 分类页 | 0.7 | weekly | 8 | [category].astro + events.js |
| About / Editorial Policy | 0.6 | monthly | 2 | 各自 astro git 时间 |
| **Ended Event** | **0.4** | monthly | 7 | events.js + [id].astro git 时间 |
| 隐私/条款 | 0.3 | yearly | 2 | 各自 astro git 时间 |

## lastmod 真实性（核心要求）

- **数据来源**：`git log -1 --format=%cI -- <file>`，按"产出该路由的源文件"取最新 commit
- 路由 → 源文件映射：`/events/{id}/` → events.js ∪ [id].astro；`/cities/{slug}/` → cities.js ∪ events.js ∪ [slug].astro；等等
- **验证结果**：74 URL 中 73 个有真实 git lastmod，**7 个不同日期值**（非统一当前时间）
- 无 git 记录的路由省略 `<lastmod>`（不伪造）；唯一例外 `/editorial-policy/` 为本次新建页，首次 commit 后即获得真实日期
- 再生成命令：`node scripts/gen-sitemap-lastmod.mjs`（内容更新后运行并提交）

## 规则验证（程序化检查）

```
PASS super-bowl-2027: 0.9/weekly      PASS wimbledon(ended): 0.4/monthly
PASS f1-singapore-grand-prix: 0.9/weekly  PASS world-cup-2026(ended): 0.4/monthly
PASS /events/ hub: 0.8               PASS /guides/ hub: 0.8
PASS venue (sofi-stadium): 0.7       PASS city (las-vegas): 0.7
```

示例条目：

```xml
<url>
  <loc>https://matchtrip-blue.vercel.app/events/super-bowl-2027/</loc>
  <lastmod>2026-08-26T07:48:47.000Z</lastmod>  <!-- 真实 git commit 时间 -->
  <changefreq>weekly</changefreq>
  <priority>0.9</priority>
</url>
```
