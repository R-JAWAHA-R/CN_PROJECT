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

# Let's inspect TOC streams 30 to 38
for i in range(30, 38):
    try:
        decomp = zlib.decompress(streams[i])
        txt = extract_strings(decomp)
        print(f"\n--- TOC Stream {i} ---")
        print(txt)
    except Exception as e:
        pass

