from PIL import Image
import os


def validate_and_save(image_file, dest_dir, filename=None):
    os.makedirs(dest_dir, exist_ok=True)
    if not filename:
        filename = image_file.filename
    path = os.path.join(dest_dir, filename)
    img = Image.open(image_file)
    img = img.convert('RGB')
    img.save(path, format='JPEG')
    return path
