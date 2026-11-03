with open("scratch/forouzan_ch23_transport.txt", "r", encoding="utf-8") as f:
    ch23 = f.read()

import re
print("=== Chapter 23 Headings ===")
for line in ch23.split("\n"):
    if re.match(r"^\s*23\.\d+", line) or re.match(r"^[A-Z\s]{4,}$", line.strip()) and len(line.strip()) < 40:
        if any(w in line.lower() for w in ["process", "udp", "tcp", "port", "socket", "segment", "connection", "window", "timer", "flow", "error"]):
            print(line.strip())

with open("scratch/forouzan_ch24_congestion.txt", "r", encoding="utf-8") as f:
    ch24 = f.read()

print("\n=== Chapter 24 Headings ===")
for line in ch24.split("\n"):
    if re.match(r"^\s*24\.\d+", line) or re.match(r"^[A-Z\s]{4,}$", line.strip()) and len(line.strip()) < 40:
        if any(w in line.lower() for w in ["congestion", "traffic", "open", "closed", "backpressure", "choke", "tcp", "avoidance", "slow"]):
            print(line.strip())

