import pymupdf
import os
import glob
from PIL import Image

pages_dir = r"d:\traework\wenjian\6a89365aa26efc784fec08c1\gdd-stellar-clash\pages"
output_pdf = r"d:\traework\wenjian\6a89365aa26efc784fec08c1\gdd-stellar-clash\gdd-stellar-clash-clean.pdf"
temp_dir = os.path.join(pages_dir, "temp_jpg")
os.makedirs(temp_dir, exist_ok=True)

images = sorted(glob.glob(os.path.join(pages_dir, "page_*.png")))
print(f"Found {len(images)} images")

new_doc = pymupdf.open()

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
    print(f"Added: {basename}.jpg ({int(w)}x{int(h)})")

new_doc.save(output_pdf, deflate=True, garbage=4)
new_doc.close()

for f in glob.glob(os.path.join(temp_dir, "*.jpg")):
    os.remove(f)
os.rmdir(temp_dir)

size_mb = os.path.getsize(output_pdf) / (1024 * 1024)
print(f"\nDone! Clean PDF saved: {output_pdf}")
print(f"File size: {size_mb:.1f} MB")
