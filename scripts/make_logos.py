# Usage: python3 scripts/make_logos.py public/assets/images/logo.svg public/media-kit/logos
"""Generate Data Vallis logo variations from the master SVG."""
import re, sys, os

src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
svg = open(src).read()

elements = {}
for m in re.finditer(r'<path id="([^"]+)"[^>]*?/>', svg):
    elements[m.group(1)] = m.group(0)
rect = re.search(r'<path id="Rectangle_1"[^>]*?/>', svg).group(0)
elements['Rectangle_1'] = rect

def ids(a, b): return [f'Path_{i}' for i in range(a, b + 1)]
ICON = ids(16, 29) + ['Rectangle_1']
WORD = ids(1, 10)
TAG = ids(11, 15)

# measured bounding boxes (master units)
ICON_BOX = (0, 0, 79.44, 55.88)
WORD_BOX = (99.87, 0.2, 243, 41.27)
TAG_BOX = (99.87, 49.45, 243, 55.88)
X = 12.13  # clear-space unit = one square of the icon

def paint(el, mode):
    if mode == 'color':
        return el
    color = '#ffffff' if mode == 'white' else '#000000'
    return re.sub(r'fill="#[0-9a-fA-F]{3,6}"', f'fill="{color}"', el)

def group(names, mode, dx=0, dy=0):
    body = '\n    '.join(paint(elements[n], mode) for n in names)
    return f'  <g transform="translate({dx:.2f} {dy:.2f})">\n    {body}\n  </g>'

def doc(w, h, content, plate=False, title='Data Vallis'):
    pad = X if plate else 0
    W, H = w + 2 * pad, h + 2 * pad
    bg = f'  <rect width="{W:.2f}" height="{H:.2f}" fill="#000000"/>\n' if plate else ''
    inner = f'<g transform="translate({pad:.2f} {pad:.2f})">\n{content}\n</g>' if plate else content
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W:.2f}" height="{H:.2f}" '
            f'viewBox="0 0 {W:.2f} {H:.2f}" role="img" aria-label="{title}">\n'
            f'  <title>{title}</title>\n{bg}{inner}\n</svg>\n')

def horizontal(mode, tagline=True, plate=False):
    h = 55.88 if tagline else 41.27
    parts = [group(ICON, mode) if tagline else group(ICON, mode, 0, (41.27 - 55.88) / 2 if False else 0)]
    if not tagline:
        # scale icon to the wordmark height so the lockup stays balanced
        s = 41.27 / 55.88
        parts = [f'  <g transform="scale({s:.4f})">\n{group(ICON, mode)}\n  </g>']
        word_dx = 79.44 * s + 20.43 * s - 99.87
        parts.append(group(WORD, mode, word_dx, -0.2))
        w = 79.44 * s + 20.43 * s + (243 - 99.87)
        return doc(w, 41.07, '\n'.join(parts), plate)
    parts.append(group(WORD + TAG, mode))
    return doc(243, h, '\n'.join(parts), plate)

def stacked(mode, plate=False):
    word_w = 243 - 99.87
    gap = X
    w = word_w
    icon_dx = (w - 79.44) / 2
    parts = [group(ICON, mode, icon_dx, 0),
             group(WORD + TAG, mode, -99.87, 55.88 + gap - 0.2)]
    h = 55.88 + gap + (55.88 - 0.2)
    return doc(w, h, '\n'.join(parts), plate)

def icon(mode, plate=False):
    return doc(79.44, 55.88, group(ICON, mode), plate, 'Data Vallis icon')

def app_icon():
    # square app / social avatar: icon centered on black, rounded corners
    size = 512
    s = (size * 0.62) / 79.44
    dx = (size - 79.44 * s) / 2
    dy = (size - 55.88 * s) / 2
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{size}" height="{size}" viewBox="0 0 {size} {size}" '
            f'role="img" aria-label="Data Vallis app icon">\n  <title>Data Vallis app icon</title>\n'
            f'  <rect width="{size}" height="{size}" rx="96" fill="#000000"/>\n'
            f'  <g transform="translate({dx:.2f} {dy:.2f}) scale({s:.4f})">\n{group(ICON, "color")}\n  </g>\n</svg>\n')

files = {}
for mode in ('color', 'white', 'black'):
    files[f'datavallis-logo-{mode}.svg'] = horizontal(mode)
    files[f'datavallis-logo-no-tagline-{mode}.svg'] = horizontal(mode, tagline=False)
    files[f'datavallis-logo-stacked-{mode}.svg'] = stacked(mode)
    files[f'datavallis-icon-{mode}.svg'] = icon(mode)
files['datavallis-logo-color-on-black.svg'] = horizontal('color', plate=True)
files['datavallis-logo-stacked-color-on-black.svg'] = stacked('color', plate=True)
files['datavallis-icon-color-on-black.svg'] = icon('color', plate=True)
files['datavallis-app-icon.svg'] = app_icon()

for name, content in files.items():
    open(os.path.join(out, name), 'w').write(content)
print(len(files), 'files')
