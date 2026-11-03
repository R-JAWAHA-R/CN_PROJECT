with open("scratch/forouzan_ch23_transport.txt", "r", encoding="utf-8") as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r"socket", text, re.IGNORECASE)]
print(f"Found {len(matches)} occurrences of 'socket' in Chapter 23.")
for m in matches[:5]:
    snippet = text[max(0, m-100):min(len(text), m+200)].replace("\n", " ")
    print(f"- {snippet}\n")

