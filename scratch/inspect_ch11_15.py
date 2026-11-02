import re

def search_sections(filename, patterns):
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read()
    print(f"=== {filename} ===")
    for pat in patterns:
        matches = [m.start() for m in re.finditer(re.escape(pat), text, re.IGNORECASE)]
        print(f"Pattern '{pat}': {len(matches)} occurrences")
        for m in matches[:2]:
            snippet = text[max(0, m - 100):min(len(text), m + 350)]
            print(f"--- Snippet for '{pat}' ---:\n{snippet.strip()}\n")

search_sections("scratch/forouzan_ch11_protocols.txt", [
    "Simplest Protocol",
    "Stop-and-Wait",
    "Stop-and-Wait ARQ",
    "Sliding Window",
    "Piggybacking"
])

search_sections("scratch/forouzan_ch15_bridges.txt", [
    "Bridge",
    "Filtering",
    "Transparent Bridge",
    "Learning",
    "Spanning Tree",
    "Collision Domain"
])

