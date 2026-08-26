# OG_AUDIT_REPORT.md

Audit: 2026-08-26 · 全站 74 页 og:title / og:description / og:image 检查

## 一致性（全站 ✅）

- og:title = `<title>`：**0 mismatch**（73 内容页 + 404）
- og:description = meta description：**0 mismatch**
- canonical：73/73 存在且统一

## og:image 修复前后

| 层 | Before | After |
|---|---|---|
| Venue 6 页 | ❌ 全部 default.png | ✅ **6/6 用场馆内容图**（/images/content/{slug}.jpg） |
| City 17 页 | ❌ 全部 default.png | ✅ **10/10 有图城市用城市图**；7 城无图（augusta/indianapolis/limerick/louisville/miami/st-andrews/santa-clara）保持 default.png（不生成占位图，遵循指令） |
| Event 24 页 | 分类图（football/formula1/tennis/golf） | 保持分类图 ✅（无每赛事专属图，分类图即赛事图） |
| Guide 页 | default.png | 保持 default.png（通用规划内容，无专属图） |

## 机制

Layout.astro 新增 `image` prop：venue/city 模板传入 `/images/content/{slug}.jpg`，覆盖默认分类图；og:image 与 twitter:image 同步生效。

## 未生成占位图（遵循指令）

7 个无内容图城市 + guides + 3 个 OG 分类图不足的页面保持现有分类/default 图——图片不存在的一律记录不补占位。
