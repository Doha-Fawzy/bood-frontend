from PIL import Image
import os

img_path = r"C:\Users\dohas\.gemini\antigravity-ide\brain\abbc542b-56b5-4747-8255-d7406f2addfb\media__1783055014325.png"
out_dir = r"d:\Freelance Projects\Bood\src\assets\bood-design\images\partners"

img = Image.open(img_path).convert("L")
width, height = img.size

pixels = img.load()

# Very tolerant threshold for rows so we don't miss any row
row_has_data = [False] * height
for y in range(height):
    for x in range(width):
        if pixels[x, y] < 240:
            row_has_data[y] = True
            break

def get_bands(data_array, min_len=10, max_gap=5):
    bands = []
    in_band = False
    start = 0
    smooth = list(data_array)
    for i in range(len(smooth)-max_gap):
        if any(data_array[i:i+max_gap]):
            smooth[i] = True
            
    for i, val in enumerate(smooth):
        if val and not in_band:
            in_band = True
            start = i
        elif not val and in_band:
            in_band = False
            if i - start > min_len:
                bands.append((start, i))
    if in_band and len(smooth) - start > min_len:
        bands.append((start, len(smooth)))
    return bands

row_bands = get_bands(row_has_data, 20, 5)
# Filter out the title row (usually the first thin row)
row_bands = [r for r in row_bands if r[1]-r[0] > 60]

count = 1
orig = Image.open(img_path).convert("RGBA")
names = []
for i, (r_start, r_end) in enumerate(row_bands):
    col_has_data = [False] * width
    for x in range(width):
        for y in range(r_start, r_end):
            # Strict threshold for columns to break shadows
            if pixels[x, y] < 235:
                col_has_data[x] = True
                break
    
    col_bands = get_bands(col_has_data, 30, 2)
    
    # If it's still merged, split manually
    new_col_bands = []
    for c_start, c_end in col_bands:
        if c_end - c_start > 350: # merged multiple cards
            # assume 4 cards if span is ~1000
            num_cards = round((c_end - c_start) / 250.0)
            if num_cards > 1:
                w = (c_end - c_start) // num_cards
                for j in range(num_cards):
                    new_col_bands.append((c_start + j*w, c_start + (j+1)*w))
            else:
                new_col_bands.append((c_start, c_end))
        else:
            new_col_bands.append((c_start, c_end))

    for c_start, c_end in new_col_bands:
        cropped = orig.crop((c_start, r_start, c_end, r_end))
        
        # trim whitespace from cropped image
        bg = Image.new(cropped.mode, cropped.size, cropped.getpixel((0,0)))
        diff = Image.composite(cropped, bg, cropped)
        bbox = diff.getbbox()
        if bbox:
            cropped = cropped.crop(bbox)
            
        out_name = f"partner-{count}.png"
        out_path = os.path.join(out_dir, out_name)
        cropped.save(out_path)
        names.append(out_name)
        count += 1

print("Extracted images:", names)
