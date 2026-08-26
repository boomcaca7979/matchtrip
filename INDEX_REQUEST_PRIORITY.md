# INDEX_REQUEST_PRIORITY.md

Google Index 提交优先级排序 · 2026-08-26 · 共 74 URL

## Tier 1 — 核心商业页（10 URL，最优先提交）

| # | URL | Target keyword | Reason |
|---|---|---|---|
| 1 | /events/super-bowl-2027/ | super bowl 2027 tickets, super bowl travel package | 最高商业价值赛事，$3,000+ 客单价，完整 Article+Event schema |
| 2 | /events/champions-league-final-2027/ | champions league final 2027 tickets madrid | 欧洲最大单日赛事，2027 马德里，票务 ballot 长尾词丰富 |
| 3 | /events/f1-las-vegas-grand-prix-2026/ | f1 las vegas 2026 tickets, las vegas grand prix hotels | 高搜索量 + 高酒店佣金，Strip 住宿内容深 |
| 4 | /events/f1-singapore-grand-prix/ | singapore grand prix tickets, f1 singapore hotels | 亚洲唯一夜赛， Zone 票务结构独占内容 |
| 5 | /events/us-open-tennis/ | us open 2026 tickets, us open hotels flushing | 年度 Grand Slam，Arthur Ashe 场馆联动页 |
| 6 | /events/olympics-2028/ | la 2028 olympics tickets, olympics travel | 超长前置搜索周期，早索引早累积权威 |
| 7 | /events/masters-golf-2027/ | masters 2027 tickets, augusta hotels masters week | 练习轮彩票独占知识，Augusta 无酒店城市场景 |
| 8 | /events/ryder-cup-2027/ | ryder cup 2027 tickets ireland, adare manor hotels | 2027 爱尔兰，Limerick 城市联动 |
| 9 | /guides/ | sports travel guides | 全部 Guide 内容入口，hub-and-spoke 枢纽 |
| 10 | /editorial-policy/ | matchtrip editorial policy | E-E-A-T 信任锚点，支撑全站 YMYL-travel 评估 |

## Tier 2 — 支撑内容页（20 URL）

| URL | Target keyword | Reason |
|---|---|---|
| /events/world-cup-2026/ | world cup 2026 recap host cities | 已结束但搜索量大，next-edition 导流 |
| /events/wimbledon-2027/ | wimbledon 2027 ballot | ballot 独占流程内容 |
| /events/f1-monaco-grand-prix-2027/ | monaco gp 2027 tickets, nice hotels | Monte Carlo 城市联动 |
| /events/the-open-2027/ | the open 2027 st andrews tickets | St Andrews 高尔夫旅行 |
| /events/kentucky-derby-2027/ | kentucky derby 2027 tickets, churchill downs hotels | Louisville 联动 |
| /events/indy-500-2027/ | indy 500 2027 tickets, indianapolis hotels | IMS 独占票务结构 |
| /events/australian-open-2027/ | australian open 2027 tickets | Melbourne 联动 |
| /events/french-open-2027/ | french open 2027 tickets roland garros | Paris 联动 |
| /events/f1-miami-grand-prix-2027/ | f1 miami 2027 tickets | Miami 联动 |
| /events/f1-las-vegas-grand-prix-2027/ | f1 las vegas 2027 | Vegas 二年赛事 |
| /guides/best-sports-cities/ | best sports cities in the world | 高搜索量指南词 |
| /guides/sports-travel-budget/ | sports travel budget, super bowl trip cost | 商业意图预算词 |
| /guides/sports-travel-planning/ | sports travel planning | 规划指南词 |
| /cities/las-vegas/ | las vegas sports travel | 重点商业城市 |
| /cities/los-angeles/ | los angeles sports travel, la28 | 奥运主办城 |
| /cities/singapore/ | singapore sports travel, f1 singapore | 夜赛城市 |
| /cities/new-york/ | new york sports travel, us open | 赛事密度最高城市 |
| /cities/madrid/ | madrid sports travel, bernabeu | CL Final 2027 主办城 |
| /venues/sofi-stadium/ | sofi stadium seating, hotels near sofi | SB2027 + LA28 场馆 |
| /venues/wembley/ | wembley stadium guide, hotels near wembley | 全球认知度最高场馆 |

## Tier 3 — 其余（44 URL）

- 8 个 sports 分类页（/sports/football/ 等）
- 其余 4 venue 页（metropolitano / marina-bay-circuit / arthur-ashe / las-vegas-strip-circuit）
- 其余 11 city 页（london / paris / melbourne / budapest / monte-carlo / augusta / indianapolis / limerick / louisville / miami / st-andrews）
- 其余 7 ended event 页（super-bowl-2026 / wimbledon / nba-finals / masters-golf / f1-monaco-2026 / champions-league-final 等）
- hub 与辅助页（/events/、/events/football/、/events/f1/、/events/nba/、/events/tennis/、/events/2026/、/events/2027/、/events/2028/、/venues/、/about/、/contact/、/privacy/、/terms/、首页已在 T1-T2 覆盖）

## 提交策略

1. GSC sitemap：`sitemap-index.xml`（本次已含真实 lastmod，触发增量抓取）
2. URL Inspection 手动请求索引：按 T1 → T2 顺序，每日 ≤10 条
3. T3 依赖 sitemap 自然抓取，不手动提交
4. 已结束赛事页（0.4/monthly）不主动提交——保持归档信号
