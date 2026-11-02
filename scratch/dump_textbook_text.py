import pypdf

pdf_path = "(McGraw-Hill Forouzan Networking) Behrouz A. Forouzan - Data Communications and Networking -McGraw-Hill Higher Education (2007)_compressed.pdf"
reader = pypdf.PdfReader(pdf_path)

def dump_pages(pages, filename):
    with open(filename, "w", encoding="utf-8") as f:
        for p in pages:
            f.write(f"\n--- PAGE {p+1} (Index {p}) ---\n")
            f.write(reader.pages[p].extract_text() or "")

# Ch 10 Error Detection & Correction: pages around 303-340
dump_pages(range(303, 342), "scratch/forouzan_ch10_errors.txt")
# Ch 11 Protocols: pages 343 to 375
dump_pages(range(343, 375), "scratch/forouzan_ch11_protocols.txt")
# Ch 15 Bridges: pages 480 to 495
dump_pages(range(480, 495), "scratch/forouzan_ch15_bridges.txt")
print("Dumped extracted chapters successfully!")

