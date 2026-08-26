# GSC_SUBMISSION_LIST.md

Base: https://matchtrip-blue.vercel.app/ · 提交 sitemap: `sitemap-index.xml`

## 第一批（10 URL — 立即 URL Inspection 请求索引）

1. https://matchtrip-blue.vercel.app/
2. https://matchtrip-blue.vercel.app/events/super-bowl-2027/
3. https://matchtrip-blue.vercel.app/events/champions-league-final-2027/
4. https://matchtrip-blue.vercel.app/events/f1-las-vegas-grand-prix-2026/
5. https://matchtrip-blue.vercel.app/events/us-open-tennis/
6. https://matchtrip-blue.vercel.app/events/f1-singapore-grand-prix/
7. https://matchtrip-blue.vercel.app/guides/
8. https://matchtrip-blue.vercel.app/guides/sports-travel-planning/
9. https://matchtrip-blue.vercel.app/guides/best-sports-cities/
10. https://matchtrip-blue.vercel.app/guides/sports-travel-budget/

## 第二批（20 URL — 第一批被索引后）

Events (10): olympics-2028, wimbledon-2027, masters-golf-2027, ryder-cup-2027,
the-open-2027, f1-monaco-grand-prix-2027, kentucky-derby-2027, australian-open-2027,
french-open-2027, f1-miami-grand-prix-2027

Venues (6): sofi-stadium, las-vegas-strip-circuit, metropolitano,
marina-bay-circuit, arthur-ashe-stadium, wembley

Cities (4): las-vegas, london, new-york, madrid

## 第三批（其余全部 — sitemap 自然抓取）

- 剩余城市页 13 个、events 分类页 7 个、sports 页 8 个
- ended 赛事页 7 个（priority 0.5，靠 Next Event 生命周期链）
- about / privacy / terms / contact / 404 不需要主动提交

## 操作步骤

1. GSC → Sitemaps → 提交 `sitemap-index.xml`（现含 lastmod/priority/changefreq）
2. URL Inspection → 逐个粘贴第一批 10 URL → Request Indexing
3. 每日抽查 Coverage 报告，观察 "Discovered - not indexed" 比例
4. US Open 开赛（8/31）后检查 /events/us-open-tennis/ 展示量变化
