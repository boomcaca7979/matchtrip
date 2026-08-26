# INDEX_PRIORITY.md — Google Index Strategy

Base: https://matchtrip-blue.vercel.app/ · 2026-08-26

## Tier 1 — 商业最高（10 URLs，首批请求索引）

| URL | Reason | Target Keyword | Expected Intent |
|---|---|---|---|
| /events/super-bowl-2027/ | 最高商业价值+<6个月窗口 | super bowl 2027 tickets | Transactional |
| /events/champions-league-final-2027/ | 欧洲最高需求决赛 | champions league final 2027 tickets | Transactional |
| /events/f1-las-vegas-grand-prix-2026/ | 3个月内开赛 | f1 las vegas 2026 tickets | Transactional |
| /events/us-open-tennis/ | 6天后开赛 | us open 2026 tickets | Transactional |
| /events/f1-singapore-grand-prix/ | 7周后开赛 | singapore grand prix 2026 tickets | Transactional |
| /guides/ | 内容枢纽3861词 | sports travel guides | Commercial |
| /guides/sports-travel-planning/ | 头部规划词 | sports travel planning | Informational→Commercial |
| /guides/best-sports-cities/ | 城市比较词 | best sports cities | Commercial |
| /guides/sports-travel-budget/ | 预算词 | sports travel cost | Commercial |
| /events/2027/ | 年度索引枢纽 | sports events 2027 | Commercial |

## Tier 2 — 内容中心（15 URLs，第二批）

| URL | Reason | Target Keyword | Intent |
|---|---|---|---|
| /events/olympics-2028/ | 长线高价值 | olympics 2028 tickets | Commercial |
| /events/wimbledon-2027/ | 大满贯+ballot季 | wimbledon 2027 tickets | Transactional |
| /events/masters-golf-2027/ | 练习轮彩票现开放 | masters 2027 tickets | Transactional |
| /events/ryder-cup-2027/ | 票售罄→hospitality需求 | ryder cup 2027 tickets | Transactional |
| /events/the-open-2027/ | St Andrews话题度 | the open 2027 st andrews | Transactional |
| /events/f1-monaco-grand-prix-2027/ | F1皇冠赛事 | monaco grand prix 2027 tickets | Transactional |
| /events/kentucky-derby-2027/ | 常青美国市场 | kentucky derby 2027 tickets | Transactional |
| /venues/sofi-stadium/ | SB主场馆+低竞争 | sofi stadium guide | Informational |
| /venues/las-vegas-strip-circuit/ | F1夜赛场馆 | las vegas strip circuit guide | Informational |
| /venues/metropolitano/ | CL决赛场馆 | metropolitano stadium guide | Informational |
| /venues/marina-bay-circuit/ | 新加坡夜赛 | marina bay circuit guide | Informational |
| /venues/arthur-ashe-stadium/ | US Open场馆 | arthur ashe stadium guide | Informational |
| /venues/wembley/ | 高搜索量球场 | wembley stadium guide | Informational |
| /cities/las-vegas/ | F1+SB双赛城市 | las vegas sports trip | Commercial |
| /cities/london/ | 体育旅行头部城市 | london sports trip | Commercial |

## Tier 3 — 长期（其余 48 URLs）

- 剩余 10 个 upcoming 事件页（澳网/法网/Miami F1/Indy 500/2027 Vegas F1 等）→ 随 sitemap 自然抓取
- 11 个城市页 → Tier 2 验证内链结构后批量请求
- 7 个 ended 事件页 → sitemap priority 0.5，依赖生命周期内链（Next Event 卡）传权重
- sports/events 分类页、about、privacy、terms → 自然抓取即可
