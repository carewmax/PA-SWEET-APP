"""Rebuild dist/pa-sweet.html: one self-contained file with CSS, JS and images inlined.
Usage: python3 build.py
"""
import base64, mimetypes, re, pathlib
root = pathlib.Path(__file__).parent
html = (root / 'index.html').read_text()
css = (root / 'styles.css').read_text()
js = (root / 'app.js').read_text()

def datauri(path):
    mime = mimetypes.guess_type(path)[0] or 'application/octet-stream'
    return f"data:{mime};base64," + base64.b64encode((root / path).read_bytes()).decode()

js = re.sub(r"'(assets/[a-z0-9\-]+\.(?:png|jpg))'", lambda m: "'" + datauri(m.group(1)) + "'", js)
html = html.replace('<link rel="icon" href="assets/logo.png">', '<link rel="icon" href="' + datauri('assets/logo.png') + '">')
html = html.replace('<link rel="stylesheet" href="styles.css">', '<style>\n' + css + '\n</style>')
html = html.replace('<script src="app.js"></script>', '<script>\n' + js + '\n</script>')
(root / 'dist').mkdir(exist_ok=True)
(root / 'dist' / 'pa-sweet.html').write_text(html)
print('Built dist/pa-sweet.html')
