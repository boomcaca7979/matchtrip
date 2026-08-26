import re, glob, os, html, json

t = lambda s: html.unescape(s or '')

allpages = sorted(glob.glob('dist/**/*.html', recursive=True))
exclude = {'f1', 'football', 'tennis', 'nba', '2026', '2027', '2028'}
rows = []
for p in allpages:
    h = open(p, encoding='utf-8', errors='ignore').read()
    title = t(re.search(r'<title>([^<]*)</title>', h).group(1))
    desc = t((re.search(r'<meta name="description" content="([^"]*)"', h) or [None, ''])[1])
    og_title = t((re.search(r'<meta property="og:title" content="([^"]*)"', h) or [None, ''])[1])
    og_desc = t((re.search(r'<meta property="og:description" content="([^"]*)"', h) or [None, ''])[1])
    og_img = (re.search(r'<meta property="og:image" content="([^"]*)"', h) or [None, ''])[1]
    canonical = (re.search(r'<link rel="canonical" href="([^"]*)"', h) or [None, ''])[1]
    # schema name/headline
    names = []
    for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', h, re.S):
        try:
            d = json.loads(m.group(1))
            for i in (d if isinstance(d, list) else [d]):
                for k in ('name', 'headline'):
                    if i.get(k): names.append(i[k])
        except Exception:
            pass
    body = re.sub(r'<script.*?</script>|<style.*?</style>', ' ', h, flags=re.S)
    body = re.sub(r'<[^>]+>', ' ', body)
    words = len(body.split())
    url = p[len('dist'):-10] or '/'
    rows.append(dict(url=url, title=title, desc=desc, og_title=og_title, og_desc=og_desc,
                     og_img=og_img, canon=canonical, names=names, words=words, path=p))

# CTR problems
print('=== title/desc length problems ===')
for r in rows:
    probs = []
    if len(r['title']) > 60 or len(r['title']) < 50: probs.append(f"title len {len(r['title'])}")
    if len(r['desc']) > 160 or len(r['desc']) < 140: probs.append(f"desc len {len(r['desc'])}")
    if probs: print(r['url'], '|', probs, '|', r['title'][:50])

print('\n=== OG mismatch ===')
for r in rows:
    probs = []
    if r['og_title'] and r['og_title'] != r['title']: probs.append('og:title != title')
    if r['og_desc'] and r['og_desc'] != r['desc']: probs.append('og:desc != desc')
    if not r['og_img']: probs.append('no og:image')
    if probs: print(r['url'], '|', probs)

print('\n=== og:image by layer ===')
for r in rows:
    if '/events/' in r['url'] or '/venues/' in r['url'] or '/cities/' in r['url'] or '/guides/' in r['url']:
        print(f"{r['url']:<45} {r['og_img'].replace('https://matchtrip-blue.vercel.app', '')}")

print('\n=== schema name vs title mismatch (event/venue/guide) ===')
for r in rows:
    for n in r['names']:
        if n and n != r['title'] and ('/events/' in r['url'] or '/venues/' in r['url'] or '/guides/' in r['url']):
            print(f"{r['url']:<40} schema='{n[:45]}' title='{r['title'][:45]}'")
            break

json.dump([{k: v for k, v in r.items() if k != 'path'} for r in rows], open('scripts/ctr_scan.json', 'w'))
print(f"\nscanned {len(rows)} pages")
