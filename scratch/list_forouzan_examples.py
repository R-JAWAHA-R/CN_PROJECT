import re

with open("scratch/forouzan_ch23_transport.txt", "r", encoding="utf-8") as f:
    ch23 = f.read()

examples = re.findall(r"(Example\s+23\.\d+[\s\S]*?(?=(Example\s+23\.\d+|Figure\s+23\.\d+|\n[A-Z]{4,}|\Z)))", ch23)
print(f"Examples in Ch 23: {len(examples)}")
for ex, _ in examples[:15]:
    lines = [l.strip() for l in ex.split("\n") if l.strip()]
    header = lines[0] if lines else ""
    body = " ".join(lines[1:3]) if len(lines) > 1 else ""
    print(f"• {header}: {body[:120]}...")

figures = re.findall(r"(Figure\s+23\.\d+[\s\S]*?\n)", ch23)
print(f"\nFigures in Ch 23: {len(figures)}")
for fig in figures[:15]:
    print(" ", fig.strip().replace("\n", " "))

