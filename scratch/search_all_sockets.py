import pypdf, re

pdf_path = "(McGraw-Hill Forouzan Networking) Behrouz A. Forouzan - Data Communications and Networking -McGraw-Hill Higher Education (2007)_compressed.pdf"
reader = pypdf.PdfReader(pdf_path)

for i in range(len(reader.pages)):
    t = reader.pages[i].extract_text() or ""
    if "socket interface" in t.lower() or "berkeley socket" in t.lower() or "socket programming" in t.lower() or "socket()" in t:
        print(f"Page {i+1} mentions socket programming/interface:")
        for line in t.split("\n"):
            if any(k in line.lower() for k in ["socket", "bind", "listen", "accept"]):
                print(f"  {line}")
        if i > 200:
            # show only first 3 pages
            pass

