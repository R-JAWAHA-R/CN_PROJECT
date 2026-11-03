import zlib
import re

with open('(McGraw-Hill Forouzan Networking) Behrouz A. Forouzan - Data Communications and Networking -McGraw-Hill Higher Education (2007)_compressed.pdf', 'rb') as f:
    data = f.read()

streams = re.findall(b'stream\r?\n(.*?)\r?\nendstream', data, re.DOTALL)

def extract_strings(b):
    parts = []
    for m in re.finditer(rb'\((.*?)\)\s*(?:Tj|\'|\")', b):
        parts.append(m.group(1).decode('latin1', errors='ignore'))
    for m in re.finditer(rb'\[(.*?)\]\s*TJ', b):
        inner = m.group(1)
        subparts = re.findall(rb'\((.*?)\)', inner)
        parts.append(''.join(sp.decode('latin1', errors='ignore') for sp in subparts))
    return ' '.join(parts)

all_text = []
for i, s in enumerate(streams):
    try:
        decomp = zlib.decompress(s)
        if b'BT' in decomp:
            txt = extract_strings(decomp)
            if 'CHAPTER' in txt.upper() or 'APPLICATION LAYER' in txt.upper() or 'SECURITY' in txt.upper():
                all_text.append((i, txt))
    except Exception:
        pass

print(f"Total matching streams: {len(all_text)}")
chapters = set()
for i, txt in all_text:
    matches = re.findall(r'CHAPTER\s+\d+[^.\n]{0,60}', txt, re.IGNORECASE)
    for m in matches:
        chapters.add(m.strip())

for c in sorted(list(chapters)):
    print(c)

