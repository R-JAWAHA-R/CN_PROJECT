import pypdf

pdf_path = "(McGraw-Hill Forouzan Networking) Behrouz A. Forouzan - Data Communications and Networking -McGraw-Hill Higher Education (2007)_compressed.pdf"
reader = pypdf.PdfReader(pdf_path)

# Extract Chapter 23 (Process-to-Process Delivery: UDP, TCP, SCTP)
with open("scratch/forouzan_ch23_transport.txt", "w", encoding="utf-8") as f:
    for p in range(734, 796):
        t = reader.pages[p].extract_text() or ""
        f.write(f"\n--- PDF Page {p+1} (Textbook page ~{p-31}) ---\n")
        f.write(t)

# Extract Chapter 24 (Congestion Control and QoS)
with open("scratch/forouzan_ch24_congestion.txt", "w", encoding="utf-8") as f:
    for p in range(796, 830):
        t = reader.pages[p].extract_text() or ""
        f.write(f"\n--- PDF Page {p+1} (Textbook page ~{p-31}) ---\n")
        f.write(t)

print("Extracted Chapter 23 and 24 to scratch files!")

