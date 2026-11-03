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

def search_text(term, max_matches=5):
    matches = []
    for i, s in enumerate(streams):
        try:
            decomp = zlib.decompress(s)
            if b'BT' in decomp:
                txt = extract_strings(decomp)
                if term.lower() in txt.lower():
                    matches.append((i, txt))
                    if len(matches) >= max_matches:
                        break
        except:
            pass
    return matches

print("=== SEARCH FOROUZAN TEXTBOOK ===")
terms = [
    "Domain Name System",
    "Recursive Resolution",
    "Iterative Resolution",
    "Electronic Mail Architecture",
    "Simple Mail Transfer Protocol",
    "Post Office Protocol",
    "World Wide Web",
    "Hypertext Transfer Protocol",
    "HTTP Transaction",
    "Proxy Server",
    "Substitution Cipher",
    "Transposition Cipher",
    "Caesar cipher",
    "RSA algorithm",
    "Packet-Filter Firewall",
    "Proxy Firewall"
]

for t in terms:
    res = search_text(t, 2)
    print(f"\n--- Term: '{t}' (Matches: {len(res)}) ---")
    for idx, txt in res:
        clean = ' '.join(txt.split())
        # find the term in text and show snippet
        pos = clean.lower().find(t.lower())
        start = max(0, pos - 100)
        end = min(len(clean), pos + 250)
        print(f"[{idx}]: ...{clean[start:end]}...")

