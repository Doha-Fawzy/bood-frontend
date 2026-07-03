import os
from PIL import Image, ImageOps

source_images = [
    r"C:\Users\dohas\.gemini\antigravity-ide\brain\abbc542b-56b5-4747-8255-d7406f2addfb\media__1783059862973.png",
    r"C:\Users\dohas\.gemini\antigravity-ide\brain\abbc542b-56b5-4747-8255-d7406f2addfb\media__1783059886268.png"
]

dest_dir = r"d:\Freelance Projects\Bood\src\assets\bood-design\images\certificates"
os.makedirs(dest_dir, exist_ok=True)

counter = 1
for src in source_images:
    if not os.path.exists(src):
        continue
    img = Image.open(src).convert("RGBA")
    w, h = img.size
    
    # split into left and right half
    left = img.crop((0, 0, w//2, h))
    right = img.crop((w//2, 0, w, h))
    
    for part in [left, right]:
        # remove white background by trimming
        bg = Image.new(part.mode, part.size, (255, 255, 255, 255))
        diff = Image.composite(part, bg, part)
        gray = diff.convert("L")
        inverted = ImageOps.invert(gray)
        bbox = inverted.getbbox()
        
        if bbox:
            part = part.crop(bbox)
        
        part.save(os.path.join(dest_dir, f"cert-{counter}.png"))
        print(f"Saved cert-{counter}.png")
        counter += 1
