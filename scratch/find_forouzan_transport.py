import pypdf

pdf_path = "(McGraw-Hill Forouzan Networking) Behrouz A. Forouzan - Data Communications and Networking -McGraw-Hill Higher Education (2007)_compressed.pdf"
reader = pypdf.PdfReader(pdf_path)
print("Total pages in textbook:", len(reader.pages))

# Search for chapters in TOC or text
toc_pages = []
for i in range(5, 30):
    t = reader.pages[i].extract_text() or ""
    if "CHAPTER" in t or "Contents" in t or "Transport" in t:
        toc_pages.append((i, t))

print(f"Found {len(toc_pages)} TOC candidate pages.")
for idx, t in toc_pages[:10]:
    for line in t.split("\n"):
        if any(w in line.lower() for w in ["transport", "process-to-process", "udp", "tcp", "congestion", "socket"]):
            print(f"Page {idx+1}: {line}")

