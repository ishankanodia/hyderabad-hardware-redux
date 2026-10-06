import os
import subprocess

base_dir = "/Users/ishankanodia/Desktop/hyderabad-hardware-redux"
images_dir = os.path.join(base_dir, "images")

def git_mv(old_path, new_path):
    if os.path.exists(old_path):
        try:
            subprocess.run(["git", "mv", old_path, new_path], check=True, cwd=base_dir)
            print(f"Git mv successful: {os.path.relpath(old_path, base_dir)} -> {os.path.relpath(new_path, base_dir)}")
        except subprocess.CalledProcessError as e:
            print(f"Git mv failed for: {old_path}. Error: {e}")
            # Fallback to standard rename
            try:
                os.rename(old_path, new_path)
                print(f"Fallback rename successful: {os.path.relpath(old_path, base_dir)} -> {os.path.relpath(new_path, base_dir)}")
            except Exception as ex:
                print(f"Rename fallback failed: {ex}")

# 1. Rename files in root of images
root_renames = {
    "Astronea inauguration video.mp4": "astronea-inauguration.mp4",
    "Blum India Design Reverie Hyderabad  Taj Falaknuma Palace - Blum India (1080p, h264).mp4": "blum-design-reverie.mp4",
    "Blum inauguration video.mp4": "blum-inauguration.mp4",
    "Pavan Kanodia.jpg": "pavan-kanodia.jpg"
}

for old_name, new_name in root_renames.items():
    old_p = os.path.join(images_dir, old_name)
    new_p = os.path.join(images_dir, new_name)
    git_mv(old_p, new_p)

# 2. Rename files in images/astronea
astronea_dir = os.path.join(images_dir, "astronea")
if os.path.isdir(astronea_dir):
    files = sorted([f for f in os.listdir(astronea_dir) if f.startswith("SnapInsta")])
    for idx, filename in enumerate(files, 1):
        ext = os.path.splitext(filename)[1].lower()
        old_p = os.path.join(astronea_dir, filename)
        new_p = os.path.join(astronea_dir, f"astronea-showroom-{idx}{ext}")
        git_mv(old_p, new_p)

# 3. Rename files in images/blum
blum_dir = os.path.join(images_dir, "blum")
if os.path.isdir(blum_dir):
    files = sorted([f for f in os.listdir(blum_dir) if f.startswith("SnapInsta")])
    for idx, filename in enumerate(files, 1):
        ext = os.path.splitext(filename)[1].lower()
        old_p = os.path.join(blum_dir, filename)
        # If it's a video file inside blum showroom
        if ext == ".mp4":
            new_p = os.path.join(blum_dir, f"blum-showroom-video{ext}")
        else:
            new_p = os.path.join(blum_dir, f"blum-showroom-{idx}{ext}")
        git_mv(old_p, new_p)

# 4. Rename files in images/blum inauguration images
blum_inaug_dir = os.path.join(images_dir, "blum inauguration images")
# Rename folder itself to blum-inauguration-images
new_blum_inaug_dir = os.path.join(images_dir, "blum-inauguration-images")
git_mv(blum_inaug_dir, new_blum_inaug_dir)

# Now rename files inside it
if os.path.isdir(new_blum_inaug_dir):
    files = sorted([f for f in os.listdir(new_blum_inaug_dir) if "WhatsApp" in f])
    for idx, filename in enumerate(files, 1):
        ext = os.path.splitext(filename)[1].lower()
        old_p = os.path.join(new_blum_inaug_dir, filename)
        new_p = os.path.join(new_blum_inaug_dir, f"blum-inauguration-{idx}{ext}")
        git_mv(old_p, new_p)

# 5. Rename files in images/hh
hh_dir = os.path.join(images_dir, "hh")
new_hh_dir = os.path.join(images_dir, "ground")
git_mv(hh_dir, new_hh_dir)

if os.path.isdir(new_hh_dir):
    files = sorted([f for f in os.listdir(new_hh_dir) if f.startswith("SnapInsta")])
    for idx, filename in enumerate(files, 1):
        ext = os.path.splitext(filename)[1].lower()
        old_p = os.path.join(new_hh_dir, filename)
        new_p = os.path.join(new_hh_dir, f"ground-showroom-{idx}{ext}")
        git_mv(old_p, new_p)

print("Renaming completed successfully!")
