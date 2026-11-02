import pypdf
import os

pdf_path = "(McGraw-Hill Forouzan Networking) Behrouz A. Forouzan - Data Communications and Networking -McGraw-Hill Higher Education (2007)_compressed.pdf"

reader = pypdf.PdfReader(pdf_path)
print("Total pages:", len(reader.pages))

# Search for Chapter 10 (Error Detection and Correction)
# Around page 300-340
def search_text(start_page, end_page, term):
    found = []
    for p in range(start_page, end_page):
        txt = reader.pages[p].extract_text()
        if term.lower() in txt.lower():
            found.append(p)
    return found

print("Pages with 'Hamming distance':", search_text(300, 345, "Hamming distance")[:5])
print("Pages with 'Cyclic Redundancy':", search_text(300, 345, "Cyclic Redundancy")[:5])
print("Pages with 'Simplex':", search_text(345, 395, "Simplex")[:5])
print("Pages with 'Sliding Window':", search_text(345, 395, "Sliding Window")[:5])
print("Pages with 'Bridge':", search_text(475, 510, "Bridge")[:5])

