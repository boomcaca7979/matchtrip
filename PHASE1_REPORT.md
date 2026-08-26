# PHASE 1 — SEO 现状扫描报告

日期: 2026-08-26 · 基于 dist/（commit 86438f6 build 产物）

## 1. Sitemap

- **73 URL**，本地文件零缺失
- **lastmod: 0 个**（`<lastmod>` 标签缺失）→ Phase 8 修复
- priority/changeFrequency: 待查（Astro sitemap 默认不输出，需 serialization 配置）

## 2. robots.txt（线上实测）

```
User-agent: *
Allow: /
Sitemap: https://matchtrip-blue.vercel.app/sitemap-index.xml
```

通配 allow：Googlebot / Bingbot / GPTBot 全部允许。**无误屏蔽**（/events/ /venues/ /cities/ /guides/ 全放行）。

## 3. Canonical

- 73/73 页面 canonical = `https://matchtrip-blue.vercel.app/...`（0 缺失）
- ⚠️ 与最终目标 `www.matchtrip.com` 不一致——**仅记录，不修改**（域名未绑定，Phase 5 指令）

## 4. Schema 抽检（23 页）

| 层 | 抽检 | JSON 有效性 | 重复 | 类型 |
|---|---|---|---|---|
| Event | 10 | ✅ 0 invalid | ✅ 0 dup | Event+FAQPage+Article+Breadcrumb+WebSite |
| City | 5 | ✅ | ✅ | City+CollectionPage+Breadcrumb+WebSite |
| Venue | 5 | ✅ | ✅ | Place+FAQPage+Breadcrumb+WebSite |
| Guide | 3 | ✅ | ✅ | Article+Breadcrumb+WebSite |

23/23 无 invalid JSON、无重复 schema。

## 待修复（本阶段内）

1. sitemap 无 lastmod/priority → Phase 8 配置
2. canonical 域名 → 记录，等域名绑定后一行切换
3. title/description 模板化 → Phase 2 重写 TOP 30
