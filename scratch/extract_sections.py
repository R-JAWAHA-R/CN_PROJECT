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

target_chapters = ['25', '26', '27', '30', '31', '32']
chapter_text = {c: [] for c in target_chapters}

for i, s in enumerate(streams):
    try:
        decomp = zlib.decompress(s)
        if b'BT' in decomp:
            txt = extract_strings(decomp)
            for c in target_chapters:
                if f'CHAPTER {c}' in txt.upper() or f'CHAPTER {c} ' in txt.upper() or f'25.' in txt or f'26.' in txt or f'27.' in txt or f'30.' in txt or f'31.' in txt or f'32.' in txt:
                    # check if this page belongs to chapter c
                    if f'CHAPTER {c}' in txt.upper() or f'CHAPTER  {c}' in txt.upper() or f'Chapter {c}' in txt:
                        chapter_text[c].append((i, txt))
    except Exception:
        pass

for c in target_chapters:
    print(f"\n================ CHAPTER {c} ({len(chapter_text[c])} streams) ================")
    for idx, txt in chapter_text[c][:8]:
        # print first 200 chars
        clean = ' '.join(txt.split())
        print(f"[{idx}]: {clean[:160]}...")

