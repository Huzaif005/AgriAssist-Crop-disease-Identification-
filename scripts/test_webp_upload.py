import io
import requests
from PIL import Image

img = Image.new('RGB', (224, 224), color=(34, 139, 34))
buf = io.BytesIO()
img.save(buf, format='WEBP')
buf.seek(0)

url = 'http://127.0.0.1:5000/predict-image'
files = {'image': ('test.webp', buf, 'image/webp')}
resp = requests.post(url, files=files)
print(resp.status_code)
print(resp.text)
