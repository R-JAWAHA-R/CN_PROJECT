import pypdf
import os

pdf_path = "(McGraw-Hill Forouzan Networking) Behrouz A. Forouzan - Data Communications and Networking -McGraw-Hill Higher Education (2007)_compressed.pdf"
reader = pypdf.PdfReader(pdf_path)

print(f"Total pages: {len(reader.pages)}")

# Extract outlines / bookmarks if any
try:
    outline = reader.outline
    def print_outline(outl, indent=0):
        for item in outl:
            if isinstance(item, list):
                print_outline(item, indent + 2)
            else:
                title = getattr(item, 'title', str(item))
                page = getattr(item, 'page', None)
                if page is not None:
                    try:
                        p_num = reader.get_destination_page_number(item)
                    except:
                        p_num = "?"
                else:
                    p_num = "?"
                print(" " * indent + f"- {title} (p. {p_num})")
    
    print("--- Outline preview ---")
    # Just search keywords in outline
    def search_outline(outl):
        for item in outl:
            if isinstance(item, list):
                search_outline(item)
            else:
                title = getattr(item, 'title', str(item))
                for kw in ['error', 'hamming', 'crc', 'cyclic', 'simplex', 'sliding', 'bridge', 'data link']:
                    if kw in title.lower():
                        try:
                            p_num = reader.get_destination_page_number(item)
                        except:
                            p_num = "?"
                        print(f"Match: {title} -> page {p_num}")
                        break
    search_outline(outline)
except Exception as e:
    print("Error parsing outline:", e)

