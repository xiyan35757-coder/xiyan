import pymupdf
import os
import glob
from PIL import Image

pdf_path = r"d:\traework\wenjian\6a89365aa26efc784fec08c1\gdd-stellar-clash\gdd-clean.pdf"
pages_dir = r"d:\traework\wenjian\6a89365aa26efc784fec08c1\gdd-stellar-clash\pages"

# Clear old images
for f in glob.glob(os.path.join(pages_dir, "page_*.png")):
    os.remove(f)
for f in glob.glob(os.path.join(pages_dir, "page_*.jpg")):
    os.remove(f)

output_pdf = r"d:\traework\wenjian\6a89365aa26efc784fec08c1\gdd-stellar-clash\gdd-stellar-clash-clean.pdf"

# Step 1: Convert PDF to images
doc = pymupdf.open(pdf_path)
print(f"Total pages: {len(doc)}")

temp_jpgs = []
for i in range(len(doc)):
    page = doc[i]
    mat = pymupdf.Matrix(2, 2)
    pix = page.get_pixmap(matrix=mat)

    png_path = os.path.join(pages_dir, f"page_{i+1:02d}.png")
    pix.save(png_path)
    print(f"Rendered page {i+1}: {pix.width}x{pix.height}")

doc.close()

# Step 2: Create clean PDF from JPEG-compressed images
images = sorted(glob.glob(os.path.join(pages_dir, "page_*.png")))
new_doc = pymupdf.open()

temp_dir = os.path.join(pages_dir, "temp_jpg")
os.makedirs(temp_dir, exist_ok=True)

for img_path in images:
    basename = os.path.splitext(os.path.basename(img_path))[0]
    jpg_path = os.path.join(temp_dir, basename + ".jpg")

    img = Image.open(img_path)
    img = img.convert("RGB")
    img.save(jpg_path, "JPEG", quality=85)

    jpg_doc = pymupdf.open(jpg_path)
    w = jpg_doc[0].rect.width
    h = jpg_doc[0].rect.height
    jpg_doc.close()

    page = new_doc.new_page(width=w, height=h)
    page.insert_image(page.rect, filename=jpg_path)
    temp_jpgs.append(jpg_path)

new_doc.save(output_pdf, deflate=True, garbage=4)
new_doc.close()

# Cleanup temp files
for f in temp_jpgs:
    os.remove(f)
os.rmdir(temp_dir)

size_mb = os.path.getsize(output_pdf) / (1024 * 1024)
print(f"\nDone! Clean PDF saved: {output_pdf}")
print(f"File size: {size_mb:.1f} MB")
