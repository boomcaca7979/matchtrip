import re, glob, json, random, os

def schemas(p):
    h = open(p, encoding='utf-8', errors='ignore').read()
    lds = re.findall(r'<script type="application/ld\+json">(.*?)</script>', h, re.S)
    out = []
    for s in lds:
        try:
            d = json.loads(s)
            items = d if isinstance(d, list) else [d]
            for i in items:
                out.append(i.get('@type'))
        except Exception:
            out.append('INVALID')
    return out, len(lds)

random.seed(42)
evs = sorted(glob.glob('dist/events/*/index.html'))
exclude = {'f1', 'football', 'tennis', 'nba', '2026', '2027', '2028'}
ev_pages = [p for p in evs if os.path.basename(os.path.dirname(p)) not in exclude]
cis = sorted(glob.glob('dist/cities/*/index.html'))
ves = sorted(glob.glob('dist/venues/*/index.html'))
gus = sorted(glob.glob('dist/guides/*/index.html'))

for label, pool, n in [('Event', ev_pages, 10), ('City', cis, 5), ('Venue', ves, 5), ('Guide', gus, 3)]:
    print(f'--- {label} ---')
    for p in random.sample(pool, min(n, len(pool))):
        ts, c = schemas(p)
        rel = os.path.relpath(p, 'dist')
        dup = 'YES' if len(ts) != len(set(map(str, ts))) else 'no'
        inv = 'YES' if 'INVALID' in ts else 'no'
        print(f'{rel}: blocks={c} types={sorted(set(x for x in ts if x))} dup={dup} invalid={inv}')

# canonical scan
print('--- canonical ---')
allhtml = glob.glob('dist/**/*.html', recursive=True)
bad = [f for f in allhtml if 'matchtrip-blue.vercel.app' not in open(f, encoding='utf-8', errors='ignore').read()]
print('pages missing vercel canonical:', len(bad))

# HTTP status of sitemap urls
print('--- sitemap ---')
urls = re.findall(r'<loc>([^<]+)</loc>', open('dist/sitemap-0.xml').read())
missing = [u for u in urls if not os.path.exists('dist' + u.replace('https://matchtrip-blue.vercel.app', '') + 'index.html')]
print(len(urls), 'urls, missing local:', missing[:5] if missing else 'NONE')
print('lastmod tags:', open('dist/sitemap-0.xml').read().count('<lastmod>'))
