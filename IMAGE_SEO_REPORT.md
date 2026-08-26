# IMAGE_SEO_REPORT.md

Audit: 2026-08-26 · 扫描 dist 全部 75 页的 `<img>` 标签 + `public/images/` 全部文件

## 总览

- 图片文件：21（16 content jpg + 5 og png）
- `<img>` 标签：40（全站）
- **Missing alt：0 / 40**
- 未被引用的图片文件：0（21/21 均在页面中使用）
- 无占位图生成（遵循指令）

## 明细

### Venue 图片（6 张，规则：venue name + city ✅）

| filename | alt | usage |
|---|---|---|
| sofi-stadium.jpg | SoFi Stadium in Los Angeles — seating, transport and USA sports travel venue guide | /venues/sofi-stadium/ |
| las-vegas-strip-circuit.jpg | Las Vegas Strip Circuit in Las Vegas — seating, transport and USA... | /venues/las-vegas-strip-circuit/ |
| metropolitano.jpg | Riyadh Air Metropolitano in Madrid — seating, transport and Spain... | /venues/metropolitano/ |
| marina-bay-circuit.jpg | Marina Bay Street Circuit in Singapore — seating, transport and Singapore... | /venues/marina-bay-circuit/ |
| arthur-ashe-stadium.jpg | Arthur Ashe Stadium in New York — seating, transport and USA... | /venues/arthur-ashe-stadium/ |
| wembley.jpg | Wembley Stadium in London — seating, transport and UK... | /venues/wembley/ |

### City 图片（10 张，规则：city + sports travel intent ✅）

| filename | alt |
|---|---|
| las-vegas.jpg | Las Vegas sports travel guide — stadiums, events and where to stay in Las Vegas |
| los-angeles.jpg | Los Angeles sports travel guide — stadiums, events and where to stay... |
| singapore.jpg | Singapore sports travel guide — stadiums, events and where to stay... |
| new-york.jpg | New York sports travel guide — stadiums, events and where to stay... |
| madrid.jpg | Madrid sports travel guide — stadiums, events and where to stay... |
| london.jpg / paris.jpg / melbourne.jpg / budapest.jpg / monte-carlo.jpg | 同模板，含城市名 + sports travel 意图 |

### Event 图片（5 张 og 分类图，规则：event name + year + location ✅）

Event 页使用分类图（football/formula1/tennis/golf/default.png），每页 alt 唯一：

- football.png（3 页）: "Champions League Final 2027 Madrid Guide... tickets, hotels and Madrid trip planning" 等
- formula1.png（7 页）: "F1 Las Vegas Grand Prix 2026: Tickets, Hotels & Night Race... Las Vegas trip planning" 等
- tennis.png（5 页）: "US Open Tennis 2026: Tickets, NYC Hotels & Ashe Stadium Tips... New York trip" 等
- golf.png（4 页）: "Masters 2027 Augusta Guide: Practice Round Tickets & Hotels... Augusta trip planning" 等
- default.png（5 页）: "Super Bowl 2027 LA Travel Guide... Los Angeles trip planning" 等

**修复**：NBA Finals 页 alt 含 `null`（event.location.city 为空）→ 已改为 fallback 链 `city || location.label || 'host city'`。

## ImageObject Schema

- Venue 6/6：`url` + `contentUrl` + `caption`（含 venue name + city）+ name + license — 本次新增 `url` 字段
- City 10/10（有图城市）：同上完整字段 — 本次新增 `url` 字段
- Event 页：图片为分类 OG 图，Event schema 的 `image` 字段引用，不单独出 ImageObject（避免 24 个重复实体）

示例（venue）：

```json
{
  "@type": "ImageObject",
  "url": "https://matchtrip-blue.vercel.app/images/content/sofi-stadium.jpg",
  "contentUrl": "https://matchtrip-blue.vercel.app/images/content/sofi-stadium.jpg",
  "name": "SoFi Stadium travel guide image",
  "caption": "SoFi Stadium in Los Angeles — seating, transport and USA sports travel venue guide",
  "license": "https://matchtrip-blue.vercel.app/terms/"
}
```

## 记录（不生成占位）

- 7 个无内容图城市（augusta / indianapolis / limerick / louisville / miami / st-andrews / santa-clara）继续使用 og/default.png —— 无真实图片，不生成占位
- og 分类图为品牌视觉图，alt 已含具体赛事信息
