import pypdf

pdf_path = "(McGraw-Hill Forouzan Networking) Behrouz A. Forouzan - Data Communications and Networking -McGraw-Hill Higher Education (2007)_compressed.pdf"
reader = pypdf.PdfReader(pdf_path)

# Find where textbook page 701 is in PDF page index
# Textbook usually has ~20-30 page offset from PDF index
for i in range(710, 750):
    t = reader.pages[i].extract_text() or ""
    if "CHAPTER 23" in t or "23.1" in t:
        print(f"PDF page {i} has Chapter 23! First 200 chars:\n{t[:200]}")
        break

for i in range(760, 810):
    t = reader.pages[i].extract_text() or ""
    if "CHAPTER 24" in t or "24.1" in t or "CONGESTION" in t:
        print(f"PDF page {i} has Chapter 24! First 200 chars:\n{t[:200]}")
        break

