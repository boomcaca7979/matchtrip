import re, glob, os, json

allhtml = glob.glob('dist/**/*.html', recursive=True)
pages = set(u[len('dist'):-10].rstrip('/') for u in allhtml) | {''}

def linkset(p):
    h = open(p, encoding='utf-8', errors='ignore').read()
    return set(re.findall(r'href="(/(?:events|cities|venues|guides|sports)/[^"]*)"', h))

exclude = {'f1','football','tennis','nba','2026','2027','2028'}
ev_pages = [p for p in glob.glob('dist/events/*/index.html') if os.path.basename(os.path.dirname(p)) not in exclude]

# rules: Event needs 1 venue + 2 city + 2 guides; Venue 3 events 1 city 2 guides; City 3 events 2 venues 2 guides
report = {'event': [], 'city': [], 'venue': []}

for p in ev_pages:
    ls = linkset(p)
    n_venue = len([l for l in ls if l.startswith('/venues/')])
    n_city = len([l for l in ls if l.startswith('/cities/')])
    n_guide = len([l for l in ls if l.startswith('/guides/')])
    ok = n_venue >= 1 and n_city >= 2 and n_guide >= 2
    report['event'].append((os.path.relpath(p, 'dist'), n_venue, n_city, n_guide, ok))

for p in glob.glob('dist/venues/*/index.html'):
    ls = linkset(p)
    n_ev = len([l for l in ls if l.startswith('/events/')])
    n_city = len([l for l in ls if l.startswith('/cities/')])
    n_guide = len([l for l in ls if l.startswith('/guides/')])
    report['venue'].append((os.path.relpath(p, 'dist'), n_ev, n_city, n_guide, n_ev >= 3 and n_city >= 1 and n_guide >= 2))

for p in glob.glob('dist/cities/*/index.html'):
    ls = linkset(p)
    n_ev = len([l for l in ls if l.startswith('/events/')])
    n_venue = len([l for l in ls if l.startswith('/venues/')])
    n_guide = len([l for l in ls if l.startswith('/guides/')])
    report['city'].append((os.path.relpath(p, 'dist'), n_ev, n_venue, n_guide, n_ev >= 3 and n_venue >= 2 and n_guide >= 2))

for k in report:
    bad = [r for r in report[k] if not r[4]]
    print(f'{k}: {len(report[k])} pages, {len(bad)} below target')
    for r in bad[:10]:
        print(f'  {r[0]}: events={r[1] if k != "event" else "-"} venues={r[2] if k != "venue" else "-"} cities={r[1] if k == "venue" else r[2] if k != "city" else "-"} guides={r[3] if k != "city" else "-"}')

# broken links
bad_links = {}
for f in allhtml:
    h = open(f, encoding='utf-8', errors='ignore').read()
    for href in set(re.findall(r'href="(/[^"#]*?)(?:/?)["#]', h)):
        if href and href.rstrip('/') not in pages and not os.path.exists('dist' + href):
            bad_links.setdefault(href, []).append(f)
print('broken links:', len(bad_links), list(bad_links)[:5])
