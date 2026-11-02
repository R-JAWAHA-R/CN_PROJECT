import pypdf

pdf_path = "(McGraw-Hill Forouzan Networking) Behrouz A. Forouzan - Data Communications and Networking -McGraw-Hill Higher Education (2007)_compressed.pdf"
reader = pypdf.PdfReader(pdf_path)

def dump_outline(outl, depth=0):
    for item in outl:
        if isinstance(item, list):
            dump_outline(item, depth + 1)
        else:
            title = getattr(item, 'title', str(item))
            try:
                p_num = reader.get_destination_page_number(item)
            except:
                p_num = "?"
            print(f"{'  '*depth}{title} (page {p_num})")

dump_outline(reader.outline)

