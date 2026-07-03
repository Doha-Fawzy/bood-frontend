import os
from PIL import Image

dir_path = r"d:\Freelance Projects\Bood\src\assets\bood-design\images\partners"

for i in range(1, 11):
    path = os.path.join(dir_path, f"partner-{i}.png")
    if os.path.exists(path):
        img = Image.open(path).convert("RGBA")
        w, h = img.size
        # Crop 30 pixels from each side to remove the border
        # The border is typically on the edge.
        inner = img.crop((30, 25, w-30, h-25))
        
        # Now trim any remaining whitespace so the logo is perfectly sized
        bg = Image.new(inner.mode, inner.size, (255, 255, 255, 255))
        diff = Image.composite(inner, bg, inner)
        
        # Convert diff to grayscale to find bounding box of non-white
        gray = diff.convert("L")
        # Invert so white becomes black (0) and everything else > 0
        import PIL.ImageOps
        inverted = PIL.ImageOps.invert(gray)
        bbox = inverted.getbbox()
        
        if bbox:
            inner = inner.crop(bbox)
            
        inner.save(path)
        print(f"Processed partner-{i}.png")
