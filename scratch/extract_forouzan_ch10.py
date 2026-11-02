import pypdf

pdf_path = "(McGraw-Hill Forouzan Networking) Behrouz A. Forouzan - Data Communications and Networking -McGraw-Hill Higher Education (2007)_compressed.pdf"
reader = pypdf.PdfReader(pdf_path)

# Chapter 10 starts around page 303 (PDF index)
# Let's read pages 303 to 342 and extract section titles and text
def extract_section_headers(start_page, end_page):
    print(f"Extracting headers from page {start_page} to {end_page}...")
    headers = []
    for p in range(start_page, end_page):
        text = reader.pages[p].extract_text()
        for line in text.split('\n'):
            line_str = line.strip()
            if any(line_str.startswith(prefix) for prefix in ['10.', '11.', '15.', 'Example 10.', 'Example 11.', 'Example 15.']):
                headers.append(f"p.{p} (book {p-36}): {line_str}")
    return headers

ch10_headers = extract_section_headers(303, 343)
for h in ch10_headers[:40]:
    print(h)

