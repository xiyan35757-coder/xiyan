import fitz
import os
import glob

pdf_path = r"d:\traework\wenjian\6a89365aa26efc784fec08c1\gdd-stellar-clash\gdd-stellar-clash.pdf"
output_dir = r"d:\traework\wenjian\6a89365aa26efc784fec08c1\gdd-stellar-clash\pages"
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)
print(f"Total pages: {len(doc)}")

for i in range(len(doc)):
    page = doc[i]
    mat = fitz.Matrix(2, 2)
    pix = page.get_pixmap(matrix=mat)
    output_path = os.path.join(output_dir, f"page_{i+1:02d}.png")
    pix.save(output_path)
    print(f"Saved: {output_path} ({pix.width}x{pix.height})")

doc.close()
print(f"\nDone! {len(doc)} pages converted to PNG images.")
