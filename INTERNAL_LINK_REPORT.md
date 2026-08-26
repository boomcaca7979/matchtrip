# INTERNAL_LINK_REPORT.md

Audit: 2026-08-26 · 扫描 dist 全部 75 页 HTML 的 `<a href>`（排除外链/mailto/锚点）

## 1. 404 Links

**0 / 全站 3,000+ 内链**。所有内部 href 均指向已构建页面。

## 2. 孤立页面（入链 < 3）

| 页面 | 入链数 | 状态 |
|---|---|---|
| /404 | 0 | 错误页，无索引需求，正常 |
| /contact/ | 2 | Navbar + About 链入，正常（辅助页） |
| /events/2028/ | 2 | 仅 Olympics-2028 事件页 + 年度导航链入 |
| /cities/indianapolis/ | 2 | Indy 500 事件页 + motorsport 分类页 |
| /cities/limerick/ | 2 | Ryder Cup 事件页 + golf 分类页 |
| /cities/miami/ | 2 | F1 Miami 事件页 + motorsport 分类页 |
| /cities/st-andrews/ | 2 | The Open 事件页 + golf 分类页 |

4 个低入链城市页均为"单赛事城市"——入链全部来自语义相关的父页面（该城市举办的赛事 + 该运动分类页），符合主题聚类结构，非死链孤岛。可后续在 best-sports-cities 等指南中自然提及提升入链。

## 3. 商业锚文本比例

### 修复前

- **75 处泛化锚文本**：Footer 的 "Learn more" → /privacy/（每页 1 处 × 75 页）
- Learn more / Click here / Read more / here / details 等均扫描

### 修复后

**泛化锚文本：0 处**

- Footer "Learn more" → **"Read our affiliate & privacy disclosure"**（描述性、含语义关键词）
- 全站锚文本抽样（语义锚占比高）：
  - "Find Hotels in Los Angeles" / "Explore Singapore Experiences"（CTA + 目的地语义）
  - "View Previous Edition" / "Plan Your Next Trip"（上下文语义）
  - 事件卡片链向赛事页用完整赛事名（含年份+城市）

### 语义锚文本示例（符合规范方向）

- /events/super-bowl-2027/ 出链："SoFi Stadium"（→ venue）、"Los Angeles"（→ city）、"View Previous Edition"（→ super-bowl-2026）
- /venues/sofi-stadium/ 出链："Super Bowl 2027" / "LA 2028 Olympics"（→ events）
- 事件卡 → 赛事页锚 = "Super Bowl 2027 LA Travel Guide..."（完整标题锚）

## 4. 入链分布（Top）

| 页面 | 入链数 |
|---|---|
| /about/ | 305 |
| /events/ | 274 |
| / | 159 |
| /privacy/ | 150 |
| /guides/ | 115 |
| /editorial-policy/ | 76（本次新增，全站 Footer 链入） |
| /terms/ | 75 |
| /guides/sports-travel-planning/ | 56 |
| /guides/sports-travel-budget/ | 56 |
| /venues/ | 51 |

Event ↔ Venue ↔ City ↔ Guide 主题集群互链结构完整（事件页链向其场馆、城市、相关赛事；venue/city 页反向链回事件）。
