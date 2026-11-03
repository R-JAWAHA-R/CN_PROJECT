import os
import pypdf

folder = r"C:\Users\jawah\.gemini\antigravity\brain\cc4327f9-56a5-4c43-aba7-7effb6dcd329\.user_uploaded"
for f in os.listdir(folder):
    if f.endswith(".pdf"):
        path = os.path.join(folder, f)
        try:
            reader = pypdf.PdfReader(path)
            text = ""
            for p in reader.pages[:2]:
                text += p.extract_text() or ""
            first_line = text.strip().split("\n")[0] if text else "empty"
            print(f"{f}: {len(reader.pages)} pages | First 100 chars: {text[:100].replace(chr(10), ' ')}")
        except Exception as e:
            print(f"{f}: error {e}")

