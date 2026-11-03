import re

with open("scratch/forouzan_ch23_transport.txt", "r", encoding="utf-8") as f:
    ch23 = f.read()

subsections = re.findall(r"\n([A-Z][A-Za-z\s\-]{3,35})\n(?=[A-Z0-9])", ch23)
print(f"Subsections in Ch 23: {len(subsections)}")
for s in subsections[:40]:
    if any(k in s.lower() for k in ["port", "socket", "service", "deliver", "connect", "buffer", "segment", "feature", "window", "timer", "handshake", "release", "state"]):
        print(" -", s.strip())

with open("scratch/forouzan_ch24_congestion.txt", "r", encoding="utf-8") as f:
    ch24 = f.read()

subsections24 = re.findall(r"\n([A-Z][A-Za-z\s\-]{3,35})\n(?=[A-Z0-9])", ch24)
print(f"\nSubsections in Ch 24: {len(subsections24)}")
for s in subsections24[:30]:
    if any(k in s.lower() for k in ["congest", "traffic", "open", "closed", "backpressure", "choke", "implicit", "explicit", "tcp", "slow", "avoidance"]):
        print(" -", s.strip())

